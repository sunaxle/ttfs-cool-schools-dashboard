// photo_wall.js

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("corkboardGrid");
    const fieldNotesContainer = document.getElementById("fieldNotesContainer");
    const badgesContainer = document.getElementById("badgesContainer");
    const uploadBtn = document.getElementById("uploadMockBtn");
    const uploadModal = document.getElementById("uploadModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const submitBoardPhotoBtn = document.getElementById("submitBoardPhotoBtn");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let currentFilter = "all";

    // 1. Render Stewardship Badges Ribbon
    if (badgesContainer && typeof campusBadges !== "undefined") {
        badgesContainer.innerHTML = "";
        campusBadges.forEach(b => {
            const badgeEl = document.createElement("div");
            badgeEl.className = `badge-pill ${b.unlocked ? 'badge-unlocked' : 'badge-locked'}`;
            badgeEl.title = `${b.name} (${b.level}): ${b.desc} [${b.requirement}]`;
            badgeEl.innerHTML = `
                <span>${b.icon}</span>
                <span>${b.name}</span>
                <span style="font-size: 0.75em; opacity: 0.8;">(${b.unlocked ? 'Unlocked' : b.requirement})</span>
            `;
            badgeEl.addEventListener("click", () => {
                alert(`🏆 ${b.name} (${b.level})\n\nRequirement: ${b.requirement}\nStatus: ${b.unlocked ? 'Unlocked on ' + b.unlockedDate : 'Locked (' + b.unlockedDate + ')'}\n\nDescription: ${b.desc}`);
            });
            badgesContainer.appendChild(badgeEl);
        });
    }

    // 2. Modal Handlers
    if (uploadBtn && uploadModal) {
        uploadBtn.addEventListener("click", () => {
            uploadModal.style.display = "flex";
        });
    }

    if (closeModalBtn && uploadModal) {
        closeModalBtn.addEventListener("click", () => {
            uploadModal.style.display = "none";
        });
    }

    if (submitBoardPhotoBtn && uploadModal) {
        submitBoardPhotoBtn.addEventListener("click", () => {
            const campus = document.getElementById("modalCampusSelect").value;
            const month = document.getElementById("modalMonthSelect").value;
            const caption = document.getElementById("modalCaption").value || "Monthly collective board snapshot";

            uploadModal.style.display = "none";

            alert(`✅ Monthly Bulletin Board Submitted!\n\nCampus: ${campus}\nPeriod: ${month}\nCaption: ${caption}\n\nStewardship Progress: +1 Monthly Report Logged.\nCOPPA Protocol: Photo approved for campus dashboard aggregation with zero PII.`);
        });
    }

    // 3. Render 20 Polaroid Photos on Corkboard with Filtering
    function renderGrid(filter = "all") {
        if (!grid || typeof photoData === "undefined") return;
        grid.innerHTML = "";

        const filtered = photoData.filter(d => {
            if (filter === "all") return true;
            if (filter.startsWith("Month")) return d.month.includes(filter);
            return d.category === filter;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="color: #666; font-style: italic; padding: 40px; text-align: center;">No items match this filter category.</div>`;
            return;
        }

        filtered.forEach((data, index) => {
            const polaroid = document.createElement('div');
            polaroid.className = 'polaroid';
            
            // Random slight rotation for physical corkboard feel (-4 to 4 degrees)
            const rotation = Math.floor(Math.random() * 9) - 4;
            polaroid.style.transform = `rotate(${rotation}deg)`;

            polaroid.innerHTML = `
                <img src="${data.image}" alt="${data.subject}" loading="lazy">
                <div class="polaroid-caption">${data.subject.length > 28 ? data.subject.substring(0, 26) + '...' : data.subject}</div>
                <div style="font-size: 0.75em; color: #666; text-align: center; margin-top: 2px;">${data.campus.split(' ')[0]} ${data.campus.split(' ')[1] || ''}</div>
            `;

            polaroid.addEventListener('click', () => {
                document.querySelectorAll('.polaroid').forEach(p => p.classList.remove('active'));
                polaroid.classList.add('active');
                renderFieldNotes(data);
            });

            grid.appendChild(polaroid);

            // Auto-select first item on filter switch
            if (index === 0) {
                polaroid.classList.add('active');
                renderFieldNotes(data);
            }
        });
    }

    function renderFieldNotes(data) {
        if (!fieldNotesContainer) return;
        
        const tagsHtml = data.tags ? data.tags.map(t => `<span class="tag-pill">${t}</span>`).join(' ') : '';
        const notesFormatted = data.notes.replace(/\n/g, '<br>');

        fieldNotesContainer.innerHTML = `
            <div class="field-note-card">
                <h3>${data.subject}</h3>
                <div class="note-meta">
                    <p><strong>Campus:</strong> ${data.campus}</p>
                    <p><strong>Student Cohort:</strong> ${data.studentRef || 'Classroom Collective'}</p>
                    <p><strong>Timeline:</strong> ${data.month} • ${data.date}</p>
                    <p><strong>Category:</strong> ${data.category}</p>
                    <div style="margin-top: 8px;">${tagsHtml}</div>
                </div>
                
                <div class="note-body" style="background: #fff; padding: 15px; border-radius: 6px; border-left: 3px solid #2b5c2d; font-family: 'Lora', serif;">
                    ${notesFormatted}
                </div>

                <div class="approval-stamp">
                    VERIFIED & APPROVED • ${data.approvedBy}
                </div>
            </div>
        `;
    }

    // 4. Setup Filter Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            renderGrid(currentFilter);
        });
    });

    // Initial render
    renderGrid("all");
});
