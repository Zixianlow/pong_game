import { animate } from './animation.js';

export function initProfileEditHandlers() {
    const form = document.getElementById('profileEditForm');
    const profilePicture = document.getElementById('profilePicture');
    const profilePreview = document.getElementById('profilePreview');

    // Animate form elements on load
    const formElements = document.querySelectorAll('form .row > *');
    formElements.forEach((element, index) => {
        animate.fadeIn(element, 400, index * 100);
    });

    // Handle profile picture change
    profilePicture?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file && profilePreview) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePreview.src = e.target?.result;
                animate.fadeIn(profilePreview, 300);
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
        successMessage.innerHTML = `
            Profile updated successfully!
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMessage);
        animate.fadeIn(successMessage);

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            animate.fadeOut(successMessage);
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
    });
}