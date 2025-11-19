// Central i18n configuration
export const locales = ['en', 'ca', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';