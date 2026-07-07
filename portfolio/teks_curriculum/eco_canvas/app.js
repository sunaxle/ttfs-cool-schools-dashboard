let score = 0;

const translations = {
    en: {
        mainTitle: "Eco-Canvas Dashboard",
        scoreLabel: "Art Points:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have students sit under the trees and get their hands dirty! Feel the bark and look at the leaves.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Students use the app to match the leaf shapes they found to the correct bark textures they felt. Then, they do a physical bark rubbing on paper.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Share the bark rubbings and discuss how different trees have different patterns.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Art TEKS 117.111.b.1.A",
        teksObjective: "Explore ideas from life experiences about family, peers, and the natural environment.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Observing patterns and textures in nature (like leaves and bark) inspires artistic expression and attention to detail.",
        appTitle: "Student App: Pattern Matching",
        instructions: "Match the leaf shape to the correct bark texture to earn Art Points!",
        leavesTitle: "Leaves",
        barksTitle: "Barks",
        leafOak: "Oak Leaf (Lobed)",
        leafPine: "Pine Needles (Linear)",
        leafMesquite: "Mesquite (Bipinnate)",
        barkPine: "Rough & Scaly",
        barkMesquite: "Dark & Fissured",
        barkOak: "Deeply Ridged",
        success: "Masterpiece! You matched them all.",
        resetBtn: "Reset Canvas"
    },
    es: {
        mainTitle: "Tablero de Lienzo Ecológico",
        scoreLabel: "Puntos de Arte:",
        lessonTitle: "Plan de Lección Guiada (45 Min)",
        warmUpTitle: "Calentamiento (5m):",
        warmUpText: "¡Haga que los estudiantes se sienten bajo los árboles y se ensucien las manos! Sientan la corteza y miren las hojas.",
        coreActTitle: "Actividad Principal (30m):",
        coreActText: "Los estudiantes usan la aplicación para emparejar la forma de la hoja con la textura de la corteza. Luego, hacen un frotamiento de corteza en papel.",
        coolDownTitle: "Enfriamiento (10m):",
        coolDownText: "Compartan los frotamientos de corteza y discutan cómo los diferentes árboles tienen patrones diferentes.",
        teksTitle: "Pedagogía TEKS",
        teksCitation: "Arte TEKS 117.111.b.1.A",
        teksObjective: "Explorar ideas de experiencias de vida sobre la familia, los compañeros y el entorno natural.",
        teksWhyTitle: "Por qué es importante:",
        teksWhy: "Observar patrones y texturas en la naturaleza (como hojas y corteza) inspira la expresión artística y la atención al detalle.",
        appTitle: "App Estudiantil: Emparejamiento",
        instructions: "¡Empareja la forma de la hoja con la textura de corteza correcta para ganar Puntos de Arte!",
        leavesTitle: "Hojas",
        barksTitle: "Cortezas",
        leafOak: "Hoja de Roble (Lobulada)",
        leafPine: "Agujas de Pino (Lineal)",
        leafMesquite: "Mezquite (Bipinnada)",
        barkPine: "Áspera y Escamosa",
        barkMesquite: "Oscura y Fisurada",
        barkOak: "Profundamente Estriada",
        success: "¡Obra maestra! Los emparejaste todos.",
        resetBtn: "Reiniciar Lienzo"
    },
    tm: {
        mainTitle: "Eco-Canvas Dashboard",
        scoreLabel: "Puntos de Arte:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have the kids sit under the trees and get their manos dirty! Feel the bark and look at the hojas.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Los estudiantes use the app to match the leaf shape to the bark. Then, they do a physical bark rubbing on paper.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Share the bark rubbings y platiquen how different trees have different patterns.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Art TEKS 117.111.b.1.A",
        teksObjective: "Explore ideas from nature and everyday life.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Looking closely at nature patterns gives them ideas to be creative and make cool art.",
        appTitle: "Student App: Pattern Matching",
        instructions: "Match the leaf with the right bark to ganar Art Points, bro!",
        leavesTitle: "Leaves (Hojas)",
        barksTitle: "Bark (Cáscara)",
        leafOak: "Oak Leaf (Lobed)",
        leafPine: "Pine Needles",
        leafMesquite: "Mesquite Leaves",
        barkPine: "Rough y Scaly",
        barkMesquite: "Dark y Fissured",
        barkOak: "Deeply Ridged",
        success: "¡Chingón! You matched them all, maestro.",
        resetBtn: "Reset"
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
    leavesTitle: document.getElementById('leaves-title'),
    barksTitle: document.getElementById('barks-title'),
    resetBtn: document.getElementById('reset-btn'),
    'leaf-oak': document.getElementById('leaf-oak'),
    'leaf-pine': document.getElementById('leaf-pine'),
    'leaf-mesquite': document.getElementById('leaf-mesquite')
};

const msg = document.getElementById('message');
const scoreValue = document.getElementById('score-value');

let matchedCount = 0;

document.querySelectorAll('.dropzone').forEach(zone => {
    const text = zone.textContent;
    zone.innerHTML = `<span class="bark-text">${text}</span>`;
});

function updateLanguage(lang) {
    const t = translations[lang];
    for (let key in elements) {
        if (elements[key] && key !== 'leaf-oak' && key !== 'leaf-pine' && key !== 'leaf-mesquite') {
            elements[key].textContent = t[key];
        }
    }
    
    elements['leaf-oak'].textContent = t.leafOak;
    elements['leaf-pine'].textContent = t.leafPine;
    elements['leaf-mesquite'].textContent = t.leafMesquite;
    
    document.querySelector('#bark-pine .bark-text').textContent = t.barkPine;
    document.querySelector('#bark-mesquite .bark-text').textContent = t.barkMesquite;
    document.querySelector('#bark-oak .bark-text').textContent = t.barkOak;

    if (matchedCount === 3) {
        msg.textContent = t.success;
    }
}

langToggle.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

const leaves = document.querySelectorAll('.leaf');
const dropzones = document.querySelectorAll('.dropzone');

leaves.forEach(leaf => {
    leaf.addEventListener('dragstart', () => {
        leaf.classList.add('dragging');
    });

    leaf.addEventListener('dragend', () => {
        leaf.classList.remove('dragging');
    });
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('over');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('over');
    });

    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('over');
        const leaf = document.querySelector('.dragging');
        if (leaf && leaf.dataset.match === zone.dataset.match) {
            zone.appendChild(leaf);
            zone.classList.add('matched');
            leaf.draggable = false;
            matchedCount++;
            
            // Score animation
            score += 50;
            scoreValue.textContent = score;
            scoreValue.parentElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                scoreValue.parentElement.style.transform = 'scale(1)';
            }, 300);

            if (matchedCount === 3) {
                msg.textContent = translations[langToggle.value].success;
            }
        }
    });
});

elements.resetBtn.addEventListener('click', () => {
    matchedCount = 0;
    score = 0;
    scoreValue.textContent = score;
    msg.textContent = "";
    const leavesCol = document.getElementById('leaves-col');
    leaves.forEach(leaf => {
        leavesCol.appendChild(leaf);
        leaf.draggable = true;
    });
    dropzones.forEach(zone => {
        zone.classList.remove('matched');
    });
});

updateLanguage('en');
