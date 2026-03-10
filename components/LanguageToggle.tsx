'use client';

import { useLang } from './LanguageProvider';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-xs font-bold tracking-wide text-slate-500 ${className}`}
    >
      <span className={lang === 'en' ? 'text-slate-900' : 'text-slate-300'}>EN</span>
      <span className="text-slate-200">|</span>
      <span className={lang === 'es' ? 'text-slate-900' : 'text-slate-300'}>ES</span>
    </button>
  );
}
