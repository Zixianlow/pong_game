export function MessageInput() {
    return `
        <div class="p-3 bg-light">
            <div class="input-group">
                <button class="btn btn-light" type="button" title="Add emoji">
                    <i class="bi bi-emoji-smile"></i>
                </button>
                <button class="btn btn-light" type="button" title="Attach file">
                    <i class="bi bi-paperclip"></i>
                </button>
                <input type="text" 
                       class="form-control message-input" 
                       placeholder="Type a message"
                       aria-label="Type a message">
                <button class="btn btn-primary send-button" type="button">
                    <i class="bi bi-send-fill"></i>
                </button>
            </div>
        </div>
    `;
}