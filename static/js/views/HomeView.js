import { HeroSection } from './components/home/HeroSection.js';
import { LeaderboardSection } from './components/home/LeaderboardSection.js';
import { NewsSection } from './components/home/NewsSection.js';
import { initHomeHandlers } from '../utils/homeHandlers.js';

export function HomeView() {
    setTimeout(() => initHomeHandlers(), 0);

    return `
            <div class="row g-4">
                ${HeroSection()}
                <div class="col-md-8">
                    ${NewsSection()}
                </div>
                <div class="col-md-4">
                    ${LeaderboardSection()}
                </div>
            </div>
        `;
}
