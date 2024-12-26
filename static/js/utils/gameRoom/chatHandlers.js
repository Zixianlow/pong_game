import { animate } from '../animation.js';

export function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.querySelector('.chat-messages');

    function addMessage(text, user = 'You') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message mb-2';
        messageDiv.innerHTML = `
            <small class="text-muted">${user}:</small>
            <div class="bg-light p-2 rounded">${text}</div>
        `;
        
        chatMessages?.appendChild(messageDiv);
        animate.fadeIn(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        const text = chatInput?.value.trim();
        if (text) {
            addMessage(text);
            chatInput.value = '';
        }
    }

    sendButton?.addEventListener('click', handleSendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
}