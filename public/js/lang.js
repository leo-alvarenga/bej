const LANG_EVENT = 'lang'

function redirect(lang) {
    let url = location.href.split('?')[0];

    window.location.href = url += `?lang=${lang}`;
}

function setLang(lang, redirect = true) {
    try {
        localStorage.setItem('lang', lang);
        
        if (redirect) redirect(lang);
    } catch (e) {
        console.log('could not save the preferred language to local storage', e);
    }
}

function getLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang')

    if (paramLang) {
        setLang(paramLang, false);
        return paramLang;
    }

    const lsLang = localStorage.getItem('lang');

    if (!lsLang) {
        setLang('en');
    }

    redirect(lsLang ?? 'en');
}

const event = new Event(LANG_EVENT);

const lang = getLang();
document.addEventListener(LANG_EVENT, () => redirect(lang === 'en' ? 'pt' : 'en'), false);

function triggerLangChange() {
    document.dispatchEvent(event);
}

setTimeout(() => {
    const b = document.getElementById('lang');

    if (!b) {
        console.error('could not set up language switcher');
        return;
    }

    b.onclick = triggerLangChange;
}, 1000);

