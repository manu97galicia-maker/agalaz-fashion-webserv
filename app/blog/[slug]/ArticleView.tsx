'use client';

import Link from 'next/link';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import type { Article } from '../articles';
import { blogCtaPath } from '@/lib/blogToLanding';
import { track } from '@/lib/analytics';
import TryOnDemoBlock, { type DemoCategory, type PresetTheme } from '@/components/landing/TryOnDemoBlock';

interface Props {
  article: Article;
  related: Article[];
  lang: 'en' | 'es';
  heroImage?: string | null;
  heroImageAlt?: string;
}

/**
 * Maps a blog article's slug to the closest demo category so the embedded
 * try-on flow is topically relevant. Mirrors the routing logic in
 * lib/blogToLanding.ts but returns the DemoCategory enum instead of a URL.
 * Falls back to 'clothing' for general-style articles.
 */
function articleSlugToDemoCategory(slug: string): DemoCategory {
  if (/\btattoo/i.test(slug)) return 'tattoo';
  if (/\bnail|\bmanicure/i.test(slug)) return 'nail';
  if (/\bglasses|\beyewear|\bsunglasses/i.test(slug)) return 'glasses';
  if (/\bearring/i.test(slug)) return 'jewelry';
  if (/\bjewel|\bnecklace|\bring\b/i.test(slug)) return 'jewelry';
  if (/\bhairstyle|\bhaircut|\bbangs|\bbob\b|\bwolf-cut/i.test(slug)) return 'hairstyle';
  if (/\bcostume|\bcosplay|\bdisfraz|\bhalloween/i.test(slug)) return 'costume';
  if (/\bpet|\bdog|\bcat\b/i.test(slug)) return 'pet-clothing';
  if (/\bbaby|\bnewborn|\binfant/i.test(slug)) return 'baby-clothing';
  if (/\bbag\b|\bhandbag|\bpurse/i.test(slug)) return 'bag';
  return 'clothing';
}

/**
 * Maps a blog article's slug to a specific THEME_PRESETS theme so the
 * embedded demo shows topically-correct presets instead of the broader
 * category fallback (e.g. an article about wedding dresses gets the
 * wedding-dress mermaid/princess pair, not the generic clothing
 * blazer + midi). Tried in order — first match wins. Returns undefined
 * if no specific theme matches, in which case TryOnDemoBlock falls back
 * to its CATEGORY_PRESETS map keyed by the demo category.
 */
function articleSlugToDemoTheme(slug: string): PresetTheme | undefined {
  // Most specific FIRST (longer regexes match before shorter ones).
  if (/\bwedding-guest|\bguest-attire|\binvitada/i.test(slug)) return 'wedding-guest';
  if (/\bwedding-dress|\bbridal-dress|\bmermaid-dress|\bvestido-de-noiva|\brobe-de-mariee/i.test(slug)) return 'wedding-dress';
  if (/\bbridesmaid|\bdama-de-honor/i.test(slug)) return 'bridesmaid';
  if (/\bveil|\bvelo-novia/i.test(slug)) return 'veil';
  if (/\bengagement-ring|\b1-?carat|\b2-?carat|\bcarat-size|\bdiamond-carat|\bsolitaire|\bhalo-ring/i.test(slug)) return 'engagement-ring';
  if (/\bchrome-nails/i.test(slug)) return 'chrome-nails';
  if (/\bcoquette|\bclean-girl-nails|\balmond-nails|\bshort-almond/i.test(slug)) return 'coquette-nails';
  if (/\bgel-nails|\bfrench-nails|\bunhas-gel|\bunhas-frances/i.test(slug)) return 'nail-elegant';
  if (/\bnail|\bmanicure|\bunhas|\buñas|\bunghie/i.test(slug)) return 'nail-decorated';
  if (/\bround-face|\bvisage-rond|\bviso-tondo|\brosto-redondo/i.test(slug)) return 'face-round-haircut';
  if (/\bcurtain-bangs|\bfrange-rideau|\bfranja-cortina|\bcarre-frange/i.test(slug)) return 'curtain-bangs';
  if (/\bwolf-cut/i.test(slug)) return 'wolf-cut';
  if (/\bwig|\bperruque|\bperuca/i.test(slug)) return 'wig';
  if (/\bsaree|\bsari/i.test(slug)) return 'saree';
  if (/\blehenga/i.test(slug)) return 'lehenga';
  if (/\bhanbok/i.test(slug)) return 'hanbok';
  if (/\bkimono|\byukata|\bfurisode/i.test(slug)) return 'kimono';
  if (/\bqipao|\bcheongsam|\bhanfu/i.test(slug)) return 'qipao';
  if (/\bbikini|\bswimwear|\bswimsuit/i.test(slug)) return 'bikini';
  if (/\btattoo/i.test(slug)) return 'tattoo';
  if (/\bmakeup|\bmaquillaje|\bmaquiagem/i.test(slug)) return 'makeup-natural';
  if (/\bhalloween-couples|\bhalloween-pareja|\bcouples-costume/i.test(slug)) return 'halloween-couples';
  if (/\bcarnival|\bcarnaval/i.test(slug)) return 'carnival-costume';
  if (/\bearring|\bpendientes|\bbrincos|\borecchini|\bohrringe/i.test(slug)) return 'earrings';
  if (/\bglasses|\beyewear|\bsunglasses|\bgafas|\boculos|\bocchiali/i.test(slug)) return 'glasses';
  if (/\bsuit|\btraje-hombre|\bfato-homem|\bmens-suit/i.test(slug)) return 'mens-suit';
  if (/\bpet-clothing|\bdog-clothes|\broupa-pet/i.test(slug)) return 'pet-clothing';
  if (/\bbaby-clothing|\bnewborn|\binfant|\bbaptism|\bbaptem|\bcomunion/i.test(slug)) return 'baby-clothing';
  if (/\bcosplay/i.test(slug)) return 'cosplay';
  if (/\bcostume|\bdisfraz|\bfantasia/i.test(slug)) return 'costume';
  if (/\bhaircut|\bhairstyle|\bbangs|\bbob\b/i.test(slug)) return 'hairstyle-feminine';
  return undefined;
}

/**
 * Render a single markdown-ish content block (h2/h3/hr/table/paragraph).
 * Extracted so the lead paragraph and the rest of the article can render
 * via the same code path while the demo block is injected between them.
 */
function renderArticleBlock(block: string, i: number) {
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

        {/* Content — split so the demo can be injected immediately after
            the lead paragraph instead of at the bottom. The lead is the
            first non-heading / non-table block; everything before it (and
            the lead itself) renders inside this article wrapper, then the
            demo breaks out full-width, and the rest of the content
            continues in the second wrapper below.
            Datafast showed users were reading the lead and bouncing
            before scrolling to the demo — putting the demo right after
            the lead catches them at peak intent. */}
        <div className="space-y-5">
          {(() => {
            const blocks = content.split('\n\n');
            const isParagraphBlock = (b: string) =>
              !b.startsWith('### ') &&
              !b.startsWith('## ') &&
              !b.startsWith('---') &&
              !(b.includes('|') && b.includes('---')) &&
              b.trim().length > 0;
            let leadIdx = blocks.findIndex(isParagraphBlock);
            if (leadIdx === -1) leadIdx = blocks.length - 1;
            return blocks.slice(0, leadIdx + 1).map((block, i) => renderArticleBlock(block, i));
          })()}
        </div>
      </article>

      {/* Inline try-on demo, full-width below the lead paragraph. */}
      <TryOnDemoBlock
        category={articleSlugToDemoCategory(article.slug)}
        theme={articleSlugToDemoTheme(article.slug)}
        lang={lang}
      />

      <article className="max-w-3xl mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-12 md:pb-20">
        {/* Rest of the article content — H2 sections, tables, lists,
            paragraphs after the lead. */}
        <div className="space-y-5">
          {(() => {
            const blocks = content.split('\n\n');
            const isParagraphBlock = (b: string) =>
              !b.startsWith('### ') &&
              !b.startsWith('## ') &&
              !b.startsWith('---') &&
              !(b.includes('|') && b.includes('---')) &&
              b.trim().length > 0;
            let leadIdx = blocks.findIndex(isParagraphBlock);
            if (leadIdx === -1) leadIdx = blocks.length - 1;
            return blocks.slice(leadIdx + 1).map((block, i) => renderArticleBlock(block, i + leadIdx + 1));
          })()}
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
