# UID Restaurant Management System

A comprehensive web-based billing system designed for restaurants, developed as a 2nd semester project. This system provides a complete solution for managing restaurant operations, including order processing, billing, and reporting.

## Features

- **Admin Authentication**
  - Secure admin login system
  - Single admin account for system management
  - Session-based authentication

### 2. Dashboard
- Real-time sales statistics
- Daily order tracking
- Pending orders monitoring
- Sales comparison with previous periods
- Customer rating system

### 3. Billing System
- Interactive menu interface
- Category-wise item organization
  - Starters (Veg/Non-veg)
  - Main Course (Veg/Non-veg)
  - Drinks (Alcoholic/Non-alcoholic)
  - Desserts
- Real-time bill calculation
- GST (5%) calculation
- Multiple payment methods:
  - UPI
  - Card
  - Cash

### 4. Order Management
- Order tracking
- Order history
- Order status updates
- Bill number generation

### 5. Reporting System
- Sales reports
- Order statistics
- Revenue analysis
- Historical data tracking

### 6. System Features
- Dark/Light theme support
- Responsive design
- Data persistence using localStorage
- System reset functionality

## Technical Stack

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Font Awesome Icons
  - Google Fonts (Poppins)

## Project Structure

```
├── assets/
│   └── images/
├── .vscode/
├── index.html          # Landing page
├── auth.js            # Authentication logic
├── billing.html       # Billing interface
├── billing.js         # Billing system logic
├── dashboard.html     # Admin dashboard
├── dashboard.js       # Dashboard functionality
├── orders.html        # Order management
├── orders.js          # Order processing logic
├── reports.html       # Reporting interface
├── reports.js         # Report generation logic
├── reset.html         # System reset interface
├── reset.js           # Reset functionality
├── style.css          # Global styles
└── README.md          # Project documentation
```

## Setup and Installation

1. Clone the repository
2. Open the project in a web server environment
3. Access the application through a modern web browser
4. Default login credentials:
   - Username: admin
   - Password: admin@123

## Usage

1. **Login**
   - Access the system through the login page
   - Enter credentials to access the dashboard

2. **Dashboard**
   - View real-time statistics
   - Monitor sales and orders
   - Access different modules

3. **Billing**
   - Select items from the menu
   - Add items to the bill
   - Process payments
   - Generate bills

4. **Orders**
   - View order history
   - Track order status
   - Manage pending orders

5. **Reports**
   - Generate sales reports
   - View analytics
   - Export data

## Security Features

- Session-based authentication
- Secure data storage using localStorage
- Protected routes
- Input validation
- XSS prevention

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

- The project uses vanilla JavaScript for all functionality
- CSS is organized with a component-based approach
- All data is stored in the browser's localStorage
- The system is designed to be easily extensible

## Future Enhancements

1. Backend Integration
2. Database Implementation
3. User Role Management
4. Inventory Management
5. Customer Management System
6. Online Ordering System
7. Mobile Application
8. Real-time order tracking
9. Integration with payment gateways
10. Advanced analytics and reporting

## Contributing

This is a semester project. For any suggestions or improvements, please contact the developer.

## License

This project is created for educational purposes.