import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import ru from './../../locales/ru.json';
import en from './../../locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: 'en',
    supportedLngs: ['ru', 'en'],
    interpolation: { escapeValue: false },
    resources: { ru: { translation: ru }, en: { translation: en } },
  });

export default i18n;
