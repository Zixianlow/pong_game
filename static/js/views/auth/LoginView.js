import { initLoginHandlers } from '../../utils/auth/loginHandlers.js';

export function LoginView() {
    setTimeout(() => initLoginHandlers(), 0);

    return `
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">
                        <div class="text-center mb-4">
                            <h2 class="mb-1">Welcome Back!</h2>
                            <p class="text-muted">Sign in to continue to Pong Arena</p>
                        </div>

                        <form id="loginForm">
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
                                <div class="d-flex justify-content-between align-items-center">
                                    <label class="form-label">Password</label>
                                    <a href="#/forgot-password" class="small text-decoration-none">Forgot password?</a>
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="bi bi-lock"></i>
                                    </span>
                                    <input type="password" 
                                           class="form-control" 
                                           id="password" 
                                           placeholder="Enter your password"
                                           required>
                                    <button class="btn btn-outline-secondary" 
                                            type="button" 
                                            id="togglePassword">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="rememberMe">
                                    <label class="form-check-label" for="rememberMe">Remember me</label>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 mb-3">
                                <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
                            </button>

                            <div class="text-center">
                                <p class="mb-0">Don't have an account? 
                                    <a href="#/register" class="text-decoration-none">Sign up</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}