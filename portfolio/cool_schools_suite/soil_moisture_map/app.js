const t = {
    en: { title: "Soil Moisture Map", instr: "Select a state, then tap a zone:", dry: "Dry 🏜️", damp: "Damp 💧", muddy: "Muddy 💩", save: "Save Map", success: "Map Saved!" },
    es: { title: "Mapa de Humedad", instr: "Selecciona estado y toca la zona:", dry: "Seco 🏜️", damp: "Húmedo 💧", muddy: "Lodo 💩", save: "Guardar Mapa", success: "¡Mapa Guardado!" },
    texmex: { title: "Soil Map", instr: "Pick a state, tap the garden:", dry: "Dry 🏜️", damp: "Damp 💧", muddy: "Muddy 💩", save: "Save Map", success: "Saved it!" }
};
let lang = 'en';
let activeState = 'dry';
const colors = { dry: '#ffd54f', damp: '#4fc3f7', muddy: '#795548' };

document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', e => {
    lang = e.target.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    updateUI();
}));

document.querySelectorAll('.tool-btn').forEach(b => b.addEventListener('click', e => {
    activeState = e.target.dataset.state;
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
}));

function updateUI() {
    document.getElementById('app-title').innerText = t[lang].title;
    document.getElementById('instruction').innerText = t[lang].instr;
    const tools = document.querySelectorAll('.tool-btn');
    tools[0].innerText = t[lang].dry; tools[1].innerText = t[lang].damp; tools[2].innerText = t[lang].muddy;
    document.getElementById('save-btn').innerText = t[lang].save;
}

// Init map
const mapGrid = document.getElementById('garden-map');
for(let i=1; i<=9; i++) {
    const zone = document.createElement('div');
    zone.className = 'zone';
    zone.innerText = `Zone ${i}`;
    zone.addEventListener('click', () => {
        zone.style.background = colors[activeState];
        zone.dataset.state = activeState;
    });
    mapGrid.appendChild(zone);
}

function saveMap() {
    document.getElementById('status-msg').innerText = t[lang].success;
    setTimeout(() => document.getElementById('status-msg').innerText = '', 3000);
}
