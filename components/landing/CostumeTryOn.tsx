'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Wand2, Camera, Shield, Clock, Star, ChevronDown, Ghost } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual costume try-on work?',
    a: 'Upload a clear photo of yourself (or your kid) and a photo of the costume — Halloween witch, cosplay armour, carnival queen, banana suit, anything. The AI maps the costume onto your real body in seconds, preserving your face, hair, and proportions, so you see exactly what it looks like before paying or sewing the rest.',
  },
  {
    q: 'What kind of costumes can I try?',
    a: 'Halloween costumes (witch, vampire, ghost, sexy nurse, scarecrow), cosplay (anime, gaming, comic-book heroes), carnival outfits (Venice masks, Rio plumes, Cádiz comparsas), theme parties (80s, disco, white party, James Bond), couples and group costumes, last-minute DIY ideas. From any source — Spirit Halloween, Amazon, Etsy, Party City, AliExpress, Pinterest mood-boards.',
  },
  {
    q: 'Does it work for adults and kids?',
    a: 'Yes. From toddler costumes (pumpkin, dinosaur, princess) to teen cosplay to adult Halloween. Upload a clear full-body photo of the person and the AI adapts the costume to their actual body — no oversized adult suit on a 5-year-old, no shrunken kids costume on a teen.',
  },
  {
    q: 'Can I try the same costume in different colours, sizes, or accessories?',
    a: 'Yes. After the first render, ask in chat: "make the cape red", "add a witch hat", "swap to plus size", "add a longer skirt". The AI re-renders without losing your face or body — perfect for figuring out the exact look before buying separates.',
  },
  {
    q: 'Will it preserve my face?',
    a: 'Yes. Eye colour, hair, skin tone, expression — all preserved exactly. The AI is putting a costume on YOU, not generating a stock model. Useful for checking if a costume actually flatters your face shape, not just the catalogue model\'s.',
  },
  {
    q: 'Is it useful for costume retailers and rental shops?',
    a: 'Hugely. Embed the widget on product pages so customers see costumes on themselves before buying or renting — typical 3-5x conversion lift on costume apparel and a sharp drop in returns (huge category for size and theme errors). Partner pricing available for costume DTC brands, party stores, and rental businesses.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop. First try-on is free, no account required.',
  },
];

export default function CostumeTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <Link href="/try-on?category=costume" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-orange-500 transition-colors">Try Now Free</Link>
        </div>
      </nav>

      {/* Triptych transformation — visible right after the nav so the visual hook lands above the fold. */}
      <TriptychDemo slug="virtual-costume-try-on" labels={TRIPTYCH_LABELS.en} />

      {/* Contextual B2B partner CTA — converts shop-owner traffic immediately after the visual demo. */}
      <PartnerCtaBlock category="virtual-costume-try-on" lang="en" />

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Costumes AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Costume<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Halloween, parties, cosplay, carnival, kids costumes — see how it looks on <strong className="text-slate-900 font-semibold">YOUR real body</strong> before you click buy. No more hoping the &quot;sexy witch&quot; on the model translates to your shape.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=costume" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-500 transition-colors">
              <Sparkles size={16} />Try Costumes Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved before Halloween</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>
      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="costume" lang="en" productLabel="Costume" />

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-orange-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">The model isn&apos;t you. The party is.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Ghost, title: 'Their actual body', body: 'Your real height, build, and proportions. The vampire cape hangs the way it would on YOU, not on a 6-foot catalogue model in studio lighting.' },
              { icon: Wand2, title: 'Halloween & party planning', body: 'See the look weeks before the event so you have time to adjust accessories, swap sizes, or add wig and makeup ideas — no panic at 6pm October 31.' },
              { icon: Camera, title: 'Photoshoot ready', body: 'Plan the costume, the pose, the group theme. Share previews with friends to nail couples or group looks before everyone commits to a $60 outfit.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-orange-50 flex items-center justify-center mb-5"><Icon size={18} className="text-orange-600" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-orange-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → costume → done.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Front or 3/4 angle, full body if possible. Phone snap works — no studio lighting needed.' },
            { n: '02', title: 'Drop the costume', body: 'Any costume photo — Spirit Halloween listing, Etsy seller, Pinterest mood-board, Amazon thumbnail, cosplay reference.' },
            { n: '03', title: '30-second render', body: 'AI fits the costume to your real body, preserving face, hair, and skin tone.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-orange-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every costume before it ships.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Halloween classics', 'Witch, vampire, zombie, ghost, devil, scarecrow, mummy, skeleton'],
              ['Kids costumes', 'Pumpkin, dinosaur, princess, superhero, ninja, animal onesies'],
              ['Cosplay & anime', 'Naruto, Sailor Moon, Genshin, Marvel, Star Wars, Demon Slayer, video-game armour'],
              ['Theme parties', '80s neon, disco, white party, James Bond, Great Gatsby, toga, Hawaii'],
              ['Carnival & festivals', 'Venice masks, Rio plumes, Cádiz comparsas, Mardi Gras, Notting Hill'],
              ['Couples & groups', 'Bonnie & Clyde, Mario & Luigi, Toy Story squad, Spice Girls, Avengers'],
              ['Sexy & glam', 'Sexy nurse, vampire queen, dark angel, cowgirl, pin-up, plus-size flattering fits'],
              ['Last-minute DIY', 'Banana suit, hot dog, ghost sheet, pun costumes, group memes'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-orange-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything before October 31.</h2>
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

      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Cute on the catalogue.<br /><span className="italic text-orange-500">Iconic on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any costume. 30 seconds. The look you&apos;d actually buy.</p>
          <Link href="/try-on?category=costume" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-500 transition-colors">
            <Sparkles size={16} />Try Costumes Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Topical link block — links to all other product try-on landings */}
      <InternalLandingLinks currentSlug="virtual-costume-try-on" lang="en" />

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
