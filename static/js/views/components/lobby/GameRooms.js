import { roomService } from '../../../services/api/roomService.js';
import { LoadingSpinner } from '../../../components/LoadingSpinner.js';

export async function GameRooms() {
    const container = document.createElement('div');
    container.innerHTML = LoadingSpinner();

    try {
        const rooms = await roomService.getRooms();
        
        if (!Array.isArray(rooms)) {
            throw new Error('Invalid room data received');
        }

        container.innerHTML = `
            <div class="card h-100">
                <div class="card-header bg-primary bg-gradient text-white d-flex justify-content-between align-items-center py-3">
                    <h5 class="mb-0">Active Game Rooms</h5>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="dropdown">
                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                All Types
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">All Types</a></li>
                                <li><a class="dropdown-item" href="#">Casual</a></li>
                                <li><a class="dropdown-item" href="#">Ranked</a></li>
                                <li><a class="dropdown-item" href="#">Tournament</a></li>
                            </ul>
                        </div>
                        <button class="btn btn-light btn-sm" id="refreshRooms">
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="list-group list-group-flush" id="roomsList">
                        ${generateRoomsList(rooms)}
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading rooms: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}

function generateRoomsList(rooms) {
    if (!Array.isArray(rooms) || rooms.length === 0) {
        return `
            <div class="list-group-item text-center text-muted py-5">
                No active rooms found
            </div>
        `;
    }

    return rooms.map(room => `
        <div class="list-group-item list-group-item-action p-3" data-room-id="${room.id}">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <div class="room-icon me-3 p-2 bg-${getBadgeColor(room.type)} bg-opacity-10 rounded-circle">
                        <i class="bi bi-controller fs-4 text-${getBadgeColor(room.type)}"></i>
                    </div>
                    <div>
                        <h6 class="mb-1">${room.name}</h6>
                        <small class="text-muted">Hosted by ${room.host}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <div class="text-end">
                        <span class="badge bg-${getBadgeColor(room.type)}">${room.type}</span>
                        <small class="d-block text-muted mt-1">${room.skill || 'All Levels'}</small>
                    </div>
                    <div class="text-end">
                        <div class="mb-1">${room.players.length}/${room.maxPlayers}</div>
                        <small class="text-muted">${room.status}</small>
                    </div>
                    <button class="btn btn-primary btn-sm join-room-btn">
                        ${room.status === "Waiting" ? "Join" : "Spectate"}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getBadgeColor(type) {
    const colors = {
        'Ranked': 'danger',
        'Casual': 'success',
        'Tournament': 'warning'
    };
    return colors[type] || 'primary';
}