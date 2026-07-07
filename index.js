document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById("exportReportBtn");
    if(exportBtn) {
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

    // Find specific campus data
    const campus = typeof projectCampuses !== 'undefined' ? projectCampuses.find(c => c.id === campusId) : null;

    const selectEl = document.getElementById("timelinePhaseSelect");
    const headerTitle = document.getElementById("metricsHeaderTitle");
    
    function updateMetrics(campus, phase) {
        if (!campus) {
            headerTitle.textContent = "Contract Baseline Metrics (Before TTFS Tree Planting)";
            return;
        }

        document.getElementById("campusHeader").textContent = campus.name;
        
        if (phase === "baseline") {
            headerTitle.textContent = "Contract Baseline Metrics (Before TTFS Tree Planting)";
            document.getElementById("valBaselineCanopy").textContent = campus.canopy.baselinePercent + "%";
            document.getElementById("valAirTemp").textContent = "Pending Data";
            document.getElementById("valSurfaceExposed").textContent = "Pending Data";
            document.getElementById("valSurfaceShaded").textContent = "Pending Data";
            document.getElementById("valAlbedo").textContent = "Pending Data";
            document.getElementById("valSoil").textContent = "Pending Data";
            document.getElementById("valBio").textContent = "Pending Data";
            document.getElementById("valTreeCount").textContent = "0";
        } else if (phase === "post") {
            headerTitle.textContent = "Contract Baseline Metrics (Post Tree Planting)";
            document.getElementById("valBaselineCanopy").textContent = campus.canopy.baselinePercent + "%";
            document.getElementById("valAirTemp").textContent = campus.metrics.airTemp + "°F";
            document.getElementById("valSurfaceExposed").textContent = campus.metrics.surfaceTempExposed + "°F";
            document.getElementById("valSurfaceShaded").textContent = campus.metrics.surfaceTempShaded + "°F";
            document.getElementById("valAlbedo").textContent = campus.metrics.albedo;
            document.getElementById("valSoil").textContent = campus.metrics.soilMoisture + "%";
            document.getElementById("valBio").textContent = campus.metrics.biodiversityCount;
            document.getElementById("valTreeCount").textContent = campus.metrics.treeCount;
        } else if (phase === "projection") {
            headerTitle.textContent = "Contract Baseline Metrics (10-Year Projection)";
            document.getElementById("valBaselineCanopy").textContent = campus.canopy.targetPercent + "%";
            document.getElementById("valAirTemp").textContent = (parseFloat(campus.metrics.airTemp) - 4.5).toFixed(1) + "°F";
            document.getElementById("valSurfaceExposed").textContent = (parseFloat(campus.metrics.surfaceTempExposed) - 5).toFixed(1) + "°F";
            document.getElementById("valSurfaceShaded").textContent = (parseFloat(campus.metrics.surfaceTempShaded) - 8).toFixed(1) + "°F";
            document.getElementById("valAlbedo").textContent = (parseFloat(campus.metrics.albedo) + 0.1).toFixed(2);
            document.getElementById("valSoil").textContent = (parseFloat(campus.metrics.soilMoisture) + 12.5).toFixed(1) + "%";
            document.getElementById("valBio").textContent = parseInt(campus.metrics.biodiversityCount) + 55;
            document.getElementById("valTreeCount").textContent = campus.metrics.treeCount;
        }
    }

    if (selectEl) {
        selectEl.addEventListener("change", (e) => {
            updateMetrics(campus, e.target.value);
        });
    }

    // Initialize with default (baseline)
    updateMetrics(campus, "baseline");

    // Toggle Academic Grid
    const toggleBtn = document.getElementById("toggleAcademicBtn");
    const acadGrid = document.getElementById("academicGrid");
    const acadHead = document.getElementById("academicHeader");
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = acadGrid.style.display === "none";
            acadGrid.style.display = isHidden ? "grid" : "none";
            acadHead.style.display = isHidden ? "block" : "none";
            toggleBtn.textContent = isHidden ? "Hide Academic/i-Tree Forecasts" : "Show Academic/i-Tree Forecasts";
        });
    }

    const ctx = document.getElementById('impactRadarChart').getContext('2d');

    // Initial Data for 2040 (Max Impact)
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
            label: 'Pre-Intervention Baseline (2025)',
            data: [3, 4, 3, 5, 2, 4],
            fill: true,
            backgroundColor: 'rgba(255, 152, 0, 0.2)',
            borderColor: 'rgb(255, 152, 0)',
            pointBackgroundColor: 'rgb(255, 152, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 152, 0)'
        }, {
            label: 'Projected Target (2040)',
            data: [8, 9, 7, 8, 9, 8],
            fill: true,
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'rgb(76, 175, 80)',
            pointBackgroundColor: 'rgb(76, 175, 80)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(76, 175, 80)'
        }]
    };

    const config = {
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
    };

    const myChart = new Chart(ctx, config);

    // Slider Logic to animate the radar
    const slider = document.getElementById('yearSlider');
    const readout = document.getElementById('yearReadout');

    slider.addEventListener('input', (e) => {
        const year = parseInt(e.target.value);
        readout.textContent = year;

        // Simple linear interpolation for the demo
        let progressRatio = (year - 2025) / (2040 - 2025);

        let bConfig = radarData.datasets[0].data; // Baseline
        let tConfig = [8, 9, 7, 8, 9, 8]; // True Targets

        let currentVals = bConfig.map((base, idx) => {
            return base + ((tConfig[idx] - base) * progressRatio);
        });

        myChart.data.datasets[1].data = currentVals;
        myChart.data.datasets[1].label = `Projected Target (${year})`;
        myChart.update();

        // Update Bolund & Hunhammar Ecosystem Metrics
        document.getElementById('valAir').textContent = "-" + Math.round(12 * progressRatio) + "% PM10";
        document.getElementById('valHeat').textContent = "-" + (4.5 * progressRatio).toFixed(1) + "°F";
        document.getElementById('valNoise').textContent = "-" + Math.round(8 * progressRatio) + " dB";
        document.getElementById('valPlay').textContent = "+" + Math.round(45 * progressRatio) + " mins";
        document.getElementById('valEdu').textContent = "+" + Math.round(12 * progressRatio) + "%";
    });
});
