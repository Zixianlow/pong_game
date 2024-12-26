export const mockUsers = [
    {
        id: '1',
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
        status: 'online',
        lastSeen: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Sarah Smith',
        avatar: 'https://via.placeholder.com/40',
        status: 'offline',
        lastSeen: '2024-01-20T15:30:00Z'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        avatar: 'https://via.placeholder.com/40',
        status: 'online',
        lastSeen: new Date().toISOString()
    }
];

export const mockMessages = [
    {
        id: '1',
        senderId: '1',
        recipientId: 'currentUser',
        content: 'Hey! Want to play a match?',
        timestamp: '2024-01-20T10:30:00Z',
        status: 'read'
    },
    {
        id: '2',
        senderId: 'currentUser',
        recipientId: '1',
        content: 'Sure! Give me 5 minutes',
        timestamp: '2024-01-20T10:31:00Z',
        status: 'read'
    },
    {
        id: '3',
        senderId: '2',
        recipientId: 'currentUser',
        content: 'Great game yesterday!',
        timestamp: '2024-01-20T09:30:00Z',
        status: 'read'
    },
    {
        id: '4',
        senderId: '3',
        recipientId: 'currentUser',
        content: 'Are you up for a tournament?',
        timestamp: '2024-01-20T11:00:00Z',
        status: 'delivered'
    }
];