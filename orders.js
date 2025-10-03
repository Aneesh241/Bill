/**
 * Orders Management Module
 * Handles the display, filtering, and management of orders in the system
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
    const ordersContainer = document.getElementById('ordersContainer');
    const emptyOrdersMsg = document.querySelector('.empty-orders'); 
    
    // Set up filter buttons for order status
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter and display orders
            const status = btn.dataset.status;
            displayOrders(status === 'all' ? orders : orders.filter(order => order.status === status));
        });
    });

    // Initial display of all orders
    displayOrders(orders);

    // Set up order details modal
    const modal = document.getElementById('orderDetailsModal');
    const closeModal = modal.querySelector('.close-modal');
    
    closeModal.onclick = () => {
        modal.style.display = 'none';
    };
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Function to display orders
    function displayOrders(ordersList) {
        // Ensure ordersContainer exists
        if (!ordersContainer) {
            console.error('Orders container not found');
            return;
        }
        
        // Clear all existing order cards
        const orderCards = ordersContainer.querySelectorAll('.order-card');
        orderCards.forEach(card => card.remove());
        
        // Show empty message if no orders
        if (!ordersList || ordersList.length === 0) {
            if (emptyOrdersMsg) emptyOrdersMsg.classList.remove('hidden');
            return;
        }
        
        // Hide empty message if we have orders
        if (emptyOrdersMsg) emptyOrdersMsg.classList.add('hidden');
        
        // Sort orders by date (newest first)
        ordersList.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Create order cards
        ordersList.forEach(order => {
            try {
                // Create order card element
                const orderCard = document.createElement('div');
                orderCard.className = `order-card ${order.status || 'pending'}`;
                
                // Calculate total items count
                const totalItems = order.items.reduce((total, item) => total + item.quantity, 0);
                
                // Format date
                const orderDate = new Date(order.date);
                const formattedDate = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString();
                
                // Set order card HTML
                orderCard.innerHTML = `
                    <div class="order-header">
                        <h3>Bill #${order.billNumber || 'N/A'}</h3>
                        <span class="order-status ${order.status || 'pending'}">${capitalizeFirstLetter(order.status || 'pending')}</span>
                    </div>
                    <div class="order-info">
                        <div class="info-row">
                            <span>Date:</span>
                            <span>${formattedDate}</span>
                        </div>
                        <div class="info-row">
                            <span>Items:</span>
                            <span>${totalItems} item(s)</span>
                        </div>
                        <div class="info-row">
                            <span>Total:</span>
                            <span>${order.total || '₹0.00'}</span>
                        </div>
                        <div class="info-row">
                            <span>Payment:</span>
                            <span>${order.paymentMethod || 'N/A'}</span>
                        </div>
                    </div>
                    <button class="view-details-btn" data-id="${order.id}">View Details</button>
                `;
                
                // Add to orders container
                ordersContainer.appendChild(orderCard);
                
                // Add event listener to view details button
                const viewDetailsBtn = orderCard.querySelector('.view-details-btn');
                if (viewDetailsBtn) {
                    viewDetailsBtn.addEventListener('click', () => {
                        showOrderDetails(order);
                    });
                }
            } catch (error) {
                console.error('Error creating order card:', error);
            }
        });
    }

    // Function to show order details in modal
    function showOrderDetails(order) {
        const orderDetailsContent = document.getElementById('orderDetailsContent');
        const modalActions = document.getElementById('modalActions');
        
        // Format date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString();
        
        // Generate order details HTML
        orderDetailsContent.innerHTML = `
            <div class="order-id">
                <h3>Bill #${order.billNumber}</h3>
                <span class="order-status ${order.status}">${capitalizeFirstLetter(order.status)}</span>
            </div>
            <div class="order-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${formattedDate}</span>
            </div>
            <div class="order-items">
                <h4>Order Items</h4>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>₹${item.price}</td>
                                <td>${item.quantity}</td>
                                <td>₹${item.price * item.quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="order-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${order.subtotal}</span>
                </div>
                <div class="summary-row">
                    <span>GST (5%)</span>
                    <span>${order.gst}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>${order.total}</span>
                </div>
            </div>
            <div class="payment-info">
                <h4>Payment Information</h4>
                <div class="info-row">
                    <span>Method:</span>
                    <span>${order.paymentMethod}</span>
                </div>
                <div class="info-row">
                    <span>Status:</span>
                    <span>Paid</span>
                </div>
            </div>
            ${order.status === 'cancelled' ? `
            <div class="cancellation-info">
                <h4>Cancellation Information</h4>
                <div class="info-row">
                    <span>Reason:</span>
                    <span>${order.cancellationReason || 'Not specified'}</span>
                </div>
                <div class="info-row">
                    <span>Date:</span>
                    <span>${order.cancellationDate ? new Date(order.cancellationDate).toLocaleString() : 'Not available'}</span>
                </div>
            </div>
            ` : ''}
        `;
        
        // Generate action buttons based on order status
        modalActions.innerHTML = '';
        
        if (order.status === 'pending') {
            // Add Complete Order button
            const completeBtn = document.createElement('button');   
            completeBtn.className = 'complete-order-btn';
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark as Completed';
            completeBtn.addEventListener('click', () => {
                completeOrder(order.id);
            });
            modalActions.appendChild(completeBtn);
            
            // Add Cancel Order button
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'cancel-order-btn';
            cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancel Order';
            cancelBtn.addEventListener('click', () => {
                cancelOrder(order.id);
            });
            modalActions.appendChild(cancelBtn);
        }
        // Add Delete Order button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-order-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete Order';
        deleteBtn.addEventListener('click', () => {
            deleteOrder(order.id);
        });
        modalActions.appendChild(deleteBtn);
        
        // Add Print Invoice button
        const printBtn = document.createElement('button');
        printBtn.className = 'print-order-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Invoice';
        printBtn.addEventListener('click', () => {
            printInvoice(order);
        });
        modalActions.appendChild(printBtn);

        
        modal.style.display = 'block';
    }

    // Function to mark an order as completed
    function completeOrder(orderId) {
        if (confirm('Mark this order as completed?')) {
            // Find the order and update its status
            const orderIndex = orders.findIndex(order => order.id === orderId);
            if (orderIndex !== -1) {
                orders[orderIndex].status = 'completed';
                
                // Save updated orders to localStorage
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Close the modal and refresh the order display
                modal.style.display = 'none';
                const activeFilter = document.querySelector('.filter-btn.active').dataset.status;
                displayOrders(activeFilter === 'all' ? orders : orders.filter(order => order.status === activeFilter));
            }
        }
    }
    
    // Function to cancel an order
    function cancelOrder(orderId) {
        // Show cancellation reason modal
        const reasonModal = document.getElementById('cancellationReasonModal');
        const reasonInput = document.getElementById('cancellationReason');
        const confirmCancelBtn = document.getElementById('confirmCancelBtn');
        const cancelCancelBtn = document.getElementById('cancelCancelBtn');
        
        // Clear previous reason
        reasonInput.value = '';
        
        // Show the modal
        reasonModal.style.display = 'block';
        
        // Focus on the reason input
        reasonInput.focus();
        
        // Handle confirm button
        const handleConfirmCancel = () => {
            const reason = reasonInput.value.trim();
            if (!reason) {
                alert('Please provide a reason for cancellation');
                return;
            }
            
            // Find the order and update its status
            const orderIndex = orders.findIndex(order => order.id === orderId);
            if (orderIndex !== -1) {
                orders[orderIndex].status = 'cancelled';
                orders[orderIndex].cancellationReason = reason;
                orders[orderIndex].cancellationDate = new Date().toISOString();
                
                // Save updated orders to localStorage
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Close both modals and refresh the order display
                reasonModal.style.display = 'none';
                modal.style.display = 'none';
                
                // Clean up event listeners
                confirmCancelBtn.removeEventListener('click', handleConfirmCancel);
                cancelCancelBtn.removeEventListener('click', handleCancelCancel);
                
                // Update the display
                const activeFilter = document.querySelector('.filter-btn.active').dataset.status;
                displayOrders(activeFilter === 'all' ? orders : orders.filter(order => order.status === activeFilter));
            }
        };
        
        // Handle cancel button
        const handleCancelCancel = () => {
            reasonModal.style.display = 'none';
            
            // Clean up event listeners
            confirmCancelBtn.removeEventListener('click', handleConfirmCancel);
            cancelCancelBtn.removeEventListener('click', handleCancelCancel);
        };
        
        // Add event listeners
        confirmCancelBtn.addEventListener('click', handleConfirmCancel);
        cancelCancelBtn.addEventListener('click', handleCancelCancel);
    }

    // Function to print invoice
    function printInvoice(order) {
        alert('Printing invoice for Bill #' + order.billNumber);
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        
        // Format date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString();
        
        // Create the invoice HTML
        const invoiceHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice #${order.billNumber}</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 20px;
                        color: #333;
                    }
                    .invoice-header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #6366f1;
                        padding-bottom: 20px;
                    }
                    .invoice-header h1 {
                        color: #6366f1;
                        margin: 0;
                        font-size: 24px;
                    }
                    .invoice-details {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                    }
                    .invoice-details div {
                        flex: 1;
                    }
                    .invoice-details h3 {
                        margin: 0 0 10px 0;
                        color: #6366f1;
                        font-size: 16px;
                    }
                    .invoice-details p {
                        margin: 5px 0;
                        font-size: 14px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    th, td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f8f9fa;
                        color: #6366f1;
                    }
                    .total-section {
                        text-align: right;
                        margin-top: 20px;
                    }
                    .total-row {
                        margin: 5px 0;
                        font-size: 14px;
                    }
                    .grand-total {
                        font-size: 18px;
                        font-weight: bold;
                        color: #6366f1;
                        margin-top: 10px;
                        padding-top: 10px;
                        border-top: 2px solid #6366f1;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }
                    @media print {
                        body {
                            padding: 0;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="invoice-header">
                    <h1>Tabrix Restaurant</h1>
                    <p>Invoice #${order.billNumber}</p>
                </div>
                
                <div class="invoice-details">
                    <div>
                        <h3>Order Information</h3>
                        <p><strong>Date:</strong> ${formattedDate}</p>
                        <p><strong>Status:</strong> ${capitalizeFirstLetter(order.status)}</p>
                        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>₹${item.price}</td>
                                <td>${item.quantity}</td>
                                <td>₹${item.price * item.quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="total-section">
                    <div class="total-row">
                        <strong>Subtotal:</strong> ${order.subtotal}
                    </div>
                    <div class="total-row">
                        <strong>GST (5%):</strong> ${order.gst}
                    </div>
                    <div class="total-row grand-total">
                        <strong>Total Amount:</strong> ${order.total}
                    </div>
                </div>
                
                <div class="footer">
                    <p>Thank you for dining with us!</p>
                    <p>Tabrix Restaurant - Your favorite dining destination</p>
                </div>
                
                <div class="no-print" style="text-align: center; margin-top: 20px;">
                    <button onclick="window.print()" style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Print Invoice
                    </button>
                </div>
            </body>
            </html>
        `;
        
        // Write the invoice HTML to the new window
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        
        // Wait for the content to load before printing
        printWindow.onload = function() {
            printWindow.print();
            // Close the window after printing (optional)
            printWindow.close();
        };
    }



    // Function to delete an order
    function deleteOrder(orderId) {
        if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
            // Find and remove the order
            orders = orders.filter(order => order.id !== orderId);
            
            // Save updated orders to localStorage
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Close the modal and refresh the order display
            modal.style.display = 'none';
            const activeFilter = document.querySelector('.filter-btn.active').dataset.status;
            displayOrders(activeFilter === 'all' ? orders : orders.filter(order => order.status === activeFilter));
        }
    }

    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}); 