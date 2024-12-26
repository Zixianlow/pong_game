export function LeaderboardSection() {
    return `
        <div class="card">
            <div class="card-header bg-success bg-gradient text-white">
                <h5 class="mb-0">Top Players</h5>
            </div>
            <div class="card-body p-0">
                <div class="list-group list-group-flush">
                    ${generateLeaderboard()}
                </div>
                <div class="p-3 text-center border-top">
                    <button class="btn btn-outline-primary btn-sm">View Full Rankings</button>
                </div>
            </div>
        </div>
    `;
}

function generateLeaderboard() {
    const players = [
        { rank: 1, name: "Alex Chen", points: 2500, badge: "🏆" },
        { rank: 2, name: "Sarah Smith", points: 2350, badge: "🥈" },
        { rank: 3, name: "Mike Johnson", points: 2200, badge: "🥉" },
        { rank: 4, name: "Emma Wilson", points: 2100 },
        { rank: 5, name: "John Doe", points: 2050 }
    ];

    return players.map(player => `
        <div class="list-group-item">
            <div class="d-flex align-items-center">
                <div class="me-3 fw-bold ${player.rank <= 3 ? 'text-warning' : 'text-muted'}">#${player.rank}</div>
                <div class="position-relative">
                    <img src="https://via.placeholder.com/32" class="rounded-circle" alt="${player.name}">
                </div>
                <div class="ms-3 flex-grow-1">
                    <div class="fw-semibold">${player.name} ${player.badge || ''}</div>
                    <small class="text-muted">${player.points} points</small>
                </div>
            </div>
        </div>
    `).join('');
}