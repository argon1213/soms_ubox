import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({

        lng: "en",   //default language

        fallbackLng: "en", //when specified language translations not present 

        //then fallbacklang translations loaded.

        // debug: true,
        debug: false,

        useSuspense: false,


        backend: {

            /* translation file path */

            loadPath: "/locales/{{lng}}/translation.json",

        },


        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */


        // ns: ["translations"],

        // defaultNS: "translations",

        keySeparator: false,

        interpolation: {

            escapeValue: false,

            formatSeparator: ",",

        },

        react: {


        },

    });


export default i18n;