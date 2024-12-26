export function RoomChat() {
    return `
        <div class="card">
            <div class="card-header bg-dark text-white">
                <h5 class="mb-0">Room Chat</h5>
            </div>
            <div class="card-body p-0">
                <div class="chat-messages p-3" style="height: 300px; overflow-y: auto;">
                    <!-- Messages will be dynamically added here -->
                </div>
                <div class="p-3 border-top">
                    <div class="input-group">
                        <input type="text" class="form-control" id="chatInput" placeholder="Type your message...">
                        <button class="btn btn-primary" type="button" id="sendMessage">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}