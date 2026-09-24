// ==================== ADMIN DASHBOARD LOGIC ====================

const Admin = {
    // ==================== TOAST NOTIFICATION ====================
    toast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // ==================== MODAL ====================
    openModal(title, contentHTML, onSave) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-box">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" data-close>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${contentHTML}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-close>Batal</button>
                    <button class="btn btn-primary" data-save>
                        <i class="fas fa-save"></i> Simpan
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add('active'), 10);

        const close = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        };

        overlay.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', close);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        overlay.querySelector('[data-save]').addEventListener('click', () => {
            const formData = {};
            overlay.querySelectorAll('[name]').forEach(input => {
                formData[input.name] = input.value;
            });
            
            if (onSave(formData) !== false) {
                close();
            }
        });

        return overlay;
    },

    // ==================== CONFIRM DIALOG ====================
    confirm(message, onConfirm) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-box" style="max-width: 420px;">
                <div class="modal-body" style="text-align: center; padding: 40px 24px;">
                    <div style="width: 70px; height: 70px; background: #fee2e2; color: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 32px;">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 10px;">Konfirmasi Hapus</h3>
                    <p style="font-size: 14px; color: #64748b; margin-bottom: 24px;">${message}</p>
                    <div style="display: flex; gap: 12px; justify-content: center;">
                        <button class="btn btn-secondary" data-close>Batal</button>
                        <button class="btn btn-danger" data-confirm>
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add('active'), 10);

        const close = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        };

        overlay.querySelector('[data-close]').addEventListener('click', close);
        overlay.querySelector('[data-confirm]').addEventListener('click', () => {
            onConfirm();
            close();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
    },

    // ==================== SIDEBAR ====================
    renderSidebar() {
        const user = Auth.getUser();
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
        const ormas = Array.isArray(window.DATA?.ormas) ? window.DATA.ormas : [];

        const menuItems = [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard', href: 'dashboard.html' },
            { id: 'forum-organisasi', icon: 'fa-users', label: 'Forum & Organisasi', href: 'forum-organisasi.html' },
            { id: 'politik-ormas', icon: 'fa-landmark', label: 'Politik & Ormas', href: 'politik-ormas.html' },
            { id: 'data-ekonomi', icon: 'fa-chart-line', label: 'Data Ekonomi', href: 'data-ekonomi.html' },
            { section: 'Pengaturan' },
            { id: 'user', icon: 'fa-user-cog', label: 'Manajemen User', href: 'user.html' },
            { id: 'setting', icon: 'fa-cog', label: 'Pengaturan', href: 'setting.html' },
        ];

        let menuHTML = '';
        menuItems.forEach(item => {
            if (item.section) {
                menuHTML += `<div class="sidebar-section">${item.section}</div>`;
            } else {
                const isActive = currentPage === item.id;
                menuHTML += `
                    <a href="${item.href}" class="sidebar-link ${isActive ? 'active' : ''}">
                        <i class="fas ${item.icon}"></i>
                        <span>${item.label}</span>
                        ${item.badge ? `<span class="badge-count">${ormas.filter(o => o.status_terlapor === 'terlapor').length}</span>` : ''}
                    </a>
                `;
            }
        });

        return `
            <aside class="admin-sidebar" id="adminSidebar">
                <div class="sidebar-logo">
                    <div class="logo-icon">
                        <i class="fas fa-shield-halved"></i>
                    </div>
                    <div>
                        <div style="font-size: 15px;">KESBANGPOL</div>
                        <div style="font-size: 10px; opacity: 0.6; font-weight: 400;">Admin Panel</div>
                    </div>
                </div>
                <nav class="sidebar-nav" style="padding-top: 8px;">
                    ${menuHTML}
                </nav>
                <div style="padding: 16px 12px 24px;">
                    <a href="../index.html" class="sidebar-link">
                        <i class="fas fa-globe"></i>
                        <span>Lihat Website</span>
                    </a>
                    <a href="#" class="sidebar-link" id="logoutBtn" style="color: #fca5a5;">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
        `;
    },

    // ==================== HEADER ====================
    renderHeader(title, breadcrumb = '') {
        const user = Auth.getUser();
        return `
            <header class="admin-header">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <button class="mobile-toggle" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div>
                        <h1>${title}</h1>
                        ${breadcrumb ? `<div class="breadcrumb">
                            <i class="fas fa-home"></i>
                            <span>Admin</span>
                            <i class="fas fa-chevron-right"></i>
                            <span>${breadcrumb}</span>
                        </div>` : ''}
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="text-align: right; display: none;" class="user-info">
                        <div style="font-size: 13px; font-weight: 600; color: #0f172a;">${user?.name || 'Admin'}</div>
                        <div style="font-size: 11px; color: #64748b;">${user?.email || ''}</div>
                    </div>
                    <div style="width: 42px; height: 42px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">
                        ${user?.avatar || 'A'}
                    </div>
                </div>
            </header>
        `;
    },

    // ==================== RENDER PAGE ====================
    renderPage(title, breadcrumb, contentHTML) {
        if (!Auth.requireAuth()) return;

        const app = document.getElementById('adminApp');
        if (!app) return;

        app.innerHTML = `
            ${this.renderSidebar()}
            <main class="admin-main">
                ${this.renderHeader(title, breadcrumb)}
                <div class="admin-content">
                    ${contentHTML}
                </div>
            </main>
        `;

        this.attachEvents();
    },

    // ==================== ATTACH EVENTS ====================
    attachEvents() {
        // Sidebar toggle
        const toggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('adminSidebar');
        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.confirm('Apakah Anda yakin ingin logout?', () => {
                    Auth.logout();
                });
            });
        }
    },

    // ==================== STORAGE HELPERS ====================
    async getData(key) {
        try {
            const res = await fetch(`../api/crud.php?table=${key}`);
            if (res.ok) {
                const data = await res.json();
                if (!data.error) return data;
            }
        } catch (e) {
            console.error('Failed to fetch data from API:', e);
        }
        // Fallback to DATA from data.js
        return DATA[key] || [];
    },

    async setData(key, value) {
        // This is no longer used for bulk updates, use apiCall instead for CRUD operations
    },

    async apiCall(endpoint, method, payload = null) {
        try {
            const options = {
                method: method,
                headers: { 'Content-Type': 'application/json' }
            };
            if (payload) options.body = JSON.stringify(payload);
            
            const res = await fetch(`../api/crud.php${endpoint}`, options);
            const data = await res.json();
            return data;
        } catch (e) {
            console.error('API Call Error:', e);
            return { error: e.message };
        }
    },

    // ==================== FORMAT ====================
    formatDate(dateStr) {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    },

    formatNumber(num) {
        return new Intl.NumberFormat('id-ID').format(num || 0);
    },

    formatCurrency(num) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num || 0);
    }
};

window.Admin = Admin;