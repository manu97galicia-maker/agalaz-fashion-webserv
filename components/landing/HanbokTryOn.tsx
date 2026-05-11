'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown, Eye } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual hanbok try-on work?',
    a: 'Upload a clear photo of yourself (face and shoulders, or full body for the chima skirt) plus a photo of the hanbok — jeogori, chima, dangui, jeonbok or wedding hanbok — and the AI dresses you in it in 30 seconds. Your face, hair and skin tone stay exactly as they are; only the garment is rendered, including the goreum tie, otgoreum trim and chima silhouette.',
  },
  {
    q: 'Which hanbok styles can I try?',
    a: 'Traditional women\'s hanbok (jeogori + chima), men\'s hanbok (jeogori + baji + jeonbok / durumagi), modern fusion hanbok from labels like Leesle, Tchai Kim, Danha, Hanbok Lynn and Sonjjang. Wedding hanbok (hwarot, wonsam), kids hanbok for first birthday (dol), saekdong-sleeve children\'s hanbok, and formal court-style hanbok. Any product image — Coupang, Naver Smartstore, Etsy, designer Instagram — works.',
  },
  {
    q: 'Can I see different colour combinations and trims?',
    a: 'Yes. After the first render, ask the AI in chat: "navy chima with peach jeogori", "saekdong rainbow sleeves", "modern monochrome hanbok", "longer chima". The same hanbok recolours and re-cuts on you while keeping your face and pose.',
  },
  {
    q: 'Will it respect my face and natural look?',
    a: 'Yes. We never alter your face — no skin smoothing, no eye-shape edits, no cosmetic surgery filters. The render shows the hanbok on YOU. Useful for picking colours that work with your real undertone instead of the studio model\'s.',
  },
  {
    q: 'Is it ready for Chuseok, Seollal, dol, weddings and pyebaek?',
    a: 'Exactly what it\'s built for. Plan the family Chuseok hanbok, the Seollal sebae outfit, your child\'s dol-jabi hanbok, the bride\'s pyebaek hwarot — weeks before the rental shop in Insadong or Bukchon books out.',
  },
  {
    q: 'Useful for hanbok rental shops and designers?',
    a: 'Yes. Embed on product / rental pages — typical 3-5x lift in conversion on wedding and Chuseok hanbok, plus far fewer no-shows from customers who weren\'t sure how it would look. Partner pricing available for Korean hanbok brands and Bukchon / Gyeongbokgung rental shops.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or laptop. First try-on is free, no account required.',
  },
];

export default function HanbokTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/ko/hanbok" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">한국어</Link>
            <Link href="/try-on?category=clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-pink-600 transition-colors">Try Now Free</Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-hanbok-try-on" labels={TRIPTYCH_LABELS.en} />
      <TryOnDemoBlock category="clothing" lang="en" productLabel="Hanbok / chima jeogori" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-800 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Korean Hanbok AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Hanbok<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Traditional, modern fusion, wedding hwarot, kids dol — see how every chima and jeogori looks on <strong className="text-slate-900 font-semibold">your real face</strong> before you book the rental in Bukchon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-600 transition-colors">
              <Sparkles size={16} />Try a Hanbok Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by Chuseok & Seollal shoppers</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-pink-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Rental shops shoot on one model. You aren&apos;t her.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'Your real undertone', body: 'A blush-pink jeogori on a fair-skinned model can read totally different on warm or olive undertones. See it on YOUR skin first.' },
              { icon: Heart, title: 'Chuseok, Seollal, dol, pyebaek', body: 'Plan the family Chuseok hanbok, your child\'s first-birthday dol outfit, the bride\'s pyebaek hwarot — before the rental queue closes.' },
              { icon: Camera, title: 'Gyeongbokgung-ready', body: 'See yourself in the hanbok BEFORE you walk into the palace. Pick the chima colour that pops in your photos.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-pink-50 flex items-center justify-center mb-5"><Icon size={18} className="text-pink-700" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-pink-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → hanbok → on you.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Face and shoulders for the jeogori, full body for the chima silhouette. A phone snap in daylight is enough.' },
            { n: '02', title: 'Drop in the hanbok', body: 'Any image — Leesle, Danha, Tchai Kim, a Coupang listing, a Bukchon rental shop\'s Instagram, an Etsy seller.' },
            { n: '03', title: '30-second render', body: 'AI maps the jeogori, goreum tie and chima drape onto you, keeping your face and lighting intact.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-pink-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every hanbok before you book the rental.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Women\'s traditional hanbok', 'Jeogori + chima, dangui, wonsam, hwarot, court-style'],
              ['Men\'s traditional hanbok', 'Jeogori + baji, durumagi overcoat, jeonbok vest, gat hat'],
              ['Modern fusion hanbok', 'Leesle, Tchai Kim, Danha, Sonjjang — daily-wear silhouettes'],
              ['Wedding hanbok', 'Bridal hwarot, wonsam, groom\'s dallyeongpo, pyebaek attire'],
              ['Kids hanbok', 'Dol (first birthday), saekdong rainbow sleeves, hanbok for siblings'],
              ['Holiday hanbok', 'Chuseok family sets, Seollal sebae outfits, palace-tour rentals'],
              ['Court & ceremonial', 'Joseon court replicas, hanbok for sageuk-style photoshoots'],
              ['Boutique & designer', 'Hanbok Lynn, Kim Mee Hee, indie Etsy hanbok weavers'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-pink-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">What hanbok shoppers ask.</h2>
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

      <section className="bg-gradient-to-br from-pink-50 via-white to-pink-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Beautiful on the rack.<br /><span className="italic text-pink-600">More you on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any hanbok. 30 seconds. The chima and jeogori that actually flatter.</p>
          <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-600 transition-colors">
            <Sparkles size={16} />Try a Hanbok Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/ko/hanbok" className="hover:text-slate-600 transition-colors font-light">한국어</Link>
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
