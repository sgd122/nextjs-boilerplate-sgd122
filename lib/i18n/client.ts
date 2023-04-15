'use client';

import i18next from 'i18next';
// import LocizeBackend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  UseTranslationOptions,
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';

import { getOptions } from './settings';

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  // .use(LocizeBackend) // locize backend could be used on client side, but prefer to keep it in sync with server side
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  });

export function useTranslation(
  lng: string | undefined,
  ns: string,
  options?: UseTranslationOptions<undefined> | undefined
) {
  if (i18next.resolvedLanguage !== lng) i18next.changeLanguage(lng);
  return useTranslationOrg(ns, options);
}
