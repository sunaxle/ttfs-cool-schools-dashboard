/**
 * Tree Stewardship & Health Tracking Logic
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
  const logDateInput = document.getElementById('logDate');
  const logTreeSelect = document.getElementById('logTreeSelect');
  const customTreeGroup = document.getElementById('customTreeGroup');
  const customTreeInput = document.getElementById('customTreeInput');
  const healthRadios = document.querySelectorAll('input[name="healthRadio"]');
  const healthRadioCards = document.querySelectorAll('.health-radio-card');
  const stewardshipLogForm = document.getElementById('stewardshipLogForm');
  const stewardshipTableBody = document.getElementById('stewardshipTableBody');
  const stewardshipFeedList = document.getElementById('stewardshipFeedList');

  // Display elements
  const activeTreeCardTitle = document.getElementById('activeTreeCardTitle');
  const activeTreeCardSub = document.getElementById('activeTreeCardSub');
  const activeTreeStatusBadge = document.getElementById('activeTreeStatusBadge');
  const treeCanopyVisual = document.getElementById('treeCanopyVisual');
  const displayDbh = document.getElementById('displayDbh');
  const displayHeight = document.getElementById('displayHeight');
  const displayMoisture = document.getElementById('displayMoisture');

  // Set default date to today
  if (logDateInput) {
    const today = new Date().toISOString().split('T')[0];
    logDateInput.value = today;
  }

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

  // 3. Campus Select sync
  if (campusSelect) {
    campusSelect.addEventListener('change', () => {
      const selectedText = campusSelect.options[campusSelect.selectedIndex].text;
      if (sheetSchoolName) {
        sheetSchoolName.textContent = selectedText;
      }
    });
  }

  // 4. Custom Tree Toggle
  if (logTreeSelect) {
    logTreeSelect.addEventListener('change', () => {
      if (logTreeSelect.value === 'Custom') {
        if (customTreeGroup) customTreeGroup.style.display = 'flex';
        if (customTreeInput) customTreeInput.setAttribute('required', 'true');
      } else {
        if (customTreeGroup) customTreeGroup.style.display = 'none';
        if (customTreeInput) customTreeInput.removeAttribute('required');
        
        const parts = logTreeSelect.value.split('|');
        if (parts.length >= 3) {
          const species = parts[0];
          const nickname = parts[1];
          const tag = parts[2];
          if (activeTreeCardTitle) activeTreeCardTitle.textContent = `${tag}: ${species}`;
          if (activeTreeCardSub) activeTreeCardSub.textContent = `Tree Nickname: "${nickname}"`;
        }
      }
    });
  }

  // 5. Health Radio Cards selection visual
  healthRadioCards.forEach(card => {
    card.addEventListener('click', () => {
      healthRadioCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        updateVisualCanopy(radio.value);
      }
    });
  });

  function updateVisualCanopy(healthStatus) {
    if (!treeCanopyVisual || !activeTreeStatusBadge) return;
    if (healthStatus === 'Good') {
      treeCanopyVisual.style.background = 'radial-gradient(circle at 40% 40%, #4ade80 0%, #15803d 80%)';
      activeTreeStatusBadge.textContent = '● HEALTH STATUS: VIBRANT & HAPPY';
      activeTreeStatusBadge.style.background = '#dcfce7';
      activeTreeStatusBadge.style.color = '#15803d';
    } else if (healthStatus === 'Medium') {
      treeCanopyVisual.style.background = 'radial-gradient(circle at 40% 40%, #fde047 0%, #ca8a04 80%)';
      activeTreeStatusBadge.textContent = '● HEALTH STATUS: FAIR / MONITOR';
      activeTreeStatusBadge.style.background = '#fef9c3';
      activeTreeStatusBadge.style.color = '#854d0e';
    } else {
      treeCanopyVisual.style.background = 'radial-gradient(circle at 40% 40%, #f87171 0%, #b91c1c 80%)';
      activeTreeStatusBadge.textContent = '● HEALTH STATUS: UNHEALTHY / ALERT';
      activeTreeStatusBadge.style.background = '#fee2e2';
      activeTreeStatusBadge.style.color = '#b91c1c';
    }
  }

  // 6. Form Submission & LocalStorage Persistence
  const STORAGE_KEY = 'ttfs_stewardship_logs_v1';

  function loadSavedLogs() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveLogEntry(entry) {
    const logs = loadSavedLogs();
    logs.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    renderFeed();
  }

  function renderFeed() {
    if (!stewardshipFeedList) return;
    let logs = loadSavedLogs();
    
    // Seed initial demo logs if empty
    if (logs.length === 0) {
      logs = [
        {
          date: '09/17/2026',
          nickname: 'Shadow Maker',
          classroom: 'Room 405 (Garza)',
          species: 'Texas Ebony',
          health: 'Good',
          dbh: '2.9',
          height: '6.3',
          moisture: 'Damp / Mulch Added'
        },
        {
          date: '09/15/2026',
          nickname: 'The Montezuma King',
          classroom: 'Room 301 (Gomez)',
          species: 'Montezuma Cypress',
          health: 'Good',
          dbh: '3.4',
          height: '8.6',
          moisture: 'Moist (Recent Rain)'
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }

    stewardshipFeedList.innerHTML = logs.map(log => {
      const badgeClass = log.health === 'Good' ? 'good' : (log.health === 'Medium' ? 'medium' : 'bad');
      const emoji = log.health === 'Good' ? '😊' : (log.health === 'Medium' ? '😐' : '😟');
      return `
        <div class="feed-item">
          <div class="feed-meta">
            <span>${log.classroom}</span>
            <span class="health-badge ${badgeClass}">${emoji} ${log.health}</span>
          </div>
          <div><strong>${log.nickname}</strong> (${log.species}) • ${log.date}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 3px;">DBH: ${log.dbh}" | Height: ${log.height}' | Moisture: ${log.moisture}</div>
        </div>
      `;
    }).join('');
  }

  if (stewardshipLogForm) {
    stewardshipLogForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let treeNickname = '';
      let species = '';
      
      if (logTreeSelect && logTreeSelect.value === 'Custom') {
        treeNickname = (customTreeInput && customTreeInput.value.trim()) || 'Custom Tree';
        species = 'Native Species';
      } else if (logTreeSelect) {
        const parts = logTreeSelect.value.split('|');
        species = parts[0] || 'Tree';
        treeNickname = parts[1] || 'Campus Tree';
      }

      const selectedHealthRadio = document.querySelector('input[name="healthRadio"]:checked');
      const healthVal = selectedHealthRadio ? selectedHealthRadio.value : 'Good';
      const dateVal = logDateInput ? logDateInput.value : '';
      const classroomVal = document.getElementById('logClassroom') ? document.getElementById('logClassroom').value.trim() : 'Classroom';
      const dbhVal = document.getElementById('logDbh') ? document.getElementById('logDbh').value : '3.0';
      const heightVal = document.getElementById('logHeight') ? document.getElementById('logHeight').value : '8.0';
      const moistureVal = document.getElementById('logMoisture') ? document.getElementById('logMoisture').value : 'Damp';
      const mulchVal = document.getElementById('mulchCheck') ? document.getElementById('mulchCheck').checked : true;
      const notesVal = document.getElementById('logNotes') ? document.getElementById('logNotes').value.trim() : '';

      const moistureShort = moistureVal.includes('Damp') ? 'Damp & Spongey' :
                            (moistureVal.includes('Slightly') ? 'Slightly Moist' :
                            (moistureVal.includes('Dry') ? 'Dry / Needs Water' : 'Standing Puddle'));

      const entry = {
        date: dateVal,
        nickname: treeNickname,
        classroom: classroomVal,
        species: species,
        health: healthVal,
        dbh: dbhVal,
        height: heightVal,
        moisture: `${moistureShort}${mulchVal ? ' (Mulched)' : ' (No Mulch)'}`,
        notes: notesVal
      };

      // 1. Save entry
      saveLogEntry(entry);

      // 2. Prepend row to document table if present
      if (stewardshipTableBody) {
        const tr = document.createElement('tr');
        const badgeClass = healthVal === 'Good' ? 'good' : (healthVal === 'Medium' ? 'medium' : 'bad');
        const emoji = healthVal === 'Good' ? '😊' : (healthVal === 'Medium' ? '😐' : '😟');
        tr.innerHTML = `
          <td>${entry.date}</td>
          <td><strong>${entry.nickname}</strong></td>
          <td>${entry.classroom}</td>
          <td>${entry.species}</td>
          <td><span class="health-badge ${badgeClass}">${entry.health} (${emoji})</span></td>
          <td>${entry.dbh} in</td>
          <td>${entry.height} ft</td>
          <td>${entry.moisture}</td>
        `;
        stewardshipTableBody.insertBefore(tr, stewardshipTableBody.firstChild);
      }

      // 3. Update active display cards
      if (displayDbh) displayDbh.textContent = `${dbhVal}"`;
      if (displayHeight) displayHeight.textContent = `${heightVal}'`;
      if (displayMoisture) displayMoisture.textContent = moistureShort;

      // 4. Success alert
      alert(`🌟 Success! Tree Stewardship check recorded for "${treeNickname}" by ${classroomVal}. Data synced with the campus ledger.`);

      // 5. Reset notes
      const notesEl = document.getElementById('logNotes');
      if (notesEl) notesEl.value = '';
    });
  }

  // Initial render
  renderFeed();
});
