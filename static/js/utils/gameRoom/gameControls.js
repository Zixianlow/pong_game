export function initGameControls() {
    const readyBtn = document.getElementById('readyBtn');
    const leaveRoom = document.getElementById('leaveRoom');

    readyBtn?.addEventListener('click', () => {
        const isReady = readyBtn.classList.contains('btn-success');
        readyBtn.classList.toggle('btn-success');
        readyBtn.classList.toggle('btn-light');
        readyBtn.innerHTML = isReady ? 
            '<i class="bi bi-check-circle-fill"></i> Ready' : 
            '<i class="bi bi-check-circle-fill"></i> Ready!';
    });

    leaveRoom?.addEventListener('click', () => {
        window.location.href = '#/lobby';
    });
}