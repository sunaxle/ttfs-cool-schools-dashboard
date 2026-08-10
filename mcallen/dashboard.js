document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('measurementForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mock submission
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = "Logging...";
            btn.disabled = true;
            btn.style.opacity = "0.7";

            setTimeout(() => {
                const successMsg = document.getElementById('successMessage');
                successMsg.style.display = 'block';
                
                // Reset form
                form.reset();
                
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = "1";

                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 3000);
            }, 1000);
        });
    }

});
