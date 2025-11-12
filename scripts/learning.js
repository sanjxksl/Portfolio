// ==========================================
// LEARNING PAGE - Journey Map Interactions
// Hover-based interactions for trees/stones, click for bunny
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initJourneyMapInteractions();
    createPopupBackdrop();
});

// Global variables for hover delay management
let hoverTimeout = null;
let activePopup = null;

// Initialize all marker interactions
function initJourneyMapInteractions() {
    initTreeMarkers();
    initStoneMarkers();
    initAchievementMarkers();
    initBunnyMarker();
    initPopupCloseButtons();
    initEscapeKey();
}

// Create backdrop overlay for popups
function createPopupBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'popup-backdrop';
    backdrop.id = 'popupBackdrop';
    document.body.appendChild(backdrop);

    // Close popup when clicking backdrop
    backdrop.addEventListener('click', closeAllPopups);
}

// Tree Markers (Knowledge Domains) - HOVER to open
function initTreeMarkers() {
    const treeMarkers = document.querySelectorAll('.tree-marker');

    treeMarkers.forEach(marker => {
        const treeType = marker.getAttribute('data-tree');
        const popupId = `popup-${treeType}`;
        const popup = document.getElementById(popupId);

        if (!popup) return;

        // Open popup on hover
        marker.addEventListener('mouseenter', () => {
            clearHoverTimeout();
            openPopup(popup);
        });

        // Start close timer when leaving marker
        marker.addEventListener('mouseleave', () => {
            startCloseTimer(popup);
        });

        // Keep popup open when hovering over it
        popup.addEventListener('mouseenter', () => {
            clearHoverTimeout();
        });

        // Start close timer when leaving popup
        popup.addEventListener('mouseleave', () => {
            startCloseTimer(popup);
        });

        // Click also works (for touch devices)
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            if (popup.classList.contains('active')) {
                closePopup(popup);
            } else {
                openPopup(popup);
            }
        });
    });
}

// Stone Markers (Roadblocks) - HOVER to open
function initStoneMarkers() {
    const stoneMarkers = document.querySelectorAll('.stone-marker');

    stoneMarkers.forEach(marker => {
        const stoneType = marker.getAttribute('data-stone');
        const popupId = `popup-${stoneType}`;
        const popup = document.getElementById(popupId);

        if (!popup) return;

        // Open popup on hover
        marker.addEventListener('mouseenter', () => {
            clearHoverTimeout();
            openPopup(popup);
        });

        // Start close timer when leaving marker
        marker.addEventListener('mouseleave', () => {
            startCloseTimer(popup);
        });

        // Keep popup open when hovering over it
        popup.addEventListener('mouseenter', () => {
            clearHoverTimeout();
        });

        // Start close timer when leaving popup
        popup.addEventListener('mouseleave', () => {
            startCloseTimer(popup);
        });

        // Click also works (for touch devices)
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            if (popup.classList.contains('active')) {
                closePopup(popup);
            } else {
                openPopup(popup);
            }
        });
    });
}

// Achievement Markers (Maple Leaves) - Keep click-based
function initAchievementMarkers() {
    const achievementMarkers = document.querySelectorAll('.achievement-marker');

    achievementMarkers.forEach(marker => {
        const achievementType = marker.getAttribute('data-achievement');
        const popupId = `popup-${achievementType}`;
        const popup = document.getElementById(popupId);

        if (!popup) return;

        // Click to toggle popup
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            if (popup.classList.contains('active')) {
                closePopup(popup);
            } else {
                openPopup(popup);
            }
        });
    });
}

// Bunny Marker - Click to navigate to About page
function initBunnyMarker() {
    const bunnyMarker = document.querySelector('.bunny-marker');

    if (!bunnyMarker) return;

    bunnyMarker.addEventListener('click', (e) => {
        e.stopPropagation();
        // Navigate to about page
        window.location.hash = 'about';
    });
}

// Popup Close Buttons
function initPopupCloseButtons() {
    const closeButtons = document.querySelectorAll('.popup-close');

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const popup = button.closest('.journey-popup');
            if (popup) {
                closePopup(popup);
            }
        });
    });
}

// Escape Key to Close Popups
function initEscapeKey() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });
}

// Hover delay management functions
function startCloseTimer(popup) {
    clearHoverTimeout();
    hoverTimeout = setTimeout(() => {
        closePopup(popup);
    }, 500); // 500ms delay before closing
}

function clearHoverTimeout() {
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
    }
}

// Open Popup
function openPopup(popup) {
    // Close any currently open popups
    if (activePopup && activePopup !== popup) {
        closePopup(activePopup);
    }

    // Open this popup
    popup.classList.add('active');
    activePopup = popup;

    // Show backdrop
    const backdrop = document.getElementById('popupBackdrop');
    if (backdrop) {
        backdrop.classList.add('active');
    }

    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
}

// Close Popup
function closePopup(popup) {
    popup.classList.remove('active');

    // Hide backdrop if no popups are open
    const anyPopupOpen = document.querySelector('.journey-popup.active');
    if (!anyPopupOpen) {
        const backdrop = document.getElementById('popupBackdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
        }
        // Restore body scroll
        document.body.style.overflow = '';
        activePopup = null;
    }
}

// Close All Popups
function closeAllPopups() {
    clearHoverTimeout();

    const popups = document.querySelectorAll('.journey-popup');
    popups.forEach(popup => {
        popup.classList.remove('active');
    });

    // Hide backdrop
    const backdrop = document.getElementById('popupBackdrop');
    if (backdrop) {
        backdrop.classList.remove('active');
    }

    // Restore body scroll
    document.body.style.overflow = '';
    activePopup = null;
}

// Prevent clicks inside popup from closing it
document.addEventListener('click', (e) => {
    if (e.target.closest('.journey-popup')) {
        e.stopPropagation();
    }
});
