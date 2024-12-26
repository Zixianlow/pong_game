import { routes } from './routes.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { requireAuth } from './guards.js';
import { PongGameTournamentView } from '../views/PongGameTournamentView.js';
import { PongGameVSView } from '../views/PongGameVSView.js';
import { TournamentBracketView } from '../views/TournamentBracketView.js';
import { renderView } from './routes.js';

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

        if (path.startsWith('/game') && !path.startsWith('/game-vs')) {
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            const player1 = urlParams.get('player1');
            const player2 = urlParams.get('player2');
            const semi1 = urlParams.get('semi1');
            const semi2 = urlParams.get('semi2');
            const game = urlParams.get('game');

            if (!(player1 == null || player2 == null)){
                this.root.innerHTML = LoadingSpinner();
                
                try {
                    // Pass the extracted `isTournament` value to PongGameView
                    const view = await PongGameTournamentView(player1, player2, semi1, semi2, game);
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
            const semi1 = urlParams.get('semi1');
            const semi2 = urlParams.get('semi2');

            if (!(semi1 == null || semi2 == null)){
                this.root.innerHTML = LoadingSpinner();
                
                try {
                    // Pass the extracted `isTournament` value to PongGameView
                    const view = await TournamentBracketView(semi1, semi2);
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

        if (path == '/game'){
            renderView(path);
        }
    }

    navigateTo(url) {
        window.location.hash = url;
        this.handleRoute();
    }
}