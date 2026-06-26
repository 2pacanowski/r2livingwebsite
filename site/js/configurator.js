(function () {
  const floorData = {
    ground: {
      title: 'Ground <em>floor</em>',
      subtitle: '73,87 m² useable',
      rooms: [
        { ix: '01', name: 'Entrance hall', sub: 'with large wardrobe & sitting area', size: '4,45 m²' },
        { ix: '02', name: 'Living & dining room', sub: 'open-space layout', size: '36,72 m²' },
        { ix: '03', name: 'Kitchen', sub: 'with peninsula & sitting', size: '9,80 m²' },
        { ix: '04', name: 'Extra room', sub: 'convert to study or guest bedroom', size: '9,87 m²' },
        { ix: '05', name: 'Corridor', sub: 'with storage space', size: '2,81 m²' },
        { ix: '06', name: 'Storage', sub: 'exterior access', size: '6,59 m²' },
        { ix: '07', name: 'Bathroom', sub: 'with shower', size: '3,63 m²' },
        { ix: '08', name: 'Staircase', sub: '', size: '6,06 m²' }
      ],
      walls: 5,
      wets: 3
    },
    first: {
      title: 'First <em>floor</em>',
      subtitle: '68,84 m² useable + 6,32 m² balcony',
      rooms: [
        { ix: '01', name: 'Hall', sub: 'with balcony access', size: '10,78 m²' },
        { ix: '02', name: 'Master bedroom', sub: 'ensuite + walk-in wardrobe', size: '16,94 m²' },
        { ix: '03', name: 'Bathroom 1', sub: 'attached to master bedroom', size: '3,88 m²' },
        { ix: '04', name: 'Bathroom 2', sub: 'with shower and bathtub', size: '7,63 m²' },
        { ix: '05', name: 'Bedroom 1', sub: 'with movable wall', size: '11,68 m²' },
        { ix: '06', name: 'Bedroom 2', sub: 'with movable wall', size: '12,21 m²' },
        { ix: '07', name: 'Laundry room', sub: 'with sink & washing machine', size: '3,10 m²' },
        { ix: '08', name: 'Staircase', sub: '', size: '5,73 m²' },
        { ix: '09', name: 'Walk-in wardrobe', sub: 'attached to master bedroom', size: '3,62 m²' }
      ],
      walls: 4,
      wets: 2
    },
    top: {
      title: 'Top <em>floor</em>',
      subtitle: '8,33 m² useable',
      rooms: [
        { ix: '01', name: 'Staircase', sub: '', size: '5,76 m²' },
        { ix: '02', name: 'Utility room', sub: 'HVAC and heating equipment', size: '7,31 m²' },
        { ix: '03', name: 'Corridor', sub: '    ', size: '1,02 m²' }
      ],
      walls: 2,
      wets: 1
    }
  };

  const state = { unit: 'A', floor: 'ground' };
  const planEl = document.getElementById('configPlan');
  const planCode = planEl.dataset.planCode || 'PZK-14';
  const planMode = planEl.dataset.planMode || 'inline';
  const titleEl = document.getElementById('planTitle');
  const floorTitleEl = document.getElementById('floorTitle');
  const floorSubEl = document.getElementById('floorSubtitle');
  const roomListEl = document.getElementById('roomList');
  const wallEl = document.getElementById('wallCount');
  const wetEl = document.getElementById('wetCount');

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

    if (planMode === 'image') {
      document.querySelectorAll('.floorSvg').forEach(img => {
        const active = img.dataset.floor === state.floor;
        img.classList.toggle('active', active);
        if (active) img.src = 'assets/wspolna-floor-plans/wspolna-unit' + state.unit + '-' + state.floor + '.svg';
      });
    } else {
      document.querySelectorAll('.floorSvg').forEach(s => {
        s.classList.toggle('active', s.dataset.floor === state.floor);
      });
      planEl.classList.toggle('flipped', state.unit === 'B');
    }

    // const floorLabel = state.floor === 'ground' ? 'Ground floor' :
    //   state.floor === 'first' ? 'First floor' : 'Top floor';
    // titleEl.innerHTML = 'Plan No. <b>' + planCode + ' · ' + state.unit + '</b> · ' + floorLabel;

    const d = floorData[state.floor];
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
