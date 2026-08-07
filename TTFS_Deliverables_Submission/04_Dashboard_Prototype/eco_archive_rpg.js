document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('map-viewport');
    const map = document.getElementById('rpg-map');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDesc = document.getElementById('modal-desc');
    const modalLink = document.getElementById('modal-link');
    const modalIcon = document.getElementById('modal-icon');

    // Pan state
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    // Start zoomed into the middle-ish
    let translateX = -1500; 
    let translateY = -1000;

    // Apply initial transform
    updateMapTransform();

    // Map boundaries (approximate based on map and viewport size)
    const mapWidth = 4000;
    const mapHeight = 3000;

    viewport.addEventListener('mousedown', (e) => {
        // Only drag if left click and not clicking on a UI element
        if (e.button !== 0 || e.target.closest('.map-node')) return;
        
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        e.preventDefault(); // Prevent text selection
        
        // Calculate new translations
        let newX = e.clientX - startX;
        let newY = e.clientY - startY;

        // Optional: Clamp to boundaries
        const minX = viewport.clientWidth - mapWidth;
        const minY = viewport.clientHeight - mapHeight;

        translateX = Math.min(0, Math.max(minX, newX));
        translateY = Math.min(0, Math.max(minY, newY));

        updateMapTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Handle touch events for mobile/tablets
    viewport.addEventListener('touchstart', (e) => {
        if (e.target.closest('.map-node')) return;
        const touch = e.touches[0];
        isDragging = true;
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
    }, {passive: true});

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        
        let newX = touch.clientX - startX;
        let newY = touch.clientY - startY;

        const minX = viewport.clientWidth - mapWidth;
        const minY = viewport.clientHeight - mapHeight;

        translateX = Math.min(0, Math.max(minX, newX));
        translateY = Math.min(0, Math.max(minY, newY));

        updateMapTransform();
    }, {passive: false});

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    function updateMapTransform() {
        map.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    // Modal Handling
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    });

    // Populate Map with Nodes from `archiveNodes` (Loaded from rgv_archive_data.js)
    if (typeof archiveNodes === 'undefined') {
        console.error("archiveNodes is not defined. Ensure rgv_archive_data.js is loaded.");
        return;
    }

    // Create scattered coordinates
    const padding = 300; // Keep nodes away from edges
    const usableWidth = mapWidth - padding * 2;
    const usableHeight = mapHeight - padding * 2;
    
    const placedNodes = [];

    function generatePos() {
        let maxAttempts = 200;
        while(maxAttempts > 0) {
            const x = padding + Math.random() * usableWidth;
            const y = padding + Math.random() * usableHeight;
            
            // Check collision with other nodes to ensure they aren't too close
            let collision = false;
            for(let node of placedNodes) {
                const dx = node.x - x;
                const dy = node.y - y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 300) { // Keep nodes at least 300px apart
                    collision = true;
                    break;
                }
            }

            if (!collision) {
                return {x, y};
            }
            maxAttempts--;
        }
        // Fallback if it couldn't find a spot
        return {
            x: padding + Math.random() * usableWidth,
            y: padding + Math.random() * usableHeight
        };
    }

    archiveNodes.forEach(data => {
        const pos = generatePos();
        placedNodes.push(pos);

        const nodeEl = document.createElement('div');
        nodeEl.className = 'map-node';
        nodeEl.style.left = `${pos.x}px`;
        nodeEl.style.top = `${pos.y}px`;

        nodeEl.innerHTML = `
            <div class="node-icon-wrapper">
                ${data.icon || '📍'}
            </div>
            <div class="node-shadow"></div>
            <div class="node-label">${data.title}</div>
        `;

        // Click handler to open modal
        nodeEl.addEventListener('click', () => {
            modalTitle.textContent = data.title;
            modalDate.textContent = data.date;
            modalDesc.textContent = data.description;
            modalLink.href = data.link;
            modalIcon.textContent = data.icon || '📍';
            modalOverlay.classList.remove('hidden');
        });

        map.appendChild(nodeEl);
    });

    // Decorate map with purely visual terrain features (trees, hills, etc.)
    const terrainIcons = ['🌲', '🌳', '🏔️', '⛰️', '🌾', '🏕️', '🌊', '🌿', '🌵'];
    for (let i = 0; i < 150; i++) {
        const tPos = generatePos();
        const terrain = document.createElement('div');
        terrain.style.position = 'absolute';
        terrain.style.left = `${tPos.x}px`;
        terrain.style.top = `${tPos.y}px`;
        terrain.style.fontSize = `${20 + Math.random() * 30}px`;
        terrain.style.opacity = '0.3';
        terrain.style.transform = 'translate(-50%, -50%)';
        terrain.style.pointerEvents = 'none'; // Don't interfere with dragging or clicking
        terrain.textContent = terrainIcons[Math.floor(Math.random() * terrainIcons.length)];
        map.appendChild(terrain);
    }
});
