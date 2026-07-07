const translations = {
    en: {
        title: "Water Cycle Simulator",
        subtitle: "Drop a pin where a puddle formed, and track its evaporation over time.",
        map_hint: "Campus Map Area<br>(Click to drop a puddle pin)",
        evap_title: "Evaporation Tracker",
        time_lbl: "Time since rain (Hours): ",
        save_btn: "Save Puddle Data",
        saved: "Campus-level puddle data saved securely."
    },
    es: {
        title: "Simulador del Ciclo del Agua",
        subtitle: "Pon un pin donde se formó un charco y sigue su evaporación.",
        map_hint: "Área del Mapa del Campus<br>(Haz clic para poner un pin)",
        evap_title: "Rastreador de Evaporación",
        time_lbl: "Tiempo desde la lluvia (Horas): ",
        save_btn: "Guardar Datos del Charco",
        saved: "Datos del charco del campus guardados de forma segura."
    },
    texmex: {
        title: "Water Cycle Simulator",
        subtitle: "Pon un pin where a puddle formed, and track la evaporación.",
        map_hint: "Campus Map Area<br>(Click pa' poner un puddle pin)",
        evap_title: "Evaporation Tracker",
        time_lbl: "Time since lluvia (Hours): ",
        save_btn: "Save Puddle Data",
        saved: "Campus-level puddle data guardado safely."
    }
};

let currentLang = 'en';
let currentPin = null;

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (key === 'map_hint') {
                el.innerHTML = translations[currentLang][key];
            } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });
    
    const val = document.getElementById('time-slider').value;
    const timeLabel = document.querySelector('label[data-i18n="time_lbl"]');
    if(timeLabel) {
        timeLabel.innerHTML = `${translations[currentLang]['time_lbl']}<span id="time-val">${val}</span>`;
    }
}

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateTranslations();
});

function dropPin(event) {
    const mapArea = document.getElementById('map-area');
    
    if (currentPin) {
        currentPin.remove();
    }
    
    const rect = mapArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    currentPin = document.createElement('div');
    currentPin.className = 'pin';
    currentPin.style.left = `${x}px`;
    currentPin.style.top = `${y}px`;
    
    mapArea.appendChild(currentPin);
    
    document.getElementById('time-slider').value = 0;
    updateEvaporation();
}

function updateEvaporation() {
    const val = document.getElementById('time-slider').value;
    
    const timeValEl = document.getElementById('time-val');
    if(timeValEl) {
        timeValEl.textContent = val;
    }
    
    if (currentPin) {
        const maxTime = 24;
        const progress = val / maxTime;
        
        const newSize = 40 - (30 * progress);
        const newOpacity = 0.6 - (0.5 * progress);
        
        currentPin.style.width = `${newSize}px`;
        currentPin.style.height = `${newSize}px`;
        currentPin.style.backgroundColor = `rgba(66, 165, 245, ${newOpacity})`;
    }
}

function saveData() {
    if (!currentPin) {
        document.getElementById('save-msg').textContent = "Please drop a pin first.";
        document.getElementById('save-msg').style.color = "var(--utrgv-orange)";
        return;
    }
    
    console.log("Anonymous Puddle Location Logged for Campus Aggregation");
    
    document.getElementById('save-msg').textContent = translations[currentLang].saved;
    document.getElementById('save-msg').style.color = "var(--utrgv-green)";
}

updateTranslations();
