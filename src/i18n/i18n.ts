// Проброс языка в API
// Если у вас локализация распространяется и на API, вам нужно прокидывать язык
//  в запросы. Его можно брать из нашего файла i18n и добавлять в
// заголовок. Например, в fetch-запросе:

// await fetch('/api/user', {
//   headers: {
//     'Authorization': getAccessToken(),
//     'Accept-Language': i18n.language, // берем текущий язык
//   }
// });

import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import { TranslationTypes } from "./translations/TranslationsTypes"
import en from "./translations/en_translation.json"
import ru from "./translations/ru_translation.json"

const resources: Record<string, { translation: TranslationTypes }> = {
  en: { translation: en },
  ru: { translation: ru },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
