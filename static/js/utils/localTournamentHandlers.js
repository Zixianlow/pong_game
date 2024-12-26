import { animate } from './animation.js';
import { tournamentService } from '../services/tournament.service.js';

export function initLocalTournamentHandlers() {
    const form = document.getElementById('tournamentForm');

    // Handle form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // Collect player names
            const players = [];
            const inputs = form.querySelectorAll('input[type="text"]');
            inputs.forEach(input => {
                if (input.id !== 'tournamentName' && input.value.trim()) {
                    players.push(input.value.trim());
                }
            });

            if (players.length !== 4) {
                throw new Error('Exactly 4 players are required');
            }

            // Create tournament data
            const tournamentData = {
                name: document.getElementById('tournamentName').value,
                players,
                settings: {
                    thirdPlace: document.getElementById('thirdPlace').checked
                }
            };

            // Store tournament data in localStorage
            localStorage.setItem('tournamentData', JSON.stringify(tournamentData));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success alert-dismissible fade show mt-3';
            successMessage.innerHTML = `
                Tournament created successfully! Redirecting to brackets...
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            form.appendChild(successMessage);
            animate.fadeIn(successMessage);

            // Redirect to brackets view
            setTimeout(() => {
                window.location.href = '#/tournament/brackets';
            }, 1500);

        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger alert-dismissible fade show mt-3';
            errorMessage.innerHTML = `
                Error: ${error.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            form.appendChild(errorMessage);
            animate.fadeIn(errorMessage);
        }
    });

    // Animate form on load
    const formElements = document.querySelectorAll('form > div');
    formElements.forEach((element, index) => {
        animate.fadeIn(element, 500, index * 100);
    });
}