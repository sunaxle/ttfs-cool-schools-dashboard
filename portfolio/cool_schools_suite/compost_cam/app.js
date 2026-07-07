const t = {
    en: { title: "Compost Cam", placeholder: "E.g., Apple Core", slider: "Decomposition Stage:", s1: "Fresh", s2: "Rotting", s3: "Soil", add: "Add to Timeline", tTitle: "Compost Timeline" },
    es: { title: "Cámara de Compost", placeholder: "Ej. Manzana", slider: "Etapa de Descomposición:", s1: "Fresco", s2: "Podrido", s3: "Tierra", add: "Añadir a la Línea", tTitle: "Línea de Tiempo" },
    texmex: { title: "Compost Cam", placeholder: "Like an Apple Core", slider: "How broken down?", s1: "Fresh", s2: "Rotting", s3: "Dirt", add: "Add to Timeline", tTitle: "Compost Logs" }
};
let lang = 'en';

document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', e => {
    lang = e.target.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    updateUI();
}));

function updateUI() {
    document.getElementById('app-title').innerText = t[lang].title;
    document.getElementById('item-name').placeholder = t[lang].placeholder;
    document.getElementById('slider-label').innerText = t[lang].slider;
    document.getElementById('stg-1').innerText = t[lang].s1;
    document.getElementById('stg-2').innerText = t[lang].s2;
    document.getElementById('stg-3').innerText = t[lang].s3;
    document.getElementById('add-btn').innerText = t[lang].add;
    document.getElementById('timeline-title').innerText = t[lang].tTitle;
}

function addCompost() {
    const name = document.getElementById('item-name').value;
    if(!name) return;
    const stage = document.getElementById('stage-slider').value;
    const progress = stage === "1" ? 10 : stage === "2" ? 50 : 100;
    
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
        <div class="item-header">
            <span class="item-name">${name}</span>
            <span class="item-date">${new Date().toLocaleDateString()}</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
    `;
    
    document.getElementById('timeline').appendChild(item);
    document.getElementById('item-name').value = '';
    document.getElementById('stage-slider').value = 1;
}
