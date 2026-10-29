(function () {
  const config = window.APP_CONFIG || {};
  const yearSlider = document.getElementById("yearSlider");
  const yearReadout = document.getElementById("yearReadout");
  const scenarioSelect = document.getElementById("scenarioSelect");
  const summaryText = document.getElementById("summaryText");
  const canopyNotes = document.getElementById("canopyNotes");
  const saveCanopyNotes = document.getElementById("saveCanopyNotes");
  const soilRegimeSelect = document.getElementById("soilRegimeSelect");

  // Live Metrics elements
  const activeYearLabel = document.getElementById("activeYearLabel");
  const liveTreeCount = document.getElementById("liveTreeCount");
  const liveShadeArea = document.getElementById("liveShadeArea");
  const liveCoverPercent = document.getElementById("liveCoverPercent");
  const liveTempCooling = document.getElementById("liveTempCooling");
  const liveSolarBlocked = document.getElementById("liveSolarBlocked");

  // Surface breakdown elements
  const barShade = document.getElementById("barShade");
  const barAsphalt = document.getElementById("barAsphalt");
  const barTurf = document.getElementById("barTurf");
  const lblPctShade = document.getElementById("lblPctShade");
  const lblPctAsphalt = document.getElementById("lblPctAsphalt");
  const lblPctTurf = document.getElementById("lblPctTurf");

  // Forecast table body
  const forecastTableBody = document.getElementById("forecastTableBody");

  const CAMPUS_PROFILES = {
    donna_jw_caceres: {
      id: "donna_jw_caceres",
      name: "J.W. Caceres Discovery Intermediate Academy (Donna ISD)",
      shortName: "J.W. Caceres Discovery Academy",
      center: [26.1668, -98.0700],
      areaSqFt: 450000,
      treeLimit: 158,
      latOffset: 0,
      lngOffset: 0
    },
    mercedes_hinojosa: {
      id: "mercedes_hinojosa",
      name: "Ruben Hinojosa Elementary School (Mercedes ISD)",
      shortName: "Ruben Hinojosa Elementary",
      center: [26.1557, -97.9868],
      areaSqFt: 418000,
      treeLimit: 142,
      latOffset: -0.0111,
      lngOffset: 0.0842
    }
  };

  const DEFAULT_BOUNDARY_DATA = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          category: "Campus Boundary",
          campus: "J.W. Caceres & M. Rivas Academy"
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-98.07254821467039, 26.16625940702799],
              [-98.07220327840014, 26.168215328607253],
              [-98.06862395428908, 26.1677205540179],
              [-98.0690146767054, 26.165738124571327],
              [-98.0722486244963, 26.166228356210034],
              [-98.07254821467039, 26.16625940702799]
            ]
          ]
        }
      }
    ]
  };

  let activeCampusKey = "donna_jw_caceres";
  try {
    if (localStorage.getItem("activeCampusId") === "mercedes_hinojosa") {
      activeCampusKey = "mercedes_hinojosa";
    }
  } catch (e) {}

  let activeSoilRegimeKey = soilRegimeSelect ? soilRegimeSelect.value : "semi_urban_realistic";

  if (yearSlider && Number(yearSlider.value) === 2025) {
    yearSlider.value = 2026;
  }

  const benchmarkYears = [2024, 2026, 2028, 2030, 2035, 2040, 2045, 2050, 2055];

  function getSoilRegime(regimeKey) {
    const regimes = config.soilRegimes || {};
    return regimes[regimeKey] || regimes.semi_urban_realistic || {
      id: "semi_urban_realistic",
      shortLabel: "Realistic Schoolyard Growth",
      growthMultiplier: 0.64,
      maxRadiusMultiplier: 0.84,
      establishmentLagYears: 2.0,
      survivalRate: 0.94,
      bulkDensityGcm3: "1.48 g/cm³",
      organicMatterPct: "1.8%",
      summary: "Realistic 10–15 year growth projection calibrated for South Texas schoolyards."
    };
  }

  function updateSoilDiagnosticStrip() {
    const reg = getSoilRegime(activeSoilRegimeKey);
    const summaryEl = document.getElementById("soilRegimeSummaryText");
    const bulkEl = document.getElementById("soilBulkDensityVal");
    const omEl = document.getElementById("soilOrganicMatterVal");
    const survEl = document.getElementById("soilSurvivalVal");

    if (summaryEl) summaryEl.textContent = reg.summary;
    if (bulkEl) bulkEl.textContent = reg.bulkDensityGcm3;
    if (omEl) omEl.textContent = reg.organicMatterPct;
    if (survEl) survEl.textContent = `${Math.round(reg.survivalRate * 100)}% Survival (${reg.establishmentLagYears}-Yr Lag)`;
  }

  function updateSummary() {
    const year = yearSlider ? Number(yearSlider.value) : 2026;
    const prof = CAMPUS_PROFILES[activeCampusKey];
    if (yearReadout) yearReadout.textContent = year;
    if (summaryText) summaryText.textContent = `Showing ${prof.shortName} in ${year}`;
    if (activeYearLabel) activeYearLabel.textContent = year;
  }

  function loadNotes() {
    try {
      const notes = localStorage.getItem("canopy-notes");
      if (notes && canopyNotes) canopyNotes.value = notes;
    } catch (e) {}
  }

  function saveNotes() {
    if (!saveCanopyNotes) return;
    try {
      localStorage.setItem("canopy-notes", canopyNotes ? canopyNotes.value : "");
    } catch (e) {}
    const originalText = saveCanopyNotes.textContent;
    saveCanopyNotes.textContent = "Saved!";
    saveCanopyNotes.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
      saveCanopyNotes.textContent = originalText;
      saveCanopyNotes.style.backgroundColor = "";
    }, 2000);
  }

  if (saveCanopyNotes) saveCanopyNotes.addEventListener("click", saveNotes);
  loadNotes();

  // Safely Initialize Leaflet Map (even if external CDN is delayed or blocked)
  const initialProfile = CAMPUS_PROFILES[activeCampusKey];
  let map = null;
  let boundaryLayer = null;
  let treeCanopyLayer = null;

  if (typeof window.L !== "undefined") {
    try {
      map = L.map("canopyMap", {
        zoomControl: false
      }).setView(initialProfile.center, (config && config.map && config.map.zoom) || 17);

      L.control.zoom({ position: "topright" }).addTo(map);
      setTimeout(() => {
        if (map) map.invalidateSize();
      }, 200);

      const googleHybrid = L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        attribution: "Google Satellite"
      });
      const esriImagery = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19,
        attribution: "Esri World Imagery"
      });

      googleHybrid.on("tileerror", () => {
        if (map && !map.hasLayer(esriImagery)) {
          esriImagery.addTo(map);
        }
      });
      googleHybrid.addTo(map);

      boundaryLayer = L.layerGroup().addTo(map);
      treeCanopyLayer = L.layerGroup().addTo(map);
    } catch (err) {
      console.warn("Leaflet map initialization warning:", err);
    }
  }

  let rawBoundaryData = DEFAULT_BOUNDARY_DATA;
  let mockTreesData = window.MOCK_TREES_DATA || null;

  function drawCampusBoundary() {
    if (!map || !boundaryLayer || typeof window.L === "undefined") return;
    boundaryLayer.clearLayers();
    if (!rawBoundaryData || !rawBoundaryData.features || !rawBoundaryData.features[0]) return;
    const prof = CAMPUS_PROFILES[activeCampusKey];
    const copy = JSON.parse(JSON.stringify(rawBoundaryData));
    if (copy.features[0].geometry && copy.features[0].geometry.coordinates && copy.features[0].geometry.coordinates[0]) {
      copy.features[0].geometry.coordinates[0] = copy.features[0].geometry.coordinates[0].map(pt => [
        pt[0] + prof.lngOffset,
        pt[1] + prof.latOffset
      ]);
    }
    const geoJsonLayer = L.geoJSON(copy, {
      style: {
        color: "#ffff00",
        weight: 3,
        fillColor: "transparent",
        fillOpacity: 0
      }
    });
    boundaryLayer.addLayer(geoJsonLayer);
    const bounds = geoJsonLayer.getBounds();
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }

  // Draw immediately with embedded boundary, then optionally refresh from JSON
  drawCampusBoundary();
  fetch("data/campus_boundary.json")
    .then(response => (response.ok ? response.json() : null))
    .then(data => {
      if (data && data.features) {
        rawBoundaryData = data;
        drawCampusBoundary();
      }
    })
    .catch(() => {});

  function getColorString(colorArr) {
    if (Array.isArray(colorArr)) {
      return `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3] || 1})`;
    }
    return colorArr || "rgba(34, 139, 34, 0.65)";
  }

  function getActiveCampusTrees() {
    if (!mockTreesData || !mockTreesData.features) return [];
    const prof = CAMPUS_PROFILES[activeCampusKey];
    return mockTreesData.features.slice(0, prof.treeLimit);
  }

  // Soil-compaction & establishment-lag adjusted crown radius for a single tree
  function evaluateTreeAtYear(feature, idx, targetYear, regimeKey) {
    const props = feature.properties;
    const reg = getSoilRegime(regimeKey);
    const plantYear = props.plantYear || 2026;

    if (targetYear < plantYear) {
      return { planted: false, surviving: false, radiusFt: 0, maxR: props.maxRadiusFeet || 20, effRate: 0 };
    }

    const isLegacy = Boolean(props.isLegacy || plantYear <= 2022);
    if (!isLegacy && targetYear > plantYear) {
      const hash = ((idx * 37) % 100) / 100;
      if (hash >= reg.survivalRate) {
        return { planted: true, surviving: false, radiusFt: 0, maxR: props.maxRadiusFeet || 20, effRate: 0 };
      }
    }

    const spCfg = (config.treeSpecies && config.treeSpecies[props.species]) || {
      growthRateFeetPerYear: 1.05,
      matureRadiusFeet: 20.0,
      compactionPenalty: 0.65
    };

    const rawYears = targetYear - plantYear;
    const effYears = isLegacy
      ? rawYears * 0.12
      : Math.max(0, rawYears - (rawYears > 0 ? reg.establishmentLagYears : 0));

    const speciesSoilFactor = (regimeKey === "unamended_compacted")
      ? (0.55 + (spCfg.compactionPenalty || 0.65) * 0.45)
      : 1.0;

    const effRate = spCfg.growthRateFeetPerYear * reg.growthMultiplier * speciesSoilFactor;
    const maxR = isLegacy ? props.maxRadiusFeet : +(props.maxRadiusFeet * reg.maxRadiusMultiplier).toFixed(1);

    let currentRadiusFeet = props.baseRadiusFeet + (effYears * effRate);
    if (currentRadiusFeet > maxR) currentRadiusFeet = maxR;

    return {
      planted: true,
      surviving: true,
      radiusFt: currentRadiusFeet,
      maxR,
      effRate: +effRate.toFixed(2)
    };
  }

  function calculateYearShadeMetrics(targetYear, regimeKey = activeSoilRegimeKey) {
    const trees = getActiveCampusTrees();
    const prof = CAMPUS_PROFILES[activeCampusKey];
    if (!trees.length) {
      return { activeTrees: 0, mortalityTrees: 0, shadeAreaSqFt: 0, coverPercent: "0.0", tempDrop: "0.0", solarBlocked: 0 };
    }

    let activeTrees = 0;
    let mortalityTrees = 0;
    let totalShadeSqFt = 0;

    trees.forEach((feature, idx) => {
      const ev = evaluateTreeAtYear(feature, idx, targetYear, regimeKey);
      if (!ev.planted) return;
      if (!ev.surviving) {
        mortalityTrees++;
        return;
      }
      activeTrees++;
      totalShadeSqFt += Math.PI * ev.radiusFt * ev.radiusFt;
    });

    const effectiveShadeSqFt = totalShadeSqFt * 0.88;
    let coverPercent = (effectiveShadeSqFt / prof.areaSqFt) * 100;
    if (coverPercent > 100) coverPercent = 100;

    const tempDrop = (4.5 + (coverPercent * 0.34)).toFixed(1);
    const solarBlocked = Math.round(effectiveShadeSqFt * 0.604 * 0.85);

    return {
      activeTrees,
      mortalityTrees,
      shadeAreaSqFt: Math.round(effectiveShadeSqFt),
      coverPercent: coverPercent.toFixed(1),
      tempDrop,
      solarBlocked
    };
  }

  function updateLiveShadeCardAndBreakdown(targetYear) {
    const metrics = calculateYearShadeMetrics(targetYear, activeSoilRegimeKey);

    if (liveTreeCount) {
      liveTreeCount.textContent = `${metrics.activeTrees} Trees`;
    }
    if (liveShadeArea) liveShadeArea.textContent = `${metrics.shadeAreaSqFt.toLocaleString()} sq ft`;
    if (liveCoverPercent) liveCoverPercent.textContent = `${metrics.coverPercent}%`;
    if (liveTempCooling) liveTempCooling.textContent = `-${metrics.tempDrop}°F`;
    if (liveSolarBlocked) liveSolarBlocked.textContent = `${metrics.solarBlocked.toLocaleString()} kWh/d`;

    const shadePct = parseFloat(metrics.coverPercent);
    const asphaltPct = Math.max(10, (55 - shadePct * 0.45)).toFixed(1);
    const turfPct = Math.max(0, (100 - shadePct - parseFloat(asphaltPct))).toFixed(1);

    if (barShade) barShade.style.width = `${shadePct}%`;
    if (barAsphalt) barAsphalt.style.width = `${asphaltPct}%`;
    if (barTurf) barTurf.style.width = `${turfPct}%`;

    if (lblPctShade) lblPctShade.textContent = `${shadePct}%`;
    if (lblPctAsphalt) lblPctAsphalt.textContent = `${asphaltPct}%`;
    if (lblPctTurf) lblPctTurf.textContent = `${turfPct}%`;

    highlightForecastTableRow(targetYear);
    renderCanopyPrePostTable(targetYear);
  }

  function renderCanopyPrePostTable(activeYear) {
    const tbody = document.getElementById("canopyPrePostTableBody");
    const stageBtns = document.querySelectorAll(".canopy-stage-btn");
    stageBtns.forEach(btn => {
      btn.classList.toggle("active", Number(btn.dataset.year) === activeYear);
    });

    if (!tbody || !mockTreesData) return;

    const mPre = calculateYearShadeMetrics(2024, activeSoilRegimeKey);
    const mPost = calculateYearShadeMetrics(2026, activeSoilRegimeKey);
    const mMat = calculateYearShadeMetrics(2040, activeSoilRegimeKey);

    const rows = [
      {
        label: "🌴 Total Campus Trees",
        pre: `${mPre.activeTrees} Existing Trees`,
        post: `${mPost.activeTrees} Trees After Planting`,
        mat: `${mMat.activeTrees} Established Trees`,
        delta: `+${mMat.activeTrees - mPre.activeTrees} New Campus Trees`
      },
      {
        label: "☂️ Cool Shaded Ground Area",
        pre: `${mPre.shadeAreaSqFt.toLocaleString()} sq ft`,
        post: `${mPost.shadeAreaSqFt.toLocaleString()} sq ft`,
        mat: `${mMat.shadeAreaSqFt.toLocaleString()} sq ft`,
        delta: `+${(mMat.shadeAreaSqFt - mPre.shadeAreaSqFt).toLocaleString()} sq ft of New Shade`
      },
      {
        label: "🌳 Schoolyard Covered in Shade (%)",
        pre: `${mPre.coverPercent}% of Campus`,
        post: `${mPost.coverPercent}% of Campus`,
        mat: `${mMat.coverPercent}% of Campus`,
        delta: `+${(parseFloat(mMat.coverPercent) - parseFloat(mPre.coverPercent)).toFixed(1)}% More Shade`
      },
      {
        label: "🌡️ Ground Cooling Under Trees",
        pre: `-${mPre.tempDrop}°F Cooler`,
        post: `-${mPost.tempDrop}°F Cooler`,
        mat: `-${mMat.tempDrop}°F Cooler`,
        delta: `-${(parseFloat(mMat.tempDrop) - parseFloat(mPre.tempDrop)).toFixed(1)}°F Extra Cooling`
      }
    ];

    tbody.innerHTML = rows.map(r => `
      <tr>
        <td><strong>${r.label}</strong></td>
        <td style="${activeYear <= 2024 ? 'background:#fef3c7; font-weight:700;' : ''}">${r.pre}</td>
        <td style="${activeYear >= 2025 && activeYear <= 2027 ? 'background:#e0f2fe; font-weight:700;' : ''}">${r.post}</td>
        <td style="${activeYear >= 2035 ? 'background:#dcfce7; font-weight:700; color:#14532d;' : ''}">${r.mat}</td>
        <td><span class="delta-badge">${r.delta}</span></td>
      </tr>
    `).join("");
  }

  function renderForecastTable() {
    if (!forecastTableBody || !mockTreesData) return;
    forecastTableBody.innerHTML = "";
    const currentSelectedYear = yearSlider ? Number(yearSlider.value) : 2026;

    benchmarkYears.forEach(yr => {
      const m = calculateYearShadeMetrics(yr, activeSoilRegimeKey);
      const tr = document.createElement("tr");
      tr.dataset.year = yr;
      tr.style.cursor = "pointer";
      tr.style.borderBottom = "1px solid #e0e0e0";

      if (yr === currentSelectedYear) {
        tr.style.backgroundColor = "var(--green-light)";
        tr.style.fontWeight = "bold";
      }

      tr.innerHTML = `
        <td style="padding: 8px 6px; font-weight: bold;">${yr}</td>
        <td style="padding: 8px 6px;">${m.activeTrees}</td>
        <td style="padding: 8px 6px; font-weight: 600;">${m.shadeAreaSqFt.toLocaleString()}</td>
        <td style="padding: 8px 6px; color: #2e7d32; font-weight: bold;">${m.coverPercent}%</td>
        <td style="padding: 8px 6px; color: #1565c0; font-weight: bold;">-${m.tempDrop}°F</td>
      `;

      tr.addEventListener("click", () => {
        if (yearSlider) yearSlider.value = yr;
        if (yearReadout) yearReadout.textContent = yr;
        updateSummary();
        renderCanopy();
      });

      forecastTableBody.appendChild(tr);
    });
  }

  function highlightForecastTableRow(activeYr) {
    if (!forecastTableBody) return;
    forecastTableBody.querySelectorAll("tr").forEach(tr => {
      const yr = Number(tr.dataset.year);
      tr.style.backgroundColor = yr === activeYr ? "var(--green-light)" : "";
      tr.style.fontWeight = yr === activeYr ? "bold" : "normal";
    });
  }

  function renderTreeRegistryTable(targetYear) {
    const tbody = document.getElementById("treeRegistryTableBody");
    const filterSelect = document.getElementById("speciesFilter");
    const registryYearLabel = document.getElementById("registryYearLabel");
    const dynYearTexts = document.querySelectorAll(".dyn-year-text");

    if (!tbody || !mockTreesData) return;

    if (registryYearLabel) registryYearLabel.textContent = targetYear;
    dynYearTexts.forEach(el => { el.textContent = targetYear; });

    const selectedFilter = filterSelect ? filterSelect.value : "all";
    const prof = CAMPUS_PROFILES[activeCampusKey];
    const trees = getActiveCampusTrees();
    tbody.innerHTML = "";

    trees.forEach((feature, idx) => {
      const props = feature.properties;
      const coords = [
        feature.geometry.coordinates[0] + prof.lngOffset,
        feature.geometry.coordinates[1] + prof.latOffset
      ];

      if (selectedFilter !== "all" && props.species !== selectedFilter) return;

      const ev = evaluateTreeAtYear(feature, idx, targetYear, activeSoilRegimeKey);
      if (ev.planted && !ev.surviving) return;
      const areaSqFt = (ev.planted && ev.surviving) ? Math.round(Math.PI * ev.radiusFt * ev.radiusFt) : 0;
      const widthFt = (ev.planted && ev.surviving) ? (ev.radiusFt * 2).toFixed(1) : "0.0";

      let statusText = `<span style="color:#777; font-style:italic;">Planted in ${props.plantYear}</span>`;
      let rowBg = "#f8f9fa";
      if (ev.planted && ev.surviving) {
        statusText = `${widthFt} ft wide`;
        rowBg = "#ffffff";
      }

      const tr = document.createElement("tr");
      tr.style.backgroundColor = rowBg;
      tr.style.borderBottom = "1px solid var(--border)";

      tr.innerHTML = `
        <td style="padding: 8px 10px; font-weight: bold; color: var(--green-dark);">Tree #${props.id}</td>
        <td style="padding: 8px 10px; font-weight: 600;">${props.species}</td>
        <td style="padding: 8px 10px;">${props.plantYear}${props.isLegacy ? " (Existing)" : ""}</td>
        <td style="padding: 8px 10px; font-weight: bold; color: #1565c0;">${statusText}</td>
        <td style="padding: 8px 10px; font-weight: bold; color: #2e7d32;">${areaSqFt.toLocaleString()} sq ft</td>
        <td style="padding: 8px 10px; text-align: center;">
          <button type="button" class="locate-btn" data-lat="${coords[1]}" data-lng="${coords[0]}"
            style="background: var(--green-dark); color: white; border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">
            📍 Find on Map
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".locate-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lat = parseFloat(btn.dataset.lat);
        const lng = parseFloat(btn.dataset.lng);
        if (map && typeof map.flyTo === "function") {
          map.flyTo([lat, lng], 19, { duration: 1.0 });
        }
      });
    });
  }

  function renderCanopy() {
    if (!mockTreesData) return;

    const targetYear = yearSlider ? Number(yearSlider.value) : 2026;
    const prof = CAMPUS_PROFILES[activeCampusKey];
    const trees = getActiveCampusTrees();

    if (map && treeCanopyLayer && typeof window.L !== "undefined") {
      treeCanopyLayer.clearLayers();
      trees.forEach((feature, idx) => {
        const props = feature.properties;
        const ev = evaluateTreeAtYear(feature, idx, targetYear, activeSoilRegimeKey);
        if (!ev.planted || !ev.surviving) return;

        const coords = [
          feature.geometry.coordinates[0] + prof.lngOffset,
          feature.geometry.coordinates[1] + prof.latOffset
        ];

        const spCfg = (config.treeSpecies && config.treeSpecies[props.species]) || { color: [34, 139, 34, 0.65] };
        const currentRadiusMeters = ev.radiusFt * 0.3048;
        const colorStr = getColorString(spCfg.color);

        const circle = L.circle([coords[1], coords[0]], {
          radius: currentRadiusMeters,
          color: "#ffffff",
          weight: 1,
          fillColor: colorStr,
          fillOpacity: 0.8
        });

        circle.bindPopup(`
          <b>🌳 Tree #${props.id}: ${props.species}</b><br/>
          <b>Year Planted:</b> ${props.plantYear}<br/>
          <b>Canopy Width (${targetYear}):</b> ${(ev.radiusFt * 2).toFixed(1)} ft across<br/>
          <b>Ground Shaded:</b> ${Math.round(Math.PI * ev.radiusFt * ev.radiusFt).toLocaleString()} sq ft
        `);
        treeCanopyLayer.addLayer(circle);
      });
    }

    updateSoilDiagnosticStrip();
    renderForecastTable();
    updateLiveShadeCardAndBreakdown(targetYear);
    renderTreeRegistryTable(targetYear);
  }

  // Event Listeners
  document.querySelectorAll(".canopy-stage-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetYr = Number(btn.dataset.year);
      if (yearSlider) yearSlider.value = targetYr;
      if (yearReadout) yearReadout.textContent = targetYr;
      updateSummary();
      renderCanopy();
    });
  });

  document.querySelectorAll(".canopy-campus-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.campus === activeCampusKey);
    btn.addEventListener("click", () => {
      document.querySelectorAll(".canopy-campus-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCampusKey = btn.dataset.campus;
      const prof = CAMPUS_PROFILES[activeCampusKey];
      try {
        localStorage.setItem("activeCampusId", prof.id);
        localStorage.setItem("activeCampusName", prof.name);
        localStorage.setItem("activeCampusLat", prof.center[0]);
        localStorage.setItem("activeCampusLng", prof.center[1]);
      } catch (e) {}
      const titleEl = document.getElementById("canopyCampusTitle");
      if (titleEl) titleEl.textContent = prof.shortName;
      drawCampusBoundary();
      renderCanopy();
    });
  });

  if (soilRegimeSelect) {
    soilRegimeSelect.addEventListener("change", () => {
      activeSoilRegimeKey = soilRegimeSelect.value;
      updateSummary();
      renderCanopy();
    });
  }

  const speciesFilter = document.getElementById("speciesFilter");
  if (speciesFilter) {
    speciesFilter.addEventListener("change", () => {
      renderTreeRegistryTable(yearSlider ? Number(yearSlider.value) : 2026);
    });
  }

  if (yearSlider) {
    yearSlider.addEventListener("input", () => {
      updateSummary();
      renderCanopy();
    });
  }

  if (scenarioSelect) scenarioSelect.addEventListener("change", updateSummary);

  let isPlaying = false;
  let playInterval;
  const playBtn = document.getElementById("playBtn");

  function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? "Pause" : "Play";
    playBtn.style.background = isPlaying ? "#d32f2f" : "#2e7d32";

    if (isPlaying) {
      playInterval = setInterval(() => {
        let currentVal = parseInt(yearSlider.value, 10) + 1;
        if (currentVal > 2055) currentVal = 2024;
        yearSlider.value = currentVal;
        yearReadout.textContent = currentVal;
        updateSummary();
        renderCanopy();
      }, 500);
    } else {
      clearInterval(playInterval);
    }
  }

  if (playBtn) playBtn.addEventListener("click", togglePlay);
  if (yearSlider) {
    yearSlider.addEventListener("mousedown", () => {
      if (isPlaying) togglePlay();
    });
  }

  // Render immediately using synchronous window.MOCK_TREES_DATA if present
  updateSummary();
  const titleEl = document.getElementById("canopyCampusTitle");
  if (titleEl) titleEl.textContent = CAMPUS_PROFILES[activeCampusKey].shortName;
  if (mockTreesData) {
    renderCanopy();
  }

  // Also fetch data/mock_trees.json as an async backup if window.MOCK_TREES_DATA wasn't loaded
  if (!mockTreesData) {
    fetch("data/mock_trees.json")
      .then(response => response.json())
      .then(data => {
        mockTreesData = data;
        renderCanopy();
      })
      .catch(err => console.error("Error loading mock trees:", err));
  }
})();
