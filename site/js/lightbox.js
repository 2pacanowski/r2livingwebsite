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
})();
