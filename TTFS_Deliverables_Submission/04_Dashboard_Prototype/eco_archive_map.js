document.addEventListener("DOMContentLoaded", () => {
    // 1. Map Coordinates & Path Order
    // The nodes are positioned as percentages (0-100) across the map-container.
    const coordinates = {
        0: {x: 40, y: 40},
        1: {x: 48, y: 75},
        2: {x: 50, y: 77},
        3: {x: 52, y: 55},
        4: {x: 35, y: 70},
        5: {x: 75, y: 65},
        6: {x: 25, y: 75},
        7: {x: 55, y: 80},
        8: {x: 20, y: 65},
        9: {x: 82, y: 70},
        10: {x: 42, y: 82},
        11: {x: 60, y: 75},
        12: {x: 80, y: 85},
        13: {x: 10, y: 45},
        14: {x: 53, y: 50},
        15: {x: 73, y: 68},
        16: {x: 50, y: 85},
        17: {x: 90, y: 60},
        18: {x: 46, y: 72},
        19: {x: 62, y: 73},
        20: {x: 84, y: 88}
    };

    // Path connecting nodes in a tour-like order
    const pathOrder = [13, 8, 6, 4, 10, 18, 0, 14, 3, 1, 2, 16, 7, 11, 19, 15, 5, 9, 17, 12, 20];

    const nodesLayer = document.getElementById("nodes-layer");
    const pathsSvg = document.getElementById("map-paths");

    // Enhance nodes with coordinates
    const nodesData = archiveNodes.map((node, index) => ({
        ...node,
        id: index,
        x: coordinates[index] ? coordinates[index].x : 50,
        y: coordinates[index] ? coordinates[index].y : 50
    }));

    // 2. Render Nodes
    nodesData.forEach(node => {
        const el = document.createElement("div");
        el.className = "map-node";
        el.style.left = `${node.x}%`;
        el.style.top = `${node.y}%`;
        el.innerHTML = node.icon;
        el.setAttribute("data-title", node.title);
        
        el.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent dragging from firing click
            openModal(node);
        });

        nodesLayer.appendChild(el);
    });

    // 3. Render SVG Path Connecting the Nodes
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "";
    pathOrder.forEach((nodeId, idx) => {
        const node = nodesData[nodeId];
        if (node) {
            const command = idx === 0 ? "M" : "L";
            d += `${command} ${node.x}% ${node.y}% `;
        }
    });
    
    pathEl.setAttribute("d", d);
    pathEl.setAttribute("class", "path-line");
    pathsSvg.appendChild(pathEl);

    // 4. Pan & Drag functionality
    const viewport = document.getElementById('viewport');
    const mapContainer = document.getElementById('map-container');
    
    let isDragging = false;
    let startX, startY, initialTx, initialTy;
    
    // Set initial transform state
    let transform = {
        x: - (mapContainer.offsetWidth / 2) + (window.innerWidth / 2),
        y: - (mapContainer.offsetHeight / 2) + (window.innerHeight / 2)
    };
    
    const updateTransform = () => {
        mapContainer.style.transform = `translate(${transform.x}px, ${transform.y}px)`;
    };
    
    // Apply initial position
    updateTransform();

    viewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialTx = transform.x;
        initialTy = transform.y;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        transform.x = initialTx + dx;
        transform.y = initialTy + dy;
        
        // Optional boundary clamping could go here
        
        updateTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Support for touch devices
    viewport.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            initialTx = transform.x;
            initialTy = transform.y;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.touches.length === 1) {
            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;
            
            transform.x = initialTx + dx;
            transform.y = initialTy + dy;
            
            updateTransform();
        }
    }, {passive: false});

    window.addEventListener('touchend', () => {
        isDragging = false;
    });


    // 5. Modal Logic
    const modalOverlay = document.getElementById("modal-overlay");
    const modalClose = document.getElementById("modal-close");
    
    const mIcon = document.getElementById("modal-icon");
    const mTitle = document.getElementById("modal-title");
    const mType = document.getElementById("modal-type");
    const mDate = document.getElementById("modal-date");
    const mDesc = document.getElementById("modal-desc");
    const mLink = document.getElementById("modal-link");

    function openModal(node) {
        mIcon.innerHTML = node.icon;
        mTitle.textContent = node.title;
        mType.textContent = node.type;
        mDate.textContent = node.date;
        mDesc.textContent = node.description;
        mLink.href = node.link;
        
        modalOverlay.classList.add("active");
    }

    function closeModal() {
        modalOverlay.classList.remove("active");
    }

    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});
