import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LessonsApp
              </Link>
            </div>
            <div className="flex gap-x-8">
              <Link href="/" className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">About</Link>
              <Link href="/crud" className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">CRUD</Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t bg-white p-8">
          <div className="mx-auto max-w-7xl text-center text-sm text-slate-500">
            &copy; 2026 LessonsApp. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

