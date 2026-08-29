(function () {
  const triggers = document.querySelectorAll('.priceHistoryLink');
  if (!triggers.length) return;

  function open(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close(overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.modal));
  });

  document.querySelectorAll('.phOverlay').forEach(overlay => {
    const closeBtn = overlay.querySelector('.phClose');
    if (closeBtn) closeBtn.addEventListener('click', () => close(overlay));
    overlay.addEventListener('click', e => { if (e.target === overlay) close(overlay); });
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.phOverlay.open').forEach(close);
  });
})();
