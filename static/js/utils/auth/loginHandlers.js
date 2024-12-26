import { authService } from '../../services/api/authService.js';
import { animate } from '../animation.js';

export function initLoginHandlers() {
    const form = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Animate form elements
    const formElements = document.querySelectorAll('form > *');
    formElements.forEach((element, index) => {
        animate.fadeIn(element, 300, index * 100);
    });

    // Toggle password visibility
    togglePassword?.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.innerHTML = `<i class="bi bi-eye${type === 'password' ? '' : '-slash'}"></i>`;
    });

    // Handle form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            const response = await authService.login({ email, password, rememberMe });

            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success alert-dismissible fade show';
            successMessage.innerHTML = `
                Login successful! Redirecting...
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            form.insertBefore(successMessage, form.firstChild);
            animate.fadeIn(successMessage);

            // Get redirect URL if exists
            const redirectUrl = localStorage.getItem('redirectUrl') || '/';
            localStorage.removeItem('redirectUrl');

            // Redirect after successful login
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1500);

        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger alert-dismissible fade show';
            errorMessage.innerHTML = `
                ${error.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            form.insertBefore(errorMessage, form.firstChild);
            animate.fadeIn(errorMessage);
        }
    });
}