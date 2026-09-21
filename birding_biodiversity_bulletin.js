/**
 * Ranger Station Bulletin Board Logic
 * Birding & Biodiversity Field Lab
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const modeToggle = document.getElementById('modeToggle');
    const switchToggle = document.getElementById('switchToggle');
    const officialDoc = document.getElementById('officialDoc');
    const redesignBoard = document.getElementById('redesignBoard');
    const stringLayer = document.getElementById('stringLayer');
    const printBtn = document.getElementById('printBtn');
    
    const logSpeciesInput = document.getElementById('logSpecies');
    const logCountVal = document.getElementById('logCountVal');
    const btnCountDec = document.getElementById('btnCountDec');
    const btnCountInc = document.getElementById('btnCountInc');
    const logCategory = document.getElementById('logCategory');
    const logActions = document.getElementById('logActions');
    const loggerForm = document.getElementById('loggerForm');
    const logSuccessStamp = document.getElementById('logSuccessStamp');
    const bulletinTableBody = document.getElementById('bulletinTableBody');

    const focusOverlay = document.getElementById('focusOverlay');
    const focusContainer = document.getElementById('focusContainer');
    const closeFocusBtn = document.getElementById('closeFocusBtn');

    let currentCount = 1;
    let isOfficialDoc = false;

    // 1. Dual-Mode Switch Toggle (Light Switch)
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

    // 2. Print Pin Action
    printBtn.addEventListener('click', () => {
        // Temporarily switch to official doc for clean 8.5x11 print
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

    // 3. Web Audio API Bird Call Synthesizer
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
            e.stopPropagation(); // prevent modal open
            const soundKey = btn.getAttribute('data-sound');
            playBirdSound(soundKey);
        });
    });

    // 4. Tally Counter Controls
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

    // 5. Tally Marks Formatter
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

    // 6. Logger Form Submission & Persistence
    const STORAGE_KEY = 'ttfs_bulletin_bird_logs_v1';

    function loadLogs() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveLog(entry) {
        const logs = loadLogs();
        logs.unshift(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }

    if (loggerForm) {
        loggerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const species = logSpeciesInput.value.trim();
            const count = currentCount;
            const category = logCategory.value;
            const action = logActions.value.trim() || 'Observing';
            const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
            const tallyStr = formatTallyMarks(count);

            const entry = {
                species,
                count,
                tallyStr,
                date: today,
                action,
                notes: `${category} sighting`
            };

            saveLog(entry);

            // Prepend to Graph Paper Table
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${entry.species}</strong></td>
                <td><span class="tally-marks">${entry.tallyStr}</span> (${entry.count})</td>
                <td>${entry.date}</td>
                <td>${entry.action}</td>
                <td>${entry.notes}</td>
            `;
            if (bulletinTableBody) {
                bulletinTableBody.insertBefore(tr, bulletinTableBody.firstChild);
            }

            // Show success stamp
            if (logSuccessStamp) {
                logSuccessStamp.classList.remove('hidden');
                setTimeout(() => {
                    logSuccessStamp.classList.add('hidden');
                }, 3000);
            }

            // Reset
            logSpeciesInput.value = '';
            logActions.value = '';
            currentCount = 1;
            logCountVal.textContent = '1';
        });
    }

    // 7. Click to Focus/Enlarge Pinned Cards
    const expandableCards = document.querySelectorAll('.pinned-card[data-expandable="true"]');
    expandableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't expand if clicking input/button
            if (['BUTTON', 'INPUT', 'SELECT', 'A'].includes(e.target.tagName)) return;
            
            focusContainer.innerHTML = '';
            const clone = card.cloneNode(true);
            clone.style.transform = 'none';
            clone.style.position = 'relative';
            clone.style.margin = '0 auto';
            focusContainer.appendChild(clone);
            focusOverlay.classList.remove('hidden');

            // Wire up buttons in clone
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
});
