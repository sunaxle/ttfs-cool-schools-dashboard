const initialData = [
    {
        id: 1,
        species: {
            en: "Montezuma Cypress",
            es: "Ciprés de Moctezuma",
            tx: "Sabino Grande"
        },
        status: "named",
        name: "Monty",
        fun_fact: {
            en: "I can live for thousands of years and I love to grow near the resacas!",
            es: "¡Puedo vivir miles de años y me encanta crecer cerca de las resacas!",
            tx: "I live for a long time and I chill by the resacas, cuh!"
        },
        image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        species: {
            en: "Cedar Elm",
            es: "Olmo Cedro",
            tx: "Olmo"
        },
        status: "unnamed",
        name: "",
        fun_fact: {
            en: "My leaves have jagged edges like a saw and feel a bit rough like sandpaper.",
            es: "Mis hojas tienen bordes dentados como una sierra y se sienten un poco ásperas.",
            tx: "My leaves got teeth like a saw and feel raspy like sandpaper."
        },
        image: "https://images.unsplash.com/photo-1590059530279-d57b545fdf29?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        species: {
            en: "Honey Mesquite",
            es: "Mezquite Dulce",
            tx: "Mesquite"
        },
        status: "pending",
        name: "Spiky Boi",
        fun_fact: {
            en: "I have very deep roots to find water in the dry brush.",
            es: "Tengo raíces muy profundas para encontrar agua en el matorral seco.",
            tx: "I got real deep roots to find water in the brush."
        },
        image: "https://images.unsplash.com/photo-1591851167448-43df8fcead92?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        species: {
            en: "Texas Ebony",
            es: "Ébano Tejano",
            tx: "Ebano"
        },
        status: "unnamed",
        name: "",
        fun_fact: {
            en: "I keep my dark green leaves all year round and make large woody seed pods.",
            es: "Mantengo mis hojas verde oscuro todo el año y produzco grandes vainas leñosas.",
            tx: "I keep my green leaves all year and make big ol' seed pods."
        },
        image: "https://images.unsplash.com/photo-1620295244588-3de7d7045b63?auto=format&fit=crop&w=400&q=80"
    }
];

let currentLang = 'en';
let trees = [...initialData];

// Translations dictionary
const i18n = {
    en: {
        appTitle: "Meet the Canopy",
        rosterTitle: "Campus Tree Roster",
        statusNamed: "Named",
        statusUnnamed: "Needs a Name!",
        statusPending: "Approval Pending",
        unnamedTree: "Unnamed Tree",
        submitNameBtn: "Submit Name",
        placeholderName: "Enter a creative name...",
        portalTitle: "Adopt-a-Tree",
        portalDesc: "Give this beautiful tree a creative name. Your teacher will review it before it goes live!",
        pendingTitle: "Teacher Approval Pending",
        pendingDesc: "Your name has been submitted to the teacher. Check back later to see if it was approved!",
        funFactPrefix: "Fun Fact:"
    },
    es: {
        appTitle: "Conoce el Dosel",
        rosterTitle: "Lista de Árboles",
        statusNamed: "Nombrado",
        statusUnnamed: "¡Necesita Nombre!",
        statusPending: "Aprobación Pendiente",
        unnamedTree: "Árbol Sin Nombre",
        submitNameBtn: "Enviar Nombre",
        placeholderName: "Escribe un nombre creativo...",
        portalTitle: "Adopta un Árbol",
        portalDesc: "Dale a este hermoso árbol un nombre creativo. ¡Tu maestro lo revisará antes de publicarlo!",
        pendingTitle: "Aprobación del Maestro Pendiente",
        pendingDesc: "Tu nombre ha sido enviado. ¡Vuelve más tarde para ver si fue aprobado!",
        funFactPrefix: "Dato Curioso:"
    },
    tx: {
        appTitle: "Meet the Canopy",
        rosterTitle: "Campus Tree Roster",
        statusNamed: "Named",
        statusUnnamed: "Needs a Name, fam!",
        statusPending: "Hold up, Teacher checkin'",
        unnamedTree: "No Name Tree",
        submitNameBtn: "Send it",
        placeholderName: "Drop a sick name...",
        portalTitle: "Adopt-a-Tree",
        portalDesc: "Give this tree a cool name. Teach gotta check it first before it's official, alright?",
        pendingTitle: "Teach is Checking It",
        pendingDesc: "Your name was sent. Check back later to see if Teach gave it a thumbs up!",
        funFactPrefix: "Real Talk:"
    }
};

const rosterGrid = document.getElementById('roster-grid');
const modalOverlay = document.getElementById('tree-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

function renderRoster() {
    rosterGrid.innerHTML = '';
    trees.forEach(tree => {
        const card = document.createElement('div');
        card.className = 'tree-card glass-panel';
        card.onclick = () => openModal(tree);

        let statusClass, statusText, displayName;
        
        switch(tree.status) {
            case 'named':
                statusClass = 'status-named';
                statusText = i18n[currentLang].statusNamed;
                displayName = tree.name;
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = i18n[currentLang].statusPending;
                displayName = i18n[currentLang].unnamedTree;
                break;
            case 'unnamed':
                statusClass = 'status-unnamed';
                statusText = i18n[currentLang].statusUnnamed;
                displayName = i18n[currentLang].unnamedTree;
                break;
        }

        card.innerHTML = `
            <div class="tree-img-wrapper">
                <img src="${tree.image}" alt="${tree.species[currentLang]}">
            </div>
            <div class="card-content">
                <span class="status-badge ${statusClass}">${statusText}</span>
                <h3 class="tree-name">${displayName}</h3>
                <p class="tree-species">${tree.species[currentLang]}</p>
            </div>
        `;
        rosterGrid.appendChild(card);
    });
}

function openModal(tree) {
    let contentHtml = '';

    if (tree.status === 'named') {
        contentHtml = `
            <div class="bio-card">
                <img class="bio-img" src="${tree.image}" alt="Tree">
                <div>
                    <h2 class="bio-name">${tree.name}</h2>
                    <p class="bio-species">${tree.species[currentLang]}</p>
                </div>
                <div class="bio-fact-box">
                    <p class="bio-fact-text"><strong>${i18n[currentLang].funFactPrefix}</strong> ${tree.fun_fact[currentLang]}</p>
                </div>
            </div>
        `;
    } else if (tree.status === 'unnamed') {
        contentHtml = `
            <div class="naming-portal">
                <div>
                    <h2 class="portal-title">${i18n[currentLang].portalTitle}</h2>
                    <p class="portal-desc">${i18n[currentLang].portalDesc}</p>
                </div>
                <div class="bio-card" style="gap: 0.5rem; margin-top: 1rem;">
                    <img class="bio-img" style="width: 100px; height: 100px;" src="${tree.image}" alt="Tree">
                    <p class="bio-species">${tree.species[currentLang]}</p>
                </div>
                <div class="naming-form">
                    <input type="text" id="new-tree-name" class="name-input" placeholder="${i18n[currentLang].placeholderName}" maxlength="20">
                    <button class="submit-btn" onclick="submitName(${tree.id})">
                        ${i18n[currentLang].submitNameBtn} <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
    } else if (tree.status === 'pending') {
        contentHtml = `
            <div class="pending-state">
                <i class="fa-solid fa-clock-rotate-left pending-icon"></i>
                <h2 class="pending-title">${i18n[currentLang].pendingTitle}</h2>
                <p class="portal-desc">${i18n[currentLang].pendingDesc}</p>
            </div>
        `;
    }

    modalBody.innerHTML = contentHtml;
    modalOverlay.classList.add('active');
}

// Attach submitName to window so inline onclick works
window.submitName = function(treeId) {
    const input = document.getElementById('new-tree-name');
    const newName = input.value.trim();

    if (newName) {
        // Update tree status
        const treeIndex = trees.findIndex(t => t.id === treeId);
        if (treeIndex > -1) {
            trees[treeIndex].status = 'pending';
            trees[treeIndex].name = newName;
            
            // Re-render
            renderRoster();
            
            // Show pending state in modal
            openModal(trees[treeIndex]);
        }
    }
}

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// Language Toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentLang = e.target.getAttribute('data-lang');
        updateStaticText();
        renderRoster();
    });
});

function updateStaticText() {
    document.getElementById('app-title').textContent = i18n[currentLang].appTitle;
    document.getElementById('roster-title').textContent = i18n[currentLang].rosterTitle;
}

// Init
updateStaticText();
renderRoster();
