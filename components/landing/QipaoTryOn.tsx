'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown, Eye } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual qipao and hanfu try-on work?',
    a: 'Upload a clear photo of yourself (face and shoulders, or full body for the silhouette) and a photo of the qipao, cheongsam, hanfu, tang suit or changshan you want to try. The AI dresses you in 30 seconds — preserving your face, complexion and lighting — so you see the mandarin collar (lingzi), pankou knots, slit and embroidery on YOU before buying or booking a tailor in Shanghai or Hong Kong.',
  },
  {
    q: 'Which Chinese garments can I try?',
    a: 'Qipao / cheongsam (classic 1920s Shanghai cut, modern slim-fit, modest long-sleeve, tea-length, wedding red), hanfu — every dynasty silhouette: Tang ruqun, Song beizi, Ming aoqun, Wei-Jin daxiushan. Tang suit (men\'s and women\'s), changshan, magua jacket, kids tangzhuang, qun-gua and xiu-he wedding sets. From any source — Shanghai Tang, NE-TIGER, Hanfu Time, Heaven Gaia, Taobao, Etsy hanfu shops, indie designers — any clear photo works.',
  },
  {
    q: 'Can I see different colours, embroidery and pankou variations?',
    a: 'Yes. After the first render, ask the AI in chat: "show this in jade green", "swap pankou for traditional knot", "longer side slit", "switch to Ming-dynasty aoqun cut". The same garment re-renders with the variation you choose, your face and pose preserved.',
  },
  {
    q: 'Will it respect my features and skin tone?',
    a: 'Yes. The AI keeps your face, eyes and skin tone exactly as they are — no whitening filters, no Westernised face edits, no body reshaping. The render is the qipao or hanfu on YOU. Useful for picking colours that work with your actual complexion instead of the brand\'s studio model.',
  },
  {
    q: 'Is it ready for Chinese New Year, weddings, hanfu festivals?',
    a: 'Exactly what it\'s built for. Plan the Lunar New Year red qipao, the wedding qun-gua and xiu-he, the gua-shan groom\'s suit, your hanfu for a Hanfu Day or Mid-Autumn festival photoshoot — weeks before the tailor\'s queue closes in Shanghai, Suzhou or Chinatown.',
  },
  {
    q: 'Useful for qipao tailors, hanfu shops and Chinese-wear designers?',
    a: 'Massively. Embed the widget on product pages — typical 3-5x conversion lift on bridal qipao and hanfu sets (almost impossible to picture on a flat shot) and a sharp drop in size-and-colour returns. Partner pricing available for Chinese-wear DTC brands, Shanghai tailors and hanfu Etsy shops.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or laptop. First try-on is free, no account required.',
  },
];

export default function QipaoTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/zh/qipao" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">中文</Link>
            <Link href="/try-on?category=clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-red-700 transition-colors">Try Now Free</Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-qipao-try-on" labels={TRIPTYCH_LABELS.en} />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-800 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Chinese Couture AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Qipao<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Qipao, cheongsam, hanfu, tang suit, changshan — see every mandarin collar and pankou on <strong className="text-slate-900 font-semibold">your real face</strong> before the Shanghai tailor takes your measurements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-red-700 transition-colors">
              <Sparkles size={16} />Try a Qipao Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by Lunar New Year & wedding shoppers</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>

      <TryOnDemoBlock category="clothing" lang="en" productLabel="Qipao / cheongsam / hanfu" />

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-red-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">A Shanghai studio shoot isn&apos;t you in the qipao.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'Your real complexion', body: 'A bridal red can read crimson or scarlet on different undertones. See the qipao against YOUR skin before the tailor cuts the silk.' },
              { icon: Heart, title: 'Lunar New Year, weddings, hanfu festivals', body: 'Plan the New Year qipao, the wedding qun-gua and xiu-he, the Hanfu Day photoshoot — months before the seamstress queue fills up.' },
              { icon: Camera, title: 'Hanfu revival ready', body: 'Try every dynasty — Tang ruqun, Song beizi, Ming aoqun — on yourself before deciding which silhouette suits you.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-red-50 flex items-center justify-center mb-5"><Icon size={18} className="text-red-700" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-red-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → qipao → on you.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Face and shoulders for the mandarin collar, full body for the silhouette and slit. A phone snap in daylight is enough.' },
            { n: '02', title: 'Drop in the qipao or hanfu', body: 'Any image — Shanghai Tang, NE-TIGER, Heaven Gaia, Hanfu Time, Taobao, an Etsy hanfu seller, indie designer Instagram.' },
            { n: '03', title: '30-second render', body: 'AI maps the silk, pankou knots, embroidery and slit onto you, keeping your face and lighting identical.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-red-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every silk before the tailor cuts.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Qipao / cheongsam', '1920s Shanghai classic, modern slim-fit, tea-length, modest long-sleeve'],
              ['Bridal qipao & qun-gua', 'Wedding red qipao, qun-gua kwa, xiu-he fu, gold embroidery sets'],
              ['Hanfu — Tang dynasty', 'Ruqun, qixiong (chest-high), banbi half-sleeve, daxiushan'],
              ['Hanfu — Song & Ming', 'Beizi, song-style mamian skirt, Ming aoqun, lijia, yuanlingpao'],
              ['Tang suit & changshan', 'Men\'s and women\'s tang zhuang, changshan robes, magua jackets'],
              ['Kids Chinese wear', 'Tangzhuang for Lunar New Year, kids hanfu, dudou for first month'],
              ['Modern designer', 'Shanghai Tang, NE-TIGER, Heaven Gaia, Guo Pei, Vivienne Tam'],
              ['Boutique & artisan', 'Suzhou silk tailors, Chinatown seamstresses, Etsy hanfu indie shops'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-red-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">What qipao and hanfu shoppers ask.</h2>
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

      <section className="bg-gradient-to-br from-red-50 via-white to-amber-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Beautiful in the studio.<br /><span className="italic text-red-700">More you on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any qipao. 30 seconds. The silk, slit and pankou that actually flatter.</p>
          <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-red-700 transition-colors">
            <Sparkles size={16} />Try a Qipao Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/zh/qipao" className="hover:text-slate-600 transition-colors font-light">中文</Link>
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
