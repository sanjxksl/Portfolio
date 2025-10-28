// ==========================================
// LEARNING PAGE
// Interactive forest with project clouds
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const learningNodes = document.querySelectorAll('.learning-node');
    const projectClouds = document.querySelectorAll('.project-cloud');
    let activeCloud = null;
    
    // Domain to cloud mapping
    const domainCloudMap = {
        'foundation': 'foundation-projects',
        'design': 'design-projects',
        'analytics': 'analytics-projects',
        'product': 'product-projects'
    };
    
    // Show project cloud on node hover
    learningNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const domain = node.getAttribute('data-domain');
            const cloudId = domainCloudMap[domain];
            
            if (cloudId) {
                // Hide any active cloud
                if (activeCloud) {
                    activeCloud.classList.remove('active');
                }
                
                // Show the new cloud
                const cloud = document.getElementById(cloudId);
                if (cloud) {
                    cloud.classList.add('active');
                    activeCloud = cloud;
                }
            }
        });
    });
    
    // Hide cloud when mouse leaves both node and cloud
    let timeoutId;
    
    learningNodes.forEach(node => {
        node.addEventListener('mouseleave', (e) => {
            timeoutId = setTimeout(() => {
                if (activeCloud && !activeCloud.matches(':hover')) {
                    activeCloud.classList.remove('active');
                    activeCloud = null;
                }
            }, 300);
        });
    });
    
    // Keep cloud open when hovering over it
    projectClouds.forEach(cloud => {
        cloud.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
        });
        
        cloud.addEventListener('mouseleave', () => {
            cloud.classList.remove('active');
            activeCloud = null;
        });
    });
    
    // Project card click handling
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            console.log('Opening project:', projectId);
            
            // Future: Navigate to detailed project page
            const projectTitle = card.querySelector('h4').textContent;
            alert(`Detailed page for "${projectTitle}" coming soon!\n\nThis will include:\n- Full problem statement\n- My approach and process\n- Key insights and learnings\n- Results and impact\n- Links to reports/GitHub`);
        });
    });
    
    // Animate paths on page load
    const pathSvg = document.querySelector('.path-svg');
    if (pathSvg) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pathSvg.classList.add('animated');
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(pathSvg);
    }
});

// Real project data (for future expansion)
const projectsData = {
    'haptic-glove': {
        title: 'Mining Safety Haptic Glove',
        domain: 'Engineering Foundation',
        timeline: 'Jan 2024 - Apr 2024',
        problem: 'Underground mining operations require communication without visual/audio signals',
        approach: 'Conducted stakeholder research, pivoted from inner-braces to glove-based solution',
        outcome: 'Integrated ML-based gesture recognition for real-time haptic feedback',
        skills: ['Product Strategy', 'Feasibility Studies', 'CAD']
    },
    'aesthify': {
        title: 'Aesthify: AI-Powered Design Intelligence',
        domain: 'Design Thinking',
        timeline: 'Jan 2025 - May 2025',
        problem: 'Designers lack objective, data-driven ways to evaluate aesthetic principles',
        approach: 'Built ML framework using YOLOv8, conducted user study with 101 participants',
        outcome: 'Revealed simplicity and contrast drive user preference; now used by design researchers',
        skills: ['Machine Learning', 'User Research', 'Python', 'Statistical Analysis']
    },
    'alumni-prediction': {
        title: 'Alumni Career Success Prediction',
        domain: 'Data & Analytics',
        timeline: 'Sep 2023 - Dec 2023',
        problem: 'Understanding factors that influence alumni career trajectories',
        approach: 'Analyzed 3,300+ records, built Random Forest models for prediction',
        outcome: 'Identified distinct career patterns, provided insights for curriculum development',
        skills: ['Python', 'Predictive Modeling', 'Data Analytics', 'Machine Learning']
    },
    'tata-strategy': {
        title: 'TATA Semiconductor Market Entry Strategy',
        domain: 'Product Strategy',
        timeline: 'Mar 2023 - Jun 2023',
        problem: 'Analyzing TATA\'s entry into India\'s semiconductor manufacturing',
        approach: 'Competitive analysis of 22 global players, assessed positioning options',
        outcome: 'Created multi-phase roadmap from foundry acquisition to market expansion',
        skills: ['Competitive Analysis', 'Go-to-Market Strategy', 'Business Case Development']
    }
};
