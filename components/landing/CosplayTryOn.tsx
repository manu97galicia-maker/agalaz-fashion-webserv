'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Wand2, Camera, Shield, Clock, Star, ChevronDown, Swords } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import PartnersUpsellBlock from '@/components/landing/PartnersUpsellBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import TriptychDemo, { TRIPTYCH_LABELS } from '@/components/TriptychDemo';
import PartnerCtaBlock from '@/components/landing/PartnerCtaBlock';

const FAQ_ITEMS = [
  {
    q: 'How does the virtual cosplay try-on work?',
    a: 'Upload a clear photo of yourself and a reference image of the cosplay — Demon Slayer Tanjiro, Genshin Raiden Shogun, Witcher Geralt armour, FF7 Cloud, Spider-Verse Miles, your own original character. The AI maps wig, outfit, props and armour onto your real body in seconds, preserving your face and proportions, so you see exactly how the cosplay sits on YOU before paying for the wig, the cape and three months of foam-cutting.',
  },
  {
    q: 'What kind of cosplays can I try?',
    a: 'Anime (Demon Slayer, Jujutsu Kaisen, Naruto, One Piece, Sailor Moon, My Hero Academia, Genshin), video games (Final Fantasy, League of Legends, Zelda, Cyberpunk, Honkai), comics and Marvel/DC (Spider-Verse, Loki, Wanda, Wonder Woman), Star Wars, original characters, gender-bend / crossplay versions, idol stage outfits, casual closet-cosplay, even fursuits and mascot suits — any clear reference image works.',
  },
  {
    q: 'Does it work for elaborate cosplays with wigs, props and armour?',
    a: 'Yes — that is exactly what it is built for. Long pastel wigs, oversized swords, mecha shoulder pieces, glowing eyes, demon horns, kimono layering, intricate embroidery on a Genshin skirt — all preserved from the reference. The AI handles cosplay-specific complexity that generic try-on tools collapse into a flat T-shirt.',
  },
  {
    q: 'Can I see different colour variants or armour versions of the same cosplay?',
    a: 'Yes. After the first render, ask in chat: "switch the wig to silver", "show the demon-form variant", "give me the armoured version with the cape", "swap to the swimsuit alt skin", "make it the dark Mode 2 colourway". The AI re-renders without losing your face or body — perfect for choosing between variants before committing $200 to one wig.',
  },
  {
    q: 'Will it preserve my face?',
    a: 'Yes. Eye colour, face shape, skin tone, expression — all preserved exactly. The AI is putting the cosplay on YOU, not generating a stock con-girl. Useful for checking whether a character actually suits your face before you invest in contacts, wig and three months of crafting.',
  },
  {
    q: 'Is it useful for cosplay sellers, costume makers and convention vendors?',
    a: 'Hugely. Embed the widget on cosplay-shop product pages so customers see the full kimono / armour set / wig combo on themselves before buying — typical 3-5x conversion lift on cosplay apparel and a sharp drop in sizing returns. Particularly strong for Etsy cosplay sellers, Taobao reseller stores, wig shops, and convention-floor pre-orders. Partner pricing available.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Works in any browser on phone or desktop, including con Wi-Fi at Comic-Con, MCM, Japan Expo, Lucca Comics or FACTS Belgium. First try-on is free, no account required.',
  },
];

export default function CosplayTryOn() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <Link href="/try-on?category=cosplay" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-fuchsia-500 transition-colors">Try Now Free</Link>
        </div>
      </nav>

      {/* Triptych transformation — visible right after the nav so the visual hook lands above the fold. */}
      <TriptychDemo slug="virtual-cosplay-try-on" labels={TRIPTYCH_LABELS.en} />

      {/* Interactive try-on demo with watermarked free render */}
      <TryOnDemoBlock category="cosplay" lang="en" productLabel="Cosplay outfit" />


      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-fuchsia-50 text-fuchsia-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Cosplay AI</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[0.95] mb-6">Virtual Cosplay<br /><span className="italic text-slate-400">Try-On.</span></h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Anime characters, game cosplay, Marvel armour, original characters — see how a full cosplay looks on <strong className="text-slate-900 font-semibold">YOUR real body</strong> before spending $200 on a wig, cape and EVA-foam armour. Comic-Con, MCM, Japan Expo, Lucca Comics — show up with the look you actually wanted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/try-on?category=cosplay" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-fuchsia-500 transition-colors">
              <Sparkles size={16} />Try Cosplay Free<ArrowRight size={14} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">No download · No card · 30 seconds</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">Loved by con-goers</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">Photos never shared</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">30-second render</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-fuchsia-700 uppercase tracking-[0.2em]">Why try first</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">A wig, a cape and $200. Don&apos;t guess.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Swords, title: 'Anime-accurate, on you', body: 'See whether the silver Genshin wig actually suits your face, or whether the Tanjiro haori crops your shoulders weirdly. Anime art doesn\'t translate the same on every body — find out before commission.' },
              { icon: Wand2, title: 'Convention-ready', body: 'Plan the full look weeks before Comic-Con, MCM, Japan Expo, Lucca Comics or FACTS — wig length, armour fit, prop scale, group poses. No 4 a.m. panic the night before Day 1.' },
              { icon: Camera, title: 'Before $200 on a wig', body: 'Ahegao wig from Arda. Custom EVA-foam pauldrons. Contact lenses. Boot-covers. The bill stacks fast — render the look first, then buy with conviction.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-fuchsia-50 flex items-center justify-center mb-5"><Icon size={18} className="text-fuchsia-600" /></div>
                <h3 className="font-serif text-xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-fuchsia-700 uppercase tracking-[0.2em]">3 steps</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Photo → reference → render.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Upload your photo', body: 'Front or 3/4 angle, full body if possible. Phone snap works — no studio lighting needed.' },
            { n: '02', title: 'Drop the cosplay reference', body: 'Anime screenshot, official character art, fan art, Etsy listing of the cosplay kit, Taobao thumbnail, your OC mood-board.' },
            { n: '03', title: '30-second render', body: 'AI fits wig, outfit, armour and props onto your real body, preserving face, hair line and skin tone.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-fuchsia-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-black text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14"><h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">Every character before convention day.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Anime cosplay', 'Demon Slayer, Jujutsu Kaisen, Naruto, One Piece, Sailor Moon, My Hero Academia, Chainsaw Man'],
              ['Game cosplay', 'Genshin Impact, Honkai Star Rail, Final Fantasy, Zelda, League of Legends, Cyberpunk, Witcher'],
              ['Comic-Con & Marvel/DC', 'Spider-Verse, Loki, Wanda, Wonder Woman, X-Men, Suicide Squad, Joker, Harley'],
              ['Original characters', 'Your DnD bard, Honkai OC, Genshin OC, fursona reference, indie webcomic build'],
              ['Group & couple cosplay', 'Akatsuki line-up, Straw Hats squad, Powerpuff trio, Stranger Things gang, Genshin team'],
              ['Kids cosplay', 'Mini Spider-Man, Elsa, Pokémon trainers, Mando + Grogu, mini-Goku, Sailor Moon kids'],
              ['Crossplay & gender-bend', 'Female Geralt, male Sailor Moon, gender-swap Marvel, FtM/MtF cosplay safety'],
              ['Classic vs modern', 'Classic Sailor Moon vs Crystal, original Cloud vs Remake, 80s X-Men vs MCU'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-fuchsia-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div><span className="text-white font-bold text-sm">{title}</span><span className="text-white/60 font-light text-sm"> — {body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[10px] font-black text-fuchsia-700 uppercase tracking-[0.2em]">Common questions</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">Everything before con day.</h2>
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

      <section className="bg-gradient-to-br from-fuchsia-50 via-white to-fuchsia-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">Stunning in the key art.<br /><span className="italic text-fuchsia-500">Stunning on you.</span></h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">One photo. Any character. 30 seconds. The cosplay you&apos;d actually commission.</p>
          <Link href="/try-on?category=cosplay" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-fuchsia-500 transition-colors">
            <Sparkles size={16} />Try Cosplay Free<ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Topical link block — links to all other product try-on landings */}
      <InternalLandingLinks currentSlug="virtual-cosplay-try-on" lang="en" />

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
      <PartnerCtaBlock category="virtual-cosplay-try-on" lang="en" />
      <PartnersUpsellBlock lang="en" />
    </main>
  );
}
