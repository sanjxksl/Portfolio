// ==========================================
// ABOUT PAGE
// Floating words with hover reveals
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const floatingWords = document.querySelectorAll('.floating-word');
    const tooltip = document.getElementById('wordTooltip');
    
    // Fun facts for each word
    const wordFacts = {
        'poetry': "I used to publish poetry, now I just write for friends and family. There's something special about words crafted just for the people you care about.",
        
        'dance': "Won 1st place in Pirate's Spirit Dance Competition. Dance taught me rhythm exists everywhere - in data patterns, user flows, even code.",
        
        'coffee': "Coffee shops are my thinking spaces. I've mapped out entire product strategies on napkins between sips of pour-over.",
        
        'organize': "I use Apple productivity apps AND Notion with probably too many databases. My friends joke that I organize my organization systems.",
        
        'overthink': "I'll spend hours mapping edge cases and user flows before writing code. It's a feature, not a bug - thoroughness prevents problems.",
        
        'curious': "I need to understand everything from scratch. Can't submit work I don't deeply know. This drives my learning but also my impostor syndrome.",
        
        'books': "Always carrying a book. Currently reading about product thinking, user psychology, and occasionally poetry to stay creative.",
        
        'analytics': "I love finding patterns in data that tell human stories. Numbers become meaningful when they reveal why people do what they do."
    };
    
    floatingWords.forEach(word => {
        word.addEventListener('mouseenter', (e) => {
            const factKey = word.getAttribute('data-fact');
            const fact = wordFacts[factKey];
            
            if (fact) {
                tooltip.textContent = fact;
                tooltip.classList.add('active');
                positionTooltip(e);
            }
        });
        
        word.addEventListener('mousemove', (e) => {
            positionTooltip(e);
        });
        
        word.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
    
    // Position tooltip near mouse
    function positionTooltip(e) {
        const tooltipRect = tooltip.getBoundingClientRect();
        const offsetX = 20;
        const offsetY = 20;
        
        let left = e.pageX + offsetX;
        let top = e.pageY + offsetY;
        
        // Keep tooltip on screen
        if (left + tooltipRect.width > window.innerWidth) {
            left = e.pageX - tooltipRect.width - offsetX;
        }
        
        if (top + tooltipRect.height > window.innerHeight + window.pageYOffset) {
            top = e.pageY - tooltipRect.height - offsetY;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    
    // Animate floating words on scroll
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    floatingWords.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.animation = `float 6s ease-in-out infinite ${-index * 0.5}s`;
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutHero);
    }
});
