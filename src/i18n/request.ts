import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale, type Locale} from './config';

// Static loader map so bundlers can statically analyze imports
const messagesLoader: Record<Locale, () => Promise<Record<string, unknown>>> = {
  es: () => import('./messages/es.json').then(m => m.default as Record<string, unknown>),
  ca: () => import('./messages/ca.json').then(m => m.default as Record<string, unknown>),
  en: () => import('./messages/en.json').then(m => m.default as Record<string, unknown>)
};

export default getRequestConfig(async ({requestLocale}) => {
  const requested = (await requestLocale) as string | undefined;
  const isSupported = (val: string): val is Locale => (locales as readonly string[]).includes(val);
  const resolved: Locale = requested && isSupported(requested) ? requested : defaultLocale;

  return {
    locale: resolved,
    messages: await messagesLoader[resolved]()
  };
});