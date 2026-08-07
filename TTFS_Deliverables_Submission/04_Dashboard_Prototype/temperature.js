(function () {
    const config = window.APP_CONFIG;
    const timeSlider = document.getElementById("timeSlider");
    const timeReadout = document.getElementById("timeReadout");
    const ambientTempValue = document.getElementById("ambientTempValue");
    const surfaceTempValue = document.getElementById("surfaceTempValue");
    const outdoorDaysValue = document.getElementById("outdoorDaysValue");

    // Global reference for heat zone update function
    let updateHeatZonesFunction = null;

    /**
     * Updates the summary UI based on the time slider, adjusting simulated
     * temperature and comfort score based on the hour of the day.
     */
    function updateSummary() {
        let hour = Number(timeSlider.value);
        let ampm = hour >= 12 ? 'PM' : 'AM';
        let displayHour = hour % 12;
        displayHour = displayHour ? displayHour : 12; // the hour '0' should be '12'
        timeReadout.textContent = `${displayHour}:00 ${ampm}`;

        // Mock simulation logic for side panel
        let surfaceTemp = 80 + ((hour - 8) * 5);
        if (hour > 14) surfaceTemp = surfaceTemp - ((hour - 14) * 3);
        
        let ambientTemp = 75 + ((hour - 8) * 2);
        if (hour > 15) ambientTemp = ambientTemp - ((hour - 15) * 1);

        if (surfaceTempValue) {
            surfaceTempValue.innerHTML = `${surfaceTemp} &deg;F`;
            if (surfaceTemp >= 95) surfaceTempValue.style.color = '#d9534f'; // Danger Red
            else surfaceTempValue.style.color = 'var(--green)';
        }
        if (ambientTempValue) {
            ambientTempValue.innerHTML = `${ambientTemp} &deg;F`;
        }

        // Update map graphics if ready
        if (updateHeatZonesFunction) {
            updateHeatZonesFunction(hour);
        }
    }

    timeSlider.addEventListener("input", updateSummary);

    window.require(
        [
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/geometryEngine",
            "esri/widgets/BasemapToggle",
            "esri/widgets/Zoom",
            "esri/symbols/SimpleFillSymbol"
        ],
        (Map, MapView, GraphicsLayer, Graphic, Polygon, geometryEngine, BasemapToggle, Zoom, SimpleFillSymbol) => {
            const campusName = localStorage.getItem("activeCampusName") || "J.W. Caceres & M. Rivas Academy";
            let activeLng = parseFloat(localStorage.getItem("activeCampusLng"));
            let activeLat = parseFloat(localStorage.getItem("activeCampusLat"));
            let mapCenter = !isNaN(activeLng) && !isNaN(activeLat) ? [activeLng, activeLat] : (config?.map?.center || [-98.0520, 26.1704]);

            // Create map
            const map = new Map({ basemap: config?.map?.basemap || "satellite" });

            const view = new MapView({
                container: "temperatureMap",
                map,
                center: mapCenter,
                zoom: config?.map?.zoom || 17,
                constraints: {
                    minZoom: config?.map?.minZoom || 16,
                    maxZoom: config?.map?.maxZoom || 19
                }
            });

            // Boundary Layer
            const boundaryLayer = new GraphicsLayer({ title: "Campus Boundaries & 500m Buffer" });
            map.add(boundaryLayer);

            // Heat Zones Layer
            const heatZonesLayer = new GraphicsLayer({ title: "Zone Heat Map", opacity: 0.6 });
            map.add(heatZonesLayer);

            // Fetch and draw boundary
            fetch("data/campus_boundary.json")
                .then(response => response.json())
                .then(data => {
                    if (!data.features[0]) return;
                    const coords = data.features[0].geometry.coordinates[0];
                    const polygon = new Polygon({ rings: coords });
                    
                    const boundaryGraphic = new Graphic({
                        geometry: polygon,
                        symbol: { type: "simple-fill", color: [0, 0, 0, 0], outline: { color: [255, 255, 0, 1], width: 3 } }
                    });
                    boundaryLayer.add(boundaryGraphic);

                    const bufferPolygon = geometryEngine.geodesicBuffer(polygon.extent.center, 500, "meters");
                    const bufferGraphic = new Graphic({
                        geometry: bufferPolygon,
                        symbol: { type: "simple-fill", color: [255, 165, 0, 0.1], outline: { color: [255, 165, 0, 0.8], width: 2, style: "dash" } }
                    });
                    boundaryLayer.add(bufferGraphic);
                });

            // Load drawn zones from localStorage OR inject mock fallback data
            let zoneGraphics = [];
            
            function processZones(zonesData) {
                zonesData.forEach(z => {
                    if (z.geometry && z.geometry.rings) {
                        const p = new Polygon({ rings: z.geometry.rings, spatialReference: z.geometry.spatialReference || { wkid: 4326 } });
                        const cat = (z.attributes && z.attributes.ZoneCategory) || "Open Land";
                        
                        // Don't render the 'Campus Boundary' as a heat zone, it overlaps everything
                        if (cat === "Campus Boundary") return;
                        
                        const g = new Graphic({
                            geometry: p,
                            attributes: { ZoneCategory: cat, CurrentTemp: 75 },
                            popupTemplate: {
                                title: "{ZoneCategory}",
                                content: "<div style='font-size:16px;'><b>Current Temp:</b> {CurrentTemp}&deg;F</div>"
                            },
                            symbol: new SimpleFillSymbol({ color: [0,0,0,0], outline: { color: [255,255,255,0.5], width: 1 } })
                        });
                        g.uidOffset = zoneGraphics.length; // Used for pseudo-random temp variance
                        zoneGraphics.push(g);
                        heatZonesLayer.add(g);
                    }
                });
                
                // Recenter if needed
                if (zonesData.length > 0) {
                    let x = zonesData[0].geometry.rings[0][0][0];
                    let y = zonesData[0].geometry.rings[0][0][1];
                    if (Math.abs(x) > 180) { 
                        const lon = (x / 20037508.34) * 180;
                        const lat = (Math.atan(Math.exp((y / 20037508.34) * Math.PI)) * 360 / Math.PI) - 90;
                        view.center = [lon, lat];
                    } else {
                        view.center = [x, y];
                    }
                }
                
                updateSummary(); // Trigger coloring after load
            }

            try {
                let savedZones = localStorage.getItem(`zones_${campusName}`);
                let zones = [];
                if (savedZones) {
                    zones = JSON.parse(savedZones);
                } 
                
                if (zones.length > 0) {
                    processZones(zones);
                } else {
                    // Fallback to real campus zones mapped out for this school
                    fetch("data/campus_zones.json")
                        .then(res => res.json())
                        .then(data => {
                            if (!data.features) return;
                            let formattedZones = data.features.map(f => {
                                return {
                                    attributes: { ZoneCategory: f.properties.category },
                                    geometry: { rings: f.geometry.coordinates }
                                };
                            });
                            processZones(formattedZones);
                        });
                }
            } catch (e) { console.error("Could not parse zones", e) }

            // Heat Algorithm
            function calculateZoneColor(category, hour, idOffset = 0) {
                // Determine base temp and solar multiplier based on category
                let baseTemp = 75;
                let solarMultiplier = 1.0;
                
                if (category.includes("Parking") || category.includes("Asphalt")) { baseTemp = 82; solarMultiplier = 3.5; }
                else if (category.includes("Roof") || category.includes("Building")) { baseTemp = 78; solarMultiplier = 3.0; }
                else if (category.includes("Courtyard")) { baseTemp = 72; solarMultiplier = 2.0; }
                else if (category.includes("Open Land")) { baseTemp = 68; solarMultiplier = 2.5; }
                else if (category.includes("Tree") || category.includes("Grass")) { baseTemp = 65; solarMultiplier = 1.0; }
                
                // Add diurnal swing based on time of day (peaks at 15:00 / 3 PM)
                let solarLoad = 0;
                if (hour >= 8 && hour <= 18) {
                    // Sine wave mapping 8am to 6pm
                    solarLoad = Math.sin((hour - 8) / 10 * Math.PI) * 10 * solarMultiplier; 
                }
                
                // Add slight pseudo-random variance based on idOffset so multiple zones of the same category aren't exactly the same
                let variance = (Math.sin(idOffset * 10) * 3); 
                
                let currentTemp = Math.round(baseTemp + solarLoad + variance);
                
                // Map temp to a color scale [R,G,B,A]
                let r=0, g=0, b=0, a=0.7;
                if (currentTemp < 78) { r=44; g=123; b=182; } // Cool Blue
                else if (currentTemp < 88) { r=171; g=217; b=233; } // Light Blue
                else if (currentTemp < 95) { r=255; g=255; b=191; } // Yellow
                else if (currentTemp < 105) { r=253; g=174; b=97; } // Orange
                else { r=215; g=25; b=28; } // Red Hot
                
                return { color: [r, g, b, a], temp: currentTemp };
            }updateHeatZonesFunction = function(hour) {
                heatZonesLayer.removeAll();
                zoneGraphics.forEach(g => {
                    const result = calculateZoneColor(g.attributes.ZoneCategory, hour, g.uidOffset || 0);
                    g.attributes.CurrentTemp = result.temp;
                    g.symbol = new SimpleFillSymbol({
                        color: result.color,
                        outline: { color: [255,255,255,0.5], width: 1 }
                    });
                });
                heatZonesLayer.addMany(zoneGraphics);
            };

            // Wait a moment for ArcGIS to finish initial rendering, then run update
            setTimeout(updateSummary, 500);

            const basemapToggle = new BasemapToggle({ view, nextBasemap: "streets-vector" });
            view.ui.add(basemapToggle, "top-right");
            const zoomWidget = new Zoom({ view });
            view.ui.add(zoomWidget, "top-right");
        }
    );
})();
