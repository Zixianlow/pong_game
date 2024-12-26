export function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (days === 1) {
        return 'Yesterday';
    }
    if (days < 7) {
        return `${days} days ago`;
    }
    return date.toLocaleDateString();
}