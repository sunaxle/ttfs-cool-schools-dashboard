document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-view');
    const docView = document.getElementById('document-view');
    const trailView = document.getElementById('trail-view');
    const printBtn = document.getElementById('print-btn');
    
    // Toggle View
    toggleBtn.addEventListener('click', () => {
        const isDoc = !docView.classList.contains('hidden');
        if (isDoc) {
            docView.classList.add('hidden');
            trailView.classList.remove('hidden');
            toggleBtn.querySelector('.badge-text').textContent = 'Switch to Official Document';
        } else {
            docView.classList.remove('hidden');
            trailView.classList.add('hidden');
            toggleBtn.querySelector('.badge-text').textContent = 'Switch to Trail Map';
        }
    });

    // Print
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Waypoints
    const pins = document.querySelectorAll('.pin');
    const trailProgress = document.getElementById('trail-progress');
    const pathLength = 2000; // Match stroke-dasharray

    pins.forEach(pin => {
        pin.addEventListener('click', (e) => {
            const card = e.target.parentElement.querySelector('.station-card');
            
            // Hide others
            document.querySelectorAll('.station-card').forEach(c => {
                if(c !== card) c.classList.add('hidden');
            });
            
            card.classList.toggle('hidden');
        });
    });

    // Mark Complete & Progress
    const completeBtns = document.querySelectorAll('.mark-complete');
    completeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const waypoint = e.target.closest('.waypoint');
            const pin = waypoint.querySelector('.pin');
            const station = pin.getAttribute('data-station');
            
            pin.classList.add('completed');
            e.target.closest('.station-card').classList.add('hidden');
            
            // Save to local storage
            let completed = JSON.parse(localStorage.getItem('trailProgress') || '[]');
            if(!completed.includes(station)) {
                completed.push(station);
                localStorage.setItem('trailProgress', JSON.stringify(completed));
            }
            
            updateTrailProgress();
        });
    });

    function updateTrailProgress() {
        const completed = JSON.parse(localStorage.getItem('trailProgress') || '[]');
        const total = pins.length;
        const count = completed.length;
        
        completed.forEach(station => {
            const pin = document.querySelector(`.pin[data-station="${station}"]`);
            if(pin) pin.classList.add('completed');
        });

        const offset = pathLength - (pathLength * (count / total));
        trailProgress.style.strokeDashoffset = offset;
    }

    // Field Log
    const form = document.getElementById('field-log-form');
    const tbody = document.querySelector('#log-table tbody');

    function loadLogs() {
        const logs = JSON.parse(localStorage.getItem('fieldLogs') || '[]');
        tbody.innerHTML = '';
        
        // Add defaults if empty
        if(logs.length === 0) {
            const defaults = [
                {date: '2026-09-08', tree: 'The Montezuma King', room: 'Room 301', species: 'Montezuma Cypress', health: 'Good', dbh: '3.4in', height: '8.5ft', moisture: 'Damp/Mulched'},
                {date: '2026-09-10', tree: 'Shadow Maker', room: 'Room 405', species: 'Texas Ebony', health: 'Medium', dbh: '2.8in', height: '6.2ft', moisture: 'Dry/Needs Mulch'},
                {date: '2026-09-12', tree: 'Sunny Live Oak', room: 'Room 502', species: 'Escarpment Live Oak', health: 'Good', dbh: '4.1in', height: '11.0ft', moisture: 'Moist'}
            ];
            localStorage.setItem('fieldLogs', JSON.stringify(defaults));
            logs.push(...defaults);
        }

        logs.forEach(log => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${log.date}</td>
                <td>${log.tree}</td>
                <td>${log.room}</td>
                <td>${log.species}</td>
                <td>${log.health}</td>
                <td>${log.dbh}</td>
                <td>${log.height}</td>
                <td>${log.moisture}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newLog = {
            date: document.getElementById('log-date').value,
            tree: document.getElementById('log-tree').value,
            room: document.getElementById('log-room').value,
            species: document.getElementById('log-species').value,
            health: document.getElementById('log-health').value,
            dbh: document.getElementById('log-dbh').value,
            height: document.getElementById('log-height').value,
            moisture: document.getElementById('log-moisture').value
        };

        const logs = JSON.parse(localStorage.getItem('fieldLogs') || '[]');
        logs.push(newLog);
        localStorage.setItem('fieldLogs', JSON.stringify(logs));
        
        loadLogs();
        form.reset();
    });

    // Initialize
    updateTrailProgress();
    loadLogs();
});
