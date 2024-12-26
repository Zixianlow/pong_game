export function SearchBar() {
    return `
        <div class="p-3 border-bottom">
            <div class="input-group">
                <input type="text" 
                       class="form-control" 
                       placeholder="Search messages..." 
                       id="searchMessages"
                       aria-label="Search messages">
                <button class="btn btn-outline-secondary" type="button">
                    <i class="bi bi-search"></i>
                </button>
            </div>
        </div>
    `;
}