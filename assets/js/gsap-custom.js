// GSAP & Lenis Smooth Scroll Integration
document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Initialize Lenis
    const lenis = new window.Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Force WOW items to be visible so GSAP can take over smoothly
    document.querySelectorAll('.wow').forEach(el => {
        el.style.visibility = 'visible';
        el.style.animationName = 'none';
        el.classList.remove('wow'); // strip WOW class to prevent conflicts
    });

    // 2. Global Fade-up elements (Replacing AOS and existing WOW)
    const fadeUpElements = document.querySelectorAll('[data-aos="fade-up"], .sec-title, .product-block-one, .news-block-one, .jt-social-reel-section .sec-title');

    fadeUpElements.forEach((el) => {
        el.removeAttribute('data-aos'); // remove AOS attr

        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // triggers when top of element hits 85% of viewport
                    // toggleActions: "play none none reverse" // if we want re-triggering, or "play none none none" for once
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // 3. Fade Right Elements
    const fadeRightElements = document.querySelectorAll('[data-aos="fade-right"], .content_block_1, .content_block_2');
    fadeRightElements.forEach((el) => {
        el.removeAttribute('data-aos');
        gsap.fromTo(el,
            { x: -40, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            }
        );
    });

    // 4. Fade Left Elements
    const fadeLeftElements = document.querySelectorAll('[data-aos="fade-left"], .feature-inner, .image_block_1');
    fadeLeftElements.forEach((el) => {
        el.removeAttribute('data-aos');
        gsap.fromTo(el,
            { x: 40, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            }
        );
    });

    // 5. Parallax Effect for Gallery Images
    const parallaxImages = document.querySelectorAll('.gallery-item img');
    parallaxImages.forEach(img => {
        gsap.to(img, {
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
                trigger: img.closest('.gallery-item'),
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // Parallax Effect for Banner Hero Images
    const heroImages = document.querySelectorAll('.banner-section .image-box img');
    heroImages.forEach(img => {
        gsap.to(img, {
            y: 40,
            ease: "none",
            scrollTrigger: {
                trigger: ".banner-section",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // =========================================================================
    // 6. Scroll-Up Sticky Header (GSAP-powered)
    // =========================================================================
    const stickyHeader = document.querySelector('.sticky-header');

    if (stickyHeader) {
        let lastScrollY = 0;
        let headerVisible = false;
        const SCROLL_THRESHOLD = 120; // px before sticky kicks in at all

        // Set initial hidden state
        gsap.set(stickyHeader, { y: '-110%', opacity: 0, visibility: 'hidden' });

        function showHeader() {
            if (!headerVisible) {
                headerVisible = true;
                stickyHeader.classList.add('header-visible');
                gsap.to(stickyHeader, {
                    y: '0%',
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.45,
                    ease: 'power3.out',
                });
            }
        }

        function hideHeader() {
            if (headerVisible) {
                headerVisible = false;
                gsap.to(stickyHeader, {
                    y: '-110%',
                    opacity: 0,
                    duration: 0.35,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        stickyHeader.classList.remove('header-visible');
                        gsap.set(stickyHeader, { visibility: 'hidden' });
                    }
                });
            }
        }

        // Use Lenis scroll event for direction detection
        lenis.on('scroll', ({ scroll, direction }) => {
            // direction: 1 = scrolling down, -1 = scrolling up
            if (scroll < SCROLL_THRESHOLD) {
                hideHeader();
            } else if (direction === -1) {
                // Scrolling UP — show sticky header
                showHeader();
            } else if (direction === 1) {
                // Scrolling DOWN — hide sticky header
                hideHeader();
            }
        });
    }
});

