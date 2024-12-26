import { roomService } from '../../services/api/roomService.js';
import { animate } from '../animation.js';

export function initPlayersList() {
    const playersList = document.getElementById('playersList');
    
    async function updatePlayersList() {
        try {
            const roomData = await roomService.getRoomDetails();
            if (playersList) {
                playersList.innerHTML = roomData.players.map(player => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <i class="bi bi-person-fill me-2"></i>
                            ${player.name}
                            ${player.host ? '<span class="badge bg-primary ms-2">Host</span>' : ''}
                        </div>
                        <span class="badge bg-${player.ready ? 'success' : 'secondary'} rounded-pill">
                            ${player.ready ? 'Ready' : 'Not Ready'}
                        </span>
                    </div>
                `).join('');

                // Animate new items
                const items = playersList.querySelectorAll('.list-group-item');
                items.forEach((item, index) => {
                    animate.fadeIn(item, 300, index * 100);
                });
            }
        } catch (error) {
            console.error('Error updating players list:', error);
        }
    }

    // Initial update
    updatePlayersList();

    // Update periodically
    setInterval(updatePlayersList, 5000);
}