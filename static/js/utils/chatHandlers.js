import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export function initChatHandlers() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.querySelector('.chat-messages');
    const emojiButton = document.getElementById('emojiButton');
    const emojiPicker = document.querySelector('.emoji-picker');
    const privateChat = document.getElementById('privateChat');
    
    if (privateChat) {
        Draggable.create(privateChat, {
            trigger: '.chat-header',
            bounds: document.body
        });

        const minimizeBtn = privateChat.querySelector('.chat-minimize');
        const closeBtn = privateChat.querySelector('.chat-close');

        minimizeBtn?.addEventListener('click', () => {
            gsap.to(privateChat, {
                height: '40px',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        closeBtn?.addEventListener('click', () => {
            gsap.to(privateChat, {
                y: '100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    privateChat.style.display = 'none';
                }
            });
        });
    }

    emojiButton?.addEventListener('click', () => {
        emojiPicker?.classList.toggle('show');
    });

    document.querySelectorAll('.emoji-item').forEach(emoji => {
        emoji.addEventListener('click', () => {
            if (chatInput) {
                chatInput.value += emoji.textContent;
                emojiPicker?.classList.remove('show');
            }
        });
    });

    function addMessage(text, user = 'You') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message mb-2';
        messageDiv.innerHTML = `
            <small class="text-muted">${user}:</small>
            <div class="bg-light p-2 rounded">${text}</div>
        `;
        
        chatMessages?.appendChild(messageDiv);
        
        // Animate the new message
        gsap.fromTo(messageDiv, 
            { 
                opacity: 0, 
                y: 20 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.3,
                ease: 'power2.out'
            }
        );

        // Scroll to bottom
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

    // Show existing messages with animation
    document.querySelectorAll('.message').forEach((message, index) => {
        gsap.fromTo(message, 
            { 
                opacity: 0, 
                y: 20 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.3,
                delay: index * 0.1,
                ease: 'power2.out'
            }
        );
    });
}