import { initTournamentForm } from '../utils/tournament/formHandlers.js';

export function LocalTournamentView() {
    // Initialize form handlers after the view is rendered
    setTimeout(() => initTournamentForm(), 0);

    return `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-primary text-white py-4">
                        <h3 class="mb-0">Local Tournament Setup</h3>
                        <p class="mb-0 text-light">Create a 4-player tournament and compete with friends!</p>
                    </div>
                    <div class="card-body p-4">
                        <form id="tournamentForm">
                            <div class="mb-4">
                                <label class="form-label">Tournament Name</label>
                                <input type="text" class="form-control" id="tournamentName" required>
                            </div>

                            <div id="playersContainer" class="mb-4">
                                <label class="form-label">Player Names</label>
                                <div id="playersList" class="row g-3">
                                    ${generatePlayerInputs()}
                                </div>
                            </div>

                            <div class="mb-4" style="display: none">
                                <label class="form-label">Tournament Settings</label>
                                <div class="row g-3">
                                    <div class="col-12">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="thirdPlace" checked>
                                            <label class="form-check-label" for="thirdPlace">
                                                Include Third Place Match
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between">
                                <a href="/" class="btn btn-outline-secondary">
                                    <i class="bi bi-arrow-left me-2"></i>Back
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-trophy-fill me-2"></i>Start Tournament
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generatePlayerInputs() {
    const players = Array.from({ length: 4 }, (_, i) => i + 1);
    
    return players.map(num => `
        <div class="col-md-6">
            <div class="input-group">
                <span class="input-group-text">
                    <i class="bi bi-person-fill"></i>
                </span>
                <input type="text" 
                       class="form-control" 
                       placeholder="Player ${num}" 
                       name="player${num}" 
                       required>
            </div>
        </div>
    `).join('');
}