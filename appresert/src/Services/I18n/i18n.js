import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./en.js";
import fr from "./fr.js";
import { useSelector } from 'react-redux';

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    detection: {
        order: ['navigator', 'localStorage', 'cookie'],
        caches: ['localStorage', 'cookie'], // Cacher la langue pour la session suivante
    },
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

const DetectedLang = async () => {
    const users = useSelector(state => state.users);

    try {
        let language = 'en';

        if (users.authenticated) {
            language = users.users.language.toLowerCase();
        }
        else {
            language = await new Promise((resolve) => {
                i18n.languageDetector.detect((err, lng) => {
                    if (err) {
                        console.error('Error detecting language:', err);
                    }
                    resolve(lng || "en");
                });
            });
        }

        return language;
    } catch (error) {
        console.error('Error fetching browser language:', error);
        return "en";
    }
};

export const initializeApp = async () => {
    const lng = await DetectedLang();
    i18n.changeLanguage(lng);
    return i18n;
};

export default i18n;
