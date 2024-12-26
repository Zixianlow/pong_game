import { GameArea } from './components/gameRoom/GameArea.js';
import { RoomInfo } from './components/gameRoom/RoomInfo.js';
import { RoomChat } from './components/gameRoom/RoomChat.js';
import { initGameRoom } from '../utils/gameRoom/gameRoomHandlers.js';

export function GameRoomView() {
    return;
    setTimeout(() => initGameRoom(), 0);

    return `
        <div class="row g-4">
            <!-- Game Area -->
            <div class="col-lg-8">
                ${GameArea()}
            </div>

            <!-- Room Info & Chat -->
            <div class="col-lg-4">
                ${RoomInfo()}
                ${RoomChat()}
            </div>
        </div>
    `;
}