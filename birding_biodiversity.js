/**
 * Birding & Biodiversity Field Lab Logic
 * Texas Trees Foundation × UTRGV Agroecology
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnModeDoc = document.getElementById('btnModeDoc');
  const btnModeLab = document.getElementById('btnModeLab');
  const viewDocument = document.getElementById('viewDocument');
  const viewInteractive = document.getElementById('viewInteractive');
  const printBtn = document.getElementById('printBtn');
  const campusSelect = document.getElementById('campusSelect');
  const sheetSchoolName = document.getElementById('sheetSchoolName');
  
  const tallyCountInput = document.getElementById('tallyCount');
  const btnCountMinus = document.getElementById('btnCountMinus');
  const btnCountPlus = document.getElementById('btnCountPlus');
  const tallySpeciesInput = document.getElementById('tallySpecies');
  const tallyCategorySelect = document.getElementById('tallyCategory');
  const tallyMicrohabitatInput = document.getElementById('tallyMicrohabitat');
  const tallyLogForm = document.getElementById('tallyLogForm');
  const tallyTableBody = document.getElementById('tallyTableBody');

  // 1. Mode Switching
  function switchMode(mode) {
    if (mode === 'document') {
      btnModeDoc.classList.add('active');
      btnModeDoc.setAttribute('aria-selected', 'true');
      btnModeLab.classList.remove('active');
      btnModeLab.setAttribute('aria-selected', 'false');
      viewDocument.classList.add('active');
      viewInteractive.classList.remove('active');
    } else {
      btnModeLab.classList.add('active');
      btnModeLab.setAttribute('aria-selected', 'true');
      btnModeDoc.classList.remove('active');
      btnModeDoc.setAttribute('aria-selected', 'false');
      viewInteractive.classList.add('active');
      viewDocument.classList.remove('active');
    }
  }

  if (btnModeDoc) btnModeDoc.addEventListener('click', () => switchMode('document'));
  if (btnModeLab) btnModeLab.addEventListener('click', () => switchMode('interactive'));

  // 2. Print Action
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      switchMode('document');
      setTimeout(() => {
        window.print();
      }, 150);
    });
  }

  // 3. Campus Select Sync
  if (campusSelect) {
    campusSelect.addEventListener('change', () => {
      const selectedText = campusSelect.options[campusSelect.selectedIndex].text;
      if (sheetSchoolName) {
        sheetSchoolName.textContent = selectedText;
      }
    });
  }

  // 4. Tally Counter (+ / -)
  if (btnCountMinus && tallyCountInput) {
    btnCountMinus.addEventListener('click', () => {
      let val = parseInt(tallyCountInput.value, 10) || 1;
      if (val > 1) tallyCountInput.value = val - 1;
    });
  }
  if (btnCountPlus && tallyCountInput) {
    btnCountPlus.addEventListener('click', () => {
      let val = parseInt(tallyCountInput.value, 10) || 1;
      if (val < 100) tallyCountInput.value = val + 1;
    });
  }

  // 5. Birding by Ear Audio Synthesizer (Web Audio API - zero external audio files required!)
  const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playBirdCall(birdKey) {
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
        
        gain.gain.setValueAtTime(0.2, now + i * 0.16);
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
        gain.gain.setValueAtTime(0.25, t);
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

        gain.gain.setValueAtTime(0.2, now + i * 0.08);
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
        gain.gain.setValueAtTime(0.15, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.005, now + i * 0.04 + 0.03);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.035);
      }
    }
  }

  const audioBtns = document.querySelectorAll('.bird-audio-btn');
  audioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const soundKey = btn.getAttribute('data-sound');
      playBirdCall(soundKey);
    });
  });

  // 6. Quick Tally Add from Bird Cards
  const quickAddBtns = document.querySelectorAll('.bird-tally-quick-btn');
  quickAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const species = btn.getAttribute('data-species');
      if (tallySpeciesInput) {
        tallySpeciesInput.value = species;
        if (tallyCategorySelect) tallyCategorySelect.value = 'Bird';
        tallySpeciesInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        tallySpeciesInput.focus();
      }
    });
  });

  // 7. Format Tally Marks helper
  function formatTallyMarks(count) {
    let res = '';
    let remaining = count;
    while (remaining >= 5) {
      res += '|||| ';
      remaining -= 5;
    }
    if (remaining > 0) {
      res += '|'.repeat(remaining);
    }
    return res.trim();
  }

  // 8. Tally Log Form Submission
  if (tallyLogForm) {
    tallyLogForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const speciesVal = tallySpeciesInput.value.trim();
      const countVal = parseInt(tallyCountInput.value, 10) || 1;
      const categoryVal = tallyCategorySelect.value;
      const microhabitatVal = tallyMicrohabitatInput.value.trim() || 'Schoolyard canopy';

      // Collect checked actions
      const checkedActions = Array.from(document.querySelectorAll('input[name="actionCheck"]:checked'))
        .map(el => el.value);
      const actionSummary = checkedActions.length > 0 ? checkedActions.join(', ') : 'Observing';

      const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      const tallyMarks = formatTallyMarks(countVal);

      // Prepend to Document table
      if (tallyTableBody) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${speciesVal}</strong><br><span class="species-sci">${categoryVal} sighting</span></td>
          <td><span class="tally-marks">${tallyMarks}</span></td>
          <td><strong>${countVal}</strong></td>
          <td>${today}</td>
          <td>${actionSummary}</td>
          <td>${microhabitatVal}</td>
        `;
        tallyTableBody.insertBefore(tr, tallyTableBody.firstChild);
      }

      // Save to localStorage
      try {
        const STORAGE_KEY = 'ttfs_biodiversity_tally_v1';
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        existing.unshift({
          species: speciesVal,
          count: countVal,
          category: categoryVal,
          actions: actionSummary,
          microhabitat: microhabitatVal,
          date: today
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch (err) {
        console.warn('Storage error:', err);
      }

      alert(`🦜 BioBlitz Record Added! Logged ${countVal} × "${speciesVal}" doing: ${actionSummary}. Data saved to campus biodiversity record.`);

      // Reset
      tallySpeciesInput.value = '';
      tallyCountInput.value = '1';
      tallyMicrohabitatInput.value = '';
    });
  }
});
