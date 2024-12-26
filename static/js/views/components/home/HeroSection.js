export function HeroSection() {
  return `
        <div class="col-12">
            <div class="card bg-dark text-white overflow-hidden position-relative hero-card">
                <div class="card-body p-5">
                    <div class="row align-items-center">
                        <div class="col-lg-6 position-relative z-1">
                            <h1 class="display-4 fw-bold mb-4">Welcome to Pong Arena</h1>
                            <p class="lead mb-4">Challenge players worldwide, compete in tournaments, and climb the global rankings in this modern take on the classic game.</p>
                            <div class="d-flex gap-3 flex-wrap">
                                <button class="btn btn-primary btn-lg" id="playNowBtn">
                                    <i class="bi bi-play-circle-fill me-2"></i>Play Now
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-6 position-relative z-1 text-center mt-4 mt-lg-0">
                            <div class="stats-grid d-flex flex-wrap justify-content-center gap-4">
                                <div class="stat-item text-center">
                                    <h3 class="display-6 fw-bold mb-0">1.2K+</h3>
                                    <small class="text-light">Active Players</small>
                                </div>
                                <div class="stat-item text-center">
                                    <h3 class="display-6 fw-bold mb-0">50+</h3>
                                    <small class="text-light">Tournaments</small>
                                </div>
                                <div class="stat-item text-center">
                                    <h3 class="display-6 fw-bold mb-0">10K+</h3>
                                    <small class="text-light">Games Played</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero-overlay position-absolute top-0 start-0 w-100 h-100 bg-gradient"></div>
            </div>
        </div>
    `;
}
