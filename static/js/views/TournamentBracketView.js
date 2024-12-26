import { initTournamentBracket } from '../utils/tournament/bracketHandlers.js';

export function TournamentBracketView(semi1 = null, semi2 = null) {
    setTimeout(() => initTournamentBracket(semi1, semi2), 0);

    return `
        <div class="row">
            <div class="col-12">
                <div class="card bg-dark text-white mb-4">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h2 class="mb-1">Tournament Brackets</h2>
                                <p class="mb-0 text-light">Follow the progress of the tournament</p>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-light" onclick="history.back()">
                                    <i class="bi bi-arrow-left me-2"></i>Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div id="bracketContainer">
                    <!-- Brackets will be dynamically generated here -->
                </div>
            </div>

            <!-- Match Details Modal -->
            <div class="modal fade match-details-modal" id="matchDetailsModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Match Details</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="match-player">
                                <div class="player-info flex-grow-1">
                                    <div class="player-avatar">
                                        <i class="bi bi-person-fill"></i>
                                    </div>
                                    <span class="player-name" id="player1Name">Player 1</span>
                                </div>
                                <input type="number" class="form-control match-score-input" id="player1Score" min="0" max="11">
                            </div>
                            <div class="match-player">
                                <div class="player-info flex-grow-1">
                                    <div class="player-avatar">
                                        <i class="bi bi-person-fill"></i>
                                    </div>
                                    <span class="player-name" id="player2Name">Player 2</span>
                                </div>
                                <input type="number" class="form-control match-score-input" id="player2Score" min="0" max="11">
                            </div>
                            <div class="text-center mt-4">
                                <button class="btn btn-primary w-100" id="startMatch">
                                    <i class="bi bi-play-fill me-2"></i>Start Match
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}