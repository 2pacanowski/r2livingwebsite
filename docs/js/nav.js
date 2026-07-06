(function () {
  const nav = document.querySelector('nav.top');
  if (!nav) return;
  const toggle = nav.querySelector('.navToggle');
  const panel = nav.querySelector('.navPanel');
  if (!toggle || !panel) return;

  function setNavHeight() {
    document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  setNavHeight();

  function close() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    const dt = nav.querySelector('.navDropTrigger');
    if (dt) dt.setAttribute('aria-expanded', 'false');
  }

  function open() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? close() : open();
  });

  panel.querySelectorAll('.links > a').forEach(a => a.addEventListener('click', close));

  // Developments dropdown
  const dropTrigger = nav.querySelector('.navDropTrigger');
  if (dropTrigger) {
    // Mobile: intercept click to toggle accordion instead of navigating
    dropTrigger.addEventListener('click', e => {
      if (window.innerWidth > 768) return;
      e.preventDefault();
      const expanded = dropTrigger.getAttribute('aria-expanded') === 'true';
      dropTrigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
    // Close nav when a dropdown link is clicked
    nav.querySelectorAll('.navDropPanel a').forEach(a => a.addEventListener('click', close));
    // Mark trigger active when on a project page
    const path = window.location.pathname;
    if (path.includes('porzeczkowa') || path.includes('wspolna')) {
      dropTrigger.classList.add('active');
    }
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) close();
    setNavHeight();
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

  const links = Array.from(nav.querySelectorAll('.links a[href^="#"]'));
  const sections = links
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (sections.length) {
    const setActive = id => {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    };

    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length) {
        const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        setActive(top.target.id);
      }
    }, { rootMargin: `-${nav.offsetHeight + 1}px 0px -60% 0px`, threshold: 0 });

    sections.forEach(s => observer.observe(s));
  }
})();
