export function Achievements() {
    return `
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title mb-4">Achievements</h5>
                    <div class="d-flex flex-column gap-3">
                        <div class="achievement d-flex align-items-center">
                            <div class="achievement-icon me-3 p-2 bg-warning bg-opacity-10 rounded-circle">
                                <i class="bi bi-trophy-fill text-warning fs-4"></i>
                            </div>
                            <div>
                                <h6 class="mb-0">Tournament Champion</h6>
                                <small class="text-muted">Won 3 tournaments in a row</small>
                            </div>
                            <span class="ms-auto badge bg-warning">Rare</span>
                        </div>
                        <div class="achievement d-flex align-items-center">
                            <div class="achievement-icon me-3 p-2 bg-info bg-opacity-10 rounded-circle">
                                <i class="bi bi-lightning-fill text-info fs-4"></i>
                            </div>
                            <div>
                                <h6 class="mb-0">Speed Demon</h6>
                                <small class="text-muted">Won a match under 2 minutes</small>
                            </div>
                            <span class="ms-auto badge bg-info">Common</span>
                        </div>
                        <div class="achievement d-flex align-items-center">
                            <div class="achievement-icon me-3 p-2 bg-danger bg-opacity-10 rounded-circle">
                                <i class="bi bi-fire text-danger fs-4"></i>
                            </div>
                            <div>
                                <h6 class="mb-0">Win Streak</h6>
                                <small class="text-muted">Won 10 matches in a row</small>
                            </div>
                            <span class="ms-auto badge bg-danger">Epic</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}