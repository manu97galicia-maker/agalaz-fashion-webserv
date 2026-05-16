'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Shield,
  Zap,
  TrendingDown,
  Check,
  ShoppingBag,
} from 'lucide-react';
import InternalLandingLinksAuto from '@/components/landing/InternalLandingLinksAuto';
import { useLang } from '@/components/LanguageProvider';
import { SHOPIFY_CONTENT } from '@/lib/i18n/b2bContent';

export default function ShopifyPage() {
  const { lang } = useLang();
  const c = SHOPIFY_CONTENT[lang] ?? SHOPIFY_CONTENT.en;
  const footerLabels = {
    en: { home: 'Home', tryOn: 'Try-on demo', woo: 'WooCommerce', dev: 'Developers', partners: 'Partners', blog: 'Blog', privacy: 'Privacy', terms: 'Terms' },
    es: { home: 'Inicio', tryOn: 'Demo probador', woo: 'WooCommerce', dev: 'Desarrolladores', partners: 'Partners', blog: 'Blog', privacy: 'Privacidad', terms: 'Términos' },
    fr: { home: 'Accueil', tryOn: 'Démo essayage', woo: 'WooCommerce', dev: 'Développeurs', partners: 'Partners', blog: 'Blog', privacy: 'Confidentialité', terms: 'Conditions' },
    pt: { home: 'Início', tryOn: 'Demo provador', woo: 'WooCommerce', dev: 'Programadores', partners: 'Partners', blog: 'Blog', privacy: 'Privacidade', terms: 'Termos' },
    de: { home: 'Start', tryOn: 'Anprobe-Demo', woo: 'WooCommerce', dev: 'Entwickler', partners: 'Partners', blog: 'Blog', privacy: 'Datenschutz', terms: 'AGB' },
    it: { home: 'Home', tryOn: 'Demo prova', woo: 'WooCommerce', dev: 'Sviluppatori', partners: 'Partners', blog: 'Blog', privacy: 'Privacy', terms: 'Termini' },
  }[lang];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg font-black tracking-[0.15em]">
            AGALAZ
          </Link>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-indigo-600 transition-colors"
          >
            {c.topBarCta}
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            <ShoppingBag size={12} />
            {c.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            {c.heroH1Main}
            <br />
            <span className="italic font-normal text-indigo-500">{c.heroH1Highlight}</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            {c.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/partners"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={14} />
              {c.ctaPrimary}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/try-on"
              className="inline-flex items-center gap-3 px-8 py-4 border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-[0.2em] hover:border-slate-400 transition-colors"
            >
              {c.ctaSecondary}
            </Link>
          </div>
          <p className="text-[11px] text-slate-400 mt-6 font-light">{c.heroMicrocopy}</p>
        </div>
      </section>

      {/* Why */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          {c.whyTitleLead} <span className="italic text-indigo-500">{c.whyTitleBrand}</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {c.whyCards.map((card, i) => {
            const Icon = [TrendingDown, Zap, Shield][i] ?? TrendingDown;
            const bg = ['bg-emerald-50', 'bg-indigo-50', 'bg-amber-50'][i] ?? 'bg-slate-50';
            const color = ['text-emerald-600', 'text-indigo-600', 'text-amber-600'][i] ?? 'text-slate-600';
            return (
              <div key={i}>
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-black text-base mb-2">{card.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
            {c.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {c.features.map((f) => (
              <div key={f.title} className="bg-white p-6 border border-slate-100 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Check size={18} className="text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-black text-sm mb-1.5">{f.title}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          {c.howTitleLead} <span className="italic text-indigo-500">{c.howTitleHighlight}</span>
        </h2>
        <ol className="space-y-8">
          {c.steps.map((step, i) => (
            <li key={i} className="flex gap-5">
              <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="font-black text-base mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">{step.desc}</p>
                {i === 1 && (
                  <pre className="bg-slate-900 text-emerald-300 text-xs p-4 rounded-lg overflow-x-auto font-mono">
{`<script src="https://agalaz.com/widget.js" data-api-key="YOUR_API_KEY" defer></script>`}
                  </pre>
                )}
                {i === 2 && (
                  <pre className="bg-slate-900 text-emerald-300 text-xs p-4 rounded-lg overflow-x-auto font-mono">
{`<div id="agalaz-tryon"></div>`}
                  </pre>
                )}
                {step.note && (
                  <p className="text-sm text-slate-500 font-light leading-relaxed mt-3">{step.note}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing teaser */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            {c.pricingTitle}
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12">
            {c.pricingSubtitle}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {c.plans.map((plan, i) => {
              const featured = i === 1;
              return (
                <div
                  key={i}
                  className={
                    featured
                      ? 'bg-indigo-600 border border-indigo-400 rounded-2xl p-6 ring-2 ring-indigo-300'
                      : 'bg-white/5 border border-white/10 rounded-2xl p-6'
                  }
                >
                  <h3 className="font-black text-xl mb-2">{plan.name}</h3>
                  <p className="text-3xl font-black mb-1">{plan.price}</p>
                  <p className={`text-xs font-light mb-4 ${featured ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {plan.meta}
                  </p>
                </div>
              );
            })}
          </div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 mt-12 px-8 py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-100 transition-colors"
          >
            <Code2 size={14} />
            {c.pricingCta}
            <ArrowRight size={14} />
          </Link>
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

      {/* Testimonials */}
      <section className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-center">
            {c.testimonialsTitle}
          </h2>
          <p className="text-sm text-slate-400 text-center font-light mb-12 max-w-2xl mx-auto">
            {c.testimonialsSubtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {c.testimonials.map((t, i) => (
              <figure key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <blockquote className="text-sm text-slate-700 font-light leading-relaxed mb-4">
                  &ldquo;{t.q}&rdquo;
                </blockquote>
                <figcaption className="text-xs text-slate-500 font-bold border-t border-slate-200 pt-3">
                  — {t.a}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-50">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            {c.finalCtaTitle}
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-10">
            {c.finalCtaBody}
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
          >
            <Sparkles size={14} />
            {c.finalCtaBtn}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <InternalLandingLinksAuto />

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <span className="font-serif text-sm font-black tracking-[0.15em] text-slate-700">AGALAZ</span>
          <nav className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-slate-700 transition-colors">{footerLabels.home}</Link>
            <Link href="/try-on" className="hover:text-slate-700 transition-colors">{footerLabels.tryOn}</Link>
            <Link href="/woocommerce" className="hover:text-slate-700 transition-colors">{footerLabels.woo}</Link>
            <Link href="/developers" className="hover:text-slate-700 transition-colors">{footerLabels.dev}</Link>
            <Link href="/partners" className="hover:text-slate-700 transition-colors">{footerLabels.partners}</Link>
            <Link href="/blog" className="hover:text-slate-700 transition-colors">{footerLabels.blog}</Link>
            <Link href="/privacy" className="hover:text-slate-700 transition-colors">{footerLabels.privacy}</Link>
            <Link href="/terms" className="hover:text-slate-700 transition-colors">{footerLabels.terms}</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
