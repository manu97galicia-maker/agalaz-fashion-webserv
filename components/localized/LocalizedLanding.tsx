import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, Star } from 'lucide-react';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import TryOnDemoBlock, { type DemoCategory } from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';
import type { CanonicalLandingSlug } from '@/lib/i18n/landingSlugs';
import { getTriptychImageObjects, type TriptychLang } from '@/lib/imageSeo';

type Lang = 'es' | 'fr' | 'pt' | 'de' | 'it';

// Map of localized landing slugs → demo category for TryOnDemoBlock.
const SLUG_TO_CATEGORY: Record<string, DemoCategory> = {
  'virtual-wedding-dress-try-on': 'clothing',
  'virtual-nail-try-on': 'nail',
  'virtual-glasses-try-on': 'glasses',
  'virtual-jewelry-try-on': 'jewelry',
  'virtual-mens-suit-try-on': 'clothing',
  'virtual-pet-clothing-try-on': 'pet-clothing',
  'virtual-baby-clothing-try-on': 'baby-clothing',
  'virtual-costume-try-on': 'costume',
  'virtual-hairstyle-try-on': 'hairstyle',
  'virtual-cosplay-try-on': 'cosplay',
};

export interface LocalizedContent {
  badge: string;
  h1Top: string;
  h1Highlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  freeNote: string;

  whyTitle: string;
  why1Title: string;
  why1Desc: string;
  why2Title: string;
  why2Desc: string;
  why3Title: string;
  why3Desc: string;

  howTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  faqTitle: string;
  faqs: { q: string; a: string }[];

  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaButton: string;

  footerLabels: { home: string; tryOn: string; partners: string; blog: string; privacy: string; terms: string };
}

interface Props {
  c: LocalizedContent;
  /** path to the EN canonical of the same landing for the language switcher */
  enHref: string;
  /** slug for the triptych demo image lookup (matches public/images/landings/{slug}-*.png) */
  slug: string;
  /** language for the triptych demo labels */
  lang: Lang;
}

export default function LocalizedLanding({ c, enHref, slug, lang }: Props) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar (logo + try-on CTA) — kept above the triptych so the brand
          and primary CTA are the very first thing visitors see. */}
      <header className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg font-black tracking-[0.15em]">
            AGALAZ
          </Link>
          <Link
            href="/try-on"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-indigo-600 transition-colors"
          >
            {c.ctaPrimary}
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Triptych transformation — the before/item/after image set explains
          "what does this product do?" in 1 second, right after the brand bar. */}
      <TriptychDemo slug={slug} labels={TRIPTYCH_LABELS[lang]} lang={lang} />

      {/* Interactive try-on with watermarked free render */}
      <TryOnDemoBlock category={SLUG_TO_CATEGORY[slug] || 'clothing'} lang={lang} />


      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            <Sparkles size={12} />
            {c.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            {c.h1Top}
            <br />
            <span className="italic font-normal text-indigo-500">{c.h1Highlight}</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            {c.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/try-on"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={14} />
              {c.ctaPrimary}
              <ArrowRight size={14} />
            </Link>
            <Link
              href={enHref}
              className="inline-flex items-center gap-3 px-8 py-4 border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-[0.2em] hover:border-slate-400 transition-colors"
            >
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>


      {/* Why */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          {c.whyTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Star, color: 'emerald', title: c.why1Title, desc: c.why1Desc },
            { icon: Zap, color: 'indigo', title: c.why2Title, desc: c.why2Desc },
            { icon: Shield, color: 'amber', title: c.why3Title, desc: c.why3Desc },
          ].map((w) => (
            <div key={w.title}>
              <div className={`w-12 h-12 rounded-2xl bg-${w.color}-50 flex items-center justify-center mb-4`}>
                <w.icon size={20} className={`text-${w.color}-600`} />
              </div>
              <h3 className="font-black text-base mb-2">{w.title}</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
            {c.howTitle}
          </h2>
          <ol className="space-y-8">
            {[
              { t: c.step1Title, d: c.step1Desc },
              { t: c.step2Title, d: c.step2Desc },
              { t: c.step3Title, d: c.step3Desc },
            ].map((s, i) => (
              <li key={i} className="flex gap-5">
                <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-black text-base mb-2">{s.t}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          {c.faqTitle}
        </h2>
        <div className="space-y-3">
          {c.faqs.map((f, i) => (
            <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                <span className="font-bold text-slate-900 text-sm pr-4">{f.q}</span>
                <span className="text-slate-400 text-xs group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-xs text-slate-500 font-light leading-relaxed">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* B2B partners upsell */}

      {/* Contextual B2B upsell — convert shop-owner traffic immediately after
          the visual demo, before the marketing hero. */}
      <PartnerCtaBlock category={slug as CanonicalLandingSlug} lang={lang} />
      <PartnersUpsellBlock lang={lang} />

      {/* Final CTA */}
      <section className="bg-indigo-50">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            {c.finalCtaTitle}
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-10">
            {c.finalCtaSubtitle}
          </p>
          <Link
            href="/try-on"
            className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
          >
            <Sparkles size={14} />
            {c.finalCtaButton}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Topical link block — links to all other product try-on landings in same language */}
      <InternalLandingLinks currentSlug={slug as CanonicalLandingSlug} lang={lang} />

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <span className="font-serif text-sm font-black tracking-[0.15em] text-slate-700">AGALAZ</span>
          <nav className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-slate-700 transition-colors">{c.footerLabels.home}</Link>
            <Link href="/try-on" className="hover:text-slate-700 transition-colors">{c.footerLabels.tryOn}</Link>
            <Link href="/partners" className="hover:text-slate-700 transition-colors">{c.footerLabels.partners}</Link>
            <Link href="/blog" className="hover:text-slate-700 transition-colors">{c.footerLabels.blog}</Link>
            <Link href="/privacy" className="hover:text-slate-700 transition-colors">{c.footerLabels.privacy}</Link>
            <Link href="/terms" className="hover:text-slate-700 transition-colors">{c.footerLabels.terms}</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

export interface LocalizedMeta {
  title: string;
  description: string;
  keywords: string[];
}

export function buildLocalizedJsonLd(opts: {
  pageUrl: string;
  name: string;
  description: string;
  faqs: { q: string; a: string }[];
  baseUrl: string;
  breadcrumbName: string;
  /** ISO date, e.g. '2026-05-12'. Defaults to a stable old date so it doesn't
   *  look like every page was just refreshed (which Google penalises). */
  datePublished?: string;
  /** Canonical slug + lang used to emit ImageObject entries for the triptych.
   *  When omitted, the image schema is skipped (e.g. on non-triptych pages). */
  triptychSlug?: string;
  triptychLang?: TriptychLang;
}) {
  const datePublished = opts.datePublished ?? '2026-05-10';
  const imageObjects = opts.triptychSlug && opts.triptychLang
    ? getTriptychImageObjects(opts.triptychSlug, opts.triptychLang, opts.pageUrl, opts.baseUrl)
    : [];
  const heroImageUrl = imageObjects[2]
    ? (imageObjects[2] as { url: string }).url
    : undefined;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: opts.name,
        description: opts.description,
        url: opts.pageUrl,
        datePublished,
        dateModified: datePublished,
        ...(heroImageUrl ? { image: heroImageUrl } : {}),
        author: { '@type': 'Organization', name: 'Agalaz Fashion', url: opts.baseUrl },
        publisher: {
          '@type': 'Organization',
          name: 'Agalaz Fashion',
          logo: { '@type': 'ImageObject', url: `${opts.baseUrl}/icon-512.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': opts.pageUrl },
        articleSection: 'Virtual Try-On · Fashion',
      },
      {
        '@type': 'SoftwareApplication',
        name: opts.name,
        url: opts.pageUrl,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        description: opts.description,
        ...(heroImageUrl ? { image: heroImageUrl } : {}),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: opts.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: opts.baseUrl },
          { '@type': 'ListItem', position: 2, name: opts.breadcrumbName, item: opts.pageUrl },
        ],
      },
      ...imageObjects,
    ],
  };
}
