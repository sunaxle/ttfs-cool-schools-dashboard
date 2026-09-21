/**
 * Tree Diary & Living Tree Legacy Application Logic
 * TTFS × UTRGV Project Cool Schools
 * Zero PII Architecture • COPPA/FERPA Compliant
 */

(function () {
  'use strict';

  const TREE_DATA = [
    {
      id: 'TR-2026-01',
      campus: 'donna_caceres',
      campusName: 'Donna ISD — J.W. Caceres Discovery',
      species: 'Montezuma Cypress (Taxodium mucronatum)',
      commonName: 'Ahuehuete / Montezuma Cypress',
      plantYear: 2026,
      currentName: 'The Great Green Giant',
      baseHeight: 6.5,
      growthRateHeight: 2.8, // ft/yr
      baseCaliper: 1.5,
      growthRateCaliper: 0.75, // in/yr
      baseShade: 4.0,
      growthRateShade: 2.2, // ft/yr
      coolingCoeff: 0.35, // deg F per yr
      cohorts: [
        { year: '2026–2027', name: 'The Great Green Giant', group: '3rd Grade Discovery Cohort (Room 104)', notes: 'Planted on Arbor Day! We poured 5 gallons of water and spread cedar mulch.' }
      ],
      observations: [
        { date: '2026-09-08', classGroup: '4th Grade Science (Room 102)', soil: 'Just damp like a wrung sponge', leaves: 'Vibrant Dark Green', wildlife: 'Monarch butterfly resting on top branch', notes: 'Tree looks healthy after recent rain shower.' },
        { date: '2026-08-20', classGroup: 'Lead Eco-Team (Room 104)', soil: 'Dry like a cracker', leaves: 'Lime Green (New Growth)', wildlife: 'Green anole on bark', notes: 'Completed morning bucket watering quest.' }
      ]
    },
    {
      id: 'TR-2026-02',
      campus: 'donna_caceres',
      campusName: 'Donna ISD — J.W. Caceres Discovery',
      species: 'Texas Ebony (Ebenopsis ebano)',
      commonName: 'Texas Ebony',
      plantYear: 2026,
      currentName: 'Shadow Guardian',
      baseHeight: 5.0,
      growthRateHeight: 1.6,
      baseCaliper: 1.2,
      growthRateCaliper: 0.45,
      baseShade: 3.5,
      growthRateShade: 1.8,
      coolingCoeff: 0.28,
      cohorts: [
        { year: '2026–2027', name: 'Shadow Guardian', group: '4th Grade Trailblazers (Room 201)', notes: 'Named because it will guard the outdoor basketball court with shade!' }
      ],
      observations: [
        { date: '2026-09-02', classGroup: '5th Grade Science (Room 205)', soil: 'Just damp like a wrung sponge', leaves: 'Dark Glossy Green', wildlife: 'Honeybees buzzing on blossoms', notes: 'Sweet-smelling cream blossoms spotted.' }
      ]
    },
    {
      id: 'TR-2026-03',
      campus: 'donna_rivas',
      campusName: 'Donna ISD — M. Rivas Primary',
      species: 'Anacua / Sugarberry (Ehretia anacua)',
      commonName: 'Sandpaper Tree (Anacua)',
      plantYear: 2026,
      currentName: 'Sparkle Leaf',
      baseHeight: 5.5,
      growthRateHeight: 2.0,
      baseCaliper: 1.3,
      growthRateCaliper: 0.55,
      baseShade: 3.8,
      growthRateShade: 2.0,
      coolingCoeff: 0.30,
      cohorts: [
        { year: '2026–2027', name: 'Sparkle Leaf', group: 'Kinder & 1st Grade Sprouts (Room 12)', notes: 'The leaves feel rough like sandpaper, so we loved touching them gently.' }
      ],
      observations: [
        { date: '2026-09-10', classGroup: '1st Grade Explorers (Room 14)', soil: 'Just damp like a wrung sponge', leaves: 'Rough Deep Green', wildlife: 'Ladybugs on lower trunk', notes: 'Measured height using student meter sticks.' }
      ]
    },
    {
      id: 'TR-2026-04',
      campus: 'mercedes_travis',
      campusName: 'Mercedes ISD — Travis Elementary',
      species: 'Live Oak (Quercus virginiana)',
      commonName: 'Southern Live Oak',
      plantYear: 2026,
      currentName: 'The Mighty Acorn',
      baseHeight: 6.0,
      growthRateHeight: 2.2,
      baseCaliper: 1.5,
      growthRateCaliper: 0.60,
      baseShade: 4.5,
      growthRateShade: 2.5,
      coolingCoeff: 0.38,
      cohorts: [
        { year: '2026–2027', name: 'The Mighty Acorn', group: '5th Grade Science Club (Room 302)', notes: 'Planted on the east playground perimeter.' }
      ],
      observations: [
        { date: '2026-09-05', classGroup: '5th Grade Science Club', soil: 'Just damp like a wrung sponge', leaves: 'Vibrant Dark Green', wildlife: 'Blue jay resting on branch', notes: 'New root mulch ring inspected.' }
      ]
    }
  ];

  let currentTreeIndex = 0;

  // DOM Elements
  const campusSelect = document.getElementById('campusSelect');
  const treeListContainer = document.getElementById('treeListContainer');
  const treeCountPill = document.getElementById('treeCountPill');
  const activeTreeTitle = document.getElementById('activeTreeTitle');
  const activeTreeMeta = document.getElementById('activeTreeMeta');
  const growthSlider = document.getElementById('growthSlider');
  const currentYearLabel = document.getElementById('currentYearLabel');
  const canopyBlob = document.getElementById('canopyBlob');
  const trunkBar = document.getElementById('trunkBar');
  const statHeight = document.getElementById('statHeight');
  const statCaliper = document.getElementById('statCaliper');
  const statShade = document.getElementById('statShade');
  const statCooling = document.getElementById('statCooling');
  const cohortTimeline = document.getElementById('cohortTimeline');
  const observationsTableBody = document.getElementById('observationsTableBody');
  
  // Modal Elements
  const openLogModalBtn = document.getElementById('openLogModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const logModal = document.getElementById('logModal');
  const observationForm = document.getElementById('observationForm');
  const printReportBtn = document.getElementById('printReportBtn');

  function renderTreeList(filterCampus = 'all') {
    treeListContainer.innerHTML = '';
    const filtered = TREE_DATA.filter(t => filterCampus === 'all' || t.campus === filterCampus);
    treeCountPill.textContent = `${filtered.length} Trees Logged`;

    filtered.forEach((tree, idx) => {
      const realIndex = TREE_DATA.findIndex(t => t.id === tree.id);
      const card = document.createElement('div');
      card.className = `tree-card-item ${realIndex === currentTreeIndex ? 'active' : ''}`;
      card.setAttribute('role', 'listitem');
      card.innerHTML = `
        <span class="tag-badge">Tag #${tree.id}</span>
        <h4>${tree.currentName}</h4>
        <p>${tree.commonName} • ${tree.campusName.split('—')[1] || tree.campusName}</p>
      `;
      card.addEventListener('click', () => {
        currentTreeIndex = realIndex;
        renderActiveTree();
        renderTreeList(campusSelect.value);
      });
      treeListContainer.appendChild(card);
    });
  }

  function updateGrowthVisualizer(yearsPassed) {
    const tree = TREE_DATA[currentTreeIndex];
    if (!tree) return;

    const currentYear = tree.plantYear + parseInt(yearsPassed, 10);
    currentYearLabel.textContent = `Year ${yearsPassed} (${currentYear})`;

    const height = (tree.baseHeight + tree.growthRateHeight * yearsPassed).toFixed(1);
    const caliper = (tree.baseCaliper + tree.growthRateCaliper * yearsPassed).toFixed(1);
    const shade = (tree.baseShade + tree.growthRateShade * yearsPassed).toFixed(1);
    const cooling = (tree.coolingCoeff * (yearsPassed + 1) * -1).toFixed(1);

    statHeight.textContent = `${height} ft`;
    statCaliper.textContent = `${caliper} in`;
    statShade.textContent = `${shade} ft`;
    statCooling.textContent = `${cooling}°F`;

    // Visual scale adjustments
    const scaleFactor = 1 + yearsPassed * 0.12;
    canopyBlob.style.width = `${Math.min(160, 60 * scaleFactor)}px`;
    canopyBlob.style.height = `${Math.min(130, 60 * scaleFactor)}px`;
    trunkBar.style.height = `${Math.min(90, 40 * scaleFactor)}px`;
    trunkBar.style.width = `${Math.min(26, 10 + yearsPassed * 1.5)}px`;
  }

  function renderActiveTree() {
    const tree = TREE_DATA[currentTreeIndex];
    if (!tree) return;

    activeTreeTitle.textContent = `${tree.currentName} (Tag #${tree.id})`;
    activeTreeMeta.textContent = `Species: ${tree.species} • Campus: ${tree.campusName} • Planted: Fall ${tree.plantYear}`;

    // Reset slider to 0
    growthSlider.value = 0;
    updateGrowthVisualizer(0);

    // Render Cohorts
    cohortTimeline.innerHTML = '';
    tree.cohorts.forEach(c => {
      const item = document.createElement('div');
      item.className = 'cohort-timeline-item';
      item.innerHTML = `
        <div class="cohort-year-badge">${c.year}</div>
        <div class="cohort-details">
          <h4>"${c.name}" — Named by ${c.group}</h4>
          <p>${c.notes}</p>
        </div>
      `;
      cohortTimeline.appendChild(item);
    });

    // Render Observations Table
    observationsTableBody.innerHTML = '';
    tree.observations.forEach(o => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${o.date}</strong></td>
        <td>${o.classGroup}</td>
        <td>${o.soil}</td>
        <td>${o.leaves}</td>
        <td>${o.wildlife || '—'}</td>
        <td>${o.notes || '—'}</td>
      `;
      observationsTableBody.appendChild(tr);
    });
  }

  // Event Listeners
  campusSelect.addEventListener('change', (e) => {
    renderTreeList(e.target.value);
  });

  growthSlider.addEventListener('input', (e) => {
    updateGrowthVisualizer(e.target.value);
  });

  openLogModalBtn.addEventListener('click', () => {
    logModal.classList.remove('hidden');
  });

  const closeModal = () => logModal.classList.add('hidden');
  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);

  observationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tree = TREE_DATA[currentTreeIndex];
    const newObs = {
      date: new Date().toISOString().split('T')[0],
      classGroup: document.getElementById('obsClass').value,
      soil: document.getElementById('obsSoil').value,
      leaves: document.getElementById('obsLeaves').value,
      wildlife: document.getElementById('obsWildlife').value,
      notes: document.getElementById('obsNotes').value
    };

    tree.observations.unshift(newObs);
    if (window.CoolSchoolsOffline) {
      window.CoolSchoolsOffline.saveObservation({
        treeId: tree.id,
        campus: tree.campus,
        ...newObs
      });
    }
    renderActiveTree();
    closeModal();
    observationForm.reset();
  });

  printReportBtn.addEventListener('click', () => {
    window.print();
  });

  // Initial Boot
  renderTreeList('all');
  renderActiveTree();
})();
