/**
 * Authentication Module
 * Handles user login functionality and session management
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements for authentication form
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const authSubmit = document.getElementById('authSubmit');
    const authError = document.getElementById('authError');

    // Check if user is already logged in
    // If session exists, redirect to dashboard
    if (sessionStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
    }

    // Handle form submission
    authSubmit.addEventListener('click', () => {
        // Get and trim input values
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate inputs
        if (!username) {
            showError('Please enter username');
            return;
        }
        if (!password) {
            showError('Please enter password');
            return;
        }

        // Check admin credentials
        if (username === 'admin' && password === 'admin@123') {
            // Store user session
            sessionStorage.setItem('currentUser', JSON.stringify({ 
                name: 'Nikil',
            }));
            // Redirect to dashboard on successful login
            window.location.href = 'dashboard.html';
        } else {
            showError('Invalid username or password');
        }
    });

    /**
     * Displays error messages with a fade-in animation
     * @param {string} message - The error message to display
     */
    function showError(message) {
        authError.textContent = message;
        authError.classList.add('fade-in');
        setTimeout(() => {
            authError.classList.remove('fade-in');
        }, 300);
    }

}); 