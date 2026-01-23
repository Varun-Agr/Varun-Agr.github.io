/**
 * Scroll animations for project cards
 * Makes cards slide in from the side when they enter the viewport
 */
(function() {
    'use strict';
    
    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - The element to check
     * @param {number} offset - Additional offset from bottom of viewport (default 100px)
     * @returns {boolean}
     */
    function isInViewport(element, offset = 100) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight - offset &&
            rect.bottom >= 0
        );
    }
    
    /**
     * Initialize scroll animations for project cards
     */
    function initScrollAnimations() {
        // Target the actual project row elements in the portfolio section
        const portfolioSection = document.getElementById('portfolio');
        if (!portfolioSection) {
            console.warn('Portfolio section not found');
            return;
        }

        // Find project rows - these are the rows with class "row--padded" in the portfolio section
        const projectCards = Array.from(portfolioSection.querySelectorAll('.row.row--padded'));
        
        // Add animation class to each card initially
        projectCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            
            // Alternate between left and right animations
            if (index % 2 === 0) {
                card.classList.add('slide-from-left');
            } else {
                card.classList.add('slide-from-right');
            }
        });
        
        /**
         * Check and animate visible cards
         */
        function checkAndAnimate() {
            projectCards.forEach(card => {
                if (isInViewport(card, 100) && !card.classList.contains('animated')) {
                    card.classList.add('animated');
                }
            });
        }
        
        // Check on scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(checkAndAnimate);
        }, { passive: true });
        
        // Check on load and after a short delay (for images to load)
        checkAndAnimate();
        setTimeout(checkAndAnimate, 100);
        setTimeout(checkAndAnimate, 500);
        
        // Check on window resize
        window.addEventListener('resize', checkAndAnimate, { passive: true });
    }
    
    /**
     * Initialize banner/showcase animations
     */
    function initBannerAnimations() {
        const showcaseSection = document.querySelector('.showcase-section');
        if (!showcaseSection) return;

        // Get all elements to animate
        const heading = showcaseSection.querySelector('.display-1');
        const subtitle = showcaseSection.querySelector('.display-5');
        const leadText = showcaseSection.querySelector('.lead');
        const profileImage = showcaseSection.querySelector('.profile-image');
        const platformLinks = showcaseSection.querySelector('.platform-links.shortcode');

        // Trigger animations on page load with a small delay
        setTimeout(() => {
            if (heading) heading.classList.add('animate-in');
            if (subtitle) subtitle.classList.add('animate-in');
            if (leadText) leadText.classList.add('animate-in');
            if (profileImage) profileImage.classList.add('animate-in');
            if (platformLinks) platformLinks.classList.add('animate-in');
        }, 100);
    }

    /**
     * Initialize footer animations
     */
    function initFooterAnimations() {
        // Find the footer section title "Varun Agrawal."
        // It's in a footer section with class "section--padding"
        const footerSection = document.querySelector('.footer .section--padding');
        if (!footerSection) return;

        const footerTitle = footerSection.querySelector('.section__title');
        if (!footerTitle) return;

        // Add animation class
        footerTitle.classList.add('footer-title-animate');

        /**
         * Check and animate footer title
         */
        function checkAndAnimateFooter() {
            if (isInViewport(footerTitle, 100) && !footerTitle.classList.contains('animated')) {
                footerTitle.classList.add('animated');
            }
        }

        // Check on scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(checkAndAnimateFooter);
        }, { passive: true });

        // Check on load
        checkAndAnimateFooter();
        setTimeout(checkAndAnimateFooter, 100);

        // Check on window resize
        window.addEventListener('resize', checkAndAnimateFooter, { passive: true });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initScrollAnimations();
            initBannerAnimations();
            initFooterAnimations();
        });
    } else {
        initScrollAnimations();
        initBannerAnimations();
        initFooterAnimations();
    }
})();
