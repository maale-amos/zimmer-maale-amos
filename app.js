// ======================================================
// צימר מעלה עמוס · Site Interactions
// ======================================================

// Gallery photos with categories for filters
const GALLERY_IMAGES = [
  { src: 'img_7433.jpg', alt: 'סלון מרווח עם שעון זהב', cat: 'living', size: 'large' },
  { src: 'img_7446.jpg', alt: 'חצר עם נדנדה ופרחים', cat: 'outdoor', size: '' },
  { src: 'img_7429.jpg', alt: 'מטבח עם מפת ארץ ישראל', cat: 'kitchen', size: '' },
  { src: 'img_7444.jpg', alt: 'יחידת הורים', cat: 'bedroom', size: '' },
  { src: 'img_7438.jpg', alt: 'חדר ילדים עם 2 מיטות', cat: 'bedroom', size: 'wide' },
  { src: 'img_7448.jpg', alt: 'גינה עם פרחים אדומים', cat: 'outdoor', size: '' },
  { src: 'img_7427.jpg', alt: 'אזור אוכל ופינת ספרים', cat: 'living', size: '' },
  { src: 'img_7432.jpg', alt: 'סלון מרווח', cat: 'living', size: '' },
  { src: 'img_7458.jpg', alt: 'חדר שינה זוגי', cat: 'bedroom', size: '' },
  { src: 'img_7440.jpg', alt: 'מטבח עם פלטת שבת', cat: 'kitchen', size: 'large' },
  { src: 'img_7456.jpg', alt: 'פינת קפה לשבת', cat: 'kitchen', size: '' },
  { src: 'img_7453.jpg', alt: 'נדנדה בחצר', cat: 'outdoor', size: '' },
  { src: 'img_7445.jpg', alt: 'חדר שינה עם איפור', cat: 'bedroom', size: '' },
  { src: 'img_7450.jpg', alt: 'חצר עם מנגל', cat: 'outdoor', size: '' },
  { src: 'img_7459.jpg', alt: 'פרטים מעוצבים', cat: 'living', size: '' },
  { src: 'img_7460.jpg', alt: 'שולחן איפור עם צמחים', cat: 'bedroom', size: '' },
  { src: 'img_7452.jpg', alt: 'סלון עם ספריה', cat: 'living', size: 'wide' },
  { src: 'img_7449.jpg', alt: 'גינה פורחת', cat: 'outdoor', size: '' },
  { src: 'img_7447.jpg', alt: 'פינת ישיבה בחצר', cat: 'outdoor', size: '' },
  { src: 'img_7454.jpg', alt: 'מבט אחורי לחצר', cat: 'outdoor', size: '' },
  { src: 'img_7455.jpg', alt: 'חצר עם פינת אוכל חיצונית', cat: 'outdoor', size: '' },
  { src: 'img_7457.jpg', alt: 'פינת קפה ומקרר', cat: 'kitchen', size: '' },
  { src: 'img_7431.jpg', alt: 'מבט כללי לסלון', cat: 'living', size: '' },
  { src: 'img_7466.jpg', alt: 'חדר שינה נוסף', cat: 'bedroom', size: '' },
];

// ======================================================
// Loader
// ======================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    document.body.classList.add('loaded');
  }, 1400);
});

// Custom cursor removed per user feedback (kept default browser cursor)

// ======================================================
// Magnetic buttons
// ======================================================
(function initMagnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const text = btn.querySelector('.btn-text');
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      if (text) text.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      const text = btn.querySelector('.btn-text');
      if (text) text.style.transform = '';
    });
  });
})();

// ======================================================
// Scroll Progress Bar
// ======================================================
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  function update() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / h) * 100;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ======================================================
// Navigation
// ======================================================
const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

function updateNav() {
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ======================================================
// Hero Slideshow
// ======================================================
(function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    indicators.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }

  function nextSlide() { showSlide((current + 1) % slides.length); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  }

  indicators.forEach((d, i) => {
    d.addEventListener('click', () => { showSlide(i); startTimer(); });
  });

  startTimer();
})();

// ======================================================
// Rooms Tabs
// ======================================================
(function initRoomsTabs() {
  const tabs = document.querySelectorAll('.room-tab');
  const contents = document.querySelectorAll('.room-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = tab.dataset.room;
      tabs.forEach(t => t.classList.toggle('active', t.dataset.room === idx));
      contents.forEach(c => c.classList.toggle('active', c.dataset.room === idx));
    });
  });
})();

// ======================================================
// Gallery
// ======================================================
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery() {
  const html = GALLERY_IMAGES.map((img, i) => `
    <div class="gallery-item ${img.size}" data-index="${i}" data-cat="${img.cat}">
      <img src="images/thumbs/${img.src}" alt="${img.alt}" loading="lazy">
      <div class="gallery-zoom">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    </div>
  `).join('');
  galleryGrid.innerHTML = html;

  galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => openLightbox(parseInt(el.dataset.index, 10)));
  });
}

// Gallery filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !show);
    });
  });
});

// ======================================================
// Lightbox
// ======================================================
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbCaption = document.getElementById('lbCaption');
let lbIndex = 0;
let visibleImages = [];

function getVisibleImages() {
  const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
  return GALLERY_IMAGES.filter(img => activeFilter === 'all' || img.cat === activeFilter);
}

function openLightbox(index) {
  visibleImages = getVisibleImages();
  // Map original index to visible list
  const img = GALLERY_IMAGES[index];
  lbIndex = visibleImages.findIndex(v => v.src === img.src);
  if (lbIndex < 0) lbIndex = 0;
  showLightbox();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showLightbox() {
  const img = visibleImages[lbIndex];
  lbImg.src = `images/gallery/${img.src}`;
  lbImg.alt = img.alt;
  lbCounter.textContent = `${lbIndex + 1} / ${visibleImages.length}`;
  lbCaption.textContent = img.alt;
}

function nextLightbox() {
  lbIndex = (lbIndex + 1) % visibleImages.length;
  showLightbox();
}

function prevLightbox() {
  lbIndex = (lbIndex - 1 + visibleImages.length) % visibleImages.length;
  showLightbox();
}

document.querySelector('.lb-close').addEventListener('click', closeLightbox);
document.querySelector('.lb-next').addEventListener('click', nextLightbox);
document.querySelector('.lb-prev').addEventListener('click', prevLightbox);

lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') nextLightbox();
  if (e.key === 'ArrowRight') prevLightbox();
});

// Touch swipe
let touchX = null;
lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  if (touchX === null) return;
  const diff = e.changedTouches[0].clientX - touchX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextLightbox(); else prevLightbox();
  }
  touchX = null;
}, { passive: true });

// ======================================================
// Scroll Reveal Animations
// ======================================================
(function initScrollReveal() {
  const config = [
    { sel: '.section-header', cls: 'scroll-reveal' },
    { sel: '.about-text', cls: 'scroll-reveal-right' },
    { sel: '.about-visual', cls: 'scroll-reveal-left' },
    { sel: '.features-grid', cls: 'stagger' },
    { sel: '.suitable-grid', cls: 'stagger' },
    { sel: '.gallery-grid', cls: 'stagger' },
    { sel: '.rooms-tabs', cls: 'scroll-reveal' },
    { sel: '.cta-card', cls: 'scroll-reveal' },
    { sel: '.location-text', cls: 'scroll-reveal-right' },
    { sel: '.location-map-wrap', cls: 'scroll-reveal-left' },
    { sel: '.faq-list', cls: 'stagger' },
    { sel: '.contact-card', cls: 'scroll-reveal' },
    { sel: '.footer-grid', cls: 'stagger' },
  ];

  config.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach(el => el.classList.add(cls));
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .stagger').forEach(el => obs.observe(el));
})();

// ======================================================
// Number counter animation
// ======================================================
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1500;
    const start = performance.now();
    const original = el.textContent;
    const suffix = original.replace(/\d/g, '');

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = current + (progress < 1 ? '' : suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

// ======================================================
// Smooth scroll
// ======================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======================================================
// Booking Calendar
// ======================================================
const HEB_MONTHS = ['ינו׳','פבר׳','מרץ','אפר׳','מאי','יוני','יולי','אוג׳','ספט׳','אוק׳','נוב׳','דצמ׳'];
const STATUS_TEXT = {
  available: 'פנוי',
  booked: 'תפוס',
  pending: 'בבדיקה',
};

async function loadCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  try {
    const res = await fetch('availability.json?t=' + Date.now());
    const data = await res.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = data.weeks
      .filter(w => new Date(w.friday_date) >= today)
      .slice(0, 12);

    if (!upcoming.length) {
      grid.innerHTML = '<div class="calendar-loading">אין שבתות זמינות להצגה</div>';
      return;
    }

    grid.innerHTML = upcoming.map(w => {
      const d = new Date(w.friday_date);
      const dayOfMonth = d.getDate();
      const monthName = HEB_MONTHS[d.getMonth()];
      const status = w.status || 'available';
      const statusText = STATUS_TEXT[status] || 'פנוי';
      return `
        <button class="cal-cell ${status}" data-date="${w.friday_date}" data-parsha="${w.parsha}" data-status="${status}" ${status==='booked' ? 'disabled' : ''}>
          <div class="cal-date">${dayOfMonth}</div>
          <span class="cal-month">${monthName}</span>
          <div class="cal-parsha">${w.parsha}</div>
          <span class="cal-status">${statusText}</span>
          ${w.note ? `<div class="cal-note">${w.note}</div>` : ''}
        </button>
      `;
    }).join('');

    grid.querySelectorAll('.cal-cell:not([disabled])').forEach(cell => {
      cell.addEventListener('click', () => {
        openInquiry(cell.dataset.date, cell.dataset.parsha, cell.dataset.status);
      });
    });
  } catch (e) {
    grid.innerHTML = '<div class="calendar-loading">שגיאה בטעינת לוח זמינות</div>';
    console.error(e);
  }
}

// ======================================================
// Inquiry Modal
// ======================================================
function openInquiry(date, parsha, status) {
  const modal = document.getElementById('inquiryModal');
  document.getElementById('formDate').value = date;
  document.getElementById('formParsha').value = parsha;
  const statusText = status === 'pending' ? 'בבדיקה' : 'פנוי';
  document.getElementById('modalSub').textContent = `שבת פרשת ${parsha} · ${date.split('-').reverse().join('/')} · ${statusText}`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeInquiry() {
  const modal = document.getElementById('inquiryModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

const inquiryModal = document.getElementById('inquiryModal');
if (inquiryModal) {
  document.getElementById('modalClose').addEventListener('click', closeInquiry);
  inquiryModal.querySelector('.modal-backdrop').addEventListener('click', closeInquiry);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && inquiryModal.classList.contains('open')) closeInquiry();
  });

  document.getElementById('inquiryForm').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target;
    const data = Object.fromEntries(new FormData(f).entries());
    const subject = `פנייה לצימר מעלה עמוס - ${data.parsha} (${data.date})`;

    const submitBtn = f.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'שולח...';

    const payload = {
      _subject: subject,
      _replyto: data.email || 'noreply@example.com',
      _captcha: 'false',
      _template: 'table',
      'תאריך': data.date,
      'פרשת השבוע': data.parsha,
      'שם מלא': data.name,
      'טלפון': data.phone,
      'אימייל': data.email || '-',
      'מספר אורחים': data.guests,
      'סעודות שבת': data.meals,
      'הערות': data.message || '-',
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/A0533177636@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success === 'true' || result.success === true) {
        f.innerHTML = `<div class="form-success"><strong>הפנייה נשלחה!</strong><br>תודה שפניתם, נחזור אליכם בהקדם.<br><br><small>במידה ואין תשובה תוך 24 שעות - אנא התקשרו: <a href="tel:+972533177636" style="color:inherit;">053-317-7636</a></small></div>`;
      } else {
        throw new Error('send-failed');
      }
    } catch (err) {
      // Fallback to mailto if FormSubmit fails
      const body = [
        `שלום,`,
        ``,
        `פנייה לצימר מעלה עמוס:`,
        ``,
        `📅 תאריך: ${data.date}`,
        `📖 פרשה: ${data.parsha}`,
        ``,
        `👤 שם: ${data.name}`,
        `📱 טלפון: ${data.phone}`,
        `📧 אימייל: ${data.email || '-'}`,
        ``,
        `👥 אורחים: ${data.guests}`,
        `🍽️ סעודות: ${data.meals}`,
        ``,
        `📝 הערות: ${data.message || '-'}`,
      ].join('\n');
      window.location.href = `mailto:A0533177636@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      f.innerHTML = `<div class="form-success"><strong>תוכנת המייל נפתחה</strong><br>שלחו את ההודעה משם.</div>`;
    }
  });
}

// ======================================================
// Init
// ======================================================
renderGallery();
loadCalendar();
