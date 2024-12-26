import { userService } from '../../services/api/userService.js';
import { LoadingSpinner } from '../../components/LoadingSpinner.js';

export async function ProfileStats() {
    const container = document.createElement('div');
    container.innerHTML = LoadingSpinner();

    try {
        const stats = await userService.getStats();
        
        container.innerHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Performance Stats</h5>
                        <div class="mb-4">
                            <div class="d-flex justify-content-between mb-1">
                                <span>Total Matches</span>
                                <span>${stats.totalMatches}</span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="d-flex justify-content-between mb-1">
                                <span>Wins</span>
                                <span>${stats.wins}</span>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-between mb-1">
                                <span>Win Rate</span>
                                <span>${stats.winRate}%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-info" role="progressbar" 
                                     style="width: ${stats.winRate}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading stats: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}