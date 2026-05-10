'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, ChevronDown, Heart, Globe } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';

const TRADITIONS = [
  {
    region: 'United States · Canada · UK · Australia',
    hand: 'Left ring finger',
    explanation:
      'Western tradition: the engagement ring (and later the wedding band) goes on the fourth finger of the LEFT hand — the so-called "vena amoris", a once-believed vein running directly to the heart. Anatomically the vein doesn\'t exist, but the symbolism stuck for ~400 years.',
  },
  {
    region: 'Spain · Portugal · Brazil · Argentina · Colombia',
    hand: 'Right hand (engagement) → moves to left at wedding',
    explanation:
      'In most Iberian and Latin-American cultures the engagement ring is worn on the RIGHT ring finger during the engagement period, then ceremonially transferred to the LEFT hand on the wedding day. Often paired with a matching ring exchange between bride and groom.',
  },
  {
    region: 'Germany · Austria · Switzerland · Denmark · Norway',
    hand: 'Left hand (engagement) → moves to right at wedding',
    explanation:
      'Reverse of the Iberian tradition: the engagement ring sits on the LEFT during engagement, then is moved to the RIGHT ring finger after the wedding ceremony, where it stays as the wedding band.',
  },
  {
    region: 'Russia · Greece · India · Orthodox Christian countries',
    hand: 'Right hand throughout',
    explanation:
      'In Orthodox Christian tradition (Greek, Russian, Serbian) and across India, both engagement and wedding rings are worn on the RIGHT hand. The right hand symbolises strength, virtue and the side that swears oaths. In India a small toe ring (bichiya) is also typical for married women.',
  },
  {
    region: 'Jewish tradition (varies by community)',
    hand: 'Right index finger (ceremony) → left ring finger',
    explanation:
      'During the Jewish wedding ceremony the ring is placed on the bride\'s RIGHT INDEX finger (the "pointing" finger) so witnesses can clearly see the act. After the ceremony most brides move it to the LEFT ring finger in line with broader Western convention.',
  },
  {
    region: 'China · Japan · Korea · Vietnam · much of East Asia',
    hand: 'Left ring finger (modern adoption)',
    explanation:
      'Western convention has been adopted broadly across East Asia in modern times — engagement and wedding rings on the LEFT ring finger. Traditional Chinese symbolism additionally assigns each finger to family members: thumb=parents, index=siblings, middle=self, ring=spouse, pinky=children.',
  },
  {
    region: 'Same-sex couples',
    hand: 'Either hand — personal choice',
    explanation:
      'No prescriptive convention. Some couples follow their cultural background, others deliberately choose the less-traditional hand to mark their union as their own. The modern "no rules" approach has been embraced especially by LGBTQ+ couples.',
  },
];

const FAQ = [
  {
    q: 'What hand does the engagement ring go on?',
    a: 'In the United States, Canada, the UK and most of Western Europe the engagement ring goes on the FOURTH FINGER of the LEFT HAND — the "ring finger". This tradition dates back to the ancient Roman belief in a "vein of love" running from that finger to the heart. In Spain, Portugal, most of Latin America, Russia, Greece, India and Orthodox countries the ring is worn on the RIGHT hand instead. Same-sex couples increasingly choose freely.',
  },
  {
    q: 'Which hand is the engagement ring worn on in the United States?',
    a: 'The LEFT hand, fourth finger (ring finger). This applies to both engagement ring and wedding band. After the wedding most brides wear the engagement ring "stacked" on top of the band on the same finger.',
  },
  {
    q: 'Why is the engagement ring on the left hand?',
    a: 'The Romans believed a vein called the "vena amoris" — vein of love — ran directly from the fourth finger of the left hand to the heart. Modern anatomy has disproved this (every finger has equal vasculature), but the romantic symbolism became the dominant convention across Western Europe and the Americas in the 1500s and has been preserved.',
  },
  {
    q: 'Why do some countries wear the engagement ring on the right hand?',
    a: 'Several reasons depending on culture. Orthodox Christianity (Russia, Greece, Serbia) treats the right hand as the side of virtue and oath-taking. In Spain, Portugal and much of Latin America the right hand is the engagement hand and the ring moves to the left at the wedding ceremony. In India, the right hand is considered pure and the left is associated with non-pure tasks — making the right the preferred hand for the ring.',
  },
  {
    q: 'Does the engagement ring move to the other hand after the wedding?',
    a: 'It depends on the tradition. In the US/UK the ring stays on the left throughout — the wedding band joins it underneath. In Spain/Portugal/Latin America it MOVES from right to left at the ceremony. In Germany/Austria/Norway it MOVES from left to right at the ceremony. In Greek/Russian Orthodox it stays on the right always.',
  },
  {
    q: 'Can I just wear my engagement ring on the hand I prefer?',
    a: 'Absolutely. The conventions exist as guidance but no one is going to police your hand choice. Practical reasons people pick the non-traditional hand: dominant-hand wear damages the stone faster, work that involves frequent hand washing or gloves, sensitivity in the ring finger, or simply personal preference. Same-sex couples increasingly choose freely.',
  },
  {
    q: 'Which finger is the ring finger?',
    a: 'The FOURTH finger from the thumb (counting thumb as 1, index as 2, middle as 3, ring as 4, pinky as 5). On the left hand this is the finger between the middle finger and the pinky — the one with no specific muscle of its own that operates independently.',
  },
  {
    q: 'Can I see how an engagement ring looks on my hand before buying?',
    a: 'Yes — Agalaz lets you upload a photo of your hand and any reference engagement ring (Tiffany, Cartier, Pinterest, indie jeweller — any image), and shows you how the diamond + setting looks on YOUR finger in 30 seconds. Free first render, no card. Works for solitaires, halos, three-stone, vintage, and any cut from round to oval to emerald to pear.',
  },
];

export default function EngagementRingHand() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=jewelry"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-500 transition-colors"
          >
            Try a ring free
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Heart size={10} className="inline mr-1.5 -mt-0.5" />
            Ring on Hand · AI Try-On
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            What Hand Does an
            <br />
            <span className="italic text-slate-400">Engagement Ring Go On?</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Short answer: in the US/UK, the <strong className="text-slate-900 font-semibold">left ring finger</strong>. But the tradition varies by country, religion and personal preference. Below you&apos;ll find the convention by region — and you can try any engagement ring on YOUR own hand with AI in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Try a ring on my hand
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Free · No download · 30 sec</span>
          </div>
        </div>
      </section>

      {/* Quick-answer card — captures the featured-snippet for "what hand engagement ring" */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-rose-700 mb-3">
            Quick answer
          </div>
          <p className="text-slate-900 font-bold text-lg md:text-xl leading-relaxed mb-3">
            The engagement ring is worn on the <span className="italic">fourth finger of the left hand</span> in the United States, Canada, United Kingdom, Australia and most of Western Europe.
          </p>
          <p className="text-slate-700 text-sm md:text-base">
            In Spain, Portugal, much of Latin America, Russia, Greece and India the ring is worn on the <span className="font-bold">right hand</span> instead. Same-sex couples and modern Western brides increasingly choose freely.
          </p>
        </div>
      </section>

      {/* Live ring try-on */}
      <TryOnDemoBlock category="jewelry" lang="en" productLabel="Engagement ring" />

      {/* By-tradition section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <Globe size={28} className="text-rose-500 mx-auto mb-3" />
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            By tradition
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Which hand around the world
          </h2>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {TRADITIONS.map((t, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 hover:border-rose-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base md:text-lg font-black text-slate-900 leading-tight">
                    {t.region}
                  </h3>
                  <div className="text-[11px] font-black uppercase tracking-widest text-rose-600 mt-1">
                    Hand: <span className="text-rose-700">{t.hand}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed pl-12">
                {t.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ring style + finger sizing — bonus utility content */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 bg-slate-50/40 border-y border-slate-100">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Trying before buying — what to check on YOUR hand
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto">
            Photos in jewellery stores look nothing like the real thing on your finger. The AI try-on lets you check the things that actually matter:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            { title: 'Carat size on YOUR finger length', body: 'A 1.5ct solitaire looks dainty on a long thin finger and dramatic on a short petite one. Try it before committing $5K-$15K.' },
            { title: 'Shape vs your hand vibe', body: 'Oval and pear elongate short fingers. Round brilliant works with everything. Emerald/asscher on slim fingers can look elegant or starvy depending on your hand. See it.' },
            { title: 'Setting height', body: 'High prong settings catch on hair and gloves. Bezel and halo settings sit lower. Your lifestyle matters and the height shows in photos.' },
            { title: 'Metal against your skin tone', body: 'Yellow gold flatters warm skin tones, white gold/platinum flatters cool tones, rose gold works with both. The render shows it accurately.' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <Check size={18} className="text-rose-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA repeat */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Heart size={32} className="text-rose-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Try the ring on your own hand
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Upload a photo of your hand and any engagement ring you&apos;re considering. AI shows you the ring on YOUR fingers in 30 seconds. Free first render, no signup.
        </p>
        <Link
          href="/try-on?category=jewelry"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Try a ring on my hand
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          Frequently asked
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

      <InternalLandingLinks lang="en" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/virtual-jewelry-try-on" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Jewelry try-on</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export const FAQ_DATA = FAQ;
