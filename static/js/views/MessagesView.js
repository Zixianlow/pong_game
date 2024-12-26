import { initMessagesHandlers } from '../utils/messagesHandlers.js';

export function MessagesView() {
    setTimeout(() => initMessagesHandlers(), 0);
    
    return `
        <div class="card border-0 shadow-sm" style="height: 80vh;">
            <div class="row g-0 h-100">
                <!-- Contacts List -->
                <div class="col-md-4 border-end">
                    <div class="p-3 border-bottom">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search messages..." id="searchMessages">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="overflow-auto" style="height: calc(80vh - 71px);">
                        ${generateContactsList()}
                    </div>
                </div>

                <!-- Chat Area -->
                <div class="col-md-8 d-flex flex-column">
                    <div class="chat-header p-3 border-bottom">
                        <div class="d-flex align-items-center">
                            <img src="https://via.placeholder.com/40" class="rounded-circle me-2" alt="Profile">
                            <div>
                                <h6 class="mb-0">John Doe</h6>
                                <small class="text-muted">Online</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-messages p-3 flex-grow-1 overflow-auto">
                        ${generateMessages()}
                    </div>

                    <div class="chat-input p-3 border-top">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary" type="button" id="attachButton">
                                <i class="bi bi-paperclip"></i>
                            </button>
                            <button class="btn btn-outline-secondary" type="button" id="emojiButton">
                                <i class="bi bi-emoji-smile"></i>
                            </button>
                            <input type="text" class="form-control" placeholder="Type a message..." id="messageInput">
                            <button class="btn btn-primary" type="button" id="sendButton">
                                <i class="bi bi-send-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateContactsList() {
    const contacts = [
        { name: 'John Doe', message: 'Hey! Want to play a match?', time: '12:30 PM', unread: 2 },
        { name: 'Sarah Smith', message: 'Good game!', time: '11:45 AM', unread: 0 },
        { name: 'Mike Johnson', message: 'Let\'s play tomorrow', time: '10:15 AM', unread: 1 }
    ];

    return contacts.map(contact => `
        <div class="contact-item p-3 border-bottom" role="button">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="https://via.placeholder.com/40" class="rounded-circle me-2" alt="${contact.name}">
                    <div>
                        <h6 class="mb-0">${contact.name}</h6>
                        <small class="text-muted">${contact.message}</small>
                    </div>
                </div>
                <div class="text-end">
                    <small class="text-muted d-block">${contact.time}</small>
                    ${contact.unread ? `<span class="badge bg-primary rounded-pill">${contact.unread}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function generateMessages() {
    const messages = [
        { text: 'Hey! Want to play a match?', sender: 'other', time: '12:30 PM' },
        { text: 'Sure! Give me 5 minutes', sender: 'self', time: '12:31 PM' },
        { text: 'Great! I\'ll create a room', sender: 'other', time: '12:31 PM' },
        { text: 'Perfect, see you there!', sender: 'self', time: '12:32 PM' }
    ];

    return messages.map(message => `
        <div class="message ${message.sender === 'self' ? 'message-self' : 'message-other'} mb-3">
            <div class="message-content p-3 rounded">
                <div class="message-text">${message.text}</div>
                <small class="message-time text-muted">${message.time}</small>
            </div>
        </div>
    `).join('');
}