/* =============================================
   SAFF TƏHARƏT — APP.JS
   ============================================= */

'use strict';

const WA_NUMBER = '994555056722';
const PAGE_SCROLL_MAP = {};
let currentPage = 'home';
let currentModalProduct = null;
let currentVacancy = null;
let activeFilter = 'all';

// ─── CART STATE ────────────────────────────────
let cart = []; // [{id, name, categoryLabel, img, qty, price}]

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
    badge: 'Dəst',
    price: null
  },
  {
    id: 'p2',
    name: 'Kağız Dəsmal Rulosu',
    desc: 'Yüksək keyfiyyətli kağız dəsmal rulosu. Xüsusi toxuma, yumşaq, davamlı material. Çoxlu rulo seçimi.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: 'https://www.genspark.ai/api/files/s/qWLrdvym',
    badge: null,
    price: null
  },
  // KİMYƏVİ MƏHSULLAR
  {
    id: 'p3',
    name: 'Professional Cleaner',
    desc: 'Peşəkar universal təmizlik vasitəsi. Sürətli və effektiv təmizlik. Müxtəlif səthlər üçün uyğundur.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: 'Professional',
    price: null
  },
  {
    id: 'p4',
    name: 'Universal Təmizlik Vasitəsi',
    desc: 'Universal çox məqsədli təmizlik məhsulu. Ev, ofis, sənaye sahələri üçün münasibdir.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: 'Universal',
    price: null
  },
  {
    id: 'p5',
    name: 'Xlor Məhlulu',
    desc: 'Güclü dezinfeksiya və ağardıcı məhsul. Səthi dezinfeksiya etmək üçün ideal.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null,
    price: null
  },
  {
    id: 'p6',
    name: 'Banyə Təmizlik Sprey',
    desc: 'Vanna otağı üçün xüsusi spray. Daş kirəc, pas izlərini effektiv şəkildə aradan qaldırır.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null,
    price: null
  },
  // TƏMİZLİK LƏVAZİMATLARI
  {
    id: 'p7',
    name: 'Mikrofibra Parça Dəsti',
    desc: '4 rəngli mikrofibra parça dəsti (yaşıl, sarı, qırmızı, göy). Yüksək emilim, uzun ömürlü, maşında yuyula bilər.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/W9v5Gr1k',
    badge: '4 Rəng',
    price: null
  },
  {
    id: 'p8',
    name: 'Flat Mop Başlığı',
    desc: 'Düz mop başlığı. Döşəmə yuma üçün ağ-qırmızı dönən mop başlığı. Bütün döşəmə növləri üçün uyğun.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/LEGr2DwY',
    badge: 'Professional',
    price: null
  },
  {
    id: 'p9',
    name: 'Chenille Mop Başlığı',
    desc: 'Rəngli chenille mop başlıqları (mavi, çəhrayı, yaşıl, narıncı). Geniş sahəli, yüksək effektiv.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/j7ISbtYe',
    badge: 'Rəngli',
    price: null
  },
  {
    id: 'p10',
    name: 'Sərfəli Film (Stretch Film)',
    desc: 'Qablaşdırma üçün şəffaf stretch film rulosu. Möhkəm, uzanan, qoruyucu film.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: 'https://www.genspark.ai/api/files/s/vU6XDrzT',
    badge: null,
    price: null
  },
  // DEZİNFEKSİYA
  {
    id: 'p11',
    name: 'Antiseptik Məhlul',
    desc: 'Əl və səthlər üçün güclü antiseptik dezinfeksiya məhlulu. 70% spirt əsaslı, sürətli effekt.',
    category: 'dezinfeksiya',
    categoryLabel: 'Dezinfeksiya',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: 'Antiseptik',
    price: null
  },
  {
    id: 'p12',
    name: 'Dezinfeksiya Sprey',
    desc: 'Səthlər üçün dezinfeksiya spreyi. Bakteriya, virus və göbələklərə qarşı effektiv. Əlverişli sprey qabı.',
    category: 'dezinfeksiya',
    categoryLabel: 'Dezinfeksiya',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null,
    price: null
  },
  // ƏL GİGİYENASI
  {
    id: 'p13',
    name: 'Nitrile Əlcəklər (Qara)',
    desc: 'Professional qara nitrile əlcəklər. Kimyəvi maddələrə davamlı, nazik, rahat geyim. 100 ədədlik qutu.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: 'https://www.genspark.ai/api/files/s/iSiMaF8a',
    badge: '100 əd.',
    price: null
  },
  {
    id: 'p14',
    name: 'Dispenser Sabun',
    desc: 'Əl yuma üçün dispenser sabunu. Yumşaq formula, nəmləndirici, parfümlü. Böyük həcm.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: 'https://www.genspark.ai/api/files/s/KMWWqHB2',
    badge: null,
    price: null
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

    // Check if product is in cart
    const cartItem = cart.find(c => c.id === product.id);
    const inCart = !!cartItem;

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
          <button class="product-cart-btn ${inCart ? 'in-cart' : ''}" id="cart-btn-${product.id}" onclick="event.stopPropagation();addToCart('${product.id}')" aria-label="Səbətə əlavə et" title="Səbətə əlavə et">
            ${inCart
              ? `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
              : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="16" height="16"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`
            }
          </button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openProductModal(product));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openProductModal(product); });
    grid.appendChild(card);
  });
}

// ─── CART FUNCTIONS ────────────────────────────

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      categoryLabel: product.categoryLabel,
      img: product.img,
      qty: 1,
      price: product.price
    });
  }

  updateCartBadge();
  updateCartButtonState(productId); // Only update the specific button, no full re-render
  showToast(`"${product.name}" səbətə əlavə edildi 🛒`);
}

function updateCartButtonState(productId) {
  const btn = document.getElementById('cart-btn-' + productId);
  if (!btn) return;
  const inCart = cart.some(c => c.id === productId);
  btn.classList.toggle('in-cart', inCart);
  btn.innerHTML = inCart
    ? `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="16" height="16"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;
}

function addToCartFromModal() {
  if (!currentModalProduct) return;
  addToCart(currentModalProduct.id);
  closeProductModalBtn();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartBadge();
  renderCartSidebar();
  updateCartButtonState(productId); // Only update the specific button
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCartBadge();
  renderCartSidebar();
}

function updateCartBadge() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  const badge = document.getElementById('cartBadge');
  const mobileBadge = document.getElementById('mobileCartCount');
  if (badge) {
    badge.textContent = total;
    badge.classList.toggle('has-items', total > 0);
  }
  if (mobileBadge) mobileBadge.textContent = total;
}

function openCart() {
  renderCartSidebar();
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('visible');
  document.body.style.overflow = '';
}

function renderCartSidebar() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p class="cart-empty-text">Səbətiniz boşdur</p>
        <p class="cart-empty-sub">Məhsullar səhifəsinə keçib məhsul əlavə edin</p>
        <button class="cart-go-products-btn" onclick="closeCart();showPage('products')">
          Məhsullara Bax
        </button>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'flex';

  body.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-img-wrap">
        <img src="${item.img}" alt="${escHtml(item.name)}" class="cart-item-img"
          onerror="this.src='images/logo.png';this.style.objectFit='contain';this.style.padding='6px'" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escHtml(item.name)}</div>
        <div class="cart-item-cat">${escHtml(item.categoryLabel)}</div>
        ${item.price ? `<div class="cart-item-price">${(item.price * item.qty).toFixed(2)} ₼</div>` : '<div class="cart-item-price-inquiry">Qiymət soruşulacaq</div>'}
      </div>
      <div class="cart-item-controls">
        <div class="cart-qty-row">
          <button class="cart-qty-btn" onclick="changeQty('${item.id}', -1)" aria-label="Azalt">−</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" onclick="changeQty('${item.id}', 1)" aria-label="Artır">+</button>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" aria-label="Sil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Calculate total
  const hasAllPrices = cart.every(c => c.price !== null);
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);

  if (hasAllPrices) {
    const totalPrice = cart.reduce((sum, c) => sum + (c.price || 0) * c.qty, 0);
    if (totalEl) totalEl.textContent = `${totalPrice.toFixed(2)} ₼`;
  } else {
    if (totalEl) totalEl.textContent = `${totalItems} məhsul`;
  }
}

function orderViaWhatsApp() {
  if (cart.length === 0) return;

  let msg = `🛒 *Sifariş — Saff Təharət*\n\n`;
  msg += `📋 *Sifariş Siyahısı:*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;

  cart.forEach((item, i) => {
    msg += `\n${i + 1}. 📦 *${item.name}*\n`;
    msg += `   📂 Kateqoriya: ${item.categoryLabel}\n`;
    msg += `   🔢 Miqdar: ${item.qty} ədəd\n`;
    if (item.price) {
      msg += `   💰 Qiymət: ${(item.price * item.qty).toFixed(2)} ₼\n`;
    }
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━\n`;

  const hasAllPrices = cart.every(c => c.price !== null);
  if (hasAllPrices) {
    const total = cart.reduce((sum, c) => sum + (c.price || 0) * c.qty, 0);
    msg += `💵 *Ümumi: ${total.toFixed(2)} ₼*\n`;
  } else {
    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
    msg += `🔢 *Cəmi ${totalItems} ədəd məhsul*\n`;
  }

  msg += `\nZəhmət olmasa bu sifariş haqqında məlumat verin.`;

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
    if (document.getElementById('cartSidebar').classList.contains('open')) {
      closeCart();
    } else if (document.getElementById('productModal').classList.contains('open')) {
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
  updateCartBadge();
});
