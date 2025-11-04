import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/config';

export default createMiddleware({
  locales: [...locales],
  defaultLocale
});

export const config = {
  matcher: ['/', '/(es|ca|en)/:path*']
};