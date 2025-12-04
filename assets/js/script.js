/* ===================================
   CODING CLUB CU - JAVASCRIPT
   Mobile Menu Toggle & Smooth Scroll
   =================================== */

// Get DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// ===================================
// MOBILE MENU TOGGLE
// ===================================

/**
 * Toggle mobile menu on hamburger click
 */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/**
 * Close mobile menu when a link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/**
 * Close mobile menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

/**
 * Smooth scroll for internal links
 */
document.querySelectorAll('a[href="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// FADE-IN ANIMATION ON SCROLL
// ===================================

/**
 * Observe elements and fade them in when they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Observe cards and sections for fade-in effect
 */
const elementsToObserve = document.querySelectorAll(
    '.about-card, .activity-card, .event-card, .project-card, .team-card, .value-item'
);

elementsToObserve.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// ACTIVE NAV LINK INDICATOR
// ===================================

/**
 * Update active nav link based on current page
 */
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateActiveNav);

// ===================================
// BUTTON INTERACTIONS
// ===================================

/**
 * Handle CTA button click for "Get Started"
 */
const getStartedBtn = document.querySelector('.hero .btn-primary');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
        // Scroll to about section or show modal
        const aboutSection = document.querySelector('.about-preview');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/**
 * Add hover effect logging to buttons (optional)
 */
const allButtons = document.querySelectorAll('.btn');
allButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        // Subtle feedback
        this.style.cursor = 'pointer';
    });
});

// ===================================
// SCROLL POSITION DETECTION
// ===================================

/**
 * Detect when user scrolls and add/remove navbar shadow
 */
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===================================
// FORM VALIDATION (if forms added in future)
// ===================================

/**
 * Generic form validation function
 */
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ===================================
// PAGE LOAD ANIMATIONS
// ===================================

/**
 * Add animations on page load
 */
window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 0.6s ease';
    }
});

// ===================================
// KEYBOARD NAVIGATION
// ===================================

/**
 * Close mobile menu on Escape key
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================

/**
 * Ensure keyboard navigation works properly
 */
navLinks.forEach(link => {
    link.setAttribute('role', 'menuitem');
});

hamburger.setAttribute('aria-label', 'Toggle navigation menu');
hamburger.setAttribute('aria-expanded', 'false');

/**
 * Update aria-expanded when menu is toggled
 */
hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// ===================================
// LAZY LOADING FOR IMAGES (future use)
// ===================================

/**
 * Setup lazy loading for images (when images are added)
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    // Observe lazy images
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function for performance-heavy operations
 */
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle function for scroll/resize events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// FEEDBACK MODAL - 25 MINUTE TIMER
// ===================================

/**
 * Feedback Modal functionality
 * Shows modal after user spends 25 minutes on the website
 */

const FEEDBACK_TIME_THRESHOLD = 25 * 60 * 1000; // 25 minutes in milliseconds
const FEEDBACK_STORAGE_KEY = 'feedbackModalShown';
const FEEDBACK_TIME_KEY = 'feedbackStartTime';

/**
 * Initialize feedback modal timer
 */
function initFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    const feedbackForm = document.getElementById('feedbackForm');
    const closeBtn = document.getElementById('feedbackClose');
    const closeBtnSecondary = document.getElementById('feedbackCloseBtn');
    const feedbackText = document.getElementById('feedbackText');

    if (!modal || !feedbackForm) {
        console.warn('Feedback modal elements not found');
        return;
    }

    // Check if modal was already shown in this session
    const modalShown = sessionStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (modalShown === 'true') {
        return; // Don't show again in this session
    }

    // Get or set start time
    let startTime = sessionStorage.getItem(FEEDBACK_TIME_KEY);
    if (!startTime) {
        startTime = Date.now();
        sessionStorage.setItem(FEEDBACK_TIME_KEY, startTime.toString());
    } else {
        startTime = parseInt(startTime);
    }

    // Declare interval variable
    let timeCheckInterval;

    /**
     * Calculate time elapsed and check if threshold is reached
     */
    function checkTimeAndShowModal() {
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime;

        if (timeElapsed >= FEEDBACK_TIME_THRESHOLD) {
            showFeedbackModal();
            // Clear the interval once modal is shown
            if (timeCheckInterval) {
                clearInterval(timeCheckInterval);
            }
        }
    }

    /**
     * Show the feedback modal
     */
    function showFeedbackModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        sessionStorage.setItem(FEEDBACK_STORAGE_KEY, 'true');
        
        // Focus on textarea for better UX
        setTimeout(() => {
            feedbackText.focus();
        }, 300);
    }

    /**
     * Hide the feedback modal
     */
    function hideFeedbackModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        feedbackForm.reset();
    }

    /**
     * Handle form submission
     */
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const feedback = feedbackText.value.trim();
        
        if (!feedback) {
            feedbackText.classList.add('error');
            feedbackText.focus();
            return;
        }

        // Log feedback to console
        console.log('=== USER FEEDBACK ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Feedback:', feedback);
        console.log('Time spent on site:', Math.round((Date.now() - startTime) / 1000 / 60), 'minutes');
        console.log('====================');

        // Show success message (optional - can be enhanced later)
        alert('Thank you for your feedback! We appreciate your input.');
        
        // Close modal after submission
        hideFeedbackModal();
    });

    /**
     * Close button handlers
     */
    if (closeBtn) {
        closeBtn.addEventListener('click', hideFeedbackModal);
    }

    if (closeBtnSecondary) {
        closeBtnSecondary.addEventListener('click', hideFeedbackModal);
    }

    /**
     * Close modal when clicking outside
     */
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideFeedbackModal();
        }
    });

    /**
     * Close modal on Escape key
     */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideFeedbackModal();
        }
    });

    /**
     * Check time every minute (60000ms)
     * This is more efficient than checking every second
     */
    timeCheckInterval = setInterval(checkTimeAndShowModal, 60000);
    
    // Also check immediately in case user has been on page for a while
    checkTimeAndShowModal();

    // Clean up on page unload (optional)
    window.addEventListener('beforeunload', () => {
        clearInterval(timeCheckInterval);
    });
}

// Initialize feedback modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeedbackModal);
} else {
    initFeedbackModal();
}

// ===================================
// READY STATE
// ===================================

console.log('Coding Club CU website initialized successfully!');
