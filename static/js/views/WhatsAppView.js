import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { ChatList } from './components/whatsapp/ChatList.js';
import { ChatArea } from './components/whatsapp/ChatArea.js';
import { initWhatsAppHandlers } from '../utils/whatsapp/whatsAppHandlers.js';
import { chatService } from '../services/chat/chatService.js';

export async function WhatsAppView() {
    const container = document.createElement('div');
    container.className = 'chat-container card border-0 shadow-sm';
    container.innerHTML = LoadingSpinner();

    try {
        // Fetch initial data
        const [chats, blockedUsers] = await Promise.all([
            chatService.getChats(),
            chatService.getBlockedUsers()
        ]);

        container.innerHTML = `
            <div class="row g-0 h-100">
                <div class="col-md-4 chat-sidebar">
                    ${await ChatList({ chats, blockedUsers })}
                </div>
                <div class="col-md-8">
                    ${ChatArea()}
                </div>
            </div>
        `;

        // Initialize handlers after rendering
        setTimeout(() => initWhatsAppHandlers(chats, blockedUsers), 0);
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading chats: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}