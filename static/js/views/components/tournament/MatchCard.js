export function MatchCard({ matchId, player1, player2, semi1, semi2, status = 'pending' }) {
    const gameUrl = `#/game?player1=${encodeURIComponent(player1.name)}&player2=${encodeURIComponent(player2.name)}&gametype=` + matchId;

    const isDisabled = status === 'pending' || status === 'completed';

    const semi1Winner = document.getElementById('semi1Winner').textContent;
    const semi2Winner = document.getElementById('semi2Winner').textContent;

    let greyout = "";

    if (player1.name == semi1Winner){
        greyout = semi1Winner;
    }
    else if (player2.name == semi1Winner){
        greyout = semi1Winner;
    }
    else if (player1.name == semi2Winner){
        greyout = semi2Winner;
    }
    else if (player2.name == semi2Winner){
        greyout = semi2Winner;
    }
        
    return `
        <div class="card match-card ${status}" data-match-id="${matchId}" style="width: 400px;">
            <div class="card-header d-flex justify-content-between align-items-center py-2">
                <span class="match-number">Match #${matchId}</span>
                <span class="match-status badge ${getStatusBadgeClass(status)}">
                    ${getStatusText(status)}
                </span>
            </div>
            <div class="card-body p-0">
                ${PlayerRow(player1, greyout, 'top')}
                <div class="match-divider"></div>
                ${PlayerRow(player2, greyout, 'bottom')}
            </div>
            <div class="card-footer text-center p-2">
                <a href="${gameUrl}" ${isDisabled ? 'style="display: none"' : ''}>
                    <button class="btn btn-sm btn-primary start-match-btn" id="startButton" >
                        <i class="bi bi-play-fill"></i> Start Match
                    </button>
                </a>
            </div>
        </div>
    `;
}

function PlayerRow(player, greyout, position) {
    const isWinner = player.score > 0 && position === 'top';
    const highlight = player.name == greyout ? "background: lightblue" : "";
    // console.log(player.name)
    // console.log(greyout)
    // console.log(1)
    return `
        <div style="${highlight}" class="player-row ${position} ${isWinner ? 'winner' : ''} d-flex align-items-center justify-content-between px-3 py-2">
            <div class="d-flex align-items-center gap-2">
                <div class="player-avatar">
                    <i class="bi bi-person-fill"></i>
                </div>
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                </div>
            </div>
        </div>
    `;
}

function getStatusBadgeClass(status) {
    const classes = {
        'pending': 'bg-secondary',
        'in-progress': 'bg-primary',
        'completed': 'bg-success',
        'scheduled': 'bg-info'
    };
    return classes[status] || classes.pending;
}

function getStatusText(status) {
    const texts = {
        'pending': 'Pending',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'scheduled': 'Scheduled'
    };
    return texts[status] || texts.pending;
}