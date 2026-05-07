'use client';

import Link from 'next/link';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import type { Article } from '../articles';
import { blogCtaPath } from '@/lib/blogToLanding';
import { track } from '@/lib/analytics';

interface Props {
  article: Article;
  related: Article[];
  lang: 'en' | 'es';
  heroImage?: string | null;
  heroImageAlt?: string;
}

// Article body locks to the slug-derived language so SSR matches metadata for
// crawlers; the global LanguageToggle is intentionally hidden on this route.
export default function ArticleView({ article, related, lang, heroImage, heroImageAlt }: Props) {
  const en = lang === 'en';

  const content = en ? article.content : article.contentEs;
  const articleCategory = en ? article.category : article.categoryEs;
  // Topic-aware CTA: a "Pastel Chrome Nails" article links to the nails
  // landing, "Spring Wedding Guest" → wedding-dress, etc. Falls back to
  // /try-on for general-style articles. See lib/blogToLanding.ts.
  const ctaPath = blogCtaPath(article.slug, articleCategory, lang);

  const handleCtaClick = (location: 'nav' | 'inline' | 'footer') => {
    track('landing_view', {
      source: 'blog_cta',
      cta_location: location,
      blog_slug: article.slug,
      target_path: ctaPath,
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href={ctaPath}
              onClick={() => handleCtaClick('nav')}
              className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-slate-800 transition-colors"
            >
              {en ? 'Try Now' : 'Probar'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/blog" className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.15em] hover:text-indigo-700 transition-colors">
            Blog
          </Link>
          <span className="text-slate-200">/</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
            {en ? article.title : article.titleEs}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <Clock size={14} className="text-slate-300" />
          <span className="text-xs font-bold text-slate-400">
            {article.readTime} min read
          </span>
          <span className="text-slate-200">·</span>
          <span className="text-xs font-bold text-slate-400">
            {new Date(article.date).toLocaleDateString(en ? 'en-US' : 'es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
          {en ? article.title : article.titleEs}
        </h1>

        {/* Hero image (only when generate-blog-images.mjs has produced one) */}
        {heroImage && (
          <figure className="mb-10 -mx-6 md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt={heroImageAlt ?? (en ? article.title : article.titleEs)}
              loading="eager"
              decoding="async"
              className="w-full h-auto md:rounded-md"
            />
          </figure>
        )}

        {/* Content */}
        <div className="space-y-5">
          {content.split('\n\n').map((block, i) => {
            if (block.startsWith('### ')) {
              return (
                <h3 key={i} className="font-serif text-xl font-bold text-slate-900 tracking-tight mt-8 mb-3">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-12 mb-4">
                  {block.replace('## ', '')}
                </h2>
              );
            }
            if (block.startsWith('---')) {
              return <hr key={i} className="border-slate-200 my-8" />;
            }
            if (block.includes('|') && block.includes('---')) {
              const rows = block.split('\n').filter(r => r.trim() && !r.includes('---'));
              const headers = rows[0]?.split('|').map(c => c.trim()).filter(Boolean) || [];
              const dataRows = rows.slice(1);
              return (
                <div key={i} className="overflow-x-auto my-6">
                  <table className="w-full text-sm border border-slate-200">
                    <thead>
                      <tr className="bg-slate-50">
                        {headers.map((h, j) => (
                          <th key={j} className="px-3 py-2 text-left font-bold text-slate-700 border-b border-slate-200">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataRows.map((row, j) => {
                        const cells = row.split('|').map(c => c.trim()).filter(Boolean);
                        return (
                          <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            {cells.map((cell, k) => (
                              <td key={k} className="px-3 py-2 text-slate-500 font-light border-b border-slate-100"
                                dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
            const formatted = block
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
              .replace(/\*(.+?)\*/g, '<em>$1</em>')
              .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-2 transition-colors">$1</a>')
              .replace(/^- /gm, '&bull; ')
              .replace(/^\d+\. /gm, (match) => `<span class="text-indigo-600 font-bold">${match}</span>`);

            return (
              <p
                key={i}
                className="text-base text-slate-500 font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatted }}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-50 border border-slate-100 p-8 md:p-10 text-center">
          <Sparkles size={28} className="text-indigo-600 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-black text-slate-900 tracking-tight mb-2">
            {en ? 'Try It On Yourself' : 'Pruébalo En Ti'}
          </h3>
          <p className="text-slate-500 text-sm font-light mb-6 max-w-sm mx-auto">
            {en
              ? 'See how any garment looks on your real body with AI.'
              : 'Ve cómo te queda cualquier prenda en tu cuerpo real con IA.'}
          </p>
          <Link
            href={ctaPath}
            onClick={() => handleCtaClick('inline')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
          >
            <Sparkles size={16} />
            {en ? 'Try Free' : 'Probar Gratis'}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Related articles (topically chosen) */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mb-6">
              {en ? 'Related Reads' : 'Lecturas Relacionadas'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {en ? a.title : a.titleEs}
                  </h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 inline-block">
                    {a.readTime} min
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/virtual-try-on" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Virtual Try On
            </Link>
            <Link href="/blog" className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors">
              Blog
            </Link>
            <Link
              href={ctaPath}
              onClick={() => handleCtaClick('footer')}
              className="text-slate-400 text-xs font-light hover:text-slate-600 transition-colors"
            >
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
