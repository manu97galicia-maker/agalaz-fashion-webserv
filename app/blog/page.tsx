'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Clock, ArrowRight } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { articles } from './articles';

export default function BlogPage() {
  const router = useRouter();
  const { lang } = useLang();
  const en = lang === 'en';

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="glass-dark px-5 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          onClick={() => router.push('/onboarding')}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors press-scale"
        >
          <ChevronLeft size={22} className="text-white/60" />
        </button>
        <div>
          <h1 className="text-sm font-black tracking-tight text-white">
            {en ? 'Fashion & Style Guide' : 'Guía de Moda y Estilo'}
          </h1>
          <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest">
            Agalaz Blog
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="px-6 pt-8 pb-6 text-center">
        <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
          {en ? 'Shop Smarter.' : 'Compra Mejor.'}
          <br />
          <span className="text-gradient italic">{en ? 'Return Less.' : 'Devuelve Menos.'}</span>
        </h2>
        <p className="text-white/30 text-sm font-medium mt-2 max-w-xs mx-auto">
          {en
            ? 'Tips, guides, and AI tools to help you buy clothes that actually fit.'
            : 'Tips, guías y herramientas de IA para comprar ropa que realmente te quede.'}
        </p>
      </div>

      {/* Articles */}
      <div className="flex-1 px-4 pb-10">
        <div className="max-w-md mx-auto space-y-4">
          {articles.map((article, idx) => (
            <button
              key={article.slug}
              onClick={() => router.push(`/blog/${article.slug}`)}
              className="w-full glass rounded-3xl p-5 text-left transition-all hover:bg-white/[0.06] press-scale animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock size={10} className="text-white/20" />
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                  {article.readTime} min read
                </span>
                <span className="text-white/10">·</span>
                <span className="text-[9px] font-bold text-white/20">
                  {new Date(article.date).toLocaleDateString(en ? 'en-US' : 'es-ES', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h3 className="text-[15px] font-black text-white tracking-tight leading-snug mb-2">
                {en ? article.title : article.titleEs}
              </h3>
              <p className="text-[11px] text-white/30 font-medium leading-relaxed line-clamp-2">
                {en ? article.description : article.descriptionEs}
              </p>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  {en ? 'Read more' : 'Leer más'}
                </span>
                <ArrowRight size={12} className="text-indigo-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
