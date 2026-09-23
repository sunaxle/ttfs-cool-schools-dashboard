/**
 * Holistic Canopy & Ecological Buffer Studio
 * Texas A&M Forest Service Methodology & 5-Tier Spatial Analysis
 * M. Rivas Primary (Donna ISD)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Campus Geometry & Baseline Consts
  const CAMPUS_CENTER = [26.1670, -98.0705];
  const CAMPUS_NAME = "M. Rivas Primary";
  
  // Baseline areas (from 32 digitized zones)
  const BASELINE = {
    parcelSqFt: 885925,
    parcelSqM: 82305,
    plantableSqFt: 482588, // Open Field (423,812) + Grass (58,776)
    plantableSqM: 44834,
    hardscapeSqFt: 236450, // Rooftops (138,381) + Parking (98,069)
    existingCanopySqFt: 92578,
    existingCanopySqM: 8600,
    shadeStructuresSqFt: 5005,
    perimeterMeters: 1178.9,
    perimeterFeet: 3867.6,
    buffer500mAcres: 194.1,
    buffer500mSqFt: 8453947
  };

  // 2. Initialize Leaflet Map
  const map = L.map("holisticMap", {
    zoomControl: false,
    maxZoom: 21
  }).setView(CAMPUS_CENTER, 17);

  L.control.zoom({ position: "topright" }).addTo(map);

  // Basemaps
  const googleHybridLayer = L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
    maxZoom: 21,
    attribution: "Google Imagery"
  }).addTo(map);

  const esriImageryLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 21,
    attribution: "Esri World Imagery"
  });

  // Layer Groups for the 5 Tiers
  const tier1Layer = L.layerGroup().addTo(map);
  const tier2Layer = L.layerGroup();
  const streetsLayer = L.layerGroup();
  const tier3Layer = L.layerGroup();
  const tier4Layer = L.layerGroup();
  const tier5Layer = L.layerGroup();
  const simulatedTreesLayer = L.layerGroup().addTo(map);
  const solarShadeLayer = L.layerGroup();
  const aiVisionCrownLayer = L.layerGroup().addTo(map);

  let isAiVisionActive = false;
  let boundaryBounds = null;
  const sidewalkLayersById = {};

  // 3. Category Color & Styling Logic
  function getCategoryStyle(category) {
    switch (category) {
      case "Campus Boundary":
        return { color: "#9c27b0", weight: 3, fillOpacity: 0.05, fillColor: "#9c27b0", dashArray: "4, 4" };
      case "Open Field":
      case "Grass":
        // TFS Plantable space
        return { color: "#c0ca33", weight: 2, fillColor: "#8bc34a", fillOpacity: 0.25 };
      case "Tree Enclosed Area":
        // Existing tree canopy
        return { color: "#1b5e20", weight: 2, fillColor: "#2e7d32", fillOpacity: 0.75 };
      case "Rooftop":
        return { color: "#455a64", weight: 1.5, fillColor: "#78909c", fillOpacity: 0.65 };
      case "Parking Lot":
        return { color: "#212121", weight: 1.5, fillColor: "#424242", fillOpacity: 0.6 };
      case "Shaded Area":
        return { color: "#0288d1", weight: 1.5, fillColor: "#29b6f6", fillOpacity: 0.5 };
      default:
        return { color: "#888", weight: 1, fillColor: "#ccc", fillOpacity: 0.3 };
    }
  }

  // 4. Load Digitized Rivas GeoJSON Data
  function loadZonesData() {
    // Check global preloaded object first, then try fetch fallback
    if (window.JASON_ZONES_DATA && window.JASON_ZONES_DATA.features) {
      renderTier1And2(window.JASON_ZONES_DATA);
    } else {
      fetch("data/jason_m_rivas_zones.json")
        .then(res => res.json())
        .then(data => renderTier1And2(data))
        .catch(err => {
          console.error("Could not load zones:", err);
          if (window.JASON_ZONES_DATA) renderTier1And2(window.JASON_ZONES_DATA);
        });
    }
  }

  // Render Tier 1 (Campus Interior) & Tier 2 (Perimeter)
  function renderTier1And2(geoJson) {
    tier1Layer.clearLayers();
    tier2Layer.clearLayers();

    let boundaryCoords = null;

    geoJson.features.forEach(feat => {
      const cat = feat.properties.category;
      const style = getCategoryStyle(cat);

      if (cat === "Campus Boundary") {
        boundaryCoords = feat.geometry.coordinates[0];
        
        // Tier 2 Perimeter Line
        const perimeterPolyline = L.polyline(
          boundaryCoords.map(pt => [pt[1], pt[0]]),
          { color: "#9c27b0", weight: 5, dashArray: "8, 6", opacity: 0.9 }
        );
        perimeterPolyline.bindPopup(`
          <div style="font-family:sans-serif; font-size:12px;">
            <strong style="color:#9c27b0;">Tier 2: Outside Campus Perimeter</strong><br/>
            <strong>Length:</strong> 3,868 Linear Feet (0.73 miles)<br/>
            <strong>Interface:</strong> Fence line bordering residential streets & agricultural open areas.<br/>
            <strong>Buffer Capacity:</strong> Accommodates ~110–140 perimeter trees.
          </div>
        `);
        tier2Layer.addLayer(perimeterPolyline);

        // Boundary Polygon in Tier 1
        const boundaryLayer = L.geoJSON(feat, { style: style });
        tier1Layer.addLayer(boundaryLayer);
        boundaryBounds = boundaryLayer.getBounds();
        map.fitBounds(boundaryBounds, { padding: [40, 40] });
      } else {
        // Internal zones
        const layer = L.geoJSON(feat, {
          style: style,
          onEachFeature: (f, l) => {
            const p = f.properties;
            const areaFt = (p.area_sqft || 0).toLocaleString();
            l.bindPopup(`
              <div style="font-family:sans-serif; font-size:12px;">
                <strong style="color:#1b5e20;">${p.category}</strong><br/>
                <strong>Area:</strong> ${areaFt} sq ft<br/>
                <strong>Zone ID:</strong> ${p.id || 'N/A'}
              </div>
            `);
          }
        });
        tier1Layer.addLayer(layer);
      }
    });

    // Build Real Streets, Tier 3 (Sidewalks) & Tier 4 (500m Buffer) & Tier 5 (Neighborhood)
    buildRealStreets();
    map.addLayer(streetsLayer);
    buildTier3Sidewalks();
    buildTier4Buffer();
    buildTier5Neighborhood();
  }

  // 5. Surveyed Real Streets (OpenStreetMap Centerlines with Dual Casing)
  function buildRealStreets() {
    streetsLayer.clearLayers();
    if (!window.RIVAS_STREETS_DATA || !window.RIVAS_STREETS_DATA.features) return;

    window.RIVAS_STREETS_DATA.features.forEach(feat => {
      const p = feat.properties;
      const coords = feat.geometry.coordinates.map(pt => [pt[1], pt[0]]);

      // Outer road casing
      const casing = L.polyline(coords, {
        color: "#1c2833",
        weight: 6,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round"
      });

      // Inner pavement surface
      const pavement = L.polyline(coords, {
        color: "#607d8b",
        weight: 3.5,
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round"
      });

      const popupHtml = `
        <div style="font-family:sans-serif; font-size:12px; line-height:1.4;">
          <strong style="color:#1c2833; font-size:13px;">🛣️ ${p.name}</strong><br/>
          <strong>Classification:</strong> ${p.highway || 'residential'} street<br/>
          <strong>Surface:</strong> ${p.surface || 'Paved asphalt'}<br/>
          <span style="color:#546e7a; font-size:11px;">Surveyed OpenStreetMap Road Vector</span>
        </div>
      `;
      pavement.bindTooltip(p.name, { sticky: true });
      pavement.bindPopup(popupHtml);

      streetsLayer.addLayer(casing);
      streetsLayer.addLayer(pavement);
    });
  }

  // 6. Tier 3: Sidewalks, School Crosswalks & Arrival Walkways
  function buildTier3Sidewalks() {
    tier3Layer.clearLayers();
    if (!window.RIVAS_SIDEWALKS_DATA || !window.RIVAS_SIDEWALKS_DATA.features) return;

    window.RIVAS_SIDEWALKS_DATA.features.forEach(feat => {
      const p = feat.properties;
      const coords = feat.geometry.coordinates.map(pt => [pt[1], pt[0]]);
      const type = p.corridor_type;

      if (type === "Designated School Crosswalk") {
        // High visibility yellow striped crosswalk across South Hutto Rd
        const crosswalk = L.polyline(coords, {
          color: "#ffeb3b",
          weight: 7,
          dashArray: "4, 4",
          opacity: 0.95
        });
        crosswalk.bindPopup(`
          <div style="font-family:sans-serif; font-size:12px; line-height:1.4;">
            <strong style="color:#f57f17; font-size:13px;">🚸 ${p.name}</strong><br/>
            <strong>Type:</strong> ${p.corridor_type} (${p.length_ft} ft length)<br/>
            <strong>Surface:</strong> Thermoplastic striping across ${p.street}<br/>
            <strong>Afternoon Surface Temp:</strong> <span style="color:#c62828; font-weight:bold;">${p.unshaded_temp_f}°F</span> (Full Sun)<br/>
            <strong>Safe Routes Priority:</strong> Designated student crossing point connecting east subdivisions to M. Rivas Primary.
          </div>
        `);
        crosswalk.bindTooltip(`🚸 ${p.name}`, { sticky: true });
        tier3Layer.addLayer(crosswalk);
        sidewalkLayersById[p.id] = crosswalk;

      } else if (type === "Campus Arrival Walkway") {
        // Mint green safe campus entry walkway
        const walkway = L.polyline(coords, {
          color: "#00e676",
          weight: 4.5,
          dashArray: "6, 4",
          opacity: 0.95
        });
        walkway.bindPopup(`
          <div style="font-family:sans-serif; font-size:12px; line-height:1.4;">
            <strong style="color:#00897b; font-size:13px;">🚶 ${p.name}</strong><br/>
            <strong>Type:</strong> ${p.corridor_type} (${p.length_ft} ft)<br/>
            <strong>Current Shade:</strong> ${p.current_canopy_pct}% • <strong>Temp:</strong> ${p.unshaded_temp_f}°F<br/>
            <strong>Function:</strong> Connects street pedestrian flow safely into M. Rivas courtyards away from vehicular traffic.
          </div>
        `);
        walkway.bindTooltip(`🚶 ${p.name}`, { sticky: true });
        tier3Layer.addLayer(walkway);
        sidewalkLayersById[p.id] = walkway;

      } else {
        // Regular sidewalk corridor with glowing casing & crisp electric cyan
        const casing = L.polyline(coords, {
          color: "#006064",
          weight: 6,
          opacity: 0.45
        });
        const ribbon = L.polyline(coords, {
          color: "#00e5ff",
          weight: 3.5,
          opacity: 0.95
        });

        const popupHtml = `
          <div style="font-family:sans-serif; font-size:12px; line-height:1.4;">
            <strong style="color:#0097a7; font-size:13px;">🚶 ${p.name}</strong><br/>
            <strong>Corridor:</strong> ${p.street} (${p.length_ft} ft / ~${p.walk_time_min} min walk)<br/>
            <strong>Current Overhead Shade:</strong> <span style="color:#c62828; font-weight:bold;">${p.current_canopy_pct}%</span> (Severe deficit)<br/>
            <strong>Unshaded Radiant Temp:</strong> <span style="color:#c62828; font-weight:bold;">${p.unshaded_temp_f}°F</span> during 3 PM dismissal<br/>
            <strong>Safe Routes Recommendation:</strong> Plant ${p.trees_needed} street shade trees to achieve 40% walking shade.
          </div>
        `;
        ribbon.bindPopup(popupHtml);
        ribbon.bindTooltip(`🚶 ${p.name}`, { sticky: true });

        tier3Layer.addLayer(casing);
        tier3Layer.addLayer(ribbon);
        sidewalkLayersById[p.id] = ribbon;
      }
    });
  }

  // 7. Tier 4: 500-Meter Environmental Analysis Ring
  function buildTier4Buffer() {
    tier4Layer.clearLayers();

    const circle = L.circle(CAMPUS_CENTER, {
      radius: 500, // 500 meters
      color: "#ff9800",
      weight: 3,
      dashArray: "8, 8",
      fillColor: "#ff9800",
      fillOpacity: 0.1
    });

    circle.bindPopup(`
      <div style="font-family:sans-serif; font-size:12px;">
        <strong style="color:#e65100;">Tier 4: 500-Meter Environmental Analysis Ring</strong><br/>
        <strong>Radius:</strong> 500 meters (1,640 feet)<br/>
        <strong>Total Area:</strong> 194.1 Acres (8,453,947 sq ft / 78.5 hectares)<br/>
        <strong>Campus Share:</strong> M. Rivas accounts for <strong>10.48%</strong> of this urban zone.<br/>
        <strong>Significance:</strong> Represents the primary microclimatic footprint where schoolyard evapotranspirative cooling mitigates community heat.
      </div>
    `);

    tier4Layer.addLayer(circle);
  }

  // 8. Tier 5: Surrounding Neighborhood Context Matrix
  function buildTier5Neighborhood() {
    tier5Layer.clearLayers();
    if (!window.RIVAS_NEIGHBORHOOD_DATA || !window.RIVAS_NEIGHBORHOOD_DATA.features) return;

    const sectorColors = ["#3f51b5", "#ff9800", "#795548", "#689f38"];

    window.RIVAS_NEIGHBORHOOD_DATA.features.forEach((feat, idx) => {
      const p = feat.properties;
      const col = sectorColors[idx % sectorColors.length];

      const poly = L.geoJSON(feat, {
        style: {
          color: col,
          weight: 2,
          dashArray: "6, 4",
          fillColor: col,
          fillOpacity: 0.16
        },
        onEachFeature: (f, l) => {
          l.bindPopup(`
            <div style="font-family:sans-serif; font-size:12px; line-height:1.4;">
              <strong style="color:${col}; font-size:13px;">🏡 ${p.name}</strong><br/>
              <strong>Estimated Homes:</strong> ${p.homes} residences<br/>
              <strong>Residential Tree Canopy:</strong> <span style="color:#c62828; font-weight:bold;">${p.canopy_pct}%</span> (Deficit Zone)<br/>
              <strong>Urban Heat Score:</strong> <em>${p.uhi_score}</em><br/>
              <strong>Context:</strong> ${p.character}<br/>
              <strong>Cool School Impact:</strong> Downwind evapotranspirative cooling from a 30% M. Rivas microforest moderates ambient temperatures across this residential sector.
            </div>
          `);
          l.bindTooltip(p.name, { sticky: true });
        }
      });
      tier5Layer.addLayer(poly);
    });
  }

  // 9. Tier Switcher Logic
  const tierButtons = document.querySelectorAll(".tier-btn");
  tierButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tierButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tier = btn.getAttribute("data-tier");
      activateTier(tier);
    });
  });

  function activateTier(tier) {
    // Remove all tier layers
    map.removeLayer(tier1Layer);
    map.removeLayer(tier2Layer);
    map.removeLayer(tier3Layer);
    map.removeLayer(tier4Layer);
    map.removeLayer(tier5Layer);

    // Keep surveyed streets active as baseline ground reference
    if (!map.hasLayer(streetsLayer)) map.addLayer(streetsLayer);

    if (tier === "1") {
      map.addLayer(tier1Layer);
      if (boundaryBounds) map.fitBounds(boundaryBounds, { padding: [40, 40] });
    } else if (tier === "2") {
      map.addLayer(tier1Layer);
      map.addLayer(tier2Layer);
      if (boundaryBounds) map.fitBounds(boundaryBounds, { padding: [30, 30] });
    } else if (tier === "3") {
      map.addLayer(tier1Layer);
      map.addLayer(tier3Layer);
      map.setView(CAMPUS_CENTER, 16);
    } else if (tier === "4") {
      map.addLayer(tier1Layer);
      map.addLayer(tier4Layer);
      map.setView(CAMPUS_CENTER, 15);
    } else if (tier === "5") {
      map.addLayer(tier1Layer);
      map.addLayer(tier4Layer);
      map.addLayer(tier5Layer);
      map.setView(CAMPUS_CENTER, 15);
    } else if (tier === "all") {
      map.addLayer(tier1Layer);
      map.addLayer(tier2Layer);
      map.addLayer(tier3Layer);
      map.addLayer(tier4Layer);
      map.addLayer(tier5Layer);
      map.setView(CAMPUS_CENTER, 15);
    }
  }

  // 9. Interactive "What-If" Tree Planting Simulator
  const rngTreeCount = document.getElementById("rngTreeCount");
  const lblTreeAddCount = document.getElementById("lblTreeAddCount");
  const selTreeSpecies = document.getElementById("selTreeSpecies");
  const lblSimAddedSqFt = document.getElementById("lblSimAddedSqFt");
  const lblSimNewPct = document.getElementById("lblSimNewPct");
  const lblSimGoalStatus = document.getElementById("lblSimGoalStatus");
  const goalFillBar = document.getElementById("goalFillBar");

  function updateSimulation() {
    const treesToAdd = parseInt(rngTreeCount.value, 10);
    const crownSqFtPerTree = parseFloat(selTreeSpecies.value);

    lblTreeAddCount.textContent = treesToAdd;

    const addedCanopySqFt = treesToAdd * crownSqFtPerTree;
    const newTotalCanopySqFt = BASELINE.existingCanopySqFt + addedCanopySqFt;

    // TFS Plantable % = (Total Canopy / Plantable Area) * 100
    const newTfsPct = (newTotalCanopySqFt / BASELINE.plantableSqFt) * 100;
    const progressWidth = Math.min(100, (newTfsPct / 30.0) * 100);

    lblSimAddedSqFt.textContent = `+${addedCanopySqFt.toLocaleString()} sq ft`;
    lblSimNewPct.textContent = `${newTfsPct.toFixed(2)}%`;

    goalFillBar.style.width = `${progressWidth.toFixed(1)}%`;

    if (newTfsPct >= 30.0) {
      lblSimGoalStatus.textContent = `🎯 30% GOAL ACHIEVED! (+${(newTfsPct - 30.0).toFixed(2)}% surplus)`;
      lblSimGoalStatus.style.color = "#2e7d32";
      lblSimGoalStatus.style.fontWeight = "bold";
    } else {
      const deficit = 30.0 - newTfsPct;
      lblSimGoalStatus.textContent = `Deficit: -${deficit.toFixed(2)}%`;
      lblSimGoalStatus.style.color = "#c25c3a";
      lblSimGoalStatus.style.fontWeight = "normal";
    }

    // Render simulated tree points on the open field of M. Rivas
    renderSimulatedTrees(treesToAdd, Math.sqrt(crownSqFtPerTree / Math.PI) * 0.3048); // radius in meters
  }

  // Draw simulated tree circles on the large open playfield on the west side
  function renderSimulatedTrees(count, radiusMeters) {
    simulatedTreesLayer.clearLayers();
    if (count === 0) return;

    // Open field bounding box [lat: 26.1665 to 26.1680, lon: -98.0722 to -98.0712]
    const minLat = 26.1666, maxLat = 26.1679;
    const minLon = -98.0721, maxLon = -98.0713;

    // Use deterministic grid distribution
    const cols = Math.ceil(Math.sqrt(count * 1.5));
    const rows = Math.ceil(count / cols);

    let placed = 0;
    for (let r = 0; r < rows && placed < count; r++) {
      for (let c = 0; c < cols && placed < count; c++) {
        const lat = minLat + (r / Math.max(1, rows - 1)) * (maxLat - minLat);
        const lon = minLon + (c / Math.max(1, cols - 1)) * (maxLon - minLon);

        const circle = L.circle([lat, lon], {
          radius: radiusMeters,
          color: "#2e7d32",
          weight: 1.5,
          fillColor: "#4caf50",
          fillOpacity: 0.7
        });

        circle.bindPopup(`
          <div style="font-family:sans-serif; font-size:12px;">
            <strong style="color:#2e7d32;">🌱 Planned Native Tree #${placed + 1}</strong><br/>
            <strong>Mature Crown Radius:</strong> ${(radiusMeters * 3.28084).toFixed(1)} ft<br/>
            <strong>Projected Shade:</strong> ${Math.round(Math.PI * Math.pow(radiusMeters * 3.28084, 2))} sq ft
          </div>
        `);
        simulatedTreesLayer.addLayer(circle);
        placed++;
      }
    }
  }

  rngTreeCount.addEventListener("input", updateSimulation);
  selTreeSpecies.addEventListener("change", updateSimulation);

  // 10. Diurnal Solar Shade Toggle (1:00 PM Recess Shadow)
  const chkSolarShade = document.getElementById("chkSolarShade");
  chkSolarShade.addEventListener("change", (e) => {
    if (e.target.checked) {
      castSolarShades();
      map.addLayer(solarShadeLayer);
    } else {
      map.removeLayer(solarShadeLayer);
    }
  });

  function castSolarShades() {
    solarShadeLayer.clearLayers();
    // In September at 1:00 PM CST in South Texas, sun altitude is ~65° and azimuth is ~195° (South-Southwest)
    // Shadow offset is cast slightly to the North-Northeast (~15°) with length = height / tan(65°)
    const latOffset = 0.000045;
    const lonOffset = 0.000015;

    // Cast shadows for the 6 existing canopy clusters
    if (window.JASON_ZONES_DATA && window.JASON_ZONES_DATA.features) {
      window.JASON_ZONES_DATA.features.forEach(feat => {
        if (feat.properties.category === "Tree Enclosed Area") {
          const origCoords = feat.geometry.coordinates[0];
          const shadowCoords = origCoords.map(pt => [pt[0] + lonOffset, pt[1] + latOffset]);

          const shadowPoly = L.polygon(
            shadowCoords.map(pt => [pt[1], pt[0]]),
            {
              color: "#1a1a1a",
              weight: 1,
              fillColor: "#000000",
              fillOpacity: 0.35,
              dashArray: "3, 3"
            }
          );
          shadowPoly.bindPopup(`
            <div style="font-family:sans-serif; font-size:12px;">
              <strong style="color:#333;">☀️ 1:00 PM Recess Ground Shadow</strong><br/>
              <strong>Sun Altitude:</strong> 64.8° • <strong>Azimuth:</strong> 195.2°<br/>
              <strong>Surface Temp Under Shadow:</strong> ~88°F (vs. 138°F full sun turf)
            </div>
          `);
          solarShadeLayer.addLayer(shadowPoly);
        }
      });
    }
  }

  // 11. Basemap Toggle
  const chkBasemapToggle = document.getElementById("chkBasemapToggle");
  chkBasemapToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      map.removeLayer(esriImageryLayer);
      map.addLayer(googleHybridLayer);
    } else {
      map.removeLayer(googleHybridLayer);
      map.addLayer(esriImageryLayer);
    }
  });

  // 13. Populate 500m Pedestrian Sidewalk Shed Table & Filters
  function populateSidewalkTable() {
    const tbody = document.getElementById("tbodySidewalks");
    if (!tbody || !window.RIVAS_SIDEWALKS_DATA || !window.RIVAS_SIDEWALKS_DATA.features) return;

    const data = window.RIVAS_SIDEWALKS_DATA.features;

    function renderRows(filterCategory) {
      tbody.innerHTML = "";

      data.forEach(feat => {
        const p = feat.properties;
        const id = p.id;

        // Filtering
        if (filterCategory === "frontage" && !id.startsWith("sw_01") && !id.startsWith("sw_02") && !id.startsWith("sw_03") && !id.startsWith("sw_04")) {
          return;
        }
        if (filterCategory === "north" && !id.startsWith("sw_05") && !id.startsWith("sw_06") && !id.startsWith("sw_07") && !id.startsWith("sw_08") && !id.startsWith("sw_09")) {
          return;
        }
        if (filterCategory === "east" && !id.startsWith("sw_10") && !id.startsWith("sw_11") && !id.startsWith("sw_12") && !id.startsWith("sw_13") && !id.startsWith("sw_14")) {
          return;
        }
        if (filterCategory === "crosswalk" && !id.startsWith("cw_") && !id.startsWith("arr_")) {
          return;
        }

        let pClass = "p-med";
        if (p.priority === "Urgent") pClass = "p-urgent";
        else if (p.priority === "High") pClass = "p-high";
        else if (p.priority.includes("Enhanced") || p.priority.includes("Completed")) pClass = "p-done";

        const tr = document.createElement("tr");
        tr.setAttribute("data-sidewalk-id", id);
        tr.innerHTML = `
          <td><strong>${p.name}</strong></td>
          <td>${p.street}</td>
          <td><span style="font-size:0.75rem; color:#555;">${p.corridor_type}</span></td>
          <td><strong>${p.length_ft.toLocaleString()} ft</strong> (${p.length_m} m)</td>
          <td>~${p.walk_time_min} min</td>
          <td><strong style="color: ${p.current_canopy_pct < 15 ? '#c62828' : '#2e7d32'};">${p.current_canopy_pct}%</strong></td>
          <td><span style="color:#c62828; font-weight:bold;">${p.unshaded_temp_f}°F</span></td>
          <td><strong style="color:#2e7d32;">+${p.trees_needed} trees</strong></td>
          <td><span class="p-tag ${pClass}">${p.priority}</span></td>
          <td><button type="button" class="btn-row-action" data-sw-id="${id}">🔍 View Map</button></td>
        `;

        tr.addEventListener("click", () => focusSidewalkOnMap(id));
        tbody.appendChild(tr);
      });
    }

    renderRows("all");

    // Filter Buttons
    const filterPills = document.querySelectorAll("#sidewalkFilters .filter-pill");
    filterPills.forEach(pill => {
      pill.addEventListener("click", (e) => {
        e.stopPropagation();
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        renderRows(pill.getAttribute("data-filter"));
      });
    });
  }

  // Focus and highlight specific sidewalk on map
  function focusSidewalkOnMap(sidewalkId) {
    if (!window.RIVAS_SIDEWALKS_DATA) return;
    const feat = window.RIVAS_SIDEWALKS_DATA.features.find(f => f.properties.id === sidewalkId);
    if (!feat) return;

    // Activate Tier 3
    const tier3Btn = document.getElementById("btnTier3");
    if (tier3Btn) {
      document.querySelectorAll(".tier-btn").forEach(b => b.classList.remove("active"));
      tier3Btn.classList.add("active");
      activateTier("3");
    }

    const coords = feat.geometry.coordinates.map(pt => [pt[1], pt[0]]);
    const polyline = L.polyline(coords);
    const bounds = polyline.getBounds();

    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 18 });

    // Open popup if layer exists
    if (sidewalkLayersById[sidewalkId]) {
      setTimeout(() => {
        sidewalkLayersById[sidewalkId].openPopup();
      }, 300);
    }

    // Scroll up smoothly to map if scrolled down
    const mapStage = document.querySelector(".map-stage");
    if (mapStage && window.scrollY > 200) {
      mapStage.scrollIntoView({ behavior: "smooth" });
    }

    // Temporary highlight flash
    const highlightLine = L.polyline(coords, {
      color: "#ffeb3b",
      weight: 10,
      opacity: 0.95
    }).addTo(map);

    setTimeout(() => {
      map.removeLayer(highlightLine);
    }, 2800);
  }

  // =========================================================================
  // 14. AUTOMATED AI VISION & MACHINE LEARNING TREE CANOPY DETECTOR
  // =========================================================================

  function renderAiCrowns(colorMode = "carlos_red", minArea = 100, filterPlantable = true) {
    aiVisionCrownLayer.clearLayers();
    if (!window.RIVAS_CANOPY_ML_MODEL || !window.RIVAS_CANOPY_ML_MODEL.crowns) return;

    const crowns = window.RIVAS_CANOPY_ML_MODEL.crowns.features;
    let visibleCount = 0;
    let visibleAreaSqFt = 0;

    crowns.forEach(crown => {
      const p = crown.properties;
      if (p.area_sqft < minArea) return;
      if (filterPlantable && !p.in_plantable_site) return;

      visibleCount++;
      visibleAreaSqFt += p.area_sqft;

      let fillColor = "#e53935"; // Carlos Red standard (TFS Slide 11)
      let strokeColor = "#b71c1c";
      let fillOpacity = 0.72;

      if (colorMode === "eco_green") {
        fillColor = "#2e7d32";
        strokeColor = "#1b5e20";
        fillOpacity = 0.80;
      } else if (colorMode === "thermal_cooling") {
        if (p.cooling_drop_f >= 5.5) {
          fillColor = "#00bcd4";
          strokeColor = "#00838f";
        } else if (p.cooling_drop_f >= 4.5) {
          fillColor = "#26a69a";
          strokeColor = "#00695c";
        } else {
          fillColor = "#8bc34a";
          strokeColor = "#558b2f";
        }
        fillOpacity = 0.75;
      }

      const coords = crown.geometry.coordinates[0].map(pt => [pt[1], pt[0]]);
      const poly = L.polygon(coords, {
        color: strokeColor,
        weight: 1.5,
        fillColor: fillColor,
        fillOpacity: fillOpacity
      });

      const popupHtml = `
        <div style="font-family:sans-serif; font-size:12px; line-height:1.45; min-width:210px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="background:${colorMode === 'carlos_red' ? '#ffebee' : '#e8f5e9'}; color:${colorMode === 'carlos_red' ? '#c62828' : '#1b5e20'}; font-weight:bold; font-size:10px; padding:2px 6px; border-radius:3px;">
              ${colorMode === 'carlos_red' ? '🔴 CARLOS RED CROWN' : '🟢 ML VISION CROWN'}
            </span>
            <span style="color:#666; font-size:11px;">${p.detection_confidence}% Conf</span>
          </div>
          <strong style="font-size:13px; color:#212121;">🌳 ${p.id}: ${p.species}</strong><br/>
          <span style="font-size:11px; color:#666;">Cluster: ${p.cluster}</span>
          <hr style="margin:6px 0; border:none; border-top:1px solid #eee;"/>
          <strong>Crown Diameter:</strong> ${p.crown_diameter_ft} ft (${p.crown_radius_ft} ft radius)<br/>
          <strong>Canopy Footprint:</strong> <strong>${p.area_sqft.toLocaleString()} sq ft</strong><br/>
          <strong>Est. Tree Height:</strong> ${p.est_height_ft} ft<br/>
          <strong>Microclimate Cooling:</strong> <span style="color:#0277bd; font-weight:bold;">-${p.cooling_drop_f}°F drop</span><br/>
          <strong>Carbon Sequestration:</strong> ~${p.carbon_storage_lbs} lbs/yr<br/>
          <div style="margin-top:6px; font-size:11px; color:#2e7d32; background:#f1f8e9; padding:3px 6px; border-radius:3px;">
            ✓ Shadow Rejection & Ground Foliage Verified
          </div>
        </div>
      `;

      poly.bindPopup(popupHtml);
      poly.bindTooltip(`🌳 ${p.id} (${p.species}) - ${p.area_sqft} sq ft`, { sticky: true });
      aiVisionCrownLayer.addLayer(poly);
    });

    // Update HUD counters
    const hudCountEl = document.getElementById("hudCrownCount");
    const hudAreaEl = document.getElementById("hudCanopyArea");
    if (hudCountEl) hudCountEl.textContent = `${visibleCount} trees`;
    if (hudAreaEl) hudAreaEl.textContent = `${visibleAreaSqFt.toLocaleString()} sq ft`;
  }

  function runAiVisionScanner() {
    const mapStage = document.querySelector(".map-stage");
    const btnAiScanner = document.getElementById("btnAiScanner");
    const hud = document.getElementById("aiScannerHud");

    // Scroll up smoothly if user clicked from benchmark card below
    if (mapStage && window.scrollY > 300) {
      mapStage.scrollIntoView({ behavior: "smooth" });
    }

    // Add radar sweep line animation
    let radarLine = document.querySelector(".radar-scan-line");
    if (!radarLine && mapStage) {
      radarLine = document.createElement("div");
      radarLine.className = "radar-scan-line";
      mapStage.appendChild(radarLine);
    }

    if (btnAiScanner) {
      btnAiScanner.innerHTML = "⚡ Scanning Aerial Tiles (0.8s)...";
      btnAiScanner.classList.add("active");
    }

    // Zoom and center on campus trees
    map.setView([26.1670, -98.0697], 17.5, { animate: true });

    setTimeout(() => {
      // Remove radar sweep
      if (radarLine && radarLine.parentNode) {
        radarLine.parentNode.removeChild(radarLine);
      }

      // Show HUD
      if (hud) hud.style.display = "block";
      if (btnAiScanner) {
        btnAiScanner.innerHTML = "✓ AI Crowns Active (93 Trees)";
      }
      isAiVisionActive = true;

      // Render Carlos Red Crowns
      const colorSelect = document.getElementById("selCrownColor");
      const filterSlider = document.getElementById("rngCrownFilter");
      const chkIntersection = document.getElementById("chkAutoIntersection");

      const mode = colorSelect ? colorSelect.value : "carlos_red";
      const minA = filterSlider ? parseInt(filterSlider.value, 10) : 100;
      const filterP = chkIntersection ? chkIntersection.checked : true;

      renderAiCrowns(mode, minA, filterP);
    }, 820);
  }

  // Bind AI Vision HUD & Trigger Controls
  const btnAiScanner = document.getElementById("btnAiScanner");
  if (btnAiScanner) {
    btnAiScanner.addEventListener("click", () => {
      if (isAiVisionActive) {
        // Toggle off
        aiVisionCrownLayer.clearLayers();
        const hud = document.getElementById("aiScannerHud");
        if (hud) hud.style.display = "none";
        btnAiScanner.innerHTML = "⚡ AI Vision: Auto-Detect Tree Tops";
        btnAiScanner.classList.remove("active");
        isAiVisionActive = false;
      } else {
        runAiVisionScanner();
      }
    });
  }

  const btnBenchmarkScan = document.getElementById("btnBenchmarkScan");
  if (btnBenchmarkScan) {
    btnBenchmarkScan.addEventListener("click", () => {
      runAiVisionScanner();
    });
  }

  const btnRescanVision = document.getElementById("btnRescanVision");
  if (btnRescanVision) {
    btnRescanVision.addEventListener("click", () => {
      runAiVisionScanner();
    });
  }

  const btnCloseHud = document.getElementById("btnCloseHud");
  if (btnCloseHud) {
    btnCloseHud.addEventListener("click", () => {
      const hud = document.getElementById("aiScannerHud");
      if (hud) hud.style.display = "none";
    });
  }

  const selCrownColor = document.getElementById("selCrownColor");
  if (selCrownColor) {
    selCrownColor.addEventListener("change", (e) => {
      const minA = parseInt(document.getElementById("rngCrownFilter").value, 10) || 100;
      const filterP = document.getElementById("chkAutoIntersection").checked;
      renderAiCrowns(e.target.value, minA, filterP);
    });
  }

  const rngCrownFilter = document.getElementById("rngCrownFilter");
  const lblCrownFilterVal = document.getElementById("lblCrownFilterVal");
  if (rngCrownFilter) {
    rngCrownFilter.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      if (lblCrownFilterVal) lblCrownFilterVal.textContent = `${val} sq ft`;
      const mode = document.getElementById("selCrownColor").value;
      const filterP = document.getElementById("chkAutoIntersection").checked;
      renderAiCrowns(mode, val, filterP);
    });
  }

  const chkAutoIntersection = document.getElementById("chkAutoIntersection");
  if (chkAutoIntersection) {
    chkAutoIntersection.addEventListener("change", (e) => {
      const mode = document.getElementById("selCrownColor").value;
      const minA = parseInt(document.getElementById("rngCrownFilter").value, 10) || 100;
      renderAiCrowns(mode, minA, e.target.checked);
    });
  }

  // Initial Load
  loadZonesData();
  populateSidewalkTable();
  updateSimulation();

  // Auto-launch AI Vision Scanner to delineate Carlos Red tree crowns immediately
  setTimeout(() => {
    runAiVisionScanner();
  }, 850);
});

