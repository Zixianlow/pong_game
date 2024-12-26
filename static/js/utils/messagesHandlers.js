import { animate } from './animation.js';

export function initMessagesHandlers() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.querySelector('.chat-messages');
    const searchInput = document.getElementById('searchMessages');
    const contactItems = document.querySelectorAll('.contact-item');

    function addMessage(text, sender = 'self') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${sender} mb-3`;
        messageDiv.innerHTML = `
            <div class="message-content p-3 rounded">
                <div class="message-text">${text}</div>
                <small class="message-time text-muted">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
            </div>
        `;
        
        chatMessages?.appendChild(messageDiv);
        animate.fadeIn(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        const text = messageInput?.value.trim();
        if (text) {
            addMessage(text);
            messageInput.value = '';
        }
    }

    sendButton?.addEventListener('click', handleSendMessage);
    messageInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        contactItems.forEach(item => {
            const name = item.querySelector('h6').textContent.toLowerCase();
            const message = item.querySelector('small').textContent.toLowerCase();
            const shouldShow = name.includes(searchTerm) || message.includes(searchTerm);
            
            item.style.transition = 'opacity 200ms ease';
            item.style.opacity = shouldShow ? '1' : '0.5';
        });
    });

    // Animate existing messages
    document.querySelectorAll('.message').forEach((message, index) => {
        animate.fadeIn(message, 300, index * 100);
    });
}