export function Message({ content, timestamp, isSelf, status }) {
    return `
        <div class="message ${isSelf ? 'message-self' : 'message-other'} mb-3">
            <div class="message-content p-3 ${isSelf ? 'bg-success text-white' : 'bg-white'}">
                ${content}
                <div class="message-info d-flex align-items-center mt-1">
                    <small class="me-2 ${isSelf ? 'text-light' : 'text-muted'}">${formatMessageTime(timestamp)}</small>
                    ${isSelf ? getStatusIcon(status) : ''}
                </div>
            </div>
        </div>
    `;
}

function getStatusIcon(status) {
    const icons = {
        'sent': '<i class="bi bi-check text-light"></i>',
        'delivered': '<i class="bi bi-check-all text-light"></i>',
        'read': '<i class="bi bi-check-all text-light opacity-75"></i>'
    };
    return icons[status] || icons.sent;
}

function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}