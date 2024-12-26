export function NewsSection() {
    return `
        <div class="card">
            <div class="card-header bg-info bg-gradient text-white">
                <h5 class="mb-0">Latest News</h5>
            </div>
            <div class="card-body">
                <div class="news-grid">
                    ${generateNewsItems()}
                </div>
            </div>
        </div>
    `;
}

function generateNewsItems() {
    const news = [
        {
            title: "Weekend Tournament",
            content: "Join our weekend tournament with a prize pool of $500!",
            date: "Today",
            icon: "trophy"
        },
        {
            title: "New Season Starting",
            content: "Season 3 starts next week. Get ready for new rewards!",
            date: "2 days ago",
            icon: "calendar-event"
        }
    ];

    return news.map(item => `
        <div class="news-item p-3 border rounded mb-3">
            <div class="d-flex align-items-center gap-3">
                <div class="news-icon p-2 bg-info bg-opacity-10 rounded-circle">
                    <i class="bi bi-${item.icon} text-info fs-4"></i>
                </div>
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <p class="mb-1 text-muted">${item.content}</p>
                    <small class="text-muted">${item.date}</small>
                </div>
            </div>
        </div>
    `).join('');
}