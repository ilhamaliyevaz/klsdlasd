/* =============================================
   SAFF TƏHARƏT — APP.JS
   ============================================= */

'use strict';

const WA_NUMBER = '994XXXXXXXX';
const PAGE_SCROLL_MAP = {};
let currentPage = 'home';
let currentModalProduct = null;
let currentVacancy = null;
let activeFilter = 'all';

// ─── PRODUCTS DATA ─────────────────────────────

const productsData = [
  // SALFETKA
  {
    id: 'p1',
    name: 'Kağız Dəsmal + Dispenser',
    desc: 'Avtomatik Blue kağız dəsmal dispenseri + 2 ədəd kağız dəsmal rulosu. Ofis, restoran, ictimai binalar üçün ideal.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: 'https://www.genspark.ai/api/files/s/qWLrdvym',
    badge: 'Dəst'
  },
  {
    id: 'p2',
    name: 'Kağız Dəsmal Rulosu',
    desc: 'Yüksək keyfiyyətli kağız dəsmal rulosu. Xüsusi toxuma, yumşaq, davamlı material. Çoxlu rulo seçimi.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: 'https://www.genspark.ai/api/files/s/qWLrdvym',
    badge: null
  },
  // KİMYƏVİ MƏHSULLAR
  {
    id: 'p3',
    name: 'Professional Cleaner',
    desc: 'Peşəkar universal təmizlik vasitəsi. Sürətli və effektiv təmizlik. Müxtəlif səthlər üçün uyğundur.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: 'Professional'
  },
  {
    id: 'p4',
    name: 'Universal Təmizlik Vasitəsi',
    desc: 'Universal çox məqsədli təmizlik məhsulu. Ev, ofis, sənaye sahələri üçün münasibdir.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: 'Universal'
  },
  {
    id: 'p5',
    name: 'Xlor Məhlulu',
    desc: 'Güclü dezinfeksiya və ağardıcı məhsul. Səthi dezinfeksiya etmək üçün ideal.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null
  },
  {
    id: 'p6',
    name: 'Banyə Təmizlik Sprey',
    desc: 'Vanna otağı üçün xüsusi spray. Daş kirəc, pas izlərini effektiv şəkildə aradan qaldırır.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null
  },
  // TƏMİZLİK LƏVAZİMATLARI
  {
    id: 'p7',
    name: 'Mikrofibra Parça Dəsti',
    desc: '4 rəngli mikrofibra parça dəsti (yaşıl, sarı, qırmızı, göy). Yüksək emilim, uzun ömürlü, maşında yuyula bilər.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/W9v5Gr1k',
    badge: '4 Rəng'
  },
  {
    id: 'p8',
    name: 'Flat Mop Başlığı',
    desc: 'Düz mop başlığı. Döşəmə yuma üçün ağ-qırmızı dönən mop başlığı. Bütün döşəmə növləri üçün uyğun.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/LEGr2DwY',
    badge: 'Professional'
  },
  {
    id: 'p9',
    name: 'Chenille Mop Başlığı',
    desc: 'Rəngli chenille mop başlıqları (mavi, çəhrayı, yaşıl, narıncı). Geniş sahəli, yüksək effektiv.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/j7ISbtYe',
    badge: 'Rəngli'
  },
  {
    id: 'p10',
    name: 'Sərfəli Film (Stretch Film)',
    desc: 'Qablaşdırma üçün şəffaf stretch film rulosu. Möhkəm, uzanan, qoruyucu film.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/vU6XDrzT',
    badge: null
  },
  // DEZİNFEKSİYA
  {
    id: 'p11',
    name: 'Antiseptik Məhlul',
    desc: 'Əl və səthlər üçün güclü antiseptik dezinfeksiya məhlulu. 70% spirt əsaslı, sürətli effekt.',
    category: 'dezinfeksiya',
    categoryLabel: 'Dezinfeksiya',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: 'Antiseptik'
  },
  {
    id: 'p12',
    name: 'Dezinfeksiya Sprey',
    desc: 'Səthlər üçün dezinfeksiya spreyi. Bakteriya, virus və göbələklərə qarşı effektiv. Əlverişli sprey qabı.',
    category: 'dezinfeksiya',
    categoryLabel: 'Dezinfeksiya',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null
  },
  // ƏL GİGİYENASI
  {
    id: 'p13',
    name: 'Nitrile Əlcəklər (Qara)',
    desc: 'Professional qara nitrile əlcəklər. Kimyəvi maddələrə davamlı, nazik, rahat geyim. 100 ədədlik qutu.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: 'https://www.genspark.ai/api/files/s/iSiMaF8a',
    badge: '100 əd.'
  },
  {
    id: 'p14',
    name: 'Dispenser Sabun',
    desc: 'Əl yuma üçün dispenser sabunu. Yumşaq formula, nəmləndirici, parfümlü. Böyük həcm.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null
  }
];

// ─── VACANCIES DATA ─────────────────────────────

const vacanciesData = [
  {
    id: 'v1',
    icon: '🚚',
    title: 'Kuryer / Çatdırılma Sürücüsü',
    type: 'Tam Ştat',
    salary: '600 – 900 AZN',
    schedule: 'Çevik qrafik, həftə içi',
    requirements: 'Sürücülük vəsiqəsi (B kateqoriyası), Bakı ərazisinə bələdlik',
    desc: 'Saff Təharət şirkəti üçün sürətli, etibarlı kuryer işə qəbul edirik. Öz nəqliyyatı olan üçün əlavə bonus.',
    duties: 'Sifarişlərin vaxtında çatdırılması, müştəri ilə ünsiyyət, məhsulların qorunması'
  },
  {
    id: 'v2',
    icon: '📦',
    title: 'Anbar İşçisi',
    type: 'Tam Ştat',
    salary: '500 – 700 AZN',
    schedule: 'Həftə içi, 09:00–18:00',
    requirements: 'Fiziki hazırlıq, sürücülük vəsiqəsi (üstünlük)',
    desc: 'Anbar sahəsinin idarə edilməsi, mal qəbulu və yerləşdirilməsi üçün işçi axtarırıq.',
    duties: 'Malların qəbulu, sayılması, etiketlənməsi, anbar sənədlərinin tutulması'
  },
  {
    id: 'v3',
    icon: '💼',
    title: 'Satış Meneceri',
    type: 'Tam Ştat',
    salary: '700 – 1200 AZN + bonus',
    schedule: 'Həftə içi, 09:00–18:00',
    requirements: 'Satış təcrübəsi (üstünlük), ünsiyyət bacarığı, kompüter savadlılığı',
    desc: 'Saff Təharət brendi üçün B2B satışlar aparacaq aktiv satış meneceri axtarırıq.',
    duties: 'Müştəri bazasının genişləndirilməsi, görüşlər, müqavilələr, hesabat'
  },
  {
    id: 'v4',
    icon: '🧹',
    title: 'Sahə Satış Nümayəndəsi',
    type: 'Yarım / Tam Ştat',
    salary: '500 – 800 AZN + faiz',
    schedule: 'Çevik qrafik',
    requirements: 'İraadəli, ünsiyyətsevər, yeni müştəri cəlb etmə bacarığı',
    desc: 'Müştərilərə sahədə məhsulları tanıtmaq və sifariş almaq üçün nümayəndə axtarırıq.',
    duties: 'Sahədə müştərilərlə görüş, kataloqla məhsul tanıtımı, sifariş qəbulu'
  }
];

// ─── PAGE NAVIGATION ───────────────────────────

function showPage(pageId) {
  const oldPage = document.getElementById('page-' + currentPage);
  if (oldPage) {
    PAGE_SCROLL_MAP[currentPage] = window.scrollY;
    oldPage.classList.remove('active');
  }

  currentPage = pageId;

  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;
  newPage.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  const savedScroll = PAGE_SCROLL_MAP[pageId] || 0;
  window.scrollTo({ top: savedScroll, behavior: 'instant' });
}

function goBack() {
  PAGE_SCROLL_MAP[currentPage] = window.scrollY;
  showPage('home');
}

function goToProductsWithFilter(filter) {
  showPage('products');
  filterProducts(filter);
}

// ─── MOBILE MENU ───────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  overlay.classList.toggle('visible', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ─── PRODUCT FILTERING ─────────────────────────

function filterProducts(filter) {
  activeFilter = filter;

  // Update tab active state
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });

  renderProducts();
}

// ─── PRODUCTS RENDERING ────────────────────────

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = activeFilter === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeFilter);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 20px;color:#9ca3af;">
      <div style="font-size:48px;margin-bottom:16px;">🔍</div>
      <p style="font-size:16px;font-weight:600;">Bu kateqoriyada məhsul tapılmadı</p>
    </div>`;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', product.name);

    const badgeHtml = product.badge
      ? `<div class="product-card-badge">${escHtml(product.badge)}</div>`
      : '';

    card.innerHTML = `
      <div class="product-card-img">
        ${badgeHtml}
        <div class="product-card-cat">${escHtml(product.categoryLabel)}</div>
        <img src="${product.img}" alt="${escHtml(product.name)}" loading="lazy"
          onerror="this.src='images/logo.png';this.style.objectFit='contain';this.style.padding='20px'" />
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${escHtml(product.name)}</div>
        <div class="product-card-desc">${escHtml(product.desc)}</div>
        <div class="product-card-footer">
          <button class="product-detail-btn" onclick="event.stopPropagation();openProductModal(productsData.find(p=>p.id==='${product.id}'))">Ətraflı</button>
          <button class="product-wa-btn" onclick="event.stopPropagation();orderProductWA('${product.id}')" aria-label="WhatsApp ilə sifariş et" title="WhatsApp ilə sifariş et">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openProductModal(product));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openProductModal(product); });
    grid.appendChild(card);
  });
}

function orderProductWA(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  const msg = `🛒 *Sifariş — Saff Təharət*\n\n📦 *Məhsul:* ${product.name}\n📂 *Kateqoriya:* ${product.categoryLabel}\n\nSalam! Bu məhsulu sifariş etmək istəyirəm. Zəhmət olmasa məlumat verin.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── PRODUCT MODAL ─────────────────────────────

function openProductModal(product) {
  currentModalProduct = product;
  document.getElementById('modalImg').src = product.img;
  document.getElementById('modalImg').alt = product.name;
  document.getElementById('modalImg').onerror = function() {
    this.src = 'images/logo.png';
    this.style.objectFit = 'contain';
    this.style.padding = '30px';
  };
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalCategoryTag').textContent = product.categoryLabel;
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function contactForProduct() {
  if (!currentModalProduct) return;
  const p = currentModalProduct;
  const msg = `🛒 *Sifariş — Saff Təharət*\n\n📦 *Məhsul:* ${p.name}\n📂 *Kateqoriya:* ${p.categoryLabel}\n\nSalam! Bu məhsulu sifariş etmək istəyirəm. Zəhmət olmasa məlumat verin.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

function closeProductModal(e) {
  if (e.target === document.getElementById('productModal')) closeProductModalBtn();
}
function closeProductModalBtn() {
  document.getElementById('productModal').classList.remove('open');
  currentModalProduct = null;
  document.body.style.overflow = '';
}

// ─── VACANCIES RENDERING ───────────────────────

function renderVacancies() {
  const grid = document.getElementById('vacancyGrid');
  if (!grid) return;

  vacanciesData.forEach(v => {
    const card = document.createElement('div');
    card.className = 'vacancy-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="vacancy-card-icon">${v.icon}</div>
      <div class="vacancy-card-title">${escHtml(v.title)}</div>
      <div class="vacancy-card-type">${escHtml(v.type)}</div>
      <div class="vacancy-card-desc">${escHtml(v.desc)}</div>
      <div class="vacancy-card-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    `;
    card.addEventListener('click', () => openVacancyModal(v));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openVacancyModal(v); });
    grid.appendChild(card);
  });
}

// ─── VACANCY MODAL ─────────────────────────────

function openVacancyModal(v) {
  currentVacancy = v;
  document.getElementById('vacancyModalIcon').textContent = v.icon;
  document.getElementById('vacancyModalTitle').textContent = v.title;
  document.getElementById('vacancyModalType').textContent = v.type;

  const detailsEl = document.getElementById('vacancyModalDetails');
  detailsEl.innerHTML = `
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">💰 Maaş:</span><span class="vacancy-detail-value">${escHtml(v.salary)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">⏰ Qrafik:</span><span class="vacancy-detail-value">${escHtml(v.schedule)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📋 Tələblər:</span><span class="vacancy-detail-value">${escHtml(v.requirements)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📝 Vəzifələr:</span><span class="vacancy-detail-value">${escHtml(v.duties)}</span></div>
  `;

  document.getElementById('vacancyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVacancyModal(e) {
  if (e.target === document.getElementById('vacancyModal')) closeVacancyModalBtn();
}
function closeVacancyModalBtn() {
  document.getElementById('vacancyModal').classList.remove('open');
  currentVacancy = null;
  document.body.style.overflow = '';
}

function applyVacancy() {
  if (!currentVacancy) return;
  const msg = `👋 *Vakansiyaya Müraciət — Saff Təharət*\n\n🔹 *Vəzifə:* ${currentVacancy.title}\n🔹 *İş rejimi:* ${currentVacancy.type}\n\nSalam! Bu vakansiya ilə maraqlanıram. Əlaqə saxlamaq istəyirəm.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── TOAST ─────────────────────────────────────

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── UTILS ─────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── KEYBOARD ACCESSIBILITY ────────────────────

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('productModal').classList.contains('open')) {
      closeProductModalBtn();
    } else if (document.getElementById('vacancyModal').classList.contains('open')) {
      closeVacancyModalBtn();
    } else if (document.getElementById('mobileMenu').classList.contains('open')) {
      toggleMenu();
    }
  }
});

// ─── INIT ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  renderVacancies();
});
