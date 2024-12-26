export class ChatState {
    constructor() {
        this.selectedChat = null;
        this.messages = new Map();
        this.blockedUsers = new Set();
        this.subscribers = new Set();
        this.initializeMockData();
    }

    initializeMockData() {
        // Mock users data
        this.users = new Map([
            ['1', { id: '1', name: 'John Doe', avatar: 'https://via.placeholder.com/40', status: 'online' }],
            ['2', { id: '2', name: 'Sarah Smith', avatar: 'https://via.placeholder.com/40', status: 'online' }],
            ['3', { id: '3', name: 'Mike Johnson', avatar: 'https://via.placeholder.com/40', status: 'online' }]
        ]);

        // Mock messages
        const mockMessages = [
            {
                id: '1',
                senderId: '1',
                recipientId: 'currentUser',
                content: 'Hey! Want to play a match?',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                status: 'read'
            },
            {
                id: '2',
                senderId: 'currentUser',
                recipientId: '1',
                content: 'Sure! Give me 5 minutes',
                timestamp: new Date(Date.now() - 3500000).toISOString(),
                status: 'read'
            }
        ];

        mockMessages.forEach(msg => this.addMessage(msg));
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback());
    }

    selectChat(userId) {
        this.selectedChat = userId;
        this.markMessagesAsRead(userId);
        this.notify();
    }

    toggleBlockUser(userId) {
        if (this.blockedUsers.has(userId)) {
            this.blockedUsers.delete(userId);
        } else {
            this.blockedUsers.add(userId);
        }
        this.notify();
    }

    isBlocked(userId) {
        return this.blockedUsers.has(userId);
    }

    addMessage(message) {
        const chatId = message.senderId === 'currentUser' ? message.recipientId : message.senderId;
        
        if (!this.messages.has(chatId)) {
            this.messages.set(chatId, []);
        }
        
        this.messages.get(chatId).push(message);
        this.notify();

        // Simulate reply if not blocked
        if (message.senderId === 'currentUser' && !this.isBlocked(chatId)) {
            this.simulateReply(chatId);
        }
    }

    simulateReply(userId) {
        setTimeout(() => {
            const replies = [
                "Sure, let's play!",
                "Give me a minute",
                "I'm ready when you are",
                "Sounds good!"
            ];

            this.addMessage({
                id: Date.now().toString(),
                senderId: userId,
                recipientId: 'currentUser',
                content: replies[Math.floor(Math.random() * replies.length)],
                timestamp: new Date().toISOString(),
                status: 'delivered'
            });
        }, 1000);
    }

    markMessagesAsRead(userId) {
        const messages = this.messages.get(userId) || [];
        messages.forEach(msg => {
            if (msg.recipientId === 'currentUser' && msg.status === 'delivered') {
                msg.status = 'read';
            }
        });
        this.notify();
    }

    getMessages(userId) {
        return this.messages.get(userId) || [];
    }

    getUser(userId) {
        return this.users.get(userId);
    }

    getChats() {
        return Array.from(this.messages.entries()).map(([userId, messages]) => ({
            user: this.users.get(userId),
            lastMessage: messages[messages.length - 1],
            unreadCount: this.getUnreadCount(userId),
            isBlocked: this.isBlocked(userId)
        }));
    }

    getUnreadCount(userId) {
        const messages = this.messages.get(userId) || [];
        return messages.filter(msg => 
            msg.recipientId === 'currentUser' && 
            msg.status === 'delivered'
        ).length;
    }

    getSelectedChat() {
        if (!this.selectedChat) return null;
        return {
            user: this.users.get(this.selectedChat),
            messages: this.getMessages(this.selectedChat),
            isBlocked: this.isBlocked(this.selectedChat)
        };
    }
}