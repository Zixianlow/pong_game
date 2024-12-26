import { mockUsers, mockMessages } from './mockData.js';

export class ChatState {
    constructor() {
        this.currentChat = null;
        this.messages = new Map();
        this.blockedUsers = new Set();
        this.subscribers = new Set();
        this.users = new Map(mockUsers.map(user => [user.id, user]));
        
        // Initialize with mock messages
        this.initializeMockData();
    }

    initializeMockData() {
        mockMessages.forEach(message => {
            const chatId = message.senderId === 'currentUser' ? message.recipientId : message.senderId;
            if (!this.messages.has(chatId)) {
                this.messages.set(chatId, []);
            }
            this.messages.get(chatId).push(message);
        });
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback());
    }

    setCurrentChat(userId) {
        this.currentChat = userId;
        // Mark messages as read
        const messages = this.messages.get(userId) || [];
        messages.forEach(msg => {
            if (msg.recipientId === 'currentUser' && msg.status === 'delivered') {
                msg.status = 'read';
            }
        });
        this.notify();
    }

    addMessage(message) {
        const chatId = message.senderId === 'currentUser' ? message.recipientId : message.senderId;
        if (!this.messages.has(chatId)) {
            this.messages.set(chatId, []);
        }
        this.messages.get(chatId).push(message);
        
        // Simulate reply for mock data
        if (message.senderId === 'currentUser') {
            setTimeout(() => {
                const mockReplies = [
                    "Sure, let's play!",
                    "Give me a minute",
                    "I'm ready when you are",
                    "Sounds good!"
                ];
                const reply = {
                    id: Date.now().toString(),
                    senderId: chatId,
                    recipientId: 'currentUser',
                    content: mockReplies[Math.floor(Math.random() * mockReplies.length)],
                    timestamp: new Date().toISOString(),
                    status: 'delivered'
                };
                this.addMessage(reply);
            }, 1000);
        }

        this.notify();
    }

    getMessages(userId) {
        return this.messages.get(userId) || [];
    }

    getUserInfo(userId) {
        return this.users.get(userId);
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

    getChats() {
        return Array.from(this.messages.entries()).map(([userId, messages]) => ({
            user: this.getUserInfo(userId),
            lastMessage: messages[messages.length - 1],
            unreadCount: this.getUnreadCount(userId)
        }));
    }

    getUnreadCount(userId) {
        const messages = this.messages.get(userId) || [];
        return messages.filter(msg => 
            msg.recipientId === 'currentUser' && 
            msg.status === 'delivered'
        ).length;
    }
}