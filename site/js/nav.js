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
})();
