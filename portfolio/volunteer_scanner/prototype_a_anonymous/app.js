document.addEventListener('DOMContentLoaded', () => {
    let globalHours = 124.5;
    const hoursDisplay = document.getElementById('global-hours');
    const toast = document.getElementById('toast');

    document.querySelectorAll('.task-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const minutes = parseInt(e.target.getAttribute('data-minutes'));
            
            // Visual feedback
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);

            // Update hours
            const hoursToAdd = minutes / 60;
            globalHours += hoursToAdd;
            hoursDisplay.textContent = globalHours.toFixed(1);

            // Show toast
            toast.textContent = `Added ${minutes} minutes!`;
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 2000);
        });
    });
});
