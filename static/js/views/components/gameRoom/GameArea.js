export function GameArea() {
    return `
        <div class="card bg-dark">
            <div class="card-body p-0">
                <div class="d-flex justify-content-between align-items-center bg-primary bg-gradient text-white p-3">
                    <div class="d-flex align-items-center">
                        <h4 class="mb-0 me-3">Game Room</h4>
                        <div class="score-display">
                            <span id="player1Score">0</span>
                            <span class="mx-2">-</span>
                            <span id="player2Score">0</span>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-light btn-sm" id="readyBtn">
                            <i class="bi bi-check-circle-fill"></i> Ready
                        </button>
                        <button class="btn btn-outline-light btn-sm" id="leaveRoom">
                            <i class="bi bi-box-arrow-right"></i> Leave
                        </button>
                    </div>
                </div>
                <div id="gameContainer" style="height: 75vh; position: relative;">
                    <canvas id="pongCanvas"></canvas>
                </div>
            </div>
        </div>
    `;
}