/**
 * Dashboard Module
 * Handles the main dashboard functionality including statistics display and user session management
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Set user name in the welcome message
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        userNameElement.textContent = currentUser.name || 'User';
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

    // Initialize dashboard with current statistics
    updateDashboardStats();

    // Handle order status updates
    window.addEventListener('storage', function(e) {
        if (e.key === 'orders') {
            // Order data has changed, update dashboard
            updateDashboardStats();
        }
    });
});

/**
 * Updates all dashboard statistics based on current order data
 * Calculates and displays total sales, pending orders, and today's orders
 */
function updateDashboardStats() {
    // Get all orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    if (orders.length === 0) {
        setEmptyStats();
        return;
    }
    
    // Filter orders by status
    const completedOrders = orders.filter(order => order.status === 'completed');
    const pendingOrders = orders.filter(order => order.status === 'pending');
    
    // Calculate total sales (only from completed orders)
    const totalSales = calculateTotalSales(completedOrders);
    
    // Calculate pending order stats
    const pendingOrderCount = pendingOrders.length;
    
    // Calculate orders today
    const ordersToday = calculateOrdersToday(orders);
    
    // Update UI with calculated values
    updateSalesStats(totalSales);
    updatePendingStats(pendingOrderCount);
    updateOrdersStats(ordersToday);
}

/**
 * Sets all dashboard statistics to zero/empty state
 */
function setEmptyStats() {
    document.getElementById('totalSales').textContent = '₹0.00';
    document.getElementById('pendingOrders').textContent = '0';
    document.getElementById('ordersToday').textContent = '0';
}

function calculateTotalSales(orders) {
    return orders.reduce((total, order) => {
        // Extract numeric value from total string (e.g., "₹1234.56" -> 1234.56)
        const amount = parseFloat(order.total.replace(/[^\d.-]/g, ''));
        return total + (isNaN(amount) ? 0 : amount);
    }, 0);
}

function calculateOrdersToday(orders) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= today;
    }).length;
}


function updateSalesStats(currentSales) {
    const salesElement = document.getElementById('totalSales');
    salesElement.textContent = `₹${currentSales.toFixed(2)}`;
}

function updateOrdersStats(currentOrders) {
    const ordersElement = document.getElementById('ordersToday');
    ordersElement.textContent = currentOrders;
}


function updatePendingStats(pendingCount) {
    const pendingElement = document.getElementById('pendingOrders');
    pendingElement.textContent = pendingCount;
    
    // Add color coding based on number of pending orders
    if (pendingCount >= 10) {
        pendingElement.style.color = '#e53e3e'; // Red for high number of pending orders
    } else if (pendingCount >= 5) {
        pendingElement.style.color = '#dd6b20'; // Orange for medium number
    } else {
        pendingElement.style.color = ''; // Default color
    }
}

/**
 * Sets up listener for order status changes
 * Updates dashboard when orders are modified in other pages
 */
function setupOrderStatusListener() {
    // Listen for order status changes from other pages
    window.addEventListener('storage', function(e) {
        if (e.key === 'orders') {
            // Order data has changed, update dashboard
            updateDashboardStats();
        }
    });
}

// Initialize order status listener
setupOrderStatusListener();