document.addEventListener('DOMContentLoaded', () => {
    const mapArea = document.getElementById('mapArea');
    const rosterGrid = document.getElementById('rosterGrid');
    const claimedTreesEl = document.getElementById('claimedTrees');

    const TOTAL_TREES = 150;
    
    // Families and Classrooms for simulation
    const families = ["The Garcia Family", "The Martinez Family", "The Johnson Family", "The Rodriguez Family", "The Smith Family", "The Lee Family", "The Treviño Family", "The Hernandez Family"];
    const classrooms = ["Mrs. Ramirez's 4th Grade", "Mr. Clark's 5th Grade", "Kindergarten Rockets", "Coach T's PE Class", "Ms. Gonzalez's 3rd Grade"];
    const clubs = ["Science Club", "Student Council", "Art Club"];
    const claimers = [...families, ...classrooms, ...clubs];
    
    // Mad-lib names
    const adjectives = ["Brave", "Wise", "Gentle", "Mighty", "Joyful", "Ancient", "Dancing", "Sunlit", "Noble", "Sturdy"];
    const nouns = ["Sapling", "Giant", "Guardian", "Wanderer", "Friend", "Hero", "Sentinel", "Sprout"];
    
    const speciesList = ["Cedar Elm", "Texas Red Oak", "Live Oak", "Pecan", "Honey Mesquite", "Mexican Sycamore"];

    let treesData = [];
    let activeTreeId = null;
    let claimedCount = 0;

    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateTreeData() {
        for (let i = 1; i <= TOTAL_TREES; i++) {
            const isClaimed = Math.random() < 0.35; // ~35% claimed
            if (isClaimed) claimedCount++;
            
            let name = isClaimed ? `The ${getRandom(adjectives)} ${getRandom(nouns)}` : `Tree #${i}`;
            let claimer = isClaimed ? getRandom(claimers) : null;
            let species = getRandom(speciesList);
            
            // Random position in the map area (padding 5% from edges)
            let top = 5 + (Math.random() * 90);
            let left = 5 + (Math.random() * 90);
            
            // Assign a random emoji for the image
            let imageEmoji = getRandom(["🌳", "🌲", "🌴", "🪴", "🍃"]);

            treesData.push({
                id: i,
                isClaimed: isClaimed,
                name: name,
                claimer: claimer,
                species: species,
                top: top,
                left: left,
                imageEmoji: imageEmoji
            });
        }
        
        claimedTreesEl.textContent = claimedCount;
    }

    function renderMap() {
        treesData.forEach(tree => {
            const pin = document.createElement('div');
            pin.className = `tree-pin ${tree.isClaimed ? 'claimed' : 'available'}`;
            pin.id = `pin-${tree.id}`;
            pin.style.top = `${tree.top}%`;
            pin.style.left = `${tree.left}%`;
            pin.title = tree.name;
            
            // Z-index based on Y position (pseudo-3D sorting)
            pin.style.zIndex = Math.floor(tree.top);
            
            pin.addEventListener('click', () => {
                activateTree(tree.id);
                // Scroll gallery to this tree
                const card = document.getElementById(`card-${tree.id}`);
                if(card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            
            mapArea.appendChild(pin);
        });
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
            });
            
            rosterGrid.appendChild(card);
        });
    }

    function activateTree(id) {
        if (activeTreeId) {
            const oldPin = document.getElementById(`pin-${activeTreeId}`);
            const oldCard = document.getElementById(`card-${activeTreeId}`);
            if(oldPin) oldPin.classList.remove('active');
            if(oldCard) oldCard.classList.remove('active');
        }
        
        activeTreeId = id;
        
        const newPin = document.getElementById(`pin-${activeTreeId}`);
        const newCard = document.getElementById(`card-${activeTreeId}`);
        if(newPin) newPin.classList.add('active');
        if(newCard) newCard.classList.add('active');
    }

    // Initialize
    generateTreeData();
    renderMap();
    renderGallery();
});
