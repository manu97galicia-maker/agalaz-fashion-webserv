'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Eye, Shield, Clock, Star, ChevronDown, Glasses, Palette } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual glasses try-on work?',
    a: 'Upload a clear front-facing photo of yourself and a photo of the glasses you want to try (from any optician, eyewear brand, or marketplace). The AI maps the frames onto your real face in seconds — preserving your face shape, skin tone, hair, and lighting — so you see exactly how those frames sit on your nose, ears, and cheekbones before buying.',
  },
  {
    q: 'Can I try frames from any optician or brand?',
    a: 'Yes. Ray-Ban, Persol, Oakley, Warby Parker, Tom Ford, GENTLE MONSTER, EssilorLuxottica, indie brands, vintage on eBay, your local optician\'s catalogue, even a screenshot from someone\'s Instagram. Any photo of glasses works.',
  },
  {
    q: 'Will it tell me which frames suit my face shape?',
    a: 'Yes. Use the AI chat after the first render to ask "show me frames better suited to my face" or check our face-shape guides. We also have dedicated articles for diamond, oval, round, and square faces with frame recommendations.',
  },
  {
    q: 'Can I try sunglasses and prescription frames the same way?',
    a: 'Yes — the AI does not care if the frames are tinted or clear. Sunglasses, optical frames, blue-light glasses, sport eyewear, reading glasses all render the same way on your face.',
  },
  {
    q: 'Is it useful for opticians and eyewear retailers?',
    a: 'Very. Embed the widget on product pages so customers see frames on themselves before adding to cart — typical result is 3-5x conversion lift on eyewear SKUs and a measurable drop in returns. Ask about partner pricing for opticians.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function GlassesTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=glasses"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-amber-600 transition-colors"
          >
            Try Now Free
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Eyewear AI
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Virtual Glasses
            <br />
            <span className="italic text-slate-400">Try-On.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            See exactly how any frames look on <strong className="text-slate-900 font-semibold">your real face</strong> — before paying $300 for the wrong shape. Upload a photo, drop in any glasses, render in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=glasses"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-600 transition-colors"
            >
              <Sparkles size={16} />
              Try Your First Pair Free
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">4.9 / 5 · trusted by opticians</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>
      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="glasses" lang="en" productLabel="Glasses" />


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              Your face decides. Not a model.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'Your real face', body: 'Face shape, skin tone, hair, eye spacing — everything that makes the frames sit right (or wrong) is preserved exactly.' },
              { icon: Glasses, title: 'Any brand, any style', body: 'Ray-Ban, Persol, Tom Ford, Warby Parker, GENTLE MONSTER, indie, vintage. If you have a photo, you can try it.' },
              { icon: Palette, title: 'Sunglasses + optical', body: 'Tinted, clear, blue-light, prescription, reading. Same flow, same accuracy.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-amber-50 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-amber-700" />
                </div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            Photo → frames → render.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your face', body: 'Front-facing selfie, neutral expression, no current glasses on. Phone camera works.' },
            { n: '02', title: 'Drop in the frames', body: 'Any glasses photo — product page, Instagram, optician catalogue, eBay listing.' },
            { n: '03', title: '30-second render', body: 'AI maps the frames onto your face, preserving everything else.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-amber-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">
              Frames for every face shape, mood, and outfit.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Aviators', 'Classic, masculine, suits oval and square faces'],
              ['Wayfarers', 'Universal — almost every face shape works'],
              ['Cat-eye', 'Feminine, sharpens round and oval faces'],
              ['Round / Lennon', 'Soft, intellectual, contrasts square jaws'],
              ['Geometric', 'Bold trend, hexagonal, rectangular, statement'],
              ['Rimless / minimal', 'Office siren aesthetic, modern luxury'],
              ['Oversized', 'Glamour, sun protection, makes a small face look smaller'],
              ['Sport / wrap', 'Cycling, running, prescription performance'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-sm">{title}</span>
                  <span className="text-white/60 font-light text-sm"> — {body}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 space-x-6">
            <Link href="/blog/free-ai-glasses-stylist-diamond-face-shape" className="text-amber-300 text-xs font-bold uppercase tracking-widest hover:text-amber-200 transition-colors">
              Frames for diamond faces →
            </Link>
            <Link href="/blog/best-glasses-colors-deep-autumn-skin-tone" className="text-amber-300 text-xs font-bold uppercase tracking-widest hover:text-amber-200 transition-colors">
              Best frame colours →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">Common questions</span>
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

      <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Stop guessing.
            <br />
            <span className="italic text-amber-500">See the frames.</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any glasses. 30 seconds. The pair you'd actually buy.</p>
          <Link href="/try-on?category=glasses" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-600 transition-colors">
            <Sparkles size={16} />Try Your First Pair Free<ArrowRight size={14} />
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
