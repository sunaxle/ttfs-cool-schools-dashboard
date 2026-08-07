// lesson_plans.js
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const browseBtn = document.getElementById('browseBtn');
    const fileInput = document.getElementById('fileInput');
    const processingState = document.getElementById('processingState');
    const processingLog = document.getElementById('processingLog');
    const resultsCard = document.getElementById('resultsCard');
    const validateBtn = document.getElementById('validateBtn');
    const componentList = document.getElementById('componentList');

    // Simulate drag and drop
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if(e.target.files.length > 0) {
            startSimulation(e.target.files[0].name);
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        if(e.dataTransfer.files.length > 0) {
            startSimulation(e.dataTransfer.files[0].name);
        }
    });

    function startSimulation(filename) {
        dropZone.style.display = 'none';
        processingState.style.display = 'block';
        processingLog.innerHTML = `<li>Scanning document: <strong>${filename}</strong></li>`;

        const steps = [
            "Extracting text content...",
            "Applying local NLP heuristics (No data leaving server)...",
            "Identifying 'outdoor' and 'nature' keywords...",
            "Correlating activities with Science TEKS...",
            "Calculating estimated outdoor time..."
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if(stepIndex < steps.length) {
                const li = document.createElement('li');
                li.textContent = steps[stepIndex];
                processingLog.appendChild(li);
                stepIndex++;
            } else {
                clearInterval(interval);
                setTimeout(showResults, 800);
            }
        }, 800);
    }

    function showResults() {
        processingState.style.display = 'none';
        resultsCard.style.display = 'block';

        // Mock data
        document.getElementById('outdoorTimeVal').textContent = '45 mins';
        
        const mocks = [
            "🌿 Leaf identification (15 mins)",
            "☀️ Shadow length measurement (20 mins)",
            "📖 Free reading under canopy (10 mins)"
        ];

        componentList.innerHTML = '';
        mocks.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            componentList.appendChild(li);
        });
    }

    validateBtn.addEventListener('click', () => {
        validateBtn.textContent = 'Validated & Saved';
        validateBtn.style.background = '#8d8d8d';
        validateBtn.disabled = true;
        
        // Update the telemetry dashboard
        const total = document.getElementById('totalHoursVal');
        total.textContent = '13.25 hrs';
        total.style.color = 'var(--green)';
        
        alert('Human validation recorded. Metrics updated in the dashboard.');
    });
});
