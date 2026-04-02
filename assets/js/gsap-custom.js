// GSAP & Lenis Smooth Scroll Integration
document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Initialize Lenis
    const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
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
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
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
            { x: -60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
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
            { x: 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
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
                scrub: true
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
                scrub: true
            }
        });
    });
});
