'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Star } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import { LEHENGA_STYLES as STYLES, LEHENGA_FAQ as FAQ } from '@/data/lehenga';

export default function LehengaOnline() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white" lang="en">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=clothing"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-500 transition-colors"
          >
            Try lehenga free
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Online Lehenga · AI Try-On
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Online Lehenga
            <br />
            <span className="italic text-slate-400">Try It On You.</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Bridal · sangeet · wedding-guest · festive · indo-western — see any online lehenga on YOUR body before checkout. Stop guessing from Myntra, Aza, Nykaa or Sabyasachi catalog photos. <strong className="text-slate-900 font-semibold">30 seconds, free first render.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Try a lehenga
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Free · No download · 30 sec</span>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-rose-700 mb-3">Quick guide</div>
          <p className="text-slate-900 font-bold text-base md:text-lg leading-relaxed mb-2">
            Online lehenga shopping in India: <span className="italic">Myntra, Aza Fashion, Nykaa Fashion, Manyavar, Sabyasachi RTW, Ajio Luxe</span> are the top retailers. Prices ₹2,000 (rayon casual) to ₹15+ lakh (Sabyasachi luxury).
          </p>
          <p className="text-slate-700 text-sm">
            Use Agalaz to see any lehenga on YOUR body before buying — saves returns + disappointment.
          </p>
        </div>
      </section>

      <TryOnDemoBlock category="clothing" lang="en" productLabel="Lehenga / dupatta" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            7 styles
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Lehenga styles by occasion
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {STYLES.map((s, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-rose-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">{s.name}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-slate-900">Pieces: </span>
                    {s.pieces}
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">When to wear</p>
                  <p className="text-slate-600 text-xs mt-1">{s.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Star size={32} className="text-rose-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          See it on YOU before paying ₹50,000
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Bridal lehengas can&apos;t be returned. Wedding-guest lehengas you wear once. Use AI to test the actual look on your body before clicking &quot;buy&quot;. Free first render.
        </p>
        <Link
          href="/try-on?category=clothing"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Try lehenga on me
          <ArrowRight size={14} />
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          Frequently asked
        </h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
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

      <InternalLandingLinks lang="en" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/virtual-saree-try-on" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Saree try-on</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
