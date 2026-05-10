'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, ChevronDown, Heart, Globe } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import { RING_TRADITIONS as TRADITIONS, ENGAGEMENT_RING_FAQ as FAQ } from '@/data/engagementRingHand';

export default function EngagementRingHand() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=jewelry"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-500 transition-colors"
          >
            Try a ring free
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Heart size={10} className="inline mr-1.5 -mt-0.5" />
            Ring on Hand · AI Try-On
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            What Hand Does an
            <br />
            <span className="italic text-slate-400">Engagement Ring Go On?</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Short answer: in the US/UK, the <strong className="text-slate-900 font-semibold">left ring finger</strong>. But the tradition varies by country, religion and personal preference. Below you&apos;ll find the convention by region — and you can try any engagement ring on YOUR own hand with AI in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Try a ring on my hand
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Free · No download · 30 sec</span>
          </div>
        </div>
      </section>

      {/* Quick-answer card — captures the featured-snippet for "what hand engagement ring" */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-rose-700 mb-3">
            Quick answer
          </div>
          <p className="text-slate-900 font-bold text-lg md:text-xl leading-relaxed mb-3">
            The engagement ring is worn on the <span className="italic">fourth finger of the left hand</span> in the United States, Canada, United Kingdom, Australia and most of Western Europe.
          </p>
          <p className="text-slate-700 text-sm md:text-base">
            In Spain, Portugal, much of Latin America, Russia, Greece and India the ring is worn on the <span className="font-bold">right hand</span> instead. Same-sex couples and modern Western brides increasingly choose freely.
          </p>
        </div>
      </section>

      {/* Live ring try-on */}
      <TryOnDemoBlock category="jewelry" lang="en" productLabel="Engagement ring" />

      {/* By-tradition section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <Globe size={28} className="text-rose-500 mx-auto mb-3" />
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            By tradition
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Which hand around the world
          </h2>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {TRADITIONS.map((t, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 hover:border-rose-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base md:text-lg font-black text-slate-900 leading-tight">
                    {t.region}
                  </h3>
                  <div className="text-[11px] font-black uppercase tracking-widest text-rose-600 mt-1">
                    Hand: <span className="text-rose-700">{t.hand}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed pl-12">
                {t.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ring style + finger sizing — bonus utility content */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 bg-slate-50/40 border-y border-slate-100">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Trying before buying — what to check on YOUR hand
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto">
            Photos in jewellery stores look nothing like the real thing on your finger. The AI try-on lets you check the things that actually matter:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            { title: 'Carat size on YOUR finger length', body: 'A 1.5ct solitaire looks dainty on a long thin finger and dramatic on a short petite one. Try it before committing $5K-$15K.' },
            { title: 'Shape vs your hand vibe', body: 'Oval and pear elongate short fingers. Round brilliant works with everything. Emerald/asscher on slim fingers can look elegant or starvy depending on your hand. See it.' },
            { title: 'Setting height', body: 'High prong settings catch on hair and gloves. Bezel and halo settings sit lower. Your lifestyle matters and the height shows in photos.' },
            { title: 'Metal against your skin tone', body: 'Yellow gold flatters warm skin tones, white gold/platinum flatters cool tones, rose gold works with both. The render shows it accurately.' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <Check size={18} className="text-rose-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA repeat */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Heart size={32} className="text-rose-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Try the ring on your own hand
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Upload a photo of your hand and any engagement ring you&apos;re considering. AI shows you the ring on YOUR fingers in 30 seconds. Free first render, no signup.
        </p>
        <Link
          href="/try-on?category=jewelry"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Try a ring on my hand
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* FAQ */}
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
                <div className="px-5 pb-5 text-slate-700 text-sm md:text-base leading-relaxed">
                  {item.a}
                </div>
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
            <Link href="/virtual-jewelry-try-on" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Jewelry try-on</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

