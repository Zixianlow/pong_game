export function WelcomeSection() {
    return `
        <div class="col-12">
            <div class="card bg-dark text-white">
                <div class="card-body text-center py-5">
                    <h1 class="display-4 mb-4">Welcome to Pong Arena</h1>
                    <p class="lead mb-4">Experience the classic game of Pong like never before! Challenge players worldwide, join tournaments, or play with friends locally.</p>
                    
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-primary btn-lg" id="playNowBtn">
                            <i class="bi bi-play-circle-fill me-2"></i>Play Now
                        </button>
                        <button class="btn btn-success btn-lg" id="tournamentBtn">
                            <i class="bi bi-trophy-fill me-2"></i>Local Tournament
                        </button>
                        <button class="btn btn-info btn-lg" id="joinRoomBtn">
                            <i class="bi bi-door-open-fill me-2"></i>Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}