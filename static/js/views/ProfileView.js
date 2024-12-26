import { ProfileHeader } from './components/ProfileHeader.js';
import { ProfileStats } from './components/ProfileStats.js';
import { RecentMatches } from './components/RecentMatches.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';

export async function ProfileView() {
    const container = document.createElement('div');
    container.className = 'profile-container';
    container.innerHTML = LoadingSpinner();

    try {
        // Load all profile sections concurrently
        const [header, stats, matches, ranking, achievements] = await Promise.all([
            ProfileHeader(),
            ProfileStats(),
            RecentMatches(),
        ]);

        container.innerHTML = `
            <!-- Profile Header -->
            ${header}
            
            <!-- Main Content -->
            <div class="row">
                <!-- Stats Section -->
                ${stats}
                
                <!-- Recent Matches -->
                ${matches}
            </div>

            <!-- Quick Actions -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <h5 class="card-title mb-0">Quick Actions</h5>
                                <div class="d-flex gap-2">
                                    <a href="#/lobby" class="btn btn-primary" data-link>
                                        <i class="bi bi-play-circle-fill me-2"></i>Play Now
                                    </a>
                                    <a href="#/local-tournament" class="btn btn-outline-primary" data-link>
                                        <i class="bi bi-trophy-fill me-2"></i>Join Tournament
                                    </a>
                                    <a href="#/profile/edit" class="btn btn-outline-primary" data-link>
                                        <i class="bi bi-gear-fill me-2"></i>Settings
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Error loading profile: ${error.message}
            </div>
        `;
    }

    return container.innerHTML;
}