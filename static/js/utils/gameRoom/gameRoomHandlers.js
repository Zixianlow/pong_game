import { animate } from '../animation.js';
import { initChat } from './chatHandlers.js';
import { initGameControls } from './gameControls.js';
import { initPlayersList } from './playersListHandlers.js';
import { roomService } from '../../services/api/roomService.js';

export function initGameRoom() {
    initGameControls();
    initChat();
    initPlayersList();
    loadRoomData();
}

async function loadRoomData() {
    try {
        const roomData = await roomService.getRoomDetails();
        updateRoomInfo(roomData);
    } catch (error) {
        console.error('Error loading room data:', error);
    }
}

function updateRoomInfo(roomData) {
    const roomName = document.getElementById('roomName');
    const gameMode = document.getElementById('gameMode');
    
    if (roomName) roomName.textContent = roomData.name;
    if (gameMode) gameMode.textContent = roomData.type;
}