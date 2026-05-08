"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleLanguageChange}
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white/50 backdrop-blur-sm transition-all hover:bg-white"
      >
        <option value="en">English (EN)</option>
        <option value="ru">Русский (RU)</option>
        <option value="tj">Тоҷикӣ (TJ)</option>
      </select>
    </div>
  );
}
