'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Camera, Shield, Clock, Star, ChevronDown, Baby } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual baby clothing try-on work?',
    a: 'Upload a clear photo of your baby (full body, side or front) and a photo of the outfit you want to try — onesie, dress, snowsuit, costume, christening gown, anything. The AI maps the garment onto your real baby in seconds, preserving their face, skin tone, and proportions, so you see exactly how it fits before paying.',
  },
  {
    q: 'What kind of baby clothing can I try?',
    a: 'Onesies, rompers, dresses, snowsuits, swimwear, baptism / christening gowns, baby Halloween costumes, holiday outfits, baby tuxedos, photoshoot outfits, twins matching sets, sleeping bags, knitted cardigans. From any brand or store: Carter\'s, Mini Boden, Petit Bateau, Zara Baby, Etsy, Amazon, vintage finds.',
  },
  {
    q: 'Does it work for newborns up to toddlers?',
    a: 'Yes. From newborn (3-5kg) to toddler (24+ months). The AI adapts the garment to your baby\'s actual body shape — no oversized renders on a 6-month-old, no stretched-out fabric on a chubbier 1-year-old. As long as the baby is clearly visible in the photo, it renders accurately.',
  },
  {
    q: 'Can I try the same outfit in different colours or sizes?',
    a: 'Yes. After the first render, ask the AI chat: "show this in pastel pink", "switch to 12-month size", "add a matching beanie". Re-renders without losing your baby\'s face or skin tone.',
  },
  {
    q: 'Will it preserve my baby\'s face?',
    a: 'Yes. Eye colour, hair, cheek shape, skin tone — all preserved exactly. The AI is dressing them, not generating a new baby. The result looks like your baby wearing that outfit — useful for shower gifts, photoshoots, or just deciding before you click buy.',
  },
  {
    q: 'Is it useful for baby brands and shops?',
    a: 'Hugely. Embed the widget on product pages so parents see the outfit on a real baby before adding to cart — typical 3-5x conversion lift on baby apparel and a meaningful drop in returns (huge category for size errors). Partner pricing available for baby DTC brands and boutiques.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function BabyClothingTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <Link href="/try-on?category=baby-clothing" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-pink-500 transition-colors">Try Now Free</Link>
        </div>
      </nav>

      {/* Triptych transformation — visible right after the nav so the visual hook lands above the fold. */}
      <TriptychDemo slug="virtual-baby-clothing-try-on" labels={TRIPTYCH_LABELS.en} />

      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="baby-clothing" lang="en" productLabel="Baby outfit" theme="baby-clothing" />


      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Baby AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Baby Clothing<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Onesies, dresses, christening gowns, costumes — see how anything looks on <strong className="text-slate-900 font-semibold">your real baby</strong> before you click buy. Stop ordering 3 sizes &quot;just in case&quot;.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=baby-clothing" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-500 transition-colors">
              <Sparkles size={16} />Dress Your Baby Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by new parents</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-pink-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Stock-photo babies lie. Yours doesn&apos;t.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Baby, title: 'Their actual body', body: 'Size, weight class, body shape — all preserved. The onesie fits a 4-month-old like a 4-month-old, not a generic catalogue baby.' },
              { icon: Heart, title: 'Christenings, holidays, photoshoots', body: 'Baptism gown, Halloween pumpkin, Christmas elf, family portrait. See it before the package arrives — not after the event.' },
              { icon: Camera, title: 'Gift-ready', body: 'Plan the baby shower gift, holiday card, or first-birthday set before placing the order. No more wrong-size returns.' },
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
          <span className="text-[10px] font-black text-pink-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → outfit → dressed baby.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your baby', body: 'Side or front, full body if possible. Phone snap works — no studio lighting needed.' },
            { n: '02', title: 'Drop in the outfit', body: 'Any baby clothing photo — Carter&apos;s, Petit Bateau, Etsy, Amazon, brand catalogue, gift idea.' },
            { n: '03', title: '30-second render', body: 'AI fits the garment to your baby&apos;s real body, preserving face and skin tone.' },
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
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every baby outfit before it ships.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Christenings & baptisms', 'Lace gowns, traditional white sets, ceremony outfits'],
              ['Holiday & seasonal', 'Christmas elf, Easter pastel, Halloween pumpkin, Hanukkah'],
              ['Photoshoots', 'Newborn shoot, milestone monthly, sibling matching, family portrait'],
              ['Daily wear', 'Onesies, rompers, sleepsuits, knit cardigans, sun hats'],
              ['Cold weather', 'Snowsuits, fleece bunting, beanies, mittens, booties'],
              ['Special occasions', 'Wedding ring bearer, birthday tuxedo, flower-girl dress'],
              ['Twin & sibling sets', 'Matching outfits, coordinated colours, themed sets'],
              ['Boutique fits', 'Custom Etsy pieces, designer baby brands, indie tailors'],
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
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything new parents ask.</h2>
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
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Cute on the catalogue.<br /><span className="italic text-pink-500">Cuter on yours.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any outfit. 30 seconds. The fit you&apos;d actually buy.</p>
          <Link href="/try-on?category=baby-clothing" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-pink-500 transition-colors">
            <Sparkles size={16} />Dress Your Baby Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Topical link block — links to all other product try-on landings */}
      <InternalLandingLinks currentSlug="virtual-baby-clothing-try-on" lang="en" />

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
      <PartnerCtaBlock category="virtual-baby-clothing-try-on" lang="en" />
      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
