(function () {
  const config = window.APP_CONFIG;
  const yearSlider = document.getElementById("yearSlider");
  const yearReadout = document.getElementById("yearReadout");
  const scenarioSelect = document.getElementById("scenarioSelect");
  const summaryText = document.getElementById("summaryText");
  const trend2020 = document.getElementById("trend2020");
  const trend2025 = document.getElementById("trend2025");
  const trend2030 = document.getElementById("trend2030");
  const canopyNotes = document.getElementById("canopyNotes");
  const saveCanopyNotes = document.getElementById("saveCanopyNotes");

  function updateSummary() {
    const year = Number(yearSlider.value);
    const scenario = scenarioSelect.value;
    yearReadout.textContent = year;
    summaryText.textContent = `Scenario: ${scenario} | Year: ${year}`;
  }

  function loadNotes() {
    const notes = localStorage.getItem("canopy-notes");
    if (notes) canopyNotes.value = notes;
  }

  function saveNotes() {
    localStorage.setItem("canopy-notes", canopyNotes.value || "");
    const originalText = saveCanopyNotes.textContent;
    saveCanopyNotes.textContent = "Saved!";
    saveCanopyNotes.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
      saveCanopyNotes.textContent = originalText;
      saveCanopyNotes.style.backgroundColor = "";
    }, 2000);
  }

  yearSlider.addEventListener("input", updateSummary);
  scenarioSelect.addEventListener("change", updateSummary);
  saveCanopyNotes.addEventListener("click", saveNotes);

  updateSummary();
  loadNotes();

  // Initialize Map
  let activeLng = parseFloat(localStorage.getItem("activeCampusLng"));
  let activeLat = parseFloat(localStorage.getItem("activeCampusLat"));
  let mapCenter = !isNaN(activeLng) && !isNaN(activeLat) ? [activeLat, activeLng] : [26.1704, -98.0520];

  const map = L.map('canopyMap', {
    zoomControl: false
  }).setView(mapCenter, config?.map?.zoom || 17);

  L.control.zoom({ position: 'topright' }).addTo(map);

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
      if (!data.features[0]) return;
      
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
      
      map.fitBounds(bounds);
    })
    .catch(err => console.error("Error loading boundary:", err));

  let mockTreesData = null;

  function getColorString(colorArr) {
    if (Array.isArray(colorArr)) {
      return `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3] || 1})`;
    }
    return colorArr || 'rgba(34, 139, 34, 0.6)';
  }

  const renderCanopy = () => {
    if (!mockTreesData) return;

    treeCanopyLayer.clearLayers();
    const targetYear = Number(yearSlider.value);

    mockTreesData.features.forEach(feature => {
      const props = feature.properties;
      const coords = feature.geometry.coordinates; // [lng, lat]

      if (targetYear < props.plantYear) return;

      const speciesConfig = config.treeSpecies[props.species] || { growthRateFeetPerYear: 2, color: [34, 139, 34, 0.6] };
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
  };

  yearSlider.addEventListener("input", renderCanopy);

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
      renderCanopy();
    })
    .catch(err => console.error("Error loading mock trees:", err));

  trend2020.textContent = "5.2%";
  trend2025.textContent = "8.1%";
  trend2030.textContent = "36.4%";
})();
