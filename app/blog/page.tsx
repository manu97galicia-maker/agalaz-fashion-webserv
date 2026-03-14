'use client';

import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { articles } from './articles';

export default function BlogPage() {
  const { lang } = useLang();
  const en = lang === 'en';

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-5">
            <LanguageToggle />
            <Link
              href="/try-on"
              className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-slate-800 transition-colors"
            >
              {en ? 'Try Now' : 'Probar'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Agalaz Blog
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-[0.9]">
            {en ? 'Shop Smarter.' : 'Compra Mejor.'}
            <br />
            <span className="italic text-slate-400">{en ? 'Return Less.' : 'Devuelve Menos.'}</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-6 max-w-lg mx-auto font-light">
            {en
              ? 'Tips, guides, and AI tools to help you buy clothes that actually fit.'
              : 'Tips, guías y herramientas de IA para comprar ropa que realmente te quede.'}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, idx) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group p-6 md:p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={12} className="text-slate-300" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {article.readTime} min read
                  </span>
                  <span className="text-slate-200">·</span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {new Date(article.date).toLocaleDateString(en ? 'en-US' : 'es-ES', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                  {en ? article.title : article.titleEs}
                </h2>
                <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-2">
                  {en ? article.description : article.descriptionEs}
                </p>
                <div className="flex items-center gap-1.5 mt-4">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.15em]">
                    {en ? 'Read more' : 'Leer más'}
                  </span>
                  <ArrowRight size={12} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Home' : 'Inicio'}
            </Link>
            <Link href="/virtual-try-on" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Virtual Try On
            </Link>
            <Link href="/try-on" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Try Now' : 'Probar'}
            </Link>
            <Link href="/privacy" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Privacy' : 'Privacidad'}
            </Link>
            <Link href="/terms" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              {en ? 'Terms' : 'Términos'}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
