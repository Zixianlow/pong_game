import { apiGet, apiPost, apiPut } from './client.js';
import { API_CONFIG } from './config.js';

export const roomService = {
    async getRooms() {
        return await apiGet(API_CONFIG.ENDPOINTS.ROOMS);
    },

    async createRoom(roomData) {
        return await apiPost(API_CONFIG.ENDPOINTS.ROOMS, roomData);
    },

    async joinRoom(roomId) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.ROOMS}/${roomId}/join`);
    },

    async leaveRoom(roomId) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.ROOMS}/${roomId}/leave`);
    },

    async getRoomDetails(roomId) {
        return await apiGet(`${API_CONFIG.ENDPOINTS.ROOMS}/${roomId}`);
    },

    async updateRoomSettings(roomId, settings) {
        return await apiPut(`${API_CONFIG.ENDPOINTS.ROOMS}/${roomId}/settings`, settings);
    }
};