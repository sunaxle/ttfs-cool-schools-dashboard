(function () {
    "use strict";

    // Representative Campuses Configuration (1 for Donna ISD, 1 for Mercedes ISD)
    const REPRESENTATIVE_CAMPUSES = {
        donna_jw_caceres: {
            id: "donna_jw_caceres",
            district: "Donna ISD",
            name: "J.W. Caceres Discovery Intermediate Academy",
            shortName: "J.W. Caceres (Donna ISD)",
            coords: [26.1668, -98.0700],
            totalAreaSqFt: 450000,
            treeCountPlanted: 154,
            legacyTrees: 18,
            latOffset: -0.0002,
            lngOffset: 0.0006,
            stages: {
                pre: {
                    label: "1. Before Planting",
                    canopyPct: 4.5,
                    shadedSqFt: 20250,
                    albedo: 0.15,
                    airTempPeak: 95.8,
                    exposedPeak: 128.0,
                    shadedPeak: 91.2,
                    outdoorDays: 4,
                    coolingOffset: -4.6,
                    treeScale: 0.35,
                    showNewTrees: false
                },
                post: {
                    label: "2. Newly Planted (Yr 1)",
                    canopyPct: 9.0,
                    shadedSqFt: 40500,
                    albedo: 0.17,
                    airTempPeak: 94.2,
                    exposedPeak: 122.5,
                    shadedPeak: 89.1,
                    outdoorDays: 9,
                    coolingOffset: -6.8,
                    treeScale: 0.55,
                    showNewTrees: true
                },
                mature: {
                    label: "3. Grown Trees (10–15 Yr)",
                    canopyPct: 22.8,
                    shadedSqFt: 102600,
                    albedo: 0.24,
                    airTempPeak: 91.2,
                    exposedPeak: 118.4,
                    shadedPeak: 82.8,
                    outdoorDays: 17,
                    coolingOffset: -13.0,
                    treeScale: 1.08,
                    showNewTrees: true
                }
            },
            baseSurfacesSqFt: {
                "Rooftop": 78500,
                "Parking Lot & Asphalt": 139500,
                "Open Field / Bare Soil": 94500,
                "Turf Grass Lawn": 115000,
                "Tree Canopy & Shaded Grounds": 22500
            }
        },
        mercedes_hinojosa: {
            id: "mercedes_hinojosa",
            district: "Mercedes ISD",
            name: "Ruben Hinojosa Elementary School",
            shortName: "Ruben Hinojosa Elem (Mercedes ISD)",
            coords: [26.1557, -97.9868],
            totalAreaSqFt: 418000,
            treeCountPlanted: 142,
            legacyTrees: 14,
            latOffset: -0.0113,
            lngOffset: 0.0838,
            stages: {
                pre: {
                    label: "1. Before Planting",
                    canopyPct: 4.0,
                    shadedSqFt: 16720,
                    albedo: 0.14,
                    airTempPeak: 96.2,
                    exposedPeak: 129.4,
                    shadedPeak: 91.8,
                    outdoorDays: 3,
                    coolingOffset: -4.2,
                    treeScale: 0.32,
                    showNewTrees: false
                },
                post: {
                    label: "2. Newly Planted (Yr 1)",
                    canopyPct: 8.6,
                    shadedSqFt: 35948,
                    albedo: 0.16,
                    airTempPeak: 94.5,
                    exposedPeak: 121.2,
                    shadedPeak: 89.0,
                    outdoorDays: 8,
                    coolingOffset: -6.5,
                    treeScale: 0.55,
                    showNewTrees: true
                },
                mature: {
                    label: "3. Grown Trees (10–15 Yr)",
                    canopyPct: 21.6,
                    shadedSqFt: 90288,
                    albedo: 0.23,
                    airTempPeak: 91.6,
                    exposedPeak: 118.0,
                    shadedPeak: 83.1,
                    outdoorDays: 16,
                    coolingOffset: -13.1,
                    treeScale: 1.05,
                    showNewTrees: true
                }
            },
            baseSurfacesSqFt: {
                "Rooftop": 71060,
                "Parking Lot & Asphalt": 133760,
                "Open Field / Bare Soil": 91960,
                "Turf Grass Lawn": 104500,
                "Tree Canopy & Shaded Grounds": 16720
            }
        }
    };

    // Diurnal Solar & Temperature Multipliers (8 AM to 6 PM)
    const DIURNAL_MODEL = {
        8:  { label: "8:00 AM",  solarW: 420, airDelta: -12, asphaltDelta: -36, roofDelta: -28, vegDelta: -10, shadeDelta: -6 },
        9:  { label: "9:00 AM",  solarW: 610, airDelta: -9,  asphaltDelta: -28, roofDelta: -22, vegDelta: -8,  shadeDelta: -5 },
        10: { label: "10:00 AM", solarW: 780, airDelta: -6,  asphaltDelta: -18, roofDelta: -15, vegDelta: -5,  shadeDelta: -3 },
        11: { label: "11:00 AM", solarW: 900, airDelta: -3,  asphaltDelta: -8,  roofDelta: -8,  vegDelta: -3,  shadeDelta: -2 },
        12: { label: "12:00 PM", solarW: 960, airDelta: -1,  asphaltDelta: -3,  roofDelta: -3,  vegDelta: -1,  shadeDelta: -1 },
        13: { label: "1:00 PM",  solarW: 940, airDelta: -0.5,asphaltDelta: -1,  roofDelta: -1,  vegDelta: -0.5,shadeDelta: -0.5 },
        14: { label: "2:00 PM",  solarW: 860, airDelta: 0,   asphaltDelta: 0,   roofDelta: 0,   vegDelta: 0,   shadeDelta: 0 },
        15: { label: "3:00 PM",  solarW: 720, airDelta: -1,  asphaltDelta: -4,  roofDelta: -4,  vegDelta: -1,  shadeDelta: -1 },
        16: { label: "4:00 PM",  solarW: 550, airDelta: -3,  asphaltDelta: -12, roofDelta: -10, vegDelta: -3,  shadeDelta: -2 },
        17: { label: "5:00 PM",  solarW: 360, airDelta: -6,  asphaltDelta: -22, roofDelta: -18, vegDelta: -5,  shadeDelta: -3 },
        18: { label: "6:00 PM",  solarW: 180, airDelta: -9,  asphaltDelta: -31, roofDelta: -24, vegDelta: -7,  shadeDelta: -4 }
    };

    const SURFACE_COLORS = {
        "Parking Lot & Asphalt": "#ef4444",
        "Rooftop": "#f97316",
        "Open Field / Bare Soil": "#eab308",
        "Turf Grass Lawn": "#4ade80",
        "Tree Canopy & Shaded Grounds": "#15803d"
    };

    const SURFACE_ALBEDOS = {
        "Parking Lot & Asphalt": "0.08 (Low / Heat Sink)",
        "Rooftop": "0.22 (Moderate)",
        "Open Field / Bare Soil": "0.35 (Medium)",
        "Turf Grass Lawn": "0.48 (Cooling Turf)",
        "Tree Canopy & Shaded Grounds": "0.82 (Canopy Intercept)"
    };

    document.addEventListener("DOMContentLoaded", () => {
        // State
        const storedCampus = localStorage.getItem("activeCampusId");
        let activeCampusKey = (storedCampus === "mercedes_hinojosa") ? "mercedes_hinojosa" : "donna_jw_caceres";
        let activeStageKey = "mature"; // "pre", "post", "mature"
        let activeViewportMode = "heatmap"; // "heatmap", "polygons", "shade3d"

        // DOM References
        const btnCampusDonna = document.getElementById("btnCampusDonna");
        const btnCampusMercedes = document.getElementById("btnCampusMercedes");
        const stageButtons = document.querySelectorAll(".lifecycle-group .lifecycle-btn");

        const hourSlider = document.getElementById("hourSlider");
        const hourReadout = document.getElementById("hourReadout");
        const playHourBtn = document.getElementById("playHourBtn");
        const typeSelect = document.getElementById("albedoTypeSelect");
        const soilSelect = document.getElementById("albedoSoilSelect");

        const btnModeHeatmap = document.getElementById("btnModeHeatmap");
        const btnModePolygons = document.getElementById("btnModePolygons");
        const btnMode3dShade = document.getElementById("btnMode3dShade");

        const albedoMapEl = document.getElementById("albedoMap");
        const shade3dViewportEl = document.getElementById("shade3dViewport");
        const shade3dOverlayHint = document.getElementById("shade3dOverlayHint");
        const shade3dCampusName = document.getElementById("shade3dCampusName");
        const flirLegendBox = document.getElementById("flirLegendBox");

        const valSolarIrradiance = document.getElementById("valSolarIrradiance");
        const valAmbientTemp = document.getElementById("valAmbientTemp");
        const valPeakAsphaltTemp = document.getElementById("valPeakAsphaltTemp");
        const valCanopyShadeTemp = document.getElementById("valCanopyShadeTemp");
        const riskVal = document.getElementById("riskValue");
        const outdoorDaysValue = document.getElementById("outdoorDaysValue");
        const riskText = document.getElementById("riskText");

        const campusNameDisplay = document.getElementById("campusNameDisplay");
        const activeStageBadge = document.getElementById("activeStageBadge");
        const prePostComparisonBody = document.getElementById("prePostComparisonBody");
        const surfaceBreakdownTableBody = document.getElementById("surfaceBreakdownTableBody");
        const matrixHourLabel = document.getElementById("matrixHourLabel");
        const tableActiveHourLabel = document.getElementById("tableActiveHourLabel");
        const matrixTableBody = document.getElementById("matrixTableBody");

        // Initialize Leaflet Map
        const initialCampus = REPRESENTATIVE_CAMPUSES[activeCampusKey];
        const map = L.map("albedoMap", {
            center: initialCampus.coords,
            zoom: 18
        });

        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution: "Esri World Imagery",
            maxZoom: 20
        }).addTo(map);

        const mapLayerGroup = L.layerGroup().addTo(map);
        let baseGeoJson = window.JASON_ZONES_DATA || null;

        if (!baseGeoJson) {
            fetch("data/jason_m_rivas_zones.json")
                .then(r => r.json())
                .then(d => {
                    baseGeoJson = d;
                    updateAllViews();
                })
                .catch(err => console.warn("Zone JSON load warning:", err));
        }

        // Charts
        let surfacePieChart = null;
        let consolidatedTempChart = null;

        // Three.js 3D Shade Simulator State
        let threeInitialized = false;
        let scene, camera, renderer, controls, sunLight;
        let treeMeshesGroup = null;

        function getSoilAdjustedStage(campusObj, stageKey) {
            return Object.assign({}, campusObj.stages[stageKey]);
        }

        function getTempForHourAndStage(campusObj, stageKey, hour) {
            const st = getSoilAdjustedStage(campusObj, stageKey);
            const d = DIURNAL_MODEL[hour] || DIURNAL_MODEL[14];
            const ambientF = +(st.airTempPeak + d.airDelta).toFixed(1);
            const asphaltF = +(st.exposedPeak + d.asphaltDelta).toFixed(1);
            const roofF = +(st.exposedPeak - 11 + d.roofDelta).toFixed(1);
            const vegF = +(ambientF - 3.5 + d.vegDelta * 0.3).toFixed(1);
            const shadeF = +(st.shadedPeak + d.shadeDelta).toFixed(1);
            return {
                label: d.label,
                solarW: d.solarW,
                ambientF,
                asphaltF,
                roofF,
                vegF,
                shadeF
            };
        }

        function getTempHeatColorHex(tempF) {
            if (tempF <= 80) return "#2196f3";
            if (tempF <= 88) return "#4caf50";
            if (tempF <= 100) return "#eab308";
            if (tempF <= 114) return "#f97316";
            return "#ef4444";
        }

        // Transform base polygons to fit the selected representative campus coordinates
        function getCampusAdjustedFeatures(campusObj) {
            if (!baseGeoJson || !baseGeoJson.features) return [];
            return baseGeoJson.features.map(f => {
                const copy = JSON.parse(JSON.stringify(f));
                if (copy.geometry && copy.geometry.coordinates && copy.geometry.coordinates[0]) {
                    copy.geometry.coordinates[0] = copy.geometry.coordinates[0].map(pt => [
                        pt[0] + campusObj.lngOffset,
                        pt[1] + campusObj.latOffset
                    ]);
                }
                return copy;
            });
        }

        // 1. Render Pre/Post-to-Mature Comparison Report Table
        function renderPrePostReport(campusObj) {
            if (!prePostComparisonBody) return;
            const sPre = getSoilAdjustedStage(campusObj, "pre");
            const sPost = getSoilAdjustedStage(campusObj, "post");
            const sMat = getSoilAdjustedStage(campusObj, "mature");
            const survivingNew = Math.round(campusObj.treeCountPlanted * 0.94);

            const rows = [
                {
                    metric: "🌳 Total Campus Trees",
                    pre: `${campusObj.legacyTrees} Existing Trees`,
                    post: `${campusObj.legacyTrees + campusObj.treeCountPlanted} Trees (+${campusObj.treeCountPlanted} Planted)`,
                    mat: `${campusObj.legacyTrees + survivingNew} Grown Trees`,
                    delta: `+${survivingNew} New Campus Trees`
                },
                {
                    metric: "☂️ Schoolyard Covered in Shade",
                    pre: `${sPre.canopyPct.toFixed(1)}% (${sPre.shadedSqFt.toLocaleString()} ft²)`,
                    post: `${sPost.canopyPct.toFixed(1)}% (${sPost.shadedSqFt.toLocaleString()} ft²)`,
                    mat: `${sMat.canopyPct.toFixed(1)}% (${sMat.shadedSqFt.toLocaleString()} ft²)`,
                    delta: `+${(sMat.canopyPct - sPre.canopyPct).toFixed(1)}% (+${(sMat.shadedSqFt - sPre.shadedSqFt).toLocaleString()} ft²)`
                },
                {
                    metric: "☀️ Sunlight Reflected Back (Cool Ground Score)",
                    pre: `${sPre.albedo.toFixed(2)}`,
                    post: `${sPost.albedo.toFixed(2)}`,
                    mat: `${sMat.albedo.toFixed(2)}`,
                    delta: `+${(sMat.albedo - sPre.albedo).toFixed(2)} Cooler Surface`
                },
                {
                    metric: "🛣️ Hot Blacktop Temp (2:00 PM)",
                    pre: `${sPre.exposedPeak.toFixed(1)}°F`,
                    post: `${sPost.exposedPeak.toFixed(1)}°F`,
                    mat: `${sMat.exposedPeak.toFixed(1)}°F`,
                    delta: `${(sMat.exposedPeak - sPre.exposedPeak).toFixed(1)}°F Cooler`
                },
                {
                    metric: "🌲 Ground Temp Under Tree Shade (2:00 PM)",
                    pre: `${sPre.shadedPeak.toFixed(1)}°F`,
                    post: `${sPost.shadedPeak.toFixed(1)}°F`,
                    mat: `${sMat.shadedPeak.toFixed(1)}°F`,
                    delta: `${(sMat.shadedPeak - sPre.exposedPeak).toFixed(1)}°F Cooler Than Blacktop`
                },
                {
                    metric: "🎒 Extra Comfortable Outdoor School Days",
                    pre: `+${sPre.outdoorDays} Days / yr`,
                    post: `+${sPost.outdoorDays} Days / yr`,
                    mat: `+${sMat.outdoorDays} Days / yr`,
                    delta: `+${sMat.outdoorDays - sPre.outdoorDays} More Days Outside`
                }
            ];

            prePostComparisonBody.innerHTML = rows.map(r => `
                <tr>
                    <td><strong>${r.metric}</strong></td>
                    <td style="${activeStageKey === 'pre' ? 'background:#fef3c7; font-weight:700;' : ''}">${r.pre}</td>
                    <td style="${activeStageKey === 'post' ? 'background:#e0f2fe; font-weight:700;' : ''}">${r.post}</td>
                    <td style="${activeStageKey === 'mature' ? 'background:#dcfce7; font-weight:700; color:#14532d;' : ''}">${r.mat}</td>
                    <td><span class="delta-badge">${r.delta}</span></td>
                </tr>
            `).join("");
        }

        // 2. Render Consolidated Surface Breakdown Chart & Table
        function renderSurfaceBreakdown(campusObj, stageKey) {
            const st = getSoilAdjustedStage(campusObj, stageKey);
            const total = campusObj.totalAreaSqFt;
            const base = campusObj.baseSurfacesSqFt;

            const extraShade = Math.max(0, st.shadedSqFt - base["Tree Canopy & Shaded Grounds"]);
            // Expanding tree canopy shades portions of asphalt (35%), open field (35%), and turf (30%)
            const currentBreakdown = {
                "Tree Canopy & Shaded Grounds": st.shadedSqFt,
                "Turf Grass Lawn": Math.max(15000, Math.round(base["Turf Grass Lawn"] - extraShade * 0.30)),
                "Open Field / Bare Soil": Math.max(15000, Math.round(base["Open Field / Bare Soil"] - extraShade * 0.35)),
                "Rooftop": base["Rooftop"],
                "Parking Lot & Asphalt": Math.max(25000, Math.round(base["Parking Lot & Asphalt"] - extraShade * 0.35))
            };

            if (surfaceBreakdownTableBody) {
                surfaceBreakdownTableBody.innerHTML = "";
                Object.entries(currentBreakdown).forEach(([cat, sqFt]) => {
                    const pct = ((sqFt / total) * 100).toFixed(1);
                    const color = SURFACE_COLORS[cat] || "#6b7280";
                    const albedoStr = SURFACE_ALBEDOS[cat] || "0.30";
                    surfaceBreakdownTableBody.insertAdjacentHTML("beforeend", `
                        <tr>
                            <td><span class="legend-box" style="background:${color};"></span><strong>${cat}</strong></td>
                            <td>${albedoStr}</td>
                            <td>${sqFt.toLocaleString()} sq ft</td>
                            <td><strong>${pct}%</strong></td>
                        </tr>
                    `);
                });
                surfaceBreakdownTableBody.insertAdjacentHTML("beforeend", `
                    <tr style="background:#e8f5e9; font-weight:bold;">
                        <td>Total Representative Campus Footprint</td>
                        <td>Mean α = ${st.albedo.toFixed(2)}</td>
                        <td>${total.toLocaleString()} sq ft</td>
                        <td>100.0%</td>
                    </tr>
                `);
            }

            const canvas = document.getElementById("surfacePieChart");
            if (canvas && typeof Chart !== "undefined") {
                const labels = Object.keys(currentBreakdown);
                const dataVals = Object.values(currentBreakdown);
                const bgColors = labels.map(l => SURFACE_COLORS[l]);

                if (surfacePieChart) {
                    surfacePieChart.data.labels = labels;
                    surfacePieChart.data.datasets[0].data = dataVals;
                    surfacePieChart.data.datasets[0].backgroundColor = bgColors;
                    surfacePieChart.update();
                } else {
                    surfacePieChart = new Chart(canvas.getContext("2d"), {
                        type: "doughnut",
                        data: {
                            labels,
                            datasets: [{
                                data: dataVals,
                                backgroundColor: bgColors,
                                borderWidth: 2,
                                borderColor: "#ffffff"
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { display: false }
                            }
                        }
                    });
                }
            }
        }

        // 3. Render 2025-2040 Consolidated Temperature & Shade Trajectory Chart
        function renderTrajectoryChart(campusObj) {
            const canvas = document.getElementById("consolidatedTempChart");
            if (!canvas || typeof Chart === "undefined") return;

            const years = ["2025 (Pre-Planting)", "2026 (Initial Planting)", "2028 (Yr 3)", "2031 (Yr 5)", "2036 (Yr 10)", "2040 (Mature 15-Yr)"];
            const sPre = getSoilAdjustedStage(campusObj, "pre");
            const sPost = getSoilAdjustedStage(campusObj, "post");
            const sMat = getSoilAdjustedStage(campusObj, "mature");

            const exposedSeries = [
                sPre.exposedPeak,
                sPost.exposedPeak,
                +(sPost.exposedPeak - 1.5).toFixed(1),
                +(sPost.exposedPeak - 3.2).toFixed(1),
                +(sMat.exposedPeak + 0.8).toFixed(1),
                sMat.exposedPeak
            ];

            const shadedSeries = [
                sPre.shadedPeak,
                sPost.shadedPeak,
                +(sPost.shadedPeak - 2.1).toFixed(1),
                +(sPost.shadedPeak - 4.5).toFixed(1),
                +(sMat.shadedPeak + 1.0).toFixed(1),
                sMat.shadedPeak
            ];

            if (consolidatedTempChart) {
                consolidatedTempChart.data.datasets[0].data = exposedSeries;
                consolidatedTempChart.data.datasets[1].data = shadedSeries;
                consolidatedTempChart.update();
            } else {
                consolidatedTempChart = new Chart(canvas.getContext("2d"), {
                    type: "line",
                    data: {
                        labels: years,
                        datasets: [
                            {
                                label: "Exposed Asphalt Peak Temp (°F)",
                                data: exposedSeries,
                                borderColor: "#dc2626",
                                backgroundColor: "rgba(220, 38, 38, 0.1)",
                                borderWidth: 2.5,
                                tension: 0.3,
                                fill: true
                            },
                            {
                                label: "Under Canopy Shade Temp (°F)",
                                data: shadedSeries,
                                borderColor: "#16a34a",
                                backgroundColor: "rgba(22, 163, 74, 0.18)",
                                borderWidth: 3,
                                tension: 0.3,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: "bottom" }
                        },
                        scales: {
                            y: {
                                suggestedMin: 75,
                                suggestedMax: 135,
                                title: { display: true, text: "Surface Temperature (°F)" }
                            }
                        }
                    }
                });
            }
        }

        // 4. Render 2D Leaflet Map (FLIR Smooth Heatmap OR Zone Polygons)
        function render2DMap(campusObj, stageKey, hour, filterType) {
            mapLayerGroup.clearLayers();
            const features = getCampusAdjustedFeatures(campusObj);
            if (!features.length) return;

            const hData = getTempForHourAndStage(campusObj, stageKey, hour);

            if (activeViewportMode === "heatmap") {
                const heatPoints = [];
                features.forEach((f, idx) => {
                    const cat = f.properties.category || "";
                    if (cat === "Campus Boundary") return;
                    if (filterType === "parking" && !cat.includes("Parking")) return;
                    if (filterType === "roof" && !cat.includes("Roof")) return;
                    if (filterType === "veg" && (cat.includes("Parking") || cat.includes("Roof"))) return;

                    let surfaceTemp = hData.ambientF;
                    if (cat.includes("Parking")) surfaceTemp = hData.asphaltF;
                    else if (cat.includes("Roof")) surfaceTemp = hData.roofF;
                    else if (cat.includes("Field")) surfaceTemp = (stageKey === "mature" && idx % 2 === 0) ? hData.shadeF + 2 : hData.vegF + 3;
                    else if (cat.includes("Lawn") || cat.includes("Grass")) surfaceTemp = (stageKey === "mature") ? hData.shadeF + 1 : hData.vegF;
                    else if (cat.includes("Microforest") || cat.includes("Shaded")) surfaceTemp = hData.shadeF;

                    const intensity = Math.max(0.12, Math.min(1.0, (surfaceTemp - 75) / (132 - 75)));
                    const ring = f.geometry.coordinates[0];
                    if (!ring || !ring.length) return;

                    let sumLat = 0, sumLng = 0;
                    ring.forEach(pt => {
                        sumLng += pt[0];
                        sumLat += pt[1];
                        heatPoints.push([pt[1], pt[0], intensity * 0.85]);
                    });
                    const cLat = sumLat / ring.length;
                    const cLng = sumLng / ring.length;
                    heatPoints.push([cLat, cLng, intensity]);
                    heatPoints.push([cLat + 0.00005, cLng + 0.00005, intensity]);
                    heatPoints.push([cLat - 0.00005, cLng - 0.00005, intensity]);
                });

                if (typeof L.heatLayer === "function") {
                    const heatLayer = L.heatLayer(heatPoints, {
                        radius: 28,
                        blur: 20,
                        maxZoom: 19,
                        max: 1.0,
                        gradient: {
                            0.15: "#2196f3",
                            0.35: "#4caf50",
                            0.55: "#ffeb3b",
                            0.75: "#ff9800",
                            0.95: "#f44336"
                        }
                    });
                    mapLayerGroup.addLayer(heatLayer);
                }

                const boundaryFeature = features.find(f => f.properties.category === "Campus Boundary");
                if (boundaryFeature) {
                    mapLayerGroup.addLayer(L.geoJSON(boundaryFeature, {
                        style: { color: "#ffeb3b", weight: 3, fillColor: "transparent", fillOpacity: 0 }
                    }));
                }
            } else if (activeViewportMode === "polygons") {
                const filtered = features.filter(f => {
                    const cat = f.properties.category || "";
                    if (cat === "Campus Boundary") return true;
                    if (filterType === "all") return true;
                    if (filterType === "parking" && cat.includes("Parking")) return true;
                    if (filterType === "roof" && cat.includes("Roof")) return true;
                    if (filterType === "veg" && !cat.includes("Parking") && !cat.includes("Roof")) return true;
                    return false;
                });

                const geoLayer = L.geoJSON({ type: "FeatureCollection", features: filtered }, {
                    style: (feature) => {
                        const cat = feature.properties.category || "";
                        if (cat === "Campus Boundary") {
                            return { color: "#ffeb3b", weight: 3, fillColor: "transparent", fillOpacity: 0 };
                        }
                        let surfaceTemp = hData.ambientF;
                        if (cat.includes("Parking")) surfaceTemp = hData.asphaltF;
                        else if (cat.includes("Roof")) surfaceTemp = hData.roofF;
                        else if (cat.includes("Field")) surfaceTemp = stageKey === "mature" ? hData.shadeF + 2 : hData.vegF + 3;
                        else if (cat.includes("Lawn") || cat.includes("Grass")) surfaceTemp = stageKey === "mature" ? hData.shadeF + 1 : hData.vegF;
                        else surfaceTemp = hData.shadeF;

                        return {
                            color: "#ffffff",
                            weight: 1.5,
                            fillColor: getTempHeatColorHex(surfaceTemp),
                            fillOpacity: 0.68
                        };
                    },
                    onEachFeature: (feature, layer) => {
                        const props = feature.properties || {};
                        const cat = props.category || "Zone";
                        if (cat === "Campus Boundary") return;
                        let surfaceTemp = hData.ambientF;
                        let albedoVal = "0.35";
                        if (cat.includes("Parking")) { surfaceTemp = hData.asphaltF; albedoVal = "0.08 (Low)"; }
                        else if (cat.includes("Roof")) { surfaceTemp = hData.roofF; albedoVal = "0.22 (Med)"; }
                        else if (cat.includes("Lawn") || cat.includes("Grass")) { surfaceTemp = hData.vegF; albedoVal = "0.48 (Cooling)"; }
                        else if (cat.includes("Microforest") || cat.includes("Shaded")) { surfaceTemp = hData.shadeF; albedoVal = "0.82 (High Canopy)"; }

                        layer.bindPopup(`
                            <div style="font-family:Georgia,serif; font-size:12px;">
                                <strong style="color:#1b4d2b;">📍 ${campusObj.shortName} — ${cat}</strong><br/>
                                <b>Stage:</b> ${campusObj.stages[stageKey].label}<br/>
                                <b>Zone Area:</b> ${(props.area_sqft || 0).toLocaleString()} sq ft<br/>
                                <b>Albedo (α):</b> ${albedoVal}<br/>
                                <b>Surface Temp (${hData.label}):</b> <strong style="color:#dc2626;">${surfaceTemp}°F</strong>
                            </div>
                        `);
                    }
                });
                mapLayerGroup.addLayer(geoLayer);
            }
        }

        // 5. Initialize & Update Three.js 3D Orbital Shade Model
        function initOrUpdate3DShade(campusObj, stageKey, hour) {
            if (!shade3dViewportEl || typeof THREE === "undefined") return;

            if (!threeInitialized) {
                const width = shade3dViewportEl.clientWidth || 560;
                const height = shade3dViewportEl.clientHeight || 420;

                scene = new THREE.Scene();
                scene.background = new THREE.Color(0xdbeafe);

                camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
                camera.position.set(38, 28, 42);

                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setSize(width, height);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                shade3dViewportEl.innerHTML = "";
                shade3dViewportEl.appendChild(renderer.domElement);

                if (typeof THREE.OrbitControls !== "undefined") {
                    controls = new THREE.OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.maxPolarAngle = Math.PI / 2 - 0.04;
                }

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
                scene.add(ambientLight);

                sunLight = new THREE.DirectionalLight(0xfffbeb, 1.15);
                sunLight.castShadow = true;
                sunLight.shadow.mapSize.width = 2048;
                sunLight.shadow.mapSize.height = 2048;
                sunLight.shadow.camera.near = 0.5;
                sunLight.shadow.camera.far = 140;
                const d = 45;
                sunLight.shadow.camera.left = -d;
                sunLight.shadow.camera.right = d;
                sunLight.shadow.camera.top = d;
                sunLight.shadow.camera.bottom = -d;
                scene.add(sunLight);

                // Ground Campus Base (Turf + Asphalt Courtyard + School Building Wing)
                const turfGeo = new THREE.PlaneGeometry(80, 80);
                const turfMat = new THREE.MeshLambertMaterial({ color: 0x86efac });
                const turfMesh = new THREE.Mesh(turfGeo, turfMat);
                turfMesh.rotation.x = -Math.PI / 2;
                turfMesh.receiveShadow = true;
                scene.add(turfMesh);

                const asphaltGeo = new THREE.BoxGeometry(36, 0.15, 26);
                const asphaltMat = new THREE.MeshLambertMaterial({ color: 0x4b5563 });
                const asphaltMesh = new THREE.Mesh(asphaltGeo, asphaltMat);
                asphaltMesh.position.set(0, 0.08, 6);
                asphaltMesh.receiveShadow = true;
                scene.add(asphaltMesh);

                // School Building Wing
                const bldgGeo = new THREE.BoxGeometry(34, 7.5, 12);
                const bldgMat = new THREE.MeshLambertMaterial({ color: 0xf5d7b9 });
                const bldgMesh = new THREE.Mesh(bldgGeo, bldgMat);
                bldgMesh.position.set(0, 3.75, -16);
                bldgMesh.castShadow = true;
                bldgMesh.receiveShadow = true;
                scene.add(bldgMesh);

                const roofGeo = new THREE.BoxGeometry(35.5, 0.6, 13.5);
                const roofMat = new THREE.MeshLambertMaterial({ color: 0x9a3412 });
                const roofMesh = new THREE.Mesh(roofGeo, roofMat);
                roofMesh.position.set(0, 7.8, -16);
                roofMesh.castShadow = true;
                scene.add(roofMesh);

                treeMeshesGroup = new THREE.Group();
                scene.add(treeMeshesGroup);

                const animate = function () {
                    requestAnimationFrame(animate);
                    if (controls) controls.update();
                    if (renderer && scene && camera && activeViewportMode === "shade3d") {
                        renderer.render(scene, camera);
                    }
                };
                animate();

                window.addEventListener("resize", () => {
                    if (!shade3dViewportEl || activeViewportMode !== "shade3d") return;
                    const w = shade3dViewportEl.clientWidth || 560;
                    const h = shade3dViewportEl.clientHeight || 420;
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                });

                threeInitialized = true;
            }

            // Rebuild trees for stage (Pre-Planting vs Initial Planting vs Mature Canopy)
            while (treeMeshesGroup.children.length > 0) {
                treeMeshesGroup.remove(treeMeshesGroup.children[0]);
            }

            const st = getSoilAdjustedStage(campusObj, stageKey);
            const treePositions = [
                // Legacy perimeter trees (always present)
                { x: -24, z: -6, legacy: true },
                { x: 24, z: -6, legacy: true },
                { x: -26, z: 18, legacy: true },
                // TTFS newly planted courtyard & microforest trees
                { x: -12, z: 2, legacy: false },
                { x: -4, z: 4, legacy: false },
                { x: 5, z: 2, legacy: false },
                { x: 13, z: 5, legacy: false },
                { x: -14, z: 12, legacy: false },
                { x: -5, z: 14, legacy: false },
                { x: 4, z: 13, legacy: false },
                { x: 14, z: 14, legacy: false },
                { x: -18, z: 7, legacy: false },
                { x: 18, z: 9, legacy: false },
                { x: 0, z: 8, legacy: false }
            ];

            treePositions.forEach((pos, idx) => {
                if (!pos.legacy && !st.showNewTrees) return;
                const scale = pos.legacy ? 1.15 : st.treeScale;

                const group = new THREE.Group();
                const trunkGeo = new THREE.CylinderGeometry(0.35 * scale, 0.55 * scale, 3.8 * scale, 10);
                const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
                const trunk = new THREE.Mesh(trunkGeo, trunkMat);
                trunk.position.y = 1.9 * scale;
                trunk.castShadow = true;
                group.add(trunk);

                const crownColor = (idx % 2 === 0) ? 0x15803d : 0x166534;
                const crownGeo = new THREE.SphereGeometry(3.2 * scale, 14, 12);
                crownGeo.scale(1.25, 0.82, 1.25);
                const crownMat = new THREE.MeshLambertMaterial({ color: crownColor });
                const crown = new THREE.Mesh(crownGeo, crownMat);
                crown.position.y = 4.5 * scale;
                crown.castShadow = true;
                crown.receiveShadow = true;
                group.add(crown);

                group.position.set(pos.x, 0, pos.z);
                treeMeshesGroup.add(group);
            });

            // Position sun based on hour (8 AM to 6 PM arc)
            const normalizedHour = (hour - 6) / 12; // 0 to 1
            const angle = normalizedHour * Math.PI;
            const sunX = Math.cos(angle) * -48;
            const sunY = Math.max(8, Math.sin(angle) * 46);
            const sunZ = 18;
            sunLight.position.set(sunX, sunY, sunZ);
        }

        // 6. Render Zone-by-Zone Hourly Matrix Table
        function renderMatrixTable(campusObj, stageKey, hour) {
            if (!matrixTableBody) return;
            const features = getCampusAdjustedFeatures(campusObj);
            const activeH = getTempForHourAndStage(campusObj, stageKey, hour);

            matrixTableBody.innerHTML = "";
            features.slice(0, 18).forEach((f, idx) => {
                const cat = f.properties.category || "Zone";
                if (cat === "Campus Boundary") return;

                let matName = "Open Field / Soil";
                let albedoVal = "0.35";
                let propKey = "vegF";

                if (cat.includes("Parking")) {
                    matName = "Dark Asphalt Blacktop";
                    albedoVal = "0.08 (Low)";
                    propKey = "asphaltF";
                } else if (cat.includes("Roof")) {
                    matName = "School Roof Deck";
                    albedoVal = "0.22 (Med)";
                    propKey = "roofF";
                } else if (cat.includes("Lawn") || cat.includes("Grass")) {
                    matName = stageKey === "mature" ? "Shaded Turf Lawn" : "Turf Grass Lawn";
                    albedoVal = stageKey === "mature" ? "0.68" : "0.48";
                    propKey = stageKey === "mature" ? "shadeF" : "vegF";
                } else if (cat.includes("Microforest") || cat.includes("Shaded")) {
                    matName = "Microforest Canopy Shade";
                    albedoVal = "0.82 (High)";
                    propKey = "shadeF";
                }

                const tempAt = (h) => getTempForHourAndStage(campusObj, stageKey, h)[propKey];
                const activeTemp = tempAt(hour);
                const offset = +(activeTemp - activeH.ambientF).toFixed(1);
                const offsetStr = offset >= 0 ? `+${offset}°F` : `${offset}°F`;
                const badgeBg = getTempHeatColorHex(activeTemp);

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>Zone #${idx}: ${cat}</strong></td>
                    <td>${matName}</td>
                    <td><strong>${albedoVal}</strong></td>
                    <td>${tempAt(8)}°F</td>
                    <td>${tempAt(10)}°F</td>
                    <td>${tempAt(12)}°F</td>
                    <td><strong style="color:#dc2626;">${tempAt(14)}°F</strong></td>
                    <td>${tempAt(16)}°F</td>
                    <td>${tempAt(18)}°F</td>
                    <td><span class="temp-badge" style="background:${badgeBg};">${activeTemp}°F</span></td>
                    <td><strong style="color:${offset >= 0 ? '#dc2626' : '#15803d'};">${offsetStr}</strong></td>
                `;
                matrixTableBody.appendChild(tr);
            });
        }

        // Master Update Function
        function updateAllViews(flyMap = false) {
            const campusObj = REPRESENTATIVE_CAMPUSES[activeCampusKey];
            const st = getSoilAdjustedStage(campusObj, activeStageKey);
            const hour = parseInt(hourSlider.value, 10) || 14;
            const hData = getTempForHourAndStage(campusObj, activeStageKey, hour);

            // Sync localStorage so other tabs remember representative campus
            localStorage.setItem("activeCampusId", campusObj.id);
            localStorage.setItem("activeCampusName", campusObj.name);
            localStorage.setItem("activeCampusLat", campusObj.coords[0]);
            localStorage.setItem("activeCampusLng", campusObj.coords[1]);

            if (flyMap && activeViewportMode !== "shade3d") {
                map.flyTo(campusObj.coords, 18, { duration: 1.0 });
            }

            // Top & Header Readouts
            if (hourReadout) hourReadout.textContent = hData.label;
            if (matrixHourLabel) matrixHourLabel.textContent = hData.label;
            if (tableActiveHourLabel) tableActiveHourLabel.textContent = hData.label;
            if (campusNameDisplay) campusNameDisplay.textContent = `${campusObj.name} (${campusObj.district})`;
            if (shade3dCampusName) shade3dCampusName.textContent = campusObj.shortName;
            if (activeStageBadge) activeStageBadge.textContent = `Viewing: ${st.label}`;

            // Bottom Viewport KPI Strip
            if (valSolarIrradiance) valSolarIrradiance.textContent = `${hData.solarW} W/m²`;
            if (valAmbientTemp) valAmbientTemp.textContent = `${hData.ambientF}°F`;
            if (valPeakAsphaltTemp) valPeakAsphaltTemp.textContent = `${hData.asphaltF}°F`;
            if (valCanopyShadeTemp) valCanopyShadeTemp.textContent = `${hData.shadeF}°F`;

            const shadeDiff = +(hData.asphaltF - hData.shadeF).toFixed(1);
            if (riskVal) riskVal.textContent = `-${shadeDiff}°F Cooler`;
            if (outdoorDaysValue) outdoorDaysValue.textContent = `+${st.outdoorDays} Days/yr`;
            if (riskText) {
                riskText.textContent = `At ${hData.label} under "${st.label}", unshaded asphalt reaches ${hData.asphaltF}°F while shaded canopy grounds stay at ${hData.shadeF}°F (-${shadeDiff}°F thermal relief), recovering +${st.outdoorDays} safe outdoor learning days per year.`;
            }

            // Render Right-Pane Analytical Cards
            renderPrePostReport(campusObj);
            renderSurfaceBreakdown(campusObj, activeStageKey);
            renderTrajectoryChart(campusObj);
            renderMatrixTable(campusObj, activeStageKey, hour);

            // Render Left-Pane Active Viewport
            if (activeViewportMode === "shade3d") {
                initOrUpdate3DShade(campusObj, activeStageKey, hour);
            } else {
                render2DMap(campusObj, activeStageKey, hour, typeSelect ? typeSelect.value : "all");
            }
        }

        // Event Listeners: Representative District Campus Buttons
        [btnCampusDonna, btnCampusMercedes].forEach(btn => {
            if (!btn) return;
            btn.addEventListener("click", () => {
                btnCampusDonna.classList.remove("active");
                btnCampusMercedes.classList.remove("active");
                btn.classList.add("active");
                activeCampusKey = btn.dataset.campus;
                updateAllViews(true);
            });
        });

        // Set initial active button state
        if (activeCampusKey === "mercedes_hinojosa" && btnCampusMercedes && btnCampusDonna) {
            btnCampusDonna.classList.remove("active");
            btnCampusMercedes.classList.add("active");
        }

        // Event Listeners: Pre/Post Lifecycle Stage Buttons
        stageButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                stageButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeStageKey = btn.dataset.stage;
                updateAllViews(false);
            });
        });

        // Event Listeners: Viewport Mode Tabs (2D FLIR vs 2D Polygons vs 3D Shade)
        function setViewportMode(mode) {
            activeViewportMode = mode;
            [btnModeHeatmap, btnModePolygons, btnMode3dShade].forEach(b => {
                if (b) b.classList.remove("active");
            });
            if (mode === "heatmap" && btnModeHeatmap) btnModeHeatmap.classList.add("active");
            if (mode === "polygons" && btnModePolygons) btnModePolygons.classList.add("active");
            if (mode === "shade3d" && btnMode3dShade) btnMode3dShade.classList.add("active");

            if (mode === "shade3d") {
                albedoMapEl.style.display = "none";
                flirLegendBox.style.display = "none";
                shade3dViewportEl.style.display = "block";
                shade3dOverlayHint.style.display = "block";
            } else {
                shade3dViewportEl.style.display = "none";
                shade3dOverlayHint.style.display = "none";
                albedoMapEl.style.display = "block";
                flirLegendBox.style.display = "block";
                setTimeout(() => map.invalidateSize(), 100);
            }
            updateAllViews(false);
        }

        if (btnModeHeatmap) btnModeHeatmap.addEventListener("click", () => setViewportMode("heatmap"));
        if (btnModePolygons) btnModePolygons.addEventListener("click", () => setViewportMode("polygons"));
        if (btnMode3dShade) btnMode3dShade.addEventListener("click", () => setViewportMode("shade3d"));

        // Event Listeners: Diurnal Slider & Play Cycle
        hourSlider.addEventListener("input", () => updateAllViews(false));
        if (typeSelect) typeSelect.addEventListener("change", () => updateAllViews(false));
        if (soilSelect) soilSelect.addEventListener("change", () => updateAllViews(false));

        let isPlaying = false;
        let playInterval = null;
        if (playHourBtn) {
            playHourBtn.addEventListener("click", () => {
                isPlaying = !isPlaying;
                playHourBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play Cycle";
                if (isPlaying) {
                    playInterval = setInterval(() => {
                        let h = parseInt(hourSlider.value, 10) + 1;
                        if (h > 18) h = 8;
                        hourSlider.value = h;
                        updateAllViews(false);
                    }, 900);
                } else {
                    clearInterval(playInterval);
                }
            });
        }

        // Custom GeoJSON Dropzone (from surface_area.html)
        const dropzone = document.getElementById("dropzone");
        const fileInput = document.getElementById("fileInput");
        if (dropzone && fileInput) {
            dropzone.addEventListener("click", () => fileInput.click());
            fileInput.addEventListener("change", (e) => {
                if (!e.target.files.length) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const parsed = JSON.parse(ev.target.result);
                        if (parsed && parsed.features) {
                            baseGeoJson = parsed;
                            updateAllViews(false);
                        }
                    } catch (err) {
                        console.warn("Invalid GeoJSON upload:", err);
                    }
                };
                reader.readAsText(e.target.files[0]);
            });
        }

        // Save Thermal & Shade Field Notes (from temperature.html)
        const tempNotes = document.getElementById("tempNotes");
        const saveTempNotes = document.getElementById("saveTempNotes");
        if (tempNotes) {
            tempNotes.value = localStorage.getItem("consolidated_temp_notes") || "";
        }
        if (saveTempNotes && tempNotes) {
            saveTempNotes.addEventListener("click", () => {
                localStorage.setItem("consolidated_temp_notes", tempNotes.value);
                const prev = saveTempNotes.textContent;
                saveTempNotes.textContent = "Saved!";
                setTimeout(() => { saveTempNotes.textContent = prev; }, 1500);
            });
        }

        // Initial render
        updateAllViews(false);
    });
})();
