import axios from 'axios';
import { API_CONFIG } from '../config/api.config.js';

const apiClient = axios.create({
    baseURL: `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '#/login';
        }
        return Promise.reject(error);
    }
);