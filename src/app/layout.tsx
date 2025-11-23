import type { Metadata } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import "./globals.css";


const haffer = localFont({
  src: [
    {
      path: '../../public/fonts/Haffer-TRIAL-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Haffer-TRIAL-Regular.woff2', 
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Haffer-TRIAL-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Haffer-TRIAL-MediumItalic.woff2', 
      weight: '500',
      style: 'italic',
    }
  ],
  variable: '--font-haffer',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Dz node",
  description: "Development studio for web apps, web design and SEO",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={haffer.variable}>
        {children}
      </body>
    </html>
  );
}
