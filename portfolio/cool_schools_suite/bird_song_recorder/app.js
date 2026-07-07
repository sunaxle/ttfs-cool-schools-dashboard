const translations = {
    en: {
        title: "Bird Song Matcher",
        subtitle: "Match local RGV bird chirps to the right bird!",
        bird1: "Great Kiskadee",
        bird1_desc: "Loud, boisterous 'kis-ka-dee' call.",
        bird2: "Plain Chachalaca",
        bird2_desc: "Raucous 'cha-cha-la-ca' chorus.",
        bird3: "Green Jay",
        bird3_desc: "Varied clicks and rattling sounds.",
        match_btn: "Match Selected Bird",
        success: "Great job! That's correct.",
        error: "Not quite! Try listening again."
    },
    es: {
        title: "Buscador de Cantos",
        subtitle: "¡Encuentra qué pájaro del Valle está cantando!",
        bird1: "Bienteveo",
        bird1_desc: "Canto fuerte 'kis-ka-dee'.",
        bird2: "Chachalaca",
        bird2_desc: "Coro ruidoso 'cha-cha-la-ca'.",
        bird3: "Urraca Verde",
        bird3_desc: "Varios clics y sonidos de traqueteo.",
        match_btn: "Verificar Pájaro",
        success: "¡Excelente! Es correcto.",
        error: "¡Casi! Intenta escuchar de nuevo."
    },
    texmex: {
        title: "Bird Canto Matcher",
        subtitle: "Match los pajaritos del RGV con su canto!",
        bird1: "Kiskadee / Bienteveo",
        bird1_desc: "Loud 'kis-ka-dee' canto.",
        bird2: "Chachalaca",
        bird2_desc: "Crazy 'cha-cha-la-ca' noise.",
        bird3: "Green Jay / Urraca",
        bird3_desc: "Cool clicks y rattles.",
        match_btn: "Checa el Match",
        success: "Awesome! You got it right.",
        error: "No hombre, try again."
    }
};

let currentLang = 'en';
let selectedBird = null;
const targetBird = 'kiskadee'; // Simulated target for prototype

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateTranslations();
});

function playAndSelect(birdId) {
    document.querySelectorAll('.bird-card').forEach(card => card.classList.remove('selected'));
    
    let elementId = '';
    if (birdId === 'kiskadee') elementId = 'bird1';
    else if (birdId === 'chachalaca') elementId = 'bird2';
    else if (birdId === 'greenjay') elementId = 'bird3';
    
    if (elementId) {
        document.getElementById(elementId).classList.add('selected');
        selectedBird = birdId;
    }
}

function checkMatch() {
    const resultEl = document.getElementById('result');
    if (!selectedBird) {
        resultEl.textContent = "Please select a bird first!";
        resultEl.className = "result-message result-error";
        return;
    }
    
    if (selectedBird === targetBird) {
        resultEl.textContent = translations[currentLang].success;
        resultEl.className = "result-message result-success";
    } else {
        resultEl.textContent = translations[currentLang].error;
        resultEl.className = "result-message result-error";
    }
}

updateTranslations();
