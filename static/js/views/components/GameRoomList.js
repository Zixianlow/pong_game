export function GameRoomList() {
    return `
        <div class="card">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Active Game Rooms</h5>
                <button class="btn btn-light btn-sm" id="refreshRooms">
                    <i class="bi bi-arrow-clockwise"></i> Refresh
                </button>
            </div>
            <div class="card-body">
                <div class="list-group">
                    <a href="#/lobby" class="list-group-item list-group-item-action">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-1">Casual Room #1</h6>
                                <small>Players: 2/2 | Status: In Progress</small>
                            </div>
                            <span class="badge bg-primary">Casual</span>
                        </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-1">Tournament Room #1</h6>
                                <small>Players: 1/2 | Status: Waiting</small>
                            </div>
                            <span class="badge bg-success">Tournament</span>
                        </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-1">Practice Room</h6>
                                <small>Players: 1/2 | Status: Waiting</small>
                            </div>
                            <span class="badge bg-info">Practice</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `;
}