/**
 * Reset Module
 * Handles system reset functionality for orders and transactions
 */

/**
 * Resets all orders and transactions by clearing the orders from localStorage
 * Shows appropriate feedback based on the context (UI or alert)
 */

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

/**
 * Initializes the reset page functionality
 * Sets up event listeners and checks user authentication
 */
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
    
    // Set up back button to return to dashboard
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }
    
    // Set up reset orders button with confirmation
    const resetOrdersBtn = document.getElementById('resetOrdersBtn');
    if (resetOrdersBtn) {
        resetOrdersBtn.addEventListener('click', () => {
            if(confirm('Are you sure you want to reset all orders and bills? This action cannot be undone.')) {
                resetOrders();
            }
        });
    }
    
    // Handle logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

// Initialize reset page when DOM is loaded
document.addEventListener('DOMContentLoaded', initResetPage); 