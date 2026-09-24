// ==================== AUTHENTICATION SYSTEM ====================

const Auth = {
    // Default admin users
    defaultUsers: [
        {
            id: 1,
            name: 'Administrator',
            email: 'admin@kesbangpol.jakbar.go.id',
            password: 'admin123',
            role: 'admin',
            avatar: 'A'
        },
        {
            id: 2,
            name: 'Operator Kesbangpol',
            email: 'operator@kesbangpol.jakbar.go.id',
            password: 'operator123',
            role: 'operator',
            avatar: 'O'
        }
    ],

    // Initialize users in localStorage
    init() {
        const storedUsers = localStorage.getItem('admin_users');
        try {
            if (storedUsers) JSON.parse(storedUsers);
        } catch (error) {
            localStorage.removeItem('admin_users');
        }

        if (!localStorage.getItem('admin_users')) {
            localStorage.setItem('admin_users', JSON.stringify(this.defaultUsers));
        }
    },

    readUsers() {
        this.init();
        try {
            const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
            return Array.isArray(users) ? users : this.defaultUsers;
        } catch (error) {
            localStorage.setItem('admin_users', JSON.stringify(this.defaultUsers));
            return this.defaultUsers;
        }
    },

    // Login
    login(email, password, remember = false) {
        const users = this.readUsers();
        const normalizedEmail = email.trim().toLowerCase();
        const user = users.find(u => typeof u.email === 'string' && u.email.toLowerCase() === normalizedEmail && u.password === password);

        if (user) {
            const session = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                loginTime: new Date().toISOString()
            };

            if (remember) {
                localStorage.setItem('admin_session', JSON.stringify(session));
                sessionStorage.removeItem('admin_session');
            } else {
                sessionStorage.setItem('admin_session', JSON.stringify(session));
                localStorage.removeItem('admin_session');
            }

            return { success: true, user: session };
        }

        return { success: false, message: 'Email atau password salah!' };
    },

    // Logout
    logout() {
        localStorage.removeItem('admin_session');
        sessionStorage.removeItem('admin_session');
        window.location.href = 'login.html';
    },

    // Get current user
    getUser() {
        const session = localStorage.getItem('admin_session') || sessionStorage.getItem('admin_session');
        if (!session) return null;

        try {
            return JSON.parse(session);
        } catch (error) {
            localStorage.removeItem('admin_session');
            sessionStorage.removeItem('admin_session');
            return null;
        }
    },

    // Check if logged in
    isLoggedIn() {
        return this.getUser() !== null;
    },

    // Check auth - redirect if not logged in
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Get all users
    getUsers() {
        return this.readUsers();
    },

    // Add user
    addUser(user) {
        const users = this.getUsers();
        user.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
        user.avatar = user.name.charAt(0).toUpperCase();
        users.push(user);
        localStorage.setItem('admin_users', JSON.stringify(users));
        return user;
    },

    // Update user
    updateUser(id, data) {
        const users = this.getUsers();
        const normalizedId = Number(id);
        const index = users.findIndex(u => Number(u.id) === normalizedId);
        if (index === -1) return null;

        const updatedUser = { ...users[index], ...data };
        if (data.name) updatedUser.avatar = data.name.charAt(0).toUpperCase();
        users[index] = updatedUser;
        localStorage.setItem('admin_users', JSON.stringify(users));

        const session = this.getUser();
        if (session && Number(session.id) === normalizedId) {
            const updatedSession = {
                ...session,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                avatar: updatedUser.avatar
            };
            const sessionStorageTarget = localStorage.getItem('admin_session')
                ? localStorage
                : sessionStorage;
            sessionStorageTarget.setItem('admin_session', JSON.stringify(updatedSession));
        }

        return updatedUser;
    },

    // Delete user
    deleteUser(id) {
        const users = this.getUsers();
        const filtered = users.filter(u => u.id !== id);
        localStorage.setItem('admin_users', JSON.stringify(filtered));
    }
};

// Auto init
Auth.init();