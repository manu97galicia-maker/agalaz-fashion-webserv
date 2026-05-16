'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown, Eye } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual kimono and yukata try-on work?',
    a: 'Upload a clear photo of yourself (face and shoulders, or full body for the full kimono silhouette) and a photo of the kimono, yukata, haori, hakama or furisode you want to try. The AI dresses you in 30 seconds — preserving your face, hair and lighting — including the obi tie, collar (eri) layering and sleeve length, so you see the garment on YOU before stepping into a Kyoto rental shop.',
  },
  {
    q: 'Which kimono types can I try?',
    a: 'Formal kimono (furisode for unmarried women, tomesode for married, houmongi visiting), summer yukata (hanami, fireworks festivals, ryokan), haori jackets, men\'s montsuki and hakama, kids shichi-go-san kimono, wedding shiromuku and uchikake, modern lounge kimono. From any source — Kyoto rental shops (Yumeyakata, Wargo), Mercari, Yahoo Auctions, vintage shops, designer Yumi Katsura, Hiromi Asai — any clear photo works.',
  },
  {
    q: 'Can I see different obi and collar combinations?',
    a: 'Yes. After the first render, ask the AI in chat: "switch to a red-and-gold maru obi", "softer pastel collar", "longer furisode sleeves", "tie the obi in taiko musubi". The same kimono re-renders with the obi or collar you want, your face and pose unchanged.',
  },
  {
    q: 'Will it respect my real features?',
    a: 'Yes. The AI keeps your face, eyes and skin tone exactly as they are — no Westernised filters, no skin-tone shifts. You see the kimono on YOU, not on a Kyoto studio model. Useful for choosing the silk colour that works with your actual undertone.',
  },
  {
    q: 'Is it ready for shichi-go-san, seijin shiki, hanami and Kyoto rentals?',
    a: 'Exactly what it\'s built for. Preview your daughter\'s shichi-go-san kimono, your seijin shiki coming-of-age furisode, the hanami yukata for cherry-blossom season, the wedding shiromuku — long before booking a Kyoto kimono rental shop in Gion or Asakusa.',
  },
  {
    q: 'Useful for kimono shops and rental businesses?',
    a: 'Hugely. Embed the widget on rental and product pages — typical 3-5x lift on furisode and tourist yukata rentals (notoriously hard to picture from a flat photo) and far fewer last-minute rebookings. Partner pricing available for kimono houses, vintage dealers and Kyoto / Tokyo rental shops.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or laptop. First try-on is free, no account required.',
  },
];

export default function KimonoTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/ja/kimono" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">日本語</Link>
            <Link href="/try-on?category=clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-700 transition-colors">Try Now Free</Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-kimono-try-on" labels={TRIPTYCH_LABELS.en} />
      <TryOnDemoBlock category="clothing" lang="en" productLabel="Kimono / yukata / furisode" theme="kimono" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-800 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Japanese Wagasa AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Kimono<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Furisode, yukata, haori, hakama, shichi-go-san — see how every silk and obi sits on <strong className="text-slate-900 font-semibold">your real face</strong> before you book a Kyoto rental shop.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-700 transition-colors">
              <Sparkles size={16} />Try a Kimono Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by hanami & seijin shiki shoppers</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">A Kyoto studio shoot is one face. You aren&apos;t her.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'Your real undertone', body: 'A coral furisode on the studio model can read pink-orange or yellow-warm on you. See the silk against YOUR complexion before you commit.' },
              { icon: Heart, title: 'Seijin shiki, shichi-go-san, hanami', body: 'Plan the coming-of-age furisode, your child\'s shichi-go-san photoshoot, the hanami yukata, the wedding shiromuku — before booking the rental and the photographer.' },
              { icon: Camera, title: 'Kyoto-ready', body: 'See yourself in the kimono BEFORE you arrive in Gion or Asakusa. Pick the obi colour that pops against the bamboo grove or torii.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center mb-5"><Icon size={18} className="text-indigo-700" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → kimono → on you.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Face and shoulders for the eri collar, full body for the obi and sleeve drape. A phone snap in daylight is enough.' },
            { n: '02', title: 'Drop in the kimono or yukata', body: 'Any image — Wargo, Yumeyakata, Mercari, Yahoo Auctions, vintage Kyoto shops, an Instagram designer screenshot.' },
            { n: '03', title: '30-second render', body: 'AI maps the silk, obi tie and sleeve length onto you while keeping your face, hair and lighting identical.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-indigo-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every silk before the rental booking.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Furisode (formal women\'s)', 'Long-sleeve seijin shiki, ohurisode, chuufurisode'],
              ['Tomesode & houmongi', 'Married women\'s formal, wedding-guest, tea-ceremony houmongi'],
              ['Yukata (summer cotton)', 'Hanami, hanabi fireworks, matsuri festival, ryokan onsen yukata'],
              ['Men\'s kimono', 'Montsuki, haori-hakama, samue, casual men\'s yukata'],
              ['Wedding kimono', 'Shiromuku white, iro-uchikake, hikifurisode, groom\'s montsuki haori'],
              ['Kids kimono', 'Shichi-go-san (3, 5, 7 years), miyamairi, hakamagi'],
              ['Haori, michiyuki, hakama', 'Modern haori jackets, michiyuki coat, women\'s andon hakama'],
              ['Boutique & vintage', 'Kyoto vintage dealers, Jotaro Saito, Hiromi Asai, indie weavers'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">What kimono shoppers ask.</h2>
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

      <section className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Beautiful on the rail.<br /><span className="italic text-indigo-700">More you on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any kimono. 30 seconds. The silk and obi that actually flatter.</p>
          <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-700 transition-colors">
            <Sparkles size={16} />Try a Kimono Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/ja/kimono" className="hover:text-slate-600 transition-colors font-light">日本語</Link>
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
