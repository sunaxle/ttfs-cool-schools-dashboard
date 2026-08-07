// biodiversity_analog_concept.js

document.addEventListener('DOMContentLoaded', () => {
    const data = window.MOCK_BIODIVERSITY_DATA;
    let currentCategory = 'birds';
    
    // We mock the "observed" state. By default, let's say the first 3 of any category are "observed" by the class, and the rest are "silhouettes".
    // As the teacher inputs tallies, we can reveal more.
    let observedCounts = {
        birds: parseInt(document.getElementById('birdTally').value) || 3,
        insects: parseInt(document.getElementById('insectTally').value) || 2,
        plants: parseInt(document.getElementById('plantTally').value) || 4
    };

    const scrapbookGrid = document.getElementById('scrapbookGrid');
    const tabs = document.querySelectorAll('.scrapbook-tab');

    function renderScrapbook(category) {
        scrapbookGrid.innerHTML = '';
        const items = data[category] || [];
        const observedLimit = observedCounts[category];

        items.forEach((item, index) => {
            const isObserved = index < observedLimit;
            
            const card = document.createElement('div');
            card.className = 'scrapbook-item';
            
            // Image with silhouette toggle
            const img = document.createElement('img');
            img.src = item.image_url;
            img.alt = item.common_name;
            img.className = `species-image ${isObserved ? '' : 'silhouette'}`;
            
            // Info
            const info = document.createElement('div');
            info.className = 'species-info';
            
            const name = document.createElement('p');
            name.className = 'species-name';
            // If not observed, maybe show question marks or just the name
            name.textContent = isObserved ? item.common_name : '??? (Unobserved)';
            
            const scientific = document.createElement('p');
            scientific.className = 'species-scientific';
            scientific.textContent = isObserved ? item.scientific_name : 'Find it outside to reveal!';
            
            info.appendChild(name);
            info.appendChild(scientific);
            card.appendChild(img);
            card.appendChild(info);
            
            scrapbookGrid.appendChild(card);
        });
    }

    // Initialize
    renderScrapbook(currentCategory);

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.tab;
            renderScrapbook(currentCategory);
        });
    });

    // Tally Station Logic
    const submitTallyBtn = document.getElementById('submitTallyBtn');
    submitTallyBtn.addEventListener('click', () => {
        observedCounts.birds = parseInt(document.getElementById('birdTally').value) || 0;
        observedCounts.insects = parseInt(document.getElementById('insectTally').value) || 0;
        observedCounts.plants = parseInt(document.getElementById('plantTally').value) || 0;
        
        // Flash effect to show update
        const container = document.querySelector('.tally-station');
        container.style.backgroundColor = '#e8f5df';
        setTimeout(() => {
            container.style.backgroundColor = '#fff';
        }, 500);

        renderScrapbook(currentCategory);
        alert('Classroom tallies updated! New stickers have been unlocked in the Scrapbook.');
    });

    // Interactive Map Zones
    const mapZones = document.querySelectorAll('.map-zone');
    mapZones.forEach(zone => {
        zone.addEventListener('click', () => {
            alert(`You selected the ${zone.textContent.trim()} zone. If this was a full build, this would filter the scrapbook to only show species found in this zone!`);
        });
    });

    // Print Modal Logic
    const printBingoBtn = document.getElementById('printBingoBtn');
    const printModal = document.getElementById('printModal');
    const confirmPrintBtn = document.getElementById('confirmPrintBtn');
    const cancelPrintBtn = document.getElementById('cancelPrintBtn');

    printBingoBtn.addEventListener('click', () => {
        printModal.classList.remove('hidden');
    });

    cancelPrintBtn.addEventListener('click', () => {
        printModal.classList.add('hidden');
    });

    confirmPrintBtn.addEventListener('click', () => {
        printModal.classList.add('hidden');
        alert('Sending 25 unique Biodiversity Bingo cards to the classroom printer... 🖨️ (Concept Demo)');
    });
});
