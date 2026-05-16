'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Star } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import { FESTA_JUNINA_LOOKS as LOOKS, FESTA_JUNINA_FAQ as FAQ } from '@/data/festaJunina';


export default function LookFestaJunina() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white" lang="pt">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=clothing"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-amber-500 transition-colors"
          >
            Provar grátis
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            🌽 São João · Festa Junina
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Look Festa Junina
            <br />
            <span className="italic text-slate-400">Pra Você 2026.</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            7 looks juninos prontos pra montar — do <strong className="text-slate-900 font-semibold">caipira clássico</strong> ao <strong className="text-slate-900 font-semibold">chique</strong>. Suba sua foto e veja como cada vestido de chita ou camisa xadrez fica em VOCÊ antes de comprar. Grátis em 30 segundos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Testar look junino
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Grátis · Sem app · 30 seg</span>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">
            Resposta rápida
          </div>
          <p className="text-slate-900 font-bold text-base md:text-lg leading-relaxed mb-2">
            O <span className="italic">look festa junina</span> tradicional inclui vestido de chita ou xadrez, chapéu de palha, sardas pintadas e tranças com fitas. Versões modernas vão do <em>caipira chique</em> ao <em>street style xadrez</em>.
          </p>
          <p className="text-slate-700 text-sm">
            Abaixo, 7 looks juninos por ocasião — do arraial da escola dos filhos a casamentos temáticos no campo.
          </p>
        </div>
      </section>

      {/* Live try-on with festa-junina-specific presets so visitors only
          need to upload their photo (Gemini-generated, 2026-05-16). */}
      <TryOnDemoBlock
        category="clothing"
        lang="pt"
        productLabel="Vestido / camisa xadrez"
        presets={[
          { src: '/images/presets/pt-look-festa-junina-chita-floral-red-dress.png', label: 'Vestido chita floral', alt: 'Vestido festa junina chita vermelho com flores brancas — provador IA Agalaz' },
          { src: '/images/presets/pt-look-festa-junina-xadrez-shirt-jeans-caipira.png', label: 'Xadrez caipira', alt: 'Look festa junina caipira camisa xadrez vermelha com shorts jeans — provador IA Agalaz' },
        ]}
      />

      {/* 7 looks grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            7 looks
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Looks juninos por ocasião
          </h2>
          <p className="text-slate-700 mt-3 max-w-2xl mx-auto">
            Cada combo abaixo está pronto pra montar. Teste qualquer um na sua foto antes de gastar em roupa que vai usar uma vez.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {LOOKS.map((look, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-amber-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">
                    {look.name}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-slate-900">Peças: </span>
                    {look.pieces}
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">
                    Quando usar
                  </p>
                  <p className="text-slate-600 text-xs mt-1">{look.when}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Star size={32} className="text-amber-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Teste o look na sua foto
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Comprar vestido de chita pra usar uma vez é caro. Antes de pagar, suba sua foto + a foto do vestido e veja como fica em VOCÊ em 30 segundos. Grátis o primeiro render.
        </p>
        <Link
          href="/try-on?category=clothing"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Testar look junino
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          Perguntas frequentes
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

      <InternalLandingLinks lang="pt" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/pt/try-on" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Provador</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

