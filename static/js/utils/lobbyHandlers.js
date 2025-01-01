import { animate } from './animation.js';
import { roomService } from '../services/api/roomService.js';

export function initLobbyHandlers() {
    const chatInput = document.getElementById('lobbyChatInput');
    const sendButton = document.getElementById('lobbyChatSend');
    const chatMessages = document.querySelector('.chat-messages');
    const createRoomBtn = document.getElementById('createRoomBtn');
    const quickPlayBtn = document.getElementById('quickPlayBtn');
    const refreshRoomsBtn = document.getElementById('refreshRooms');
    const roomsList = document.getElementById('roomsList');

    function addChatMessage(text, user = 'You') {
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message mb-2';
        messageDiv.innerHTML = `
            <small class="fw-bold">${user}:</small>
            <span>${text}</span>
        `;
        
        chatMessages.appendChild(messageDiv);
        animate.fadeIn(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleSendMessage() {
        const text = chatInput?.value?.trim();
        if (text) {
            addChatMessage(text);
            chatInput.value = '';

            try {
                // Simulate response while waiting for WebSocket implementation
                setTimeout(() => {
                    const responses = [
                        "I'm interested in joining!",
                        "Give me a minute to finish my current game.",
                        "What skill level are you looking for?",
                        "I'll create a room for us!"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    const users = ["John", "Sarah", "Mike", "Emma"];
                    const randomUser = users[Math.floor(Math.random() * users.length)];
                    addChatMessage(randomResponse, randomUser);
                }, 1500);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }

    async function handleJoinRoom(roomId) {
        try {
            await roomService.joinRoom(roomId);
            window.location.href = '#/game-room';
        } catch (error) {
            console.error('Error joining room:', error);
        }
    }

    async function refreshRooms() {
        try {
            const rooms = await roomService.getRooms();
            if (roomsList) {
                roomsList.innerHTML = generateRoomsList(rooms);
                animate.staggerChildren(roomsList, '.list-group-item');
            }
        } catch (error) {
            console.error('Error refreshing rooms:', error);
        }
    }

    // Event Listeners
    sendButton?.addEventListener('click', handleSendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    createRoomBtn?.addEventListener('click', () => {
        animate.fadeIn(createRoomBtn, 100);
        window.location.href = '#/create-room';
    });

    quickPlayBtn?.addEventListener('click', () => {
        animate.fadeIn(quickPlayBtn, 100);
        const proceedbutton = document.getElementById('proceedBtn');
        proceedbutton.style.display = 'none';
        document.getElementById('semi1Winner').textContent = '';
        document.getElementById('semi2Winner').textContent = '';
        document.getElementById('player1Name').textContent = 'Player 1';
        document.getElementById('player2Name').textContent = 'Player 2';
        document.querySelector('#gameType').textContent = '';
    });

    refreshRoomsBtn?.addEventListener('click', () => {
        const icon = refreshRoomsBtn.querySelector('.bi-arrow-clockwise');
        if (icon) {
            icon.style.transition = 'transform 0.5s ease';
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 500);
        }
        refreshRooms();
    });

    // Add click handlers for room items
    document.querySelectorAll('#roomsList .list-group-item')?.forEach(item => {
        item.addEventListener('click', () => {
            const roomId = item.dataset.roomId;
            if (roomId) {
                handleJoinRoom(roomId);
            }
        });
    });

    // Initial animations
    if (roomsList) {
        animate.staggerChildren(roomsList, '.list-group-item');
    }

    const onlinePlayersList = document.querySelector('.list-group-flush');
    if (onlinePlayersList) {
        animate.staggerChildren(onlinePlayersList, '.list-group-item');
    }
}