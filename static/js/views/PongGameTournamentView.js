import { initPongGameFinal } from '../game/PongGameFinal.js';
import { initPongGameSemi2 } from '../game/PongGameSemi2.js';
import { initPongGameSemi1 } from '../game/PongGameSemi1.js';

export function PongGameTournamentView(player1, player2, semi1, semi2, game) {
    if (game == "final")
        setTimeout(() => initPongGameFinal(player1, player2, semi1, semi2, game), 0);
    else if (game == "semi2")
        setTimeout(() => initPongGameSemi2(player1, player2, semi1, semi2, game), 0);
    else if (game == "semi1")
        setTimeout(() => initPongGameSemi1(player1, player2, semi1, semi2, game), 0);

    return `
        <div class="row">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center bg-primary bg-gradient text-white p-3">
                            <div class="d-flex align-items-center">
                                <h4 class="mb-0 me-3">Pong Arena</h4>
                                <div class="score-display">
                                    <span id="player1Score">0</span>
                                    <span class="mx-2">-</span>
                                    <span id="player2Score">0</span>
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-light btn-sm" id="pauseBtn">
                                    <i class="bi bi-pause-fill"></i> Pause
                                </button>
                                <button class="btn btn-outline-light btn-sm" id="resetBtn" style="display: none">
                                    <i class="bi bi-arrow-counterclockwise"></i> Reset
                                </button>
                            </div>
                        </div>
                        <div id="gameContainer" style="height: 75vh; position: relative;">
                            <canvas id="pongCanvas"></canvas>
                            <div id="gameOverlay" class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="display: none !important;">
                                <div class="text-center text-white">
                                    <h2 id="overlayMessage"></h2>
                                    <button class="btn btn-primary mt-3" id="proceedBtn">
                                        <i class="bi bi-play-fill"></i> Proceed
                                    </button>
                                </div>
                            </div>
                            <div class="text-center text-white" style="display: none">
                                    <h2 id="overlayMessage"></h2>
                                    <button class="btn btn-primary mt-3" id="restartBtn">
                                        <i class="bi bi-play-fill"></i> Play Again
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}