'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Ghost } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import { COUPLE_COSTUMES as COSTUMES, HALLOWEEN_COUPLES_FAQ as FAQ } from '@/data/halloweenCouples';

export default function HalloweenCouples() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=costume"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-orange-500 transition-colors"
          >
            Try costume free
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Ghost size={10} className="inline mr-1.5 -mt-0.5" />
            Halloween 2026 · Couples
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Couples Halloween
            <br />
            <span className="italic text-slate-400">Costume Ideas 2026.</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            8 couples costumes for Halloween 2026 — Barbie & Ken, Wednesday & Gomez, Mario & Peach, Bonnie & Clyde, and the lazy salt & pepper. <strong className="text-slate-900 font-semibold">See it on you and your partner</strong> with AI before paying for it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Try a couples costume
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Free · No download · 30 sec</span>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-orange-700 mb-3">Quick guide</div>
          <p className="text-slate-900 font-bold text-base md:text-lg leading-relaxed mb-2">
            Top 2026 couples costumes: <span className="italic">Barbie & Ken, Wednesday & Gomez Addams, Mario & Princess Peach, Bonnie & Clyde, Sandy & Danny from Grease</span>. Mix retro and pop-culture for the most photogenic pick.
          </p>
          <p className="text-slate-700 text-sm">
            Use Agalaz to test the costume on YOUR bodies + your partner&apos;s before paying $80-300 on costumes that look great on the Amazon model but weird on you.
          </p>
        </div>
      </section>

      <TryOnDemoBlock category="costume" lang="en" productLabel="Halloween costume" theme="halloween-couples" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            8 ideas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Couples halloween costumes by vibe
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {COSTUMES.map((c, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-orange-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">{c.name}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-slate-900">Pieces: </span>
                    {c.pieces}
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Vibe</p>
                  <p className="text-slate-600 text-xs mt-1">{c.vibe}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Ghost size={32} className="text-orange-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Try it on you both before paying
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Couples costumes look amazing on the Amazon listing model. Will they look good on YOUR actual body shapes together? Find out before clicking buy. Free first render.
        </p>
        <Link
          href="/try-on?category=costume"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Try a couples costume
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
            <Link href="/virtual-costume-try-on" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Costumes</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
