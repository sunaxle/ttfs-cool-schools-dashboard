const translations = {
    en: {
        title: "Leaf Color Palette",
        subtitle: "Match physical leaves to colors to track the seasons!",
        selected_title: "Selected Color:",
        log_btn: "Log Leaf Color",
        success: "Leaf color logged for the season!"
    },
    es: {
        title: "Paleta de Colores de Hojas",
        subtitle: "¡Combina hojas con colores para seguir las estaciones!",
        selected_title: "Color Seleccionado:",
        log_btn: "Registrar Color",
        success: "¡Color de hoja registrado para la estación!"
    },
    texmex: {
        title: "Leaf Color Palette",
        subtitle: "Match hojas con colores pa' trackear seasons!",
        selected_title: "Color Escogido:",
        log_btn: "Log el Color",
        success: "Leaf color logged pa' la season!"
    }
};

let currentLang = 'en';
let activeColorHex = null;
let activeColorName = null;

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

function selectColor(hex, name) {
    document.querySelectorAll('.color-swatch').forEach(sw => {
        // Handle potential spaces or casing differences in inline styles
        if (sw.style.backgroundColor === hex || sw.style.backgroundColor.replace(/ /g, '') === hex.toLowerCase()) {
            sw.classList.add('active');
        } else {
            sw.classList.remove('active');
        }
    });
    
    activeColorHex = hex;
    activeColorName = name;
    
    document.getElementById('chosen-color-swatch').style.backgroundColor = hex;
    document.getElementById('chosen-color-name').textContent = name;
    document.getElementById('log-result').textContent = "";
}

function logLeaf() {
    if (!activeColorHex) {
        document.getElementById('log-result').textContent = "Please select a color!";
        document.getElementById('log-result').style.color = "var(--utrgv-orange)";
        return;
    }
    
    console.log(`Anonymous Leaf Log: ${activeColorName} at Campus Level`);
    
    document.getElementById('log-result').textContent = translations[currentLang].success;
    document.getElementById('log-result').style.color = "var(--utrgv-green)";
}

updateTranslations();
