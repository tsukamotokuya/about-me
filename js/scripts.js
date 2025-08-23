// ==========================================================================
// Main JavaScript for 自己紹介サイト
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSkillBars();
    initScrollAnimations();
    initSmoothScrolling();
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
        border-top: 1px solid #333;
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