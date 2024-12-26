import { apiPost, apiGet } from './client.js';
import { API_CONFIG } from './config.js';

export const authService = {
    async login(credentials) {
        const data = await apiPost(`${API_CONFIG.ENDPOINTS.AUTH}/login`, credentials);
        if (data.access) {
            localStorage.setItem('token', data.access);
        }
        return data;
    },

    async register(userData) {
        return await apiPost(`${API_CONFIG.ENDPOINTS.AUTH}/register`, userData);
    },

    async logout() {
        localStorage.removeItem('token');
        await apiPost(`${API_CONFIG.ENDPOINTS.AUTH}/logout`);
    },

    async getCurrentUser() {
        return await apiGet(`${API_CONFIG.ENDPOINTS.AUTH}/me`);
    }
};