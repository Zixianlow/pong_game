export function CreateRoomView() {
    return `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-primary text-white py-4">
                        <h3 class="mb-0">Create Game Room</h3>
                        <p class="mb-0 text-light">Set up your game room preferences</p>
                    </div>
                    <div class="card-body p-4">
                        <form id="createRoomForm">
                            <div class="mb-4">
                                <label class="form-label">Room Name</label>
                                <input type="text" class="form-control" id="roomName" required>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Game Mode</label>
                                <select class="form-select" id="gameMode">
                                    <option value="casual">Casual</option>
                                    <option value="ranked">Ranked</option>
                                    <option value="tournament">Tournament</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Max Players</label>
                                <select class="form-select" id="maxPlayers">
                                    <option value="2">2 Players</option>
                                    <option value="4">4 Players (Tournament)</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Game Settings</label>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="powerUps">
                                            <label class="form-check-label" for="powerUps">
                                                Enable Power-ups
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="spectators">
                                            <label class="form-check-label" for="spectators">
                                                Allow Spectators
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between">
                                <a href="#/lobby" class="btn btn-outline-secondary" data-link>
                                    <i class="bi bi-arrow-left me-2"></i>Back to Lobby
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-play-fill me-2"></i>Create Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}