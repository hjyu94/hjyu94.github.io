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

function applyProfileConfig(lang) {
    const profile = window.SITE_CONFIG?.profile;
    const card = document.querySelector(".profile-card");

    if (!profile || !card) return;

    const image = card.querySelector(".profile-img");
    const name = card.querySelector("h1");
    const title = card.querySelector(".title");
    const linkedIn = card.querySelector('a[href*="linkedin.com"]');
    const github = card.querySelector('a[href*="github.com"]');
    const email = card.querySelector('a[href^="mailto:"]');
    const location = card.querySelector(".links p");

    if (image) {
        image.src = profile.image;
        image.alt = profile.name[lang] || profile.name.en;
    }
    if (name) name.textContent = profile.name[lang] || profile.name.en;
    if (title) title.textContent = profile.title[lang] || profile.title.en;
    if (location) location.textContent = profile.location[lang] || profile.location.en;
    if (linkedIn) linkedIn.href = profile.links.linkedin;
    if (github) github.href = profile.links.github;
    if (email) email.href = `mailto:${profile.links.email}`;
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
    const languageConfig = window.SITE_CONFIG?.language || {};
    const languageEnabled = languageConfig.enabled !== false;
    const languageSwitch = document.querySelector(".lang-switch");
    let lang = languageConfig.default || "en";

    if (languageEnabled) {
        const requestedLang = getLangFromUrl();
        lang = requestedLang || localStorage.getItem("lang") || detectBrowserLang();
        localStorage.setItem("lang", lang);
    } else if (languageSwitch) {
        languageSwitch.hidden = true;
    }

    document.documentElement.lang = lang;
    applyLanguage(lang);
    applyProfileConfig(lang);
    if (languageEnabled) preserveLangInLinks(lang);
}

document.addEventListener("DOMContentLoaded", initLang);
