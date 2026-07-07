(function () {
  const configEl = document.getElementById('configData');
  const config = JSON.parse(configEl.textContent);
  const unitKeys = Object.keys(config.units);

  const planEl = document.getElementById('configPlan');
  const planCode = planEl.dataset.planCode || '';
  const planMode = config.planMode || 'inline';
  const titleEl = document.getElementById('planTitle');
  const floorTitleEl = document.getElementById('floorTitle');
  const floorSubEl = document.getElementById('floorSubtitle');
  const roomListEl = document.getElementById('roomList');

  const state = { unit: unitKeys[0], floor: config.floors[0] };
  const roomRegionsEl = document.getElementById('roomRegionsData');
  const roomRegions = roomRegionsEl ? JSON.parse(roomRegionsEl.textContent) : null;

  function polygonToPath(points) {
    return points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ') + ' Z';
  }

  function renderRoomOverlays(unitData) {
    const assetKey = unitData.assetKey || state.unit;
    const regionsForUnit = roomRegions && roomRegions['unit' + assetKey];

    document.querySelectorAll('.roomOverlay').forEach(svg => {
      const isActiveFloor = svg.dataset.floor === state.floor;
      const floorData = isActiveFloor && regionsForUnit ? regionsForUnit[state.floor] : null;
      svg.innerHTML = '';
      if (!floorData) return;
      svg.setAttribute('viewBox', floorData.viewBox);
      Object.keys(floorData.rooms).forEach(num => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', polygonToPath(floorData.rooms[num]));
        path.setAttribute('data-room', num);
        svg.appendChild(path);
      });
    });
  }

  function render() {
    document.querySelectorAll('.tab[data-unit]').forEach(t => {
      const active = t.dataset.unit === state.unit;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active);
    });
    document.querySelectorAll('.tab[data-floor]').forEach(t => {
      const active = t.dataset.floor === state.floor;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active);
    });

    const unitData = config.units[state.unit];
    const d = unitData.floors[state.floor];

    if (planMode === 'image') {
      const assetKey = unitData.assetKey || state.unit;
      document.querySelectorAll('.floorSvg').forEach(img => {
        const active = img.dataset.floor === state.floor;
        img.classList.toggle('active', active);
        if (active) img.src = config.imagePath.replace('{unit}', assetKey).replace('{floor}', state.floor);
      });
      document.querySelectorAll('.planFrame').forEach(frame => {
        frame.classList.toggle('active', frame.dataset.floor === state.floor);
      });
      renderRoomOverlays(unitData);
    } else {
      document.querySelectorAll('.floorSvg').forEach(s => {
        s.classList.toggle('active', s.dataset.floor === state.floor);
      });
      planEl.classList.toggle('flipped', state.unit !== unitKeys[0]);
    }

    // const floorLabel = state.floor === 'ground' ? 'Ground floor' :
    //   state.floor === 'first' ? 'First floor' : 'Top floor';
    // titleEl.innerHTML = 'Plan No. <b>' + planCode + ' · ' + state.unit + '</b> · ' + floorLabel;

    floorTitleEl.innerHTML = 'Unit ' + state.unit + ' - ' + d.title;
    floorSubEl.textContent = d.subtitle + ' · ' + d.height + ' ceiling height';

    roomListEl.innerHTML = d.rooms.map(r =>
      '<div class="rm" data-room="' + r.ix + '"><span class="ix">' + r.ix + '</span>' +
      '<span class="nm">' + r.name + '<small>' + r.sub + '</small></span>' +
      '<span class="sz">' + r.size + '</span></div>'
    ).join('');

  }

  function setHover(num, on) {
    document.querySelectorAll('.rm[data-room="' + num + '"]').forEach(el => el.classList.toggle('hover', on));
    document.querySelectorAll('.roomOverlay path[data-room="' + num + '"]').forEach(el => el.classList.toggle('hover', on));
  }

  roomListEl.addEventListener('mouseover', e => {
    const rm = e.target.closest('.rm');
    if (rm) setHover(rm.dataset.room, true);
  });
  roomListEl.addEventListener('mouseout', e => {
    const rm = e.target.closest('.rm');
    if (rm) setHover(rm.dataset.room, false);
  });

  planEl.addEventListener('mouseover', e => {
    const path = e.target.closest('.roomOverlay path');
    if (path) setHover(path.dataset.room, true);
  });
  planEl.addEventListener('mouseout', e => {
    const path = e.target.closest('.roomOverlay path');
    if (path) setHover(path.dataset.room, false);
  });

  document.querySelectorAll('.tab[data-unit]').forEach(t => {
    t.addEventListener('click', () => { state.unit = t.dataset.unit; render(); });
  });
  document.querySelectorAll('.tab[data-floor]').forEach(t => {
    t.addEventListener('click', () => { state.floor = t.dataset.floor; render(); });
  });

  // Mobile dropdowns
  const unitSelect = document.getElementById('unitSelect');
  const floorSelect = document.getElementById('floorSelect');
  if (unitSelect) unitSelect.addEventListener('change', () => { state.unit = unitSelect.value; render(); });
  if (floorSelect) floorSelect.addEventListener('change', () => { state.floor = floorSelect.value; render(); });

  // Keep dropdowns in sync when tabs change state
  const _render = render;
  render = function() {
    _render();
    if (unitSelect) unitSelect.value = state.unit;
    if (floorSelect) floorSelect.value = state.floor;
  };

  // Swipe to change floor — with slide animation
  let swipeStartX = 0, swipeCurrent = 0, swipeActive = false;

  function slideTransition(direction, callback) {
    // direction: -1 = slide left (next), 1 = slide right (prev)
    planEl.style.transition = 'transform 0.28s cubic-bezier(.4,0,.2,1)';
    planEl.style.transform = 'translateX(' + (direction * -110) + '%)';
    planEl.addEventListener('transitionend', function onEnd() {
      planEl.removeEventListener('transitionend', onEnd);
      planEl.style.transition = 'none';
      planEl.style.transform = 'translateX(' + (direction * 110) + '%)';
      callback();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          planEl.style.transition = 'transform 0.28s cubic-bezier(.4,0,.2,1)';
          planEl.style.transform = '';
        });
      });
      planEl.addEventListener('transitionend', function onEnd2() {
        planEl.removeEventListener('transitionend', onEnd2);
        planEl.style.transition = '';
        planEl.style.transform = '';
      });
    });
  }

  planEl.addEventListener('touchstart', e => {
    swipeStartX = e.touches[0].clientX;
    swipeCurrent = swipeStartX;
    swipeActive = true;
  }, { passive: true });

  planEl.addEventListener('touchmove', e => {
    if (!swipeActive) return;
    swipeCurrent = e.touches[0].clientX;
    const dx = swipeCurrent - swipeStartX;
    planEl.style.transform = 'translateX(' + dx + 'px)';
  }, { passive: true });

  planEl.addEventListener('touchend', () => {
    swipeActive = false;
    const dx = swipeCurrent - swipeStartX;
    if (Math.abs(dx) < 50) {
      planEl.style.transition = 'transform 0.2s ease';
      planEl.style.transform = '';
      planEl.addEventListener('transitionend', function onSnap() {
        planEl.removeEventListener('transitionend', onSnap);
        planEl.style.transition = '';
      });
      return;
    }
    const floors = config.floors;
    const idx = floors.indexOf(state.floor);
    const next = dx < 0 ? Math.min(idx + 1, floors.length - 1) : Math.max(idx - 1, 0);
    if (next === idx) {
      planEl.style.transition = 'transform 0.2s ease';
      planEl.style.transform = '';
      planEl.addEventListener('transitionend', function onSnap() {
        planEl.removeEventListener('transitionend', onSnap);
        planEl.style.transition = '';
      });
      return;
    }
    const dir = dx < 0 ? 1 : -1;
    planEl.style.transition = 'transform 0.22s cubic-bezier(.4,0,.2,1)';
    planEl.style.transform = 'translateX(' + (dx < 0 ? -110 : 110) + '%)';
    planEl.addEventListener('transitionend', function onOut() {
      planEl.removeEventListener('transitionend', onOut);
      state.floor = floors[next];
      render();
      planEl.style.transition = 'none';
      planEl.style.transform = 'translateX(' + (dx < 0 ? 110 : -110) + '%)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        planEl.style.transition = 'transform 0.28s cubic-bezier(.4,0,.2,1)';
        planEl.style.transform = '';
        planEl.addEventListener('transitionend', function onIn() {
          planEl.removeEventListener('transitionend', onIn);
          planEl.style.transition = '';
        });
      }));
    });
  }, { passive: true });

  render();
})();
