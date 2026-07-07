let score = 0;

const translations = {
    en: {
        mainTitle: "Campus Botanist Dashboard",
        scoreLabel: "Ecosystem Health:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have students sit under the trees and get their hands dirty! Discuss what bugs, birds, and plants they see right now.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Students search the campus for examples of producers and consumers. Then, they use the app to drag and drop these organisms into a balanced food web.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather and ask students what would happen to the food web if the trees were removed.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Science TEKS 112.14.b.9.B",
        teksObjective: "Describe the flow of energy through food webs, beginning with the Sun.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Understanding food webs helps students appreciate the interconnectedness of local ecosystems on their own campus.",
        appTitle: "Student App: Food Webs",
        instructions: "Drag the organisms to complete the food web!",
        sun: "Sun",
        tree: "Tree",
        bug: "Bug",
        bird: "Bird",
        energy: "Energy Source",
        producer: "Producer",
        consumer: "Consumer",
        predator: "Predator",
        success: "Great job! The ecosystem is balanced (100% Health)."
    },
    es: {
        mainTitle: "Tablero de Botánico del Campus",
        scoreLabel: "Salud del Ecosistema:",
        lessonTitle: "Plan de Lección Guiada (45 Min)",
        warmUpTitle: "Calentamiento (5m):",
        warmUpText: "¡Haga que los estudiantes se sienten bajo los árboles y se ensucien las manos! Discuta qué insectos, aves y plantas ven en este momento.",
        coreActTitle: "Actividad Principal (30m):",
        coreActText: "Los estudiantes buscan productores y consumidores en el campus. Luego, arrastran estos organismos en la app para equilibrar la red alimentaria.",
        coolDownTitle: "Enfriamiento (10m):",
        coolDownText: "Reúna y pregunte a los estudiantes qué pasaría con la red alimentaria si se quitaran los árboles.",
        teksTitle: "Pedagogía TEKS",
        teksCitation: "Ciencias TEKS 112.14.b.9.B",
        teksObjective: "Describir el flujo de energía a través de las redes alimentarias, comenzando con el Sol.",
        teksWhyTitle: "Por qué es importante:",
        teksWhy: "Entender las redes alimentarias ayuda a los estudiantes a apreciar la interconexión de los ecosistemas locales en su propio campus.",
        appTitle: "App Estudiantil: Redes Alimentarias",
        instructions: "¡Arrastra los organismos para completar la red alimentaria!",
        sun: "Sol",
        tree: "Árbol",
        bug: "Insecto",
        bird: "Pájaro",
        energy: "Fuente de Energía",
        producer: "Productor",
        consumer: "Consumidor",
        predator: "Depredador",
        success: "¡Buen trabajo! El ecosistema está equilibrado (100% Salud)."
    },
    tm: {
        mainTitle: "Campus Botanist Dashboard",
        scoreLabel: "Ecosystem Health:",
        lessonTitle: "Guided Lesson Plan (45 Min)",
        warmUpTitle: "Warm-Up (5m):",
        warmUpText: "Have the kids sit under the trees and get their manos dirty! Platiquen what bugs, birds, and plants they see right now.",
        coreActTitle: "Core Activity (30m):",
        coreActText: "Los estudiantes search the campus for producers and consumers. Then, they use the app to drag and drop these to make the food web.",
        coolDownTitle: "Cool-Down (10m):",
        coolDownText: "Gather and ask them what would happen to everything si quitan los árboles.",
        teksTitle: "TEKS Pedagogy",
        teksCitation: "Science TEKS 112.14.b.9.B",
        teksObjective: "Describe el flow de energía through food webs, starting with the Sun.",
        teksWhyTitle: "Why this matters:",
        teksWhy: "Saber de food webs helps los chamacos see how everything connects right here at school.",
        appTitle: "Student App: Food Webs",
        instructions: "¡Órale! Drag the animals y plants to make the food web.",
        sun: "Sol",
        tree: "Árbol",
        bug: "Bicho",
        bird: "Pajarito",
        energy: "Energy Source",
        producer: "Producer",
        consumer: "Consumer",
        predator: "Predator",
        success: "¡A toda madre! The ecosystem is balanced (100% Health)."
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
    sun: document.getElementById('sun'),
    tree: document.getElementById('tree'),
    bug: document.getElementById('bug'),
    bird: document.getElementById('bird')
};

const msg = document.getElementById('message');
const scoreValue = document.getElementById('score-value');

const zones = {
    energy: document.querySelector('#zone-energy .label'),
    producer: document.querySelector('#zone-producer .label'),
    consumer: document.querySelector('#zone-consumer .label'),
    predator: document.querySelector('#zone-predator .label')
};

function updateLanguage(lang) {
    const t = translations[lang];
    
    for (let key in elements) {
        if (elements[key]) {
            elements[key].textContent = t[key];
        }
    }
    
    if (zones.energy && zones.energy.parentNode) zones.energy.textContent = t.energy;
    if (zones.producer && zones.producer.parentNode) zones.producer.textContent = t.producer;
    if (zones.consumer && zones.consumer.parentNode) zones.consumer.textContent = t.consumer;
    if (zones.predator && zones.predator.parentNode) zones.predator.textContent = t.predator;
    
    if (msg.textContent !== "") {
        msg.textContent = t.success;
    }
}

langToggle.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        checkWin();
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
        const draggable = document.querySelector('.dragging');
        if (draggable && draggable.dataset.type === zone.dataset.accept) {
            zone.innerHTML = '';
            zone.appendChild(draggable);
            draggable.style.boxShadow = 'none';
            
            // Add points on successful drop
            score += 25;
            scoreValue.textContent = score;
            
            // Pulse animation
            scoreValue.parentElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                scoreValue.parentElement.style.transform = 'scale(1)';
            }, 300);
        }
    });
});

function checkWin() {
    const allFilled = Array.from(dropzones).every(zone => zone.children.length > 0 && zone.children[0].classList.contains('draggable'));
    if (allFilled) {
        msg.textContent = translations[langToggle.value].success;
    }
}

updateLanguage('en');
