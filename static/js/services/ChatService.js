import { messageStore } from '../stores/MessageStore.js';

export class ChatService {
    constructor() {
        this.store = messageStore;
        this.currentUser = {
            id: 'user1',
            name: 'Your Name',
            avatar: 'https://via.placeholder.com/40'
        };
        this.contacts = [
            { id: 'user2', name: 'John Doe', avatar: 'https://via.placeholder.com/40', status: 'online', blocked: false },
            { id: 'user3', name: 'Sarah Smith', avatar: 'https://via.placeholder.com/40', status: 'offline', blocked: false },
            { id: 'user4', name: 'Mike Johnson', avatar: 'https://via.placeholder.com/40', status: 'online', blocked: false }
        ];
        this.blockedUsers = new Set();
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getContacts() {
        return this.contacts;
    }

    getContactById(id) {
        return this.contacts.find(contact => contact.id === id);
    }

    blockUser(userId) {
        const contact = this.contacts.find(c => c.id === userId);
        if (contact) {
            contact.blocked = true;
            this.blockedUsers.add(userId);
            this.store.notify();
        }
    }

    unblockUser(userId) {
        const contact = this.contacts.find(c => c.id === userId);
        if (contact) {
            contact.blocked = false;
            this.blockedUsers.delete(userId);
            this.store.notify();
        }
    }

    isBlocked(userId) {
        return this.blockedUsers.has(userId);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatMessageTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    sendMessage(recipientId, text) {
        if (this.isBlocked(recipientId)) {
            return null;
        }

        const message = {
            id: this.generateId(),
            senderId: this.currentUser.id,
            recipientId,
            text,
            timestamp: new Date(),
            status: 'sent'
        };

        this.store.addMessage(message);
        
        // Simulate message delivery status
        setTimeout(() => {
            this.store.updateMessageStatus(message.id, 'delivered');
        }, 1000);

        // Simulate read receipt
        setTimeout(() => {
            this.store.updateMessageStatus(message.id, 'read');
        }, 2000);

        // Simulate reply if user is not blocked
        if (!this.isBlocked(recipientId)) {
            setTimeout(() => {
                const replies = [
                    "I'll join you for a game!",
                    "Sure, let's play!",
                    "Give me 5 minutes",
                    "Ready when you are!"
                ];
                const reply = {
                    id: this.generateId(),
                    senderId: recipientId,
                    recipientId: this.currentUser.id,
                    text: replies[Math.floor(Math.random() * replies.length)],
                    timestamp: new Date(),
                    status: 'sent'
                };
                this.store.addMessage(reply);
            }, 3000);
        }

        return message;
    }

    getConversation(contactId) {
        return this.store.getMessages().filter(msg => 
            (msg.senderId === this.currentUser.id && msg.recipientId === contactId) ||
            (msg.senderId === contactId && msg.recipientId === this.currentUser.id)
        ).sort((a, b) => a.timestamp - b.timestamp);
    }

    getLastMessage(contactId) {
        const messages = this.getConversation(contactId);
        return messages[messages.length - 1];
    }

    getUnreadCount(contactId) {
        return this.store.getMessages().filter(msg => 
            msg.recipientId === this.currentUser.id && 
            msg.senderId === contactId && 
            msg.status === 'delivered'
        ).length;
    }
}

export const chatService = new ChatService();