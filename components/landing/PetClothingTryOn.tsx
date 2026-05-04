'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown, Dog } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual pet clothing try-on work?',
    a: 'Upload a clear photo of your dog, cat, or other pet (full body, side or front view) and a photo of the outfit you want to try — sweater, jacket, costume, bandana, raincoat, anything. The AI maps the garment onto your actual pet in seconds, preserving their fur color, body shape, and proportions, so you can see how it really looks before buying.',
  },
  {
    q: 'What kind of pet clothing can I try?',
    a: 'Sweaters, hoodies, raincoats, harnesses with apparel, Halloween costumes, holiday sweaters, wedding outfits, bandanas, bow ties, pajamas, summer cooling vests, life jackets, dresses for small dogs, cat shirts. From any brand: Chewy, Ruffwear, BarkBox, Etsy, Petco, Amazon, custom-made.',
  },
  {
    q: 'Does it work for any breed and size?',
    a: 'Yes. Chihuahua to Great Dane, short-coat to Persian cat. The AI adapts the garment to your pet\'s actual body shape — small dogs do not get oversized renders, fluffy dogs do not get the fur erased. As long as the pet is clearly visible in the photo, it renders accurately.',
  },
  {
    q: 'Can I try Halloween or holiday costumes before buying?',
    a: 'Yes — that is one of the most popular use cases. Pumpkin, dinosaur, hot dog, lion mane, Star Wars, Christmas elf, reindeer, Hanukkah, birthday party. See how it actually looks on your pet, not on a stock-model dog, before paying $30-60 for something that might end up in the donation pile.',
  },
  {
    q: 'Will it preserve their face, fur, and markings?',
    a: 'Yes. Eye color, fur pattern, ear shape, breed-specific features, even the white sock on one paw — all preserved. The AI is not painting over your pet, it is dressing them.',
  },
  {
    q: 'Is it useful for pet brands and boutique stores?',
    a: 'Hugely. Embed the widget on product pages so customers see the sweater on their actual dog before adding to cart — typical 3-5x conversion lift on pet apparel and a meaningful drop in returns (which are operationally painful for pet products). Partner pricing for pet DTC brands and boutiques.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function PetClothingTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <Link href="/try-on?category=pet-clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-teal-600 transition-colors">Try Now Free</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Pets AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Pet Clothing<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Sweaters, costumes, raincoats, holiday outfits — see how anything looks on <strong className="text-slate-900 font-semibold">your actual dog or cat</strong> before you click buy. Stop ordering 3 sizes "just to be sure".
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=pet-clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-teal-600 transition-colors">
              <Sparkles size={16} />Dress Your Pet Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by pet parents</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>
      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="pet-clothing" lang="en" productLabel="Pet outfit" />


      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-teal-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Stock-model dogs lie. Yours doesn\'t.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Dog, title: 'Their actual body', body: 'Breed shape, fur length, leg proportions, chest depth — all preserved. The sweater fits THEIR build, not a generic golden retriever.' },
              { icon: Heart, title: 'Halloween, holidays, weddings', body: 'Pumpkin costume, Christmas elf, dog of honor, birthday party. See it before the package arrives — not after the event.' },
              { icon: Camera, title: 'Photoshoot-ready', body: 'Plan the Instagram post, the holiday card, or the engagement shoot before buying multiple outfits.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-teal-50 flex items-center justify-center mb-5"><Icon size={18} className="text-teal-700" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-teal-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → outfit → dressed pet.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your pet', body: 'Side or front view, full body if possible. Phone snap works — no studio needed.' },
            { n: '02', title: 'Drop in the outfit', body: 'Any pet clothing photo — Chewy, Etsy, Amazon, brand catalogue, costume site.' },
            { n: '03', title: '30-second render', body: 'AI fits the garment to your pet\'s real body, preserving fur, color, and markings.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-teal-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every pet outfit before it ships.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Halloween costumes', 'Pumpkin, hot dog, dinosaur, lion mane — see it first'],
              ['Holiday sweaters', 'Christmas elf, reindeer, Hanukkah, ugly sweater'],
              ['Wedding outfits', 'Best dog tuxedo, ring bearer, flower girl pup'],
              ['Cold weather', 'Wool coats, fleece sweaters, parkas, snoods'],
              ['Rain & weather', 'Slickers, raincoats, winter boots, snow gear'],
              ['Daily wear', 'Cooling vests, sun hats, summer t-shirts'],
              ['Accessories', 'Bandanas, bow ties, harnesses, capes, tutus'],
              ['Boutique fits', 'Custom Etsy pieces, designer pet brands, indie tailors'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-teal-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything pet parents ask.</h2>
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

      <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Cute on the model.<br /><span className="italic text-teal-500">Cuter on yours.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any outfit. 30 seconds. The look you\'d actually buy.</p>
          <Link href="/try-on?category=pet-clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-teal-600 transition-colors">
            <Sparkles size={16} />Dress Your Pet Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

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
      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
