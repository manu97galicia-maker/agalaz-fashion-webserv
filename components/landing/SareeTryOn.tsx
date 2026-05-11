'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown, Eye } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual saree and Indian-wear try-on work?',
    a: 'Upload a clear photo of yourself (face and shoulders, or full body for lehenga / sherwani) and a photo of the saree, kurta, sherwani, lehenga, salwar-kameez or dhoti you want to try. The AI maps the garment onto you in seconds — preserving your face, complexion and the original lighting — so you see exactly how the silk weave, zari work and drape sit on YOU before you buy.',
  },
  {
    q: 'Which Indian garments and silks can I try?',
    a: 'Sarees in every weave — Banarasi, Kanjivaram, Patola, Chanderi, Paithani, Mysore silk, Tussar, Bandhani, Chikankari, organza, georgette, net. Lehengas (Sabyasachi-style, Anita Dongre, Manish Malhotra cuts), salwar-kameez, anarkalis, sharara, gharara, kurtis. Menswear: sherwani, bandhgala, Nehru jacket, kurta-pyjama, dhoti-kurta, mundu. From any boutique — Fabindia, Manyavar, Aza, Pernia\'s Pop-Up, Etsy, Instagram resellers — any clear product photo works.',
  },
  {
    q: 'Can I try different sari draping styles?',
    a: 'Yes. After the first render, ask the AI in chat: "drape this in Bengali style", "Nivi pallu over the shoulder", "Maharashtrian nauvari nine-yard", "Gujarati seedha pallu", "Coorgi", "South Indian Madisar". The same saree re-renders in the regional drape you choose, without losing your face or pose.',
  },
  {
    q: 'Will it preserve my complexion and features?',
    a: 'Yes. The AI keeps your skin tone, eye shape, jawline and hair exactly as they are — no fairness filters, no Westernised face edits. Useful when you\'re deciding between a bright magenta vs a deep mehendi-green Banarasi and want to see which truly flatters your undertone.',
  },
  {
    q: 'Is it ready for shaadi season — Diwali, Karwa Chauth, sangeet, mehendi?',
    a: 'Exactly what it\'s built for. Plan the bridal lehenga, the sangeet sharara, the mehendi yellow, the wedding-day red Banarasi — months in advance, on YOUR face, before your tailor\'s queue closes. Brides save weeks of trial-room visits.',
  },
  {
    q: 'Useful for Indian-wear boutiques and designers?',
    a: 'Massively. Embed the widget on product pages — typical 3-5x lift on bridal lehengas and sherwanis (impossible to visualise on a flat product shot) and a sharp drop in size-and-colour returns. Partner pricing available for Indian-wear DTC brands and bridal stores.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or laptop. First try-on is free, no account required.',
  },
];

export default function SareeTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/hi/saree" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">हिन्दी</Link>
            <Link href="/try-on?category=clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-emerald-700 transition-colors">Try Now Free</Link>
          </div>
        </div>
      </nav>

      <TriptychDemo slug="virtual-saree-try-on" labels={TRIPTYCH_LABELS.en} />
      <TryOnDemoBlock category="clothing" lang="en" productLabel="Saree / lehenga / sherwani" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Indian Couture AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Saree<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Banarasi, Kanjivaram, lehenga, sherwani, salwar-kameez, dhoti — see every weave, every drape on <strong className="text-slate-900 font-semibold">your real face</strong> before the tailor cuts. Stop guessing the pallu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-700 transition-colors">
              <Sparkles size={16} />Try a Saree Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by brides & shaadi shoppers</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">A Banarasi on a stock model isn&apos;t a Banarasi on you.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'Your real complexion', body: 'Indian skin has range — wheatish, dusky, fair, deep. A magenta Kanjivaram that pops on one undertone can flatten on another. See it on YOUR face first.' },
              { icon: Heart, title: 'Shaadi, Diwali, Karwa Chauth', body: 'Plan the bridal red, the sangeet sharara, the mehendi yellow and the Karwa Chauth saree months ahead — on you, not on the designer\'s muse.' },
              { icon: Camera, title: 'Sabyasachi without the trial', body: 'See yourself in a Sabyasachi-style lehenga or a Manish Malhotra anarkali before flying to Mumbai for the trial. Decide what\'s worth the queue.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-emerald-50 flex items-center justify-center mb-5"><Icon size={18} className="text-emerald-700" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → saree → on you.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Face and shoulders for sarees, full body for lehenga or sherwani. A phone snap in daylight is enough.' },
            { n: '02', title: 'Drop in the saree or lehenga', body: 'Any image — Aza, Pernia\'s, Manyavar, Fabindia, Etsy, an Instagram designer screenshot.' },
            { n: '03', title: '30-second render', body: 'AI maps the weave, zari and drape onto you, keeping complexion and lighting intact.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-emerald-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every Indian-wear piece before it ships.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Sarees — silk weaves', 'Banarasi, Kanjivaram, Patola, Chanderi, Paithani, Mysore, Tussar'],
              ['Sarees — light & modern', 'Organza, georgette, chiffon, net, Bandhani, Chikankari, hand-painted'],
              ['Lehenga choli', 'Bridal red, sangeet, reception, Sabyasachi-inspired, Anita Dongre cuts'],
              ['Salwar suits', 'Anarkali, straight-cut, Pakistani-style, sharara, gharara, palazzo sets'],
              ['Sherwani & bandhgala', 'Groom\'s embroidered sherwani, Nehru jacket, indo-western achkan'],
              ['Kurta-pyjama & dhoti', 'Festival kurta, Mundu / dhoti, pathani, Pakistani kurta-shalwar'],
              ['Drapes & regional cuts', 'Nivi, Bengali, Maharashtrian nauvari, Gujarati, Coorgi, Madisar'],
              ['Boutique & designer', 'Sabyasachi-style, Manish Malhotra-style, JJ Valaya, indie Etsy weavers'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">What brides and shaadi shoppers ask.</h2>
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

      <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Beautiful on the mannequin.<br /><span className="italic text-emerald-700">More you on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any saree. 30 seconds. The weave and pallu that actually flatter.</p>
          <Link href="/try-on?category=clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-700 transition-colors">
            <Sparkles size={16} />Try a Saree Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/hi/saree" className="hover:text-slate-600 transition-colors font-light">हिन्दी</Link>
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
