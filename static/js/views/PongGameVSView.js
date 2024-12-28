import { initPongGameVS } from '../game/PongGameVS.js';

export function PongGameVSView(player1, player2, socketuser) {
    setTimeout(() => initPongGameVS(player1, player2, socketuser), 0);

    return `
        <div class="row">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center bg-primary bg-gradient text-white p-3">
                            <div class="d-flex align-items-center">
                                <h4 class="mb-0 me-3">Pong Arena</h4>
                                <div class="score-display">
                                    <span id="vsplayer1Score">0</span>
                                    <span class="mx-2">-</span>
                                    <span id="vsplayer2Score">0</span>
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-light btn-sm" id="vspauseBtn">
                                    <i class="bi bi-pause-fill"></i> Pause
                                </button>
                                <button class="btn btn-outline-light btn-sm" id="vsresetBtn" style="display: none">
                                    <i class="bi bi-arrow-counterclockwise"></i> Reset
                                </button>
                            </div>
                        </div>
                        <div id="vsgameContainer" style="height: 75vh; position: relative;">
                            <canvas id="vspongCanvas"></canvas>
                            <div id="vsgameOverlay" class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="display: none !important;">
                                <div class="text-center text-white">
                                    <h2 id="vsoverlayMessage"></h2>
                                    <button class="btn btn-primary mt-3" id="vsproceedBtn">
                                        <i class="bi bi-play-fill"></i> Proceed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}