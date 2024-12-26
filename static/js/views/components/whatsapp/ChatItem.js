export function ChatItem({ user, lastMessage, unreadCount, isActive }) {
    return `
        <div class="chat-item p-3 border-bottom ${isActive ? 'active bg-light' : ''}" 
             role="button" 
             data-user-id="${user.id}">
            <div class="d-flex">
                <div class="position-relative">
                    <img src="${user.avatar}" 
                         class="rounded-circle" 
                         alt="${user.name}"
                         width="40" 
                         height="40">
                    <span class="position-absolute bottom-0 end-0 bg-${user.status === 'online' ? 'success' : 'secondary'} rounded-circle"
                          style="width: 10px; height: 10px;"></span>
                </div>
                <div class="ms-3 flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">${user.name}</h6>
                        <small class="text-muted">${formatMessageTime(lastMessage.timestamp)}</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${lastMessage.content}</small>
                        ${unreadCount ? `
                            <span class="badge rounded-pill bg-primary">${unreadCount}</span>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
}