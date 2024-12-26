import { authService } from '../../services/api/authService.js';
import { animate } from '../animation.js';

export function initRegisterHandlers() {
    const form = document.getElementById('registerForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');

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

    // Check password strength
    passwordInput?.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        updatePasswordStrengthUI(strength);
    });

    // Handle form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await authService.register({ username, email, password });
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success alert-dismissible fade show';
            successMessage.innerHTML = `
                Registration successful! Redirecting to login...
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            form.insertBefore(successMessage, form.firstChild);
            animate.fadeIn(successMessage);

            // Redirect to login page
            setTimeout(() => {
                window.location.href = '/login';
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

function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    return strength;
}

function updatePasswordStrengthUI(strength) {
    if (!passwordStrength) return;

    const strengthTexts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['danger', 'warning', 'info', 'primary', 'success'];

    passwordStrength.innerHTML = `
        <div class="progress" style="height: 5px;">
            <div class="progress-bar bg-${strengthColors[strength - 1]}" 
                 role="progressbar" 
                 style="width: ${strength * 20}%"></div>
        </div>
        <small class="text-${strengthColors[strength - 1]} mt-1 d-block">
            ${strengthTexts[strength - 1]}
        </small>
    `;
}