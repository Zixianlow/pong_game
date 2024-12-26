import { LobbyLayout } from './components/lobby/LobbyLayout.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { initLobbyHandlers } from '../utils/lobbyHandlers.js';

export async function GameLobbyView() {
    const container = document.createElement('div');
    
    try {
        container.innerHTML = await LobbyLayout();
        setTimeout(() => initLobbyHandlers(), 0);
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading lobby: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}