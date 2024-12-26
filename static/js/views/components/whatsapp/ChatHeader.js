export function ChatHeader() {
    return `
        <div class="chat-header border-bottom bg-light">
            <div class="d-flex justify-content-between align-items-center p-3">
                <div class="d-flex align-items-center" id="selectedUserInfo">
                    <div class="text-center text-muted">
                        Select a chat to start messaging
                    </div>
                </div>
                <div class="dropdown" id="chatActions" style="display: none;">
                    <button class="btn btn-light rounded-circle" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <button class="dropdown-item" id="toggleBlockBtn">
                                <i class="bi bi-slash-circle me-2"></i>
                                <span>Block User</span>
                            </button>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <button class="dropdown-item text-danger">
                                <i class="bi bi-trash me-2"></i>Clear Chat
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}