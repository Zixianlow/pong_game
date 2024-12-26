import { chatService } from '../../services/chat/chatService.js';
import { animate } from '../animation.js';

export function initWhatsAppHandlers(initialChats, initialBlockedUsers) {
    let currentChat = null;
    let chats = initialChats;
    let blockedUsers = initialBlockedUsers;

    const chatList = document.querySelector('.chat-list');
    const chatMessages = document.querySelector('.chat-messages');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const searchInput = document.getElementById('searchMessages');

    async function loadChatMessages(chatId) {
        try {
            const messages = await chatService.getChatMessages(chatId);
            updateChatMessages(messages);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    function updateChatMessages(messages) {
        if (!chatMessages) return;

        chatMessages.innerHTML = messages.map(msg => `
            <div class="message ${msg.senderId === 'currentUser' ? 'message-self' : 'message-other'} mb-3">
                <div class="message-content p-3">
                    ${msg.content}
                    <div class="message-info d-flex align-items-center mt-1">
                        <small class="me-2">${formatMessageTime(msg.timestamp)}</small>
                        ${msg.senderId === 'currentUser' ? getStatusIcon(msg.status) : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    async function handleSendMessage() {
        if (!messageInput || !currentChat) return;
        const content = messageInput.value.trim();
        
        if (content && !blockedUsers.includes(currentChat.userId)) {
            try {
                const message = await chatService.sendMessage(currentChat.id, content);
                messageInput.value = '';
                await loadChatMessages(currentChat.id);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }

    async function handleChatSelect(chatId) {
        if (!chatId) return;
        
        currentChat = chats.find(chat => chat.id === chatId);
        if (!currentChat) return;

        try {
            await chatService.markAsRead(chatId);
            await loadChatMessages(chatId);
            updateChatHeader(currentChat);
        } catch (error) {
            console.error('Error selecting chat:', error);
        }
    }

    async function handleBlockUser(userId) {
        try {
            if (blockedUsers.includes(userId)) {
                await chatService.unblockUser(userId);
                blockedUsers = blockedUsers.filter(id => id !== userId);
            } else {
                await chatService.blockUser(userId);
                blockedUsers.push(userId);
            }
            updateBlockedState();
        } catch (error) {
            console.error('Error toggling block:', error);
        }
    }

    // Event Listeners
    chatList?.addEventListener('click', (e) => {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            const chatId = chatItem.dataset.chatId;
            handleChatSelect(chatId);
        }
    });

    sendButton?.addEventListener('click', handleSendMessage);
    messageInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.chat-item');
        
        items.forEach(item => {
            const name = item.querySelector('h6').textContent.toLowerCase();
            const message = item.querySelector('small').textContent.toLowerCase();
            const isVisible = name.includes(searchTerm) || message.includes(searchTerm);
            item.style.display = isVisible ? 'block' : 'none';
        });
    });

    // Initialize UI
    updateBlockedState();
}

function getStatusIcon(status) {
    const icons = {
        'sent': '<i class="bi bi-check"></i>',
        'delivered': '<i class="bi bi-check-all"></i>',
        'read': '<i class="bi bi-check-all text-primary"></i>'
    };
    return icons[status] || icons.sent;
}

function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
}