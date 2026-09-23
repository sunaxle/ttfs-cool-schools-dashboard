/**
 * Ranger Station Bulletin Board Logic
 * Multi-Campus Scoped & Open Media Integration
 */

document.addEventListener('DOMContentLoaded', () => {
    // Campus Catalog
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

    // Pre-seeded baseline observations per campus
    const baselineCampusObservations = {
        'donna_rivas': [
            { classroom: 'Room 204 (Scouts)', species: 'Plain Chachalaca', count: 4, tallyStr: '||||', date: '09/16', action: 'Calling in canopy', notes: 'Eating hackberries' },
            { classroom: 'Room 301 (Gomez)', species: 'Great Kiskadee', count: 2, tallyStr: '||', date: '09/16', action: 'Perching', notes: 'Grasshopper hunt' },
            { classroom: 'Room 105 (Rios)', species: 'Green Jay', count: 3, tallyStr: '|||', date: '09/14', action: 'Foraging', notes: 'Under live oak' },
            { classroom: 'Team Monarch', species: 'Ladybug Beetle', count: 6, tallyStr: '|||| |', date: '09/16', action: 'Crawling', notes: 'Aphid check' }
        ],
        'donna_caceres': [
            { classroom: 'Room 402 (Eco-Scouts)', species: 'Green Jay', count: 5, tallyStr: '||||', date: '09/17', action: 'Acorn caching', notes: 'Near mesquite cluster' },
            { classroom: 'Room 101 (Flores)', species: 'Golden-fronted Woodpecker', count: 2, tallyStr: '||', date: '09/15', action: 'Pecking trunk', notes: 'Sugar Hackberry' },
            { classroom: 'Room 205 (Nature Team)', species: 'Plain Chachalaca', count: 3, tallyStr: '|||', date: '09/12', action: 'Morning chorus', notes: 'Thicket habitat' }
        ],
        'mercedes_travis': [
            { classroom: 'Room 303 (Tigers)', species: 'Great Kiskadee', count: 3, tallyStr: '|||', date: '09/18', action: 'Singing', notes: 'Schoolyard flagpole tree' },
            { classroom: 'Room 201 (Forestry)', species: 'Plain Chachalaca', count: 2, tallyStr: '||', date: '09/17', action: 'Eating seeds', notes: 'Ebony tree canopy' },
            { classroom: 'Room 404 (BioBlitz)', species: 'Monarch Butterfly', count: 4, tallyStr: '||||', date: '09/15', action: 'Nectar feeding', notes: 'Pollinator garden' }
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
    const bulletinTableBody = document.getElementById('bulletinTableBody');

    const modeToggle = document.getElementById('modeToggle');
    const switchToggle = document.getElementById('switchToggle');
    const officialDoc = document.getElementById('officialDoc');
    const redesignBoard = document.getElementById('redesignBoard');
    const stringLayer = document.getElementById('stringLayer');
    const printBtn = document.getElementById('printBtn');
    
    const logClassroomName = document.getElementById('logClassroomName');
    const logSpeciesInput = document.getElementById('logSpecies');
    const logCountVal = document.getElementById('logCountVal');
    const btnCountDec = document.getElementById('btnCountDec');
    const btnCountInc = document.getElementById('btnCountInc');
    const logCategory = document.getElementById('logCategory');
    const logActions = document.getElementById('logActions');
    const loggerForm = document.getElementById('loggerForm');
    const logSuccessStamp = document.getElementById('logSuccessStamp');

    const focusOverlay = document.getElementById('focusOverlay');
    const focusContainer = document.getElementById('focusContainer');
    const closeFocusBtn = document.getElementById('closeFocusBtn');

    let currentCount = 1;
    let isOfficialDoc = false;
    let activeCampusId = 'donna_rivas';

    // 1. Resolve Active Campus (URL Parameter -> LocalStorage -> Default)
    function resolveInitialCampus() {
        const urlParams = new URLSearchParams(window.location.search);
        const paramCampus = urlParams.get('campus');
        if (paramCampus && campusDirectory[paramCampus]) {
            return paramCampus;
        }
        const savedCampus = localStorage.getItem('ttfs_active_campus_id');
        if (savedCampus && campusDirectory[savedCampus]) {
            return savedCampus;
        }
        return 'donna_rivas';
    }

    function setActiveCampus(campusId, updateUrl = true) {
        if (!campusDirectory[campusId]) campusId = 'donna_rivas';
        activeCampusId = campusId;
        localStorage.setItem('ttfs_active_campus_id', campusId);

        const info = campusDirectory[campusId];
        
        // Update UI Badges
        if (campusSelectDropdown) campusSelectDropdown.value = campusId;
        if (bannerCampusLabel) bannerCampusLabel.textContent = `${info.district} — ${info.short}`;
        if (bannerDistrictTag) bannerDistrictTag.textContent = info.district;
        if (docActiveCampusName) docActiveCampusName.textContent = `${info.district} — ${info.name}`;
        if (clipboardScopeTag) clipboardScopeTag.textContent = `Logging for: ${info.short}`;
        if (tableCampusHeader) tableCampusHeader.textContent = `${info.short} Observation Tally`;

        // Update URL query string without reloading page
        if (updateUrl) {
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('campus', campusId);
            window.history.replaceState({}, '', newUrl);
        }

        // Hydrate observation table for this campus
        renderCampusObservations();
    }

    // 2. Campus-Scoped Storage & Hydration
    function getCampusStorageKey(campusId) {
        return `ttfs_bulletin_logs_${campusId}`;
    }

    function loadCampusLogs(campusId) {
        const key = getCampusStorageKey(campusId);
        try {
            const saved = localStorage.getItem(key);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.warn('Storage read error:', e);
        }

        // Fallback to pre-seeded baseline
        if (baselineCampusObservations[campusId]) {
            return baselineCampusObservations[campusId];
        }

        // Generic default seed
        const genericSeed = [
            { classroom: 'Team Monarch', species: 'Plain Chachalaca', count: 2, tallyStr: '||', date: '09/15', action: 'Perching', notes: 'Native tree canopy' },
            { classroom: 'Team Ocelot', species: 'Great Kiskadee', count: 1, tallyStr: '|', date: '09/16', action: 'Singing', notes: 'Schoolyard boundary' }
        ];
        return genericSeed;
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
        if (!bulletinTableBody) return;
        const logs = loadCampusLogs(activeCampusId);
        bulletinTableBody.innerHTML = logs.map(entry => `
            <tr>
                <td><strong>${entry.classroom || 'Class Team'}</strong></td>
                <td>${entry.species}</td>
                <td><span class="tally-marks">${entry.tallyStr}</span> (${entry.count})</td>
                <td>${entry.date}</td>
                <td>${entry.action || 'Observing'}${entry.notes ? ` • <em>${entry.notes}</em>` : ''}</td>
            </tr>
        `).join('');
    }

    if (campusSelectDropdown) {
        campusSelectDropdown.addEventListener('change', (e) => {
            setActiveCampus(e.target.value, true);
        });
    }

    // 3. Dual-Mode Switch Toggle (Light Switch)
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

    // 4. Print Pin Action (8.5x11 Clean View)
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

    // 5. Bird Sound Synthesizer (Web Audio API Fallback)
    const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

    function playBirdSound(birdKey) {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;

        if (birdKey === 'chachalaca') {
            // Raucous 3-syllable coarse pulse "Cha-cha-lac!"
            for (let i = 0; i < 3; i++) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(450 + i * 120, now + i * 0.16);
                osc.frequency.exponentialRampToValueAtTime(280, now + i * 0.16 + 0.12);
                
                gain.gain.setValueAtTime(0.25, now + i * 0.16);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.16 + 0.14);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + i * 0.16);
                osc.stop(now + i * 0.16 + 0.15);
            }
        } else if (birdKey === 'kiskadee') {
            // "Kis - ka - DEEE!" pattern
            const freqs = [1200, 1050, 1550];
            const durations = [0.12, 0.1, 0.28];
            let t = now;
            freqs.forEach((f, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, t);
                if (idx === 2) {
                    osc.frequency.exponentialRampToValueAtTime(1300, t + durations[idx]);
                }
                gain.gain.setValueAtTime(0.3, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + durations[idx]);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(t);
                osc.stop(t + durations[idx]);
                t += durations[idx] + 0.05;
            });
        } else if (birdKey === 'greenjay') {
            // High-pitched bright chatter
            for (let i = 0; i < 4; i++) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2200 + (i % 2) * 400, now + i * 0.08);
                osc.frequency.exponentialRampToValueAtTime(1600, now + i * 0.08 + 0.06);

                gain.gain.setValueAtTime(0.22, now + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.07);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.07);
            }
        } else if (birdKey === 'woodpecker') {
            // Rolling tap / rattle
            for (let i = 0; i < 6; i++) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(800, now + i * 0.04);
                gain.gain.setValueAtTime(0.18, now + i * 0.04);
                gain.gain.exponentialRampToValueAtTime(0.005, now + i * 0.04 + 0.03);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + i * 0.04);
                osc.stop(now + i * 0.04 + 0.035);
            }
        }
    }

    const soundBtns = document.querySelectorAll('.radio-sound-btn');
    soundBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const soundKey = btn.getAttribute('data-sound');
            playBirdSound(soundKey);
        });
    });

    // 6. Tally Counter Controls
    if (btnCountDec) {
        btnCountDec.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentCount > 1) {
                currentCount--;
                logCountVal.textContent = currentCount;
            }
        });
    }
    if (btnCountInc) {
        btnCountInc.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentCount < 100) {
                currentCount++;
                logCountVal.textContent = currentCount;
            }
        });
    }

    function formatTallyMarks(num) {
        let res = '';
        let rem = num;
        while (rem >= 5) {
            res += '|||| ';
            rem -= 5;
        }
        if (rem > 0) {
            res += '|'.repeat(rem);
        }
        return res.trim();
    }

    // 7. Logger Form Submission (Scoped to Active Campus)
    if (loggerForm) {
        loggerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const classroom = logClassroomName.value.trim() || 'Classroom Team';
            const species = logSpeciesInput.value.trim();
            const count = currentCount;
            const category = logCategory.value;
            const action = logActions.value.trim() || 'Observing';
            const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
            const tallyStr = formatTallyMarks(count);

            const entry = {
                classroom,
                species,
                count,
                tallyStr,
                date: today,
                action,
                notes: `${category} sighting`
            };

            // Save to active campus
            saveCampusLog(activeCampusId, entry);

            // Re-render table
            renderCampusObservations();

            // Show success stamp
            if (logSuccessStamp) {
                const info = campusDirectory[activeCampusId];
                logSuccessStamp.textContent = `✓ LOGGED TO ${info.short.toUpperCase()} LEDGER!`;
                logSuccessStamp.classList.remove('hidden');
                setTimeout(() => {
                    logSuccessStamp.classList.add('hidden');
                }, 3500);
            }

            // Reset inputs
            logSpeciesInput.value = '';
            logActions.value = '';
            currentCount = 1;
            logCountVal.textContent = '1';
        });
    }

    // 8. Click to Focus/Enlarge Pinned Cards
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

            const cloneSoundBtns = clone.querySelectorAll('.radio-sound-btn');
            cloneSoundBtns.forEach(b => {
                b.addEventListener('click', () => {
                    const sound = b.getAttribute('data-sound');
                    playBirdSound(sound);
                });
            });
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

    // Initialize Campus on load
    const initialCampus = resolveInitialCampus();
    setActiveCampus(initialCampus, false);
});
