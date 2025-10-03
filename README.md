# Tabrix – Restaurant Management System

A modern, comprehensive web-based billing and restaurant management system developed as an end-semester project for the subject User Interface and Design (UID) . This system provides a complete solution for managing restaurant operations with an emphasis on premium user experience, featuring advanced animations, responsive design, and intuitive interfaces for efficient restaurant management.

## Features

### 1. Authentication System
- **Secure Admin Login**
  - Single admin account (`admin` / `admin@123`)
  - Session-based authentication with sessionStorage
  - Automatic redirect protection for unauthorized access
  - Logout functionality across all pages

### 2. Dashboard
- **Real-time Statistics Display**
  - Total sales from completed orders
  - Pending orders count
  - Today's order count
  - Automatic data refresh and calculations
- **User Session Management**
- **Quick Navigation Hub**

### 3. Comprehensive Billing System
- **Extensive Menu Catalog** (88+ items):
  - **Starters**: Veg (12 items) & Non-Veg (12 items)
  - **Main Course**: Veg (12 items) & Non-Veg (12 items)
  - **Drinks**: Alcoholic (12 items) & Non-Alcoholic (12 items)
  - **Desserts**: 16 variety items
- **Advanced Billing Features**:
  - Interactive menu with category-wise organization and smooth scrolling
  - Real-time bill calculation with animated itemized display
  - Automatic GST calculation (5%) with live updates
  - Quantity management with +/- controls and visual feedback
  - Bill total with comprehensive tax breakdown
  - Auto-scroll to top when changing categories
- **Multiple Payment Methods**:
  - **UPI Payment** with QR Code display and processing simulation
  - **Card Payment** with processing simulation 
  - **Cash Payment** with confirmation workflows
- **Payment Processing**:
  - Animated payment status indicators with spinners and success icons
  - Loading animations with cancellation options
  - Success confirmations with visual feedback
  - Automatic bill number generation (TBX001, TBX002, etc.)
  - Seamless order completion handling

### 4. Enhanced Order Management System
- **Visual Status System**:
  - **Color-Coded Status Bars**: Prominent gradient status bars on each order card
  - **Status Categories**: Pending (Yellow), Completed (Green), Cancelled (Red)
  - **Interactive Animations**: Pending orders feature subtle pulsing effects to draw attention
  - **Hover Effects**: Status bars expand on hover for better visual feedback
- **Comprehensive Order Tracking**:
  - Modern card-based order display with enhanced visual hierarchy
  - Advanced filtering by status (All, Pending, Completed, Cancelled, Processing, Preparing, Ready)
  - Real-time order status management with instant visual updates
  - Professional rounded card design with proper spacing
- **Order Details**:
  - Auto-generated bill numbers with unique Tabrix prefix (TBX001, TBX002, etc.)
  - Comprehensive date/time tracking with formatted display
  - Detailed itemized breakdown with quantities, prices, and totals
  - Payment method indicators with visual icons
  - Complete order summary with subtotal, GST, and final amount
- **Enhanced Order Actions**:
  - Mark orders as completed with confirmation dialogs
  - Cancel orders with mandatory reason tracking
  - Status change animations with smooth transitions
  - Real-time status updates across all system components

### 5. Advanced Reporting System
- **Date Range Filtering**
  - Custom date range selection
  - Default current month view
  - Dynamic report generation
- **Summary Analytics** (4 Key Metrics):
  - Total Revenue (from completed orders only)
  - Total Bills count
  - Items Sold quantity
  - Average Bill Value
- **Multi-Tab Reports**:
  - **Sales Report**: Detailed transaction history with status
  - **Item Analysis**: Best-selling items and revenue breakdown
  - **Payment Methods**: Visual charts showing payment distribution
  - **Cancellation Analysis**: Order completion statistics and cancellation reasons
- **Visual Data Representation**:
  - Horizontal bar charts for payment methods
  - Completion rate visualization
  - Percentage-based analytics
- **Export Functionality** (CSV format):
  - Sales report export
  - Items analysis export
  - Payment methods export
  - Cancellation report export

### 6. System Administration
- **Reset Functionality**:
  - Complete order and transaction reset
  - Confirmation dialogs for safety
  - Clean slate system restoration
- **Data Management**:
  - localStorage-based data persistence
  - Automatic data validation and error handling

### 7. UI/UX Features
- **Advanced Theme System**:
  - Seamless Dark/Light mode toggle with instant switching
  - Theme preference persistence across sessions
  - Automatic system preference detection
  - Smooth theme transitions with CSS custom properties
  - Theme-aware color-coding for all status indicators
- **Enhanced Scrolling Experience**:
  - **Custom Scrollbars**: Gradient-themed scrollbars with hover effects
  - **Smooth Scroll Behavior**: Native smooth scrolling with momentum
  - **Scroll Progress Indicators**: Visual progress tracking for long content
  - **Auto-scroll Features**: Smart scrolling when switching categories
  - **Performance Optimized**: GPU-accelerated scrolling with will-change properties
- **Advanced Animations & Interactions**:
  - **Staggered Loading**: Progressive fade-in animations for menu items
  - **Hover Effects**: Scale + Shadow Lift effects with cubic-bezier timing
  - **Micro-interactions**: Subtle feedback for all user actions
  - **Status Pulsing**: Attention-grabbing animations for pending orders
  - **Loading States**: Professional loading animations with spinners
- **Modern Card Design**:
  - **Enhanced Cards**: Rounded corners, backdrop blur, and layered shadows
  - **Color-Coded Elements**: Visual status indicators with gradient bars
  - **Interactive Feedback**: Hover states with elevation and color changes
  - **Professional Layout**: Consistent spacing and typography hierarchy
- **Responsive Design**:
  - Mobile-first approach with touch-friendly interfaces
  - Flexible grid layouts that adapt to all screen sizes
  - Optimized interactions for both desktop and mobile users
  - Consistent experience across all devices
- **Collapsible Sidebar Navigation**:
  - Smooth expand/collapse with icon-only mode and tooltips
  - Desktop toggle via hamburger or keyboard shortcut (Ctrl + B)
  - Mobile off-canvas drawer with overlay and floating hamburger
  - State persistence (remembers collapsed/expanded)
- **Professional Styling**:
  - Glassmorphism effects with backdrop blur
  - Multi-layer gradient backgrounds
  - Modern CSS Grid and Flexbox layouts
  - Font Awesome 6.0 icon integration
  - Google Fonts (Poppins) with multiple weights
  - CSS custom properties for maintainable theming

## Technical Architecture

### Frontend Technologies
- **Core Technologies**:
  - HTML5 with semantic markup and accessibility features
  - Advanced CSS3 with modern features:
    - CSS Grid and Flexbox for responsive layouts
    - CSS Custom Properties (Variables) for theming
    - CSS Animations and Keyframes for smooth transitions
    - Pseudo-elements for visual effects
    - Backdrop-filter for glassmorphism effects
    - Transform3D for hardware acceleration
  - Modern Vanilla JavaScript (ES6+) with:
    - Arrow functions and destructuring
    - Template literals for dynamic content
    - Event delegation and proper memory management
    - LocalStorage API for persistent data
    - Async operations for smooth UX
- **External Libraries**:
  - Font Awesome 6.0.0 (Professional icon set)
  - Google Fonts - Poppins (Modern typography with multiple weights)
- **Advanced Design Patterns**:
  - Module-based JavaScript architecture with separation of concerns
  - Component-oriented CSS with BEM-inspired methodology
  - Event-driven programming with proper event delegation
  - State management using localStorage with JSON serialization
  - Progressive enhancement for accessibility
  - Performance optimization with CSS will-change and transform3d

### Data Management
- **Storage**: Browser's localStorage API
- **Data Structures**: JSON-based order and session management
- **Persistence**: Automatic data saving and retrieval
- **Validation**: Input sanitization and error handling

## Project Structure

```
Billing System/
├── assets/
│   └── images/
│       ├── background.jpg      # Auth page background
│       └── upi-qr.png         # UPI payment QR code
├── index.html                 # Landing/Authentication page
├── auth.js                    # Authentication logic & session management
├── billing.html               # Advanced billing interface
├── billing.js                 # Billing system with enhanced UX
├── dashboard.html             # Real-time admin dashboard
├── dashboard.js               # Dashboard analytics & statistics
├── orders.html                # Order management interface
├── orders.js                  # Order processing with status management
├── reports.html               # Comprehensive reporting interface
├── reports.js                 # Advanced report generation & export
├── reset.html                 # System reset interface
├── reset.js                   # Data reset functionality
├── style.css                  # Global styles with premium animations
├── theme.js                   # Dark/Light theme management
├── sidebar.js                 # Collapsible sidebar & mobile navigation (desktop + mobile)
└── README.md                  # Comprehensive project documentation
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

## Key Achievements & Highlights

- ✅ **Premium User Experience**: Industry-standard animations and interactions
- ✅ **Advanced Visual Design**: Color-coded systems with gradient effects
- ✅ **Smooth Performance**: Hardware-accelerated animations and transitions
- ✅ **Modern Web Standards**: Progressive enhancement and accessibility
- ✅ **Professional UI/UX**: Comparable to commercial restaurant management systems
- ✅ **Comprehensive Functionality**: Complete end-to-end restaurant operations
- ✅ **Cross-browser Compatibility**: Works seamlessly across all modern browsers
- ✅ **Responsive Design**: Optimal experience on all device sizes

## Future Enhancements

### Phase 1: Backend Integration
1. **Node.js/Express Backend** with RESTful APIs
2. **MongoDB/PostgreSQL Database** for persistent data storage
3. **Real-time WebSocket** connections for live order updates
4. **JWT Authentication** for enhanced security

### Phase 2: Advanced Features
5. **Multi-user Role Management** (Admin, Manager, Staff, Kitchen)
6. **Inventory Management System** with low-stock alerts
7. **Customer Management System** with loyalty programs
8. **Kitchen Display System** for order preparation

### Phase 3: Mobile & Cloud
9. **Progressive Web App (PWA)** for mobile installation
10. **React Native Mobile Application** for iOS and Android
11. **Cloud Deployment** with AWS/Azure integration
12. **Payment Gateway Integration** (Stripe, Razorpay, PayPal)

### Phase 4: Analytics & AI
13. **Advanced Analytics Dashboard** with predictive insights
14. **Machine Learning** for sales forecasting and menu optimization
15. **Voice Ordering System** with speech recognition
16. **QR Code Menu** for contactless ordering

## Contributing 

This is a User Interface and Design (UID) end semester project. For any suggestions or improvements, please contact the developer.

## License


This project is created for educational purposes.
