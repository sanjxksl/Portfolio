// ==========================================
// ABOUT PAGE
// Floating words with hover reveals
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const floatingWords = document.querySelectorAll('.floating-word');
    const tooltip = document.getElementById('wordTooltip');
    
    // Fun facts for each word
    const wordFacts = {
        'curious': "I need to understand everything from scratch. Can't submit work I don't deeply know. This drives my learning but also my impostor syndrome.",

        'overthink': "I map edge cases and user flows before writing code. My friends call it analysis paralysis. I call it thoroughness. Better to be thorough than rushed.",

        'poetry': "Published a poem in a book, used to post on Instagram (@sincerely.san). Now I just scribble in journals for friends. It's how I let go of what I feel. I tend to feel a lot, so writing helps.",

        'dance': "Dancing since I was 5, performing since 6. Trained in 5 forms, won a few inter-university competitions in undergrad. But mostly, I dance to express what words can't. It's how I let go.",

        'coffee': "Exceptionally caffeine absorbent. Coffee makes me happy. Took classes on pour-over recipes with different beans. Would definitely start a cafe bookstore someday.",

        'organize': "I use Notion with too many databases. My friends joke that I organize my organization systems. It helps me think through complexity.",

        'question': "I ask 'why' until things make sense. Every project starts with questioning assumptions. That's how I find problems worth solving.",

        'bridge': "I connect things that seem separate. Engineering taught me systems, design taught me people, analytics taught me patterns. Product work needs all three."
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
        // First, make tooltip visible to get accurate dimensions
        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';

        const tooltipRect = tooltip.getBoundingClientRect();
        const offsetX = 15;
        const offsetY = 15;
        const padding = 20; // Extra padding from screen edges

        let left = e.clientX + offsetX;
        let top = e.clientY + offsetY;

        // Keep tooltip on screen horizontally
        if (left + tooltipRect.width + padding > window.innerWidth) {
            left = e.clientX - tooltipRect.width - offsetX;
        }

        // Ensure it doesn't go off left edge
        if (left < padding) {
            left = padding;
        }

        // Keep tooltip on screen vertically
        if (top + tooltipRect.height + padding > window.innerHeight) {
            top = e.clientY - tooltipRect.height - offsetY;
        }

        // Ensure it doesn't go off top edge
        if (top < padding) {
            top = e.clientY + offsetY;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.visibility = 'visible';
        tooltip.style.display = 'block';
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
