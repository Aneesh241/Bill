/**
 * Utility functions for resetting the billing system
 * These functions can be called from the console to quickly reset different aspects of the system
 */

// Reset only orders and transactions
function resetOrders() {
    localStorage.removeItem('orders');
    
    // If this is called from the reset page, show the UI completion message
    if (document.getElementById('resetComplete')) {
        showResetComplete('Orders and bills have been reset successfully.');
        return; // Don't reload or show alert if we're showing UI feedback
    }
    
    alert('Orders reset complete.');
    window.location.reload();
}

// Helper function to show the reset completion UI
function showResetComplete(message) {
    const resetOptions = document.getElementById('resetOptions');
    if (resetOptions) resetOptions.style.display = 'none';
    
    const resetComplete = document.getElementById('resetComplete');
    if (resetComplete) {
        resetComplete.style.display = 'block';
        
        const messageElem = resetComplete.querySelector('p');
        if (messageElem) {
            messageElem.textContent = message;
        }
    }
}

// Initialize event listeners if we're on the reset page
function initResetPage() {
    // Only proceed if we're on the reset page
    if (!document.getElementById('resetOptions')) return;
    
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Set user name in the welcome message
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
    
    // Button listeners
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }
    
    const resetOrdersBtn = document.getElementById('resetOrdersBtn');
    if (resetOrdersBtn) {
        resetOrdersBtn.addEventListener('click', () => {
            if(confirm('Are you sure you want to reset all orders and bills? This action cannot be undone.')) {
                resetOrders();
            }
        });
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

// If this script is loaded directly on a page, expose these functions globally
if (typeof window !== 'undefined') {
    window.resetOrders = resetOrders;
    
    // Add DOM load event listener to initialize reset page if applicable
    document.addEventListener('DOMContentLoaded', initResetPage);
} 