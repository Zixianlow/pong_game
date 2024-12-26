import { apiGet, apiPost, apiPut } from './client.js';
import { API_CONFIG } from './config.js';

export const matchService = {
    async getMatch(id) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.MATCHES}/${id}`);
    },

    async createMatch(matchData) {
        return await apiPost(API_CONFIG.ENDPOINTS.MATCHES, matchData);
    },

    async updateMatch(id, matchData) {
        return await apiPut(`${API_CONFIG.ENDPOINTS.MATCHES}/${id}`, matchData);
    },

    async getMatchHistory(userId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.MATCHES}/history/${userId}`);
    },

    async getMatchStats(matchId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.MATCHES}/${matchId}/stats`);
    }
};