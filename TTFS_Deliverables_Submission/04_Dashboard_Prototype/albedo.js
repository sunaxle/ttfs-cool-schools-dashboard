document.addEventListener("DOMContentLoaded", () => {
    const campusName = localStorage.getItem("activeCampusName") || "M. Rivas Primary";
    const campusNameDisplay = document.getElementById("campusNameDisplay");
    if (campusNameDisplay) campusNameDisplay.textContent = campusName;

    const hourSlider = document.getElementById("hourSlider");
    const hourReadout = document.getElementById("hourReadout");
    const playHourBtn = document.getElementById("playHourBtn");
    const typeSelect = document.getElementById("albedoTypeSelect");
    const riskVal = document.getElementById("riskValue");
    const riskText = document.getElementById("riskText");

    const btnModeHeatmap = document.getElementById("btnModeHeatmap");
    const btnModePolygons = document.getElementById("btnModePolygons");

    const valSolarIrradiance = document.getElementById("valSolarIrradiance");
    const valAmbientTemp = document.getElementById("valAmbientTemp");
    const valPeakAsphaltTemp = document.getElementById("valPeakAsphaltTemp");
    const valCanopyShadeTemp = document.getElementById("valCanopyShadeTemp");

    const matrixHourLabel = document.getElementById("matrixHourLabel");
    const tableActiveHourLabel = document.getElementById("tableActiveHourLabel");
    const matrixTableBody = document.getElementById("matrixTableBody");

    let activeDisplayMode = "heatmap"; // "heatmap" or "polygons"

    // Diurnal Solar & Ambient Temperature Model (8 AM to 6 PM)
    const diurnalModel = {
        8:  { label: "8:00 AM",  solarW: 420, ambientF: 82, asphaltF: 88,  roofF: 85,  vegF: 80,  shadeF: 78 },
        9:  { label: "9:00 AM",  solarW: 610, ambientF: 85, asphaltF: 96,  roofF: 91,  vegF: 82,  shadeF: 79 },
        10: { label: "10:00 AM", solarW: 780, ambientF: 88, asphaltF: 106, roofF: 98,  vegF: 85,  shadeF: 81 },
        11: { label: "11:00 AM", solarW: 900, ambientF: 91, asphaltF: 116, roofF: 105, vegF: 87,  shadeF: 82 },
        12: { label: "12:00 PM", solarW: 960, ambientF: 94, asphaltF: 124, roofF: 112, vegF: 89,  shadeF: 84 },
        13: { label: "1:00 PM",  solarW: 940, ambientF: 96, asphaltF: 128, roofF: 115, vegF: 90,  shadeF: 85 },
        14: { label: "2:00 PM",  solarW: 860, ambientF: 98, asphaltF: 130, roofF: 116, vegF: 91,  shadeF: 86 },
        15: { label: "3:00 PM",  solarW: 720, ambientF: 97, asphaltF: 124, roofF: 111, vegF: 89,  shadeF: 85 },
        16: { label: "4:00 PM",  solarW: 550, ambientF: 95, asphaltF: 115, roofF: 104, vegF: 87,  shadeF: 84 },
        17: { label: "5:00 PM",  solarW: 360, ambientF: 92, asphaltF: 104, roofF: 96,  vegF: 85,  shadeF: 82 },
        18: { label: "6:00 PM",  solarW: 180, ambientF: 89, asphaltF: 94,  roofF: 90,  vegF: 83,  shadeF: 81 }
    };

    function getTempHeatColorHex(tempF) {
        if (tempF <= 78) return "#2196f3"; // Blue
        if (tempF <= 86) return "#4caf50"; // Green
        if (tempF <= 98) return "#ffeb3b"; // Yellow
        if (tempF <= 112) return "#ff9800"; // Orange
        return "#f44336";                  // Red
    }

    // Initialize Leaflet Map
    const map = L.map('albedoMap', {
        center: [26.1670, -98.0706], // Centered on M. Rivas Primary
        zoom: 18
    });

    // High-Res Esri Satellite Basemap
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri Satellite',
        maxZoom: 20
    }).addTo(map);

    let isPlaying = false;
    let playInterval = null;

    if (playHourBtn) {
        playHourBtn.addEventListener("click", () => {
            isPlaying = !isPlaying;
            playHourBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play Cycle";
            playHourBtn.style.background = isPlaying ? "#c62828" : "#1b4332";

            if (isPlaying) {
                playInterval = setInterval(() => {
                    let currentHour = parseInt(hourSlider.value, 10);
                    currentHour += 1;
                    if (currentHour > 18) currentHour = 8;
                    hourSlider.value = currentHour;
                    updateHourState();
                }, 900);
            } else {
                clearInterval(playInterval);
            }
        });
    }

    // Mode Toggle Buttons
    if (btnModeHeatmap && btnModePolygons) {
        btnModeHeatmap.addEventListener("click", () => {
            activeDisplayMode = "heatmap";
            btnModeHeatmap.style.background = "var(--green-dark)";
            btnModeHeatmap.style.color = "white";
            btnModeHeatmap.style.border = "2px solid var(--green-dark)";

            btnModePolygons.style.background = "white";
            btnModePolygons.style.color = "#333";
            btnModePolygons.style.border = "1px solid var(--border)";

            updateHourState();
        });

        btnModePolygons.addEventListener("click", () => {
            activeDisplayMode = "polygons";
            btnModePolygons.style.background = "var(--green-dark)";
            btnModePolygons.style.color = "white";
            btnModePolygons.style.border = "2px solid var(--green-dark)";

            btnModeHeatmap.style.background = "white";
            btnModeHeatmap.style.color = "#333";
            btnModeHeatmap.style.border = "1px solid var(--border)";

            updateHourState();
        });
    }

    hourSlider.addEventListener("input", updateHourState);
    if (typeSelect) typeSelect.addEventListener("change", updateHourState);

    let rawGeoJson = window.JASON_ZONES_DATA || null;

    if (!rawGeoJson) {
        fetch("data/jason_m_rivas_zones.json")
            .then(res => res.json())
            .then(data => {
                rawGeoJson = data;
                updateHourState();
            })
            .catch(err => console.error("Error loading zone JSON:", err));
    }

    let mapLayerGroup = L.layerGroup().addTo(map);

    function updateHourState() {
        const hour = parseInt(hourSlider.value, 10);
        const data = diurnalModel[hour] || diurnalModel[13];

        if (hourReadout) hourReadout.textContent = data.label;
        if (matrixHourLabel) matrixHourLabel.textContent = data.label;
        if (tableActiveHourLabel) tableActiveHourLabel.textContent = data.label;

        if (valSolarIrradiance) valSolarIrradiance.textContent = `${data.solarW} W/m²`;
        if (valAmbientTemp) valAmbientTemp.textContent = `${data.ambientF}°F`;
        if (valPeakAsphaltTemp) valPeakAsphaltTemp.textContent = `${data.asphaltF}°F`;
        if (valCanopyShadeTemp) valCanopyShadeTemp.textContent = `${data.shadeF}°F (-${data.asphaltF - data.shadeF}°F Cooler!)`;

        const heatOffset = data.asphaltF - data.ambientF;
        if (riskVal) {
            riskVal.textContent = `Severe (+${heatOffset}°F)`;
            riskVal.style.color = heatOffset > 25 ? "#c62828" : (heatOffset > 15 ? "#ff9800" : "#4caf50");
        }
        if (riskText) {
            riskText.textContent = `At ${data.label}, unshaded asphalt reaches ${data.asphaltF}°F (${heatOffset}°F hotter than ambient air), while canopy shade stays at ${data.shadeF}°F.`;
        }

        if (activeDisplayMode === "heatmap") {
            renderSmoothHeatmap(hour, typeSelect ? typeSelect.value : "all");
        } else {
            renderThermalPolygons(hour, typeSelect ? typeSelect.value : "all");
        }

        renderMatrixTable(hour);
    }

    /**
     * Renders a smooth FLIR Thermal Gradient Field across campus using sampled grid points
     */
    function renderSmoothHeatmap(hour, filterType) {
        mapLayerGroup.clearLayers();
        if (!rawGeoJson || !rawGeoJson.features) return;

        const hData = diurnalModel[hour] || diurnalModel[13];

        // Sample heat points across zone geometries
        const heatPoints = [];

        rawGeoJson.features.forEach(f => {
            const cat = f.properties.category || "";
            if (cat === "Campus Boundary") return;

            let surfaceTemp = hData.ambientF;
            if (cat.includes("Parking")) surfaceTemp = hData.asphaltF;
            else if (cat.includes("Roof")) surfaceTemp = hData.roofF;
            else if (cat.includes("Field")) surfaceTemp = hData.vegF + 4;
            else if (cat.includes("Lawn") || cat.includes("Grass")) surfaceTemp = hData.vegF;
            else if (cat.includes("Microforest") || cat.includes("Shaded")) surfaceTemp = hData.shadeF;

            // Normalized thermal intensity (0.0 to 1.0)
            const intensity = Math.max(0.1, (surfaceTemp - 75) / (135 - 75));

            // Extract ring points
            const ring = f.geometry.coordinates[0];
            if (!ring || !ring.length) return;

            // Compute centroid + interior grid points
            let sumLat = 0, sumLng = 0;
            ring.forEach(pt => {
                sumLng += pt[0];
                sumLat += pt[1];
                // Boundary sampling
                heatPoints.push([pt[1], pt[0], intensity * 0.8]);
            });

            const cLat = sumLat / ring.length;
            const cLng = sumLng / ring.length;

            // Centroid dense sampling
            heatPoints.push([cLat, cLng, intensity]);
            heatPoints.push([cLat + 0.00005, cLng + 0.00005, intensity]);
            heatPoints.push([cLat - 0.00005, cLng - 0.00005, intensity]);
            heatPoints.push([cLat + 0.00005, cLng - 0.00005, intensity]);
            heatPoints.push([cLat - 0.00005, cLng + 0.00005, intensity]);
        });

        // Create Leaflet.heat smooth gradient layer
        if (typeof L.heatLayer === "function") {
            const heatLayer = L.heatLayer(heatPoints, {
                radius: 28,
                blur: 20,
                maxZoom: 19,
                max: 1.0,
                gradient: {
                    0.15: '#2196f3', // Cool Blue
                    0.35: '#4caf50', // Temperate Green
                    0.55: '#ffeb3b', // Yellow
                    0.75: '#ff9800', // Thermal Orange
                    0.95: '#f44336'  // Crimson Red
                }
            });
            mapLayerGroup.addLayer(heatLayer);
        }

        // Draw Campus Boundary outline overlay
        const boundaryFeature = rawGeoJson.features.find(f => f.properties.category === "Campus Boundary");
        if (boundaryFeature) {
            const boundaryLayer = L.geoJSON(boundaryFeature, {
                style: {
                    color: "#ffeb3b",
                    weight: 3,
                    fillColor: "transparent",
                    fillOpacity: 0
                }
            });
            mapLayerGroup.addLayer(boundaryLayer);
        }
    }

    function renderThermalPolygons(hour, filterType) {
        mapLayerGroup.clearLayers();
        if (!rawGeoJson || !rawGeoJson.features) return;

        const hData = diurnalModel[hour] || diurnalModel[13];

        const filteredFeatures = rawGeoJson.features.filter(f => {
            const cat = f.properties.category || "Unmapped Surface";
            if (cat === "Campus Boundary") return true;
            if (filterType === "all") return true;
            if (filterType === "parking" && cat.includes("Parking")) return true;
            if (filterType === "roof" && cat.includes("Roof")) return true;
            if (filterType === "veg" && (cat.includes("Field") || cat.includes("Lawn") || cat.includes("Grass") || cat.includes("Microforest") || cat.includes("Shaded"))) return true;
            return false;
        });

        const geoJsonLayer = L.geoJSON({ type: "FeatureCollection", features: filteredFeatures }, {
            style: function (feature) {
                const cat = feature.properties.category || "";

                if (cat === "Campus Boundary") {
                    return {
                        color: "#ffeb3b",
                        weight: 3,
                        fillColor: "transparent",
                        fillOpacity: 0
                    };
                }

                let surfaceTemp = hData.ambientF;
                if (cat.includes("Parking")) surfaceTemp = hData.asphaltF;
                else if (cat.includes("Roof")) surfaceTemp = hData.roofF;
                else if (cat.includes("Field")) surfaceTemp = hData.vegF + 4;
                else if (cat.includes("Lawn") || cat.includes("Grass")) surfaceTemp = hData.vegF;
                else if (cat.includes("Microforest") || cat.includes("Shaded")) surfaceTemp = hData.shadeF;

                const hexColor = getTempHeatColorHex(surfaceTemp);

                return {
                    color: "#ffffff",
                    weight: 1.5,
                    fillColor: hexColor,
                    fillOpacity: 0.65
                };
            },
            onEachFeature: function (feature, layer) {
                const props = feature.properties || {};
                const cat = props.category || "Zone";
                if (cat === "Campus Boundary") return;

                let surfaceTemp = hData.ambientF;
                let albedoVal = "0.35";
                if (cat.includes("Parking")) { surfaceTemp = hData.asphaltF; albedoVal = "0.08 (Low)"; }
                else if (cat.includes("Roof")) { surfaceTemp = hData.roofF; albedoVal = "0.22 (Med)"; }
                else if (cat.includes("Field")) { surfaceTemp = hData.vegF + 4; albedoVal = "0.35"; }
                else if (cat.includes("Lawn") || cat.includes("Grass")) { surfaceTemp = hData.vegF; albedoVal = "0.48 (Cooling)"; }
                else if (cat.includes("Microforest") || cat.includes("Shaded")) { surfaceTemp = hData.shadeF; albedoVal = "0.82 (High)"; }

                layer.bindPopup(`
                    <div style="font-family:sans-serif; font-size:13px; padding:4px;">
                        <h4 style="margin:0 0 6px 0; color:#1b4332;">📍 ${cat}</h4>
                        <p style="margin:2px 0;"><b>Area:</b> ${(props.area_sqft || 0).toLocaleString()} sq ft</p>
                        <p style="margin:2px 0;"><b>Albedo Rating (α):</b> ${albedoVal}</p>
                        <p style="margin:6px 0 0 0;"><b>Active Surface Temp (${hData.label}):</b> <strong style="color:#c62828; font-size:15px;">${surfaceTemp}°F</strong></p>
                    </div>
                `);
            }
        });

        mapLayerGroup.addLayer(geoJsonLayer);
    }

    function renderMatrixTable(hour) {
        if (!matrixTableBody || !rawGeoJson || !rawGeoJson.features) return;
        const hData = diurnalModel[hour] || diurnalModel[13];

        matrixTableBody.innerHTML = "";

        rawGeoJson.features.forEach((f, idx) => {
            const cat = f.properties.category || "Zone";
            if (cat === "Campus Boundary") return;

            let albedoVal = "0.35";
            let matName = "Soil / Open Field";
            let getTempFn = (h) => diurnalModel[h].vegF + 3;

            if (cat.includes("Parking")) {
                matName = "Dark Asphalt Blacktop";
                albedoVal = "0.08 (Low)";
                getTempFn = (h) => diurnalModel[h].asphaltF;
            } else if (cat.includes("Roof")) {
                matName = "Asphalt Shingle / Roof Deck";
                albedoVal = "0.22 (Med)";
                getTempFn = (h) => diurnalModel[h].roofF;
            } else if (cat.includes("Lawn") || cat.includes("Grass")) {
                matName = "Turf Grass Lawn";
                albedoVal = "0.48 (Cooling)";
                getTempFn = (h) => diurnalModel[h].vegF;
            } else if (cat.includes("Microforest") || cat.includes("Shaded")) {
                matName = "Microforest Canopy Shade";
                albedoVal = "0.82 (High)";
                getTempFn = (h) => diurnalModel[h].shadeF;
            }

            const activeTemp = getTempFn(hour);
            const offset = activeTemp - hData.ambientF;
            const offsetText = offset >= 0 ? `+${offset}°F Hotter` : `${offset}°F Cooler`;
            const badgeBg = activeTemp >= 115 ? "#f44336" : (activeTemp >= 98 ? "#ff9800" : (activeTemp >= 88 ? "#8bc34a" : "#2196f3"));

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>Zone #${idx}: ${cat}</strong></td>
                <td>${matName}</td>
                <td><strong>${albedoVal}</strong></td>
                <td>${getTempFn(8)}°F</td>
                <td>${getTempFn(10)}°F</td>
                <td>${getTempFn(12)}°F</td>
                <td><strong style="color:#c62828;">${getTempFn(14)}°F</strong></td>
                <td>${getTempFn(16)}°F</td>
                <td>${getTempFn(18)}°F</td>
                <td><span class="temp-badge" style="background:${badgeBg};">${activeTemp}°F</span></td>
                <td><strong style="color:${offset >= 0 ? '#c62828' : '#2e7d32'};">${offsetText}</strong></td>
            `;

            matrixTableBody.appendChild(tr);
        });
    }

    // Initial render call
    updateHourState();
});
