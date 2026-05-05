'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual wedding dress try-on work?',
    a: 'Upload a full-body photo of yourself and a photo of any wedding dress (from a designer site, Pinterest, or boutique catalogue). Our AI maps the gown onto your real body in seconds — preserving your exact face, skin tone, and proportions. You see how the silhouette, train, and neckline actually look on you before you book a single fitting.',
  },
  {
    q: 'Can I try on dresses from any designer or store?',
    a: 'Yes. Any wedding dress photo works — Pronovias, Vera Wang, Galia Lahav, BHLDN, Net-a-Porter, local boutiques, vintage stores, or a screenshot from Instagram. As long as the gown is visible in the image, the AI can render it on your body.',
  },
  {
    q: 'Is the result realistic enough to make a buying decision?',
    a: 'Most users tell us it is the closest thing to standing in front of a mirror at the boutique without driving there. The AI respects fabric drape, train length, fit, and silhouette. Use it to narrow your shortlist before in-person fittings — saving travel, time, and the typical 6-12 boutique appointments brides go through.',
  },
  {
    q: 'Can I see the same dress in different colours (champagne, blush, ivory)?',
    a: 'Yes. After the first render, open the AI chat and ask for the colour change directly: "show this in blush", "make the trim ivory", "remove the cathedral train". The AI re-renders without losing your face or proportions.',
  },
  {
    q: 'Do I need to download an app or create an account?',
    a: 'No download. Works in any browser on phone, tablet, or desktop. You only sign in when you want to save renders to your gallery — the first try-on is free.',
  },
  {
    q: 'How private are my photos?',
    a: 'Your photo is processed only to generate your render — never shared, never sold, never used to train models. You can delete any render from your gallery permanently.',
  },
];

export default function WeddingDressTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=clothing"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-600 transition-colors"
          >
            Try Now Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            For Brides
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Virtual Wedding Dress
            <br />
            <span className="italic text-slate-400">Try-On.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            See exactly how any wedding gown looks on <strong className="text-slate-900 font-semibold">your real body</strong> — before you book a single boutique appointment. Upload a photo, drop in any dress, and our AI renders the result in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=clothing"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={16} />
              Try Your First Dress Free
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">4.9 / 5 · 52k brides</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={14} />
            <span className="text-xs font-bold">Photos never shared</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="text-xs font-bold">30-second render</span>
          </div>
        </div>
      </section>
      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="clothing" lang="en" productLabel="Wedding dress" />


      {/* Why brides use it */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Why brides choose Agalaz</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              Skip 8 boutique trips. Find the dress.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Try every silhouette', body: 'A-line, mermaid, ball gown, sheath, fit-and-flare — see which actually flatters your body, not the model in the lookbook.' },
              { icon: Camera, title: 'Any dress, any designer', body: 'Pronovias, Vera Wang, BHLDN, Galia Lahav, Pinterest finds, vintage stores. If you have a photo, you can try it.' },
              { icon: Shield, title: 'Private by design', body: 'Your photos are processed only for your render. Never shared, never sold, never used to train models.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-rose-50 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-rose-600" />
                </div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            From photo to wedding-day preview.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'A clear front-facing photo, full-body if possible. Phone selfie works.' },
            { n: '02', title: 'Drop in the dress', body: 'Any wedding gown image — designer site, Pinterest, Instagram screenshot, boutique catalogue.' },
            { n: '03', title: 'Render in 30 seconds', body: 'AI maps the gown onto your real body, preserving your face, skin tone, and proportions.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-rose-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">
              Perfect for every step of the search.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Narrowing 50 Pinterest saves down to 5 to actually try in person',
              'Comparing the same neckline (sweetheart vs V-neck vs strapless) on you',
              'Pre-screening custom designs before paying for sketches',
              'Trying vintage or destination dresses without travelling there',
              'Showing your mum, MOH, or partner before in-person fittings',
              'Checking how a dress looks with your real hair colour and skin tone',
            ].map((useCase, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-white" />
                </div>
                <span className="text-white/80 font-light text-sm leading-relaxed">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            Everything brides ask.
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <button
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left bg-slate-50 hover:bg-slate-100 transition-colors p-5 rounded-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-serif text-base font-black text-slate-900 tracking-tight">{item.q}</span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === i && (
                <p className="text-slate-500 text-sm font-light leading-relaxed mt-3">{item.a}</p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-rose-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            The dress is out there.
            <br />
            <span className="italic text-rose-400">Find her.</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">
            Stop scrolling. Stop second-guessing. Upload a photo and see the dress on you in 30 seconds.
          </p>
          <Link
            href="/try-on?category=clothing"
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-colors"
          >
            <Sparkles size={16} />
            Try Your First Dress Free
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Topical link block — links to all other product try-on landings */}
      <InternalLandingLinks currentSlug="virtual-wedding-dress-try-on" lang="en" />

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/blog" className="hover:text-slate-600 transition-colors font-light">Blog</Link>
            <Link href="/blog/spring-wedding-guest-mother-of-groom-dresses-2026" className="hover:text-slate-600 transition-colors font-light">Wedding Guides</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">Try On</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors font-light">Terms</Link>
          </div>
        </div>
      </footer>
    
      {/* B2B partners upsell */}
      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
