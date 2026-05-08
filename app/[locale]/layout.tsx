import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import LanguageSwitcher from "@/components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Lessons",
  description: "Next.js routing and CRUD practice",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations('Navbar');
  const tf = await getTranslations('Footer');

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <Link href={`/${locale}`} className="-m-1.5 p-1.5 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  LessonsApp
                </Link>
              </div>
              <div className="flex items-center gap-x-8">
                <Link href={`/${locale}`} className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">{t('home')}</Link>
                <Link href={`/${locale}/about`} className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">{t('about')}</Link>
                <Link href={`/${locale}/crud`} className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">{t('crud')}</Link>
                <Link href={`/${locale}/contact`} className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">{t('contact')}</Link>
                <div className="ml-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t bg-white p-8">
            <div className="mx-auto max-w-7xl text-center text-sm text-slate-500">
              &copy; 2026 LessonsApp. {tf('rights')}
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


