/**
 * Infrared (IR) Surface Temperature & Tree Canopy Heat Relief Lab
 * Logic & Interactive Simulator Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Campus Directory
    const campusDirectory = {
        'donna_rivas': { name: 'M. Rivas Primary Discovery Academy', short: 'M. Rivas Primary', district: 'Donna ISD' },
        'donna_caceres': { name: 'J.W. Caceres Discovery Academy', short: 'J.W. Caceres', district: 'Donna ISD' },
        'donna_garza': { name: 'Garza Elementary School', short: 'Garza Elementary', district: 'Donna ISD' },
        'donna_singleterry': { name: 'Singleterry Elementary School', short: 'Singleterry Elementary', district: 'Donna ISD' },
        'donna_salinas': { name: 'Salinas Elementary School', short: 'Salinas Elementary', district: 'Donna ISD' },
        'donna_solis': { name: 'Solis Elementary School', short: 'Solis Elementary', district: 'Donna ISD' },
        'donna_ochoa': { name: 'Ochoa Elementary School', short: 'Ochoa Elementary', district: 'Donna ISD' },
        'donna_stainke': { name: 'Stainke Elementary School', short: 'Stainke Elementary', district: 'Donna ISD' },
        'mercedes_travis': { name: 'W.B. Travis Elementary School', short: 'Travis Elementary', district: 'Mercedes ISD' },
        'mercedes_chacon': { name: 'Sgt. Manuel Chacon Middle School', short: 'Chacon Middle', district: 'Mercedes ISD' },
        'mercedes_harrell': { name: 'Harrell Elementary School', short: 'Harrell Elementary', district: 'Mercedes ISD' },
        'mercedes_hinojosa': { name: 'Ruben Hinojosa Elementary School', short: 'Hinojosa Elementary', district: 'Mercedes ISD' },
        'mercedes_high': { name: 'Mercedes High School', short: 'Mercedes High', district: 'Mercedes ISD' },
        'mercedes_academy': { name: 'Mercedes Academic Academy', short: 'Mercedes Academy', district: 'Mercedes ISD' }
    };

    // Pre-seeded baseline surface readings per campus
    const baselineThermalObservations = {
        'donna_rivas': [
            { team: 'Room 302 (Detectives)', surface: 'Black Asphalt', sunTemp: 138.4, shadeTemp: 92.1, delta: -46.3, notes: 'Parking lot vs. Montezuma Cypress' },
            { team: 'Room 204 (Eco-Team)', surface: 'Rubber Play Matting', sunTemp: 146.2, shadeTemp: 94.5, delta: -51.7, notes: 'Extreme burn hazard in direct sun' },
            { team: 'Room 105 (Solar Scouts)', surface: 'Concrete Sidewalk', sunTemp: 122.5, shadeTemp: 89.3, delta: -33.2, notes: 'Courtyard shaded by Live Oak' },
            { team: 'Room 401 (Agro-Science)', surface: 'Living Turfgrass', sunTemp: 104.2, shadeTemp: 84.0, delta: -20.2, notes: 'Grass cooled by evapotranspiration' }
        ],
        'donna_caceres': [
            { team: 'Room 501 (Heat Watch)', surface: 'Black Asphalt', sunTemp: 139.1, shadeTemp: 91.8, delta: -47.3, notes: 'Basketball court' },
            { team: 'Room 304 (Nature Lab)', surface: 'Bare Compacted Soil', sunTemp: 119.5, shadeTemp: 87.0, delta: -32.5, notes: 'Soccer field perimeter' },
            { team: 'Room 202 (Green Leaves)', surface: 'Rubber Play Matting', sunTemp: 144.8, shadeTemp: 93.9, delta: -50.9, notes: 'Swing set area' }
        ],
        'mercedes_travis': [
            { team: 'Room 403 (Tigers)', surface: 'Blacktop Play Area', sunTemp: 137.9, shadeTemp: 92.4, delta: -45.5, notes: 'Primary playground' },
            { team: 'Room 201 (Forestry)', surface: 'Concrete Walkway', sunTemp: 121.8, shadeTemp: 88.5, delta: -33.3, notes: 'Main entrance canopy' },
            { team: 'Room 305 (Microclimate)', surface: 'Turfgrass Lawn', sunTemp: 103.5, shadeTemp: 83.2, delta: -20.3, notes: 'Courtyard lawn' }
        ]
    };

    // DOM Elements
    const campusSelectDropdown = document.getElementById('campusSelectDropdown');
    const bannerCampusLabel = document.getElementById('bannerCampusLabel');
    const bannerDistrictTag = document.getElementById('bannerDistrictTag');
    const docActiveCampusName = document.getElementById('docActiveCampusName');
    const clipboardSchoolTitle = document.getElementById('clipboardSchoolTitle');
    const clipboardScopeTag = document.getElementById('clipboardScopeTag');
    const tableCampusHeader = document.getElementById('tableCampusHeader');
    const thermalTableBody = document.getElementById('thermalTableBody');

    const modeToggle = document.getElementById('modeToggle');
    const switchToggle = document.getElementById('switchToggle');
    const officialDoc = document.getElementById('officialDoc');
    const redesignBoard = document.getElementById('redesignBoard');
    const stringLayer = document.getElementById('stringLayer');
    const printBtn = document.getElementById('printBtn');

    // IR Gun Simulator Elements
    const lcdTempDigits = document.getElementById('lcdTempDigits');
    const lcdTargetLabel = document.getElementById('lcdTargetLabel');
    const lcdHoldTag = document.getElementById('lcdHoldTag');
    const pullTriggerBtn = document.getElementById('pullTriggerBtn');
    const spectrumNeedle = document.getElementById('spectrumNeedle');
    const targetCards = document.querySelectorAll('.target-card');

    // Delta Calculator Elements
    const deltaSunVal = document.getElementById('deltaSunVal');
    const deltaShadeVal = document.getElementById('deltaShadeVal');
    const deltaResultVal = document.getElementById('deltaResultVal');
    const coolingSummaryPill = document.getElementById('coolingSummaryPill');

    // Form Elements
    const thermalLoggerForm = document.getElementById('thermalLoggerForm');
    const logTeamName = document.getElementById('logTeamName');
    const logSurfaceSelect = document.getElementById('logSurfaceSelect');
    const logSunTemp = document.getElementById('logSunTemp');
    const logShadeTemp = document.getElementById('logShadeTemp');
    const logNotes = document.getElementById('logNotes');
    const logSuccessStamp = document.getElementById('logSuccessStamp');

    const focusOverlay = document.getElementById('focusOverlay');
    const focusContainer = document.getElementById('focusContainer');
    const closeFocusBtn = document.getElementById('closeFocusBtn');

    let activeCampusId = 'donna_rivas';
    let isOfficialDoc = false;
    let activeSurfaceName = 'Black Asphalt Pavement';
    let currentSunTemp = 138.4;
    let currentShadeTemp = 92.1;

    // 1. Campus Scoping Engine
    function resolveInitialCampus() {
        const urlParams = new URLSearchParams(window.location.search);
        const paramCampus = urlParams.get('campus');
        if (paramCampus && campusDirectory[paramCampus]) return paramCampus;
        const savedCampus = localStorage.getItem('ttfs_active_campus_id');
        if (savedCampus && campusDirectory[savedCampus]) return savedCampus;
        return 'donna_rivas';
    }

    function setActiveCampus(campusId, updateUrl = true) {
        if (!campusDirectory[campusId]) campusId = 'donna_rivas';
        activeCampusId = campusId;
        localStorage.setItem('ttfs_active_campus_id', campusId);

        const info = campusDirectory[campusId];
        if (campusSelectDropdown) campusSelectDropdown.value = campusId;
        if (bannerCampusLabel) bannerCampusLabel.textContent = `${info.district} — ${info.short}`;
        if (bannerDistrictTag) bannerDistrictTag.textContent = info.district;
        if (docActiveCampusName) docActiveCampusName.textContent = `${info.district} — ${info.name}`;
        if (clipboardScopeTag) clipboardScopeTag.textContent = `Logging for: ${info.short}`;
        if (tableCampusHeader) tableCampusHeader.textContent = `${info.short} Thermal Ledger`;

        if (updateUrl) {
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('campus', campusId);
            window.history.replaceState({}, '', newUrl);
        }

        renderCampusObservations();
    }

    function getCampusStorageKey(campusId) {
        return `ttfs_ir_temp_logs_${campusId}`;
    }

    function loadCampusLogs(campusId) {
        const key = getCampusStorageKey(campusId);
        try {
            const saved = localStorage.getItem(key);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.warn('Storage read error:', e);
        }

        if (baselineThermalObservations[campusId]) {
            return baselineThermalObservations[campusId];
        }

        return [
            { team: 'Team Eco-Scouts', surface: 'Black Asphalt', sunTemp: 138.4, shadeTemp: 92.1, delta: -46.3, notes: 'Schoolyard baseline' },
            { team: 'Team Green', surface: 'Turfgrass Lawn', sunTemp: 104.0, shadeTemp: 84.5, delta: -19.5, notes: 'Tree canopy shade' }
        ];
    }

    function saveCampusLog(campusId, entry) {
        const logs = loadCampusLogs(campusId);
        logs.unshift(entry);
        try {
            localStorage.setItem(getCampusStorageKey(campusId), JSON.stringify(logs));
        } catch (e) {
            console.warn('Storage write error:', e);
        }
    }

    function renderCampusObservations() {
        if (!thermalTableBody) return;
        const logs = loadCampusLogs(activeCampusId);
        thermalTableBody.innerHTML = logs.map(entry => `
            <tr>
                <td><strong>${entry.team || 'Class Team'}</strong></td>
                <td>${entry.surface}</td>
                <td style="color:#dc2626; font-weight:bold;">${entry.sunTemp}°F</td>
                <td style="color:#16a34a; font-weight:bold;">${entry.shadeTemp}°F</td>
                <td style="color:#0284c7; font-weight:bold;">${entry.delta < 0 ? '' : '−'}${Math.abs(entry.delta)}°F</td>
            </tr>
        `).join('');
    }

    if (campusSelectDropdown) {
        campusSelectDropdown.addEventListener('change', (e) => {
            setActiveCampus(e.target.value, true);
        });
    }

    // 2. Web Audio IR Beep Generator
    const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

    function playLaserBeep() {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.setValueAtTime(2400, now + 0.05);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
    }

    // 3. Thermal Spectrum Needle Calculation
    function updateThermalNeedle(tempF) {
        // Range 70°F to 150°F
        const minT = 70;
        const maxT = 150;
        const clamped = Math.max(minT, Math.min(maxT, tempF));
        const pct = ((clamped - minT) / (maxT - minT)) * 100;
        if (spectrumNeedle) {
            spectrumNeedle.style.left = `${pct.toFixed(1)}%`;
        }
    }

    // 4. Update Delta Display
    function updateDeltaMath(sunT, shadeT, surfName) {
        const delta = (sunT - shadeT).toFixed(1);
        const pctDrop = (((sunT - shadeT) / sunT) * 100).toFixed(0);

        if (deltaSunVal) deltaSunVal.textContent = `${sunT.toFixed(1)}°F`;
        if (deltaShadeVal) deltaShadeVal.textContent = `${shadeT.toFixed(1)}°F`;
        if (deltaResultVal) deltaResultVal.textContent = `−${delta}°F`;

        if (coolingSummaryPill) {
            coolingSummaryPill.innerHTML = `🌲 Tree canopy cools <strong>${surfName}</strong> by <strong>${delta}°F (${pctDrop}% heat reduction)</strong>!`;
        }

        // Sync to form inputs
        if (logSunTemp) logSunTemp.value = sunT.toFixed(1);
        if (logShadeTemp) logShadeTemp.value = shadeT.toFixed(1);
    }

    // 5. Target Card Selection
    targetCards.forEach(card => {
        card.addEventListener('click', () => {
            targetCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            activeSurfaceName = card.getAttribute('data-name');
            currentSunTemp = parseFloat(card.getAttribute('data-sun-temp'));
            currentShadeTemp = parseFloat(card.getAttribute('data-shade-temp'));

            triggerGunReadout(currentSunTemp, activeSurfaceName);
            updateDeltaMath(currentSunTemp, currentShadeTemp, activeSurfaceName);
        });
    });

    // 6. Pull Trigger Action
    function triggerGunReadout(tempF, targetName) {
        playLaserBeep();

        if (lcdHoldTag) {
            lcdHoldTag.textContent = 'SCAN';
            lcdHoldTag.style.background = '#ef4444';
            setTimeout(() => {
                lcdHoldTag.textContent = 'HOLD';
                lcdHoldTag.style.background = '#22c55e';
            }, 300);
        }

        // Small jitter for realistic sensor fluctuation (+-0.2F)
        const jitter = (Math.random() * 0.4 - 0.2);
        const finalTemp = (tempF + jitter).toFixed(1);

        if (lcdTempDigits) lcdTempDigits.textContent = finalTemp;
        if (lcdTargetLabel) lcdTargetLabel.textContent = `Target: ${targetName} (Full Sun)`;

        updateThermalNeedle(parseFloat(finalTemp));
    }

    if (pullTriggerBtn) {
        pullTriggerBtn.addEventListener('click', () => {
            triggerGunReadout(currentSunTemp, activeSurfaceName);
        });
    }

    // 7. Thermal Form Submission
    if (thermalLoggerForm) {
        thermalLoggerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const team = logTeamName.value.trim() || 'Thermal Detectives';
            const surface = logSurfaceSelect.value;
            const sunT = parseFloat(logSunTemp.value) || currentSunTemp;
            const shadeT = parseFloat(logShadeTemp.value) || currentShadeTemp;
            const delta = parseFloat((shadeT - sunT).toFixed(1)); // negative indicates cooling
            const notes = logNotes.value.trim() || 'Field observation';

            const entry = {
                team,
                surface,
                sunTemp: sunT.toFixed(1),
                shadeTemp: shadeT.toFixed(1),
                delta: delta,
                notes
            };

            saveCampusLog(activeCampusId, entry);
            renderCampusObservations();

            if (logSuccessStamp) {
                const info = campusDirectory[activeCampusId];
                logSuccessStamp.textContent = `✓ LOGGED TO ${info.short.toUpperCase()} THERMAL LEDGER!`;
                logSuccessStamp.classList.remove('hidden');
                setTimeout(() => {
                    logSuccessStamp.classList.add('hidden');
                }, 3500);
            }

            logNotes.value = '';
        });
    }

    // 8. Dual-Mode Switch Toggle
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            isOfficialDoc = !isOfficialDoc;
            if (isOfficialDoc) {
                switchToggle.classList.remove('up');
                switchToggle.classList.add('down');
                officialDoc.classList.remove('hidden');
                redesignBoard.classList.add('hidden');
                if (stringLayer) stringLayer.classList.add('hidden');
            } else {
                switchToggle.classList.remove('down');
                switchToggle.classList.add('up');
                officialDoc.classList.add('hidden');
                redesignBoard.classList.remove('hidden');
                if (stringLayer) stringLayer.classList.remove('hidden');
            }
        });
    }

    // 9. Print Action
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const wasDoc = isOfficialDoc;
            if (!wasDoc) {
                officialDoc.classList.remove('hidden');
                redesignBoard.classList.add('hidden');
            }
            setTimeout(() => {
                window.print();
                if (!wasDoc) {
                    officialDoc.classList.add('hidden');
                    redesignBoard.classList.remove('hidden');
                }
            }, 150);
        });
    }

    // 10. Click to Focus/Enlarge Pinned Cards
    const expandableCards = document.querySelectorAll('.pinned-card[data-expandable="true"]');
    expandableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (['BUTTON', 'INPUT', 'SELECT', 'A'].includes(e.target.tagName)) return;
            
            focusContainer.innerHTML = '';
            const clone = card.cloneNode(true);
            clone.style.transform = 'none';
            clone.style.position = 'relative';
            clone.style.margin = '0 auto';
            focusContainer.appendChild(clone);
            focusOverlay.classList.remove('hidden');
        });
    });

    if (closeFocusBtn) {
        closeFocusBtn.addEventListener('click', () => {
            focusOverlay.classList.add('hidden');
            focusContainer.innerHTML = '';
        });
    }
    focusOverlay.addEventListener('click', (e) => {
        if (e.target === focusOverlay) {
            focusOverlay.classList.add('hidden');
            focusContainer.innerHTML = '';
        }
    });

    // Initialize Active Campus & Needle
    const initialCampus = resolveInitialCampus();
    setActiveCampus(initialCampus, false);
    updateThermalNeedle(currentSunTemp);
    updateDeltaMath(currentSunTemp, currentShadeTemp, activeSurfaceName);
});
