const t = {
    en: { title: "Weather Station", rain: "Rain Gauge (mm)", temp: "Soil Temp (°C)", save: "Save Weather Data", hist: "Daily Logs" },
    es: { title: "Estación Meteorológica", rain: "Pluviómetro (mm)", temp: "Temp. del Suelo (°C)", save: "Guardar Datos", hist: "Registros Diarios" },
    texmex: { title: "Weather Station", rain: "Rain Catcher (mm)", temp: "Dirt Temp (°C)", save: "Save the Weather", hist: "Everyday Logs" }
};
let lang = 'en';
const logs = [];

document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', e => {
    lang = e.target.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    updateUI();
}));

function updateUI() {
    document.getElementById('app-title').innerText = t[lang].title;
    document.getElementById('rain-label').innerText = t[lang].rain;
    document.getElementById('temp-label').innerText = t[lang].temp;
    document.getElementById('save-btn').innerText = t[lang].save;
    document.getElementById('history-title').innerText = t[lang].hist;
}

function saveWeather() {
    const rain = document.getElementById('rain-input').value;
    const temp = document.getElementById('temp-input').value;
    if(!rain || !temp) return;
    
    logs.unshift({ date: new Date().toLocaleDateString(), rain, temp });
    document.getElementById('rain-input').value = '';
    document.getElementById('temp-input').value = '';
    render();
}

function render() {
    const container = document.getElementById('weather-cards');
    container.innerHTML = logs.map(l => `
        <div class="card">
            <div>
                <small>${l.date}</small>
                <div><strong>${l.rain} mm</strong> 💧 | <strong>${l.temp}°C</strong> 🌡️</div>
            </div>
            <div class="card-icon">${l.rain > 5 ? '🌧️' : '☀️'}</div>
        </div>
    `).join('');
}
