document.addEventListener("DOMContentLoaded", () => {
    const campusName = localStorage.getItem("activeCampusName") || "J.W. Caceres & M. Rivas Academy";
    const campusNameDisplay = document.getElementById("campusNameDisplay");
    if (campusNameDisplay) campusNameDisplay.textContent = campusName;

    const DEFAULT_CENTER = [-98.0706, 26.1670];
    const activeLng = parseFloat(localStorage.getItem("activeCampusLng"));
    const activeLat = parseFloat(localStorage.getItem("activeCampusLat"));
    let mapCenter = (!isNaN(activeLng) && !isNaN(activeLat) && activeLat > 25.5 && activeLat < 27.5) 
        ? [activeLng, activeLat] 
        : DEFAULT_CENTER;

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
     * Converts a surface temperature (°F) into a RGBA color array along a smooth heat gradient
     * Range: 75°F (Blue) -> 88°F (Green) -> 100°F (Yellow) -> 115°F (Orange) -> 128°F+ (Red)
     */
    function getTempHeatColor(tempF) {
        if (tempF <= 78) return [33, 150, 243, 0.75];   // Vibrant Blue
        if (tempF <= 86) return [76, 175, 80, 0.75];   // Vibrant Green
        if (tempF <= 98) return [255, 235, 59, 0.75];  // Yellow
        if (tempF <= 112) return [255, 152, 0, 0.75]; // Orange
        return [244, 67, 54, 0.85];                    // Crimson Red
    }

    let isPlaying = false;
    let playInterval = null;

    if (playHourBtn) {
        playHourBtn.addEventListener("click", () => {
            isPlaying = !isPlaying;
            playHourBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play Cycle";
            playHourBtn.style.background = isPlaying ? "#c62828" : "#2e4d3c";

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

        if (window.redrawAlbedoHeatMap) {
            window.redrawAlbedoHeatMap(hour, typeSelect ? typeSelect.value : "all");
        }

        renderMatrixTable(hour);
    }

    let allZones = [];

    // ArcGIS Map Init
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/geometry/Polygon"
    ], function (Map, MapView, GraphicsLayer, Graphic, Polygon) {

        const map = new Map({ basemap: "hybrid" });
        const surfaceLayer = new GraphicsLayer({ title: "Surface Heat Gradient Layer" });
        map.add(surfaceLayer);

        const view = new MapView({
            container: "albedoMap",
            map: map,
            center: mapCenter,
            zoom: 17.5
        });

        function loadZones() {
            fetch("data/jason_m_rivas_zones.json")
                .then(res => res.json())
                .then(data => {
                    allZones = data.features;
                    updateHourState();
                })
                .catch(() => {
                    fetch("data/campus_zones.json")
                        .then(res => res.json())
                        .then(data => {
                            allZones = data.features;
                            updateHourState();
                        })
                        .catch(err => console.error("Error loading zones:", err));
                });
        }

        window.redrawAlbedoHeatMap = function (hour, filterType) {
            surfaceLayer.removeAll();
            const hData = diurnalModel[hour] || diurnalModel[13];

            allZones.forEach(f => {
                const cat = f.properties.category || "Unmapped Surface";

                let show = false;
                if (filterType === "all") show = true;
                if (filterType === "parking" && cat === "Parking Lot") show = true;
                if (filterType === "roof" && cat === "Rooftop") show = true;
                if (filterType === "veg" && (cat === "Open Field" || cat === "Grass" || cat === "Tree Enclosed Area" || cat === "Shaded Area")) show = true;
                if (cat === "Campus Boundary") show = true;

                if (!show) return;

                let surfaceTemp = hData.ambientF;
                let albedoVal = 0.35;

                if (cat === "Parking Lot") {
                    surfaceTemp = hData.asphaltF;
                    albedoVal = 0.08;
                } else if (cat === "Rooftop") {
                    surfaceTemp = hData.roofF;
                    albedoVal = 0.22;
                } else if (cat === "Open Field") {
                    surfaceTemp = hData.vegF + 4;
                    albedoVal = 0.35;
                } else if (cat === "Grass") {
                    surfaceTemp = hData.vegF;
                    albedoVal = 0.48;
                } else if (cat === "Tree Enclosed Area" || cat === "Shaded Area") {
                    surfaceTemp = hData.shadeF;
                    albedoVal = 0.82;
                }

                let color = getTempHeatColor(surfaceTemp);
                let outlineColor = [255, 255, 255, 0.8];
                let outlineWidth = 1.5;

                if (cat === "Campus Boundary") {
                    color = [0, 0, 0, 0];
                    outlineColor = [255, 235, 59, 1];
                    outlineWidth = 3;
                }

                let coords = f.geometry.coordinates;
                if (f.geometry.type === "Polygon") {
                    const polygon = new Polygon({ rings: coords, spatialReference: { wkid: 4326 } });
                    const graphic = new Graphic({
                        geometry: polygon,
                        symbol: {
                            type: "simple-fill",
                            color: color,
                            outline: { width: outlineWidth, color: outlineColor }
                        },
                        popupTemplate: {
                            title: `Zone: ${cat}`,
                            content: `<p><b>Material:</b> ${cat}</p><p><b>Albedo (α):</b> ${albedoVal}</p><p><b>Active Temp (${hData.label}):</b> <span style="font-size:16px; font-weight:bold; color:#c62828;">${surfaceTemp}°F</span></p>`
                        }
                    });
                    surfaceLayer.add(graphic);
                }
            });
        };

        loadZones();
    });

    function renderMatrixTable(hour) {
        if (!matrixTableBody || !allZones.length) return;
        const hData = diurnalModel[hour] || diurnalModel[13];

        matrixTableBody.innerHTML = "";

        const sampleHours = [8, 10, 12, 14, 16, 18];

        allZones.forEach((f, idx) => {
            const cat = f.properties.category || "Zone";
            if (cat === "Campus Boundary") return;

            let albedoVal = "0.35";
            let matName = "Soil / Open Field";
            let getTempFn = (h) => diurnalModel[h].vegF + 3;

            if (cat === "Parking Lot") {
                matName = "Dark Asphalt";
                albedoVal = "0.08 (Low)";
                getTempFn = (h) => diurnalModel[h].asphaltF;
            } else if (cat === "Rooftop") {
                matName = "Asphalt Shingle / Built-Up";
                albedoVal = "0.22 (Med)";
                getTempFn = (h) => diurnalModel[h].roofF;
            } else if (cat === "Grass") {
                matName = "Turf Grass";
                albedoVal = "0.48 (Cooling)";
                getTempFn = (h) => diurnalModel[h].vegF;
            } else if (cat === "Tree Enclosed Area" || cat === "Shaded Area") {
                matName = "Canopy Shade Shield";
                albedoVal = "0.82 (High)";
                getTempFn = (h) => diurnalModel[h].shadeF;
            }

            const activeTemp = getTempFn(hour);
            const offset = activeTemp - hData.ambientF;
            const offsetText = offset >= 0 ? `+${offset}°F Hotter` : `${offset}°F Cooler`;
            const badgeBg = activeTemp >= 115 ? "#f44336" : (activeTemp >= 98 ? "#ff9800" : (activeTemp >= 88 ? "#8bc34a" : "#2196f3"));

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>Zone #${idx + 1}: ${cat}</strong></td>
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
});
