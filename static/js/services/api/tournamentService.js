import { apiGet, apiPost, apiPut } from './client.js';
import { API_CONFIG } from './config.js';

export const tournamentService = {
    async createTournament(tournamentData) {
        return await apiPost(API_CONFIG.ENDPOINTS.TOURNAMENTS, tournamentData);
    },

    async getTournament(id) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.TOURNAMENTS}/${id}`);
    },

    async updateMatch(tournamentId, matchId, matchData) {
        return await apiPut(
            `${API_CONFIG.ENDPOINTS.TOURNAMENTS}/${tournamentId}/matches/${matchId}`,
            matchData
        );
    },

    async advanceRound(tournamentId, roundId) {
        return await apiPost(
            `${API_CONFIG.ENDPOINTS.TOURNAMENTS}/${tournamentId}/rounds/${roundId}/advance`
        );
    },

    async getTournamentResults(tournamentId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.TOURNAMENTS}/${tournamentId}/results`);
    }
};