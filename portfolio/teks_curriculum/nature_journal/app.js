let score = 0;

const prompts = {
    en: [
        "Draw the shape of the nearest leaf.",
        "What do you hear when you close your eyes for 30 seconds?",
        "Rub some dirt between your fingers. Describe how it feels.",
        "Look up. Draw the pattern of branches against the sky.",
        "Find a bug. Write a story about where it's going."
    ],
    es: [
        "Dibuja la forma de la hoja más cercana.",
        "¿Qué escuchas cuando cierras los ojos por 30 segundos?",
        "Frota un poco de tierra entre tus dedos. Describe cómo se siente.",
        "Mira hacia arriba. Dibuja el patrón de las ramas contra el cielo.",
        "Encuentra un insecto. Escribe una historia sobre a dónde va."
    ],
    tm: [
        "Draw the shape of the closest leaf, bro.",
        "What do you hear when you close your ojos for 30 seconds?",
        "Rub some tierra between your fingers. How does it feel?",
        "Mira up. Draw the branches against the sky.",
        "Find a bug. Escribe a story about where it's going."
    ]
};

let currentPromptIndex = 0;

const translations = {
    en: {
        mainTitle: "Nature Journal Dashboard",
        scoreLabel: "Prompts Completed:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have students sit under the trees, get their hands dirty, and take deep breaths. Hand out physical hardbound journals.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Students use the Prompt Generator in the app to get a sensory prompt, then draw or write their response in their PHYSICAL journal.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather and have students share their favorite drawing or sentence from their journal.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "ELA TEKS 110.6.b.11.A",
        teksObjective: "Compose literary texts, including personal narratives and poetry.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Combining sensory observation with descriptive writing builds vocabulary and fosters an emotional connection to nature.",
        appTitle: "Student App: Sensory Prompt Generator",
        instructions: "Click the button to get a new prompt for your physical journal!",
        generateBtn: "Get New Prompt",
        doneBtn: "I finished this prompt!",
        readyMsg: "Ready to write?",
        awesome: "✨ Awesome! ✨"
    },
    es: {
        mainTitle: "Tablero de Diario de la Naturaleza",
        scoreLabel: "Mensajes Completados:",
        lessonTitle: "Plan de Lección (45 Min)",
        warmUpTitle: "Calentamiento (5m):",
        warmUpText: "Haga que los estudiantes se sienten bajo los árboles, se ensucien las manos y respiren profundamente. Reparta diarios físicos.",
        coreActTitle: "Actividad Principal (30m):",
        coreActText: "Los estudiantes usan el Generador de Prompts en la aplicación y luego dibujan o escriben en su diario FÍSICO.",
        coolDownTitle: "Enfriamiento (10m):",
        coolDownText: "Reúna y haga que los estudiantes compartan su dibujo o oración favorita de su diario.",
        teksTitle: "Pedagogía TEKS",
        teksCitation: "Artes del Lenguaje TEKS 110.6.b.11.A",
        teksObjective: "Componer textos literarios, incluyendo narrativas personales y poesía.",
        teksWhyTitle: "Por qué es importante:",
        teksWhy: "Combinar la observación sensorial con la escritura descriptiva construye vocabulario y fomenta una conexión emocional con la naturaleza.",
        appTitle: "App Estudiantil: Generador de Prompts Sensoriales",
        instructions: "¡Haz clic en el botón para obtener un nuevo mensaje para tu diario físico!",
        generateBtn: "Obtener Nuevo Mensaje",
        doneBtn: "¡Terminé esto!",
        readyMsg: "¿Listo para escribir?",
        awesome: "✨ ¡Increíble! ✨"
    },
    tm: {
        mainTitle: "Nature Diario Dashboard",
        scoreLabel: "Prompts Hechos:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have the kids sit under the trees, get their manos dirty, and breathe. Hand out their real journals.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Los estudiantes use the Prompt Generator, then draw or write their response en su diario de verdad.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather the class and share su dibujo favorito or something they wrote.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "ELA TEKS 110.6.b.11.A",
        teksObjective: "Escribir historias y poetry.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Using senses and writing helps them learn new words and connect con la naturaleza.",
        appTitle: "Student App: Prompt Generator",
        instructions: "Click the button to get a prompt para tu physical journal!",
        generateBtn: "Get Nuevo Prompt",
        doneBtn: "¡Ya terminé!",
        readyMsg: "¿Ready to write?",
        awesome: "✨ ¡Órale, awesome! ✨"
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
    generateBtn: document.getElementById('generate-btn'),
    doneBtn: document.getElementById('done-btn')
};

const promptText = document.getElementById('current-prompt');
const scoreValue = document.getElementById('score-value');
const celebration = document.getElementById('celebration');

function updateLanguage(lang) {
    const t = translations[lang];
    for (let key in elements) {
        if (elements[key]) {
            elements[key].textContent = t[key];
        }
    }
    
    if (promptText.textContent === translations['en'].readyMsg || 
        promptText.textContent === translations['es'].readyMsg || 
        promptText.textContent === translations['tm'].readyMsg) {
        promptText.textContent = t.readyMsg;
    } else {
        promptText.textContent = prompts[lang][currentPromptIndex];
    }
    celebration.textContent = t.awesome;
}

langToggle.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

elements.generateBtn.addEventListener('click', () => {
    const lang = langToggle.value;
    const promptList = prompts[lang];
    currentPromptIndex = Math.floor(Math.random() * promptList.length);
    promptText.textContent = promptList[currentPromptIndex];
    celebration.style.display = 'none';
});

elements.doneBtn.addEventListener('click', () => {
    if (promptText.textContent === translations[langToggle.value].readyMsg) return;
    
    score += 1;
    scoreValue.textContent = score;
    celebration.style.display = 'block';
    
    // Animation
    promptText.style.transform = 'scale(1.05)';
    setTimeout(() => {
        promptText.style.transform = 'scale(1)';
    }, 200);
});

updateLanguage('en');
