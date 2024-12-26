export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

export function getPublicRoutes() {
    return ['/login', '/register', '/forgot-password'];
}

export function requireAuth(path) {
    const isPublic = getPublicRoutes().includes(path);
    const authenticated = isAuthenticated();

    if (!isPublic && !authenticated) {
        // Store the attempted URL for redirection after login
        localStorage.setItem('redirectUrl', path);
        return false;
    }

    if (isPublic && authenticated) {
        // Redirect to home if trying to access auth pages while logged in
        return 'redirect:/';
    }

    return true;
}