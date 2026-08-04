// photo_wall.js

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("corkboardGrid");
    const fieldNotesContainer = document.getElementById("fieldNotesContainer");
    const uploadBtn = document.getElementById("uploadMockBtn");

    // Mock Upload Button
    if(uploadBtn) {
        uploadBtn.addEventListener("click", () => {
            alert("Privacy-First Protocol Triggered:\n\nPhoto upload request initiated. The photo will be routed to the campus teacher dashboard for COPPA/FERPA compliance review. It will not appear on the public wall until identifying features (faces) are cleared and it is approved.");
        });
    }

    // Render Photos
    photoData.forEach(data => {
        // Create Polaroid
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        
        // Random slight rotation for physical corkboard feel (-4 to 4 degrees)
        const rotation = Math.floor(Math.random() * 9) - 4;
        polaroid.style.transform = `rotate(${rotation}deg)`;

        polaroid.innerHTML = `
            <img src="${data.image}" alt="${data.subject}">
            <div class="polaroid-caption">${data.campus}</div>
        `;

        polaroid.addEventListener('click', () => {
            // Remove active class from all
            document.querySelectorAll('.polaroid').forEach(p => p.classList.remove('active'));
            polaroid.classList.add('active');
            
            // Render Field Notes
            renderFieldNotes(data);
        });

        grid.appendChild(polaroid);
    });

    function renderFieldNotes(data) {
        fieldNotesContainer.innerHTML = `
            <div class="field-note-card">
                <h3>${data.subject}</h3>
                <div class="note-meta">
                    <p><strong>Category:</strong> ${data.category}</p>
                    <p><strong>Campus:</strong> ${data.campus}</p>
                    <p><strong>Date Logged:</strong> ${data.date}</p>
                </div>
                <div class="note-body">
                    <p>${data.notes}</p>
                </div>
                <div class="approval-stamp">
                    APPROVED - ${data.approvedBy}
                </div>
            </div>
        `;
    }
});
