document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loginSection = document.getElementById('login-section');
    const loggingSection = document.getElementById('logging-section');
    const receiptSection = document.getElementById('receipt-section');
    
    const teamNameInput = document.getElementById('team-name');
    const verifyBtn = document.getElementById('verify-btn');
    
    const displayTeamName = document.getElementById('display-team-name');
    const activitySelect = document.getElementById('activity-select');
    const logActivityBtn = document.getElementById('log-activity-btn');
    
    // Receipt Elements
    const receiptDate = document.getElementById('receipt-date');
    const receiptTeam = document.getElementById('receipt-team');
    const receiptActivity = document.getElementById('receipt-activity');
    const receiptDuration = document.getElementById('receipt-duration');
    const printBtn = document.getElementById('print-btn');
    const newLogBtn = document.getElementById('new-log-btn');

    let currentTeamName = '';

    // Verify Team
    verifyBtn.addEventListener('click', () => {
        const val = teamNameInput.value.trim();
        if (val.length >= 3) {
            currentTeamName = val;
            displayTeamName.textContent = currentTeamName;
            loginSection.classList.add('hidden');
            loggingSection.classList.remove('hidden');
        } else {
            alert('Please enter a valid Team Name (at least 3 characters).');
        }
    });

    // Enable/Disable generate receipt button
    activitySelect.addEventListener('change', () => {
        if (activitySelect.value !== "") {
            logActivityBtn.disabled = false;
        }
    });

    // Generate Receipt
    logActivityBtn.addEventListener('click', () => {
        const selectedOption = activitySelect.options[activitySelect.selectedIndex];
        const title = selectedOption.getAttribute('data-title');
        const mins = selectedOption.getAttribute('data-mins');
        
        const now = new Date();
        
        receiptDate.textContent = now.toLocaleString();
        receiptTeam.textContent = currentTeamName;
        receiptActivity.textContent = title;
        receiptDuration.textContent = mins;
        
        loggingSection.classList.add('hidden');
        receiptSection.classList.remove('hidden');
    });

    // Print
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // New Log
    newLogBtn.addEventListener('click', () => {
        activitySelect.value = "";
        logActivityBtn.disabled = true;
        receiptSection.classList.add('hidden');
        loggingSection.classList.remove('hidden');
    });
});
