document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById("exportReportBtn");
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const originalText = exportBtn.textContent;
            exportBtn.textContent = "Generating PDF...";
            exportBtn.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                exportBtn.textContent = "Report Downloaded!";
                setTimeout(() => {
                    exportBtn.textContent = originalText;
                    exportBtn.style.backgroundColor = "";
                }, 2000);
            }, 1500);
        });
    }

    const campusId = localStorage.getItem("activeCampusId") || "donna_jw_caceres";
    const campus = (typeof projectCampuses !== 'undefined' && projectCampuses.find(c => c.id === campusId))
        || (typeof projectCampuses !== 'undefined' ? projectCampuses[6] : null);

    const selectEl = document.getElementById("timelinePhaseSelect");
    const headerTitle = document.getElementById("metricsHeaderTitle");
    const lifecycleBtns = document.querySelectorAll(".lifecycle-btn[data-phase]");
    const prePostTableBody = document.getElementById("impactPrePostTableBody");
    const slider = document.getElementById('yearSlider');
    const readout = document.getElementById('yearReadout');

    function getStageValues(campusObj) {
        if (!campusObj) return null;
        const baseCanopy = campusObj.canopy.baselinePercent || 4.5;
        const postCanopy = +(baseCanopy + 4.5).toFixed(1);
        const matCanopy = +(baseCanopy + 18.2).toFixed(1); // Realistic 10-15 yr semi-urban canopy (~22-23%)

        const postAir = parseFloat(campusObj.metrics.airTemp) || 94.2;
        const baseAir = +(postAir + 1.6).toFixed(1);
        const matAir = +(postAir - 3.0).toFixed(1);

        const postExp = parseFloat(campusObj.metrics.surfaceTempExposed) || 122.5;
        const baseExp = +(postExp + 5.5).toFixed(1);
        const matExp = +(postExp - 4.1).toFixed(1);

        const postShade = parseFloat(campusObj.metrics.surfaceTempShaded) || 89.1;
        const baseShade = +(postShade + 2.1).toFixed(1);
        const matShade = +(postShade - 6.3).toFixed(1);

        const postAlbedo = parseFloat(campusObj.metrics.albedo) || 0.17;
        const baseAlbedo = +(Math.max(0.12, postAlbedo - 0.02)).toFixed(2);
        const matAlbedo = +(postAlbedo + 0.07).toFixed(2);

        const postSoil = parseFloat(campusObj.metrics.soilMoisture) || 14.2;
        const baseSoil = +(Math.max(8.0, postSoil - 3.2)).toFixed(1);
        const matSoil = +(postSoil + 9.4).toFixed(1);

        const postBio = parseInt(campusObj.metrics.biodiversityCount, 10) || 12;
        const baseBio = Math.max(4, postBio - 5);
        const matBio = postBio + 42;

        const postTrees = parseInt(campusObj.metrics.treeCount, 10) || 154;
        const baseTrees = 18;
        const survivingNew = Math.round(postTrees * 0.94);
        const matTrees = survivingNew + baseTrees;

        return {
            baseline: {
                title: "Viewing Stage: 1. Before Planting",
                canopy: `${baseCanopy}%`,
                air: `${baseAir}°F`,
                exp: `${baseExp}°F`,
                shade: `${baseShade}°F`,
                albedo: baseAlbedo.toFixed(2),
                soil: `${baseSoil}%`,
                bio: `${baseBio} Species`,
                trees: `${baseTrees} Existing Trees`
            },
            post: {
                title: "Viewing Stage: 2. Newly Planted Trees (Year 1)",
                canopy: `${postCanopy}%`,
                air: `${postAir}°F`,
                exp: `${postExp}°F`,
                shade: `${postShade}°F`,
                albedo: postAlbedo.toFixed(2),
                soil: `${postSoil}%`,
                bio: `${postBio} Species`,
                trees: `${postTrees + baseTrees} Trees (+${postTrees} Planted)`
            },
            projection: {
                title: "Viewing Stage: 3. Grown Trees (10–15 Years)",
                canopy: `${matCanopy}%`,
                air: `${matAir}°F`,
                exp: `${matExp}°F`,
                shade: `${matShade}°F`,
                albedo: matAlbedo.toFixed(2),
                soil: `${matSoil}%`,
                bio: `${matBio} Species`,
                trees: `${matTrees} Grown Trees`
            },
            deltas: {
                canopy: `+${(matCanopy - baseCanopy).toFixed(1)}% More Shade`,
                air: `${(matAir - baseAir).toFixed(1)}°F Cooler Air`,
                exp: `${(matExp - baseExp).toFixed(1)}°F Cooler`,
                shade: `${(matShade - baseShade).toFixed(1)}°F Cooler Shade`,
                albedo: `+${(matAlbedo - baseAlbedo).toFixed(2)} Cooler`,
                soil: `+${(matSoil - baseSoil).toFixed(1)}% More Moisture`,
                bio: `+${matBio - baseBio} More Species`,
                trees: `+${survivingNew} New Trees`
            }
        };
    }

    function renderPrePostTable(stages, activePhase) {
        if (!prePostTableBody || !stages) return;
        const rows = [
            { label: "🌳 Schoolyard Covered in Shade (%)", key: "canopy" },
            { label: "🌴 Total Campus Trees", key: "trees" },
            { label: "🌡️ Afternoon Outdoor Air Temp", key: "air" },
            { label: "🛣️ Hot Blacktop Temp (In Sun)", key: "exp" },
            { label: "🌲 Ground Temp Under Tree Shade", key: "shade" },
            { label: "☀️ Heat Reflected (Cool Ground Score)", key: "albedo" },
            { label: "💧 Soil Moisture for Tree Roots", key: "soil" },
            { label: "🦋 Birds & Pollinators Spotted", key: "bio" }
        ];

        prePostTableBody.innerHTML = rows.map(r => `
            <tr>
                <td><strong>${r.label}</strong></td>
                <td style="${activePhase === 'baseline' ? 'background:#fef3c7; font-weight:700;' : ''}">${stages.baseline[r.key]}</td>
                <td style="${activePhase === 'post' ? 'background:#e0f2fe; font-weight:700;' : ''}">${stages.post[r.key]}</td>
                <td style="${activePhase === 'projection' ? 'background:#dcfce7; font-weight:700; color:#14532d;' : ''}">${stages.projection[r.key]}</td>
                <td><span class="delta-badge">${stages.deltas[r.key]}</span></td>
            </tr>
        `).join("");
    }

    const ctx = document.getElementById('impactRadarChart').getContext('2d');
    const radarData = {
        labels: [
            'Thermal Comfort',
            'Social Interaction',
            'Physical Activity',
            'Mental Well-being',
            'Eco-Literacy',
            'Air Quality/Asthma Rx'
        ],
        datasets: [{
            label: 'Pre-Planting Baseline (2025)',
            data: [3, 4, 3, 5, 2, 4],
            fill: true,
            backgroundColor: 'rgba(255, 152, 0, 0.2)',
            borderColor: 'rgb(255, 152, 0)',
            pointBackgroundColor: 'rgb(255, 152, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 152, 0)'
        }, {
            label: 'Selected Stage Outcome',
            data: [5, 6, 4.5, 6, 5, 5.5],
            fill: true,
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'rgb(76, 175, 80)',
            pointBackgroundColor: 'rgb(76, 175, 80)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(76, 175, 80)'
        }]
    };

    const myChart = new Chart(ctx, {
        type: 'radar',
        data: radarData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 10,
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    function updateRadarForYear(year) {
        if (slider) slider.value = year;
        if (readout) readout.textContent = year;

        const progressRatio = Math.max(0, Math.min(1, (year - 2025) / (2040 - 2025)));
        const bConfig = radarData.datasets[0].data;
        const tConfig = [8, 9, 7, 8, 9, 8];

        const currentVals = bConfig.map((base, idx) => base + ((tConfig[idx] - base) * progressRatio));
        myChart.data.datasets[1].data = currentVals;
        myChart.data.datasets[1].label = `Stage Target (${year})`;
        myChart.update();

        document.getElementById('valAir').textContent = "-" + Math.round(12 * progressRatio) + "% PM10";
        document.getElementById('valHeat').textContent = "-" + (4.5 * progressRatio).toFixed(1) + "°F";
        document.getElementById('valNoise').textContent = "-" + Math.round(8 * progressRatio) + " dB";
        document.getElementById('valPlay').textContent = "+" + Math.round(45 * progressRatio) + " mins";
        document.getElementById('valEdu').textContent = "+" + Math.round(12 * progressRatio) + "%";
    }

    function updateMetrics(campusObj, phase) {
        if (!campusObj) return;
        const stages = getStageValues(campusObj);
        const s = stages[phase] || stages.post;

        document.getElementById("campusHeader").textContent = `${campusObj.name} (${campusObj.district})`;
        headerTitle.textContent = s.title;

        document.getElementById("valBaselineCanopy").textContent = s.canopy;
        document.getElementById("valAirTemp").textContent = s.air;
        document.getElementById("valSurfaceExposed").textContent = s.exp;
        document.getElementById("valSurfaceShaded").textContent = s.shade;
        document.getElementById("valAlbedo").textContent = s.albedo;
        document.getElementById("valSoil").textContent = s.soil;
        document.getElementById("valBio").textContent = s.bio;
        document.getElementById("valTreeCount").textContent = s.trees;

        if (selectEl && selectEl.value !== phase) {
            selectEl.value = phase;
        }
        lifecycleBtns.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.phase === phase);
        });

        renderPrePostTable(stages, phase);

        if (phase === "baseline") updateRadarForYear(2025);
        else if (phase === "post") updateRadarForYear(2030);
        else updateRadarForYear(2040);
    }

    if (selectEl) {
        selectEl.addEventListener("change", (e) => {
            updateMetrics(campus, e.target.value);
        });
    }

    lifecycleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            updateMetrics(campus, btn.dataset.phase);
        });
    });

    if (slider) {
        slider.addEventListener('input', (e) => {
            updateRadarForYear(parseInt(e.target.value, 10));
        });
    }

    const toggleBtn = document.getElementById("toggleAcademicBtn");
    const acadGrid = document.getElementById("academicGrid");
    const acadHead = document.getElementById("academicHeader");
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = acadGrid.style.display === "none";
            acadGrid.style.display = isHidden ? "grid" : "none";
            acadHead.style.display = isHidden ? "block" : "none";
            toggleBtn.textContent = isHidden ? "Hide Academic/i-Tree Forecasts" : "Show Academic/i-Tree Forecasts";
        });
    }

    // Initialize with Post-Planting (or Baseline)
    updateMetrics(campus, "post");
});
