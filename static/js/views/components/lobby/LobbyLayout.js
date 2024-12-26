import { LobbyHeader } from './LobbyHeader.js';
import { GameRoomsList } from './GameRoomsList.js';
import { LobbySidebar } from './LobbySidebar.js';
import { LoadingSpinner } from '../../../components/LoadingSpinner.js';

export async function LobbyLayout() {
    const container = document.createElement('div');
    container.className = 'row g-4';
    
    try {
        // Load header synchronously
        container.innerHTML = `
            <div class="col-12 mb-4">
                ${LobbyHeader()}
            </div>
        `;

        // Create main content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'row';
        
        // Create placeholders for async content
        const mainContent = document.createElement('div');
        mainContent.className = 'col-lg-8 mb-4 mb-lg-0';
        mainContent.innerHTML = LoadingSpinner();

        const sidebar = document.createElement('div');
        sidebar.className = 'col-lg-4 d-flex';
        sidebar.innerHTML = LoadingSpinner();

        contentContainer.appendChild(mainContent);
        contentContainer.appendChild(sidebar);
        container.appendChild(contentContainer);

        // Load async content
        const [roomsList, sidebarContent] = await Promise.all([
            GameRoomsList(),
            LobbySidebar()
        ]);

        mainContent.innerHTML = roomsList;
        sidebar.innerHTML = sidebarContent;

    } catch (error) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Error loading lobby layout: ${error.message}
                </div>
            </div>
        `;
    }

    return container.innerHTML;
}