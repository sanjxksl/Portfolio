// ==========================================
// LEARNING PAGE - Fall Forest Road
// Hover interactions for trees and rocks
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initMarkerHoverInteractions();
});

// Marker hover interactions
function initMarkerHoverInteractions() {
    const markers = document.querySelectorAll('.journey-marker');
    const popups = document.querySelectorAll('.project-popup');
    let activePopup = null;
    let hoverTimeout = null;

    // Mapping between markers and their popups
    const markerPopupMap = {
        'engineering': 'popup-engineering',
        'design': 'popup-design',
        'analytics': 'popup-analytics',
        'product': 'popup-product'
    };

    markers.forEach(marker => {
        const markerType = marker.getAttribute('data-marker');
        const popupId = markerPopupMap[markerType];
        const popup = document.getElementById(popupId);

        if (!popup) return;

        // Show popup on marker hover
        marker.addEventListener('mouseenter', () => {
            // Clear any pending hide timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }

            // Hide any active popup
            if (activePopup && activePopup !== popup) {
                activePopup.classList.remove('active');
            }

            // Show this popup
            popup.classList.add('active');
            activePopup = popup;
        });

        // Keep popup open when hovering over marker
        marker.addEventListener('mouseleave', () => {
            // Delay hiding popup to allow user to move to it
            hoverTimeout = setTimeout(() => {
                if (!popup.matches(':hover')) {
                    popup.classList.remove('active');
                    activePopup = null;
                }
            }, 300);
        });

        // Keep popup open when hovering over the popup itself
        popup.addEventListener('mouseenter', () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
        });

        // Hide popup when mouse leaves popup
        popup.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                if (!marker.matches(':hover')) {
                    popup.classList.remove('active');
                    activePopup = null;
                }
            }, 200);
        });

        // Click marker to toggle popup (for touch devices)
        marker.addEventListener('click', (e) => {
            e.stopPropagation();

            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
                activePopup = null;
            } else {
                // Hide any active popup
                popups.forEach(p => p.classList.remove('active'));

                // Show this popup
                popup.classList.add('active');
                activePopup = popup;
            }
        });
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (activePopup && !e.target.closest('.project-popup') && !e.target.closest('.journey-marker')) {
            activePopup.classList.remove('active');
            activePopup = null;
        }
    });

    // Close popup on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activePopup) {
            activePopup.classList.remove('active');
            activePopup = null;
        }
    });
}

// Project data (for future expansion)
const projectsData = {
    'haptic-glove': {
        title: 'Mining Safety Haptic Glove',
        domain: 'Engineering Foundation',
        timeline: 'Jan 2024 - Apr 2024',
        problem: 'Underground mining operations require communication without visual/audio signals',
        approach: 'Conducted stakeholder research, pivoted from inner-braces to glove-based solution',
        outcome: 'Integrated ML-based gesture recognition for real-time haptic feedback',
        skills: ['Product Strategy', 'Feasibility Studies', 'CAD'],
        icon: '🔧'
    },
    'printing-press': {
        title: 'Printing Press Operational Analysis',
        domain: 'Engineering Foundation',
        timeline: 'Sep 2023 - Dec 2023',
        problem: 'Print shop workflow inefficiencies causing operator fatigue',
        approach: 'Ethnographic research identifying bottlenecks',
        outcome: 'Proposed automated systems to reduce operator load',
        skills: ['Process Optimization', 'Ethnographic Research', 'Systems Thinking'],
        icon: '🖨️'
    },
    'aesthify': {
        title: 'Aesthify: Design Intelligence Platform',
        domain: 'Design Thinking',
        timeline: 'Jan 2025 - May 2025',
        problem: 'Designers lack objective, data-driven ways to evaluate aesthetic principles',
        approach: 'Built ML framework using YOLOv8, conducted user study with 101 participants',
        outcome: 'Revealed simplicity and contrast drive user preference; now used by design researchers',
        skills: ['Machine Learning', 'User Research', 'Python', 'Statistical Analysis'],
        icon: '🎯'
    },
    'headspace-audit': {
        title: 'Headspace Heuristic Evaluation',
        domain: 'Design Thinking',
        timeline: 'Oct 2024 - Dec 2024',
        problem: 'Assess usability of Headspace meditation app',
        approach: 'Applied Jakob Nielsen\'s 10 heuristics across 5 core screens',
        outcome: 'Identified 47 usability issues with actionable recommendations',
        skills: ['UX Research', 'Heuristic Analysis', 'Design Critique'],
        icon: '📱'
    },
    'alumni-prediction': {
        title: 'Alumni Career Success Prediction',
        domain: 'Data & Analytics',
        timeline: 'Sep 2023 - Dec 2023',
        problem: 'Understanding factors that influence alumni career trajectories',
        approach: 'Analyzed 3,300+ records, built Random Forest models for prediction',
        outcome: 'Identified distinct career patterns, provided insights for curriculum development',
        skills: ['Python', 'Predictive Modeling', 'Data Analytics', 'Machine Learning'],
        icon: '🎓'
    },
    'summer-home': {
        title: 'Summer Home Recommender System',
        domain: 'Data & Analytics',
        timeline: 'Jan 2024 - Apr 2024',
        problem: 'Personalized vacation property recommendations',
        approach: 'Built recommendation system using collaborative filtering',
        outcome: 'Improved user preference matching through user analysis',
        skills: ['Collaborative Filtering', 'Python', 'User Preference Analysis'],
        icon: '🏠'
    },
    'tata-strategy': {
        title: 'TATA Semiconductor Market Entry Strategy',
        domain: 'Product Strategy',
        timeline: 'Mar 2023 - Jun 2023',
        problem: 'Analyzing TATA\'s entry into India\'s semiconductor manufacturing',
        approach: 'Competitive analysis of 22 global players, assessed positioning options',
        outcome: 'Created multi-phase roadmap from foundry acquisition to market expansion',
        skills: ['Competitive Analysis', 'Go-to-Market Strategy', 'Business Case Development'],
        icon: '🏢'
    },
    'hyperhorizon-gtm': {
        title: 'HyperHorizon Go-to-Market Strategy',
        domain: 'Product Strategy',
        timeline: 'Jan 2024 - Jun 2024',
        problem: 'Launch strategy for autonomous underwater vehicle',
        approach: 'Led competitive analysis, ethnographic research with government agencies',
        outcome: 'Secured CAD 100K+ in funding through strategic positioning',
        skills: ['Product Strategy', 'Market Research', 'Strategic Positioning'],
        icon: '🌊'
    }
};
