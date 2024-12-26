import { matchService } from '../../services/api/matchService.js';
import { LoadingSpinner } from '../../components/LoadingSpinner.js';

export async function RecentMatches() {
    const container = document.createElement('div');
    container.innerHTML = LoadingSpinner();

    try {
        const matches = await matchService.getMatchHistory("me");
        
        container.innerHTML = `
            <div class="col-md-8 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="card-title mb-0">Recent Matches</h5>
                            <button class="btn btn-sm btn-outline-primary">View All</button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Opponent</th>
                                        <th>Type</th>
                                        <th>Score</th>
                                        <th>Result</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${generateMatchRows(matches)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading matches: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}

function generateMatchRows(matches) {
    if (!matches.length) {
        return `
            <tr>
                <td colspan="5" class="text-center text-muted py-4">
                    No matches played yet
                </td>
            </tr>
        `;
    }

    return matches.map(match => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${match.opponent.avatar || 'https://via.placeholder.com/32'}" 
                         class="rounded-circle me-2" alt="Avatar" width="32" height="32">
                    ${match.opponent.name}
                </div>
            </td>
            <td><span class="badge bg-${getMatchTypeBadge(match.type)}">${match.type}</span></td>
            <td>${match.playerScore} - ${match.opponentScore}</td>
            <td><span class="text-${match.result === 'Won' ? 'success' : 'danger'}">${match.result}</span></td>
            <td>${formatDate(match.date)}</td>
        </tr>
    `).join('');
}

function getMatchTypeBadge(type) {
    const badges = {
        'Ranked': 'primary',
        'Casual': 'info',
        'Tournament': 'warning'
    };
    return badges[type] || 'secondary';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
}