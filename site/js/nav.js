(function () {
  const nav = document.querySelector('nav.top');
  if (!nav) return;
  const toggle = nav.querySelector('.navToggle');
  const panel = nav.querySelector('.navPanel');
  if (!toggle || !panel) return;

  function close() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function open() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? close() : open();
  });

  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) close();
  });

  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav.classList.contains('open')) { lastY = y; return; }
    if (y > lastY && y > nav.offsetHeight) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastY = y;
  }, { passive: true });
})();
