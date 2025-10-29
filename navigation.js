// ==========================================
// NAVIGATION
// Smooth page transitions and nav behavior
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navBrand = document.querySelector('.nav-brand');
    const pages = document.querySelectorAll('.page');
    let lastScroll = 0;

    // Handle brand link (home)
    if (navBrand) {
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('home');

            // Clear active state from nav links
            navLinks.forEach(l => l.classList.remove('active'));
        });
    }

    // Handle page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showPage(targetId);

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Show specific page
    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
                // Scroll to top when changing pages
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                page.classList.remove('active');
            }
        });
    }
    
    // Auto-hide navigation on scroll (only on home page)
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const homePage = document.getElementById('home');
        
        // Only auto-hide on home page
        if (homePage.classList.contains('active')) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
        } else {
            // Always show nav on other pages
            nav.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            // Here you would normally send to a backend
            console.log('Form submitted:', Object.fromEntries(formData));
            alert('Thank you for reaching out! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Work card click handling (for future project detail pages)
    const workCards = document.querySelectorAll('.work-card, .work-item');
    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project') || card.getAttribute('data-work');
            console.log('Opening project:', projectId);
            // Future: Navigate to project detail page
            alert(`Project details for "${projectId}" coming soon!`);
        });
    });
});
