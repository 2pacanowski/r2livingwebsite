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
  const wallEl = document.getElementById('wallCount');
  const wetEl = document.getElementById('wetCount');

  const state = { unit: unitKeys[0], floor: config.floors[0] };

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
    } else {
      document.querySelectorAll('.floorSvg').forEach(s => {
        s.classList.toggle('active', s.dataset.floor === state.floor);
      });
      planEl.classList.toggle('flipped', state.unit !== unitKeys[0]);
    }

    // const floorLabel = state.floor === 'ground' ? 'Ground floor' :
    //   state.floor === 'first' ? 'First floor' : 'Top floor';
    // titleEl.innerHTML = 'Plan No. <b>' + planCode + ' · ' + state.unit + '</b> · ' + floorLabel;

    floorTitleEl.innerHTML = d.title;
    floorSubEl.textContent = 'Unit ' + state.unit + ' · ' + d.subtitle;

    roomListEl.innerHTML = d.rooms.map(r =>
      '<div class="rm"><span class="ix">' + r.ix + '</span>' +
      '<span class="nm">' + r.name + '<small>' + r.sub + '</small></span>' +
      '<span class="sz">' + r.size + '</span></div>'
    ).join('');

    wallEl.textContent = d.walls;
    wetEl.textContent = d.wets;
  }

  document.querySelectorAll('.tab[data-unit]').forEach(t => {
    t.addEventListener('click', () => { state.unit = t.dataset.unit; render(); });
  });
  document.querySelectorAll('.tab[data-floor]').forEach(t => {
    t.addEventListener('click', () => { state.floor = t.dataset.floor; render(); });
  });

  render();
})();
