import { chatState } from './ChatState.js';
import { formatMessageTime } from '../../utils/dateUtils.js';

export class ChatUI {
    constructor() {
        this.chatList = document.querySelector('.chat-list');
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatHeader = document.querySelector('.chat-header');
        this.messageInput = document.querySelector('.message-input');
        this.sendButton = document.querySelector('.send-button');
        this.searchInput = document.getElementById('searchMessages');

        this.setupEventListeners();
        this.setupStateSubscription();
        this.updateChatList(); // Initial render
    }

    setupEventListeners() {
        this.sendButton?.addEventListener('click', () => this.handleSendMessage());
        this.messageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });

        this.searchInput?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    setupStateSubscription() {
        chatState.subscribe(() => {
            this.updateChatList();
            this.updateCurrentChat();
        });
    }

    handleSendMessage() {
        const text = this.messageInput?.value.trim();
        if (!text || !chatState.currentChat) return;

        if (chatState.isBlocked(chatState.currentChat)) {
            alert('Cannot send message to blocked user');
            return;
        }

        const message = {
            id: Date.now().toString(),
            senderId: 'currentUser',
            recipientId: chatState.currentChat,
            content: text,
            timestamp: new Date().toISOString(),
            status: 'sent'
        };

        chatState.addMessage(message);
        this.messageInput.value = '';
        this.scrollToBottom();
    }

    handleSearch(searchTerm) {
        const items = this.chatList?.querySelectorAll('.chat-item');
        if (!items) return;

        const term = searchTerm.toLowerCase();
        items.forEach(item => {
            const name = item.querySelector('.chat-name').textContent.toLowerCase();
            const lastMessage = item.querySelector('.chat-last-message').textContent.toLowerCase();
            const isVisible = name.includes(term) || lastMessage.includes(term);
            item.style.display = isVisible ? 'block' : 'none';
        });
    }

    updateChatList() {
        if (!this.chatList) return;

        const chats = chatState.getChats();
        this.chatList.innerHTML = chats.map(chat => 
            this.createChatListItem(chat.user, chat.lastMessage, chat.unreadCount)
        ).join('');

        // Add click handlers
        this.chatList.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', () => {
                chatState.setCurrentChat(item.dataset.userId);
            });
        });
    }

    updateCurrentChat() {
        if (!chatState.currentChat) return;

        this.updateChatHeader();
        this.updateChatMessages();
    }

    updateChatHeader() {
        if (!this.chatHeader || !chatState.currentChat) return;

        const user = chatState.getUserInfo(chatState.currentChat);
        const isBlocked = chatState.isBlocked(chatState.currentChat);
        
        this.chatHeader.innerHTML = `
            <div class="d-flex justify-content-between align-items-center p-3">
                <div class="d-flex align-items-center">
                    <img src="${user.avatar}" class="rounded-circle me-2" alt="${user.name}">
                    <div>
                        <h6 class="mb-0">${user.name}</h6>
                        <small class="text-muted">${user.status}</small>
                    </div>
                </div>
                <button class="btn btn-light rounded-circle" onclick="window.handleBlockUser('${user.id}')">
                    <i class="bi bi-${isBlocked ? 'unlock' : 'slash-circle'}"></i>
                </button>
            </div>
        `;
    }

    updateChatMessages() {
        if (!this.chatMessages || !chatState.currentChat) return;

        const messages = chatState.getMessages(chatState.currentChat);
        this.chatMessages.innerHTML = messages.map(msg => this.createMessageElement(msg)).join('');
        this.scrollToBottom();
    }

    createChatListItem(user, lastMessage, unreadCount) {
        const isBlocked = chatState.isBlocked(user.id);
        return `
            <div class="chat-item p-3 border-bottom ${isBlocked ? 'blocked' : ''}" 
                 data-user-id="${user.id}">
                <div class="d-flex">
                    <div class="position-relative">
                        <img src="${user.avatar}" class="rounded-circle" alt="${user.name}">
                        <span class="position-absolute bottom-0 end-0 bg-${user.status === 'online' ? 'success' : 'secondary'} rounded-circle" 
                              style="width: 10px; height: 10px;"></span>
                    </div>
                    <div class="ms-3 flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 chat-name">
                                ${user.name}
                                ${isBlocked ? '<i class="bi bi-slash-circle text-muted"></i>' : ''}
                            </h6>
                            <small class="text-muted">${formatMessageTime(lastMessage.timestamp)}</small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="chat-last-message text-muted small">${lastMessage.content}</div>
                            ${unreadCount > 0 ? `
                                <span class="badge rounded-pill bg-primary">${unreadCount}</span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createMessageElement(message) {
        const isSelf = message.senderId === 'currentUser';
        return `
            <div class="message ${isSelf ? 'message-self' : 'message-other'} mb-3">
                <div class="message-content p-3">
                    ${message.content}
                    <div class="message-info d-flex align-items-center mt-1">
                        <small class="me-2">${formatMessageTime(message.timestamp)}</small>
                        ${isSelf ? `
                            <i class="bi bi-check2-all ${message.status === 'read' ? 'text-primary' : ''}"></i>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }
}

// Initialize chat UI when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatUI = new ChatUI();
    
    // Global handler for blocking users
    window.handleBlockUser = (userId) => {
        chatState.toggleBlockUser(userId);
    };
});