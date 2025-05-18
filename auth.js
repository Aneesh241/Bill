document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const authSubmit = document.getElementById('authSubmit');
    const authError = document.getElementById('authError');

    // Check if user is already logged in
    if (sessionStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
    }

    // Handle form submission
    authSubmit.addEventListener('click', () => {
        const username = emailInput.value.trim();
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
            sessionStorage.setItem('currentUser', JSON.stringify({ 
                name: 'Admin', 
                email: 'admin' 
            }));
            window.location.href = 'dashboard.html';
        } else {
            showError('Invalid username or password');
        }
    });

    function showError(message) {
        authError.textContent = message;
        authError.classList.add('fade-in');
        setTimeout(() => {
            authError.classList.remove('fade-in');
        }, 300);
    }

    // Initialize theme if first visit
    if (!localStorage.getItem('theme')) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', initialTheme);
        localStorage.setItem('theme', initialTheme);
    }
}); 