/**
 * Sidebar Toggle Functionality
 * Handles collapsible sidebar with hamburger menu
 * Compatible with all pages in the billing system
 */

'use strict';

/**
 * Initialize sidebar toggle functionality
 * This function sets up the collapsible sidebar with hamburger menu
 */
function initializeSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const body = document.body;
    
    console.log('Initializing sidebar toggle...', sidebarToggle ? 'Button found' : 'Button not found');
    
    // Load saved sidebar state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        body.classList.add('sidebar-collapsed');
        console.log('Loaded collapsed state from localStorage');
    }
    
    // Toggle sidebar on button click
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            console.log('Sidebar toggle button clicked!');
            body.classList.toggle('sidebar-collapsed');
            
            // Save state to localStorage
            const isCollapsed = body.classList.contains('sidebar-collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
            console.log('Sidebar collapsed:', isCollapsed);
            
            // Add haptic feedback for mobile devices
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
        console.log('Click event listener added to sidebar toggle');
    } else {
        console.warn('Sidebar toggle button not found! Make sure the button has id="sidebarToggle"');
    }
    
    // Handle keyboard shortcuts (Ctrl + B to toggle sidebar)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            console.log('Keyboard shortcut Ctrl+B pressed');
            body.classList.toggle('sidebar-collapsed');
            
            const isCollapsed = body.classList.contains('sidebar-collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
            console.log('Sidebar toggled via keyboard:', isCollapsed);
        }
    });
    console.log('Keyboard event listener added for Ctrl+B shortcut');
}

/**
 * Add hamburger button to sidebar if not present
 * This ensures compatibility with existing pages
 */
function ensureHamburgerButton() {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const existingToggle = document.getElementById('sidebarToggle');
    
    if (sidebar && !existingToggle) {
        console.log('Adding hamburger button to sidebar...');
        
        const toggleButton = document.createElement('button');
        toggleButton.className = 'sidebar-toggle';
        toggleButton.id = 'sidebarToggle';
        toggleButton.setAttribute('aria-label', 'Toggle sidebar');
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert at the beginning of the sidebar
        sidebar.insertBefore(toggleButton, sidebar.firstChild);
        console.log('Hamburger button added successfully');
    }
}

/**
 * Initialize mobile-specific functionality
 */
function initializeMobileFeatures() {
    const isMobile = window.innerWidth <= 768;
    
    console.log('Checking mobile features...', { isMobile, screenWidth: window.innerWidth });
    
    if (isMobile) {
        console.log('Initializing mobile features...');
        
        // Force create mobile hamburger button for all pages
        createMobileHamburger();
        
        // Create mobile overlay
        createMobileOverlay();
        
        // Add mobile sidebar classes
        setupMobileSidebar();
        
        // Force show mobile hamburger
        forceMobileHamburgerVisibility();
        
        console.log('Mobile features initialized');
    }
    
    // Always add resize handler
    window.addEventListener('resize', handleResize);
}

/**
 * Create mobile hamburger button
 */
function createMobileHamburger() {
    // Remove existing mobile button if it exists
    const existingMobileBtn = document.getElementById('mobileHamburger');
    if (existingMobileBtn) {
        existingMobileBtn.remove();
    }
    
    const mobileHamburger = document.createElement('button');
    mobileHamburger.className = 'mobile-hamburger';
    mobileHamburger.id = 'mobileHamburger';
    mobileHamburger.setAttribute('aria-label', 'Open navigation menu');
    mobileHamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add inline styles to ensure visibility
    mobileHamburger.style.cssText = `
        position: fixed !important;
        top: 15px !important;
        left: 15px !important;
        z-index: 1001 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 44px !important;
        height: 44px !important;
        background: var(--primary-color) !important;
        border: none !important;
        border-radius: 8px !important;
        color: var(--white) !important;
        font-size: 18px !important;
        cursor: pointer !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
        transition: all 0.3s ease !important;
    `;
    
    // Add click handler
    mobileHamburger.addEventListener('click', toggleMobileSidebar);
    
    // Add touch event handlers
    mobileHamburger.addEventListener('touchstart', (e) => {
        e.preventDefault();
        mobileHamburger.style.transform = 'scale(0.95)';
    });
    
    mobileHamburger.addEventListener('touchend', (e) => {
        e.preventDefault();
        mobileHamburger.style.transform = 'scale(1)';
        toggleMobileSidebar();
    });
    
    document.body.appendChild(mobileHamburger);
    console.log('Mobile hamburger button created and styled');
}

/**
 * Create mobile overlay
 */
function createMobileOverlay() {
    const existingOverlay = document.getElementById('mobileOverlay');
    if (existingOverlay) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.id = 'mobileOverlay';
    
    // Add click handler to close sidebar
    overlay.addEventListener('click', closeMobileSidebar);
    
    document.body.appendChild(overlay);
    console.log('Mobile overlay created');
}

/**
 * Setup mobile sidebar behavior
 */
function setupMobileSidebar() {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // Add mobile class
    sidebar.classList.add('mobile-sidebar');
    
    // Add click handlers to menu items to close sidebar
    const menuLinks = sidebar.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileSidebar, 300); // Small delay for navigation
        });
    });
}

/**
 * Toggle mobile sidebar
 */
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    if (!sidebar || !overlay) return;
    
    const isOpen = sidebar.classList.contains('mobile-open');
    
    if (isOpen) {
        closeMobileSidebar();
    } else {
        openMobileSidebar();
    }
}

/**
 * Open mobile sidebar
 */
function openMobileSidebar() {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        console.log('Mobile sidebar opened');
    }
}

/**
 * Close mobile sidebar
 */
function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Mobile sidebar closed');
    }
}

/**
 * Force mobile hamburger visibility on all pages
 */
function forceMobileHamburgerVisibility() {
    const mobileHamburger = document.getElementById('mobileHamburger');
    if (mobileHamburger) {
        // Force display styles
        mobileHamburger.style.display = 'flex';
        mobileHamburger.style.position = 'fixed';
        mobileHamburger.style.zIndex = '1001';
        mobileHamburger.style.top = '15px';
        mobileHamburger.style.left = '15px';
        
        console.log('Mobile hamburger visibility forced');
    }
}

/**
 * Handle window resize
 */
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const mobileElements = document.querySelectorAll('.mobile-hamburger, .mobile-overlay');
    
    console.log('Window resized:', { isMobile, screenWidth: window.innerWidth, mobileElementsCount: mobileElements.length });
    
    if (isMobile && mobileElements.length === 0) {
        // Switched to mobile - initialize mobile features
        console.log('Switching to mobile mode...');
        initializeMobileFeatures();
    } else if (isMobile && mobileElements.length > 0) {
        // Already mobile - ensure visibility
        forceMobileHamburgerVisibility();
    } else if (!isMobile && mobileElements.length > 0) {
        // Switched to desktop - clean up mobile features
        console.log('Switching to desktop mode...');
        mobileElements.forEach(el => el.remove());
        closeMobileSidebar();
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing sidebar functionality...');
    
    // Ensure hamburger button exists
    ensureHamburgerButton();
    
    // Initialize sidebar toggle functionality
    initializeSidebarToggle();
    
    // Initialize mobile features
    initializeMobileFeatures();
    
    console.log('Sidebar initialization complete');
});

// Export functions for manual initialization if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSidebarToggle,
        ensureHamburgerButton
    };
}