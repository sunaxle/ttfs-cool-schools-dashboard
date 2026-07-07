let score = 0;

const translations = {
    en: {
        mainTitle: "Tree Geometry Dashboard",
        scoreLabel: "Points:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have students sit under the trees and get their hands dirty! Discuss how we can measure things without a tape measure (non-standard measurement).",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Students measure their pacing steps or arm spans. They use these body measurements to pace out the width of the tree's shadow and calculate the canopy area in the app.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather the class. Compare who found the largest canopy area and discuss why tree shade is important.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Math TEKS 111.6.b.8.C",
        teksObjective: "Model area formulas for parallelograms, trapezoids, and circles.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Connecting abstract math formulas to physical, living objects (like trees) increases retention and engagement.",
        appTitle: "Student App: Canopy Area",
        instructions: "Enter your body measurements to estimate the tree's canopy area! Earn points!",
        labelStepLength: "Your Step Length (feet):",
        labelStepsCount: "Steps across the shadow:",
        calcBtn: "Calculate Area!",
        resultPrefix: "Approximate Canopy Area: ",
        sqFeet: " sq ft",
        pointsEarned: " +10 Points!"
    },
    es: {
        mainTitle: "Tablero de Geometría de Árboles",
        scoreLabel: "Puntos:",
        lessonTitle: "Plan de Lección (45 Min)",
        warmUpTitle: "Calentamiento (5m):",
        warmUpText: "¡Haga que los estudiantes se sienten bajo los árboles y se ensucien las manos! Discuta cómo medir cosas sin una cinta métrica (medición no estándar).",
        coreActTitle: "Actividad Principal (30m):",
        coreActText: "Los estudiantes miden sus pasos. Usan estas medidas para calcular el ancho de la sombra del árbol y calcular el área en la app.",
        coolDownTitle: "Enfriamiento (10m):",
        coolDownText: "Reúna a la clase. Comparen quién encontró el área más grande y discutan la importancia de la sombra.",
        teksTitle: "Pedagogía TEKS",
        teksCitation: "Matemáticas TEKS 111.6.b.8.C",
        teksObjective: "Modelar fórmulas de área para paralelogramos, trapezoides y círculos.",
        teksWhyTitle: "Por qué es importante:",
        teksWhy: "Conectar fórmulas matemáticas abstractas con objetos físicos y vivos (como los árboles) aumenta la retención y el compromiso.",
        appTitle: "App Estudiantil: Área del Dosel",
        instructions: "¡Ingresa las medidas de tu cuerpo para calcular el área aproximada y gana puntos!",
        labelStepLength: "Longitud de tu paso (pies):",
        labelStepsCount: "Pasos a lo largo de la sombra:",
        calcBtn: "¡Calcular Área!",
        resultPrefix: "Área Aproximada: ",
        sqFeet: " pies cuad.",
        pointsEarned: " ¡+10 Puntos!"
    },
    tm: {
        mainTitle: "Tree Geometría Dashboard",
        scoreLabel: "Puntos:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have the kids sit under the trees and get their manos dirty! Talk about measuring without a tape measure.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Los estudiantes measure their steps. They use these body measurements to pace out the sombra and calculate the area in the app.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather the class. Compare who got the biggest area y platiquen why tree shade matters.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Math TEKS 111.6.b.8.C",
        teksObjective: "Modelar area formulas for parallelograms, trapezoids, y circles.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Connecting math formulas to real stuff outside like trees hace que se les grabe más.",
        appTitle: "Student App: Canopy Area",
        instructions: "¡Órale! Enter your body measurements to estimate the tree's canopy area and ganar puntos!",
        labelStepLength: "Your Paso Length (pies):",
        labelStepsCount: "Pasos across the shadow:",
        calcBtn: "Calculate Area, bro!",
        resultPrefix: "Más o menos the area is: ",
        sqFeet: " sq pies",
        pointsEarned: " ¡+10 Points!"
    }
};

const langToggle = document.getElementById('lang-toggle');
const elements = {
    mainTitle: document.getElementById('main-title'),
    scoreLabel: document.getElementById('score-label'),
    lessonTitle: document.getElementById('lesson-title'),
    warmUpTitle: document.getElementById('warm-up-title'),
    warmUpText: document.getElementById('warm-up-text'),
    coreActTitle: document.getElementById('core-act-title'),
    coreActText: document.getElementById('core-act-text'),
    coolDownTitle: document.getElementById('cool-down-title'),
    coolDownText: document.getElementById('cool-down-text'),
    teksTitle: document.getElementById('teks-title'),
    teksCitation: document.getElementById('teks-citation'),
    teksObjective: document.getElementById('teks-objective'),
    teksWhyTitle: document.getElementById('teks-why-title'),
    teksWhy: document.getElementById('teks-why'),
    appTitle: document.getElementById('app-title'),
    instructions: document.getElementById('instructions'),
    labelStepLength: document.getElementById('label-step-length'),
    labelStepsCount: document.getElementById('label-steps-count'),
    calcBtn: document.getElementById('calc-btn')
};

const resultDiv = document.getElementById('result');
const inputStepLength = document.getElementById('step-length');
const inputStepsCount = document.getElementById('steps-count');
const shadowVisual = document.querySelector('.shadow');
const scoreValue = document.getElementById('score-value');

function updateLanguage(lang) {
    const t = translations[lang];
    for (let key in elements) {
        if (elements[key]) {
            elements[key].textContent = t[key];
        }
    }
    if (resultDiv.textContent !== "") {
        calculateArea(false); // Update text without adding points
    }
}

function calculateArea(addPoints = true) {
    const stepLen = parseFloat(inputStepLength.value);
    const stepsCount = parseFloat(inputStepsCount.value);
    
    if (isNaN(stepLen) || stepLen <= 0 || isNaN(stepsCount) || stepsCount <= 0) return;
    
    const width = stepLen * stepsCount;
    const radius = width / 2;
    const area = Math.PI * Math.pow(radius, 2);
    
    const lang = langToggle.value;
    const t = translations[lang];
    
    if (addPoints) {
        score += 10;
        scoreValue.textContent = score;
        
        // Simple animation
        shadowVisual.style.transform = 'scale(1.1)';
        setTimeout(() => shadowVisual.style.transform = 'scale(1)', 200);
    }

    resultDiv.textContent = `${t.resultPrefix}${area.toFixed(2)}${t.sqFeet} ${addPoints ? t.pointsEarned : ''}`;
    
    shadowVisual.style.width = Math.min((width * 5), 250) + 'px';
}

langToggle.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

elements.calcBtn.addEventListener('click', () => calculateArea(true));

updateLanguage('en');

