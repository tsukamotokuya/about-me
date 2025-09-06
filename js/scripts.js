// ==========================================================================
// Main JavaScript for 自己紹介サイト
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSkillBars();
    initScrollAnimations();
    initSmoothScrolling();
    initTouchSupport();
    initViewportFix();
    initEnhancedMobileMenu();
    initResponsiveImages();
    initOptimizedScroll();
});

// ==========================================================================
// Navigation functionality
// ==========================================================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// ==========================================================================
// Skill bars animation
// ==========================================================================

function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const skillLevel = skillFill.getAttribute('data-skill');
                
                // Set CSS variable for animation
                skillFill.style.setProperty('--skill-width', skillLevel + '%');
                
                // Trigger animation
                setTimeout(() => {
                    skillFill.style.width = skillLevel + '%';
                }, 200);

                // Unobserve after animation
                observer.unobserve(skillFill);
            }
        });
    }, observerOptions);

    skillFills.forEach(fill => {
        observer.observe(fill);
    });
}

// ==========================================================================
// Scroll animations
// ==========================================================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hobby-card, .stat, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Set initial state and observe
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ==========================================================================
// Smooth scrolling
// ==========================================================================

function initSmoothScrolling() {
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#profile').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Navigation links smooth scroll
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// Enhanced Responsive Functionality
// ==========================================================================

// Touch and swipe support for mobile
function initTouchSupport() {
    let startX = 0;
    let startY = 0;
    const threshold = 100; // Minimum distance for swipe

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Check if horizontal swipe is longer than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe left - could trigger next page functionality
                    console.log('Swipe left');
                } else {
                    // Swipe right - could trigger previous page functionality
                    console.log('Swipe right');
                }
            }
        }

        // Reset values
        startX = 0;
        startY = 0;
    });
}

// Viewport height fix for mobile browsers
function initViewportFix() {
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set initial value
    setViewportHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
}

// Enhanced menu functionality for mobile
function initEnhancedMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                hamburger.classList.add('active');
                body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Responsive image loading
function initResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Performance optimization for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced scroll performance
function initOptimizedScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    const handleScroll = throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background change
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
        }

        // Auto-hide navbar on scroll down, show on scroll up (mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll);
}

// Add CSS class for enhanced mobile menu styles
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: #000000;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(255, 255, 255, 0.05);
        z-index: 999;
        padding: 2rem 0;
        border-top: 1px solid #6B7280;
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-menu li {
        margin: 1.5rem 0;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add responsive utility CSS
const responsiveUtilityStyles = `
/* Responsive utility classes */
.hide-mobile { display: block; }
.show-mobile { display: none; }

@media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: block !important; }
}

/* Improved touch targets for mobile */
@media (max-width: 768px) {
    .btn, .nav-link, .contact-item {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .quick-link-card {
        min-height: 120px;
    }
}

/* Fix for iOS viewport height issues */
.hero {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
}

/* Prevent horizontal scroll on mobile */
html, body {
    overflow-x: hidden;
}

/* Improved focus styles for accessibility */
.btn:focus,
.nav-link:focus,
.quick-link-card:focus {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
}

/* Smooth navbar transition */
.navbar {
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}
`;

// Inject responsive utility styles
const responsiveStyleSheet = document.createElement('style');
responsiveStyleSheet.type = 'text/css';
responsiveStyleSheet.innerText = responsiveUtilityStyles;
document.head.appendChild(responsiveStyleSheet);