'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Star } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import { VESTITI_COMUNIONE as VESTITI, VESTITO_COMUNIONE_FAQ as FAQ } from '@/data/vestitoComunione';

export default function VestitoComunione() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white" lang="it">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=clothing"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-amber-400 transition-colors"
          >
            Prova gratis
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Prima Comunione · Cerimonia
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Vestito da Comunione
            <br />
            <span className="italic text-slate-400">Bambina · Bambino · Mamma</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            7 modelli di vestito per la prima comunione — classico bianco, moderno corto, con bolero, marinaretto. <strong className="text-slate-900 font-semibold">Provali sulla foto della tua bambina</strong> prima di comprare. Gratis, 30 secondi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Provare un vestito
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Gratis · Senza app · 30 sec</span>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">Risposta rapida</div>
          <p className="text-slate-900 font-bold text-base md:text-lg leading-relaxed mb-2">
            Il <span className="italic">vestito da comunione</span> tradizionale italiano è bianco, lungo o al ginocchio, in pizzo o cotone leggero. Per il bambino: completo bianco con dettagli marinari.
          </p>
          <p className="text-slate-700 text-sm">
            Range di prezzo medio: 150-300€ per atelier, 80-150€ per catene come Zara Kids o Mango Kids.
          </p>
        </div>
      </section>

      <TryOnDemoBlock category="clothing" lang="it" productLabel="Vestito da comunione" theme="baby-clothing" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            7 modelli
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Vestiti da comunione per ruolo
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {VESTITI.map((v, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-amber-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">{v.name}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-slate-900">Pezzi: </span>
                    {v.pieces}
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Per chi</p>
                  <p className="text-slate-600 text-xs mt-1">{v.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Star size={32} className="text-amber-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Provalo prima di comprare
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Comprare un abito da comunione che la bambina indossa una sola volta è un investimento. Carica la sua foto + il vestito e vedi come le sta in 30 secondi. Primo render gratis.
        </p>
        <Link
          href="/try-on?category=clothing"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Provare un vestito
          <ArrowRight size={14} />
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          Domande frequenti
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

      <InternalLandingLinks lang="it" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/it/try-on" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Camerino</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
