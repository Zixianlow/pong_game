import { animate } from './animation.js';

export async function initTournamentBracket() {
    const bracketContainer = document.getElementById('bracketContainer');
    let tournament = null;

    try {
        const tournamentData = localStorage.getItem('tournamentData');
        if (!tournamentData) {
            throw new Error('No tournament data found');
        }

        tournament = JSON.parse(tournamentData);
    } catch (error) {
        console.error('Error loading tournament:', error);
        bracketContainer.innerHTML = `
            <div class="alert alert-danger">
                Error loading tournament. Please try again later.
            </div>
        `;
        return;
    }

    function renderBracket() {
        bracketContainer.innerHTML = `
            <div class="tournament-rounds d-flex justify-content-between">
                <div class="round" data-round="0">
                    <h5 class="text-center mb-4">Semi-Finals</h5>
                    <div class="matches">
                        ${generateSemiFinals()}
                    </div>
                </div>
                <div class="round" data-round="1">
                    <h5 class="text-center mb-4">Finals</h5>
                    <div class="matches">
                        ${generateFinals()}
                    </div>
                </div>
            </div>
        `;

        // Animate brackets
        const matches = document.querySelectorAll('.match');
        matches.forEach((match, index) => {
            animate.fadeIn(match, 500, index * 100);
        });
    }

    function generateSemiFinals() {
        return `
            <div class="match-container mb-4">
                <div class="match card" onclick="showMatchDetails('semi1')">
                    <div class="card-body">
                        <div class="player mb-2">
                            <span class="player-name">${tournament.players[0]}</span>
                            <span class="score">0</span>
                        </div>
                        <div class="player">
                            <span class="player-name">${tournament.players[1]}</span>
                            <span class="score">0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="match-container mb-4">
                <div class="match card" onclick="showMatchDetails('semi2')">
                    <div class="card-body">
                        <div class="player mb-2">
                            <span class="player-name">${tournament.players[2]}</span>
                            <span class="score">0</span>
                        </div>
                        <div class="player">
                            <span class="player-name">${tournament.players[3]}</span>
                            <span class="score">0</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function generateFinals() {
        return `
            <div class="match-container mb-4">
                <div class="match card" onclick="showMatchDetails('final')">
                    <div class="card-body">
                        <div class="player mb-2">
                            <span class="player-name">TBD</span>
                            <span class="score">-</span>
                        </div>
                        <div class="player">
                            <span class="player-name">TBD</span>
                            <span class="score">-</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    window.showMatchDetails = async (matchId) => {
        try {
            const modal = document.getElementById('matchDetailsModal');
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            
            // Store current match info
            window.currentMatch = { matchId };

            // Update player names based on match
            const player1Name = document.getElementById('player1Name');
            const player2Name = document.getElementById('player2Name');
            
            if (matchId === 'semi1') {
                player1Name.textContent = tournament.players[0];
                player2Name.textContent = tournament.players[1];
            } else if (matchId === 'semi2') {
                player1Name.textContent = tournament.players[2];
                player2Name.textContent = tournament.players[3];
            }
        } catch (error) {
            console.error('Error showing match details:', error);
        }
    };

    document.getElementById('startMatch')?.addEventListener('click', async () => {
        try {
            const { matchId } = window.currentMatch;
            const modal = document.getElementById('matchDetailsModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();

            // Store match info for the game
            localStorage.setItem('currentMatch', JSON.stringify({
                id: matchId,
                tournament: tournament.name,
                players: tournament.players
            }));
            
        } catch (error) {
            console.error('Error starting match:', error);
        }
    });

    // Initial render
    renderBracket();
}