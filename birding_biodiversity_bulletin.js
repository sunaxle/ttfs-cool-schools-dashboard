/**
 * Schoolyard Living Ecosystem & Tree Stewardship Bulletin Board Logic
 * Unified Biodiversity Scout + Tree Health Tracker
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

    // Pre-seeded baseline observations per campus
    const baselineBirdObservations = {
        'donna_rivas': [
            { classroom: 'Room 204 (Scouts)', species: 'Plain Chachalaca', count: 4, tallyStr: '||||', date: '09/16', notes: 'Calling in live oak canopy' },
            { classroom: 'Room 301 (Gomez)', species: 'Great Kiskadee', count: 2, tallyStr: '||', date: '09/16', notes: 'Perched on flagpole branch' },
            { classroom: 'Room 105 (Rios)', species: 'Green Jay', count: 3, tallyStr: '|||', date: '09/14', notes: 'Caching acorns under mulch' },
            { classroom: 'Team Monarch', species: 'Ladybug / Beetle', count: 6, tallyStr: '|||| |', date: '09/16', notes: 'Aphid check on leaves' }
        ],
        'donna_caceres': [
            { classroom: 'Room 402 (Eco-Scouts)', species: 'Green Jay', count: 5, tallyStr: '||||', date: '09/17', notes: 'Near mesquite cluster' },
            { classroom: 'Room 101 (Flores)', species: 'Golden-fronted Woodpecker', count: 2, tallyStr: '||', date: '09/15', notes: 'Pecking hackberry bark' }
        ],
        'mercedes_travis': [
            { classroom: 'Room 303 (Tigers)', species: 'Great Kiskadee', count: 3, tallyStr: '|||', date: '09/18', notes: 'Schoolyard boundary' },
            { classroom: 'Room 201 (Forestry)', species: 'Plain Chachalaca', count: 2, tallyStr: '||', date: '09/17', notes: 'Ebony tree canopy' }
        ]
    };

    const baselineTreeObservations = {
        'donna_rivas': [
            { nickname: 'The Montezuma King', classroom: 'Room 301', species: 'Montezuma Cypress', dbh: 3.4, height: 8.5, health: 'Good', moisture: 'Damp & Well-Mulched', date: '09/16' },
            { nickname: 'Shadow Maker', classroom: 'Room 204', species: 'Texas Ebony', dbh: 2.8, height: 6.2, health: 'Good', moisture: 'Damp & Well-Mulched', date: '09/16' },
            { nickname: 'Sunny Live Oak', classroom: 'Room 105', species: 'Escarpment Live Oak', dbh: 4.1, height: 11.0, health: 'Medium', moisture: 'Dry / Needs Watering', date: '09/14' }
        ],
        'donna_caceres': [
            { nickname: 'Discovery Cypress', classroom: 'Room 402', species: 'Montezuma Cypress', dbh: 3.6, height: 9.0, health: 'Good', moisture: 'Damp & Well-Mulched', date: '09/17' },
            { nickname: 'Hackberry Haven', classroom: 'Room 101', species: 'Sugar Hackberry', dbh: 4.8, height: 13.5, health: 'Good', moisture: 'Damp & Well-Mulched', date: '09/15' }
        ],
        'mercedes_travis': [
            { nickname: 'Tiger Ebony #1', classroom: 'Room 303', species: 'Texas Ebony', dbh: 3.1, height: 7.2, health: 'Good', moisture: 'Damp & Well-Mulched', date: '09/18' },
            { nickname: 'Courtyard Live Oak', classroom: 'Room 201', species: 'Escarpment Live Oak', dbh: 5.2, height: 14.0, health: 'Good', moisture: 'Damp & Well-Mulched', date: '09/17' }
        ]
    };

    // DOM Elements
    const campusSelectDropdown = document.getElementById('campusSelectDropdown');
    const bannerCampusLabel = document.getElementById('bannerCampusLabel');
    const bannerDistrictTag = document.getElementById('bannerDistrictTag');
    const docActiveCampusName = document.getElementById('docActiveCampusName');
    
    const birdScopeTag = document.getElementById('birdScopeTag');
    const birdTableCampusHeader = document.getElementById('birdTableCampusHeader');
    const bulletinTableBody = document.getElementById('bulletinTableBody');

    const btnBigBlueBird = document.getElementById('btnBigBlueBird');
    const generalBirdTotalBadge = document.getElementById('generalBirdTotalBadge');

    const treeScopeTag = document.getElementById('treeScopeTag');
    const treeTableCampusHeader = document.getElementById('treeTableCampusHeader');
    const treeTableBody = document.getElementById('treeTableBody');

    const modeToggle = document.getElementById('modeToggle');
    const switchToggle = document.getElementById('switchToggle');
    const officialDoc = document.getElementById('officialDoc');
    const redesignBoard = document.getElementById('redesignBoard');
    const stringLayer = document.getElementById('stringLayer');
    const printBtn = document.getElementById('printBtn');

    // BioBlitz Form Elements
    const bioblitzForm = document.getElementById('bioblitzForm');
    const logTeamName = document.getElementById('logTeamName');
    const logSpeciesSelect = document.getElementById('logSpeciesSelect');
    const logCountVal = document.getElementById('logCountVal');
    const btnCountDec = document.getElementById('btnCountDec');
    const btnCountInc = document.getElementById('btnCountInc');
    const logActions = document.getElementById('logActions');
    const birdSuccessStamp = document.getElementById('birdSuccessStamp');

    // Tree Stewardship Form Elements
    const treeStewardshipForm = document.getElementById('treeStewardshipForm');
    const treeNicknameInput = document.getElementById('treeNicknameInput');
    const treeClassroomInput = document.getElementById('treeClassroomInput');
    const treeSpeciesSelect = document.getElementById('treeSpeciesSelect');
    const treeDbhInput = document.getElementById('treeDbhInput');
    const treeHeightInput = document.getElementById('treeHeightInput');
    const treeMoistureSelect = document.getElementById('treeMoistureSelect');
    const treeSuccessStamp = document.getElementById('treeSuccessStamp');

    // Quick Counters on Bird Cards
    const quickCounters = {
        'Plain Chachalaca': document.getElementById('count_chachalaca'),
        'Great Kiskadee': document.getElementById('count_kiskadee'),
        'Green Jay': document.getElementById('count_greenjay'),
        'Golden-fronted Woodpecker': document.getElementById('count_woodpecker')
    };

    let activeCampusId = 'donna_rivas';
    let isOfficialDoc = false;
    let bioblitzCount = 1;

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
        
        if (birdScopeTag) birdScopeTag.textContent = `Logging for: ${info.short}`;
        if (birdTableCampusHeader) birdTableCampusHeader.textContent = `${info.short} Observation Tally`;

        if (treeScopeTag) treeScopeTag.textContent = `Adopted Tree for: ${info.short}`;
        if (treeTableCampusHeader) treeTableCampusHeader.textContent = `${info.short} Tree Stewardship Ledger`;

        if (updateUrl) {
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('campus', campusId);
            window.history.replaceState({}, '', newUrl);
        }

        renderBirdObservations();
        renderTreeObservations();
        updateBirdCardCounts();
    }

    if (campusSelectDropdown) {
        campusSelectDropdown.addEventListener('change', (e) => {
            setActiveCampus(e.target.value, true);
        });
    }

    // 2. Bird Observations Engine
    function getBirdStorageKey(campusId) { return `ttfs_bulletin_logs_${campusId}`; }

    function loadBirdLogs(campusId) {
        try {
            const saved = localStorage.getItem(getBirdStorageKey(campusId));
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.warn(e);
        }
        if (baselineBirdObservations[campusId]) return baselineBirdObservations[campusId];
        return [
            { classroom: 'Team Monarch', species: 'Plain Chachalaca', count: 2, tallyStr: '||', date: '09/15', notes: 'Native canopy' }
        ];
    }

    function saveBirdLog(campusId, entry) {
        const logs = loadBirdLogs(campusId);
        logs.unshift(entry);
        try {
            localStorage.setItem(getBirdStorageKey(campusId), JSON.stringify(logs));
        } catch (e) {
            console.warn(e);
        }
    }

    function formatTallyMarks(num) {
        let res = '';
        let rem = num;
        while (rem >= 5) { res += '|||| '; rem -= 5; }
        if (rem > 0) res += '|'.repeat(rem);
        return res.trim();
    }

    function renderBirdObservations() {
        if (!bulletinTableBody) return;
        const logs = loadBirdLogs(activeCampusId);
        bulletinTableBody.innerHTML = logs.map(entry => `
            <tr>
                <td><strong>${entry.classroom || 'Scout Team'}</strong></td>
                <td>${entry.species}</td>
                <td><span class="tally-marks">${entry.tallyStr}</span> (${entry.count})</td>
                <td>${entry.date}</td>
                <td>${entry.notes || 'Observing'}</td>
            </tr>
        `).join('');
    }

    function updateBirdCardCounts() {
        const logs = loadBirdLogs(activeCampusId);
        const totals = {
            'Plain Chachalaca': 0,
            'Great Kiskadee': 0,
            'Green Jay': 0,
            'Golden-fronted Woodpecker': 0
        };

        let totalBirdSightings = 0;

        logs.forEach(l => {
            const countNum = parseInt(l.count) || 1;
            if (totals[l.species] !== undefined) {
                totals[l.species] += countNum;
            }
            // Count towards overall bird total if species is avian
            const isAvian = ['General Bird Sighting', 'Plain Chachalaca', 'Great Kiskadee', 'Green Jay', 'Golden-fronted Woodpecker', 'Buff-bellied Hummingbird'].includes(l.species) || (l.species && l.species.toLowerCase().includes('bird'));
            if (isAvian) {
                totalBirdSightings += countNum;
            }
        });

        Object.keys(quickCounters).forEach(sp => {
            if (quickCounters[sp]) {
                quickCounters[sp].textContent = totals[sp] || 0;
            }
        });

        if (generalBirdTotalBadge) {
            generalBirdTotalBadge.textContent = totalBirdSightings;
        }
    }

    // Big Blue Bird Counter Button (+1 Bird)
    if (btnBigBlueBird) {
        btnBigBlueBird.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Audio chirp
            playBirdSound('kiskadee');

            // Visual bounce feedback
            btnBigBlueBird.classList.add('active-pulse');
            setTimeout(() => btnBigBlueBird.classList.remove('active-pulse'), 300);

            const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
            const entry = {
                classroom: '4th Grade Quick Scout',
                species: 'General Bird Sighting',
                count: 1,
                tallyStr: '|',
                date: today,
                notes: '⚡ Quick tap from lab counter button'
            };

            saveBirdLog(activeCampusId, entry);
            renderBirdObservations();
            updateBirdCardCounts();

            if (birdSuccessStamp) {
                const info = campusDirectory[activeCampusId];
                birdSuccessStamp.textContent = `✓ +1 BIRD RECORDED FOR ${info.short.toUpperCase()}!`;
                birdSuccessStamp.classList.remove('hidden');
                setTimeout(() => birdSuccessStamp.classList.add('hidden'), 2500);
            }
        });
    }

    // Quick Counters (+ / -) on Bird Cards
    document.querySelectorAll('.btn-tally-step').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const species = btn.getAttribute('data-species');
            const isInc = btn.classList.contains('btn-inc');
            const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

            if (isInc) {
                const entry = {
                    classroom: 'Quick Scout Tally',
                    species: species,
                    count: 1,
                    tallyStr: '|',
                    date: today,
                    notes: 'Quick sighting from bulletin board'
                };
                saveBirdLog(activeCampusId, entry);
                renderBirdObservations();
                updateBirdCardCounts();
            } else {
                // Remove one instance of this species from current logs
                const logs = loadBirdLogs(activeCampusId);
                const idx = logs.findIndex(l => l.species === species);
                if (idx !== -1) {
                    if (logs[idx].count > 1) {
                        logs[idx].count--;
                        logs[idx].tallyStr = formatTallyMarks(logs[idx].count);
                    } else {
                        logs.splice(idx, 1);
                    }
                    localStorage.setItem(getBirdStorageKey(activeCampusId), JSON.stringify(logs));
                    renderBirdObservations();
                    updateBirdCardCounts();
                }
            }
        });
    });

    // BioBlitz Form Submission
    if (btnCountDec) {
        btnCountDec.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bioblitzCount > 1) {
                bioblitzCount--;
                logCountVal.textContent = bioblitzCount;
            }
        });
    }
    if (btnCountInc) {
        btnCountInc.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bioblitzCount < 50) {
                bioblitzCount++;
                logCountVal.textContent = bioblitzCount;
            }
        });
    }

    if (bioblitzForm) {
        bioblitzForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const classroom = logTeamName.value.trim() || 'Classroom Team';
            const species = logSpeciesSelect.value;
            const count = bioblitzCount;
            const action = logActions.value.trim() || 'Foraging / Perching';
            const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
            const tallyStr = formatTallyMarks(count);

            const entry = {
                classroom,
                species,
                count,
                tallyStr,
                date: today,
                notes: action
            };

            saveBirdLog(activeCampusId, entry);
            renderBirdObservations();
            updateBirdCardCounts();

            if (birdSuccessStamp) {
                const info = campusDirectory[activeCampusId];
                birdSuccessStamp.textContent = `✓ LOGGED TO ${info.short.toUpperCase()} LEDGER!`;
                birdSuccessStamp.classList.remove('hidden');
                setTimeout(() => birdSuccessStamp.classList.add('hidden'), 3500);
            }

            logActions.value = '';
            bioblitzCount = 1;
            logCountVal.textContent = '1';
        });
    }

    // 3. Tree Stewardship Engine
    function getTreeStorageKey(campusId) { return `ttfs_tree_stewardship_logs_${campusId}`; }

    function loadTreeLogs(campusId) {
        try {
            const saved = localStorage.getItem(getTreeStorageKey(campusId));
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.warn(e);
        }
        if (baselineTreeObservations[campusId]) return baselineTreeObservations[campusId];
        return [
            { nickname: 'Campus Tree #1', classroom: 'Room 201', species: 'Montezuma Cypress', dbh: 3.2, height: 7.8, health: 'Good', moisture: 'Damp & Well-Mulched', date: '09/16' }
        ];
    }

    function saveTreeLog(campusId, entry) {
        const logs = loadTreeLogs(campusId);
        logs.unshift(entry);
        try {
            localStorage.setItem(getTreeStorageKey(campusId), JSON.stringify(logs));
        } catch (e) {
            console.warn(e);
        }
    }

    function renderTreeObservations() {
        if (!treeTableBody) return;
        const logs = loadTreeLogs(activeCampusId);
        treeTableBody.innerHTML = logs.map(entry => {
            let healthBadge = '😊 Good';
            if (entry.health === 'Medium') healthBadge = '😐 Fair';
            if (entry.health === 'Bad') healthBadge = '😟 Stressed';

            return `
                <tr>
                    <td><strong>${entry.nickname}</strong><br><small style="color:#64748b;">${entry.classroom}</small></td>
                    <td>${entry.species}</td>
                    <td>${entry.dbh}" / ${entry.height}'</td>
                    <td><strong>${healthBadge}</strong></td>
                    <td>${entry.moisture}</td>
                    <td>${entry.date}</td>
                </tr>
            `;
        }).join('');
    }

    if (treeStewardshipForm) {
        treeStewardshipForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nickname = treeNicknameInput.value.trim();
            const classroom = treeClassroomInput.value.trim();
            const species = treeSpeciesSelect.value;
            const dbh = parseFloat(treeDbhInput.value) || 3.0;
            const height = parseFloat(treeHeightInput.value) || 8.0;
            const moisture = treeMoistureSelect.value;
            const healthRadio = document.querySelector('input[name="treeHealthRadio"]:checked');
            const health = healthRadio ? healthRadio.value : 'Good';
            const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

            const entry = {
                nickname,
                classroom,
                species,
                dbh,
                height,
                health,
                moisture,
                date: today
            };

            saveTreeLog(activeCampusId, entry);
            renderTreeObservations();

            if (treeSuccessStamp) {
                const info = campusDirectory[activeCampusId];
                treeSuccessStamp.textContent = `✓ TREE HEALTH LOGGED FOR ${info.short.toUpperCase()}!`;
                treeSuccessStamp.classList.remove('hidden');
                setTimeout(() => treeSuccessStamp.classList.add('hidden'), 3500);
            }
        });
    }

    // 4. Web Audio Synthesizer Bird Calls
    const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

    function playBirdSound(birdKey) {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const now = audioCtx.currentTime;

        if (birdKey === 'chachalaca') {
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
            const freqs = [1200, 1050, 1550];
            const durations = [0.12, 0.1, 0.28];
            let t = now;
            freqs.forEach((f, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, t);
                if (idx === 2) osc.frequency.exponentialRampToValueAtTime(1300, t + durations[idx]);
                gain.gain.setValueAtTime(0.3, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + durations[idx]);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(t);
                osc.stop(t + durations[idx]);
                t += durations[idx] + 0.05;
            });
        } else if (birdKey === 'greenjay') {
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

    document.querySelectorAll('.mini-sound-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const soundKey = btn.getAttribute('data-sound');
            playBirdSound(soundKey);
        });
    });

    // 5. Dual-Mode Switch Toggle
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

    // 6. Print Pin Action
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

    // Initialize Campus & Tables on load
    const initialCampus = resolveInitialCampus();
    setActiveCampus(initialCampus, false);
});
