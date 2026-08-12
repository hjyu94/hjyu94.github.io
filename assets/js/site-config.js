const siteConfigScriptUrl = document.currentScript?.src;
const profileImageUrl = siteConfigScriptUrl
    ? new URL("../images/profile.jpg", siteConfigScriptUrl).href
    : "assets/images/profile.jpg";

window.SITE_CONFIG = Object.freeze({
    language: {
        enabled: false,
        default: "ko" // "ko" | "en"
    },
    profile: {
        name: {
            ko: "유효정",
            en: "Hyojeong Yu"
        },
        title: {
            ko: "3D Engine Programmer",
            en: "Software Engineer"
        },
        location: {
            ko: "📍 대한민국 서울",
            en: "📍 Melbourne, Australia"
        },
        links: {
            linkedin: "https://www.linkedin.com/in/hjeongyu",
            github: "https://github.com/hjyu94",
            email: "hjeong.you@gmail.com"
        },
        image: profileImageUrl
    }
});
