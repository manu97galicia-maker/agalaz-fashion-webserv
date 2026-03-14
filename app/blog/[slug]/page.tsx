'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { articles } from '../articles';

export default function ArticlePage() {
  const params = useParams();
  const { lang } = useLang();
  const en = lang === 'en';

  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 font-bold mb-4">Article not found</p>
          <Link href="/blog" className="text-indigo-600 font-bold text-sm">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const content = en ? article.content : article.contentEs;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: en ? article.title : article.titleEs,
    description: en ? article.description : article.descriptionEs,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
    publisher: { '@type': 'Organization', name: 'Agalaz Fashion', url: 'https://agalaz.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://agalaz.com/blog/${article.slug}` },
    inLanguage: en ? 'en-US' : 'es-ES',
    keywords: article.keyword,
    wordCount: content.split(/\s+/).length,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agalaz.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agalaz.com/blog' },
      { '@type': 'ListItem', position: 3, name: en ? article.title : article.titleEs, item: `https://agalaz.com/blog/${article.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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

        {/* Content */}
        <div className="space-y-5">
          {content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="font-serif text-2xl font-bold text-slate-900 tracking-tight mt-12 mb-4">
                  {block.replace('## ', '')}
                </h2>
              );
            }
            const formatted = block
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
              .replace(/\*(.+?)\*/g, '<em>$1</em>')
              .replace(/^- /gm, '&bull; ');

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
            href="/try-on"
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
          >
            <Sparkles size={16} />
            {en ? 'Try Free' : 'Probar Gratis'}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* More articles */}
        <div className="mt-16">
          <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mb-6">
            {en ? 'More Articles' : 'Más Artículos'}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {articles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 3)
              .map((a) => (
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
