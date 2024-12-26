export function RoomInfo() {
    return `
        <div class="card mb-4">
            <div class="card-header bg-dark text-white">
                <h5 class="mb-0">Room Information</h5>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <small class="text-muted">Room Name</small>
                    <h6 id="roomName">Loading...</h6>
                </div>
                <div class="mb-3">
                    <small class="text-muted">Game Mode</small>
                    <h6 id="gameMode">Loading...</h6>
                </div>
                <div class="mb-3">
                    <small class="text-muted">Players</small>
                    <div id="playersList" class="list-group list-group-flush">
                        <!-- Players will be dynamically added here -->
                    </div>
                </div>
            </div>
        </div>
    `;
}