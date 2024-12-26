export const tournamentService = {
    async createTournament(tournamentData) {
        try {
            const response = await fetch('/api/v1/tournaments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(tournamentData)
            });

            if (!response.ok) {
                throw new Error('Failed to create tournament');
            }

            return response.json();
        } catch (error) {
            console.error('Error creating tournament:', error);
            throw error;
        }
    },

    async getTournament(id) {
        try {
            const response = await fetch(`/api/v1/tournaments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tournament');
            }

            return response.json();
        } catch (error) {
            console.error('Error fetching tournament:', error);
            throw error;
        }
    },

    async updateMatch(tournamentId, matchId, matchData) {
        try {
            const response = await fetch(
                `/api/v1/tournaments/${tournamentId}/matches/${matchId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(matchData)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update match');
            }

            return response.json();
        } catch (error) {
            console.error('Error updating match:', error);
            throw error;
        }
    },

    async advanceRound(tournamentId, roundId) {
        try {
            const response = await fetch(
                `/api/v1/tournaments/${tournamentId}/rounds/${roundId}/advance`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to advance round');
            }

            return response.json();
        } catch (error) {
            console.error('Error advancing round:', error);
            throw error;
        }
    }
};