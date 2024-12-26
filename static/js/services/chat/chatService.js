import { apiGet, apiPost, apiPut } from '../api/client.js';
import { API_CONFIG } from '../../config/api.config.js';

export const chatService = {
    async getChats() {
        return await apiGet(`${API_CONFIG.ENDPOINTS.MESSAGES}/chats`);
    },

    async getChatMessages(chatId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.MESSAGES}/chats/${chatId}`);
    },

    async sendMessage(chatId, content) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.MESSAGES}/chats/${chatId}`, { content });
    },

    async markAsRead(chatId) {
        return await apiPut(`${API_CONFIG.ENDPOINTS.MESSAGES}/chats/${chatId}/read`);
    },

    async blockUser(userId) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/block`);
    },

    async unblockUser(userId) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/unblock`);
    },

    async getBlockedUsers() {
        return await apiGet(`${API_CONFIG.ENDPOINTS.USERS}/blocked`);
    }
};