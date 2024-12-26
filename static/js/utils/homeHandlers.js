import { animate } from './animation.js';

export function initHomeHandlers() {
    const playNowBtn = document.getElementById('playNowBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const localTournamentBtn = document.getElementById('localTournamentBtn');

    // Hero section animations
    const heroTitle = document.querySelector('.hero-card .display-4');
    const heroLead = document.querySelector('.hero-card .lead');
    const heroButtons = document.querySelectorAll('.hero-card .btn');
    const statItems = document.querySelectorAll('.stat-item');

    animate.fadeIn(heroTitle, 800);
    setTimeout(() => animate.fadeIn(heroLead, 800), 200);
    
    heroButtons.forEach((btn, index) => {
        setTimeout(() => animate.fadeIn(btn, 800), 400 + (index * 100));
    });

    statItems.forEach((item, index) => {
        setTimeout(() => animate.fadeIn(item, 800), 600 + (index * 100));
    });

    // Featured rooms animations
    const listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach((item, index) => {
        setTimeout(() => animate.fadeIn(item, 500), index * 100);
    });

    // Button interactions
    playNowBtn?.addEventListener('click', () => {
        animate.fadeIn(playNowBtn, 100);
        setTimeout(() => {
            window.location.href = '#/lobby';
        }, 200);
    });

    localTournamentBtn?.addEventListener('click', () => {
        animate.fadeIn(localTournamentBtn, 100);
        setTimeout(() => {
            window.location.href = '#/local-tournament';
        }, 200);
    });

    learnMoreBtn?.addEventListener('click', () => {
        animate.fadeIn(learnMoreBtn, 100);
    });
}