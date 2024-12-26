import { animate } from '../animation.js';
import { TournamentState } from './state.js';
import { MatchCard } from '../../views/components/tournament/MatchCard.js';

export function initTournamentBracket(semi1 = null, semi2 = null) {
    const bracketContainer = document.getElementById('bracketContainer');
    const tournament = TournamentState.getTournamentData();

    if (!tournament) {
        showError(bracketContainer, 'No tournament data found. Please create a tournament first.');
        return;
    }

    renderBracket(bracketContainer, tournament, semi1, semi2);
    setupEventHandlers(tournament);
}

function renderBracket(container, tournament, semi1 = null, semi2 = null) {
    container.innerHTML = `
        <div class="tournament-container">
            <div class="tournament-rounds d-flex justify-content-around align-items-center">
                <div class="round" data-round="0">
                    <div class="round-title">
                        <i class="bi bi-trophy-fill me-2"></i>Semi-Finals
                    </div>
                    <div class="matches">
                        ${generateSemiFinals(tournament.players, semi1, semi2)}
                    </div>
                </div>
                <div class="round" data-round="1">
                    <div class="round-title">
                        <i class="bi bi-trophy-fill me-2"></i>Finals
                    </div>
                    <div class="matches">
                        ${generateFinals(tournament.players, semi1, semi2)}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Animate matches
    const matches = document.querySelectorAll('.match-card');
    matches.forEach((match, index) => {
        setTimeout(() => {
            animate.fadeIn(match, 300, index * 200);
        }, index * 100);
    });
}

function generateSemiFinals(players, s1 = null, s2 = null) {
    if (s1 != null){
        if (!(s1 == players[0] || s1 == players[1]))
            s1 = null
    }
    if (s2 != null){
        if (!(s2 == players[2] || s2 == players[3]))
            s2 = null
    }

    return `
        ${MatchCard({
            matchId: 'semi1',
            player1: { name: players[0], seed: 1 },
            player2: { name: players[1], seed: 4 },
            semi1: s1,
            semi2: s2,
            status: s1 ? 'completed' : 'scheduled'
        })}
        ${MatchCard({
            matchId: 'semi2',
            player1: { name: players[2], seed: 2 },
            player2: { name: players[3], seed: 3 },
            semi1: s1,
            semi2: s2,
            status: s2 ? 'completed' : 'scheduled'
        })}
    `;
}

function generateFinals(players, s1 = null, s2 = null) {
    if (s1 != null){
        if (!(s1 == players[0] || s1 == players[1]))
            s1 = null
    }
    if (s2 != null){
        if (!(s2 == players[2] || s2 == players[3]))
            s2 = null
    }

    return MatchCard({
        matchId: 'final',
        player1: { name: s1 ?  s1 : 'TBD' },
        player2: { name: s2 ?  s2 : 'TBD' },
        semi1: s1,
        semi2: s2,
        status: (s1 && s2) ? 'scheduled' : 'pending'
    });
}

function setupEventHandlers(tournament) {
    document.querySelectorAll('.match-card').forEach(card => {
        card.addEventListener('click', () => {
            const matchId = card.dataset.matchId;
            //showMatchDetails(matchId, tournament);
        });
    });
}