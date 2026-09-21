/**
 * TEKS Elementary Science Curriculum & Microclimate Field Lab Controller (teks_lesson_plans.js)
 * Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools
 * Zero PII • Strict IIFE • Interactive Field Simulators • FERPA/COPPA Compliant
 */

(function (window, document) {
  'use strict';

  // 1. Campus Microclimate & Forest Baseline Telemetry
  const CAMPUS_TELEMETRY = {
    donna_rivas: {
      name: "Jason M. Rivas Elementary",
      district: "Donna ISD",
      canopyCover: "18.4%",
      treeCount: 124,
      coolingDelta: "-24.2°F",
      stormwater: "148,200",
      dominantSpecies: "Texas Live Oak & Honey Mesquite"
    },
    donna_garza: {
      name: "Garza Elementary",
      district: "Donna ISD",
      canopyCover: "14.2%",
      treeCount: 98,
      coolingDelta: "-21.5°F",
      stormwater: "112,400",
      dominantSpecies: "Texas Ebony & Cedar Elm"
    },
    donna_singleterry: {
      name: "Singleterry Elementary",
      district: "Donna ISD",
      canopyCover: "16.8%",
      treeCount: 110,
      coolingDelta: "-23.0°F",
      stormwater: "131,800",
      dominantSpecies: "Live Oak & Retama"
    },
    donna_salinas: {
      name: "Salinas Elementary",
      district: "Donna ISD",
      canopyCover: "12.6%",
      treeCount: 86,
      coolingDelta: "-19.8°F",
      stormwater: "96,500",
      dominantSpecies: "Mesquite & Anacua"
    },
    donna_solis: {
      name: "Solis Elementary",
      district: "Donna ISD",
      canopyCover: "15.1%",
      treeCount: 104,
      coolingDelta: "-22.1°F",
      stormwater: "119,700",
      dominantSpecies: "Montezuma Cypress & Live Oak"
    },
    donna_ochoa: {
      name: "Ochoa Elementary",
      district: "Donna ISD",
      canopyCover: "13.9%",
      treeCount: 92,
      coolingDelta: "-20.4°F",
      stormwater: "105,300",
      dominantSpecies: "Texas Ebony & Cedar Elm"
    },
    donna_stainke: {
      name: "Stainke Elementary",
      district: "Donna ISD",
      canopyCover: "17.3%",
      treeCount: 118,
      coolingDelta: "-23.6°F",
      stormwater: "139,100",
      dominantSpecies: "Live Oak & Honey Mesquite"
    },
    donna_jw_caceres: {
      name: "J.W. Caceres Elementary",
      district: "Donna ISD",
      canopyCover: "11.8%",
      treeCount: 78,
      coolingDelta: "-18.9°F",
      stormwater: "88,200",
      dominantSpecies: "Cedar Elm & Retama"
    },
    mercedes_travis: {
      name: "Travis Elementary",
      district: "Mercedes ISD",
      canopyCover: "19.2%",
      treeCount: 132,
      coolingDelta: "-25.4°F",
      stormwater: "159,400",
      dominantSpecies: "Montezuma Cypress & Live Oak"
    },
    mercedes_chacon: {
      name: "Chacon Elementary",
      district: "Mercedes ISD",
      canopyCover: "15.7%",
      treeCount: 106,
      coolingDelta: "-22.8°F",
      stormwater: "123,000",
      dominantSpecies: "Texas Ebony & Live Oak"
    },
    mercedes_harrell: {
      name: "Harrell Elementary",
      district: "Mercedes ISD",
      canopyCover: "14.9%",
      treeCount: 99,
      coolingDelta: "-21.9°F",
      stormwater: "114,800",
      dominantSpecies: "Honey Mesquite & Anacua"
    },
    mercedes_hinojosa: {
      name: "Hinojosa Elementary",
      district: "Mercedes ISD",
      canopyCover: "16.4%",
      treeCount: 112,
      coolingDelta: "-23.1°F",
      stormwater: "128,600",
      dominantSpecies: "Cedar Elm & Live Oak"
    },
    mercedes_high: {
      name: "Mercedes High School",
      district: "Mercedes ISD",
      canopyCover: "21.0%",
      treeCount: 185,
      coolingDelta: "-27.2°F",
      stormwater: "210,500",
      dominantSpecies: "Live Oak, Cypress, & Ebony"
    },
    mercedes_academy: {
      name: "Mercedes Academic Academy",
      district: "Mercedes ISD",
      canopyCover: "13.5%",
      treeCount: 84,
      coolingDelta: "-19.5°F",
      stormwater: "92,100",
      dominantSpecies: "Honey Mesquite & Retama"
    }
  };

  // 2. Standards Definitions & Worksheets Customization
  const TEKS_DATA = {
    grade3: {
      code: "TEKS 3.9A (Science)",
      title: "Ecosystem Physical Characteristics & Microclimate Support",
      teaText: "The student is expected to observe and describe the physical characteristics of environments and how they support populations and communities within an ecosystem.",
      objective: "Students will use infrared thermal sensors and canopy surveys to measure how native trees create shaded microclimates that lower ground temperatures by over 20°F to support living communities.",
      simTitle: "Interactive Lab Simulator: Surface Temperature & Microclimate Probe",
      worksheetCode: "TEKS 3.9A LAB",
      worksheetTitle: "Outdoor Science Investigation: Campus Canopy Microclimates",
      hypothesisPrompt: "How does tree canopy shade affect the physical temperature of schoolyard ground surfaces?",
      defaultHypothesis: "If we measure the surface temperature under native tree shade compared to black asphalt, then the tree shade will be significantly cooler (by at least 20°F) because dense leaf crowns block solar radiation.",
      defaultConclusion: "Our field data proved our hypothesis: native tree shade cooled ground temperatures by over 50°F compared to asphalt, creating a protective microclimate that supports lizards, pollinators, and students.",
      stations: [
        { name: "Station 1: Parking Area", surface: "Black Asphalt", temp: 142, bio: "None (surface exceeds 140°F)" },
        { name: "Station 2: Playground", surface: "Artificial Turf", temp: 134, bio: "Ants crossing perimeter" },
        { name: "Station 3: Open Field", surface: "Unshaded Grass", temp: 108, bio: "Grasshoppers, dandelions" },
        { name: "Station 4: Tree Canopy", surface: "Live Oak Shade", temp: 88, bio: "Lizards, monarchs, earthworms" }
      ]
    },
    grade4: {
      code: "TEKS 4.9A (Science)",
      title: "Producers, Sunlight Energy & Evapotranspirational Cooling",
      teaText: "The student is expected to investigate that most producers need sunlight, water, and carbon dioxide to make their own food, while utilizing biomass and creating microclimates.",
      objective: "Students will calculate how native South Texas tree producers turn sunlight and carbon dioxide into wood biomass while pumping gallons of cooling moisture into the atmosphere.",
      simTitle: "Interactive Lab Simulator: Producer Photosynthesis & Transpiration Calculator",
      worksheetCode: "TEKS 4.9A LAB",
      worksheetTitle: "Producer Biomass & Schoolyard Transpiration Investigation",
      hypothesisPrompt: "How do native trees capture carbon dioxide and cool the air through photosynthesis and water transpiration?",
      defaultHypothesis: "If native trees receive full sunlight, then they will transpire more water vapor and absorb more CO₂ into their wood biomass, cooling the surrounding schoolyard by several thousand BTUs.",
      defaultConclusion: "Our calculations show that a mature Texas Live Oak transpires over 28 gallons of cooling water daily while locking away nearly 50 lbs of CO₂ per year, serving as a solar-powered air conditioner.",
      stations: [
        { name: "Station 1: Full Sun Canopy", surface: "Texas Live Oak Crown", temp: 89, bio: "Leaf stomata transpiring 28 gal/day" },
        { name: "Station 2: Subcanopy Trunk", surface: "Wood Biomass Core", temp: 84, bio: "Storing 48.6 lbs carbon/year" },
        { name: "Station 3: Shaded Soil Base", surface: "Mulch Root Zone", temp: 82, bio: "Absorbing groundwater for sap" },
        { name: "Station 4: Open Bleachers", surface: "Metal Surface (No Plants)", temp: 130, bio: "Zero transpiration / High heat" }
      ]
    },
    grade5: {
      code: "TEKS 5.9A (Science)",
      title: "Soil Stormwater Sponge & Living/Nonliving Interactions",
      teaText: "The student is expected to observe the way organisms live and survive in their ecosystem by interacting with the living and nonliving components.",
      objective: "Students will simulate thunderstorm runoff to discover how tree root networks interact with nonliving soil minerals to prevent flooding and create habitat corridors.",
      simTitle: "Interactive Lab Simulator: Soil Stormwater Sponge & Living Interactions",
      worksheetCode: "TEKS 5.9A LAB",
      worksheetTitle: "Ecosystem Soil Sponge & Biodiversity Corridor Investigation",
      hypothesisPrompt: "How do living tree root systems interact with nonliving soil particles to absorb stormwater and support wildlife?",
      defaultHypothesis: "If schoolyards are planted with deep-rooted native microforests, then soil infiltration will increase to over 85%, stopping runoff flooding and increasing biodiversity.",
      defaultConclusion: "Data indicates that native thornscrub root zones absorb 86% of rainfall on campus, preventing 18,500 gallons of stormwater runoff while supporting butterflies, green jays, and beneficial fungi.",
      stations: [
        { name: "Station 1: Bare Soil Bed", surface: "Compacted Dirt", temp: 112, bio: "Low infiltration (82% runoff)" },
        { name: "Station 2: Lawn Grass", surface: "Shallow Turf Roots", temp: 104, bio: "Moderate sponge (45% runoff)" },
        { name: "Station 3: Microforest Grove", surface: "Deep Native Tree Roots", temp: 86, bio: "High sponge (86% infiltration)" },
        { name: "Station 4: Bioswale Basin", surface: "Mulched Sump", temp: 83, bio: "Monarchs, jays, soil fungi" }
      ]
    },
    transect: {
      code: "Campus Science Transect (All Grades)",
      title: "Cross-Grade Campus Canopy & Microclimate Transect",
      teaText: "Integrated field study measuring surface thermal gradients, species diversity, and environmental benefits along a 100-meter schoolyard transect line.",
      objective: "Students across grade bands work collaboratively to chart environmental transition zones from heat-absorbing asphalt to biodiversity-rich native groves.",
      simTitle: "Interactive Lab Simulator: 100-Meter Campus Transect Analyzer",
      worksheetCode: "STEM TRANSECT",
      worksheetTitle: "100-Meter Schoolyard Canopy & Microclimate Transect",
      hypothesisPrompt: "How does microclimate and biodiversity change as we walk 100 meters from the asphalt bus loop into the native tree grove?",
      defaultHypothesis: "As we move further from the bus loop asphalt toward the native grove, surface temperatures will drop by over 40°F and wildlife sightings will increase significantly.",
      defaultConclusion: "Our 100-meter transect confirmed a steep thermal gradient: 138°F on asphalt down to 87°F in the grove. Canopy cover and species richness peaked at the 100m mark.",
      stations: [
        { name: "Station 1: 0m Mark", surface: "Bus Loop Asphalt", temp: 138, bio: "0 sightings / 0% shade" },
        { name: "Station 2: 35m Mark", surface: "Playground Edge", temp: 122, bio: "1 insect / 5% shade" },
        { name: "Station 3: 70m Mark", surface: "Young Sapling Row", temp: 102, bio: "3 insects / 30% shade" },
        { name: "Station 4: 100m Mark", surface: "Native Pocket Grove", temp: 87, bio: "8 species / 88% shade" }
      ]
    }
  };

  // 3. Species Transpiration & Carbon Factors (Grade 4)
  const SPECIES_FACTORS = {
    live_oak: { name: "Texas Live Oak", transGalFactor: 3.55, co2LbsFactor: 6.08, btuFactor: 1775 },
    texas_ebony: { name: "Texas Ebony", transGalFactor: 2.80, co2LbsFactor: 5.20, btuFactor: 1400 },
    honey_mesquite: { name: "Honey Mesquite", transGalFactor: 2.20, co2LbsFactor: 4.60, btuFactor: 1100 },
    montezuma_cypress: { name: "Montezuma Cypress", transGalFactor: 4.80, co2LbsFactor: 7.50, btuFactor: 2400 },
    cedar_elm: { name: "Cedar Elm", transGalFactor: 3.10, co2LbsFactor: 5.50, btuFactor: 1550 }
  };

  // State
  let currentGrade = 'grade3';
  let currentCampus = 'donna_rivas';

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const campusSelect = document.getElementById('campusSelect');
    const tabButtons = document.querySelectorAll('.teks-tab');
    const btnPrint = document.getElementById('btnPrintWorksheet');
    const btnExport = document.getElementById('btnExportCsv');
    const btnReset = document.getElementById('btnResetWorksheet');
    const feedbackForm = document.getElementById('educatorFeedbackForm');

    // 1. Campus Selection Change
    if (campusSelect) {
      campusSelect.addEventListener('change', (e) => {
        currentCampus = e.target.value;
        updateCampusTelemetry();
      });
    }

    // 2. Grade Tab Switching
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const target = btn.getAttribute('data-target');
        switchGradeStandard(target);
      });
    });

    // 3. Grade 3 Surface Probe Buttons
    const surfaceButtons = document.querySelectorAll('.surface-btn');
    surfaceButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        surfaceButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const temp = parseInt(btn.getAttribute('data-temp'), 10);
        const surface = btn.getAttribute('data-surface');
        const albedo = btn.getAttribute('data-albedo');
        const note = btn.getAttribute('data-note');

        updateThermalProbeReadout(temp, surface, albedo, note);
      });
    });

    // 4. Grade 4 Producer Inputs
    const producerSpeciesSelect = document.getElementById('producerSpeciesSelect');
    const solarHoursRange = document.getElementById('solarHoursRange');
    const solarHoursVal = document.getElementById('solarHoursVal');

    function calculateGrade4Outputs() {
      if (!producerSpeciesSelect || !solarHoursRange) return;
      const speciesKey = producerSpeciesSelect.value;
      const hours = parseFloat(solarHoursRange.value);
      if (solarHoursVal) solarHoursVal.textContent = `${hours} hrs`;

      const factor = SPECIES_FACTORS[speciesKey] || SPECIES_FACTORS.live_oak;
      const dailyGal = (factor.transGalFactor * hours).toFixed(1);
      const annualCo2 = (factor.co2LbsFactor * hours).toFixed(1);
      const dailyBtu = Math.round(factor.btuFactor * hours).toLocaleString();

      const transEl = document.getElementById('transpirationGalDay');
      const co2El = document.getElementById('co2AbsorbedYear');
      const btuEl = document.getElementById('btuCoolingVal');

      if (transEl) transEl.textContent = `${dailyGal} Gallons`;
      if (co2El) co2El.textContent = `${annualCo2} lbs`;
      if (btuEl) btuEl.textContent = `${dailyBtu} BTU`;
    }

    if (producerSpeciesSelect) producerSpeciesSelect.addEventListener('change', calculateGrade4Outputs);
    if (solarHoursRange) solarHoursRange.addEventListener('input', calculateGrade4Outputs);

    // 5. Grade 5 Sponge Inputs
    const rainEventSelect = document.getElementById('rainEventSelect');
    const groundCoverSelect = document.getElementById('groundCoverSelect');

    function calculateGrade5Outputs() {
      if (!rainEventSelect || !groundCoverSelect) return;
      const rainInches = parseFloat(rainEventSelect.value);
      const cover = groundCoverSelect.value;

      let infilPct = 86;
      let runoffPct = 14;

      if (cover === 'compacted') {
        infilPct = 18;
        runoffPct = 82;
      } else if (cover === 'turf') {
        infilPct = 55;
        runoffPct = 45;
      }

      const totalCampusGal = rainInches * 450000 * 0.623; // based on ~10 acre campus
      const infilGal = Math.round(totalCampusGal * (infilPct / 100)).toLocaleString();
      const runoffGal = Math.round(totalCampusGal * (runoffPct / 100)).toLocaleString();

      const infilPctEl = document.getElementById('waterInfiltratedPct');
      const infilGalEl = document.getElementById('waterInfiltratedGal');
      const runoffPctEl = document.getElementById('waterRunoffPct');
      const runoffGalEl = document.getElementById('waterRunoffGal');

      if (infilPctEl) infilPctEl.textContent = `${infilPct}% (Sponged)`;
      if (infilGalEl) infilGalEl.textContent = `${infilGal} Gallons Recharged`;
      if (runoffPctEl) runoffPctEl.textContent = `${runoffPct}% (Runoff)`;
      if (runoffGalEl) runoffGalEl.textContent = `${runoffGal} Gallons Flowed to Drains`;
    }

    if (rainEventSelect) rainEventSelect.addEventListener('change', calculateGrade5Outputs);
    if (groundCoverSelect) groundCoverSelect.addEventListener('change', calculateGrade5Outputs);

    // 6. Print Action
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    // 7. Export CSV Action
    if (btnExport) {
      btnExport.addEventListener('click', exportLabDataToCsv);
    }

    // 8. Reset Action
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Reset all field worksheet notes and observations?')) {
          switchGradeStandard(currentGrade);
        }
      });
    }

    // 9. Anonymous Educator Feedback Submission
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const grade = document.getElementById('feedbackGradeLevel').value;
        const rating = document.getElementById('feedbackEngagement').value;
        const comments = document.getElementById('feedbackComments').value;
        const statusMsg = document.getElementById('feedbackStatusMsg');

        const submission = {
          timestamp: new Date().toISOString(),
          campus: currentCampus,
          gradeLevel: grade,
          engagementRating: rating,
          notes: comments
        };

        // Save locally in localStorage (FERPA compliant, zero PII)
        const existing = JSON.parse(localStorage.getItem('ttfs_educator_reflections') || '[]');
        existing.push(submission);
        localStorage.setItem('ttfs_educator_reflections', JSON.stringify(existing));

        // IndexedDB sync if available
        if (window.CoolSchoolsOffline && typeof window.CoolSchoolsOffline.saveObservation === 'function') {
          window.CoolSchoolsOffline.saveObservation({ type: 'educator_reflection', ...submission });
        }

        if (statusMsg) {
          statusMsg.className = 'status-msg success';
          statusMsg.textContent = '✅ Reflection saved securely to offline ledger! Thank you for supporting RGV science education.';
        }

        feedbackForm.reset();
        setTimeout(() => {
          if (statusMsg) statusMsg.style.display = 'none';
        }, 5000);
      });
    }

    // Initialize UI
    updateCampusTelemetry();
    switchGradeStandard('grade3');
  });

  // --------------------------------------------------------------------------
  // Helper Functions
  // --------------------------------------------------------------------------

  function updateCampusTelemetry() {
    const data = CAMPUS_TELEMETRY[currentCampus] || CAMPUS_TELEMETRY.donna_rivas;

    const nameEl = document.getElementById('telemetryCampusName');
    const canopyEl = document.getElementById('metricCanopyCover');
    const treeEl = document.getElementById('metricTreeCount');
    const deltaEl = document.getElementById('metricCoolingDelta');
    const stormEl = document.getElementById('metricStormwater');

    if (nameEl) nameEl.textContent = data.name;
    if (canopyEl) canopyEl.textContent = data.canopyCover;
    if (treeEl) treeEl.textContent = data.treeCount;
    if (deltaEl) deltaEl.textContent = data.coolingDelta;
    if (stormEl) stormEl.textContent = data.stormwater;
  }

  function switchGradeStandard(gradeKey) {
    currentGrade = gradeKey;
    const standard = TEKS_DATA[gradeKey] || TEKS_DATA.grade3;

    // Update Banner Info
    const codeEl = document.getElementById('currentStandardCode');
    const titleEl = document.getElementById('standardTitle');
    const descEl = document.getElementById('standardDescription');
    const objEl = document.getElementById('learningObjectiveText');
    const simTitleEl = document.getElementById('labSimulatorTitle');

    if (codeEl) codeEl.textContent = standard.code;
    if (titleEl) titleEl.textContent = standard.title;
    if (descEl) descEl.textContent = standard.teaText;
    if (objEl) objEl.textContent = standard.objective;
    if (simTitleEl) simTitleEl.textContent = standard.simTitle;

    // Toggle Simulator Views
    const sim3 = document.getElementById('simViewGrade3');
    const sim4 = document.getElementById('simViewGrade4');
    const sim5 = document.getElementById('simViewGrade5');
    const simT = document.getElementById('simViewTransect');

    if (sim3) sim3.style.display = gradeKey === 'grade3' ? 'block' : 'none';
    if (sim4) sim4.style.display = gradeKey === 'grade4' ? 'block' : 'none';
    if (sim5) sim5.style.display = gradeKey === 'grade5' ? 'block' : 'none';
    if (simT) simT.style.display = gradeKey === 'transect' ? 'block' : 'none';

    // Update Worksheet Header & Prompts
    const wsCode = document.getElementById('worksheetTeksCode');
    const wsTitle = document.getElementById('worksheetTitle');
    const hypPrompt = document.getElementById('hypothesisPrompt');
    const hypInput = document.getElementById('hypothesisInput');
    const concInput = document.getElementById('conclusionInput');

    if (wsCode) wsCode.textContent = standard.worksheetCode;
    if (wsTitle) wsTitle.textContent = standard.worksheetTitle;
    if (hypPrompt) hypPrompt.textContent = standard.hypothesisPrompt;
    if (hypInput) hypInput.value = standard.defaultHypothesis;
    if (concInput) concInput.value = standard.defaultConclusion;

    // Populate Worksheet Table Rows
    const tableBody = document.querySelector('#fieldDataTable tbody');
    if (tableBody && standard.stations) {
      tableBody.innerHTML = '';
      let maxTemp = 0;
      let minTemp = 999;

      standard.stations.forEach((st, idx) => {
        if (st.temp > maxTemp) maxTemp = st.temp;
        if (st.temp < minTemp) minTemp = st.temp;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${st.name}</td>
          <td>${st.surface}</td>
          <td><input type="number" class="table-input" value="${st.temp}" aria-label="${st.name} Temp"></td>
          <td><input type="text" class="table-input" value="${st.bio}" aria-label="${st.name} Organisms"></td>
        `;
        tableBody.appendChild(tr);
      });

      // Update Math Calculation Delta
      const calcMax = document.getElementById('calcMaxTemp');
      const calcMin = document.getElementById('calcMinTemp');
      const calcDelta = document.getElementById('calcDeltaTemp');

      if (calcMax) calcMax.textContent = `${maxTemp}°F`;
      if (calcMin) calcMin.textContent = `${minTemp}°F`;
      if (calcDelta) calcDelta.textContent = `-${maxTemp - minTemp}°F`;
    }
  }

  function updateThermalProbeReadout(temp, surface, albedo, note) {
    const tempDisp = document.getElementById('probeTempDisplay');
    const surfaceName = document.getElementById('probeSurfaceName');
    const albedoEl = document.getElementById('probeAlbedo');
    const deltaEl = document.getElementById('probeDelta');
    const obsEl = document.getElementById('probeObservation');
    const mercury = document.getElementById('mercuryLevel');

    if (tempDisp) tempDisp.textContent = `${temp}°F`;
    if (surfaceName) surfaceName.textContent = surface;
    if (albedoEl) albedoEl.textContent = albedo;
    
    const deltaVsAsphalt = 142 - temp;
    if (deltaEl) deltaEl.textContent = deltaVsAsphalt > 0 ? `-${deltaVsAsphalt}.0°F Cooler` : '0.0°F (Baseline Hot)';
    if (obsEl) obsEl.textContent = note;

    // Calculate mercury height (range 70°F to 150°F = 80° range)
    if (mercury) {
      const pct = Math.min(100, Math.max(10, ((temp - 70) / 80) * 100));
      mercury.style.height = `${pct}%`;
    }
  }

  function exportLabDataToCsv() {
    const standard = TEKS_DATA[currentGrade] || TEKS_DATA.grade3;
    const campusData = CAMPUS_TELEMETRY[currentCampus] || CAMPUS_TELEMETRY.donna_rivas;
    const teamName = document.getElementById('fieldTeamName')?.value || 'Anonymous Team';
    const date = document.getElementById('fieldDate')?.value || new Date().toISOString().split('T')[0];

    const rows = [
      ["TEKS Science Curriculum Lab Export", standard.code],
      ["Campus", campusData.name],
      ["District", campusData.district],
      ["Observation Date", date],
      ["Team / Homeroom Code", teamName],
      [],
      ["Station", "Surface Material", "Measured Temp (deg F)", "Living Organisms Observed"]
    ];

    const tableRows = document.querySelectorAll('#fieldDataTable tbody tr');
    tableRows.forEach((tr) => {
      const cols = tr.querySelectorAll('td');
      const station = cols[0]?.textContent || '';
      const surface = cols[1]?.textContent || '';
      const temp = cols[2]?.querySelector('input')?.value || '';
      const bio = cols[3]?.querySelector('input')?.value || '';
      rows.push([station, surface, temp, bio]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.map(cell => `"${cell}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TEKS_Lab_${currentGrade}_${currentCampus}_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

})(window, document);
