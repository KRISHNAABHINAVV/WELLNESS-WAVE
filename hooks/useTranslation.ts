
import { useLanguage } from '../context/LanguageContext';
import { translations, DEFAULT_LANGUAGE } from '../i18n';

type Translations = typeof translations;
type Language = keyof Translations;
type TranslationKey = keyof Translations['en'];

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key: TranslationKey, options?: { [key: string]: string | number }): string => {
        const lang = language as Language;
        let text = translations[lang]?.[key] || translations[DEFAULT_LANGUAGE][key];
        
        if (text && options) {
            Object.keys(options).forEach(optionKey => {
                text = text.replace(`{{${optionKey}}}`, String(options[optionKey]));
            });
        }
        
        return text || key;
    };

    return { t, language };
};
