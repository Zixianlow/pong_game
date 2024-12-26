import { API_CONFIG } from './config.js';
import { mockData } from './mockData.js';

const IS_MOCK = false; // Toggle mock mode

const defaultHeaders = {
    'Content-Type': 'application/json'
};

async function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '#/login';
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Simulate network delay
function delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate random errors
function simulateError(probability = 0.1) {
    if (Math.random() < probability) {
        throw new Error('Network error');
    }
}

async function mockResponse(endpoint, method = 'GET', data = null) {
    await delay();
    simulateError();

    // Parse endpoint to determine data type
    const path = endpoint.split('/');
    const resource = path[1]; // e.g., 'users', 'messages', etc.

    switch (resource) {
        case 'users':
            if (path.includes('online')) return mockData.users;
            if (path.includes('stats')) return mockData.stats;
            if (path.includes('ranking')) return mockData.rankings;
            if (path.includes('blocked')) return [];
            return mockData.users[0];

        case 'messages':
            if (method === 'POST') {
                return {
                    id: Date.now().toString(),
                    senderId: mockData.users[0].id,
                    recipientId: data.recipientId,
                    content: data.content,
                    timestamp: new Date().toISOString(),
                    status: 'sent',
                    senderName: mockData.users[0].name,
                    senderAvatar: mockData.users[0].avatar
                };
            }
            return mockData.messages;

        case 'rooms':
            if (method === 'POST' && path.includes('join')) {
                return { success: true };
            }
            return mockData.rooms;

        case 'matches':
            if (path.includes('history')) return mockData.matches;
            return mockData.matches[0];

        case 'tournaments':
            if (path.includes('results')) {
                return {
                    winner: mockData.users[0],
                    runnerUp: mockData.users[1],
                    thirdPlace: mockData.users[2]
                };
            }
            return mockData.tournaments[0];

        default:
            throw new Error('Not found');
    }
}

export async function apiGet(endpoint) {

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        }
    });
    return handleResponse(response);
}

export async function apiPost(endpoint, data) {

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

export async function apiPut(endpoint, data) {
    if (IS_MOCK) {
        return mockResponse(endpoint, 'PUT', data);
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${endpoint}`, {
        method: 'PUT',
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

export async function apiDelete(endpoint) {
    if (IS_MOCK) {
        return mockResponse(endpoint, 'DELETE');
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${endpoint}`, {
        method: 'DELETE',
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        }
    });
    return handleResponse(response);
}