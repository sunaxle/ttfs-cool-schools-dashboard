document.addEventListener('DOMContentLoaded', () => {
    // Current date
    const dateSpan = document.querySelector('.current-date');
    if (dateSpan) {
        dateSpan.textContent = new Date().toLocaleDateString();
    }

    // View Toggles
    const btnOfficial = document.getElementById('btn-official');
    const btnInteractive = document.getElementById('btn-interactive');
    const viewOfficial = document.getElementById('official-view');
    const viewInteractive = document.getElementById('interactive-view');

    btnOfficial.addEventListener('click', () => {
        viewOfficial.classList.remove('hidden');
        viewInteractive.classList.add('hidden');
        btnOfficial.classList.add('active');
        btnInteractive.classList.remove('active');
    });

    btnInteractive.addEventListener('click', () => {
        viewInteractive.classList.remove('hidden');
        viewOfficial.classList.add('hidden');
        btnInteractive.classList.add('active');
        btnOfficial.classList.remove('active');
    });

    // Journal Tabs (Page Flip)
    const tabRead = document.getElementById('tab-read');
    const tabLog = document.getElementById('tab-log');
    const pageLesson = document.getElementById('page-lesson');
    const pageForm = document.getElementById('page-form');

    tabRead.addEventListener('click', () => {
        pageLesson.classList.remove('hidden');
        pageForm.classList.add('hidden');
        tabRead.classList.add('active');
        tabLog.classList.remove('active');
    });

    tabLog.addEventListener('click', () => {
        pageLesson.classList.add('hidden');
        pageForm.classList.remove('hidden');
        tabLog.classList.add('active');
        tabRead.classList.remove('active');
    });

    // Print Button
    document.getElementById('print-btn').addEventListener('click', () => {
        window.print();
    });

    // Form Submission & LocalStorage
    const form = document.getElementById('observation-form');
    const tableBody = document.querySelector('#tracking-table tbody');

    // Load saved data
    loadObservations();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const obs = {
            id: Date.now(),
            date: document.getElementById('obs-date').value,
            nickname: document.getElementById('obs-nickname').value,
            classroom: document.getElementById('obs-classroom').value,
            species: document.getElementById('obs-species').value,
            health: document.getElementById('obs-health').value,
            dbh: document.getElementById('obs-dbh').value,
            height: document.getElementById('obs-height').value,
            moisture: document.getElementById('obs-moisture').value
        };

        let observations = JSON.parse(localStorage.getItem('ttfs_tree_observations') || '[]');
        observations.push(obs);
        localStorage.setItem('ttfs_tree_observations', JSON.stringify(observations));

        appendObservationRow(obs);
        form.reset();
    });

    function loadObservations() {
        let observations = JSON.parse(localStorage.getItem('ttfs_tree_observations') || '[]');
        observations.forEach(obs => appendObservationRow(obs));
    }

    function appendObservationRow(obs) {
        const tr = document.createElement('tr');
        tr.className = 'pencil-row';
        
        let healthIcon = '😊';
        let healthClass = 'happy';
        if (obs.health === 'medium') { healthIcon = '😐'; healthClass = 'medium'; }
        if (obs.health === 'sad') { healthIcon = '☹️'; healthClass = 'sad'; }

        tr.innerHTML = `
            <td>${obs.date}</td>
            <td>${obs.nickname}</td>
            <td>${obs.classroom}</td>
            <td>${obs.species}</td>
            <td><div class="sticky-note ${healthClass}" onclick="toggleHealth(this)">${healthIcon}</div></td>
            <td>${obs.dbh}</td>
            <td>${obs.height}</td>
            <td>${obs.moisture}</td>
        `;
        tableBody.appendChild(tr);
    }
});

// Global function for onclick
function toggleHealth(element) {
    if (element.classList.contains('happy')) {
        element.classList.remove('happy');
        element.classList.add('medium');
        element.textContent = '😐';
    } else if (element.classList.contains('medium')) {
        element.classList.remove('medium');
        element.classList.add('sad');
        element.textContent = '☹️';
    } else {
        element.classList.remove('sad');
        element.classList.add('happy');
        element.textContent = '😊';
    }
}