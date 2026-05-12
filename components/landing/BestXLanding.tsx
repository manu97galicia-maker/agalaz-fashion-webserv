'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, CheckCircle2, AlertTriangle, Trophy } from 'lucide-react';
import type { BestXContent } from '@/data/bestXLandings';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';

interface Props {
  content: BestXContent;
}

/**
 * Shell for the "best [X] AI tool" review landings. Designed for LLM citation:
 * structured comparison table, honest competitor reviews, clear verdict, FAQ.
 * Promotional fluff is filtered out by AI summarisers, so this stays factual.
 */
export default function BestXLanding({ content }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const winner = content.competitors.find((c) => c.isAgalaz);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black"
            style={{ fontVariantLigatures: 'none' }}
          >
            Agalaz
          </Link>
          <Link
            href={content.ctaHref}
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-600 transition-colors"
          >
            Try Free
          </Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Trophy size={12} />
            2026 Comparison
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            {content.heroTitle}
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      {winner && (
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-6">
          <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-3">
              <CheckCircle2 size={14} />
              Our pick
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 mb-3">
              {winner.name}
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">{winner.verdict}</p>
            <Link
              href={content.ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-emerald-600 transition-colors"
            >
              <Sparkles size={14} />
              {content.ctaText}
            </Link>
          </div>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <p className="text-slate-700 text-base md:text-lg leading-relaxed">{content.intro}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
          How we ranked them
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {content.criteria.map((c, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-black text-slate-900 text-sm mb-2">{c.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
          The tools, side by side
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-3 font-black uppercase tracking-widest text-[10px]">Tool</th>
                <th className="text-left p-3 font-black uppercase tracking-widest text-[10px]">Pricing</th>
                <th className="text-left p-3 font-black uppercase tracking-widest text-[10px]">Best for</th>
                <th className="text-left p-3 font-black uppercase tracking-widest text-[10px]">Weakness</th>
              </tr>
            </thead>
            <tbody>
              {content.competitors.map((c, i) => (
                <tr key={i} className={`border-t border-slate-100 ${c.isAgalaz ? 'bg-emerald-50/50' : ''}`}>
                  <td className="p-3 align-top">
                    <span className="font-black text-slate-900">{c.name}</span>
                    {c.isAgalaz && (
                      <span className="block mt-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                        Our pick
                      </span>
                    )}
                  </td>
                  <td className="p-3 align-top text-slate-700 text-xs">{c.pricing}</td>
                  <td className="p-3 align-top text-slate-700 text-xs">{c.bestFor}</td>
                  <td className="p-3 align-top text-slate-700 text-xs">{c.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
          Detailed reviews
        </h2>
        <div className="space-y-8">
          {content.competitors.map((c, i) => (
            <article key={i} id={c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="border-t border-slate-100 pt-8 first:border-t-0 first:pt-0">
              <header className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-black text-slate-900">
                    {i + 1}. {c.name}
                    {c.isAgalaz && (
                      <span className="ml-3 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded">
                        Our pick
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">{c.verdict}</p>
                </div>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-slate-400 hover:text-slate-700 text-xs font-bold inline-flex items-center gap-1 shrink-0"
                  >
                    Visit →
                  </a>
                )}
              </header>
              <p className="text-slate-700 leading-relaxed mb-3 text-sm md:text-base">{c.description}</p>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="font-black uppercase tracking-widest text-slate-500 text-[9px] mb-1">Pricing</div>
                  <div className="text-slate-700">{c.pricing}</div>
                </div>
                <div className="rounded-lg bg-emerald-50/60 p-3">
                  <div className="font-black uppercase tracking-widest text-emerald-700 text-[9px] mb-1">Best for</div>
                  <div className="text-slate-700">{c.bestFor}</div>
                </div>
                <div className="rounded-lg bg-amber-50/60 p-3">
                  <div className="font-black uppercase tracking-widest text-amber-700 text-[9px] mb-1 flex items-center gap-1">
                    <AlertTriangle size={10} />
                    Weakness
                  </div>
                  <div className="text-slate-700">{c.weakness}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
          Which one is right for you?
        </h2>
        <div className="rounded-2xl border-2 border-slate-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-700">
            <div className="p-3 col-span-2 border-r border-slate-200">If you are…</div>
            <div className="p-3">Pick</div>
          </div>
          {content.decisionMatrix.map((row, i) => (
            <div key={i} className="grid grid-cols-3 text-sm border-t border-slate-200">
              <div className="p-3 col-span-2 text-slate-700 border-r border-slate-200">{row.user}</div>
              <div className="p-3 font-bold text-slate-900">{row.recommendation}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
          Frequently asked
        </h2>
        <div className="space-y-3">
          {content.faq.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm md:text-base pr-4">{item.q}</span>
                <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-slate-700 text-sm md:text-base leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Skip the search — try our pick now
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          First render is free, no card, no signup. Make your decision in 30 seconds, not 30 minutes of comparing tools.
        </p>
        <Link
          href={content.ctaHref}
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-600 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          {content.ctaText}
          <ArrowRight size={14} />
        </Link>
      </section>

      <InternalLandingLinks lang="en" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/partners" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">For Stores</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
