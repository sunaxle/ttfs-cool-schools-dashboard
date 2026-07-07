let discoveries = new Set();

const translations = {
    en: {
        mainTitle: "Roots of the RGV Dashboard",
        scoreLabel: "Discoveries:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have students sit under the trees and get their hands dirty! Ask them to consider how people survived without modern stores.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Discuss the history of indigenous tribes in the Rio Grande Valley. Have students explore the interactive Mesquite tree to uncover its 4 traditional uses.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather and discuss which indigenous use of the tree surprised them the most.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Social Studies TEKS 113.15.b.2.A",
        teksObjective: "Understand how Native American groups lived in Texas and adapted to the environment.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Learning indigenous uses of native plants contextualizes history and demonstrates early sustainable practices.",
        appTitle: "Student App: Ethnobotany",
        instructions: "Click on all 4 parts of the Mesquite tree to learn how indigenous people of Texas used them!",
        defaultTitle: "Select a part of the tree",
        defaultDesc: "Discover the history and uses of the Mesquite tree.",
        beansTitle: "Mesquite Beans",
        beansDesc: "Indigenous people dried and ground the sweet seed pods into a flour to make cakes and bread. It was an essential food source!",
        woodTitle: "Wood & Trunk",
        woodDesc: "The hard wood was used to make tools, bows, and building materials. It also provided excellent firewood.",
        rootsTitle: "Roots",
        rootsDesc: "Roots were dug up and used for making strong cordage, baskets, and even natural medicines to heal wounds.",
        leavesTitle: "Leaves",
        leavesDesc: "Mesquite leaves were sometimes used to make medicinal teas to treat stomach aches and headaches."
    },
    es: {
        mainTitle: "Tablero de Raíces del RGV",
        scoreLabel: "Descubrimientos:",
        lessonTitle: "Plan de Lección Guiada (45 Min)",
        warmUpTitle: "Calentamiento (5m):",
        warmUpText: "¡Haga que los estudiantes se sienten bajo los árboles y se ensucien las manos! Pídales que piensen cómo la gente sobrevivía sin tiendas modernas.",
        coreActTitle: "Actividad Principal (30m):",
        coreActText: "Discuta la historia de las tribus indígenas. Haga que los estudiantes exploren el árbol de mezquite interactivo para descubrir sus 4 usos.",
        coolDownTitle: "Enfriamiento (10m):",
        coolDownText: "Reúna y discutan qué uso indígena del árbol les sorprendió más.",
        teksTitle: "Pedagogía TEKS",
        teksCitation: "Estudios Sociales TEKS 113.15.b.2.A",
        teksObjective: "Entender cómo vivían los grupos nativos americanos en Texas y se adaptaban al entorno.",
        teksWhyTitle: "Por qué es importante:",
        teksWhy: "Aprender los usos indígenas de las plantas nativas contextualiza la historia y demuestra prácticas sostenibles tempranas.",
        appTitle: "App Estudiantil: Etnobotánica",
        instructions: "¡Haz clic en las 4 partes del árbol de mezquite para aprender cómo los pueblos indígenas de Texas las usaban!",
        defaultTitle: "Selecciona una parte del árbol",
        defaultDesc: "Descubre la historia y los usos del árbol de mezquite.",
        beansTitle: "Vainas de Mezquite",
        beansDesc: "Los indígenas secaban y molían las vainas dulces para hacer harina para pasteles y pan. ¡Era una fuente de alimento esencial!",
        woodTitle: "Madera y Tronco",
        woodDesc: "La madera dura se usaba para hacer herramientas, arcos y materiales de construcción. También era excelente leña.",
        rootsTitle: "Raíces",
        rootsDesc: "Las raíces se desenterraban y se usaban para hacer cuerdas fuertes, cestas e incluso medicinas naturales para curar heridas.",
        leavesTitle: "Hojas",
        leavesDesc: "Las hojas de mezquite a veces se usaban para hacer tés medicinales para tratar dolores de estómago y de cabeza."
    },
    tm: {
        mainTitle: "Roots del Valle Dashboard",
        scoreLabel: "Descubrimientos:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have the kids sit under the trees and get their manos dirty! Ask them how people survived without HEB.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Platica sobre las tribus indígenas. Let them click the Mesquite tree to uncover the 4 ways they used it.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather around y platiquen which use of the tree blew their minds the most.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Social Studies TEKS 113.15.b.2.A",
        teksObjective: "Understand how Native Americans lived here in Texas.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Seeing how people used to live off the land shows them that being sustainable ain't a new thing.",
        appTitle: "Student App: Ethnobotany",
        instructions: "Click all 4 parts of the Mesquite tree to see how the native gente used them back in the day!",
        defaultTitle: "Pick a part of the tree",
        defaultDesc: "Check out the history of the Mesquite tree, bro.",
        beansTitle: "Mesquite Beans (Vainas)",
        beansDesc: "They used to dry and grind the sweet pods into flour for pan and cakes. Super important food source, man!",
        woodTitle: "Wood (Madera)",
        woodDesc: "The tough wood was perfect for tools, bows, and building stuff. Plus, it makes the best firewood for a carne asada.",
        rootsTitle: "Roots (Raíces)",
        rootsDesc: "They dug up the roots to make strong rope, baskets, and even remedios to fix you up when you got hurt.",
        leavesTitle: "Leaves (Hojas)",
        leavesDesc: "They'd make tecito out of the leaves if your panza was hurting or you had a headache."
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
    infoTitle: document.getElementById('info-title'),
    infoDesc: document.getElementById('info-desc')
};

const scoreValue = document.getElementById('score-value');
let currentSelection = 'default';

function updateLanguage(lang) {
    const t = translations[lang];
    for (let key in elements) {
        if (elements[key] && key !== 'infoTitle' && key !== 'infoDesc') {
            elements[key].textContent = t[key];
        }
    }
    
    if (currentSelection === 'default') {
        elements.infoTitle.textContent = t.defaultTitle;
        elements.infoDesc.textContent = t.defaultDesc;
    } else if (currentSelection === 'beans') {
        elements.infoTitle.textContent = t.beansTitle;
        elements.infoDesc.textContent = t.beansDesc;
    } else if (currentSelection === 'wood') {
        elements.infoTitle.textContent = t.woodTitle;
        elements.infoDesc.textContent = t.woodDesc;
    } else if (currentSelection === 'roots') {
        elements.infoTitle.textContent = t.rootsTitle;
        elements.infoDesc.textContent = t.rootsDesc;
    } else if (currentSelection === 'leaves') {
        elements.infoTitle.textContent = t.leavesTitle;
        elements.infoDesc.textContent = t.leavesDesc;
    }
}

function handleDiscovery(part) {
    currentSelection = part;
    if (!discoveries.has(part)) {
        discoveries.add(part);
        scoreValue.textContent = discoveries.size + "/4";
        
        // Pulse animation
        scoreValue.parentElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            scoreValue.parentElement.style.transform = 'scale(1)';
        }, 300);

        if (discoveries.size === 4) {
            scoreValue.textContent = "4/4 ✨";
        }
    }
    updateLanguage(langToggle.value);
}

langToggle.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

document.getElementById('btn-beans').addEventListener('click', (e) => {
    e.stopPropagation();
    handleDiscovery('beans');
});

document.getElementById('btn-wood').addEventListener('click', (e) => {
    e.stopPropagation();
    handleDiscovery('wood');
});

document.getElementById('btn-roots').addEventListener('click', (e) => {
    e.stopPropagation();
    handleDiscovery('roots');
});

document.getElementById('btn-leaves').addEventListener('click', (e) => {
    e.stopPropagation();
    handleDiscovery('leaves');
});

document.querySelector('.tree-canopy').addEventListener('click', () => {
    handleDiscovery('leaves');
});

updateLanguage('en');
