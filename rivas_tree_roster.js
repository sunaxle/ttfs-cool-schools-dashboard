document.addEventListener('DOMContentLoaded', async () => {
    const rosterGrid = document.getElementById('rosterGrid');
    const claimedTreesEl = document.getElementById('claimedTrees');
    const totalTreesEl = document.getElementById('totalTrees');

    // Initialize Map
    // Coordinates for Donna Rivas Elementary
    const map = L.map('mapArea').setView([26.1668, -98.0705], 18);

    // Google Satellite Basemap
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map);

    // Families and Classrooms for simulation
    const families = ["The Garcia Family", "The Martinez Family", "The Johnson Family", "The Rodriguez Family", "The Smith Family", "The Lee Family", "The Treviño Family", "The Hernandez Family"];
    const classrooms = ["Mrs. Ramirez's 4th Grade", "Mr. Clark's 5th Grade", "Kindergarten Rockets", "Coach T's PE Class", "Ms. Gonzalez's 3rd Grade"];
    const clubs = ["Science Club", "Student Council", "Art Club"];
    const claimers = [...families, ...classrooms, ...clubs];
    
    // Mad-lib names
    const adjectives = ["Brave", "Wise", "Gentle", "Mighty", "Joyful", "Ancient", "Dancing", "Sunlit", "Noble", "Sturdy"];
    const nouns = ["Sapling", "Giant", "Guardian", "Wanderer", "Friend", "Hero", "Sentinel", "Sprout"];

    let treesData = [];
    let activeTreeId = null;
    let claimedCount = 0;
    
    // Markers dictionary for clicking
    const markers = {};

    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    try {
        // Load campus zones (boundary, buildings, etc.)
        const zonesRes = await fetch('data/jason_m_rivas_zones.json');
        const zonesGeoJSON = await zonesRes.json();
        
        L.geoJSON(zonesGeoJSON, {
            style: function(feature) {
                switch(feature.properties.category) {
                    case 'Campus Boundary': return { color: '#ffcc00', weight: 3, fillOpacity: 0 };
                    case 'Rooftop': return { color: '#ffffff', weight: 1, fillColor: '#ffffff', fillOpacity: 0.2 };
                    case 'Open Field': return { color: '#66bb6a', weight: 1, fillOpacity: 0.1 };
                    case 'Parking Lot': return { color: '#9e9e9e', weight: 1, fillOpacity: 0.3 };
                    default: return { color: '#3388ff' };
                }
            }
        }).addTo(map);

        // Load actual trees
        const treesRes = await fetch('data/mock_trees.json');
        const treesGeoJSON = await treesRes.json();
        
        // Filter to Rivas trees (though they should all be Rivas in this mock, just to be safe)
        const rivasTrees = treesGeoJSON.features;
        totalTreesEl.textContent = rivasTrees.length;

        // Process trees
        rivasTrees.forEach((feature, index) => {
            const id = feature.properties.id || (index + 1);
            const species = feature.properties.species || "Unknown Species";
            
            const isClaimed = Math.random() < 0.35; // ~35% claimed
            if (isClaimed) claimedCount++;
            
            let name = isClaimed ? `The ${getRandom(adjectives)} ${getRandom(nouns)}` : `Tree #${id}`;
            let claimer = isClaimed ? getRandom(claimers) : null;
            let imageEmoji = getRandom(["🌳", "🌲", "🌴", "🪴", "🍃"]);

            const treeObj = {
                id: id,
                isClaimed: isClaimed,
                name: name,
                claimer: claimer,
                species: species,
                imageEmoji: imageEmoji,
                latlng: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
            };
            treesData.push(treeObj);

            // Create Leaflet CircleMarker
            const markerColor = isClaimed ? '#a3e635' : '#ffffff';
            const marker = L.circleMarker(treeObj.latlng, {
                radius: 6,
                fillColor: markerColor,
                color: isClaimed ? '#ffffff' : '#2b5f3a',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(map);

            marker.bindTooltip(`<b>${treeObj.name}</b><br>${treeObj.species}`);
            
            marker.on('click', () => {
                activateTree(treeObj.id);
                const card = document.getElementById(`card-${treeObj.id}`);
                if(card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            markers[treeObj.id] = marker;
        });

        claimedTreesEl.textContent = claimedCount;
        renderGallery();

    } catch(err) {
        console.error("Error loading GeoJSON data:", err);
    }

    function renderGallery() {
        treesData.forEach(tree => {
            const card = document.createElement('div');
            card.className = 'tree-card';
            card.id = `card-${tree.id}`;
            
            let claimHtml = '';
            if (tree.isClaimed) {
                let icon = tree.claimer.includes('Family') ? '👨‍👩‍👧‍👦' : '🎒';
                claimHtml = `
                    <div class="claim-status">
                        <span class="claimed-by-icon">${icon}</span> Claimed by:<br/>
                        <span class="claimed-by">${tree.claimer}</span>
                    </div>
                `;
            } else {
                claimHtml = `
                    <div class="claim-status" style="text-align: center;">
                        <a href="tree_portal.html" class="btn-claim">Claim this Tree</a>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="card-img-placeholder">${tree.imageEmoji}</div>
                <div class="card-content">
                    <h3 class="tree-name">${tree.name}</h3>
                    <div class="tree-species">${tree.species} • ID: ${tree.id}</div>
                    ${claimHtml}
                </div>
            `;
            
            card.addEventListener('click', () => {
                activateTree(tree.id);
                map.flyTo(tree.latlng, 20, { duration: 0.5 });
            });
            
            rosterGrid.appendChild(card);
        });
    }

    function activateTree(id) {
        if (activeTreeId) {
            const oldCard = document.getElementById(`card-${activeTreeId}`);
            if(oldCard) oldCard.classList.remove('active');
            
            const oldMarker = markers[activeTreeId];
            if(oldMarker) {
                oldMarker.setStyle({ weight: 2, radius: 6 });
            }
        }
        
        activeTreeId = id;
        
        const newCard = document.getElementById(`card-${activeTreeId}`);
        if(newCard) newCard.classList.add('active');
        
        const newMarker = markers[activeTreeId];
        if(newMarker) {
            newMarker.setStyle({ weight: 4, radius: 8, color: '#ffeb3b' });
            newMarker.bringToFront();
        }
    }
});
