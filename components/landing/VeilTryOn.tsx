'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown, Eye } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual veil and hijab try-on work?',
    a: 'Upload a clear photo of yourself (face / shoulders visible) and a photo of the veil, hijab, niqab, abaya, or burka you want to try. The AI maps the garment onto you in seconds — preserving your features, skin tone, and lighting — so you see exactly how the colour, drape and coverage look on you before buying.',
  },
  {
    q: 'What types of modest fashion can I try?',
    a: 'Hijabs (square, instant, sport, chiffon, jersey), turban-style, shaylas, khimars, abayas, jilbabs, niqabs, burkas, prayer dresses, modest dresses, modest swimwear (burkinis). From any brand: Modanisa, Aab, Haute Hijab, INAYAH, ASOS Modest, local boutiques — any clear product photo works.',
  },
  {
    q: 'Will it preserve my features and skin tone?',
    a: 'Yes. The AI respects your face shape, hair (or hairline if covered), eye colour, and skin tone exactly. The render shows the garment on YOU — not a stock model. Useful for choosing colours and undertones that flatter you specifically.',
  },
  {
    q: 'Can I see the same hijab in different colours and styles?',
    a: 'Yes. After the first render, ask the AI chat: "show this in dusty rose", "switch to chiffon", "longer drape", "tie as a turban". The hijab re-renders without losing your face or pose.',
  },
  {
    q: 'Is the AI respectful of modesty preferences?',
    a: 'Yes. The render only changes the garment; we never alter your face, modify your body, or generate a different person. You upload, you decide what is rendered, you delete it whenever. Photos are processed in real time and never stored on our servers.',
  },
  {
    q: 'Is it useful for modest-fashion brands and boutiques?',
    a: 'Hugely. Embed the widget on product pages — typical 3-5x conversion lift on hijabs and abayas (notoriously hard to visualise on a flat product photo) and a meaningful drop in returns. Partner pricing available for modest-fashion DTC brands.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function VeilTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/ar/hijab" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">العربية</Link>
            <Link href="/try-on?category=clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-700 transition-colors">Try Now Free</Link>
          </div>
        </div>
      </nav>

      {/* Triptych transformation — visible right after the nav so the visual hook lands above the fold. */}
      <TriptychDemo slug="virtual-veil-try-on" labels={TRIPTYCH_LABELS.en} />
      <TryOnDemoBlock category="clothing" lang="en" productLabel="Hijab / abaya" theme="veil" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-800 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Modest Fashion AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Veil & Hijab<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Hijabs, abayas, niqabs, burkas, modest dresses — see how anything looks on <strong className="text-slate-900 font-semibold">your real face</strong> before you click buy. Stop ordering 3 colors &quot;just to be sure&quot;.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-700 transition-colors">
              <Sparkles size={16} />Try a Hijab Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by modest-fashion shoppers</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-rose-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Stock photos lie. Your face doesn&apos;t.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'Your real undertone', body: 'Skin tone + lighting matter — a hijab that pops on a stock model can wash you out. See it on YOUR face before deciding.' },
              { icon: Heart, title: 'Wedding, Eid, Ramadan', body: 'Plan the special-occasion outfit (abaya, kaftan, prayer dress) before the date — not after the package arrives late.' },
              { icon: Camera, title: 'Photoshoot ready', body: 'See yourself in the modest look you want for the family portrait, the engagement, the henna, the graduation.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-rose-50 flex items-center justify-center mb-5"><Icon size={18} className="text-rose-700" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-rose-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → veil → on you.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Face and shoulders, well-lit. Phone snap works — no studio.' },
            { n: '02', title: 'Drop in the hijab / abaya', body: 'Any modest-fashion image — Modanisa, Aab, Etsy, Pinterest, an Instagram screenshot.' },
            { n: '03', title: '30-second render', body: 'AI maps the veil to your face shape, preserving features, skin tone and lighting.' },
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
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every modest piece before it ships.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Hijabs (chiffon, jersey, satin)', 'Square, instant, sport, magnetic, undercaps'],
              ['Abayas & jilbabs', 'Open-front, butterfly, kimono, embroidered, embellished'],
              ['Niqabs & burkas', 'Half / full coverage, butterfly niqab, tie-back'],
              ['Prayer dresses', 'One-piece, two-piece, telekung, mukena'],
              ['Eid & wedding', 'Kaftans, embellished gowns, henna outfits'],
              ['Modest swimwear', 'Burkinis, modest one-pieces, tunic + leggings sets'],
              ['Modest workwear', 'Modest blazers, long skirts, button-up shirts'],
              ['Boutique / artisan', 'Custom Etsy, indie modest brands, hand-embroidered pieces'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-rose-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything modest-fashion shoppers ask.</h2>
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
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Beautiful in the studio.<br /><span className="italic text-rose-600">More you on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any veil. 30 seconds. The colour and drape that actually flatter.</p>
          <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-700 transition-colors">
            <Sparkles size={16} />Try a Hijab Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/ar/hijab" className="hover:text-slate-600 transition-colors font-light">العربية</Link>
            <Link href="/blog" className="hover:text-slate-600 transition-colors font-light">Blog</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">Try On</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors font-light">Terms</Link>
          </div>
        </div>
      </footer>

      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
