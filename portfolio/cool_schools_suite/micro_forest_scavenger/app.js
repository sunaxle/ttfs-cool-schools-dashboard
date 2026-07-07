const itemsDB = {
    en: [
        "Something rough", "A yellow leaf", "An insect with wings", 
        "Something smooth", "A seed pod", "A Y-shaped twig",
        "Something fuzzy", "A round rock", "Three identical leaves"
    ],
    es: [
        "Algo rasposo", "Una hoja amarilla", "Un insecto con alas",
        "Algo suave", "Una vaina de semillas", "Una ramita en forma de Y",
        "Algo borroso/peludo", "Una roca redonda", "Tres hojas iguales"
    ],
    texmex: [
        "Something rasposo", "Una yellow leaf", "Un bug con alas",
        "Something suavecito", "Una seed pod", "Una ramita como Y",
        "Something fuzzy", "Una piedra redonda", "Tres hojas the same"
    ]
};

const translations = {
    en: {
        title: "Micro-Forest Scavenger",
        subtitle: "Find these things in the campus micro-forest!",
        refresh_btn: "Generate New List",
        done: "Awesome! You found everything!"
    },
    es: {
        title: "Búsqueda en el Micro-Bosque",
        subtitle: "¡Encuentra estas cosas en el bosque del campus!",
        refresh_btn: "Generar Nueva Lista",
        done: "¡Increíble! ¡Encontraste todo!"
    },
    texmex: {
        title: "Micro-Forest Scavenger",
        subtitle: "Find estas cosas in the campus forest!",
        refresh_btn: "New Lista",
        done: "Órale! You found todo!"
    }
};

let currentLang = 'en';
let currentItems = [];

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    
    if (currentItems.length === 3) {
        document.getElementById('lbl-item1').textContent = itemsDB[currentLang][currentItems[0]];
        document.getElementById('lbl-item2').textContent = itemsDB[currentLang][currentItems[1]];
        document.getElementById('lbl-item3').textContent = itemsDB[currentLang][currentItems[2]];
    }
    checkCompletion();
}

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateTranslations();
});

function generateList() {
    const listLen = itemsDB['en'].length;
    currentItems = [];
    while (currentItems.length < 3) {
        const r = Math.floor(Math.random() * listLen);
        if (!currentItems.includes(r)) currentItems.push(r);
    }
    
    document.getElementById('item1').checked = false;
    document.getElementById('item2').checked = false;
    document.getElementById('item3').checked = false;
    
    document.getElementById('completion-msg').textContent = "";
    
    updateTranslations();
}

function checkCompletion() {
    const i1 = document.getElementById('item1').checked;
    const i2 = document.getElementById('item2').checked;
    const i3 = document.getElementById('item3').checked;
    
    if (i1 && i2 && i3) {
        document.getElementById('completion-msg').textContent = translations[currentLang].done;
    } else {
        document.getElementById('completion-msg').textContent = "";
    }
}

generateList();
