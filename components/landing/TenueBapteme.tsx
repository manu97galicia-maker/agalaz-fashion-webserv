'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import { TENUES_BAPTEME as TENUES, TENUE_BAPTEME_FAQ as FAQ } from '@/data/tenueBapteme';

export default function TenueBapteme() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white" lang="fr">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=clothing"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-300 transition-colors"
          >
            Essayer gratuit
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Cérémonie · Tenue habillée
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Tenue de Baptême
            <br />
            <span className="italic text-slate-400">Femme · Homme · Enfant</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            7 idées de tenues de baptême prêtes à porter — invitée, marraine, parrain, garçon, fille, bébé baptisé. <strong className="text-slate-900 font-semibold">Essayez chaque robe ou costume sur votre photo</strong> avant d&apos;acheter. Gratuit, 30 secondes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-400 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Essayer une tenue
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Gratuit · Sans app · 30 sec</span>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-rose-700 mb-3">
            Réponse rapide
          </div>
          <p className="text-slate-900 font-bold text-base md:text-lg leading-relaxed mb-2">
            Pour un baptême : <span className="italic">tons pastels et poudrés, robe midi pour femmes, costume bleu marine pour hommes</span>. Évitez le noir (associé aux funérailles) et le blanc total (réservé au baptisé).
          </p>
          <p className="text-slate-700 text-sm">
            Privilégiez : poudré, beige, ivoire, ciel, vieux rose, vert sauge, gris perle.
          </p>
        </div>
      </section>

      <TryOnDemoBlock category="clothing" lang="fr" productLabel="Tenue de baptême" theme="baby-clothing" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            7 tenues
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Tenues de baptême par rôle
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {TENUES.map((t, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-rose-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">{t.name}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-slate-900">Pièces : </span>
                    {t.pieces}
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Pour qui</p>
                  <p className="text-slate-600 text-xs mt-1">{t.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Essayez votre tenue avant la cérémonie
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Acheter une robe de baptême sans pouvoir l&apos;essayer = retours et stress. Téléchargez votre photo et la robe convoitée, l&apos;IA vous montre le résultat en 30 secondes.
        </p>
        <Link
          href="/try-on?category=clothing"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-400 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Essayer une tenue de baptême
          <ArrowRight size={14} />
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          Questions fréquentes
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

      <InternalLandingLinks lang="fr" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/fr/try-on" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Essayage</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

