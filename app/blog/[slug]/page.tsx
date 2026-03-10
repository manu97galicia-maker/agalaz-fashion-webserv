'use client';

import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Clock, Sparkles } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { articles } from '../articles';

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const { lang } = useLang();
  const en = lang === 'en';

  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 font-bold mb-4">Article not found</p>
          <button
            onClick={() => router.push('/blog')}
            className="text-indigo-400 font-bold text-sm press-scale"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const content = en ? article.content : article.contentEs;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="glass-dark px-5 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          onClick={() => router.push('/blog')}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors press-scale"
        >
          <ChevronLeft size={22} className="text-white/60" />
        </button>
        <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest">
          Agalaz Blog
        </span>
      </header>

      {/* Article */}
      <div className="flex-1 px-5 py-8">
        <article className="max-w-lg mx-auto animate-fade-in">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            <Clock size={10} className="text-white/20" />
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
              {article.readTime} min read
            </span>
            <span className="text-white/10">·</span>
            <span className="text-[9px] font-bold text-white/20">
              {new Date(article.date).toLocaleDateString(en ? 'en-US' : 'es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-black text-white tracking-tight leading-tight mb-6">
            {en ? article.title : article.titleEs}
          </h1>

          {/* Content */}
          <div className="prose-agalaz space-y-4">
            {content.split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-lg font-black text-white tracking-tight mt-8 mb-3">
                    {block.replace('## ', '')}
                  </h2>
                );
              }
              // Process bold and italic markdown
              const formatted = block
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/^- /gm, '• ');

              return (
                <p
                  key={i}
                  className="text-[13px] text-white/40 font-medium leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatted }}
                />
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 glass rounded-3xl p-6 text-center">
            <Sparkles size={24} className="text-indigo-400 mx-auto mb-3" />
            <h3 className="text-lg font-black text-white tracking-tight mb-2">
              {en ? 'Try It On Yourself' : 'Pruébalo En Ti'}
            </h3>
            <p className="text-[11px] text-white/30 font-medium mb-4">
              {en
                ? 'See how any garment looks on your real body with AI.'
                : 'Ve cómo te queda cualquier prenda en tu cuerpo real con IA.'}
            </p>
            <button
              onClick={() => router.push('/onboarding')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-black text-xs uppercase tracking-widest press-scale shadow-lg shadow-indigo-500/20"
            >
              {en ? 'Try Free' : 'Probar Gratis'}
            </button>
          </div>

          {/* More articles */}
          <div className="mt-10">
            <h3 className="text-sm font-black text-white tracking-tight mb-4">
              {en ? 'More Articles' : 'Más Artículos'}
            </h3>
            <div className="space-y-3">
              {articles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 3)
                .map((a) => (
                  <button
                    key={a.slug}
                    onClick={() => router.push(`/blog/${a.slug}`)}
                    className="w-full glass rounded-2xl p-4 text-left hover:bg-white/[0.06] transition-colors press-scale"
                  >
                    <h4 className="text-[12px] font-bold text-white/60 leading-snug">
                      {en ? a.title : a.titleEs}
                    </h4>
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mt-1 inline-block">
                      {a.readTime} min
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
