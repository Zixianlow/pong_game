/**
 * Mock data for API responses during development
 */

export const mockData = {
    users: [
        {
            id: '1',
            name: 'John Doe',
            username: 'johndoe',
            avatar: 'https://via.placeholder.com/150',
            status: 'Online',
            rank: 'Diamond',
            elo: 1850
        },
        {
            id: '2',
            name: 'Sarah Smith',
            username: 'sarahsmith',
            avatar: 'https://via.placeholder.com/150',
            status: 'In Game',
            rank: 'Platinum',
            elo: 1650
        },
        {
            id: '3',
            name: 'Mike Johnson',
            username: 'mikej',
            avatar: 'https://via.placeholder.com/150',
            status: 'Online',
            rank: 'Gold',
            elo: 1450
        }
    ],

    rooms: [
        {
            id: '1',
            name: 'Pro League #1',
            host: 'John Doe',
            type: 'Ranked',
            status: 'Waiting',
            skill: '1500-1800 ELO',
            maxPlayers: 2,
            players: [
                {
                    id: '1',
                    name: 'John Doe',
                    avatar: 'https://via.placeholder.com/32'
                }
            ]
        },
        {
            id: '2',
            name: 'Casual Fun',
            host: 'Sarah Smith',
            type: 'Casual',
            status: 'In Progress',
            skill: 'All Levels',
            maxPlayers: 2,
            players: [
                {
                    id: '2',
                    name: 'Sarah Smith',
                    avatar: 'https://via.placeholder.com/32'
                },
                {
                    id: '3',
                    name: 'Mike Johnson',
                    avatar: 'https://via.placeholder.com/32'
                }
            ]
        },
        {
            id: '3',
            name: 'Tournament Quarter-Finals',
            host: 'Official Tournament',
            type: 'Tournament',
            status: 'Waiting',
            skill: '2000+ ELO',
            maxPlayers: 2,
            players: [
                {
                    id: '4',
                    name: 'Emma Wilson',
                    avatar: 'https://via.placeholder.com/32'
                }
            ]
        }
    ],

    messages: [
        {
            id: '1',
            senderId: '1',
            recipientId: '2',
            content: 'Hey! Want to play a match?',
            timestamp: '2024-01-20T10:30:00Z',
            status: 'read',
            senderName: 'John Doe',
            senderAvatar: 'https://via.placeholder.com/150'
        },
        {
            id: '2',
            senderId: '2',
            recipientId: '1',
            content: 'Sure! Give me 5 minutes',
            timestamp: '2024-01-20T10:31:00Z',
            status: 'delivered',
            senderName: 'Sarah Smith',
            senderAvatar: 'https://via.placeholder.com/150'
        },
        {
            id: '3',
            senderId: '1',
            recipientId: '3',
            content: 'Great game yesterday!',
            timestamp: '2024-01-20T09:30:00Z',
            status: 'read',
            senderName: 'John Doe',
            senderAvatar: 'https://via.placeholder.com/150'
        }
    ],

    matches: [
        {
            id: '1',
            opponent: {
                id: '2',
                name: 'Sarah Smith',
                avatar: 'https://via.placeholder.com/32'
            },
            type: 'Ranked',
            playerScore: 11,
            opponentScore: 9,
            result: 'Won',
            date: '2024-01-20T10:30:00Z'
        },
        {
            id: '2',
            opponent: {
                id: '3',
                name: 'Mike Johnson',
                avatar: 'https://via.placeholder.com/32'
            },
            type: 'Casual',
            playerScore: 7,
            opponentScore: 11,
            result: 'Lost',
            date: '2024-01-19T15:45:00Z'
        }
    ],

    tournaments: [
        {
            id: '1',
            name: 'Weekend Tournament',
            players: [
                { id: '1', name: 'John Doe' },
                { id: '2', name: 'Sarah Smith' },
                { id: '3', name: 'Mike Johnson' },
                { id: '4', name: 'Emma Wilson' }
            ],
            matches: [],
            status: 'In Progress',
            settings: {
                thirdPlace: true
            }
        }
    ],

    blockedUsers: [],

    stats: {
        totalMatches: 150,
        wins: 85,
        losses: 65,
        points: 1250,
        winRate: 65,
        averageScore: 8.5
    },

    rankings: {
        league: 'Diamond',
        percentile: 5,
        progress: 75,
        pointsToNext: 125,
        globalRank: 42,
        regionalRank: 3,
        elo: 1850
    }
};

// Helper function to simulate API delay
export function delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to simulate API errors
export function simulateError(probability = 0.1) {
    if (Math.random() < probability) {
        throw new Error('Simulated API error');
    }
}