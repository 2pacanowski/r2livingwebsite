(function () {
  const items = Array.from(document.querySelectorAll('.gImg'));
  if (!items.length) return;

  // Build overlay
  const overlay = document.createElement('div');
  overlay.className = 'lbOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <button class="lbClose" aria-label="Close">&times;</button>
    <button class="lbPrev" aria-label="Previous">&#8592;</button>
    <button class="lbNext" aria-label="Next">&#8594;</button>
    <div class="lbImgWrap">
      <img class="lbImg" src="" alt="" />
    </div>
    <div class="lbCaption">
      <span class="lbCaptionTitle"></span>
      <span class="lbCaptionSub"></span>
      <span class="lbCounter"></span>
    </div>`;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lbImg');
  const lbTitle = overlay.querySelector('.lbCaptionTitle');
  const lbSub = overlay.querySelector('.lbCaptionSub');
  const lbCounter = overlay.querySelector('.lbCounter');

  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    const img = item.querySelector('img');
    const capB = item.querySelector('.cap b');
    const capText = item.querySelector('.cap');

    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = capB ? capB.textContent : '';
    lbSub.textContent = capText ? capText.textContent.replace(capB ? capB.textContent : '', '').trim() : '';
    lbCounter.textContent = (current + 1) + ' / ' + items.length;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Click on gallery image to open
  items.forEach((item, i) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => show(i));
  });

  overlay.querySelector('.lbClose').addEventListener('click', close);
  overlay.querySelector('.lbPrev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  overlay.querySelector('.lbNext').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });

  // Close on backdrop click
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Swipe to navigate
  const imgWrap = overlay.querySelector('.lbImgWrap');
  let lbSwipeStartX = 0, lbSwipeCurrent = 0, lbSwiping = false;

  overlay.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    lbSwipeStartX = e.clientX;
    lbSwipeCurrent = e.clientX;
    lbSwiping = true;
    overlay.setPointerCapture(e.pointerId);
  });

  overlay.addEventListener('pointermove', e => {
    if (!lbSwiping) return;
    lbSwipeCurrent = e.clientX;
    const dx = lbSwipeCurrent - lbSwipeStartX;
    imgWrap.style.transform = 'translateX(' + dx + 'px)';
    imgWrap.style.transition = 'none';
  });

  overlay.addEventListener('pointerup', e => {
    if (!lbSwiping) return;
    lbSwiping = false;
    const dx = lbSwipeCurrent - lbSwipeStartX;
    if (Math.abs(dx) < 60) {
      imgWrap.style.transition = 'transform 0.2s ease';
      imgWrap.style.transform = '';
      return;
    }
    const dir = dx < 0 ? 1 : -1;
    imgWrap.style.transition = 'transform 0.22s cubic-bezier(.4,0,.2,1)';
    imgWrap.style.transform = 'translateX(' + (dx < 0 ? -110 : 110) + '%)';
    imgWrap.addEventListener('transitionend', function onOut() {
      imgWrap.removeEventListener('transitionend', onOut);
      show(current + (dx < 0 ? 1 : -1));
      imgWrap.style.transition = 'none';
      imgWrap.style.transform = 'translateX(' + (dx < 0 ? 110 : -110) + '%)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        imgWrap.style.transition = 'transform 0.28s cubic-bezier(.4,0,.2,1)';
        imgWrap.style.transform = '';
        imgWrap.addEventListener('transitionend', function onIn() {
          imgWrap.removeEventListener('transitionend', onIn);
          imgWrap.style.transition = '';
          imgWrap.style.transform = '';
        });
      }));
    });
  });
})();
