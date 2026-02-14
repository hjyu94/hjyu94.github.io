function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("lang");
}

function detectBrowserLang() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith("ko") ? "ko" : "en";
}

function applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-ko]");
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });
}

function preserveLangInLinks(lang) {
    const links = document.querySelectorAll("a[href]");

    links.forEach(link => {
        const url = new URL(link.href, window.location.origin);

        if (url.origin !== window.location.origin) return;
        if (url.searchParams.has("lang")) return;

        url.searchParams.set("lang", lang);
        link.href = url.pathname + url.search;
    });
}

function initLang() {
    let lang = getLangFromUrl();

    if (lang) {
        localStorage.setItem("lang", lang);
    } else {
        lang = localStorage.getItem("lang") || detectBrowserLang();
    }

    applyLanguage(lang);
    preserveLangInLinks(lang);
}

document.addEventListener("DOMContentLoaded", initLang);
