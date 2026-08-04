document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG;
    const tabs = document.querySelectorAll('.tab-btn');
    const content = document.getElementById('speciesContent');
    let speciesData = null;

    // Fetch the mock data (pulled from iNaturalist)
    fetch('data/mock_biodiversity.json')
        .then(response => response.json())
        .then(data => {
            speciesData = data;
            renderCategory('birds'); // Render birds by default
        })
        .catch(err => {
            console.error("Failed to load biodiversity data:", err);
            if (content) content.innerHTML = '<div class="empty-state">Error loading species data.</div>';
        });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab styling
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Render selected category
            const category = tab.dataset.tab;
            renderCategory(category);
        });
    });

    /**
     * Renders biodiversity species cards for a selected category (e.g., birds, plants, insects).
     * @param {string} category - The biological category to filter and render data for.
     */
    function renderCategory(category) {
        if (!content) return;
        if (!speciesData || !speciesData[category]) {
            content.innerHTML = '<div class="empty-state">No species observations found for this category.</div>';
            return;
        }

        const items = speciesData[category];
        content.innerHTML = '';

        if (items.length === 0) {
            content.innerHTML = '<div class="empty-state">No observations found for this category.</div>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'species-card';

            const imgHtml = item.image_url
                ? `<div class="species-img" style="background-image: url('${item.image_url}')"></div>`
                : `<div class="species-img" style="background: #e8e8e8; color: #999;">No Photo</div>`;

            card.innerHTML = `
                ${imgHtml}
                <div class="species-info">
                    <h4>${item.common_name || item.scientific_name}</h4>
                    <p class="scientific">${item.scientific_name || 'Unknown species'}</p>
                    <div class="observations-badge">${item.observations} Observations</div>
                </div>
            `;

            content.appendChild(card);
        });
    }

    // --- ArcGIS Map Integration ---
    if (window.require) {
        window.require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/Point",
            "esri/geometry/geometryEngine",
            "esri/widgets/BasemapToggle"
        ], function (Map, MapView, GraphicsLayer, Graphic, Polygon, Point, geometryEngine, BasemapToggle) {

            const DEFAULT_CENTER = [-98.0706, 26.1670]; // Center of Donna ISD campus
            const activeLng = parseFloat(localStorage.getItem("activeCampusLng"));
            const activeLat = parseFloat(localStorage.getItem("activeCampusLat"));
            
            let mapCenter = (!isNaN(activeLng) && !isNaN(activeLat) && activeLat > 25.5 && activeLat < 27.5) 
                ? [activeLng, activeLat] 
                : DEFAULT_CENTER;

            const map = new Map({ basemap: config?.map?.basemap || "hybrid" });

            const view = new MapView({
                container: "bioMap",
                map: map,
                center: mapCenter,
                zoom: 17.5,
                constraints: {
                    minZoom: 15,
                    maxZoom: 20
                }
            });

            const basemapToggle = new BasemapToggle({
                view,
                nextBasemap: "streets-vector"
            });
            view.ui.add(basemapToggle, "top-right");

            // Campus boundary rendering
            const boundaryLayer = new GraphicsLayer({ title: "Campus Boundaries" });
            map.add(boundaryLayer);

            fetch("data/campus_boundary.json")
                .then(res => res.json())
                .then(data => {
                    if (!data.features || !data.features[0]) return;
                    const coords = data.features[0].geometry.coordinates[0];

                    const polygon = new Polygon({ rings: coords });
                    const boundaryGraphic = new Graphic({
                        geometry: polygon,
                        symbol: {
                            type: "simple-fill",
                            color: [0, 0, 0, 0],
                            outline: { color: [255, 255, 0, 1], width: 3 }
                        }
                    });
                    boundaryLayer.add(boundaryGraphic);

                    const bufferPolygon = geometryEngine.geodesicBuffer(polygon.extent.center, 500, "meters");
                    const bufferGraphic = new Graphic({
                        geometry: bufferPolygon,
                        symbol: {
                            type: "simple-fill",
                            color: [255, 165, 0, 0.1],
                            outline: { color: [255, 165, 0, 0.8], width: 2, style: "dash" }
                        }
                    });
                    boundaryLayer.add(bufferGraphic);
                })
                .catch(err => console.error("Error loading boundary:", err));

            // Observation point rendering
            const obsLayer = new GraphicsLayer({ title: "Biodiversity Observations" });
            map.add(obsLayer);

            const categoryColors = {
                "birds": [33, 150, 243, 0.95],     // Vibrant Blue
                "plants": [76, 175, 80, 0.95],     // Vibrant Green
                "insects": [255, 152, 0, 0.95]     // Vibrant Orange
            };

            fetch("data/mock_observations.json")
                .then(res => res.json())
                .then(data => {
                    if (!data.features) return;

                    data.features.forEach(feature => {
                        const props = feature.properties;
                        const coords = feature.geometry.coordinates;

                        const point = new Point({
                            longitude: coords[0],
                            latitude: coords[1]
                        });

                        let content = `<p><i>${props.scientific_name}</i></p>`;
                        content += `<p>Total Campus Observations: <b>${props.observations}</b></p>`;
                        if (props.image_url) {
                            content += `<img src="${props.image_url}" style="width:100%; max-height:150px; object-fit:cover; border-radius:4px; margin-top:8px;" />`;
                        }

                        const graphic = new Graphic({
                            geometry: point,
                            symbol: {
                                type: "simple-marker",
                                style: "circle",
                                color: categoryColors[props.category] || [156, 39, 176, 0.95],
                                size: "14px",
                                outline: { color: [255, 255, 255, 1], width: 2 }
                            },
                            attributes: props,
                            popupTemplate: {
                                title: `${props.category.toUpperCase()}: ${props.common_name}`,
                                content: content
                            }
                        });

                        obsLayer.add(graphic);
                    });
                })
                .catch(err => console.error("Error loading observations:", err));
        });
    }

    const syncBtn = document.getElementById("syncBiodiversityBtn");
    if (syncBtn) {
        syncBtn.addEventListener('click', () => {
            const originalText = syncBtn.innerHTML;
            syncBtn.textContent = "Syncing...";
            syncBtn.style.backgroundColor = "#4CAF50";
            syncBtn.style.color = "white";
            setTimeout(() => {
                syncBtn.textContent = "Synced!";
                setTimeout(() => {
                    syncBtn.innerHTML = originalText;
                    syncBtn.style.backgroundColor = "";
                    syncBtn.style.color = "";
                }, 2000);
            }, 1500);
        });
    }
});
