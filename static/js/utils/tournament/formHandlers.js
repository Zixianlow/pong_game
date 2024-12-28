import { animate } from '../animation.js';
import { TournamentState } from './state.js';

export function initTournamentForm() {
    const form = document.getElementById('tournamentForm');
    
    // Animate form elements on load
    const formElements = document.querySelectorAll('form > div');
    formElements.forEach((element, index) => {
        animate.fadeIn(element, 400, index * 100);
    });

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

            const playerSet = new Set(players);
            if (playerSet.size !== players.length) {
                throw new Error('Players name must be unique');
            }

            // Create tournament data
            const tournamentData = {
                name: document.getElementById('tournamentName').value,
                players,
                settings: {
                    thirdPlace: document.getElementById('thirdPlace').checked
                }
            };

            // Store tournament data
            TournamentState.setTournamentData(tournamentData);

            // Show success message
            showSuccessMessage(form);

            // Navigate to brackets view
            setTimeout(() => {
                window.location.hash = '/tournament/brackets';
            }, 1000);

        } catch (error) {
            showErrorMessage(form, error.message);
        }
    });
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success alert-dismissible fade show mt-3';
    successMessage.innerHTML = `
        Tournament created successfully! Redirecting to brackets...
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    form.appendChild(successMessage);
    animate.fadeIn(successMessage);
}

function showErrorMessage(form, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger alert-dismissible fade show mt-3';
    errorMessage.innerHTML = `
        Error: ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    form.appendChild(errorMessage);
    animate.fadeIn(errorMessage);
}