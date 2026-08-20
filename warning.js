const warningTranslations = {
    ru: {
        title: "Ты не прочел / прочла правила!!!",
        readRulesBtn: "Прочитать правила",
        backBtn: "Назад",
        about: "Обо мне",
        games: "Наши игры",
        functions: "Полезные функции"
    },
    en: {
        title: "You haven't read the rules!!!",
        readRulesBtn: "Read the rules",
        backBtn: "Back",
        about: "About me",
        games: "Our games",
        functions: "Useful functions"
    },
    de: {
        title: "Du hast die Regeln nicht gelesen!!!",
        readRulesBtn: "Regeln lesen",
        backBtn: "Zurück",
        about: "Über mich",
        games: "Unsere Spiele",
        functions: "Nützliche Funktionen"
    }
};

let currentLang = localStorage.getItem('warning_language') || 'ru';

function t(key) {
    return warningTranslations[currentLang]?.[key] || warningTranslations.ru[key];
}

function updateWarningUILanguage() {
    const titleEl = document.getElementById('warningTitle');
    if (titleEl) titleEl.textContent = t('title');
    
    const btns = document.querySelectorAll('.warning-btn');
    const keys = ['readRulesBtn', 'backBtn'];
    btns.forEach((btn, idx) => {
        if (idx < keys.length) {
            const icon = btn.querySelector('i');
            const text = t(keys[idx]);
            if (icon) {
                btn.innerHTML = icon.outerHTML + ' ' + text;
            } else {
                btn.textContent = text;
            }
        }
    });
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const flags = { ru: '🌐 RU', en: '🌐 EN', de: '🌐 DE' };
        langBtn.innerHTML = flags[currentLang];
    }
    
    document.querySelectorAll('.nav-links a').forEach((link, idx) => {
        const keysNav = ['about', 'games', 'functions'];
        if (idx < keysNav.length) link.textContent = t(keysNav[idx]);
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('warning_language', lang);
    updateWarningUILanguage();
}

document.querySelectorAll('.lang-dropdown a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        if (lang) changeLanguage(lang);
    });
});

updateWarningUILanguage();