// Data
const campuses = [
    { name: "Edinburg North High", coords: [26.3267, -98.1633], canopy: 12, asphalt: 68, students: 2400 },
    { name: "Bowie Elementary", coords: [26.1947, -98.1836], canopy: 3, asphalt: 82, students: 650 },
    { name: "Memorial Middle", coords: [26.2158, -98.3252], canopy: 8, asphalt: 71, students: 850 },
    { name: "Weslaco East High", coords: [26.1600, -97.9710], canopy: 27, asphalt: 55, students: 1900 },
    { name: "PSJA Early College", coords: [26.1833, -98.1500], canopy: 18, asphalt: 60, students: 1800 }
];

// Initialize Map
const map = L.map('premium-map', {
    zoomControl: false // Custom controls look better
}).setView([26.23, -98.12], 11);

// Move zoom control to top right
L.control.zoom({ position: 'topright' }).addTo(map);

// Premium Dark Basemap (CartoDB Dark Matter)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Color Logic
function getRiskColor(canopy) {
    if (canopy < 5) return '#ef4444'; // Crit
    if (canopy < 15) return '#f97316'; // High
    if (canopy < 25) return '#eab308'; // Mod
    return '#10b981'; // Safe
}

function getRiskClass(canopy) {
    if (canopy < 5) return 'crit';
    if (canopy < 15) return 'high';
    if (canopy < 25) return 'mod';
    return 'safe';
}

// Render 1-Meter Polygon Grids from GeoJSON
const geojsonUrl = window.APP_CONFIG.layers.schoolAreas.url;

if (geojsonUrl) {
    fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
            const gridLayer = L.geoJSON(data, {
                style: function (feature) {
                    const surface = feature.properties.surface_class;
                    let color = '#eab308'; // Default grass
                    if (surface === 'Canopy') color = '#10b981';
                    if (surface === 'Asphalt/Concrete') color = '#ef4444';
                    
                    return {
                        color: color,
                        weight: 1,
                        fillOpacity: 0.5,
                        opacity: 0.8
                    };
                },
                onEachFeature: function (feature, layer) {
                    const props = feature.properties;
                    const surface = props.surface_class;
                    let color = '#eab308';
                    if (surface === 'Canopy') color = '#10b981';
                    if (surface === 'Asphalt/Concrete') color = '#ef4444';
                    
                    const popupHtml = `
                        <div class="custom-popup">
                            <h4>${props.campus_id.toUpperCase()} Grid Cell</h4>
                            <div class="p-row">
                                <span>Classification:</span>
                                <span style="color:${color}; font-weight:bold;">${surface}</span>
                            </div>
                            <div class="p-row">
                                <span>Surface Temp Est:</span>
                                <span style="color:#f8fafc">${props.estimated_temp_f}°F</span>
                            </div>
                        </div>
                    `;
                    layer.bindPopup(popupHtml, { closeButton: false, offset: [0, -10] });
                    layer.on('mouseover', function() { 
                        this.setStyle({ fillOpacity: 0.8, weight: 2 });
                        this.openPopup(); 
                    });
                    layer.on('mouseout', function() { 
                        this.setStyle({ fillOpacity: 0.5, weight: 1 });
                        this.closePopup(); 
                    });
                }
            }).addTo(map);
            
            // Zoom to the bounds of the loaded GeoJSON
            map.fitBounds(gridLayer.getBounds());
        })
        .catch(err => console.error("Failed to load grid geojson:", err));
}

// Add a global CSS animation for the markers dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes pulse {
        0% { transform: scale(1); filter: brightness(1); }
        100% { transform: scale(1.15); filter: brightness(1.2); }
    }
`;
document.head.appendChild(style);

// Initialize Chart.js
const ctx = document.getElementById('canopyChart').getContext('2d');
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Outfit', sans-serif";

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: campuses.map(c => c.name.split(' ')[0]), // Short names
        datasets: [
            {
                label: 'Canopy %',
                data: campuses.map(c => c.canopy),
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderRadius: 4
            },
            {
                label: 'Asphalt %',
                data: campuses.map(c => c.asphalt),
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(255,255,255,0.05)' },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                border: { display: false }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        }
    }
});
