import { PlayersList } from './PlayersList.js';
import { LobbyChat } from './LobbyChat.js';
import { LoadingSpinner } from '../../../components/LoadingSpinner.js';

export async function LobbySidebar() {
    const container = document.createElement('div');
    container.innerHTML = LoadingSpinner();

    try {
        const players = await PlayersList();
        
        container.innerHTML = `
            <div class="d-flex flex-column gap-4 w-100" style="height: calc(100vh - 280px);">
                <div class="players-section" style="min-height: 150px; max-height: 100px;">
                    ${players}
                </div>
                <div class="chat-section flex-grow-1 d-flex  style="max-height: 100px;"">
                    ${LobbyChat()}
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading sidebar: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}