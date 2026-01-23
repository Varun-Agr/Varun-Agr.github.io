/**
 * Smooth scroll behavior for anchor links in navigation
 * Handles scrolling to sections when clicking on navbar menu items
 */
(function() {
    'use strict';
    
    /**
     * Linear scroll animation (uniform speed, no easing)
     * @param {number} targetPosition - The target scroll position
     * @param {number} duration - Duration of the scroll in milliseconds
     */
    function linearScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();
        
        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Linear progress (0 to 1)
            
            window.scrollTo(0, startPosition + distance * progress);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    /**
     * Initialize smooth scrolling for all anchor links
     */
    function initSmoothScroll() {
        // Get all links that start with #
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just '#' or empty
                if (!href || href === '#') {
                    return;
                }
                
                // Get the target section
                const targetId = href.substring(1); // Remove the # symbol
                const targetSection = document.getElementById(targetId);
                
                // If target section exists, scroll to it
                if (targetSection) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header (if any)
                    const header = document.querySelector('header') || document.querySelector('.navbar');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const offset = 20; // Additional spacing
                    
                    // Calculate target position
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
                    
                    // Linear scroll animation
                    linearScrollTo(targetPosition, 50);
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                    
                    // Update URL hash without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }
    
    /**
     * Handle initial page load with hash in URL
     */
    function handleInitialHash() {
        if (window.location.hash) {
            // Small delay to ensure page is fully loaded
            setTimeout(function() {
                const targetId = window.location.hash.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const header = document.querySelector('header') || document.querySelector('.navbar');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const offset = 20;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
                    
                    linearScrollTo(targetPosition, 50);
                }
            }, 100);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initSmoothScroll();
            handleInitialHash();
        });
    } else {
        // DOM is already ready
        initSmoothScroll();
        handleInitialHash();
    }
})();
