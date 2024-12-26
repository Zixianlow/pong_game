import { HomeView } from '../views/HomeView.js';
import { LoginView } from '../views/auth/LoginView.js';
import { RegisterView } from '../views/auth/RegisterView.js';
import { WhatsAppView } from '../views/WhatsAppView.js';
import { ProfileView } from '../views/ProfileView.js';
import { ProfileEditView } from '../views/ProfileEditView.js';
import { NotFoundView } from '../views/NotFoundView.js';
import { GameLobbyView } from '../views/GameLobbyView.js';
import { LocalTournamentView } from '../views/LocalTournamentView.js';
import { PongGameView } from '../views/PongGameView.js';
import { PongGameVSView } from '../views/PongGameVSView.js';
import { TournamentBracketView } from '../views/TournamentBracketView.js';
import { TournamentPodiumView } from '../views/TournamentPodiumView.js';
import { CreateRoomView } from '../views/CreateRoomView.js';
import { GameRoomView } from '../views/GameRoomView.js';

export const routes = {
    '/': HomeView,
    '/login': LoginView,
    '/register': RegisterView,
    '/whatsapp': WhatsAppView,
    '/profile': ProfileView,
    '/profile/edit': ProfileEditView,
    '/lobby': GameLobbyView,
    '/local-tournament': LocalTournamentView,
    '/game': PongGameView,
    '/game-vs': PongGameVSView,
    '/tournament/brackets': TournamentBracketView,
    '/tournament/podium': TournamentPodiumView,
    '/create-room': CreateRoomView,
    '/game-room': GameRoomView,
    '/404': NotFoundView
};
