/**
 * Campus Tree Adoption & Environmental ROI Calculator Controller (sponsorship_portal.js)
 * Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools
 * Zero PII • Strict IIFE • USDA i-Tree Eco Math Engine • Dual-Platform Print Certificate
 */

(function (window, document) {
  'use strict';

  // 1. Native South Texas Species Profiles
  const SPECIES_PROFILES = {
    "Texas Live Oak": {
      botanical: "Quercus virginiana",
      emoji: "🌳",
      growthRateFt: 2.2,
      maxRadiusFt: 35,
      baseRadiusFt: 4.5,
      laiFactor: 4.8,
      co2Factor: 0.42,
      dbhGrowthIn: 0.85
    },
    "Honey Mesquite": {
      botanical: "Prosopis glandulosa",
      emoji: "🌿",
      growthRateFt: 1.8,
      maxRadiusFt: 22,
      baseRadiusFt: 3.5,
      laiFactor: 3.8,
      co2Factor: 0.35,
      dbhGrowthIn: 0.65
    },
    "Texas Ebony": {
      botanical: "Ebenopsis ebano",
      emoji: "🌳",
      growthRateFt: 1.5,
      maxRadiusFt: 20,
      baseRadiusFt: 3.0,
      laiFactor: 4.6,
      co2Factor: 0.38,
      dbhGrowthIn: 0.55
    },
    "Montezuma Cypress": {
      botanical: "Taxodium mucronatum",
      emoji: "🌲",
      growthRateFt: 3.2,
      maxRadiusFt: 40,
      baseRadiusFt: 5.0,
      laiFactor: 5.2,
      co2Factor: 0.55,
      dbhGrowthIn: 1.10
    },
    "Cedar Elm": {
      botanical: "Ulmus crassifolia",
      emoji: "🌳",
      growthRateFt: 2.0,
      maxRadiusFt: 26,
      baseRadiusFt: 3.8,
      laiFactor: 4.2,
      co2Factor: 0.39,
      dbhGrowthIn: 0.75
    },
    "Anacua": {
      botanical: "Ehretia anacua",
      emoji: "🍃",
      growthRateFt: 1.6,
      maxRadiusFt: 18,
      baseRadiusFt: 3.0,
      laiFactor: 4.1,
      co2Factor: 0.33,
      dbhGrowthIn: 0.60
    },
    "Mexican Sycamore": {
      botanical: "Platanus mexicana",
      emoji: "🌳",
      growthRateFt: 3.0,
      maxRadiusFt: 38,
      baseRadiusFt: 4.5,
      laiFactor: 4.9,
      co2Factor: 0.48,
      dbhGrowthIn: 1.05
    },
    "Retama": {
      botanical: "Parkinsonia aculeata",
      emoji: "🪴",
      growthRateFt: 2.5,
      maxRadiusFt: 16,
      baseRadiusFt: 2.5,
      laiFactor: 3.2,
      co2Factor: 0.28,
      dbhGrowthIn: 0.80
    }
  };

  // Sample Anonymous Stewards (Zero PII - Families, PTAs, Homerooms)
  const SAMPLE_STEWARDS = [
    { name: "The Treviño Family", note: "Dedicated to the future scientists of Donna ISD." },
    { name: "Room 4-B Monarchs", note: "Planted and adopted during Earth Month science lab." },
    { name: "The Garcia Family", note: "In memory of our grandparents and RGV agricultural roots." },
    { name: "Donna High Environmental Club", note: "Building schoolyard shade for the next generation." },
    { name: "The Martinez Family", note: "May this tree grow tall and shade students for decades." },
    { name: "Mercedes ISD Alumni Association", note: "Dedicated to student health and environmental literacy." },
    { name: "RGV Wildlife Alliance", note: "Supporting native thornscrub pollinator habitat." },
    { name: "The Hernandez Family", note: "Proudly supporting Project Cool Schools outdoor labs." }
  ];

  // Adjectives and Nouns for Fun Community Tree Nicknames
  const ADJECTIVES = ["Mighty", "Ancient", "Wise", "Brave", "Joyful", "Golden", "Noble", "Dancing", "Sunlit", "Resilient", "Gentle"];
  const NOUNS = ["Live Oak", "Sentinel", "Guardian", "Ebony", "Cypress", "Champion", "Sapling", "Protector", "Friend"];

  // Generate Base Campus Tree Roster
  function generateTreeInventory() {
    const campuses = [
      { id: "donna_rivas", name: "Jason M. Rivas Elementary", district: "Donna ISD", lat: 26.1668, lng: -98.0705, zones: ["West Playground Cluster", "Kinder Courtyard Grove", "Bus Drop-off Bioswale", "East Sports Field Perimeter"] },
      { id: "donna_garza", name: "Garza Elementary", district: "Donna ISD", lat: 26.1712, lng: -98.0621, zones: ["Main Plaza Shade Ring", "Science Garden", "South Playground"] },
      { id: "donna_singleterry", name: "Singleterry Elementary", district: "Donna ISD", lat: 26.1584, lng: -98.0543, zones: ["Outdoor Classroom Grove", "North Fence Line", "Playground Border"] },
      { id: "donna_salinas", name: "Salinas Elementary", district: "Donna ISD", lat: 26.1820, lng: -98.0812, zones: ["Courtyard Canopy", "East Field Pocket Forest"] },
      { id: "donna_solis", name: "Solis Elementary", district: "Donna ISD", lat: 26.1645, lng: -98.0934, zones: ["South Courtyard", "Walkway Shade Corridor"] },
      { id: "donna_ochoa", name: "Ochoa Elementary", district: "Donna ISD", lat: 26.1498, lng: -98.0776, zones: ["Kindergarten Play Area", "Central Quad"] },
      { id: "donna_stainke", name: "Stainke Elementary", district: "Donna ISD", lat: 26.1755, lng: -98.0467, zones: ["East Playground", "Nature Trail Entrance"] },
      { id: "donna_jw_caceres", name: "J.W. Caceres Elementary", district: "Donna ISD", lat: 26.1532, lng: -98.0655, zones: ["West Meadow", "Cafeteria Patio Shade"] },
      { id: "mercedes_travis", name: "Travis Elementary", district: "Mercedes ISD", lat: 26.1492, lng: -97.9154, zones: ["Cypress Retention Basin", "North Lawn Grove", "Playground Canopy"] },
      { id: "mercedes_chacon", name: "Chacon Elementary", district: "Mercedes ISD", lat: 26.1558, lng: -97.9231, zones: ["Ebony Learning Grove", "South Playground", "Bus Loop"] },
      { id: "mercedes_harrell", name: "Harrell Elementary", district: "Mercedes ISD", lat: 26.1421, lng: -97.9087, zones: ["Sports Field Line", "Outdoor Lab Quad"] },
      { id: "mercedes_hinojosa", name: "Hinojosa Elementary", district: "Mercedes ISD", lat: 26.1610, lng: -97.9345, zones: ["Central Lawn", "East Fence Habitat Corridor"] },
      { id: "mercedes_high", name: "Mercedes High School", district: "Mercedes ISD", lat: 26.1385, lng: -97.9189, zones: ["Agroforestry Research Plot", "Stadium Concourse", "Alumni Memorial Grove"] },
      { id: "mercedes_academy", name: "Mercedes Academic Academy", district: "Mercedes ISD", lat: 26.1465, lng: -97.9280, zones: ["Courtyard Shade", "Front Walkway"] }
    ];

    const speciesList = Object.keys(SPECIES_PROFILES);
    const trees = [];
    let globalTreeCounter = 1;

    // Load any existing adopted trees from localStorage
    const savedAdoptions = JSON.parse(localStorage.getItem('ttfs_adopted_trees') || '{}');

    campuses.forEach((campus) => {
      const treeCount = campus.id === "donna_rivas" ? 32 : (campus.id === "mercedes_travis" || campus.id === "mercedes_high" ? 24 : 14);

      for (let i = 0; i < treeCount; i++) {
        const treeIdNum = globalTreeCounter++;
        const treeId = `TTFS-${String(treeIdNum).padStart(3, '0')}`;
        const species = speciesList[i % speciesList.length];
        const zone = campus.zones[i % campus.zones.length];
        const plantYear = 2024 - (i % 3); // 2022 to 2024
        
        // Offset coordinates slightly from campus center
        const offsetLat = (Math.sin(i * 1.5) * 0.0012).toFixed(6);
        const offsetLng = (Math.cos(i * 1.5) * 0.0014).toFixed(6);
        const treeLat = (campus.lat + parseFloat(offsetLat)).toFixed(4);
        const treeLng = (campus.lng + parseFloat(offsetLng)).toFixed(4);

        // Check if adopted previously
        let isAdopted = false;
        let steward = null;
        let nickname = `The ${ADJECTIVES[i % ADJECTIVES.length]} ${NOUNS[(i + 2) % NOUNS.length]}`;
        let dedication = "Dedicated to the students and future environmental leaders of the Rio Grande Valley.";
        let tier = 150;

        if (savedAdoptions[treeId]) {
          isAdopted = true;
          steward = savedAdoptions[treeId].steward;
          nickname = savedAdoptions[treeId].nickname || nickname;
          dedication = savedAdoptions[treeId].dedication || dedication;
          tier = savedAdoptions[treeId].tier || 150;
        } else if (i % 3 === 0) {
          // Pre-populate ~33% as adopted for demonstration
          isAdopted = true;
          const sampleSteward = SAMPLE_STEWARDS[(treeIdNum) % SAMPLE_STEWARDS.length];
          steward = sampleSteward.name;
          dedication = sampleSteward.note;
          tier = [50, 150, 500, 1500][i % 4];
        }

        trees.push({
          id: treeId,
          campusId: campus.id,
          campusName: campus.name,
          district: campus.district,
          species: species,
          zone: zone,
          lat: treeLat,
          lng: treeLng,
          plantYear: plantYear,
          isAdopted: isAdopted,
          steward: steward,
          nickname: nickname,
          dedication: dedication,
          tier: tier
        });
      }
    });

    return trees;
  }

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  let allTrees = generateTreeInventory();
  let selectedTree = allTrees[0];
  let simulationYear = 2034;

  // --------------------------------------------------------------------------
  // Core i-Tree Eco Benefit Mathematical Engine
  // --------------------------------------------------------------------------
  function calculateTreeEcoBenefits(tree, targetYear) {
    const profile = SPECIES_PROFILES[tree.species] || SPECIES_PROFILES["Texas Live Oak"];
    const plantYear = tree.plantYear || 2024;
    const yearsGrown = Math.max(0, targetYear - plantYear);

    // Canopy Radius Growth
    let radiusFt = profile.baseRadiusFt + (yearsGrown * profile.growthRateFt);
    if (radiusFt > profile.maxRadiusFt) radiusFt = profile.maxRadiusFt;

    // Canopy Area = π * r^2
    const canopyAreaSqFt = Math.PI * radiusFt * radiusFt;
    const leafAreaSqFt = canopyAreaSqFt * profile.laiFactor;

    // 1. Stormwater Interception: ~0.623 gal / sq ft / inch rain (24.8 in/yr in South Texas)
    const annualRainfallInches = 24.8;
    const annualStormwaterGal = canopyAreaSqFt * (annualRainfallInches * 0.42) * 0.623;
    const annualStormwaterUsd = annualStormwaterGal * 0.0089;

    // 2. Carbon Sequestration: USDA i-Tree Eco growth equation
    const annualCo2Lbs = canopyAreaSqFt * profile.co2Factor * (1 + (yearsGrown * 0.02));
    const cumulativeCarbonLbs = annualCo2Lbs * (yearsGrown + 3);

    // 3. Ground Shade & Thermal Reduction
    const groundShadeSqFt = canopyAreaSqFt;
    const thermalReduction = Math.min(42.6, 18.0 + (yearsGrown * 1.5));

    // 4. Classroom A/C Energy Savings
    const annualAcKwh = canopyAreaSqFt * 0.85;
    const annualEnergyUsd = annualAcKwh * 0.125;

    // 5. CTLA Structural Replacement Valuation
    const estimatedDbhIn = Math.min(36, 4 + (yearsGrown * profile.dbhGrowthIn));
    const trunkCrossSectionSqIn = Math.PI * Math.pow(estimatedDbhIn / 2, 2);
    const ctlaAssetVal = (trunkCrossSectionSqIn * 48.5) + (canopyAreaSqFt * 12.5);

    return {
      targetYear,
      yearsGrown,
      radiusFt: Math.round(radiusFt),
      canopyAreaSqFt: Math.round(canopyAreaSqFt),
      annualStormwaterGal: Math.round(annualStormwaterGal),
      annualStormwaterUsd: annualStormwaterUsd.toFixed(2),
      annualCo2Lbs: parseFloat(annualCo2Lbs.toFixed(1)),
      cumulativeCarbonLbs: Math.round(cumulativeCarbonLbs),
      groundShadeSqFt: Math.round(groundShadeSqFt),
      thermalReduction: thermalReduction.toFixed(1),
      annualAcKwh: Math.round(annualAcKwh),
      annualEnergyUsd: annualEnergyUsd.toFixed(2),
      ctlaAssetVal: Math.round(ctlaAssetVal)
    };
  }

  // --------------------------------------------------------------------------
  // DOM Rendering & Lifecycle
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const campusFilter = document.getElementById('campusFilter');
    const speciesFilter = document.getElementById('speciesFilter');
    const statusFilter = document.getElementById('statusFilter');
    const treeGrid = document.getElementById('treeGridContainer');
    const simYearSlider = document.getElementById('simulationYearSlider');
    const simYearLabel = document.getElementById('currentSimYearLabel');
    const adoptionForm = document.getElementById('treeAdoptionForm');
    const btnPrintCert = document.getElementById('btnPrintCertificate');
    const btnExportLog = document.getElementById('btnExportAdoptionLog');

    // 1. Filter Handlers
    function applyFilters() {
      const selectedCampus = campusFilter ? campusFilter.value : 'all_donna';
      const selectedSpecies = speciesFilter ? speciesFilter.value : 'all';
      const selectedStatus = statusFilter ? statusFilter.value : 'all';

      const filtered = allTrees.filter((tree) => {
        // Campus filter
        if (selectedCampus === 'all_donna' && tree.district !== 'Donna ISD') return false;
        if (selectedCampus === 'all_mercedes' && tree.district !== 'Mercedes ISD') return false;
        if (selectedCampus !== 'all_donna' && selectedCampus !== 'all_mercedes' && tree.campusId !== selectedCampus) return false;

        // Species filter
        if (selectedSpecies !== 'all' && tree.species !== selectedSpecies) return false;

        // Status filter
        if (selectedStatus === 'available' && tree.isAdopted) return false;
        if (selectedStatus === 'adopted' && !tree.isAdopted) return false;

        return true;
      });

      renderTreeGrid(filtered);
      updateDistrictKpis();
    }

    if (campusFilter) campusFilter.addEventListener('change', applyFilters);
    if (speciesFilter) speciesFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);

    // 2. Simulation Year Slider
    if (simYearSlider) {
      simYearSlider.addEventListener('input', (e) => {
        simulationYear = parseInt(e.target.value, 10);
        const yearsGrown = simulationYear - 2024;
        let horizonText = `Year ${yearsGrown} (${simulationYear})`;
        if (simulationYear === 2024) horizonText = `Year 0 (2024) — Newly Planted Sapling`;
        else if (simulationYear === 2034) horizonText = `Year 10 (2034) — Established Canopy`;
        else if (simulationYear >= 2045) horizonText = `Year ${yearsGrown} (${simulationYear}) — Mature Heritage Grove`;

        if (simYearLabel) simYearLabel.textContent = horizonText;
        updateSelectedTreeRoi();
      });
    }

    // 3. Tree Adoption Submission Form
    if (adoptionForm) {
      adoptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sponsorNameInput = document.getElementById('sponsorName');
        const customNicknameInput = document.getElementById('customTreeNickname');
        const dedicationInput = document.getElementById('sponsorDedication');
        const tierInput = document.querySelector('input[name="sponsorTier"]:checked');
        const successMsg = document.getElementById('adoptionSuccessMsg');

        const sponsorName = sponsorNameInput ? sponsorNameInput.value.trim() : 'Anonymous Supporter';
        const nickname = customNicknameInput ? customNicknameInput.value.trim() : selectedTree.nickname;
        const dedication = dedicationInput ? dedicationInput.value.trim() : selectedTree.dedication;
        const tier = tierInput ? parseInt(tierInput.value, 10) : 150;

        // Update Tree in memory
        selectedTree.isAdopted = true;
        selectedTree.steward = sponsorName;
        selectedTree.nickname = nickname;
        selectedTree.dedication = dedication;
        selectedTree.tier = tier;

        // Save to localStorage
        const saved = JSON.parse(localStorage.getItem('ttfs_adopted_trees') || '{}');
        saved[selectedTree.id] = {
          treeId: selectedTree.id,
          campusId: selectedTree.campusId,
          species: selectedTree.species,
          steward: sponsorName,
          nickname: nickname,
          dedication: dedication,
          tier: tier,
          adoptedAt: new Date().toISOString()
        };
        localStorage.setItem('ttfs_adopted_trees', JSON.stringify(saved));

        // IndexedDB sync if available
        if (window.CoolSchoolsOffline && typeof window.CoolSchoolsOffline.saveObservation === 'function') {
          window.CoolSchoolsOffline.saveObservation({
            type: 'tree_adoption',
            treeId: selectedTree.id,
            steward: sponsorName,
            tier: tier
          });
        }

        // Re-render UI & Certificate
        applyFilters();
        selectTree(selectedTree.id);

        if (successMsg) {
          successMsg.className = 'status-msg success';
          successMsg.textContent = `🎉 Congratulations! ${selectedTree.id} is now proudly adopted by ${sponsorName}. Official certificate generated below.`;
          setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
        }
      });
    }

    // 4. Print Certificate Button
    if (btnPrintCert) {
      btnPrintCert.addEventListener('click', () => {
        window.print();
      });
    }

    // 5. Export Adoption Registry CSV
    if (btnExportLog) {
      btnExportLog.addEventListener('click', exportAdoptionRegistryCsv);
    }

    // Initialize View
    applyFilters();
    selectTree(allTrees[0].id);
  });

  // --------------------------------------------------------------------------
  // Tree Grid Rendering
  // --------------------------------------------------------------------------
  function renderTreeGrid(trees) {
    const grid = document.getElementById('treeGridContainer');
    const matchCountEl = document.getElementById('treeMatchCount');
    if (!grid) return;

    grid.innerHTML = '';
    if (matchCountEl) matchCountEl.textContent = `Showing ${trees.length} Trees`;

    if (trees.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: span 2; text-align: center; padding: 40px; color: #6B7280;">
          <span style="font-size: 32px; display: block; margin-bottom: 8px;">🔍</span>
          <strong>No matching schoolyard trees found.</strong><br>
          Try changing your campus or species filter.
        </div>
      `;
      return;
    }

    trees.forEach((tree) => {
      const profile = SPECIES_PROFILES[tree.species] || SPECIES_PROFILES["Texas Live Oak"];
      const benefits = calculateTreeEcoBenefits(tree, simulationYear);

      const card = document.createElement('div');
      card.className = `tree-card ${selectedTree && selectedTree.id === tree.id ? 'active' : ''}`;
      card.id = `card-${tree.id}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Tree ${tree.id}, ${tree.species}, ${tree.isAdopted ? 'Adopted' : 'Available'}`);

      const statusHtml = tree.isAdopted
        ? `<span class="card-status-tag adopted">💚 Adopted</span>`
        : `<span class="card-status-tag available">🟢 Available</span>`;

      const stewardLine = tree.isAdopted
        ? `<div class="card-steward-line">Adopted by: ${tree.steward}</div>`
        : `<div class="card-steward-line" style="color: var(--utrgv-orange);">Available for $50–$1,500 Adoption</div>`;

      card.innerHTML = `
        <div class="tree-card-top">
          <span class="card-tree-id">${tree.id}</span>
          ${statusHtml}
        </div>
        <div class="tree-card-main">
          <span class="card-tree-emoji">${profile.emoji}</span>
          <div class="card-tree-names">
            <h4 class="card-tree-name">${tree.nickname}</h4>
            <span class="card-tree-species">${tree.species}</span>
          </div>
        </div>
        <div class="tree-card-stats">
          <div class="stat-item">🌧️ <strong>${benefits.annualStormwaterGal.toLocaleString()} Gal</strong>/yr</div>
          <div class="stat-item">💨 <strong>${benefits.annualCo2Lbs} lbs</strong> CO₂/yr</div>
          <div class="stat-item">☂️ <strong>${benefits.groundShadeSqFt} sq ft</strong> shade</div>
          <div class="stat-item">🏛️ <strong>$${benefits.ctlaAssetVal.toLocaleString()}</strong> asset</div>
        </div>
        ${stewardLine}
      `;

      card.addEventListener('click', () => {
        selectTree(tree.id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectTree(tree.id);
        }
      });

      grid.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // Tree Selection & ROI Update
  // --------------------------------------------------------------------------
  function selectTree(treeId) {
    const found = allTrees.find((t) => t.id === treeId);
    if (!found) return;

    selectedTree = found;

    // Highlight card in grid
    document.querySelectorAll('.tree-card').forEach((c) => c.classList.remove('active'));
    const activeCard = document.getElementById(`card-${treeId}`);
    if (activeCard) activeCard.classList.add('active');

    // Update Profile Card
    const profile = SPECIES_PROFILES[selectedTree.species] || SPECIES_PROFILES["Texas Live Oak"];
    const emojiEl = document.getElementById('selectedTreeEmoji');
    const idTagEl = document.getElementById('selectedTreeIdTag');
    const nameEl = document.getElementById('selectedTreeName');
    const speciesEl = document.getElementById('selectedTreeSpecies');
    const zoneEl = document.getElementById('selectedTreeZone');
    const gpsEl = document.getElementById('selectedTreeGps');
    const plantYearEl = document.getElementById('selectedTreePlantYear');
    const statusBadgeEl = document.getElementById('selectedTreeStatusBadge');
    const statusTextEl = document.getElementById('selectedTreeStatusText');

    if (emojiEl) emojiEl.textContent = profile.emoji;
    if (idTagEl) idTagEl.textContent = `TREE #${selectedTree.id}`;
    if (nameEl) nameEl.textContent = selectedTree.nickname;
    if (speciesEl) speciesEl.textContent = `${selectedTree.species} (${profile.botanical})`;
    if (zoneEl) zoneEl.textContent = `${selectedTree.campusName} • ${selectedTree.zone}`;
    if (gpsEl) gpsEl.textContent = `${selectedTree.lat}° N, ${Math.abs(selectedTree.lng)}° W`;
    if (plantYearEl) plantYearEl.textContent = `${selectedTree.plantYear} (Planting Batch)`;

    if (statusBadgeEl && statusTextEl) {
      if (selectedTree.isAdopted) {
        statusBadgeEl.style.backgroundColor = '#EFF6FF';
        statusBadgeEl.style.color = '#1D4ED8';
        statusBadgeEl.style.borderColor = '#BFDBFE';
        statusTextEl.textContent = `Adopted by ${selectedTree.steward}`;
      } else {
        statusBadgeEl.style.backgroundColor = '#ECFDF5';
        statusBadgeEl.style.color = '#047857';
        statusBadgeEl.style.borderColor = '#A7F3D0';
        statusTextEl.textContent = `Available for Adoption`;
      }
    }

    // Sync Form Inputs
    const sponsorInput = document.getElementById('sponsorName');
    const nicknameInput = document.getElementById('customTreeNickname');
    const dedicationInput = document.getElementById('sponsorDedication');

    if (sponsorInput && selectedTree.isAdopted) sponsorInput.value = selectedTree.steward;
    if (nicknameInput) nicknameInput.value = selectedTree.nickname;
    if (dedicationInput) dedicationInput.value = selectedTree.dedication;

    updateSelectedTreeRoi();
  }

  function updateSelectedTreeRoi() {
    if (!selectedTree) return;

    const profile = SPECIES_PROFILES[selectedTree.species] || SPECIES_PROFILES["Texas Live Oak"];
    const benefits = calculateTreeEcoBenefits(selectedTree, simulationYear);

    // Update ROI Card Numbers
    const stormGalEl = document.getElementById('calcStormwaterGal');
    const stormUsdEl = document.getElementById('calcStormwaterUsd');
    const carbonLbsEl = document.getElementById('calcCarbonLbs');
    const carbonLifetimeEl = document.getElementById('calcLifetimeCarbon');
    const shadeSqFtEl = document.getElementById('calcShadeSqFt');
    const thermalDropEl = document.getElementById('calcThermalReduction');
    const energyKwhEl = document.getElementById('calcEnergyKwh');
    const energyUsdEl = document.getElementById('calcEnergyUsd');
    const ctlaValueEl = document.getElementById('calcCtlaValue');

    if (stormGalEl) stormGalEl.textContent = `${benefits.annualStormwaterGal.toLocaleString()} Gal / yr`;
    if (stormUsdEl) stormUsdEl.textContent = `Avoids $${benefits.annualStormwaterUsd} in municipal stormwater treatment/yr`;
    if (carbonLbsEl) carbonLbsEl.textContent = `${benefits.annualCo2Lbs} lbs / yr`;
    if (carbonLifetimeEl) carbonLifetimeEl.textContent = `${benefits.cumulativeCarbonLbs.toLocaleString()} lbs cumulative biomass stored`;
    if (shadeSqFtEl) shadeSqFtEl.textContent = `${benefits.groundShadeSqFt.toLocaleString()} Sq Ft`;
    if (thermalDropEl) thermalDropEl.textContent = `-${benefits.thermalReduction}°F ground temperature reduction`;
    if (energyKwhEl) energyKwhEl.textContent = `${benefits.annualAcKwh.toLocaleString()} kWh / yr`;
    if (energyUsdEl) energyUsdEl.textContent = `Saves $${benefits.annualEnergyUsd} in school electricity costs/yr`;
    if (ctlaValueEl) ctlaValueEl.textContent = `$${benefits.ctlaAssetVal.toLocaleString()}.00`;

    // Update Certificate
    const certHonoree = document.getElementById('certHonoree');
    const certDedication = document.getElementById('certDedicationText');
    const certTreeName = document.getElementById('certTreeName');
    const certTreeSpecies = document.getElementById('certTreeSpecies');
    const certTreeLoc = document.getElementById('certTreeLocation');
    const certTreeGps = document.getElementById('certTreeGps');
    const certStormwater = document.getElementById('certStormwater');
    const certCarbon = document.getElementById('certCarbon');
    const certShade = document.getElementById('certShade');
    const certEnergy = document.getElementById('certEnergy');
    const certAssetVal = document.getElementById('certAssetVal');

    const 10YrBenefits = calculateTreeEcoBenefits(selectedTree, 2034);

    if (certHonoree) certHonoree.textContent = selectedTree.isAdopted ? selectedTree.steward : 'The Rio Grande Valley Community';
    if (certDedication) certDedication.textContent = `"${selectedTree.dedication}"`;
    if (certTreeName) certTreeName.textContent = `${selectedTree.nickname} (${selectedTree.id})`;
    if (certTreeSpecies) certTreeSpecies.textContent = `${selectedTree.species} (${profile.botanical})`;
    if (certTreeLoc) certTreeLoc.textContent = `${selectedTree.district} — ${selectedTree.campusName} • Zone: ${selectedTree.zone}`;
    if (certTreeGps) certTreeGps.textContent = `GPS Coordinates: ${selectedTree.lat}° N, ${Math.abs(selectedTree.lng)}° W • Planted: ${selectedTree.plantYear}`;

    if (certStormwater) certStormwater.textContent = `${(10YrBenefits.annualStormwaterGal * 10).toLocaleString()} Gallons`;
    if (certCarbon) certCarbon.textContent = `${10YrBenefits.cumulativeCarbonLbs.toLocaleString()} lbs CO₂`;
    if (certShade) certShade.textContent = `${10YrBenefits.groundShadeSqFt.toLocaleString()} Sq Ft`;
    if (certEnergy) certEnergy.textContent = `${(10YrBenefits.annualAcKwh * 10).toLocaleString()} kWh ($${(parseFloat(10YrBenefits.annualEnergyUsd) * 10).toFixed(2)})`;
    if (certAssetVal) certAssetVal.textContent = `$${10YrBenefits.ctlaAssetVal.toLocaleString()}.00`;
  }

  function updateDistrictKpis() {
    const totalTrees = allTrees.length;
    const adoptedCount = allTrees.filter((t) => t.isAdopted).length;
    const adoptedPct = ((adoptedCount / totalTrees) * 100).toFixed(1);

    let totalStormwater = 0;
    let totalCarbon = 0;
    let totalAssetVal = 0;

    allTrees.forEach((t) => {
      const ben = calculateTreeEcoBenefits(t, 2034);
      totalStormwater += ben.annualStormwaterGal;
      totalCarbon += ben.cumulativeCarbonLbs;
      totalAssetVal += ben.ctlaAssetVal;
    });

    const kpiTotal = document.getElementById('kpiTotalDistrictTrees');
    const kpiAdopted = document.getElementById('kpiAdoptedTrees');
    const kpiStorm = document.getElementById('kpiDistrictStormwater');
    const kpiCarbon = document.getElementById('kpiDistrictCarbon');
    const kpiAsset = document.getElementById('kpiDistrictAssetValue');

    if (kpiTotal) kpiTotal.textContent = totalTrees.toLocaleString();
    if (kpiAdopted) kpiAdopted.textContent = `${adoptedCount} (${adoptedPct}%)`;
    if (kpiStorm) kpiStorm.textContent = `${(totalStormwater / 1000000).toFixed(2)}M Gal`;
    if (kpiCarbon) kpiCarbon.textContent = `${totalCarbon.toLocaleString()} lbs`;
    if (kpiAsset) kpiAsset.textContent = `$${totalAssetVal.toLocaleString()}`;
  }

  function exportAdoptionRegistryCsv() {
    const rows = [
      ["Texas Trees Foundation x UTRGV Project Cool Schools - Tree Adoption Registry"],
      ["Generated", new Date().toISOString()],
      [],
      ["Tree ID", "Campus", "District", "Species", "Zone", "Latitude", "Longitude", "Status", "Adopted By / Steward", "Sponsorship Level ($)", "10-Yr Stormwater (Gal)", "10-Yr Carbon (lbs)", "10-Yr CTLA Valuation ($)"]
    ];

    allTrees.forEach((tree) => {
      const ben = calculateTreeEcoBenefits(tree, 2034);
      rows.push([
        tree.id,
        tree.campusName,
        tree.district,
        tree.species,
        tree.zone,
        tree.lat,
        tree.lng,
        tree.isAdopted ? "Adopted" : "Available",
        tree.steward || "N/A",
        tree.tier || 0,
        ben.annualStormwaterGal * 10,
        ben.cumulativeCarbonLbs,
        ben.ctlaAssetVal
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.map(cell => `"${cell}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TTFS_Tree_Adoption_Registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

})(window, document);
