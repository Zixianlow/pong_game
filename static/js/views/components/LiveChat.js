import { initChatHandlers } from '../../utils/chatHandlers.js';

export function LiveChat() {
  setTimeout(() => initChatHandlers(), 0);

  return `
        <div class="card">
            <div class="card-header bg-dark text-white">
                <h5 class="mb-0">Live Chat</h5>
            </div>
            <div class="card-body p-0">
                <div class="chat-messages p-3" style="height: 300px; overflow-y: auto;">
                    <div class="message mb-2">
                        <small class="text-muted">John:</small>
                        <div class="bg-light p-2 rounded">Anyone up for a quick match?</div>
                    </div>
                    <div class="message mb-2">
                        <small class="text-muted">Sarah:</small>
                        <div class="bg-light p-2 rounded">I'll join! Creating a room now.</div>
                    </div>
                    <div class="message mb-2">
                        <small class="text-muted">Mike:</small>
                        <div class="bg-light p-2 rounded">Good game everyone!</div>
                    </div>
                </div>
                <div class="chat-input p-3 border-top">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary" type="button" id="emojiButton">
                            <i class="bi bi-emoji-smile"></i>
                        </button>
                        <input type="text" class="form-control" placeholder="Type your message..." id="chatInput">
                        <button class="btn btn-primary" type="button" id="sendMessage">
                            <i class="bi bi-send-fill"></i> Send
                        </button>
                    </div>
                    <div class="emoji-picker p-2">
                        <div class="d-flex flex-wrap gap-1">
                            <span class="emoji-item" role="button">😊</span>
                            <span class="emoji-item" role="button">👍</span>
                            <span class="emoji-item" role="button">🎮</span>
                            <span class="emoji-item" role="button">🏆</span>
                            <span class="emoji-item" role="button">🔥</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
