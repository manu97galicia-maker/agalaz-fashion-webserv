'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, X, ChevronDown, Scissors } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import type { FaceShape, FaceShapeContent } from '@/data/faceShapes';
import { FACE_SHAPES, FACE_SHAPE_LIST } from '@/data/faceShapes';

interface Props {
  shape: FaceShape;
}

export default function HaircutByFaceShape({ shape }: Props) {
  const data: FaceShapeContent = FACE_SHAPES[shape];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=hairstyle"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-pink-500 transition-colors"
          >
            Try Now Free
          </Link>
        </div>
      </nav>

      {/* Hero — H1 carries the high-volume long-tail keyword verbatim. */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Face shape · Hair AI
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            {data.h1.primary}
            <br />
            <span className="italic text-slate-400">{data.h1.italic}</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            {data.hero}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Try a haircut now
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Free · No download · 30 sec</span>
          </div>
        </div>
      </section>

      {/* Shape definition + how-to-know — captures "do I have a [shape] face" intent. */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
              What is a {data.shapeLabel} face shape?
            </h2>
            <p className="text-slate-700 leading-relaxed">{data.shapeDescription}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
              How to tell if you have one
            </h2>
            <ul className="space-y-2.5">
              {data.howToKnow.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <Check size={16} className="text-pink-500 shrink-0 mt-1" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Live try-on — the actual interactive AI demo. */}
      <TryOnDemoBlock category="hairstyle" lang="en" productLabel="Reference cut" theme="face-round-haircut" />

      {/* Recommended cuts grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            Best cuts
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Haircuts that flatter {data.shapeLabel} faces
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {data.recommendedCuts.map((cut, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-pink-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">
                    {cut.name}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{cut.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avoid section — counter-intuitive content that boosts dwell time. */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 bg-slate-50/40 border-y border-slate-100">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            Avoid
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Cuts that don&apos;t flatter {data.shapeLabel} faces
          </h2>
        </div>
        <div className="space-y-3 max-w-3xl mx-auto">
          {data.avoidCuts.map((cut, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200">
              <X size={18} className="text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">{cut.name}</h3>
                <p className="text-slate-700 text-sm">{cut.why}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — repeat after content so the intent-aware reader has a clear path. */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Scissors size={32} className="text-pink-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Try one on your photo first
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Reading about haircuts is one thing. Seeing the cut on YOUR actual face — your skin tone, your bone structure, your hairline — is another. Free first render, no signup.
        </p>
        <Link
          href="/try-on?category=hairstyle"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Try a haircut on my face
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* FAQ — JSON-LD lives in the layout for SEO; this is the visible accordion. */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          Frequently asked
        </h2>
        <div className="space-y-3">
          {data.faq.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm md:text-base pr-4">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                />
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

      {/* Sister face-shape pages — internal linking diluted to 3 closest. */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-5 text-center">
          Other face shapes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FACE_SHAPE_LIST.filter((s) => s !== shape).slice(0, 3).map((s) => {
            const sister = FACE_SHAPES[s];
            return (
              <Link
                key={s}
                href={`/${sister.slug}`}
                className="block p-4 rounded-xl border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-pink-600">
                  {sister.shapeLabel} face
                </div>
                <div className="font-serif text-base font-black text-slate-900 mt-1">
                  Best haircuts
                </div>
                <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                  See cuts <ArrowRight size={10} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Existing 16-landing internal links footer — drives discovery. */}
      <InternalLandingLinks lang="en" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/try-on?category=hairstyle" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Try a haircut</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
