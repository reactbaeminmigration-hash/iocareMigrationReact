import de from '@/assets/i18n/de.json';
import en from '@/assets/i18n/en.json';
import es from '@/assets/i18n/es.json';
import fr from '@/assets/i18n/fr.json';
import it from '@/assets/i18n/it.json';
import ja from '@/assets/i18n/ja.json';
import ko from '@/assets/i18n/ko.json';
import zh from '@/assets/i18n/zh.json';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const resources = {
  ko: { translation: ko },
  de: { translation: de },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  en: { translation: en },
  ja: { translation: ja },
  zh: { translation: zh },
} as const;

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    debug: import.meta.env.VITE_APP_MODE === 'dev',
  });

export default i18next;
