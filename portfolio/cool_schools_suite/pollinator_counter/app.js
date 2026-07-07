const t = {
    en: { title: "Pollinator Counter", bee: "Bees", butterfly: "Butterflies", submit: "Submit Counts", success: "Great job! Counts saved." },
    es: { title: "Contador de Polinizadores", bee: "Abejas", butterfly: "Mariposas", submit: "Enviar Conteos", success: "¡Buen trabajo! Guardado." },
    texmex: { title: "Bug Counter", bee: "Bees", butterfly: "Butterflies", submit: "Send 'em up", success: "Awesome job! Saved." }
};
let lang = 'en';
let counts = { bee: 0, butterfly: 0 };

document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', e => {
    lang = e.target.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    updateUI();
}));

function updateUI() {
    document.getElementById('app-title').innerText = t[lang].title;
    document.getElementById('label-bee').innerText = t[lang].bee;
    document.getElementById('label-butterfly').innerText = t[lang].butterfly;
    document.getElementById('submit-btn').innerText = t[lang].submit;
}

function increment(type) {
    counts[type]++;
    document.getElementById(`count-${type}`).innerText = counts[type];
    const box = document.getElementById(`count-${type}`).parentElement;
    box.style.transform = 'scale(1.1)';
    setTimeout(() => box.style.transform = 'scale(1)', 150);
}

function submitCounts() {
    if(counts.bee === 0 && counts.butterfly === 0) return;
    document.getElementById('feedback-msg').innerText = t[lang].success;
    counts = { bee: 0, butterfly: 0 };
    document.getElementById('count-bee').innerText = '0';
    document.getElementById('count-butterfly').innerText = '0';
    setTimeout(() => document.getElementById('feedback-msg').innerText = '', 3000);
}
