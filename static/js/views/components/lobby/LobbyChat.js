export function LobbyChat() {
    return `
        <div class="card flex-grow-1 d-flex flex-column" style="min-height: 200px;">
            <div class="card-header bg-info bg-gradient text-white">
                <h5 class="mb-0">Lobby Chat</h5>
            </div>
            <div class="card-body p-0 d-flex flex-column" style="min-height: 0;">
                <div class="chat-messages p-3 flex-grow-1" style="height: 0; overflow-y: auto;">
                    ${generateChatMessages()}
                </div>
                <div class="p-3 border-top mt-auto">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Type your message..." id="lobbyChatInput">
                        <button class="btn btn-primary" type="button" id="lobbyChatSend">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateChatMessages() {
    const messages = [
        { user: "System", text: "Welcome to the lobby chat!", type: "system" },
        { user: "John", text: "Anyone up for a quick match?", type: "user" },
        { user: "Sarah", text: "I'll join! Creating a room now.", type: "user" },
        { user: "System", text: "Sarah created room 'Casual Fun'", type: "system" },
        { user: "Mike", text: "Good game everyone!", type: "user" }
    ];

    return messages.map(msg => `
        <div class="message mb-2 ${msg.type === 'system' ? 'text-muted fst-italic' : ''}">
            <small class="fw-bold">${msg.user}:</small>
            <span>${msg.text}</span>
        </div>
    `).join('');
}