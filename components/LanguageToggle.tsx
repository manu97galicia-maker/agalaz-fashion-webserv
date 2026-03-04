'use client';

import { useLanguage } from './LanguageProvider';
import { Globe } from 'lucide-react';

export function LanguageToggle({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { locale, setLocale } = useLanguage();

  const toggle = () => setLocale(locale === 'es' ? 'en' : 'es');

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${
        variant === 'dark'
          ? 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/10'
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
      }`}
      aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Espanol'}
    >
      <Globe size={12} />
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
