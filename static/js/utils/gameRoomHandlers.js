import { animate } from './animation.js';

export function initGameRoom() {
    const readyBtn = document.getElementById('readyBtn');
    const leaveRoom = document.getElementById('leaveRoom');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const playersList = document.getElementById('playersList');
    const chatMessages = document.querySelector('.chat-messages');

    // Simulated room data (replace with actual API data)
    const roomData = {
        name: "Pro League #1",
        mode: "Ranked",
        players: [
            { id: 1, name: "Player 1", ready: false, host: true },
            { id: 2, name: "Player 2", ready: false, host: false }
        ]
    };

    function updateRoomInfo() {
        document.getElementById('roomName').textContent = roomData.name;
        document.getElementById('gameMode').textContent = roomData.mode;
        updatePlayersList();
    }

    function updatePlayersList() {
        if (!playersList) return;

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
    }

    function addChatMessage(text, user = 'You') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message mb-2';
        messageDiv.innerHTML = `
            <small class="text-muted">${user}:</small>
            <div class="bg-light p-2 rounded">${text}</div>
        `;
        
        chatMessages?.appendChild(messageDiv);
        animate.fadeIn(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        const text = chatInput?.value.trim();
        if (text) {
            addChatMessage(text);
            chatInput.value = '';
        }
    }

    function toggleReady() {
        const isReady = readyBtn.classList.contains('btn-success');
        readyBtn.classList.toggle('btn-success');
        readyBtn.classList.toggle('btn-light');
        readyBtn.innerHTML = isReady ? 
            '<i class="bi bi-check-circle-fill"></i> Ready' : 
            '<i class="bi bi-check-circle-fill"></i> Ready!';
        
        // Update player ready status
        const currentPlayer = roomData.players[0];
        currentPlayer.ready = !isReady;
        updatePlayersList();
    }

    // Event Listeners
    readyBtn?.addEventListener('click', toggleReady);
    leaveRoom?.addEventListener('click', () => {
        window.location.href = '#/lobby';
    });

    sendMessage?.addEventListener('click', handleSendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Initialize room
    updateRoomInfo();
}