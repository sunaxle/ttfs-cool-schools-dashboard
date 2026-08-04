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

    const valSolarIrradiance = document.getElementById("valSolarIrradiance");
    const valAmbientTemp = document.getElementById("valAmbientTemp");
    const valPeakAsphaltTemp = document.getElementById("valPeakAsphaltTemp");
    const valCanopyShadeTemp = document.getElementById("valCanopyShadeTemp");

    const matrixHourLabel = document.getElementById("matrixHourLabel");
    const tableActiveHourLabel = document.getElementById("tableActiveHourLabel");
    const matrixTableBody = document.getElementById("matrixTableBody");

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

    /**
     * Converts surface temp to hex color along smooth heat gradient
     */
    function getTempHeatColorHex(tempF) {
        if (tempF <= 78) return "#2196f3"; // Vibrant Blue
        if (tempF <= 86) return "#4caf50"; // Vibrant Green
        if (tempF <= 98) return "#ffeb3b"; // Bright Yellow
        if (tempF <= 112) return "#ff9800"; // Thermal Orange
        return "#f44336";                  // Crimson Red
    }

    // 1. Initialize Leaflet Map
    const map = L.map('albedoMap', {
        center: [26.1670, -98.0706], // Center directly over M. Rivas Primary
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

    hourSlider.addEventListener("input", updateHourState);
    if (typeSelect) typeSelect.addEventListener("change", updateHourState);

    let rawGeoJson = null;

    if (window.JASON_ZONES_DATA) {
        rawGeoJson = window.JASON_ZONES_DATA;
    } else {
        fetch("data/jason_m_rivas_zones.json")
            .then(res => res.json())
            .then(data => {
                rawGeoJson = data;
                updateHourState();
            })
            .catch(err => console.error("Error loading zone JSON:", err));
    }

    let geoJsonLayerGroup = L.layerGroup().addTo(map);

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

        renderThermalPolygons(hour, typeSelect ? typeSelect.value : "all");
        renderMatrixTable(hour);
    }

    function renderThermalPolygons(hour, filterType) {
        geoJsonLayerGroup.clearLayers();
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
                        color: "#ffeb3b", // Bright Yellow boundary outline
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

        geoJsonLayerGroup.addLayer(geoJsonLayer);
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
