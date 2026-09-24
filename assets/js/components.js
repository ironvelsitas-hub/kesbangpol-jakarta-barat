// ==================== RENDER COMPONENTS ====================

// Render Statistik Home
function renderStatistik() {
    const grid = document.getElementById('statistikGrid');
    if (!grid) return;

    const items = [
        { label: 'FPK', value: DATA.statistik.fpk, icon: 'fa-handshake', color: 'blue' },
        { label: 'FKUB', value: DATA.statistik.fkub, icon: 'fa-place-of-worship', color: 'green' },
        { label: 'FKDM', value: DATA.statistik.fkdm, icon: 'fa-people-group', color: 'purple' },
        { label: 'Paskibraka', value: DATA.statistik.paskibraka, icon: 'fa-flag', color: 'red' },
        { label: 'DPPI', value: DATA.statistik.dppi, icon: 'fa-building', color: 'indigo' },
        { label: 'Anggota DPRD', value: DATA.statistik.dprd, icon: 'fa-user-tie', color: 'cyan' },
        { label: 'Partai Politik', value: DATA.statistik.partai, icon: 'fa-flag-usa', color: 'amber' },
        { label: 'Ormas', value: DATA.statistik.ormas, icon: 'fa-users', color: 'teal' }
    ];

    grid.innerHTML = items.map((item, i) => `
        <div class="stat-card" data-aos="fade-up" data-aos-delay="${i * 50}">
            <div class="stat-icon bg-${item.color}-100">
                <i class="fas ${item.icon} text-${item.color}-600"></i>
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">${item.value}</div>
            <div class="text-sm text-gray-600">${item.label}</div>
        </div>
    `).join('');

    const petaGrid = document.getElementById('petaStats');
    if (petaGrid) {
        const petaItems = [
            { label: 'Titik Kriminal Terpantau', value: DATA.petaStats.kriminal, icon: 'fa-skull-crossbones', gradient: 'from-red-500 to-red-700', text: 'text-red-100' },
            { label: 'Titik Konflik Terpantau', value: DATA.petaStats.konflik, icon: 'fa-fire', gradient: 'from-orange-500 to-orange-700', text: 'text-orange-100' },
            { label: 'Rumah Ibadah Terdata', value: DATA.petaStats.rumah_ibadah, icon: 'fa-place-of-worship', gradient: 'from-green-500 to-green-700', text: 'text-green-100' }
        ];

        petaGrid.innerHTML = petaItems.map((item, i) => `
            <div class="bg-gradient-to-br ${item.gradient} rounded-2xl p-8 text-white shadow-xl card-hover" data-aos="fade-up" data-aos-delay="${i * 100}">
                <i class="fas ${item.icon} text-4xl mb-4 opacity-80"></i>
                <div class="text-4xl font-bold mb-2">${item.value}</div>
                <div class="${item.text}">${item.label}</div>
            </div>
        `).join('');
    }
}

// Render Berita
function renderBerita() {
    const grid = document.getElementById('beritaGrid');
    if (!grid) return;

    grid.innerHTML = DATA.berita.map((item, i) => `
        <article class="blog-card" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="relative h-56 overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                <div class="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    Berita
                </div>
            </div>
            <div class="p-6">
                <div class="text-sm text-gray-500 mb-2">
                    <i class="far fa-calendar mr-1"></i> ${item.date}
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition">
                    <a href="#">${item.title}</a>
                </h3>
                <p class="text-gray-600 text-sm line-clamp-3 mb-4">${item.excerpt}</p>
                <a href="#" class="inline-flex items-center text-primary-600 font-semibold text-sm hover:text-primary-700">
                    Baca Selengkapnya <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// Render Tabel Generic
function renderTable(containerId, columns, data, rowRenderer) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="${columns.length}" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-3 text-gray-300"></i>
                    <p>Belum ada data</p>
                </td>
            </tr>
        `;
        return;
    }

    container.innerHTML = data.map((item, index) => rowRenderer(item, index)).join('');
}

// Render Pagination
function renderPagination(containerId, currentPage, totalPages) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    if (currentPage > 1) {
        html += `<a href="#" data-page="${currentPage - 1}"><i class="fas fa-chevron-left"></i></a>`;
    }
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<span class="active">${i}</span>`;
        } else {
            html += `<a href="#" data-page="${i}">${i}</a>`;
        }
    }
    if (currentPage < totalPages) {
        html += `<a href="#" data-page="${currentPage + 1}"><i class="fas fa-chevron-right"></i></a>`;
    }
    container.innerHTML = html;
}

// Format Number
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Format Currency
function formatCurrency(num) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);
}

// Format Date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}