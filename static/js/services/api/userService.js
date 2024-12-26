import { apiGet, apiPost, apiPut } from './client.js';
import { API_CONFIG } from './config.js';

export const userService = {
    async getProfile(userId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.USERS}/${userId || 'me'}`);
    },

    async updateProfile(userData) {
        return await apiPut(`${API_CONFIG.ENDPOINTS.USERS}/profile`, userData);
    },

    async getStats(userId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.USERS}/${userId || 'me'}/stats`);
    },

    async getRanking(userId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.USERS}/${userId || 'me'}/ranking`);
    },

    async blockUser(userId) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/block`);
    },

    async unblockUser(userId) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/unblock`);
    },

    async getBlockedUsers() {
        return await apiGet(`${API_CONFIG.ENDPOINTS.USERS}/blocked`);
    },

    async getOnlinePlayers() {
        return await apiGet(`${API_CONFIG.ENDPOINTS.USERS}/online`);
    }
};