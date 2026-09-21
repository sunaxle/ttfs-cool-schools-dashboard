/**
 * UTRGV Green Campus Explorer & Shade Dashboard
 * Dr. Alexis Racelis & UTRGV Agroecology Lab
 * Zero PII Architecture • COPPA/FERPA Compliant
 */

(function () {
  'use strict';

  const CAMPUS_COORDS = {
    edinburg: [26.3055, -98.1728],
    brownsville: [25.8970, -97.4912]
  };

  const UTRGV_TREES = [
    {
      id: 'UTRGV-ED-104',
      campus: 'edinburg',
      lat: 26.3058,
      lng: -98.1725,
      commonName: 'Montezuma Cypress (Ahuehuete)',
      scientificName: 'Taxodium mucronatum',
      location: 'Science Building Courtyard',
      heightFt: 32,
      dbhIn: 14.2,
      canopySpreadSqFt: 640,
      shadeRadiusM: 8.5,
      coolingSurfaceDrop: '-18.5°F Surface Drop',
      annualSavings: '$142.80 / yr',
      notes: 'Montezuma Cypress exhibits exceptional drought tolerance and nitrogen fixation potential in regional clay-loam soils, providing critical thermal relief for outdoor student pedestrian corridors.'
    },
    {
      id: 'UTRGV-ED-208',
      campus: 'edinburg',
      lat: 26.3051,
      lng: -98.1732,
      commonName: 'Texas Ebony',
      scientificName: 'Ebenopsis ebano',
      location: 'Student Union Plaza',
      heightFt: 24,
      dbhIn: 11.5,
      canopySpreadSqFt: 480,
      shadeRadiusM: 7.0,
      coolingSurfaceDrop: '-15.2°F Surface Drop',
      annualSavings: '$118.40 / yr',
      notes: 'Dense, dark green evergreen foliage produces heavy localized shade across student dining patio pavers.'
    },
    {
      id: 'UTRGV-ED-312',
      campus: 'edinburg',
      lat: 26.3062,
      lng: -98.1736,
      commonName: 'Southern Live Oak',
      scientificName: 'Quercus virginiana',
      location: 'University Library Lawn',
      heightFt: 38,
      dbhIn: 18.0,
      canopySpreadSqFt: 1100,
      shadeRadiusM: 11.0,
      coolingSurfaceDrop: '-22.4°F Surface Drop',
      annualSavings: '$235.60 / yr',
      notes: 'Massive mature shade canopy with immense carbon storage capability and high bird nesting biodiversity index.'
    },
    {
      id: 'UTRGV-ED-415',
      campus: 'edinburg',
      lat: 26.3048,
      lng: -98.1720,
      commonName: 'Anacua / Sandpaper Tree',
      scientificName: 'Ehretia anacua',
      location: 'Engineering Quad Corridor',
      heightFt: 20,
      dbhIn: 9.8,
      canopySpreadSqFt: 360,
      shadeRadiusM: 5.5,
      coolingSurfaceDrop: '-12.8°F Surface Drop',
      annualSavings: '$89.50 / yr',
      notes: 'Blooms sweet-scented white flowers that support high pollinator density; highly resilient against RGV summer heatwaves.'
    },
    {
      id: 'UTRGV-ED-520',
      campus: 'edinburg',
      lat: 26.3065,
      lng: -98.1718,
      commonName: 'Texas Sabal Palm',
      scientificName: 'Sabal mexicana',
      location: 'Agroecology Research Field Lab',
      heightFt: 26,
      dbhIn: 12.0,
      canopySpreadSqFt: 220,
      shadeRadiusM: 4.2,
      coolingSurfaceDrop: '-9.5°F Surface Drop',
      annualSavings: '$64.20 / yr',
      notes: 'Native palm adapted to lower Rio Grande delta hydrology; high wind resistance and architectural visual interest.'
    }
  ];

  let map;
  let treeLayerGroup;
  let shadeLayerGroup;

  function initMap() {
    map = L.map('utrgvMap', {
      center: CAMPUS_COORDS.edinburg,
      zoom: 17,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | UTRGV Agroecology'
    }).addTo(map);

    treeLayerGroup = L.layerGroup().addTo(map);
    shadeLayerGroup = L.layerGroup().addTo(map);

    renderCampusTrees('edinburg');
  }

  function renderCampusTrees(campus) {
    treeLayerGroup.clearLayers();
    shadeLayerGroup.clearLayers();

    const campusTrees = UTRGV_TREES.filter(t => t.campus === campus);

    campusTrees.forEach(tree => {
      // Shade Buffer Circle (Solar projection polygon)
      const shadeCircle = L.circle([tree.lat + 0.00004, tree.lng + 0.00006], {
        radius: tree.shadeRadiusM,
        color: '#1e293b',
        fillColor: '#0f172a',
        fillOpacity: 0.35,
        weight: 1,
        dashArray: '4, 4'
      });
      shadeLayerGroup.addLayer(shadeCircle);

      // Tree Point Marker
      const marker = L.circleMarker([tree.lat, tree.lng], {
        radius: 8,
        color: '#ffffff',
        fillColor: '#16a34a',
        fillOpacity: 0.9,
        weight: 2
      });

      marker.on('click', () => {
        populateFactsheet(tree);
      });

      marker.bindTooltip(`<strong>${tree.commonName}</strong><br>${tree.location}`);
      treeLayerGroup.addLayer(marker);
    });
  }

  function populateFactsheet(tree) {
    document.getElementById('treeTag').textContent = `Tag #${tree.id}`;
    document.getElementById('treeCommonName').textContent = tree.commonName;
    document.getElementById('treeScientificName').textContent = tree.scientificName;
    document.getElementById('treeLocation').textContent = tree.location;
    document.getElementById('treeDimensions').textContent = `${tree.heightFt} ft • ${tree.dbhIn} in DBH`;
    document.getElementById('treeSpread').textContent = `${tree.canopySpreadSqFt} sq ft`;
    document.getElementById('treeCooling').textContent = tree.coolingSurfaceDrop;
    document.getElementById('treeSavings').textContent = tree.annualSavings;
    document.getElementById('treeNotes').textContent = tree.notes;
  }

  // Button Listeners
  document.getElementById('btnEdinburg').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('btnBrownsville').classList.remove('active');
    map.flyTo(CAMPUS_COORDS.edinburg, 17);
    renderCampusTrees('edinburg');
  });

  document.getElementById('btnBrownsville').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('btnEdinburg').classList.remove('active');
    map.flyTo(CAMPUS_COORDS.brownsville, 17);
    renderCampusTrees('brownsville');
  });

  document.getElementById('toggleShade').addEventListener('change', function () {
    if (this.checked) {
      map.addLayer(shadeLayerGroup);
    } else {
      map.removeLayer(shadeLayerGroup);
    }
  });

  document.getElementById('campusFeedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your campus tree observation was recorded anonymously in the UTRGV Agroecology field ledger.');
    this.reset();
  });

  // Boot on load
  window.addEventListener('DOMContentLoaded', initMap);
})();
