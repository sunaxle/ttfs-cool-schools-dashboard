document.addEventListener('DOMContentLoaded', () => {
    const scrollTrail = document.getElementById('scroll-trail');
    const flyerIcon = document.getElementById('flyer-icon');
    const flyerTitle = document.getElementById('flyer-title');
    const flyerDate = document.getElementById('flyer-date');
    const flyerDesc = document.getElementById('flyer-desc');
    const flyerLink = document.getElementById('flyer-link');
    const flyerPaper = document.getElementById('flyer-view');

    let cards = [];

    // Check if data is loaded
    if (typeof archiveNodes === 'undefined') {
        console.error('archiveNodes data not found. Ensure rgv_archive_data.js is loaded.');
        return;
    }

    // Function to update the flyer view
    function updateFlyerView(node) {
        // Trigger a simple fade animation
        flyerPaper.classList.remove('fade-in');
        // Trigger reflow
        void flyerPaper.offsetWidth;
        flyerPaper.classList.add('fade-in');

        flyerIcon.textContent = node.icon || '🌿';
        flyerTitle.textContent = node.title;
        
        // Use type and date for the subtitle
        const typeStr = node.type ? node.type.toUpperCase() : 'ENTRY';
        flyerDate.textContent = `${typeStr} • ${node.date || 'Unknown Date'}`;
        
        flyerDesc.textContent = node.description;

        if (node.link) {
            flyerLink.href = node.link;
            flyerLink.style.display = 'inline-block';
            flyerLink.textContent = node.type === 'location' ? 'Visit Website' : 'Read More';
        } else {
            flyerLink.style.display = 'none';
        }
    }

    // Render the trail cards
    archiveNodes.forEach((node, index) => {
        const card = document.createElement('div');
        card.className = 'trail-card';
        card.dataset.index = index;

        // Build internal HTML for the card
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">${node.icon || '🌿'}</div>
                <div class="card-title">${node.title}</div>
            </div>
            <div class="card-meta">${node.type ? node.type.toUpperCase() : 'ENTRY'} | ${node.date || ''}</div>
            <div class="card-excerpt">${node.description}</div>
        `;

        // Click event listener
        card.addEventListener('click', () => {
            // Remove active from all cards
            cards.forEach(c => c.classList.remove('active'));
            // Add active to current
            card.classList.add('active');
            
            // Update flyer
            updateFlyerView(node);
        });

        scrollTrail.appendChild(card);
        cards.push(card);
    });

    // Automatically select the first item on load if it exists
    if (cards.length > 0) {
        cards[0].click();
    }
});
