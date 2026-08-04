(function () {
  const config = window.APP_CONFIG;
  const yearSlider = document.getElementById("yearSlider");
  const yearReadout = document.getElementById("yearReadout");
  const scenarioSelect = document.getElementById("scenarioSelect");
  const summaryText = document.getElementById("summaryText");
  const canopyNotes = document.getElementById("canopyNotes");
  const saveCanopyNotes = document.getElementById("saveCanopyNotes");

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

  const TOTAL_CAMPUS_AREA_SQFT = 450000; // Total campus ground surface (approx 10.3 acres)
  const benchmarkYears = [2020, 2024, 2026, 2030, 2035, 2040, 2045, 2050, 2055];

  function updateSummary() {
    const year = Number(yearSlider.value);
    const scenario = scenarioSelect ? scenarioSelect.value : 'observed';
    yearReadout.textContent = year;
    summaryText.textContent = `Scenario: ${scenario} | Year: ${year}`;
    if (activeYearLabel) activeYearLabel.textContent = year;
  }

  function loadNotes() {
    const notes = localStorage.getItem("canopy-notes");
    if (notes && canopyNotes) canopyNotes.value = notes;
  }

  function saveNotes() {
    if (!saveCanopyNotes) return;
    localStorage.setItem("canopy-notes", canopyNotes ? canopyNotes.value : "");
    const originalText = saveCanopyNotes.textContent;
    saveCanopyNotes.textContent = "Saved!";
    saveCanopyNotes.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
      saveCanopyNotes.textContent = originalText;
      saveCanopyNotes.style.backgroundColor = "";
    }, 2000);
  }

  yearSlider.addEventListener("input", updateSummary);
  if (scenarioSelect) scenarioSelect.addEventListener("change", updateSummary);
  if (saveCanopyNotes) saveCanopyNotes.addEventListener("click", saveNotes);

  updateSummary();
  loadNotes();

  // Initialize Map
  // Initialize Map
  const DEFAULT_CAMPUS_CENTER = [26.1668, -98.0710];
  let activeLng = parseFloat(localStorage.getItem("activeCampusLng"));
  let activeLat = parseFloat(localStorage.getItem("activeCampusLat"));
  let mapCenter = (!isNaN(activeLng) && !isNaN(activeLat) && activeLat > 25.5 && activeLat < 27.5) 
    ? [activeLat, activeLng] 
    : DEFAULT_CAMPUS_CENTER;

  const map = L.map('canopyMap', {
    zoomControl: false
  }).setView(mapCenter, config?.map?.zoom || 17);

  L.control.zoom({ position: 'topright' }).addTo(map);
  setTimeout(() => { map.invalidateSize(); }, 200);

  // Using Google hybrid layer since the original was a satellite view.
  L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: 'Google'
  }).addTo(map);

  const boundaryLayer = L.layerGroup().addTo(map);
  const treeCanopyLayer = L.layerGroup().addTo(map);

  // Fetch and draw boundary
  fetch("data/campus_boundary.json")
    .then(response => response.json())
    .then(data => {
      if (!data.features || !data.features[0]) return;
      
      const geoJsonLayer = L.geoJSON(data, {
        style: {
          color: '#ffff00', // Yellow border
          weight: 3,
          fillColor: 'transparent',
          fillOpacity: 0
        }
      });
      boundaryLayer.addLayer(geoJsonLayer);
      
      // Calculate center for buffer
      const bounds = geoJsonLayer.getBounds();
      const center = bounds.getCenter();
      
      const bufferCircle = L.circle(center, {
        radius: 500, // 500 meters
        color: '#ffa500', // Orange border
        weight: 2,
        dashArray: '5, 10',
        fillColor: '#ffa500',
        fillOpacity: 0.1
      });
      boundaryLayer.addLayer(bufferCircle);
      
      map.fitBounds(bounds, { padding: [30, 30] });
    })
    .catch(err => console.error("Error loading boundary:", err));

  let mockTreesData = null;

  function getColorString(colorArr) {
    if (Array.isArray(colorArr)) {
      return `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3] || 1})`;
    }
    return colorArr || 'rgba(34, 139, 34, 0.6)';
  }

  // --- Dynamic Ground Shade & Surface Calculation Math ---
  function calculateYearShadeMetrics(targetYear) {
    if (!mockTreesData || !mockTreesData.features) {
      return { activeTrees: 0, shadeAreaSqFt: 0, coverPercent: "0.0", tempDrop: "0.0", solarBlocked: 0 };
    }

    let activeTrees = 0;
    let totalShadeSqFt = 0;

    mockTreesData.features.forEach(feature => {
      const props = feature.properties;
      if (targetYear < props.plantYear) return;

      activeTrees++;
      const speciesConfig = (config && config.treeSpecies && config.treeSpecies[props.species]) || { growthRateFeetPerYear: 2 };
      const yearsGrown = targetYear - props.plantYear;

      let currentRadiusFeet = props.baseRadiusFeet + (yearsGrown * speciesConfig.growthRateFeetPerYear);
      if (currentRadiusFeet > props.maxRadiusFeet) currentRadiusFeet = props.maxRadiusFeet;

      // Canopy area = π * r^2
      const area = Math.PI * currentRadiusFeet * currentRadiusFeet;
      totalShadeSqFt += area;
    });

    // Account for overlapping canopy factor (~ 0.88)
    const effectiveShadeSqFt = totalShadeSqFt * 0.88;
    let coverPercent = (effectiveShadeSqFt / TOTAL_CAMPUS_AREA_SQFT) * 100;
    if (coverPercent > 100) coverPercent = 100;

    // Est. Ground Surface Cooling Drop (°F) under shade
    const tempDrop = (8.5 + (coverPercent * 0.25)).toFixed(1);

    // Solar Radiation Intercepted/Blocked (kWh/day)
    const solarBlocked = Math.round(effectiveShadeSqFt * 0.604 * 0.85);

    return {
      activeTrees,
      shadeAreaSqFt: Math.round(effectiveShadeSqFt),
      coverPercent: coverPercent.toFixed(1),
      tempDrop,
      solarBlocked
    };
  }

  function updateLiveShadeCardAndBreakdown(targetYear) {
    const metrics = calculateYearShadeMetrics(targetYear);

    if (liveTreeCount) liveTreeCount.textContent = metrics.activeTrees;
    if (liveShadeArea) liveShadeArea.textContent = `${metrics.shadeAreaSqFt.toLocaleString()} sq ft`;
    if (liveCoverPercent) liveCoverPercent.textContent = `${metrics.coverPercent}%`;
    if (liveTempCooling) liveTempCooling.textContent = `-${metrics.tempDrop}°F`;
    if (liveSolarBlocked) liveSolarBlocked.textContent = `${metrics.solarBlocked.toLocaleString()} kWh/d`;

    // Surface Breakdown (%): Shade vs Hardscape vs Turf
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
  }

  function renderForecastTable() {
    if (!forecastTableBody) return;
    forecastTableBody.innerHTML = "";

    const currentSelectedYear = Number(yearSlider.value);

    benchmarkYears.forEach(yr => {
      const m = calculateYearShadeMetrics(yr);
      const tr = document.createElement("tr");
      tr.dataset.year = yr;
      tr.style.cursor = "pointer";
      tr.style.borderBottom = "1px solid #e0e0e0";
      tr.style.transition = "background-color 0.2s";

      if (yr === currentSelectedYear) {
        tr.style.backgroundColor = "var(--green-light)";
        tr.style.fontWeight = "bold";
      }

      tr.innerHTML = `
        <td style="padding: 10px 12px; font-weight: bold;">${yr}</td>
        <td style="padding: 10px 12px;">${m.activeTrees}</td>
        <td style="padding: 10px 12px; font-weight: 600;">${m.shadeAreaSqFt.toLocaleString()} sq ft</td>
        <td style="padding: 10px 12px; color: #2e7d32; font-weight: bold;">${m.coverPercent}%</td>
        <td style="padding: 10px 12px; color: #1565c0; font-weight: bold;">-${m.tempDrop}°F</td>
        <td style="padding: 10px 12px; color: #e65100; font-weight: bold;">${m.solarBlocked.toLocaleString()} kWh/d</td>
      `;

      tr.addEventListener("click", () => {
        yearSlider.value = yr;
        yearReadout.textContent = yr;
        updateSummary();
        renderCanopy();
      });

      tr.addEventListener("mouseenter", () => {
        if (Number(yearSlider.value) !== yr) tr.style.backgroundColor = "#f5f5f5";
      });
      tr.addEventListener("mouseleave", () => {
        if (Number(yearSlider.value) !== yr) tr.style.backgroundColor = "";
      });

      forecastTableBody.appendChild(tr);
    });
  }

  function highlightForecastTableRow(activeYr) {
    if (!forecastTableBody) return;
    const rows = forecastTableBody.querySelectorAll("tr");
    rows.forEach(tr => {
      const yr = Number(tr.dataset.year);
      if (yr === activeYr) {
        tr.style.backgroundColor = "var(--green-light)";
        tr.style.fontWeight = "bold";
      } else {
        tr.style.backgroundColor = "";
        tr.style.fontWeight = "normal";
      }
    });
  }

  const renderCanopy = () => {
    if (!mockTreesData) return;

    treeCanopyLayer.clearLayers();
    const targetYear = Number(yearSlider.value);

    mockTreesData.features.forEach(feature => {
      const props = feature.properties;
      const coords = feature.geometry.coordinates; // [lng, lat]

      if (targetYear < props.plantYear) return;

      const speciesConfig = (config && config.treeSpecies && config.treeSpecies[props.species]) || { growthRateFeetPerYear: 2, color: [34, 139, 34, 0.6] };
      const yearsGrown = targetYear - props.plantYear;

      let currentRadiusFeet = props.baseRadiusFeet + (yearsGrown * speciesConfig.growthRateFeetPerYear);
      if (currentRadiusFeet > props.maxRadiusFeet) currentRadiusFeet = props.maxRadiusFeet;

      const currentRadiusMeters = currentRadiusFeet * 0.3048;
      const colorStr = getColorString(speciesConfig.color);

      const circle = L.circle([coords[1], coords[0]], {
        radius: currentRadiusMeters,
        color: '#ffffff',
        weight: 1,
        fillColor: colorStr,
        fillOpacity: 0.8
      });

      circle.bindPopup(`<b>${props.species}</b><br/>Planted: ${props.plantYear}<br/>Current Year: ${targetYear}<br/>Estimated Canopy Radius: ${currentRadiusFeet.toFixed(1)} ft`);
      treeCanopyLayer.addLayer(circle);
    });

    updateLiveShadeCardAndBreakdown(targetYear);
  };

  yearSlider.addEventListener("input", () => {
    updateSummary();
    renderCanopy();
  });

  let isPlaying = false;
  let playInterval;
  const playBtn = document.getElementById('playBtn');

  function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? "Pause" : "Play";
    playBtn.style.background = isPlaying ? "#d32f2f" : "#2e7d32";

    if (isPlaying) {
      playInterval = setInterval(() => {
        let currentVal = parseInt(yearSlider.value, 10);
        currentVal += 1;
        if (currentVal > 2055) currentVal = 2020;

        yearSlider.value = currentVal;
        yearReadout.textContent = currentVal;
        updateSummary();
        renderCanopy();
      }, 500);
    } else {
      clearInterval(playInterval);
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }

  yearSlider.addEventListener('mousedown', () => {
    if (isPlaying) togglePlay();
  });

  fetch("data/mock_trees.json")
    .then(response => response.json())
    .then(data => {
      mockTreesData = data;
      renderForecastTable();
      renderCanopy();
    })
    .catch(err => console.error("Error loading mock trees:", err));
})();

