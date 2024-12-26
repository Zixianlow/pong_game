import { initRegisterHandlers } from '../../utils/auth/registerHandlers.js';

export function RegisterView() {
    setTimeout(() => initRegisterHandlers(), 0);

    return `
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">
                        <div class="text-center mb-4">
                            <h2 class="mb-1">Create Account</h2>
                            <p class="text-muted">Join Pong Arena and start playing!</p>
                        </div>

                        <form id="registerForm">
                            <div class="mb-3">
                                <label class="form-label">Username</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="bi bi-person"></i>
                                    </span>
                                    <input type="text" 
                                           class="form-control" 
                                           id="username" 
                                           placeholder="Choose a username"
                                           required>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="bi bi-envelope"></i>
                                    </span>
                                    <input type="email" 
                                           class="form-control" 
                                           id="email" 
                                           placeholder="Enter your email"
                                           required>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="bi bi-lock"></i>
                                    </span>
                                    <input type="password" 
                                           class="form-control" 
                                           id="password" 
                                           placeholder="Create a password"
                                           required>
                                    <button class="btn btn-outline-secondary" 
                                            type="button" 
                                            id="togglePassword">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                                <div class="password-strength mt-2" id="passwordStrength"></div>
                            </div>

                            <div class="mb-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="terms" required>
                                    <label class="form-check-label" for="terms">
                                        I agree to the <a href="#/terms" class="text-decoration-none">Terms of Service</a>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 mb-3">
                                <i class="bi bi-person-plus me-2"></i>Create Account
                            </button>

                            <div class="text-center">
                                <p class="mb-0">Already have an account? 
                                    <a href="#/login" class="text-decoration-none">Sign in</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}