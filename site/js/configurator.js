(function () {
  const floorData = {
    ground: {
      title: 'Ground <em>floor</em>',
      subtitle: '92 m² useable · 12 m² carport',
      rooms: [
        { ix: '01', name: 'Entrance', sub: 'with double-height ceiling', size: '6 m²' },
        { ix: '02', name: 'Cloakroom', sub: 'movable wall to entry', size: '4 m²' },
        { ix: '03', name: 'WC', sub: 'relocatable wet point', size: '3 m²' },
        { ix: '04', name: 'Utility', sub: 'boiler, laundry', size: '5 m²' },
        { ix: '05', name: 'Kitchen', sub: 'island option', size: '14 m²' },
        { ix: '06', name: 'Living · dining', sub: 'south-facing, full-height glazing', size: '38 m²' },
        { ix: '07', name: 'Stairs · hall', sub: 'circulation', size: '22 m²' }
      ],
      walls: 5,
      wets: 3
    },
    first: {
      title: 'First <em>floor</em>',
      subtitle: '74 m² useable · 8 m² balcony',
      rooms: [
        { ix: '01', name: 'Master bedroom', sub: 'south, garden view', size: '18 m²' },
        { ix: '02', name: 'Master ensuite', sub: 'walk-in shower', size: '5 m²' },
        { ix: '03', name: 'Walk-in robe', sub: 'optional · convert to study', size: '4 m²' },
        { ix: '04', name: 'Bedroom 02', sub: 'front, balcony access', size: '12 m²' },
        { ix: '05', name: 'Bedroom 03', sub: 'front, balcony access', size: '11 m²' },
        { ix: '06', name: 'Family bathroom', sub: 'bath + shower', size: '7 m²' },
        { ix: '07', name: 'Landing · stairs', sub: 'circulation', size: '17 m²' }
      ],
      walls: 4,
      wets: 2
    },
    top: {
      title: 'Top <em>floor</em>',
      subtitle: '18 m² interior · 42 m² rooftop terrace',
      rooms: [
        { ix: '01', name: 'Flex · studio', sub: 'office, guest room, gym', size: '14 m²' },
        { ix: '02', name: 'Bathroom', sub: 'shower only', size: '4 m²' },
        { ix: '03', name: 'Rooftop terrace', sub: 'south-facing, planters retained', size: '42 m²' }
      ],
      walls: 2,
      wets: 1
    }
  };

  const state = { unit: 'A', floor: 'ground' };
  const planEl = document.getElementById('configPlan');
  const planCode = planEl.dataset.planCode || 'PZK-14';
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

    document.querySelectorAll('.floorSvg').forEach(s => {
      s.classList.toggle('active', s.dataset.floor === state.floor);
    });

    planEl.classList.toggle('flipped', state.unit === 'B');

    const floorLabel = state.floor === 'ground' ? 'Ground floor' :
      state.floor === 'first' ? 'First floor' : 'Top floor';
    titleEl.innerHTML = 'Plan No. <b>' + planCode + ' · ' + state.unit + '</b> · ' + floorLabel;

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
