// ==========================================
// CUSTOM CURSOR - Context-Aware
// Cursor changes meaning based on page section
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    let currentSection = 'home';

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation
    function animate() {
        // Cursor follows exactly with trackpad (1:1 motion)
        cursorX = mouseX;
        cursorY = mouseY;

        // Follower has very slight lag for visual effect
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();

    // Update cursor based on active section
    function updateCursorForSection() {
        const sections = document.querySelectorAll('.page');
        let newSection = 'home';

        sections.forEach(section => {
            if (section.classList.contains('active')) {
                newSection = section.id;
            }
        });

        if (newSection !== currentSection) {
            currentSection = newSection;
            applyCursorStyle(newSection);
        }
    }

    // Apply cursor style based on section
    function applyCursorStyle(section) {
        // Reset classes
        cursor.className = 'cursor';
        follower.className = 'cursor-follower';

        // Add section-specific class
        cursor.classList.add(`cursor-${section}`);
        follower.classList.add(`follower-${section}`);

        // Update cursor content/symbol
        switch(section) {
            case 'home':
                cursor.innerHTML = '';
                follower.innerHTML = '';
                break;
            case 'work':
                cursor.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>';
                follower.innerHTML = '';
                break;
            case 'learning':
                cursor.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>';
                follower.innerHTML = '';
                break;
            case 'about':
                cursor.innerHTML = '<span class="cursor-initials">SK</span>';
                follower.innerHTML = '';
                break;
        }
    }

    // Watch for section changes
    const observer = new MutationObserver(updateCursorForSection);
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        observer.observe(page, { attributes: true, attributeFilter: ['class'] });
    });

    // Initial cursor style
    updateCursorForSection();

    // Navigation link hover preview
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const targetSection = link.getAttribute('href').replace('#', '');
            // Temporarily show cursor style for that section
            applyCursorStyle(targetSection);
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        link.addEventListener('mouseleave', () => {
            // Return to current section's cursor
            applyCursorStyle(currentSection);
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a:not(.nav-link), button, .work-card, .work-item, .project-card, .floating-word, .domain-marker, .roadblock, .project-popup');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
});
