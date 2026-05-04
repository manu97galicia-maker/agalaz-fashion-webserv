'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Shirt, Shield, Clock, Star, ChevronDown, Briefcase, Crown } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual men\'s suit try-on work?',
    a: 'Upload a full-body photo of yourself (or just upper body for jacket-only) and a photo of any suit, blazer, tuxedo, or formal outfit. The AI maps the garment onto your real body — preserving your face, skin tone, and proportions — so you see exactly how the cut, lapel, and silhouette look on you before paying for tailoring or buying off the rack.',
  },
  {
    q: 'What types of suits can I try?',
    a: 'Two-piece, three-piece, tuxedo, dinner jacket, blazer, peak lapel, notch lapel, shawl collar, double-breasted, single-breasted, slim, classic, modern, vintage, prom, wedding, business, smart-casual. From any retailer or designer: SuitSupply, Tom Ford, Hugo Boss, Brunello Cucinelli, Indochino, ASOS, Macy\'s, vintage finds.',
  },
  {
    q: 'Can I see different colours and patterns of the same suit?',
    a: 'Yes. After the first render, ask the AI chat: "show this in charcoal", "switch to navy windowpane", "remove the pinstripe". Pattern and colour swap without losing your face or fit.',
  },
  {
    q: 'Will it help me decide between off-the-rack and made-to-measure?',
    a: 'Yes. Use it to pre-screen before committing $200-2000 to a fitting. See if a slim cut works for your build, if a wide lapel suits your shoulders, if a 3-piece adds bulk you don\'t want. Saves trips to tailors with stuff that was never going to work.',
  },
  {
    q: 'Useful for menswear retailers and tailors?',
    a: 'Very. Embed on product pages — typical 3-5x conversion lift on suits, especially for grooms, prom shoppers, and corporate buyers who hesitate without trying. Returns drop dramatically. Partner pricing available for menswear shops.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function MensSuitTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <Link href="/try-on?category=clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-blue-600 transition-colors">Try Now Free</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Menswear AI</span>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Men\'s Suit<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            See exactly how any suit, tuxedo, or blazer looks on <strong className="text-slate-900 font-semibold">your real body</strong> — before booking a fitting, before buying off the rack, before paying for tailoring.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-colors">
              <Sparkles size={16} />Try Your First Suit Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">4.9 / 5 · used by tailors</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>
      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="clothing" lang="en" productLabel="Suit" />


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Suits are expensive. Mistakes are worse.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: 'Business & corporate', body: 'Notch lapel navy, charcoal pinstripe, classic two-piece. See if the cut works for the office before the tailor pins it.' },
              { icon: Crown, title: 'Weddings, prom, formal', body: 'Tuxedos, dinner jackets, three-pieces. Your wedding is not the day to discover your suit looks weird in photos.' },
              { icon: Shirt, title: 'Smart-casual & blazers', body: 'Unstructured blazer, sport coat, half-canvas — softer cuts that have to fit precisely to look right.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center mb-5"><Icon size={18} className="text-blue-700" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → suit → render.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Front-facing, full body if possible. Phone camera works.' },
            { n: '02', title: 'Drop in the suit', body: 'Any suit photo — retailer site, tailor lookbook, vintage finds, Pinterest.' },
            { n: '03', title: '30-second render', body: 'AI maps the suit onto your real body, preserving your face and proportions.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-blue-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">For every suit decision you can\'t undo cheaply.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Wedding suit', 'Groom, groomsmen, father-of — try cuts before fittings'],
              ['Job interview', 'Conservative navy or charcoal — what reads "hire me"'],
              ['Black tie / tuxedo', 'Peak lapel, shawl, dinner jacket — pre-screen formality'],
              ['Three-piece', 'Vest adds bulk — does it work on your build?'],
              ['Slim vs classic cut', 'See the silhouette difference on YOUR shoulders'],
              ['Patterns', 'Pinstripe, windowpane, glen check — busy or refined?'],
              ['Made-to-measure', 'Pre-screen before booking $1k+ tailoring'],
              ['Off-the-rack', 'Avoid the return-everything-from-Amazon trap'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog/what-to-wear-to-a-job-interview-2026" className="text-blue-300 text-xs font-bold uppercase tracking-widest hover:text-blue-200 transition-colors">Job interview guide →</Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything you\'d ask.</h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <button key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left bg-slate-50 hover:bg-slate-100 transition-colors p-5 rounded-lg">
              <div className="flex items-center justify-between gap-4">
                <span className="font-serif text-base font-black text-slate-900 tracking-tight">{item.q}</span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === i && <p className="text-slate-500 text-sm font-light leading-relaxed mt-3">{item.a}</p>}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Try the suit.<br /><span className="italic text-blue-500">Skip the fitting.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any suit. 30 seconds. The cut you\'d actually buy.</p>
          <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-colors">
            <Sparkles size={16} />Try Your First Suit Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/blog" className="hover:text-slate-600 transition-colors font-light">Blog</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">Try On</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors font-light">Terms</Link>
          </div>
        </div>
      </footer>
    
      {/* B2B partners upsell */}
      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
