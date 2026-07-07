const translations = {
    en: { title: "Seedling Tracker", logBtn: "Log Growth", placeholder: "Height in cm", history: "Recent Logs" },
    es: { title: "Rastreador de Plántulas", logBtn: "Registrar", placeholder: "Altura en cm", history: "Registros" },
    texmex: { title: "Sprout Tracker", logBtn: "Log that Sprout", placeholder: "How tall in cm?", history: "Recent Growth" }
};

let currentLang = 'en';
const logs = [];

function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
    updateUI();
}

function updateUI() {
    document.getElementById('app-title').innerText = translations[currentLang].title;
    document.getElementById('log-btn').innerText = translations[currentLang].logBtn;
    document.getElementById('height-input').placeholder = translations[currentLang].placeholder;
    document.getElementById('history-title').innerText = translations[currentLang].history;
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => setLang(e.target.dataset.lang));
});

function logGrowth() {
    const input = document.getElementById('height-input');
    const val = parseFloat(input.value);
    if (isNaN(val) || val <= 0) return;
    
    logs.unshift({ date: new Date().toLocaleDateString(), height: val });
    input.value = '';
    
    const plant = document.getElementById('plant-visual');
    const scale = Math.min(1 + (val / 50), 3);
    plant.style.transform = `scale(${scale})`;
    
    renderLogs();
}

function renderLogs() {
    const list = document.getElementById('log-list');
    list.innerHTML = logs.map(log => `<li><span>${log.date}</span><strong>${log.height} cm</strong></li>`).join('');
}
