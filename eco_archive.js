document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('archive-nodes-container');
    const wrapper = document.querySelector('.parallax-wrapper');
    const foreground = document.getElementById('foreground-bushes');
    const svgPath = document.querySelector('.winding-path path');
    const svgEl = document.querySelector('.winding-path');
    
    // Spacing between nodes down the path
    const verticalSpacing = 450; 
    
    // Build a dynamic SVG path based on number of nodes
    let pathD = "M50,0 ";
    
    archiveNodes.forEach((data, index) => {
        // Create Node Element
        const el = document.createElement('div');
        el.className = 'archive-node';
        
        // Alternate left/right side of the path
        const isLeft = index % 2 === 0;
        const currentY = index * verticalSpacing + 200;
        
        el.style.top = `${currentY}px`;
        // On desktop, alternate. On mobile, CSS overrides this to center.
        el.style.left = isLeft ? '10%' : '55%'; 
        
        el.innerHTML = `
            <div class="node-icon">${data.icon}</div>
            <h3 class="node-title">${data.title}</h3>
            <div class="node-date">${data.date} | ${data.type}</div>
            <div class="node-desc">${data.description}</div>
        `;
        
        // Open link on click
        el.addEventListener('click', () => {
            window.open(data.link, '_blank');
        });
        
        container.appendChild(el);

        // --- Foreground Parallax Bushes ---
        // Sprinkle 1-3 bushes around this node
        const numBushes = Math.floor(Math.random() * 3) + 1;
        for(let i=0; i<numBushes; i++) {
            const bush = document.createElement('div');
            bush.className = 'bush';
            // Scatter vertically around the node
            bush.style.top = `${currentY + (Math.random() * 300 - 150)}px`;
            
            // Place bushes mostly on the opposite side of the node to avoid covering text,
            // or far out on the edges.
            const bushLeft = isLeft ? (60 + Math.random() * 40) : (-20 + Math.random() * 40);
            bush.style.left = `${bushLeft}%`;
            
            // Randomize size and rotation for organic feel
            bush.style.transform = `scale(${Math.random() * 0.8 + 0.4}) rotate(${Math.random() * 360}deg)`;
            
            foreground.appendChild(bush);
        }
        
        // Add curve to SVG path
        // Q control-x,control-y end-x,end-y
        // T end-x, end-y (smooth continuation)
        const pathX = isLeft ? 30 : 70;
        if(index === 0) {
            pathD += `Q${pathX},${currentY - 100} 50,${currentY} `;
        } else {
            pathD += `T50,${currentY} `;
        }
    });

    // Finalize path
    const totalHeight = archiveNodes.length * verticalSpacing + 400;
    pathD += `T50,${totalHeight}`;
    svgPath.setAttribute('d', pathD);
    svgEl.setAttribute('viewBox', `0 0 100 ${totalHeight}`);
    svgEl.style.height = `${totalHeight}px`;
    container.style.height = `${totalHeight}px`;

    // --- Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: wrapper, // IMPORTANT: observe relative to the scrolling wrapper
        threshold: 0.15
    });

    document.querySelectorAll('.archive-node').forEach(node => {
        observer.observe(node);
    });

    // --- Style Toggle Button ---
    const toggleBtn = document.getElementById('toggleStyleBtn');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('realistic-mode');
            if(document.body.classList.contains('realistic-mode')) {
                toggleBtn.innerText = "Switch to Graphic Bushes";
                toggleBtn.style.backgroundColor = "#2d5a27";
            } else {
                toggleBtn.innerText = "Switch to Realistic Bushes";
                toggleBtn.style.backgroundColor = "#e57373";
            }
        });
    }
});
