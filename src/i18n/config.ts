export const supportedLocales = ['ru', 'uk', 'en', 'de', 'fr', 'es'] as const;
export type Locale = (typeof supportedLocales)[number];

export const implementedLocales: Locale[] = ['ru'];
export const defaultLocale: Locale = 'ru';

export const localeMeta: Record<Locale, { label: string; shortLabel: string; htmlLang: string }> = {
  ru: { label: 'Русский', shortLabel: 'RU', htmlLang: 'ru' },
  uk: { label: 'Українська', shortLabel: 'UK', htmlLang: 'uk' },
  en: { label: 'English', shortLabel: 'EN', htmlLang: 'en' },
  de: { label: 'Deutsch', shortLabel: 'DE', htmlLang: 'de' },
  fr: { label: 'Français', shortLabel: 'FR', htmlLang: 'fr' },
  es: { label: 'Español', shortLabel: 'ES', htmlLang: 'es' },
};
