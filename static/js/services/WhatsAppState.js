export class WhatsAppState {
    constructor() {
        this.selectedChat = null;
        this.chats = new Map();
        this.subscribers = new Set();
        this.initializeMockData();
    }

    initializeMockData() {
        const mockChats = [
            {
                id: '1',
                user: {
                    id: '1',
                    name: 'John Doe',
                    avatar: 'https://via.placeholder.com/40',
                    status: 'online'
                },
                messages: [
                    {
                        id: '1',
                        content: 'Hey! Want to play a match?',
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        senderId: '1',
                        status: 'read'
                    }
                ]
            },
            {
                id: '2',
                user: {
                    id: '2',
                    name: 'Sarah Smith',
                    avatar: 'https://via.placeholder.com/40',
                    status: 'offline'
                },
                messages: [
                    {
                        id: '2',
                        content: 'Good game yesterday!',
                        timestamp: new Date(Date.now() - 7200000).toISOString(),
                        senderId: '2',
                        status: 'delivered'
                    }
                ]
            }
        ];

        mockChats.forEach(chat => {
            this.chats.set(chat.id, chat);
        });
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback());
    }

    selectChat(chatId) {
        this.selectedChat = chatId;
        this.notify();
    }

    sendMessage(content) {
        if (!this.selectedChat || !content.trim()) return null;

        const chat = this.chats.get(this.selectedChat);
        if (!chat) return null;

        const message = {
            id: Date.now().toString(),
            content: content.trim(),
            timestamp: new Date().toISOString(),
            senderId: 'self',
            status: 'sent'
        };

        chat.messages.push(message);
        this.notify();

        // Simulate reply
        setTimeout(() => {
            const replies = [
                "I'll join you for a game!",
                "Sure, let's play!",
                "Give me 5 minutes",
                "Ready when you are!"
            ];

            const reply = {
                id: (Date.now() + 1).toString(),
                content: replies[Math.floor(Math.random() * replies.length)],
                timestamp: new Date().toISOString(),
                senderId: chat.user.id,
                status: 'delivered'
            };

            chat.messages.push(reply);
            this.notify();
        }, 1000);

        return message;
    }

    getChats() {
        return Array.from(this.chats.values());
    }

    getChat(chatId) {
        return this.chats.get(chatId);
    }

    getSelectedChat() {
        return this.selectedChat ? this.chats.get(this.selectedChat) : null;
    }
}