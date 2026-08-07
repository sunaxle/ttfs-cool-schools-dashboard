document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');
    const btnGetLocation = document.getElementById('btnGetLocation');
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    const successMessage = document.getElementById('successMessage');

    // Handle Geolocation
    btnGetLocation.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            btnGetLocation.textContent = "📍 Locating...";
            btnGetLocation.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latInput.value = position.coords.latitude.toFixed(6);
                    lngInput.value = position.coords.longitude.toFixed(6);
                    btnGetLocation.textContent = "📍 Location Secured";
                    btnGetLocation.style.background = "#28a745";
                },
                (error) => {
                    alert("Error getting location: " + error.message);
                    btnGetLocation.textContent = "📍 Get Current Location";
                    btnGetLocation.disabled = false;
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Construct Observation Object
        const observation = {
            id: 'obs_' + Date.now(),
            observer: document.getElementById('observerName').value,
            campus: document.getElementById('campusSelect').value,
            surfaceZone: document.getElementById('surfaceZone').value,
            lat: parseFloat(latInput.value),
            lng: parseFloat(lngInput.value),
            species: document.getElementById('treeSpecies').value,
            treeCount: parseInt(document.getElementById('treeCount').value, 10),
            surfaceTemp: parseFloat(document.getElementById('surfaceTemp').value) || null,
            notes: document.getElementById('notes').value,
            timestamp: new Date().toISOString()
        };

        // In a real app, this would be an API call or Firebase push.
        // For the mock, we push to window.APP_CONFIG.layers.treeObservations.mockData
        // However, this state is lost on reload unless we use localStorage.
        
        let localObservations = JSON.parse(localStorage.getItem('ttfs_observations') || '[]');
        localObservations.push(observation);
        localStorage.setItem('ttfs_observations', JSON.stringify(localObservations));

        // Sync with active session config
        if (window.APP_CONFIG && window.APP_CONFIG.layers.treeObservations.mockData) {
            window.APP_CONFIG.layers.treeObservations.mockData.push(observation);
        }

        // Show Success
        successMessage.style.display = "block";
        form.reset();
        
        // Reset location button
        btnGetLocation.textContent = "📍 Get Current Location";
        btnGetLocation.style.background = "var(--green)";
        btnGetLocation.disabled = false;
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    });
});
