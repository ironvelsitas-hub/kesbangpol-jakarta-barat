// ==================== MAIN SCRIPT ====================

function getManagedData(key) {
    try {
        const stored = localStorage.getItem(`kesbangpol_${key}`);
        if (stored) {
            const data = JSON.parse(stored);
            if (Array.isArray(data)) return data;
        }
    } catch (error) {
        localStorage.removeItem(`kesbangpol_${key}`);
    }

    return Array.isArray(DATA[key]) ? DATA[key] : [];
}

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 800, once: true, offset: 100 });

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            icon.className = mobileMenu.classList.contains('hidden') ? 'fas fa-bars' : 'fas fa-times';
        });
    }

    renderStatistik();
    renderBerita();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ==================== PAGE INITIALIZERS ====================

function initFpkPage() {
    renderTable('fpkTbody', ['No', 'Nama', 'Jabatan', 'Kecamatan', 'Kontak', 'Status'], getManagedData('fpk'), (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-primary-600 font-semibold">${item.nama.charAt(0)}</span>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-900">${item.nama}</p>
                        <p class="text-xs text-gray-500">${item.email}</p>
                    </div>
                </div>
            </td>
            <td>${item.jabatan}</td>
            <td>${item.kecamatan}</td>
            <td>${item.no_hp}</td>
            <td><span class="badge badge-success">Aktif</span></td>
        </tr>
    `);
}

function initFkubPage() {
    renderTable('fkubTbody', ['No', 'Nama', 'Agama', 'Jabatan', 'Kecamatan', 'Kontak'], getManagedData('fkub'), (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-green-600 font-semibold">${item.nama.charAt(0)}</span>
                    </div>
                    <p class="font-semibold text-gray-900">${item.nama}</p>
                </div>
            </td>
            <td><span class="badge badge-info">${item.agama}</span></td>
            <td>${item.jabatan}</td>
            <td>${item.kecamatan}</td>
            <td>${item.no_hp}</td>
        </tr>
    `);
}

function initFkdmPage() {
    renderTable('fkdmTbody', ['No', 'Nama', 'Jabatan', 'Kecamatan', 'Kelurahan', 'Kontak'], getManagedData('fkdm'), (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-purple-600 font-semibold">${item.nama.charAt(0)}</span>
                    </div>
                    <p class="font-semibold text-gray-900">${item.nama}</p>
                </div>
            </td>
            <td>${item.jabatan}</td>
            <td>${item.kecamatan}</td>
            <td>${item.kelurahan}</td>
            <td>${item.no_hp}</td>
        </tr>
    `);
}

function initPaskibrakaPage() {
    renderTable('paskibrakaTbody', ['No', 'Nama', 'Sekolah', 'Kecamatan', 'JK', 'TB', 'Tahun', 'Status'], getManagedData('paskibraka'), (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-red-600 font-semibold">${item.nama.charAt(0)}</span>
                    </div>
                    <p class="font-semibold text-gray-900">${item.nama}</p>
                </div>
            </td>
            <td>${item.sekolah}</td>
            <td>${item.kecamatan}</td>
            <td>${item.jenis_kelamin === 'Laki-laki' ? 'L' : 'P'}</td>
            <td>${item.tinggi_badan}</td>
            <td>${item.tahun}</td>
            <td>${item.status === 'aktif' ? '<span class="badge badge-success">Aktif</span>' : '<span class="badge badge-warning">Alumni</span>'}</td>
        </tr>
    `);
}

function initDppiPage() {
    renderTable('dppiTbody', ['No', 'Organisasi', 'Ketua', 'Bidang', 'Kecamatan', 'Kontak'], getManagedData('dppi'), (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <p class="font-semibold text-gray-900">${item.nama_organisasi}</p>
                <p class="text-xs text-gray-500">Sekretaris: ${item.sekretaris}</p>
            </td>
            <td>${item.ketua}</td>
            <td><span class="badge badge-info">${item.bidang}</span></td>
            <td>${item.kecamatan}</td>
            <td>${item.no_hp}</td>
        </tr>
    `);
}

function initDprdPage() {
    const dapil9 = document.getElementById('dapil9Grid');
    const dapil10 = document.getElementById('dapil10Grid');

    if (dapil9) {
        const data9 = DATA.dprd.filter(d => d.dapil === '9');
        dapil9.innerHTML = data9.map((item, i) => `
            <div class="bg-white rounded-2xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="${i * 100}">
                <div class="flex items-center mb-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mr-4">
                        <span class="text-white font-bold text-2xl">${item.nama.charAt(0)}</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900">${item.nama}</h3>
                        <p class="text-sm text-gray-500">${item.partai}</p>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <p><i class="fas fa-map-marker-alt text-primary-500 mr-2"></i>${item.daerah_pemilihan}</p>
                    <p><i class="fas fa-phone text-primary-500 mr-2"></i>${item.no_hp}</p>
                    <p><i class="fas fa-envelope text-primary-500 mr-2"></i>${item.email}</p>
                </div>
            </div>
        `).join('');
    }

    if (dapil10) {
        const data10 = DATA.dprd.filter(d => d.dapil === '10');
        dapil10.innerHTML = data10.map((item, i) => `
            <div class="bg-white rounded-2xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="${i * 100}">
                <div class="flex items-center mb-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mr-4">
                        <span class="text-white font-bold text-2xl">${item.nama.charAt(0)}</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900">${item.nama}</h3>
                        <p class="text-sm text-gray-500">${item.partai}</p>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <p><i class="fas fa-map-marker-alt text-primary-500 mr-2"></i>${item.daerah_pemilihan}</p>
                    <p><i class="fas fa-phone text-primary-500 mr-2"></i>${item.no_hp}</p>
                    <p><i class="fas fa-envelope text-primary-500 mr-2"></i>${item.email}</p>
                </div>
            </div>
        `).join('');
    }
}

function initPartaiPage() {
    const grid = document.getElementById('partaiGrid');
    if (!grid) return;
    grid.innerHTML = DATA.partai.map((item, i) => `
        <div class="bg-white rounded-2xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="${i * 50}">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-4">
                <i class="fas fa-flag text-white text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">${item.nama_partai}</h3>
            <div class="space-y-2 text-sm text-gray-600">
                <p><i class="fas fa-user text-primary-500 mr-2"></i>Ketua: ${item.ketua}</p>
                <p><i class="fas fa-user-tie text-primary-500 mr-2"></i>Sekretaris: ${item.sekretaris}</p>
                <p><i class="fas fa-map-marker-alt text-primary-500 mr-2"></i>${item.alamat}</p>
                <p><i class="fas fa-phone text-primary-500 mr-2"></i>${item.no_hp}</p>
                <p><i class="fas fa-users text-primary-500 mr-2"></i>${formatNumber(item.jumlah_anggota)} Anggota</p>
            </div>
        </div>
    `).join('');
}

function initOrmasPage() {
    renderTable('ormasTbody', ['No', 'Nama Ormas', 'Ketua', 'Bidang', 'Kecamatan', 'Status'], getManagedData('ormas'), (item, index) => {
        let badge = '';
        if (item.status_terlapor === 'terlapor') badge = '<span class="badge badge-danger">Terlapor</span>';
        else if (item.status_terlapor === 'proses_verifikasi') badge = '<span class="badge badge-warning">Verifikasi</span>';
        else badge = '<span class="badge badge-success">Tidak Terlapor</span>';
        
        return `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <p class="font-semibold text-gray-900">${item.nama_ormas}</p>
                    <p class="text-xs text-gray-500">${item.alamat}</p>
                </td>
                <td>${item.ketua}</td>
                <td><span class="badge badge-info">${item.bidang}</span></td>
                <td>${item.kecamatan}</td>
                <td>${badge}</td>
            </tr>
        `;
    });
}

function initTimTerpaduPage() {
    renderTable('timTerpaduTbody', ['No', 'Kegiatan', 'Tanggal', 'Lokasi', 'Koordinator', 'Hasil'], DATA.timTerpadu, (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <p class="font-semibold text-gray-900">${item.nama_kegiatan}</p>
                <p class="text-xs text-gray-500">${item.anggota}</p>
            </td>
            <td>${formatDate(item.tanggal)}</td>
            <td>${item.lokasi}</td>
            <td>${item.koordinator}</td>
            <td><span class="badge badge-success">${item.hasil}</span></td>
        </tr>
    `);
}

function initEkonomiPage() {
    const tbody = document.getElementById('ekonomiTbody');
    if (tbody) {
        renderTable('ekonomiTbody', ['No', 'Kecamatan', 'Kelurahan', 'UMKM', 'Pasar', 'Pedagang', 'Nilai Transaksi', 'Tahun'], DATA.dataEkonomi, (item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td class="font-semibold text-gray-900">${item.kecamatan}</td>
                <td>${item.kelurahan}</td>
                <td>${formatNumber(item.jumlah_umkm)}</td>
                <td>${item.jumlah_pasar}</td>
                <td>${formatNumber(item.jumlah_pedagang)}</td>
                <td class="font-semibold text-green-600">${formatCurrency(item.nilai_transaksi)}</td>
                <td>${item.tahun}</td>
            </tr>
        `);
    }

    const statsContainer = document.getElementById('ekonomiStats');
    if (statsContainer) {
        const totalUmkm = DATA.dataEkonomi.reduce((s, d) => s + d.jumlah_umkm, 0);
        const totalPasar = DATA.dataEkonomi.reduce((s, d) => s + d.jumlah_pasar, 0);
        const totalPedagang = DATA.dataEkonomi.reduce((s, d) => s + d.jumlah_pedagang, 0);
        const totalTransaksi = DATA.dataEkonomi.reduce((s, d) => s + d.nilai_transaksi, 0);

        statsContainer.innerHTML = `
            <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm mb-1">Total UMKM</p>
                        <p class="text-3xl font-bold text-blue-600">${formatNumber(totalUmkm)}</p>
                    </div>
                    <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-store text-blue-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm mb-1">Total Pasar</p>
                        <p class="text-3xl font-bold text-purple-600">${totalPasar}</p>
                    </div>
                    <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-building text-purple-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm mb-1">Total Pedagang</p>
                        <p class="text-3xl font-bold text-orange-600">${formatNumber(totalPedagang)}</p>
                    </div>
                    <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-users text-orange-600 text-2xl"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm mb-1">Nilai Transaksi</p>
                        <p class="text-xl font-bold text-green-600">${formatCurrency(totalTransaksi)}</p>
                    </div>
                    <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                        <i class="fas fa-money-bill-wave text-green-600 text-2xl"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

// ==================== PETA MONITORING ====================

let globalMap = null;
let markerLayer = null;
let allMarkers = [];
let currentFilter = { kecamatan: 'all', jenis: 'all', search: '' };

/**
 * Initialize Map Page dengan fitur lengkap
 * @param {string} type - 'kriminal' | 'konflik' | 'rumah-ibadah'
 */
function initMapPage(type) {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    if (typeof L === 'undefined') {
        console.error('Leaflet belum dimuat. Pastikan leaflet.js sudah dipanggil sebelum main.js.');
        return null;
    }

    // Destroy existing map if any
    if (globalMap) {
        globalMap.remove();
        globalMap = null;
    }

    // Initialize map centered on Jakarta Barat
    globalMap = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([-6.1683, 106.7583], 12);

    // Add tile layer with safe fallback
    const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    });

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    cartoLayer.on('tileerror', function() {
        if (this._fallbackUsed) return;
        this._fallbackUsed = true;
        console.warn('CartoDB tiles unavailable; falling back to OpenStreetMap.');
        if (globalMap.hasLayer(cartoLayer)) {
            globalMap.removeLayer(cartoLayer);
        }
        osmLayer.addTo(globalMap);
    });

    cartoLayer.addTo(globalMap);

    // Get data based on type
    let data = [];
    let iconColor = '#ef4444';
    let iconClass = 'fa-exclamation';
    let typeLabel = 'Kriminal';

    if (type === 'kriminal') {
        data = DATA.petaKriminal || [];
        iconColor = '#ef4444';
        iconClass = 'fa-skull-crossbones';
        typeLabel = 'Kriminal';
    } else if (type === 'konflik') {
        data = DATA.petaKonflik || [];
        iconColor = '#f97316';
        iconClass = 'fa-fire';
        typeLabel = 'Konflik';
    } else if (type === 'rumah-ibadah') {
        data = DATA.rumahIbadah || [];
        iconColor = '#10b981';
        iconClass = 'fa-place-of-worship';
        typeLabel = 'Rumah Ibadah';
    }

    // Layer group for markers
    markerLayer = L.layerGroup().addTo(globalMap);
    allMarkers = [];

    // Render each marker
    data.forEach(item => {
        if (!item.lat || !item.lng) return;

        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="map-pin" style="background: ${iconColor}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 12px ${iconColor}66; border: 3px solid white; cursor: pointer; transition: transform 0.2s;"><i class="fas ${iconClass}" style="font-size: 14px;"></i></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        const marker = L.marker([item.lat, item.lng], { icon });

        // Build popup content based on type
        let popupContent = '';
        if (type === 'kriminal') {
            popupContent = `
                <div class="p-3 min-w-[280px]">
                    <div class="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                        <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-skull-crossbones text-red-600"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 text-sm">${item.jenis}</h3>
                            <p class="text-xs text-gray-500">${item.tanggal || '-'}</p>
                        </div>
                    </div>
                    <div class="space-y-1.5 text-xs">
                        <p class="text-gray-700"><i class="fas fa-map-marker-alt text-red-500 mr-1.5 w-4"></i> ${item.lokasi}</p>
                        <p class="text-gray-700"><i class="fas fa-building text-gray-400 mr-1.5 w-4"></i> ${item.kecamatan}</p>
                        <p class="text-gray-700"><i class="fas fa-info-circle text-gray-400 mr-1.5 w-4"></i> Status: <span class="font-semibold capitalize">${item.status}</span></p>
                    </div>
                </div>
            `;
        } else if (type === 'konflik') {
            const tingkatColor = item.tingkat === 'tinggi' ? 'red' : item.tingkat === 'sedang' ? 'yellow' : 'green';
            popupContent = `
                <div class="p-3 min-w-[300px]">
                    <div class="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                        <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-fire text-orange-600"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 text-sm">${item.jenis}</h3>
                            <p class="text-xs text-gray-500">${item.tanggal || '-'}</p>
                        </div>
                    </div>
                    <div class="space-y-1.5 text-xs">
                        <p class="text-gray-700"><i class="fas fa-map-marker-alt text-orange-500 mr-1.5 w-4"></i> ${item.lokasi}</p>
                        <p class="text-gray-700"><i class="fas fa-building text-gray-400 mr-1.5 w-4"></i> ${item.kecamatan}${item.kelurahan ? ' - ' + item.kelurahan : ''}</p>
                        <p class="text-gray-700"><i class="fas fa-users text-gray-400 mr-1.5 w-4"></i> ${item.pelaku || '-'}</p>
                        <p class="text-gray-700"><i class="fas fa-clock text-gray-400 mr-1.5 w-4"></i> ${item.waktu || '-'}</p>
                        <p class="text-gray-700"><i class="fas fa-exclamation-triangle text-${tingkatColor}-500 mr-1.5 w-4"></i> Tingkat: <span class="font-semibold capitalize text-${tingkatColor}-600">${item.tingkat}</span></p>
                    </div>
                </div>
            `;
        } else if (type === 'rumah-ibadah') {
            const jenisIcon = item.jenis === 'masjid' ? 'fa-mosque' : 
                             item.jenis === 'gereja' ? 'fa-church' : 
                             item.jenis === 'vihara' ? 'fa-dharmachakra' : 'fa-place-of-worship';
            popupContent = `
                <div class="p-3 min-w-[300px]">
                    <div class="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <i class="fas ${jenisIcon} text-green-600"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 text-sm">${item.nama}</h3>
                            <p class="text-xs text-gray-500 capitalize">${item.jenis}</p>
                        </div>
                    </div>
                    <div class="space-y-1.5 text-xs">
                        <p class="text-gray-700"><i class="fas fa-map-marker-alt text-green-500 mr-1.5 w-4"></i> ${item.alamat}</p>
                        <p class="text-gray-700"><i class="fas fa-building text-gray-400 mr-1.5 w-4"></i> ${item.kecamatan} - ${item.kelurahan}</p>
                        <p class="text-gray-700"><i class="fas fa-user text-gray-400 mr-1.5 w-4"></i> Pengurus: ${item.pengurus || '-'}</p>
                        ${item.tahun_bangun ? `<p class="text-gray-700"><i class="fas fa-calendar text-gray-400 mr-1.5 w-4"></i> Tahun: ${item.tahun_bangun}</p>` : ''}
                        ${item.luas_tanah ? `<p class="text-gray-700"><i class="fas fa-ruler-combined text-gray-400 mr-1.5 w-4"></i> Luas: ${item.luas_tanah} m²</p>` : ''}
                        ${item.kapasitas ? `<p class="text-gray-700"><i class="fas fa-users text-gray-400 mr-1.5 w-4"></i> Kapasitas: ${item.kapasitas} orang</p>` : ''}
                    </div>
                </div>
            `;
        }

        marker.bindPopup(popupContent, { maxWidth: 350 });

        // Store metadata for filtering
        marker._meta = {
            kecamatan: item.kecamatan || '',
            kelurahan: item.kelurahan || '',
            jenis: item.jenis || '',
            nama: item.nama || item.lokasi || '',
            status: item.status || item.tingkat || '',
            lokasi: item.lokasi || item.alamat || ''
        };

        allMarkers.push(marker);
        markerLayer.addLayer(marker);
    });

    // Render filter controls
    renderMapFilters(type, data);

    // Render statistics
    renderMapStats(type, data);

    // Fit bounds to show all markers
    if (allMarkers.length > 0) {
        const group = L.featureGroup(allMarkers);
        globalMap.fitBounds(group.getBounds().pad(0.1));
    }

    // Add legend
    addMapLegend(type, iconColor, iconClass, typeLabel);

    // Add scale control
    L.control.scale({ metric: true, imperial: false }).addTo(globalMap);

    return globalMap;
}

/**
 * Render filter controls for map
 */
function renderMapFilters(type, data) {
    const filterContainer = document.getElementById('mapFilters');
    if (!filterContainer) return;

    // Get unique kecamatan from data
    const kecamatanList = [...new Set(data.map(d => d.kecamatan).filter(Boolean))].sort();

    filterContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- Search -->
            <div class="relative">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="text" id="mapSearch" 
                       placeholder="Cari lokasi..." 
                       class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm">
            </div>
            
            <!-- Filter Wilayah -->
            <div class="relative">
                <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <select id="filterKecamatan" 
                        class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm appearance-none bg-white cursor-pointer">
                    <option value="all">Semua Wilayah</option>
                    ${kecamatanList.map(k => `<option value="${k}">${k}</option>`).join('')}
                </select>
                <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
            </div>
            
            <!-- Reset Button -->
            <button id="resetFilter" 
                    class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2">
                <i class="fas fa-redo"></i> Reset Filter
            </button>
        </div>
        
        <!-- Active Filter Info -->
        <div id="filterInfo" class="mt-3 text-sm text-gray-600 hidden">
            <i class="fas fa-info-circle text-primary-500 mr-1"></i>
            Menampilkan <span id="filterCount" class="font-semibold text-primary-600">0</span> dari <span id="filterTotal">0</span> lokasi
        </div>
    `;

    // Attach event listeners
    const searchInput = document.getElementById('mapSearch');
    const kecamatanSelect = document.getElementById('filterKecamatan');
    const resetBtn = document.getElementById('resetFilter');

    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilter.search = this.value.toLowerCase();
                applyMapFilters();
            }, 300);
        });
    }

    if (kecamatanSelect) {
        kecamatanSelect.addEventListener('change', function() {
            currentFilter.kecamatan = this.value;
            applyMapFilters();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            currentFilter = { kecamatan: 'all', jenis: 'all', search: '' };
            if (searchInput) searchInput.value = '';
            if (kecamatanSelect) kecamatanSelect.value = 'all';
            applyMapFilters();
        });
    }
}

/**
 * Apply filters to map markers
 */
function applyMapFilters() {
    if (!globalMap || !markerLayer) return;

    let visibleCount = 0;
    const visibleMarkers = [];

    allMarkers.forEach(marker => {
        const meta = marker._meta || {};
        let visible = true;

        // Filter by kecamatan
        if (currentFilter.kecamatan !== 'all' && meta.kecamatan !== currentFilter.kecamatan) {
            visible = false;
        }

        // Filter by search
        if (currentFilter.search) {
            const searchText = currentFilter.search;
            const matchText = `${meta.nama} ${meta.lokasi} ${meta.kecamatan} ${meta.kelurahan}`.toLowerCase();
            if (!matchText.includes(searchText)) {
                visible = false;
            }
        }

        if (visible) {
            if (!markerLayer.hasLayer(marker)) {
                markerLayer.addLayer(marker);
            }
            visibleCount++;
            visibleMarkers.push(marker);
        } else {
            if (markerLayer.hasLayer(marker)) {
                markerLayer.removeLayer(marker);
            }
        }
    });

    // Update filter info
    const filterInfo = document.getElementById('filterInfo');
    const filterCount = document.getElementById('filterCount');
    const filterTotal = document.getElementById('filterTotal');

    if (filterInfo && filterCount && filterTotal) {
        if (currentFilter.kecamatan !== 'all' || currentFilter.search) {
            filterInfo.classList.remove('hidden');
            filterCount.textContent = visibleCount;
            filterTotal.textContent = allMarkers.length;
        } else {
            filterInfo.classList.add('hidden');
        }
    }

    // Fit bounds to visible markers
    if (visibleMarkers.length > 0) {
        const group = L.featureGroup(visibleMarkers);
        globalMap.fitBounds(group.getBounds().pad(0.1));
    }
}

/**
 * Render statistics cards for map page
 */
function renderMapStats(type, data) {
    const statsContainer = document.getElementById('mapStats');
    if (!statsContainer) return;

    let statsHTML = '';

    if (type === 'kriminal') {
        const total = data.length;
        const ditangani = data.filter(d => d.status === 'ditangani').length;
        const proses = data.filter(d => d.status === 'proses').length;
        const selesai = data.filter(d => d.status === 'selesai').length;

        statsHTML = `
            ${createStatCard('Total Kejadian', total, 'fa-exclamation-triangle', 'red')}
            ${createStatCard('Ditangani', ditangani, 'fa-check-circle', 'green')}
            ${createStatCard('Proses', proses, 'fa-clock', 'yellow')}
            ${createStatCard('Selesai', selesai, 'fa-flag-checkered', 'blue')}
        `;
    } else if (type === 'konflik') {
        const total = data.length;
        const tawuran = data.filter(d => d.jenis && d.jenis.toLowerCase().includes('tawuran')).length;
        const konflikSosial = data.filter(d => d.jenis && d.jenis.toLowerCase().includes('konflik')).length;
        const kecamatanCount = [...new Set(data.map(d => d.kecamatan).filter(Boolean))].length;

        statsHTML = `
            ${createStatCard('Total Lokasi', total, 'fa-map-marker-alt', 'orange')}
            ${createStatCard('Tawuran', tawuran, 'fa-users', 'red')}
            ${createStatCard('Konflik Sosial', konflikSosial, 'fa-exclamation-triangle', 'yellow')}
            ${createStatCard('Kecamatan', kecamatanCount, 'fa-building', 'purple')}
        `;
    } else if (type === 'rumah-ibadah') {
        const total = data.length;
        const masjid = data.filter(d => d.jenis === 'masjid').length;
        const gereja = data.filter(d => d.jenis === 'gereja').length;
        const lainnya = data.filter(d => ['vihara', 'klenteng', 'pura'].includes(d.jenis)).length;

        statsHTML = `
            ${createStatCard('Total Rumah Ibadah', total, 'fa-place-of-worship', 'green')}
            ${createStatCard('Masjid', masjid, 'fa-mosque', 'green')}
            ${createStatCard('Gereja', gereja, 'fa-church', 'blue')}
            ${createStatCard('Vihara/Klenteng', lainnya, 'fa-dharmachakra', 'orange')}
        `;
    }

    statsContainer.innerHTML = statsHTML;
}

/**
 * Helper: Create stat card HTML
 */
function createStatCard(label, value, icon, color) {
    return `
        <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between mb-2">
                <span class="text-gray-500 text-sm">${label}</span>
                <i class="fas ${icon} text-${color}-500"></i>
            </div>
            <p class="text-3xl font-bold text-${color}-600">${value}</p>
        </div>
    `;
}

/**
 * Add legend to map
 */
function addMapLegend(type, iconColor, iconClass, typeLabel) {
    if (!globalMap) return;

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-legend');
        div.style.cssText = `
            background: white;
            padding: 12px 16px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            line-height: 1.6;
            border: 1px solid #e5e7eb;
        `;
        div.innerHTML = `
            <div style="font-weight: 700; color: #111827; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                Keterangan
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 20px; height: 20px; background: ${iconColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 6px ${iconColor}66;">
                    <i class="fas ${iconClass}" style="font-size: 10px;"></i>
                </div>
                <span style="color: #374151; font-weight: 500;">${typeLabel}</span>
            </div>
        `;
        return div;
    };

    legend.addTo(globalMap);
}

/**
 * Zoom to specific marker
 */
function zoomToMarker(lat, lng, popupContent) {
    if (!globalMap) return;
    globalMap.setView([lat, lng], 16);
    L.popup()
        .setLatLng([lat, lng])
        .setContent(popupContent)
        .openOn(globalMap);
}

// ==================== EXPORT GLOBAL FUNCTIONS ====================
window.initMapPage = initMapPage;
window.applyMapFilters = applyMapFilters;
window.zoomToMarker = zoomToMarker;