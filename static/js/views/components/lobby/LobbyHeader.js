export function LobbyHeader() {
    return `
        <div class="col-12">
            <div class="card bg-dark text-white">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 class="mb-1">Game Lobby</h2>
                            <p class="mb-0 text-light">12 Players Online • 5 Active Rooms</p>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary btn-lg" id="createRoomBtn">
                                <i class="bi bi-plus-circle-fill me-2"></i>Create Room
                            </button>
                            <a href="#/local-tournament">
                                <button class="btn btn-success btn-lg" id="localTournamentBtn">
                                    <i class="bi bi-trophy-fill me-2"></i>Local Tournament
                                </button>
                            </a>
                            <a href="#/game">
                                <button class="btn btn-success btn-lg" id="quickPlayBtn">
                                    <i class="bi bi-play-fill me-2"></i>Quick Play
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}