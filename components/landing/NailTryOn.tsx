'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Camera, Shield, Clock, Star, ChevronDown, Palette, Hand } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual nail try-on work?',
    a: 'Upload a clear photo of your hand and a reference of the nail design or colour you want. Our AI renders the manicure on your actual fingers — respecting your nail shape, skin tone, and angle — in roughly 30 seconds. You can save, share, or send the result to your nail tech before the appointment.',
  },
  {
    q: 'What nail styles can I try?',
    a: 'Anything visible in a photo: French tips, almond, square, coffin, stiletto, ballerina, short or long, gel, acrylic, dip powder, press-ons, chrome, glitter, ombré, marble, coquette, clean girl, milky, pastel, neon — even themed art (florals, holiday designs, character nails).',
  },
  {
    q: 'Can I try the same design in different colours?',
    a: 'Yes. After the first render, ask the AI chat: "make these milky pink", "switch the chrome to silver", "shorten to almond". The design re-renders without losing your hand or skin tone.',
  },
  {
    q: 'Will it look like my real hand?',
    a: 'Yes — that is the point. The AI preserves your skin tone, finger length, knuckle position, ring fit, and the angle of your photo. It is not a stock-photo overlay; it is a realistic render of those nails on your hand.',
  },
  {
    q: 'Is it useful for nail techs and salons?',
    a: 'Hugely. Show clients exactly what they will get before mixing a single drop of gel. Cuts decision time, reduces remakes, and works as portfolio content (clients tag your salon). Ask about partner pricing if your salon does over 100 sets a month.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function NailTryOn() {
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
            href="/try-on?category=nails"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-fuchsia-600 transition-colors"
          >
            Try Now Free
          </Link>
        </div>
      </nav>

      {/* Triptych transformation — visible right after the nav so the visual hook lands above the fold. */}
      <TriptychDemo slug="virtual-nail-try-on" labels={TRIPTYCH_LABELS.en} />

      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="nail" lang="en" productLabel="Nail design" />


      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-fuchsia-50 text-fuchsia-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Nails AI
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Virtual Nail
            <br />
            <span className="italic text-slate-400">Try-On.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            See any manicure on <strong className="text-slate-900 font-semibold">your actual hand</strong> — before you book the appointment, before you commit to the colour, before you waste a Saturday at the salon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=nails"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-fuchsia-600 transition-colors"
            >
              <Sparkles size={16} />
              Try Your First Set Free
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">4.9 / 5 · 52k users</span>
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


      {/* Why use it */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-fuchsia-600 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              Pinterest looks lie. Your hand does not.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Hand, title: 'Your real hand', body: 'Skin tone, finger length, nail bed shape — the AI keeps everything that makes your hand yours, and just changes the manicure.' },
              { icon: Palette, title: 'Any style, any colour', body: 'Almond, coffin, chrome, glitter, French, ombré, gel, press-ons, themed art. If you can find a photo of it, you can try it.' },
              { icon: Camera, title: 'Send it to your nail tech', body: 'Stop describing what you want with awkward emojis. Send the actual render of the design on your actual hand.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-fuchsia-50 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-fuchsia-600" />
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
          <span className="text-[10px] font-black text-fuchsia-600 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            From phone shot to fresh set.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Photo your hand', body: 'Hold your hand naturally, fingers slightly apart. Phone camera works perfectly.' },
            { n: '02', title: 'Pick the design', body: 'Pinterest screenshot, Instagram inspo, salon menu page — any nail photo.' },
            { n: '03', title: 'Render in 30 seconds', body: 'AI maps the design onto your real fingers, preserving skin tone and nail shape.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-fuchsia-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending styles */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">
              Try every trend before committing.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Coquette', 'Pink, bows, milky tips, soft girl aesthetic'],
              ['Clean girl', 'Short almond, neutral, milky, no-art'],
              ['Pastel chrome', '2026 trend — futuristic mirror finishes'],
              ['Classic French', 'Modern micro tips, almond, ballerina'],
              ['Glazed donut', 'Hailey Bieber chrome, pearlescent'],
              ['Coffin / Ballerina', 'Long, dramatic, ready for any look'],
              ['Glitter & art', 'Holiday, themed, character, bold'],
              ['Press-ons', 'See if the set looks right before applying'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-fuchsia-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-sm">{title}</span>
                  <span className="text-white/60 font-light text-sm"> — {body}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog/coquette-aesthetic-spring-nails-virtual-try-on" className="text-fuchsia-300 text-xs font-bold uppercase tracking-widest hover:text-fuchsia-200 transition-colors">
              Read the 2026 nail trend guide →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-fuchsia-600 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            Everything you'd ask.
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
      <section className="bg-gradient-to-br from-fuchsia-50 via-white to-fuchsia-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Stop guessing.
            <br />
            <span className="italic text-fuchsia-400">Just see them.</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">
            One photo. One reference. 30 seconds. The set you'd actually book.
          </p>
          <Link
            href="/try-on?category=nails"
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-fuchsia-600 transition-colors"
          >
            <Sparkles size={16} />
            Try Your First Set Free
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Topical link block — links to all other product try-on landings */}
      <InternalLandingLinks currentSlug="virtual-nail-try-on" lang="en" />

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">
            AGALAZ
          </Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/blog" className="hover:text-slate-600 transition-colors font-light">Blog</Link>
            <Link href="/blog/short-almond-spring-nails-clean-girl-look" className="hover:text-slate-600 transition-colors font-light">Nail Guides</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">Try On</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors font-light">Terms</Link>
          </div>
        </div>
      </footer>
    
      {/* B2B partners upsell */}

      {/* Contextual B2B partner CTA — converts shop-owner traffic immediately after the visual demo. */}
      <PartnerCtaBlock category="virtual-nail-try-on" lang="en" />
      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
