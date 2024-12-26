import { initProfileEditHandlers } from '../utils/profileEditHandlers.js';

export function ProfileEditView() {
    setTimeout(() => initProfileEditHandlers(), 0);
    
    return `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-dark text-white py-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">Edit Profile</h5>
                            <a href="#/profile" class="btn btn-outline-light btn-sm" data-link>
                                <i class="bi bi-x-lg"></i> Cancel
                            </a>
                        </div>
                    </div>
                    <div class="card-body p-4">
                        <form id="profileEditForm">
                            <!-- Profile Picture -->
                            <div class="text-center mb-4">
                                <div class="position-relative d-inline-block">
                                    <img src="https://via.placeholder.com/150" class="rounded-circle" alt="Profile Picture" id="profilePreview">
                                    <label for="profilePicture" class="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                                        <i class="bi bi-camera-fill"></i>
                                    </label>
                                    <input type="file" id="profilePicture" class="d-none" accept="image/*">
                                </div>
                            </div>

                            <!-- Basic Information -->
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Display Name</label>
                                    <input type="text" class="form-control" value="John Doe" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Username</label>
                                    <div class="input-group">
                                        <span class="input-group-text">@</span>
                                        <input type="text" class="form-control" value="johndoe" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" value="john@example.com" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Location</label>
                                    <input type="text" class="form-control" value="New York, USA">
                                </div>
                            </div>

                            <!-- Preferences -->
                            <h6 class="mb-3">Game Preferences</h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Preferred Game Mode</label>
                                    <select class="form-select">
                                        <option value="casual">Casual</option>
                                        <option value="ranked" selected>Ranked</option>
                                        <option value="tournament">Tournament</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Paddle Color</label>
                                    <input type="color" class="form-control form-control-color w-100" value="#007bff">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Bio</label>
                                    <textarea class="form-control" rows="3" placeholder="Tell us about yourself...">Passionate Pong player since 2023. Always up for a challenge!</textarea>
                                </div>
                            </div>

                            <!-- Privacy Settings -->
                            <h6 class="mb-3">Privacy Settings</h6>
                            <div class="mb-4">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="showOnline" checked>
                                    <label class="form-check-label" for="showOnline">Show Online Status</label>
                                </div>
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="showStats" checked>
                                    <label class="form-check-label" for="showStats">Show Game Statistics</label>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="allowMessages" checked>
                                    <label class="form-check-label" for="allowMessages">Allow Direct Messages</label>
                                </div>
                            </div>

                            <!-- Submit Buttons -->
                            <div class="d-flex justify-content-end gap-2">
                                <button type="button" class="btn btn-outline-secondary" data-link>Discard Changes</button>
                                <button type="submit" class="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}