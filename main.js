// ==========================================
// MAIN UTILITIES
// Global helpers and initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    document.querySelectorAll('.work-card, .work-item, .gallery-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add loading state
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Log welcome message
    console.log('%c Welcome to Sanjana\'s Portfolio! ', 'background: #8B7355; color: #FAF7F2; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    console.log('%c Built with ☕ and curiosity ', 'color: #8B7355; font-size: 14px; font-style: italic;');
    console.log('%c Interested in the code? Check it out on GitHub: https://github.com/sanjxksl ', 'color: #5C4A3A; font-size: 12px;');
});

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility: Throttle function
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

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.substring(1) || 'home';
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    pages.forEach(page => {
        if (page.id === hash) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Update URL when navigating
function updateURL(pageId) {
    history.pushState(null, null, `#${pageId}`);
}

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Export utilities for use in other scripts
window.portfolioUtils = {
    debounce,
    throttle,
    updateURL
};
