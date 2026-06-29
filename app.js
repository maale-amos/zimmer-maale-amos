// ============================================
// צימר מעלה עמוס · v4 — Gallery + Hero + Lightbox
// ============================================

(async () => {
  // Load manifest
  let manifest = [];
  try {
    const r = await fetch('images/manifest.json?v=4');
    manifest = await r.json();
  } catch (e) {
    console.error('Failed loading manifest', e);
    return;
  }

  // ===== Hero slider =====
  const heroSlider = document.getElementById('heroSlider');
  const heroPicks = manifest.slice(0, 6);  // First 6 best photos
  heroPicks.forEach((m, i) => {
    const img = document.createElement('img');
    img.src = `images/gallery/${m.file}`;
    img.alt = m.alt || '';
    if (i === 0) img.classList.add('active');
    heroSlider.appendChild(img);
  });
  let hi = 0;
  setInterval(() => {
    const imgs = heroSlider.querySelectorAll('img');
    if (imgs.length < 2) return;
    imgs[hi].classList.remove('active');
    hi = (hi + 1) % imgs.length;
    imgs[hi].classList.add('active');
  }, 5500);

  // ===== Featured gallery strip =====
  const featured = document.getElementById('galleryFeatured');
  const featuredIdx = [0, 1, 2, 3, 4];  // 5 items
  featuredIdx.forEach(i => {
    const m = manifest[i];
    if (!m) return;
    const div = document.createElement('div');
    div.className = 'gf-item';
    div.dataset.idx = i;
    div.innerHTML = `<img src="images/gallery/${m.file}" alt="${m.alt}" loading="lazy">`;
    div.addEventListener('click', () => openLightbox(i));
    featured.appendChild(div);
  });

  // ===== Full grid =====
  const grid = document.getElementById('galleryGrid');
  manifest.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'gi';
    div.dataset.cat = m.cat;
    div.dataset.idx = i;
    div.innerHTML = `
      <img src="images/thumbs/${m.file}" data-full="images/gallery/${m.file}" alt="${m.alt}" loading="lazy">
      <div class="gi-label">${m.alt}</div>
    `;
    div.addEventListener('click', () => openLightbox(i));
    grid.appendChild(div);
  });

  // ===== Filter chips =====
  const chips = document.querySelectorAll('.chip');
  chips.forEach(c => {
    c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      const cat = c.dataset.cat;
      grid.querySelectorAll('.gi').forEach(el => {
        if (cat === 'all' || el.dataset.cat === cat) el.classList.remove('hidden');
        else el.classList.add('hidden');
      });
    });
  });

  // ===== Lightbox =====
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCaption');
  let lbi = 0;

  function openLightbox(i) {
    lbi = i;
    showLb();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showLb() {
    const m = manifest[lbi];
    lbImg.src = `images/gallery/${m.file}`;
    lbImg.alt = m.alt;
    lbCap.textContent = m.alt || '';
  }
  function nextLb() { lbi = (lbi + 1) % manifest.length; showLb(); }
  function prevLb() { lbi = (lbi - 1 + manifest.length) % manifest.length; showLb(); }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbNext').addEventListener('click', nextLb);
  document.getElementById('lbPrev').addEventListener('click', prevLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') nextLb();   // RTL: left arrow = next
    if (e.key === 'ArrowRight') prevLb();
  });

  // ===== Sticky nav scroll state =====
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
