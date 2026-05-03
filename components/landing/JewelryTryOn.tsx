'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Gem, Shield, Clock, Star, ChevronDown, Heart } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual jewelry try-on work?',
    a: 'Upload a clear photo (your face for necklaces and earrings, your wrist for bracelets, your hand for rings) and a photo of the jewellery you want to try. The AI maps the piece onto you in seconds — preserving skin tone, finger length, neckline, and lighting — so you see exactly how the piece sits before buying.',
  },
  {
    q: 'What jewelry can I try?',
    a: 'Necklaces (chokers, pendants, statement, layered), earrings (studs, hoops, drops, ear cuffs), bracelets, rings (engagement, wedding, fashion), brooches, anklets, watches. From any brand: Tiffany, Cartier, Pandora, Mejuri, Etsy, vintage, custom designs — anything visible in a photo works.',
  },
  {
    q: 'Can I see how an engagement ring looks before buying?',
    a: 'Yes. Upload a photo of your hand and the ring, and you see the carat size, setting, band thickness, and metal colour on your finger. Read our guides comparing 1.5 vs 2 carat diamonds and the carat size simulator for buying advice.',
  },
  {
    q: 'Can I layer multiple necklaces or stack rings?',
    a: 'Yes. Render the first piece, then use the AI chat: "add a 16-inch chain on top", "stack a thin gold band underneath". The AI re-renders preserving your skin and existing pieces.',
  },
  {
    q: 'Useful for jewelry brands and shops?',
    a: 'Yes. Embed the widget on product pages — typical result: 3-7x conversion uplift on jewellery, especially fine jewellery where shoppers hesitate without trying. Drops returns on engagement rings dramatically. Ask about partner pricing.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function JewelryTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <Link href="/try-on?category=jewelry" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-600 transition-colors">Try Now Free</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Fine Jewelry AI</span>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Jewelry<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Necklaces, earrings, rings, bracelets — see how any piece looks on <strong className="text-slate-900 font-semibold">your real body</strong> before paying for fine jewellery you can\'t return.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=jewelry" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-600 transition-colors">
              <Sparkles size={16} />Try Your First Piece Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">4.9 / 5 · used by jewellers</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>
      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="jewelry" lang="en" productLabel="Jewelry" />


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Fine jewellery deserves a real preview.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Gem, title: 'Engagement & wedding', body: 'See carat sizes on your finger. Compare settings (solitaire, halo, pavé). Try metals (white, yellow, rose gold) without leaving home.' },
              { icon: Heart, title: 'Necklaces & layering', body: 'Choker vs princess vs matinee — see how chain length sits on your collarbone. Build a layered look without hours in front of a mirror.' },
              { icon: Sparkles, title: 'Earrings & statement', body: 'Studs, hoops, drops, ear cuffs. See balance with your face shape, hair, and outfit before committing.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-rose-50 flex items-center justify-center mb-5"><Icon size={18} className="text-rose-600" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → piece → render.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Face for neck/ears, hand for rings, wrist for bracelets. Phone camera works.' },
            { n: '02', title: 'Drop in the jewellery', body: 'Any photo from any jeweller — Tiffany, Cartier, Etsy, vintage, custom.' },
            { n: '03', title: '30-second render', body: 'AI maps the piece onto you, preserving skin tone, lighting, and proportions.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-rose-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">From everyday gold to engagement diamonds.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Engagement rings', '1.0, 1.5, 2.0 carat — see the scale on your hand'],
              ['Wedding bands', 'Plain, eternity, mixed metals — match the engagement'],
              ['Stacking rings', 'Layer thin bands without committing'],
              ['Pendant necklaces', 'Princess, matinee, opera — find your length'],
              ['Layered chains', 'Build the "off-duty model" stack on your real neck'],
              ['Hoops & studs', 'Test scale and balance with your face shape'],
              ['Statement earrings', 'See if the drop length flatters your jaw'],
              ['Tennis bracelets', 'Sizing and sparkle on your real wrist'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 space-x-6">
            <Link href="/blog/1-5-carat-vs-2-carat-diamond-on-hand" className="text-rose-300 text-xs font-bold uppercase tracking-widest hover:text-rose-200 transition-colors">1.5 vs 2 carat diamonds →</Link>
            <Link href="/blog/diamond-carat-size-on-hand-simulator" className="text-rose-300 text-xs font-bold uppercase tracking-widest hover:text-rose-200 transition-colors">Carat size simulator →</Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything you'd ask.</h2>
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

      <section className="bg-gradient-to-br from-rose-50 via-white to-rose-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">It\'s on you.<br /><span className="italic text-rose-400">Before it\'s on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any piece. 30 seconds. Skip the buyer\'s remorse.</p>
          <Link href="/try-on?category=jewelry" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-600 transition-colors">
            <Sparkles size={16} />Try Your First Piece Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/blog" className="hover:text-slate-600 transition-colors font-light">Blog</Link>
            <Link href="/virtual-earring-try-on" className="hover:text-slate-600 transition-colors font-light">Earrings</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">Try On</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors font-light">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
