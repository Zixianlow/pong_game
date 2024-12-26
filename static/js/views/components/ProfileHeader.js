import { userService } from '../../services/api/userService.js';
import { LoadingSpinner } from '../../components/LoadingSpinner.js';

export async function ProfileHeader() {
    const container = document.createElement('div');
    container.innerHTML = LoadingSpinner();

    try {
        const currentUser = await userService.getProfile();
        console.log(currentUser);
        const stats = await userService.getStats();

        container.innerHTML = `
            <div class="col-12 mb-4">
                <div class="card bg-dark text-white">
                    <div class="card-body p-4">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <div class="position-relative">
                                    <img src="${currentUser.avatar || 'https://via.placeholder.com/120'}" 
                                         class="rounded-circle" alt="Profile Picture">
                                    <button class="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col">
                                <h2 class="mb-1">${currentUser.username}</h2>
                                <p class="mb-2 text-light">@${currentUser.email}</p>
                                <p class="mb-0">${currentUser.bio}</p>
                            </div>
                            <div class="col-auto">
                                <a href="#/profile/edit" class="btn btn-outline-light" data-link>
                                    <i class="bi bi-pencil-square me-2"></i>Edit Profile
                                </a>
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