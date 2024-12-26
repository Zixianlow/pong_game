export function ChatArea() {
    return `
        <div class="chat-main d-flex h-100 flex-column" style="max-height: 73vh; overflow-y: auto;">
        <!-- Chat messages container -->
        <div class="chat-messages flex-grow-1 p-3" style="overflow-y: auto; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 5px;">
            <!-- Messages will be dynamically inserted -->
        </div>

        <!-- Chat input area -->
        <div class="chat-input mt-2">
            <div class="input-group">
                <!-- Emoji button -->
                <button class="btn btn-light" type="button" title="Add emoji">
                    <i class="bi bi-emoji-smile"></i>
                </button>

                <!-- File attachment button -->
                <button class="btn btn-light" type="button" title="Attach file">
                    <i class="bi bi-paperclip"></i>
                </button>

                <!-- Text input for the message -->
                <input type="text" 
                    class="form-control message-input" 
                    placeholder="Type a message..."
                    aria-label="Message input">

                <!-- Send button -->
                <button class="btn btn-primary send-button" type="button" title="Send message">
                    <i class="bi bi-send-fill"></i>
                </button>
            </div>
        </div>
    </div>

    `;
}