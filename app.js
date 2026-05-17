// ====================================================
// צימר מעלה עמוס - Site interactions
// ====================================================

// All gallery photos - curated order. Hero/best first.
const GALLERY_IMAGES = [
  { src: 'img_7433.jpg', alt: 'סלון מרווח ופינת אוכל עם שעון זהב' },
  { src: 'img_7446.jpg', alt: 'חצר פרטית עם נדנדה ופרחים' },
  { src: 'img_7429.jpg', alt: 'מטבח מאובזר' },
  { src: 'img_7444.jpg', alt: 'יחידת הורים' },
  { src: 'img_7438.jpg', alt: 'חדר ילדים עם 2 מיטות ועריסה' },
  { src: 'img_7448.jpg', alt: 'חצר עם פרחים אדומים' },
  { src: 'img_7427.jpg', alt: 'אזור אוכל' },
  { src: 'img_7432.jpg', alt: 'סלון מרווח' },
  { src: 'img_7458.jpg', alt: 'חדר שינה הורים' },
  { src: 'img_7440.jpg', alt: 'מטבח עם פלטת שבת' },
  { src: 'img_7456.jpg', alt: 'פינת קפה לשבת' },
  { src: 'img_7453.jpg', alt: 'נדנדה בחצר' },
  { src: 'img_7445.jpg', alt: 'חדר שינה עם איפור' },
  { src: 'img_7450.jpg', alt: 'חצר עם מנגל' },
  { src: 'img_7459.jpg', alt: 'פרטים מעוצבים' },
  { src: 'img_7460.jpg', alt: 'שולחן איפור עם צמחים' },
  { src: 'img_7452.jpg', alt: 'סלון עם ספריה' },
  { src: 'img_7449.jpg', alt: 'גינה פורחת' },
  { src: 'img_7447.jpg', alt: 'פינת ישיבה בחצר' },
  { src: 'img_7454.jpg', alt: 'מבט אחורי לחצר' },
  { src: 'img_7455.jpg', alt: 'חצר עם פינת אוכל חיצונית' },
  { src: 'img_7457.jpg', alt: 'פינת קפה' },
  { src: 'img_7431.jpg', alt: 'מבט כללי לסלון' },
  { src: 'img_7466.jpg', alt: 'חדר נוסף' },
  { src: 'img_7462.jpg', alt: 'חדר שינה' },
  { src: 'img_7463.jpg', alt: 'מיטה זוגית' },
];

// ----- Navigation scroll behavior -----
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');

function updateNav() {
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
  }
});

// ----- Gallery rendering -----
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery() {
  const html = GALLERY_IMAGES.map((img, i) => `
    <div class="gallery-item" data-index="${i}">
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

// ----- Lightbox -----
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
let lbIndex = 0;

function openLightbox(index) {
  lbIndex = index;
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
  const img = GALLERY_IMAGES[lbIndex];
  lbImg.src = `images/gallery/${img.src}`;
  lbImg.alt = img.alt;
  lbCounter.textContent = `${lbIndex + 1} / ${GALLERY_IMAGES.length}`;
}

function nextLightbox() {
  lbIndex = (lbIndex + 1) % GALLERY_IMAGES.length;
  showLightbox();
}

function prevLightbox() {
  lbIndex = (lbIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  showLightbox();
}

document.querySelector('.lb-close').addEventListener('click', closeLightbox);
document.querySelector('.lb-next').addEventListener('click', nextLightbox);
document.querySelector('.lb-prev').addEventListener('click', prevLightbox);

lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  // RTL aware - swap arrows
  if (e.key === 'ArrowLeft') nextLightbox();
  if (e.key === 'ArrowRight') prevLightbox();
});

// Touch swipe on lightbox image
let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const diff = e.changedTouches[0].clientX - touchX;
  if (Math.abs(diff) > 50) {
    // RTL: swipe right = next, swipe left = prev
    if (diff > 0) nextLightbox();
    else prevLightbox();
  }
  touchX = null;
}, { passive: true });

// ----- Scroll reveal -----
function setupReveal() {
  const selectors = ['.section-header', '.about-text', '.about-photo', '.feature-card', '.suitable-item', '.location-text', '.location-map', '.contact-card', '.gallery-item'];
  const els = document.querySelectorAll(selectors.join(','));
  els.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => obs.observe(el));
}

// Init
renderGallery();
setupReveal();

// ----- Smooth scroll for anchor links -----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
