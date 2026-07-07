const translations = {
    en: {
        title: "Adopt A Worm Tracker",
        subtitle: "Check on the campus vermicompost bin and track worm colony health.",
        temp: "Temperature",
        moist: "Moisture",
        food: "Food Level",
        status_good: "Good",
        status_feed: "Feed Soon",
        status_full: "Full",
        log_feed_title: "Log a Feeding",
        opt_scraps: "Fruit/Veg Scraps",
        opt_paper: "Shredded Paper",
        opt_grounds: "Coffee Grounds",
        feed_btn: "Add Food",
        fed_msg: "Feeding logged! The worms are happy."
    },
    es: {
        title: "Rastreador Adopta una Lombriz",
        subtitle: "Revisa el contenedor de compost del campus y la salud de las lombrices.",
        temp: "Temperatura",
        moist: "Humedad",
        food: "Nivel de Comida",
        status_good: "Bien",
        status_feed: "Alimentar Pronto",
        status_full: "Lleno",
        log_feed_title: "Registrar Alimentación",
        opt_scraps: "Sobras de Fruta/Verdura",
        opt_paper: "Papel Triturado",
        opt_grounds: "Posos de Café",
        feed_btn: "Agregar Comida",
        fed_msg: "¡Alimentación registrada! Las lombrices están felices."
    },
    texmex: {
        title: "Adopt A Worm Tracker",
        subtitle: "Checa el compost bin del campus y los worms.",
        temp: "Temperature",
        moist: "Humedad",
        food: "Food Level",
        status_good: "Good",
        status_feed: "Feed Soon",
        status_full: "Lleno",
        log_feed_title: "Log a Feeding",
        opt_scraps: "Fruit/Veggie Scraps",
        opt_paper: "Shredded Papel",
        opt_grounds: "Coffee Grounds",
        feed_btn: "Add Food",
        fed_msg: "Feeding logged! Los worms están felices."
    }
};

let currentLang = 'en';

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    
    document.querySelector('option[value="scraps"]').textContent = translations[currentLang].opt_scraps;
    document.querySelector('option[value="paper"]').textContent = translations[currentLang].opt_paper;
    document.querySelector('option[value="grounds"]').textContent = translations[currentLang].opt_grounds;
}

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateTranslations();
});

function feedWorms() {
    const foodVal = document.getElementById('food-val');
    foodVal.textContent = currentLang === 'es' ? 'Alto' : 'High';
    
    const statusEl = document.querySelector('.status.warning');
    if (statusEl) {
        statusEl.className = 'status healthy';
        statusEl.setAttribute('data-i18n', 'status_full');
        statusEl.textContent = translations[currentLang].status_full;
    }
    
    document.getElementById('feed-msg').textContent = translations[currentLang].fed_msg;
    
    console.log("Anonymous campus bin feeding logged.");
}

updateTranslations();
