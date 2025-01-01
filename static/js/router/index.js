import { routes } from './routes.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { requireAuth } from './guards.js';
import { TournamentBracketView } from '../views/TournamentBracketView.js';
import { displayGameSection, hideGameSection } from '../main.js';
import { PongGameVSView } from '../views/PongGameVSView.js';

export class Router {
    constructor(rootElement) {
        this.root = rootElement;
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        this.bindLinks();
        this.handleRoute();
    }

    bindLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#/"]');
            if (link) {
                e.preventDefault();
                const path = link.getAttribute('href').slice(1); // Remove the '#'
                this.navigateTo(path);
            }
        });
    }

    async handleRoute() {
        const path = window.location.hash.slice(1) || '/';
        
        // Check authentication
        const authResult = requireAuth(path);
        
        if (authResult === false) {
            // Not authenticated, redirect to login
            window.location.hash = '/login';
            return;
        } else if (typeof authResult === 'string' && authResult.startsWith('redirect:')) {
            // Redirect to specified path
            window.location.hash = authResult.split(':')[1];
            return;
        }

        if (path.startsWith('/logout')) {
            localStorage.removeItem('token');
            window.location.hash = '/login';
            return;
        }

        if (path.startsWith('/game') && !path.startsWith('/game-vs')) {
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            let player1 = urlParams.get('player1');
            let player2 = urlParams.get('player2');
            let gametype = urlParams.get('gametype');

            if (!(player1 == null)) {
                document.querySelector('#player1Name').textContent = player1;
            }

            if (!(player2 == null)) {
                document.querySelector('#player2Name').textContent = player2;
            }

            if (!(gametype == null)) {
                document.querySelector('#gameType').textContent = gametype;
            }
        }

        if (path.startsWith('/game-vs')) {
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            const player1 = urlParams.get('player1');
            const player2 = urlParams.get('player2');
            const socketuser = urlParams.get('socketuser');

            if (!(player1 == null || player2 == null)){
                this.root.innerHTML = LoadingSpinner();
                
                try {
                    // Pass the extracted `isTournament` value to PongGameView
                    const view = await PongGameVSView(player1, player2, socketuser);
                    this.root.innerHTML = view;
                } catch (error) {
                    console.error('Route error:', error);
                    this.root.innerHTML = `
                        <div class="alert alert-danger">
                            Error loading game room: ${error.message}
                        </div>
                    `;
                }
                return;
            }
        }

        if (path.startsWith('/tournament/brackets')) {
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            let semi1 = urlParams.get('semi1');
            let semi2 = urlParams.get('semi1');

            if (!(semi1 == null)) {
                document.querySelector('#semi1Winner').textContent = semi1;
            }

            if (!(semi2 == null)) {
                document.querySelector('#semi2Winner').textContent = semi2;
            }

            semi1 = document.querySelector('#semi1Winner').textContent;
            semi2 = document.querySelector('#semi2Winner').textContent;

            if (semi1 = "")
                semi1 = null;
            if (semi2 = "")
                semi2 = null;

            if (!(semi1 == null || semi2 == null)){
                this.root.innerHTML = LoadingSpinner();
                
                try {
                    // Pass the extracted `isTournament` value to PongGameView
                    const view = await TournamentBracketView(semi1, semi2);
                    hideGameSection();
                    this.root.innerHTML = view;
                } catch (error) {
                    console.error('Route error:', error);
                    this.root.innerHTML = `
                        <div class="alert alert-danger">
                            Error loading game room: ${error.message}
                        </div>
                    `;
                }
                return;
            }
        }

        const route = routes[path] || routes['/404'];
        
        // Show loading spinner
        this.root.innerHTML = LoadingSpinner();
        if (path.startsWith('/game') && !path.startsWith('/game-vs')) {
            displayGameSection();
        } else {
            hideGameSection();
            try {
                const view = await route();
                this.root.innerHTML = view;
            } catch (error) {
                console.error('Route error:', error);
                this.root.innerHTML = `
                    <div class="alert alert-danger">
                        Error loading page: ${error.message}
                    </div>
                `;
            }
        }
    }

    navigateTo(url) {
        window.location.hash = url;
        this.handleRoute();
    }
}