// Auto-select campus if stored
document.addEventListener("DOMContentLoaded", () => {
    const campusId = localStorage.getItem("activeCampusId");
    const select = document.getElementById("campusSelect");
    if (campusId === "donna_jw_caceres") select.value = "donna";
    if (campusId === "edinburg_econ") select.value = "econ";
    if (campusId === "mcallen_rowe") select.value = "rowe";

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

    // UX update for form submission
    const form = document.getElementById('assessmentForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = "Submitting...";
            btn.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                btn.innerHTML = "Data Securely Submitted!";
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = "";
                }, 2000);
            }, 1500);
        });
    }
});
