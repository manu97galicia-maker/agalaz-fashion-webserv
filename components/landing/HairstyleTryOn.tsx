'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Scissors, Camera, Shield, Clock, Star, ChevronDown, Palette } from 'lucide-react';
import TryOnDemoBlock, { type PresetTheme } from "@/components/landing/TryOnDemoBlock";
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual hairstyle try-on work?',
    a: 'Upload a clear photo of your face (front-on, hair pulled back is best) and a photo of the hairstyle you want — a celebrity cut, a Pinterest reference, a salon catalogue, a colour swatch. The AI swaps your hair for the new style in seconds, preserving your face shape, skin tone, and features so you can see if the look actually suits YOU before the salon chair.',
  },
  {
    q: 'What styles can I try — cuts, colour, dye, braids?',
    a: 'All of them. Pixie cuts, bobs, curtain bangs, long layers, buzz cuts, mullets, undercuts. Colour: balayage, ombré, full bleach, platinum, copper, pastel pink, jet black, money piece. Plus braids (boxer, French, cornrows), extensions, perms, beard styles for men, and traditional or wedding updos.',
  },
  {
    q: 'Does it work for short hair AND long hair?',
    a: 'Yes. From shaved heads adding length to long hair going short, the AI handles the full transition — including the awkward middle phase. Try a chop before committing, or see what 12 inches of extensions actually looks like on your face shape.',
  },
  {
    q: 'Will it preserve my face and skin tone?',
    a: 'Yes. Eye colour, skin tone, face shape, freckles, expression — all preserved exactly. The AI is changing your hair, not generating a different person. Useful for honestly judging whether platinum blonde flatters your skin or makes you look washed out — without bleaching your real hair first.',
  },
  {
    q: 'Can I really try a colour or dye before the salon?',
    a: 'Yes — and this is the killer use case. Salon colour appointments cost $150-$400 and take 4 hours. Try copper, balayage, money-piece highlights, jet black, or pastel pink in 30 seconds first. Bring the render to your stylist and skip the "I think I want?" conversation entirely.',
  },
  {
    q: 'Is it useful for salons, hair brands, and stylists?',
    a: 'Massively. Embed on booking pages so clients pre-visualize the cut and colour — typical 3-5x consultation-to-booking lift and a sharp drop in "I changed my mind in the chair" remakes. Partner pricing available for salons, hair-extension brands, and dye/colour DTC.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function HairstyleTryOn({ themeOverride }: { themeOverride?: PresetTheme } = {}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <Link href="/try-on?category=hairstyle" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-pink-500 transition-colors">Try Now Free</Link>
        </div>
      </nav>

      {/* Triptych transformation — visible right after the nav so the visual hook lands above the fold. */}
      <TriptychDemo slug="virtual-hairstyle-try-on" labels={TRIPTYCH_LABELS.en} />

      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="hairstyle" lang="en" productLabel="Hairstyle" theme={themeOverride ?? "hairstyle-feminine"} />


      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Hairstyles AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Hairstyle<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Cuts, colour, highlights, braids, dye — see how it looks on <strong className="text-slate-900 font-semibold">YOUR face</strong> before the salon appointment. Stop second-guessing the $300 colour or the chop you can&apos;t un-cut.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=hairstyle" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-500 transition-colors">
              <Sparkles size={16} />Try Hairstyles Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Used before salon visits</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-pink-600 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">A Pinterest cut isn&apos;t a you cut.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Scissors, title: 'Your actual face', body: 'Your real face shape, jawline, skin tone, and features. The bob hits where it would on YOU — not on a magazine model with a totally different bone structure.' },
              { icon: Palette, title: 'Before the $200 salon', body: 'Salon colour and a full restyle is $150-$400 and 4 hours of your life. See it first. Save the appointment for the look you actually want, not the experiment.' },
              { icon: Camera, title: 'Dye and colour decisions', body: 'Platinum, copper, balayage, money piece, pastel — preview each one on your real skin tone in 30 seconds, side by side. Decide once, not in the salon mirror.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-pink-50 flex items-center justify-center mb-5"><Icon size={18} className="text-pink-600" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-pink-600 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → reference → new hair.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Front-on selfie, neutral expression, hair pulled back if possible. Phone snap works — no studio lighting needed.' },
            { n: '02', title: 'Drop the hair reference', body: 'Any hairstyle photo — Pinterest pin, celebrity headshot, salon catalogue, colour swatch, balayage example.' },
            { n: '03', title: '30-second render', body: 'AI swaps your hair for the new cut and colour, preserving your face, skin tone, and features.' },
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
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every cut and colour before the chair.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Haircuts', 'Pixie, bob, lob, layers, curtain bangs, mullet, shag, blunt cut, undercut'],
              ['Colour & dye', 'Platinum, jet black, copper, ash brown, vivid red, pastel pink, mahogany, warm honey'],
              ['Balayage & highlights', 'Foilayage, money piece, baby lights, full balayage, lived-in highlights'],
              ['Braids', 'Box braids, cornrows, French, fishtail, Dutch, knotless, fulani, halo'],
              ['Extensions & length', 'Tape-ins, clip-ins, weft, sew-in — preview the full added length on your face'],
              ['Mens hair & beards', 'Buzz cut, fade, taper, quiff, beard styles, full beard, stubble, goatee'],
              ['Wedding & event styling', 'Bridal updo, romantic curls, sleek pony, half-up, formal chignon'],
              ['Kids hair', 'Toddler trims, first haircut preview, school-photo styles, princess braids'],
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
          <span className="text-[10px] font-black text-pink-600 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything before the salon visit.</h2>
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
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Pretty on the model.<br /><span className="italic text-pink-500">Stunning on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any cut, any colour. 30 seconds. The look you&apos;d actually book.</p>
          <Link href="/try-on?category=hairstyle" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-500 transition-colors">
            <Sparkles size={16} />Try Hairstyles Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Face-shape sub-guides — boost the new long-tail landings' authority
          by linking to them from the hairstyle hub. */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-5 text-center">
          Find the right cut for your face shape
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { shape: 'round', slug: 'haircut-for-round-face', label: 'Round face' },
            { shape: 'oval', slug: 'haircut-for-oval-face', label: 'Oval face' },
            { shape: 'diamond', slug: 'haircut-for-diamond-face', label: 'Diamond face' },
            { shape: 'square', slug: 'haircut-for-square-face', label: 'Square face' },
          ].map((f) => (
            <Link
              key={f.shape}
              href={`/${f.slug}`}
              className="block p-4 rounded-xl border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all"
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-pink-600">
                {f.label}
              </div>
              <div className="font-serif text-base font-black text-slate-900 mt-1">
                Best haircuts
              </div>
              <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                See cuts <ArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Topical link block — links to all other product try-on landings */}
      <InternalLandingLinks currentSlug="virtual-hairstyle-try-on" lang="en" />

      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/blog" className="hover:text-slate-600 transition-colors font-light">Blog</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">Try On</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors font-light">Terms</Link>
          </div>
        </div>
      </footer>

      {/* B2B partners upsell */}

      {/* Contextual B2B partner CTA — converts shop-owner traffic immediately after the visual demo. */}
      <PartnerCtaBlock category="virtual-hairstyle-try-on" lang="en" />
      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
