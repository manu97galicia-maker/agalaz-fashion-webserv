'use client';

// Generic long-tail landing template — reusable across languages and verticals.
// Built for the round-2 SEO push that targets ultra-low-KD localized queries
// like "coupe de cheveux visage rond" (FR), "unhas curtas ideias" (PT-BR),
// "unghie corte semplici" (IT) and "taglio capelli viso tondo" (IT).
//
// All copy comes in via the content prop so adding a new landing is just
// writing the data file. Heavy lifting (try-on demo, internal links) is
// reused from existing components.

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, Check, X, ChevronDown } from 'lucide-react';
import TryOnDemoBlock, { type DemoCategory, type DemoLang } from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';

export interface LongtailItem {
  /** Recommended cut / nail design / option name. */
  name: string;
  /** Short explanation of why it works. */
  why: string;
}

export interface LongtailFaq {
  q: string;
  a: string;
}

export interface LongtailContent {
  /** Language code used on the <html lang> + TryOnDemoBlock localization. */
  lang: DemoLang;
  /** Try-on category for the embedded demo block. */
  category: DemoCategory;
  /** Demo block label for the product side (e.g. "Référence coupe"). */
  productLabel: string;
  /** Optional override for the left-box label (e.g. "A foto da tua mão" for nail landings). */
  yourPhotoLabel?: string;
  /** Optional override for the left-box hint. */
  yourPhotoHint?: string;
  /** Optional override for the right-box hint. */
  productHint?: string;
  /** Vertical bucket used to colour-code the accent — 'hair' = pink, 'nail' = fuchsia. */
  accent: 'hair' | 'nail';

  // Hero
  badge: string;
  h1Top: string;
  h1Italic: string;
  hero: string;
  ctaPrimary: string;
  ctaCaption: string;

  // What is + how to know (two-column section)
  whatTitle: string;
  whatBody: string;
  howKnowTitle: string;
  howKnowBullets: string[];

  // Recommended list
  recommendedBadge: string;
  recommendedTitle: string;
  recommended: LongtailItem[];

  // Avoid list (optional — empty array hides the section)
  avoidBadge: string;
  avoidTitle: string;
  avoid: LongtailItem[];

  // Mid-page CTA
  midCtaTitle: string;
  midCtaBody: string;
  midCtaButton: string;

  // FAQ
  faqTitle: string;
  faq: LongtailFaq[];

  // Footer links
  blogLabel: string;
  tryOnLabel: string;
  privacyLabel: string;

  // /try-on?category=... target
  tryOnHref: string;
}

interface Props {
  content: LongtailContent;
}

export default function LongtailLandingTemplate({ content: c }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const accentBg = c.accent === 'hair' ? 'bg-pink-50' : 'bg-fuchsia-50';
  const accentText = c.accent === 'hair' ? 'text-pink-700' : 'text-fuchsia-700';
  const accentBtn = c.accent === 'hair' ? 'hover:bg-pink-500' : 'hover:bg-fuchsia-500';
  const accentDot = c.accent === 'hair' ? 'text-pink-500' : 'text-fuchsia-500';
  const accentItemBg = c.accent === 'hair' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700';
  const accentBadge2 = c.accent === 'hair' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700';

  return (
    <main className="min-h-screen bg-white" lang={c.lang}>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <a href="#try-it" className={`px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full ${accentBtn} transition-colors`}>
            {c.ctaPrimary}
          </a>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className={`inline-block px-4 py-1.5 ${accentBg} ${accentText} text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6`}>
            {c.badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            {c.h1Top}
            <br />
            <span className="italic text-slate-400">{c.h1Italic}</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">{c.hero}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#try-it" className={`inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs ${accentBtn} transition-colors rounded-full`}>
              <Sparkles size={16} />
              {c.ctaPrimary}
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">{c.ctaCaption}</span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">{c.whatTitle}</h2>
            <p className="text-slate-700 leading-relaxed">{c.whatBody}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">{c.howKnowTitle}</h2>
            <ul className="space-y-2.5">
              {c.howKnowBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <Check size={16} className={`${accentDot} shrink-0 mt-1`} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TryOnDemoBlock
        category={c.category}
        lang={c.lang}
        productLabel={c.productLabel}
        yourPhotoLabel={c.yourPhotoLabel}
        yourPhotoHint={c.yourPhotoHint}
        productHint={c.productHint}
      />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className={`inline-block px-4 py-1.5 ${accentBadge2} text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4`}>
            {c.recommendedBadge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{c.recommendedTitle}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {c.recommended.map((item, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-pink-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full ${accentItemBg} flex items-center justify-center font-black text-sm shrink-0`}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{item.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {c.avoid.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 bg-slate-50/40 border-y border-slate-100">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
              {c.avoidBadge}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{c.avoidTitle}</h2>
          </div>
          <div className="space-y-3 max-w-3xl mx-auto">
            {c.avoid.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200">
                <X size={18} className="text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">{item.name}</h3>
                  <p className="text-slate-700 text-sm">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">{c.midCtaTitle}</h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">{c.midCtaBody}</p>
        <a href="#try-it" className={`inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs ${accentBtn} transition-colors rounded-full`}>
          <Sparkles size={16} />
          {c.midCtaButton}
          <ArrowRight size={14} />
        </a>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          {c.faqTitle}
        </h2>
        <div className="space-y-3">
          {c.faq.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm md:text-base pr-4">{item.q}</span>
                <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && <div className="px-5 pb-5 text-slate-700 text-sm md:text-base leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <InternalLandingLinks lang={c.lang} />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">{c.blogLabel}</Link>
            <Link href={c.tryOnHref} className="text-slate-400 text-xs hover:text-slate-600 transition-colors">{c.tryOnLabel}</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">{c.privacyLabel}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
