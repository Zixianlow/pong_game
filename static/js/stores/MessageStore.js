class MessageStore {
    constructor() {
        this.messages = [];
        this.subscribers = new Set();
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback(this.messages));
    }

    addMessage(message) {
        this.messages.push(message);
        this.notify();
    }

    updateMessageStatus(messageId, status) {
        const message = this.messages.find(msg => msg.id === messageId);
        if (message) {
            message.status = status;
            this.notify();
        }
    }

    getMessages() {
        return [...this.messages];
    }
}

export const messageStore = new MessageStore();