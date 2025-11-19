import {NextIntlClientProvider} from 'next-intl';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {locales, Locale} from '@/i18n/config';
import Footer from "./components/Footer/Footer";
import "../globals.css";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}> | {locale: string};
}) {
  const resolved = 'then' in params ? await params : params;
  const locale = resolved.locale as Locale;
  
  if (!locales.includes(locale)) notFound();

  // Preload messages on the server for hydration
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

