// Лайтбокс только на проектных страницах: ищем галерею/детали
(function () {
  const scopeImages = document.querySelectorAll('.gallery-grid img, .details img');
  if (!scopeImages.length) return; // не проект — выходим

  // создаём overlay
  const overlay = document.createElement('div');
  overlay.className = 'lb';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <button class="lb__btn lb__close" aria-label="Close">✕</button>
    <button class="lb__btn lb__prev"  aria-label="Previous">‹</button>
    <img class="lb__img" alt="">
    <button class="lb__btn lb__next"  aria-label="Next">›</button>
  `;
  document.body.appendChild(overlay);

  const imgEl   = overlay.querySelector('.lb__img');
  const btnClose= overlay.querySelector('.lb__close');
  const btnPrev = overlay.querySelector('.lb__prev');
  const btnNext = overlay.querySelector('.lb__next');
  const images  = Array.from(scopeImages);

  let idx = 0;
  let prevFocus = null;

  function updateButtons() {
    const many = images.length > 1;
    btnPrev.style.display = many ? '' : 'none';
    btnNext.style.display = many ? '' : 'none';
  }

  function open(i) {
    idx = i;
    const target = images[idx];
    const src = target.dataset.full || target.src; // можно указывать data-full для версии повыше
    imgEl.src = src;
    imgEl.alt = target.alt || '';
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    prevFocus = document.activeElement;
    btnClose.focus();
    updateButtons();
  }

  function close() {
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    imgEl.src = '';
    if (prevFocus) prevFocus.focus();
  }

  function next() { idx = (idx + 1) % images.length; open(idx); }
  function prev() { idx = (idx - 1 + images.length) % images.length; open(idx); }

  images.forEach((el, i) => {
    el.addEventListener('click', (e) => { e.preventDefault(); open(i); });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === imgEl) close();
  });
  btnClose.addEventListener('click', close);
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

  document.addEventListener('keydown', (e) => {
    if (overlay.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });
})();
