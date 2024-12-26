import { animate } from '../utils/animation.js';

export function TournamentPodiumView() {
    setTimeout(() => {
        const podiumElements = document.querySelectorAll('.podium-place');
        podiumElements.forEach((element, index) => {
            animate.fadeIn(element, 500, index * 200);
        });
    }, 0);

    return `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-primary text-white py-4">
                        <h3 class="mb-0">Tournament Results</h3>
                        <p class="mb-0 text-light">Congratulations to the winners!</p>
                    </div>
                    <div class="card-body p-4">
                        <!-- Podium Section -->
                        <div class="podium-container text-center mb-5">
                            <div class="row g-0 align-items-end justify-content-center" style="height: 300px;">
                                <!-- Second Place -->
                                <div class="col-4 podium-place">
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="position-relative mb-2">
                                            <i class="bi bi-person-circle display-4"></i>
                                            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-secondary">
                                                <i class="bi bi-trophy-fill"></i>
                                            </span>
                                        </div>
                                        <h5 class="mb-1" id="secondPlace">Player 2</h5>
                                        <small class="text-muted">Second Place</small>
                                        <div class="podium-block bg-secondary" style="height: 120px;"></div>
                                    </div>
                                </div>
                                
                                <!-- First Place -->
                                <div class="col-4 podium-place">
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="position-relative mb-2">
                                            <i class="bi bi-person-circle display-3"></i>
                                            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-warning">
                                                <i class="bi bi-trophy-fill"></i>
                                            </span>
                                        </div>
                                        <h4 class="mb-1" id="firstPlace">Player 1</h4>
                                        <small class="text-muted">Champion</small>
                                        <div class="podium-block bg-warning" style="height: 160px;"></div>
                                    </div>
                                </div>
                                
                                <!-- Third Place -->
                                <div class="col-4 podium-place">
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="position-relative mb-2">
                                            <i class="bi bi-person-circle display-4"></i>
                                            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-danger">
                                                <i class="bi bi-trophy-fill"></i>
                                            </span>
                                        </div>
                                        <h5 class="mb-1" id="thirdPlace">Player 3</h5>
                                        <small class="text-muted">Third Place</small>
                                        <div class="podium-block bg-danger" style="height: 80px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tournament Stats -->
                        <div class="tournament-stats">
                            <h5 class="mb-4">Tournament Statistics</h5>
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <div class="card bg-light">
                                        <div class="card-body">
                                            <h6 class="card-title">Matches Played</h6>
                                            <p class="card-text display-6">3</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card bg-light">
                                        <div class="card-body">
                                            <h6 class="card-title">Total Points Scored</h6>
                                            <p class="card-text display-6">42</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="text-center mt-5">
                            <a href="#/" class="btn btn-primary me-2" data-link>
                                <i class="bi bi-house-fill me-2"></i>Back to Home
                            </a>
                            <a href="#/local-tournament" class="btn btn-success" data-link>
                                <i class="bi bi-trophy-fill me-2"></i>New Tournament
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}