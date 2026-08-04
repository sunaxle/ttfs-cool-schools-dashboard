document.addEventListener('DOMContentLoaded', () => {
    const timeSlider = document.getElementById('timeSlider');
    const timeDisplay = document.getElementById('timeDisplay');
    const outdoorsCount = document.getElementById('outdoorsCount');
    const currentHourLabel = document.getElementById('currentHourLabel');

    const barOutdoors = document.getElementById('barOutdoors');
    const barRecreation = document.getElementById('barRecreation');
    const barIndoors = document.getElementById('barIndoors');
    const lblPctOutdoors = document.getElementById('lblPctOutdoors');
    const lblPctRec = document.getElementById('lblPctRec');
    const lblPctIndoors = document.getElementById('lblPctIndoors');

    const scheduleTableBody = document.getElementById('scheduleTableBody');

    // Aggregated Class Schedule Data
    const classScheduleData = [
        { group: "Class 3A (Ms. Garcia)", dept: "🔬 Science", activity: "Microforest Soil Moisture & Temp Audit", zone: "Outdoor Microforest", mins: "90 mins", status: "Active" },
        { group: "Class 4B (Mr. Rodriguez)", dept: "🎨 Art", activity: "Canopy Shadow & Leaf Pattern Sketching", zone: "Outdoor Courtyard", mins: "60 mins", status: "Active" },
        { group: "Class 5A (Dr. Racelis)", dept: "🔬 Science", activity: "Shade Canopy Heat Reduction Experiment", zone: "Outdoor Learning Zone", mins: "120 mins", status: "Active" },
        { group: "Class 3B (Ms. Martinez)", dept: "📖 English Lit", activity: "Outdoor Reading Circle in Microforest", zone: "Microforest Shade", mins: "60 mins", status: "Scheduled" },
        { group: "Class 4A (Mr. Hernandez)", dept: "📚 Standard", activity: "Recess & Physical Activity Ground Survey", zone: "Outdoor Playground", mins: "30 mins", status: "Scheduled" }
    ];

    function formatHourString(hour24) {
        const ampm = hour24 >= 12 ? 'PM' : 'AM';
        const hr12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
        return `${hr12}:00 ${ampm}`;
    }

    function renderScheduleTable() {
        if (!scheduleTableBody) return;
        scheduleTableBody.innerHTML = "";

        classScheduleData.forEach(item => {
            const tr = document.createElement("tr");
            const statusClass = item.status === "Active" ? "active" : "scheduled";
            tr.innerHTML = `
                <td style="font-weight: bold; color: var(--green-dark);">${item.group}</td>
                <td>${item.dept}</td>
                <td>${item.activity}</td>
                <td>${item.zone}</td>
                <td style="font-weight: bold;">${item.mins}</td>
                <td><span class="status-tag ${statusClass}">${item.status}</span></td>
            `;
            scheduleTableBody.appendChild(tr);
        });
    }

    function updateAnalyticsForHour(hour) {
        const timeStr = formatHourString(hour);
        if (timeDisplay) timeDisplay.textContent = timeStr;
        if (currentHourLabel) currentHourLabel.textContent = timeStr;

        // Model percentages based on school day hour
        let outdoorsPct, recPct, indoorsPct;
        if (hour === 8) {
            outdoorsPct = 15; recPct = 10; indoorsPct = 75;
        } else if (hour >= 9 && hour <= 11) {
            outdoorsPct = 45; recPct = 15; indoorsPct = 40;
        } else if (hour === 12 || hour === 13) {
            outdoorsPct = 30; recPct = 50; indoorsPct = 20; // Lunch & recess peak
        } else if (hour >= 14 && hour <= 15) {
            outdoorsPct = 50; recPct = 15; indoorsPct = 35; // Afternoon outdoor science labs
        } else {
            outdoorsPct = 20; recPct = 20; indoorsPct = 60; // Dismissal / afterschool
        }

        const totalOutdoorPct = outdoorsPct + recPct;
        const totalOutdoorsStudents = Math.round((totalOutdoorPct / 100) * 20);

        if (outdoorsCount) outdoorsCount.textContent = `${totalOutdoorsStudents} / 20 (${totalOutdoorPct}%)`;

        if (barOutdoors) barOutdoors.style.width = `${outdoorsPct}%`;
        if (barRecreation) barRecreation.style.width = `${recPct}%`;
        if (barIndoors) barIndoors.style.width = `${indoorsPct}%`;

        if (lblPctOutdoors) lblPctOutdoors.textContent = `${outdoorsPct}%`;
        if (lblPctRec) lblPctRec.textContent = `${recPct}%`;
        if (lblPctIndoors) lblPctIndoors.textContent = `${indoorsPct}%`;

        // Update Departmental cumulative minutes progress
        const hourProgress = (hour - 7); // 1 to 9
        const scienceMins = Math.min(120, hourProgress * 15);
        const artMins = Math.min(90, Math.max(0, (hourProgress - 2) * 15));
        const englishMins = Math.min(60, Math.max(0, (hourProgress - 3) * 10));
        const standardMins = Math.min(30, hourProgress * 4);

        const MAX_MINS = 120;
        document.getElementById('trackScience').textContent = `${scienceMins} mins`;
        document.getElementById('barScience').style.width = `${(scienceMins / MAX_MINS) * 100}%`;

        document.getElementById('trackArt').textContent = `${artMins} mins`;
        document.getElementById('barArt').style.width = `${(artMins / MAX_MINS) * 100}%`;

        document.getElementById('trackEnglish').textContent = `${englishMins} mins`;
        document.getElementById('barEnglish').style.width = `${(englishMins / MAX_MINS) * 100}%`;

        document.getElementById('trackStandard').textContent = `${standardMins} mins`;
        document.getElementById('barStandard').style.width = `${(standardMins / MAX_MINS) * 100}%`;
    }

    if (timeSlider) {
        timeSlider.addEventListener('input', (e) => {
            updateAnalyticsForHour(parseInt(e.target.value, 10));
        });
    }

    // Play/Pause Auto Animation
    let isPlaying = false;
    let playInterval;
    const playBtn = document.getElementById('playBtn');

    function togglePlay() {
        isPlaying = !isPlaying;
        if (playBtn) {
            playBtn.textContent = isPlaying ? "Pause" : "Play";
            playBtn.style.background = isPlaying ? "#d32f2f" : "#2e7d32";
        }

        if (isPlaying) {
            playInterval = setInterval(() => {
                let currentVal = parseInt(timeSlider.value, 10);
                currentVal += 1;
                if (currentVal > 16) currentVal = 8;

                timeSlider.value = currentVal;
                updateAnalyticsForHour(currentVal);
            }, 1200);
        } else {
            clearInterval(playInterval);
        }
    }

    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }

    renderScheduleTable();
    updateAnalyticsForHour(8);
});

