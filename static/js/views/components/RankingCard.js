import { userService } from '../../services/api/userService.js';
import { LoadingSpinner } from '../../components/LoadingSpinner.js';

export async function RankingCard() {
    const container = document.createElement('div');
    container.innerHTML = LoadingSpinner();

    try {
        const ranking = await userService.getRanking();
        
        container.innerHTML = `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Current Ranking</h5>
                        <div class="text-center mb-4">
                            <div class="rank-badge mb-3">
                                <i class="bi bi-${getRankIcon(ranking.league)} text-${getRankColor(ranking.league)} fs-1"></i>
                            </div>
                            <h3 class="mb-1">${ranking.league} League</h3>
                            <p class="text-muted">Top ${ranking.percentile}% of players</p>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-${getRankColor(ranking.league)}" 
                                     role="progressbar" 
                                     style="width: ${ranking.progress}%" 
                                     aria-valuenow="${ranking.progress}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100"></div>
                            </div>
                            <small class="text-muted">${ranking.pointsToNext} points to next rank</small>
                        </div>
                        <div class="d-flex justify-content-around text-center">
                            <div>
                                <h5>#${ranking.globalRank}</h5>
                                <small class="text-muted">Global Rank</small>
                            </div>
                            <div>
                                <h5>#${ranking.regionalRank}</h5>
                                <small class="text-muted">Regional Rank</small>
                            </div>
                            <div>
                                <h5>${ranking.elo}</h5>
                                <small class="text-muted">ELO Rating</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading ranking: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}

function getRankIcon(league) {
    const icons = {
        'Bronze': 'shield-fill',
        'Silver': 'shield-fill-check',
        'Gold': 'shield-fill-exclamation',
        'Platinum': 'shield-fill-plus',
        'Diamond': 'diamond-fill'
    };
    return icons[league] || 'shield-fill';
}

function getRankColor(league) {
    const colors = {
        'Bronze': 'secondary',
        'Silver': 'light',
        'Gold': 'warning',
        'Platinum': 'info',
        'Diamond': 'primary'
    };
    return colors[league] || 'secondary';
}