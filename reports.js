/**
 * Reports Module
 * Handles generation and display of various business reports including sales, payments, and cancellations
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
    userNameElement.textContent = currentUser.name;

    // Handle logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    // Load orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Get DOM elements for summary cards
    const totalRevenueElement = document.getElementById('totalRevenue');
    const totalBillsElement = document.getElementById('totalBills');
    const itemsSoldElement = document.getElementById('itemsSold');
    const avgBillValueElement = document.getElementById('avgBillValue');
    
    // Get DOM elements for report tabs and content
    const reportTabs = document.querySelectorAll('.report-tab');
    const reportContents = document.querySelectorAll('.report-table-container');
    
    // Initial load of all reports
    updateReportSummary(orders);
    loadSalesReport(orders);
    loadPaymentReport(orders);
    loadCancellationReport(orders);
    
    // Set up tab switching functionality
    reportTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            reportTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            const tabId = tab.dataset.tab;
            reportContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + 'Report') {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Function to update summary cards
    function updateReportSummary(ordersData) {
        // Calculate total revenue from completed orders
        const totalRevenue = ordersData.reduce((sum, order) => {
            // Only include completed orders in revenue calculation
            if (order.status === 'completed') {
                const orderTotal = parseFloat(order.total.replace(/[^\d.]/g, ''));
                return sum + orderTotal;
            }
            return sum;
        }, 0);
        
        // Count total bills
        const totalBills = ordersData.length;
        
        // Count completed orders
        const completedOrders = ordersData.filter(order => order.status === 'completed').length;
        
        // Count total items sold from completed orders
        const itemsSold = ordersData.reduce((sum, order) => {
            // Only count items from completed orders
            if (order.status === 'completed') {
                return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
            }
            return sum;
        }, 0);
        
        // Calculate average bill value
        const avgBillValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;
        
        // Update UI with calculated values
        totalRevenueElement.textContent = `₹${totalRevenue.toFixed(2)}`;
        totalBillsElement.textContent = totalBills;
        itemsSoldElement.textContent = itemsSold;
        avgBillValueElement.textContent = `₹${avgBillValue.toFixed(2)}`;
    }
    
    // Function to load sales report
    function loadSalesReport(ordersData) {
        const tableBody = document.getElementById('salesTableBody');
        tableBody.innerHTML = '';
        
        if (ordersData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6" class="no-data">No data available</td>';
            tableBody.appendChild(row);
            return;
        }
        
        // Sort orders by date (newest first)
        ordersData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        ordersData.forEach(order => {
            const row = document.createElement('tr');
            
            // Format date
            const orderDate = new Date(order.date);
            const formattedDate = orderDate.toLocaleDateString();
            
            // Count total items
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
            
            // Create row with order details
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${order.billNumber}</td>
                <td>${totalItems}</td>
                <td>${order.paymentMethod}</td>
                <td><span class="status-badge ${order.status}">${capitalizeFirstLetter(order.status)}</span></td>
                <td>${order.total}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Function to load payment report
    function loadPaymentReport(ordersData) {
        if (ordersData.length === 0) {
            // Reset all payment statistics to zero
            document.getElementById('upiBar').style.width = '0%';
            document.getElementById('cardBar').style.width = '0%';
            document.getElementById('cashBar').style.width = '0%';
            
            document.getElementById('upiPercent').textContent = '0%';
            document.getElementById('cardPercent').textContent = '0%';
            document.getElementById('cashPercent').textContent = '0%';
            
            document.getElementById('upiAmount').textContent = '0';
            document.getElementById('cardAmount').textContent = '0';
            document.getElementById('cashAmount').textContent = '0';
            
            return;
        }
        
        // Calculate payment method totals
        const paymentData = {
            upi: 0,
            card: 0,
            cash: 0
        };
        
        // Sum up amounts by payment method
        ordersData.forEach(order => {
            // Extract the numeric value from strings like '₹450.00'
            const orderTotal = parseFloat(order.total.replace(/[^\d.]/g, ''));
            
            if (order.paymentMethod.toLowerCase().includes('upi')) {
                paymentData.upi += orderTotal;
            } else if (order.paymentMethod.toLowerCase().includes('card')) {
                paymentData.card += orderTotal;
            } else if (order.paymentMethod.toLowerCase().includes('cash')) {
                paymentData.cash += orderTotal;
            }
        });
        
        const totalAmount = paymentData.upi + paymentData.card + paymentData.cash;
        
        // Calculate percentages for each payment method
        const percentages = {
            upi: totalAmount > 0 ? (paymentData.upi / totalAmount) * 100 : 0,
            card: totalAmount > 0 ? (paymentData.card / totalAmount) * 100 : 0,
            cash: totalAmount > 0 ? (paymentData.cash / totalAmount) * 100 : 0
        };
        
        // Update chart bars with calculated percentages
        document.getElementById('upiBar').style.width = `${percentages.upi}%`;
        document.getElementById('cardBar').style.width = `${percentages.card}%`;
        document.getElementById('cashBar').style.width = `${percentages.cash}%`;
        
        // Update percentage displays
        document.getElementById('upiPercent').textContent = `${percentages.upi.toFixed(2)}%`;
        document.getElementById('cardPercent').textContent = `${percentages.card.toFixed(2)}%`;
        document.getElementById('cashPercent').textContent = `${percentages.cash.toFixed(2)}%`;
        
        // Update amount displays
        document.getElementById('upiAmount').textContent = paymentData.upi.toFixed(2);
        document.getElementById('cardAmount').textContent = paymentData.card.toFixed(2);
        document.getElementById('cashAmount').textContent = paymentData.cash.toFixed(2);
    }
    
    // Function to load cancellation report
    function loadCancellationReport(ordersData) {
        const cancellationTableBody = document.getElementById('cancellationTableBody');
        cancellationTableBody.innerHTML = '';
        
        // Calculate order status counts
        const totalOrders = ordersData.length;
        const completedOrders = ordersData.filter(order => order.status === 'completed').length;
        const cancelledOrders = ordersData.filter(order => order.status === 'cancelled').length;
        const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
        
        // Calculate percentages for each status
        const completedPercent = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
        const cancelledPercent = totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0;
        const pendingPercent = totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0;
        
        // Update chart bars with status percentages
        document.getElementById('completedBar').style.width = `${completedPercent}%`;
        document.getElementById('cancelledBar').style.width = `${cancelledPercent}%`;
        document.getElementById('pendingBar').style.width = `${pendingPercent}%`;
        
        // Update percentage and count displays
        document.getElementById('completedPercent').textContent = `${completedPercent.toFixed(1)}%`;
        document.getElementById('cancelledPercent').textContent = `${cancelledPercent.toFixed(1)}%`;
        document.getElementById('pendingPercent').textContent = `${pendingPercent.toFixed(1)}%`;
        
        document.getElementById('completedCount').textContent = completedOrders;
        document.getElementById('cancelledCount').textContent = cancelledOrders;
        document.getElementById('pendingCount').textContent = pendingOrders;
        
        // Show message if no cancelled orders
        if (cancelledOrders === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4" class="no-data">No cancelled orders in the selected period</td>';
            cancellationTableBody.appendChild(row);
            return;
        }
        
        // Filter and sort cancelled orders (newest first)
        const cancelledOrdersData = ordersData
            .filter(order => order.status === 'cancelled')
            .sort((a, b) => new Date(b.cancellationDate || b.date) - new Date(a.cancellationDate || a.date));
        
        // Create table rows for cancelled orders
        cancelledOrdersData.forEach(order => {
            const row = document.createElement('tr');
            
            // Format cancellation date
            const cancellationDate = order.cancellationDate ? new Date(order.cancellationDate) : new Date(order.date);
            const formattedDate = cancellationDate.toLocaleDateString() + ' ' + cancellationDate.toLocaleTimeString();
            
            row.innerHTML = `
                <td>${order.billNumber}</td>
                <td>${formattedDate}</td>
                <td>${order.total}</td>
                <td>${order.cancellationReason || 'Not specified'}</td>
            `;
            
            cancellationTableBody.appendChild(row);
        });
    }
    
    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}); 