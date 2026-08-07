document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("authForm");
    const passwordSection = document.getElementById("passwordSection");
    const secureContent = document.getElementById("secureContent");
    const authError = document.getElementById("authError");
    const lockBtn = document.getElementById("lockBtn");

    // Mock authentication
    if (authForm) {
        authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const pass = document.getElementById("educatorPassword").value;
            // Any password works for prototype demo purposes, except empty
            if (pass.length > 0) {
                authError.style.display = "none";
                passwordSection.style.display = "none";
                secureContent.style.display = "block";
                authForm.reset();
            } else {
                authError.style.display = "block";
            }
        });
    }

    // Re-lock
    if (lockBtn) {
        lockBtn.addEventListener("click", () => {
            secureContent.style.display = "none";
            passwordSection.style.display = "block";
        });
    }

    // UX updates for downloads
    const downloadLinks = document.querySelectorAll('.pdf-download-link');
    downloadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = link.innerHTML;
            link.innerHTML = "Downloading...";
            link.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                link.innerHTML = "Downloaded!";
                setTimeout(() => {
                    link.innerHTML = originalText;
                    link.style.backgroundColor = "";
                }, 2000);
            }, 1000);
        });
    });
    
    // Feedback submission
    const feedbackForm = document.getElementById('feedbackForm');
    if(feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = feedbackForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = "Submitting...";
            btn.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                btn.innerHTML = "Feedback Received!";
                feedbackForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = "#8bc34a";
                }, 2000);
            }, 1500);
        });
    }
});
