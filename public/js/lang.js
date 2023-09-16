function redirect(lang) {
    let url = location.href.split('?')[0];

    if (url[url.length -1] !== '/') {
        url += '/';
    }

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

getLang();
