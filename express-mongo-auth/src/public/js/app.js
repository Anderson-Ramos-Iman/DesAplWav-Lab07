// Inicializar componentes Materialize
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    updateNav();

    // Toggle password visibility (ojito)
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', () => {
            const input = document.getElementById(icon.getAttribute('data-target'));
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = 'visibility';
            } else {
                input.type = 'password';
                icon.textContent = 'visibility_off';
            }
        });
    });
});

// Decodificar payload del JWT (base64url -> base64)
function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
}

// Verificar si el token ha expirado
function checkTokenExpiry(token) {
    if (!token) throw new Error('No token');
    const payload = decodeToken(token);
    if (payload.exp * 1000 < Date.now()) {
        throw new Error('Token expirado');
    }
    return payload;
}

// Cerrar sesión
function logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/signIn';
}

// Actualizar navegación según estado de autenticación
function updateNav() {
    const token = sessionStorage.getItem('token');
    let isAuth = false;
    let roles = [];

    if (token) {
        try {
            const payload = checkTokenExpiry(token);
            isAuth = true;
            roles = payload.roles || [];
        } catch(e) {
            sessionStorage.removeItem('token');
        }
    }

    // Elementos de navegación desktop
    const navSignin = document.getElementById('nav-signin');
    const navSignup = document.getElementById('nav-signup');
    const navProfile = document.getElementById('nav-profile');
    const navDashboard = document.getElementById('nav-dashboard');
    const navLogout = document.getElementById('nav-logout');
    const navDashboardLink = document.getElementById('nav-dashboard-link');

    // Elementos de navegación mobile
    const mobSignin = document.getElementById('mob-signin');
    const mobSignup = document.getElementById('mob-signup');
    const mobProfile = document.getElementById('mob-profile');
    const mobDashboard = document.getElementById('mob-dashboard');
    const mobLogout = document.getElementById('mob-logout');
    const mobDashboardLink = document.getElementById('mob-dashboard-link');

    if (isAuth) {
        if (navSignin) navSignin.style.display = 'none';
        if (navSignup) navSignup.style.display = 'none';
        if (navProfile) navProfile.style.display = '';
        if (navDashboard) navDashboard.style.display = '';
        if (navLogout) navLogout.style.display = '';

        if (mobSignin) mobSignin.style.display = 'none';
        if (mobSignup) mobSignup.style.display = 'none';
        if (mobProfile) mobProfile.style.display = '';
        if (mobDashboard) mobDashboard.style.display = '';
        if (mobLogout) mobLogout.style.display = '';

        const dashUrl = roles.includes('admin') ? '/dashboard/admin' : '/dashboard/user';
        if (navDashboardLink) navDashboardLink.href = dashUrl;
        if (mobDashboardLink) mobDashboardLink.href = dashUrl;
    } else {
        if (navSignin) navSignin.style.display = '';
        if (navSignup) navSignup.style.display = '';
        if (navProfile) navProfile.style.display = 'none';
        if (navDashboard) navDashboard.style.display = 'none';
        if (navLogout) navLogout.style.display = 'none';

        if (mobSignin) mobSignin.style.display = '';
        if (mobSignup) mobSignup.style.display = '';
        if (mobProfile) mobProfile.style.display = 'none';
        if (mobDashboard) mobDashboard.style.display = 'none';
        if (mobLogout) mobLogout.style.display = 'none';
    }
}
