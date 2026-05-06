import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Shield,
  Zap,
  TrendingDown,
  Check,
  Layers,
} from 'lucide-react';
import InternalLandingLinksAuto from '@/components/landing/InternalLandingLinksAuto';

const FAQS = [
  {
    q: 'Is Agalaz a WordPress plugin?',
    a: 'No, and that is intentional. Plugins consume WordPress resources, expand your attack surface and break on theme updates. Agalaz is a lightweight script tag plus a div — exactly the way you would install Google Analytics. No plugin to install, no plugin to maintain, no plugin to audit.',
  },
  {
    q: 'Will it work with my WooCommerce theme?',
    a: 'Yes. Agalaz auto-detects product images from the standard WooCommerce single-product template (.woocommerce-product-gallery__image). It has been tested with Storefront, Astra, Divi, OceanWP, Flatsome and most major themes. For unusual layouts you can pass the image URL explicitly with a data-garment attribute.',
  },
  {
    q: 'Does it work with page builders like Elementor or WPBakery?',
    a: 'Yes. Drop the <script> tag into your global header (Elementor → Theme Builder → Header, or via the Insert Headers and Footers plugin if you prefer) and place the <div> as an HTML widget on your product template. The script does the rest.',
  },
  {
    q: 'How fast is the rendering?',
    a: 'Average render time is around 10 seconds per try-on. The script is loaded with defer so it never blocks your WooCommerce product page from rendering — your Core Web Vitals scores are unaffected.',
  },
  {
    q: 'Do you store customer photos?',
    a: 'No. Customer photos are processed in real time and discarded immediately. Zero data retention. This keeps you GDPR-friendly without any extra configuration on your WordPress side.',
  },
  {
    q: 'How much does it cost?',
    a: 'You start with a 7-day free trial including 50 renders. After the trial it is €150/month for 200 renders (Starter) or €499/month for 1,000 renders (Growth). No setup fee. Cancel anytime from your Stripe customer portal.',
  },
  {
    q: 'Can I migrate from another virtual try-on plugin?',
    a: 'Yes — and you can leave the old plugin installed during the migration window. Agalaz is a script, not a plugin, so it does not conflict with anything in your WordPress install. Once you are happy with Agalaz you simply remove the old plugin.',
  },
];

export default function WooCommercePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg font-black tracking-[0.15em]">
            AGALAZ
          </Link>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em] hover:bg-indigo-600 transition-colors"
          >
            Start free trial
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            <Layers size={12} />
            For WooCommerce stores
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            WooCommerce Virtual Try-On
            <br />
            <span className="italic font-normal text-indigo-500">no plugin required.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            Add an AI fitting room to every WooCommerce product page with a single script — the way you would
            add Google Analytics. No WordPress plugin to install, audit or maintain. Customers preview
            clothing, glasses and jewelry on themselves before buying.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/partners"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={14} />
              Start 7-day free trial
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/try-on"
              className="inline-flex items-center gap-3 px-8 py-4 border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-[0.2em] hover:border-slate-400 transition-colors"
            >
              See a live demo
            </Link>
          </div>
          <p className="text-[11px] text-slate-400 mt-6 font-light">
            50 renders included · No setup fee · Cancel anytime
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          Why WooCommerce stores choose <span className="italic text-indigo-500">Agalaz</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <TrendingDown size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-black text-base mb-2">Fewer fashion returns</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Fit anxiety drives most fashion returns. When customers see the garment on their own body before
              they buy, return rates drop sharply.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <Zap size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-black text-base mb-2">No plugin overhead</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              WordPress plugins consume PHP cycles, expand your attack surface and break on updates. Agalaz is
              a script, not a plugin — zero ongoing maintenance.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <Shield size={20} className="text-amber-600" />
            </div>
            <h3 className="font-black text-base mb-2">GDPR-friendly by design</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Customer photos are processed in real time and never stored. Zero data retention means no extra
              GDPR paperwork on your WordPress side.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
            Built for WooCommerce, not bolted on.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                t: 'Auto-detects WooCommerce product images',
                d: 'Reads the standard .woocommerce-product-gallery__image markup from Storefront, Astra, Divi, OceanWP, Flatsome and most major themes.',
              },
              {
                t: 'No WordPress plugin to install',
                d: 'A <script> tag in your header and a <div> in your product template. That is the entire integration.',
              },
              {
                t: 'Works with every page builder',
                d: 'Elementor, WPBakery, Divi Builder, Beaver Builder, Gutenberg blocks. Drop the snippet into the global header section once, place the div anywhere.',
              },
              {
                t: 'Multi-category by design',
                d: 'Clothing, eyewear, jewelry, hats, footwear, bags, plus tattoos and nail art. The AI detects the category from the product image.',
              },
              {
                t: 'Lightning-fast renders',
                d: 'Around 10 seconds per try-on. Loaded with defer — your WooCommerce product page renders normally, the widget hydrates after.',
              },
              {
                t: 'Survives every theme update',
                d: 'Because it is a script, not a plugin, theme and WooCommerce core updates do not break the integration.',
              },
            ].map((f) => (
              <div key={f.t} className="bg-white p-6 border border-slate-100 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Check size={18} className="text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-black text-sm mb-1.5">{f.t}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{f.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          Install on WooCommerce in <span className="italic text-indigo-500">3 minutes</span>
        </h2>
        <ol className="space-y-8">
          <li className="flex gap-5">
            <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <h3 className="font-black text-base mb-2">Sign up and grab your API key</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Sign in with Google on the Agalaz Partners page and start your 7-day free trial. The dashboard
                gives you a domain-scoped API key.
              </p>
            </div>
          </li>
          <li className="flex gap-5">
            <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <h3 className="font-black text-base mb-2">Paste the script into your header</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">
                Use Appearance → Theme File Editor → header.php (or Insert Headers and Footers, or Elementor
                Theme Builder → Header). Just before {'</head>'} paste:
              </p>
              <pre className="bg-slate-900 text-emerald-300 text-xs p-4 rounded-lg overflow-x-auto font-mono">
{`<script src="https://agalaz.com/widget.js" data-api-key="YOUR_API_KEY" defer></script>`}
              </pre>
            </div>
          </li>
          <li className="flex gap-5">
            <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <h3 className="font-black text-base mb-2">Drop the div on the single-product template</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">
                In single-product.php (or as an HTML block in your page builder template) add:
              </p>
              <pre className="bg-slate-900 text-emerald-300 text-xs p-4 rounded-lg overflow-x-auto font-mono">
{`<div id="agalaz-tryon"></div>`}
              </pre>
              <p className="text-sm text-slate-500 font-light leading-relaxed mt-3">
                Save. Refresh any product page. The "Try it on with AI" button is live.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Pricing teaser */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Pricing for WooCommerce stores
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12">
            One subscription. No WooCommerce extension marketplace fees. Cancel anytime.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-black text-xl mb-2">Free trial</h3>
              <p className="text-3xl font-black mb-1">€0</p>
              <p className="text-xs text-slate-400 font-light mb-4">7 days · 50 renders</p>
            </div>
            <div className="bg-indigo-600 border border-indigo-400 rounded-2xl p-6 ring-2 ring-indigo-300">
              <h3 className="font-black text-xl mb-2">Starter</h3>
              <p className="text-3xl font-black mb-1">€150<span className="text-sm font-light">/mo</span></p>
              <p className="text-xs text-indigo-100 font-light mb-4">200 renders / month</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-black text-xl mb-2">Growth</h3>
              <p className="text-3xl font-black mb-1">€499<span className="text-sm font-light">/mo</span></p>
              <p className="text-xs text-slate-400 font-light mb-4">1,000 renders / month</p>
            </div>
          </div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 mt-12 px-8 py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-100 transition-colors"
          >
            <Code2 size={14} />
            Get my WooCommerce install snippet
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          WooCommerce try-on FAQ
        </h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                <span className="font-bold text-slate-900 text-sm pr-4">{f.q}</span>
                <span className="text-slate-400 text-xs group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-xs text-slate-500 font-light leading-relaxed">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-center">
            What WooCommerce merchants say
          </h2>
          <p className="text-sm text-slate-400 text-center font-light mb-12 max-w-2xl mx-auto">
            Quotes from early-program merchants. Attribution anonymised at their request.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                q: 'We replaced a heavy WooCommerce plugin with Agalaz\'s script tag in an afternoon. Lighthouse went up 6 points and the try-on actually works on mobile, which our previous tool didn\'t.',
                a: 'Founder, DTC menswear brand (Lisbon)',
              },
              {
                q: 'No plugin to update means no plugin to break on the next WordPress release. We\'ve done three WP core updates since installing — try-on still works.',
                a: 'CTO, vintage fashion marketplace (Berlin)',
              },
              {
                q: 'I run on Elementor and was sure I\'d need a developer. The HTML widget for the script tag took 5 minutes. The div on the product template took another 5. That was the integration.',
                a: 'Founder, accessories brand (Amsterdam)',
              },
            ].map((t, i) => (
              <figure key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <blockquote className="text-sm text-slate-700 font-light leading-relaxed mb-4">
                  &ldquo;{t.q}&rdquo;
                </blockquote>
                <figcaption className="text-xs text-slate-500 font-bold border-t border-slate-200 pt-3">
                  — {t.a}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-50">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Ready to add try-on to your WooCommerce store?
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-10">
            Start with 50 free renders. Two lines of code, three minutes of setup, no plugin to keep
            up to date.
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
          >
            <Sparkles size={14} />
            Start 7-day free trial
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <InternalLandingLinksAuto />

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <span className="font-serif text-sm font-black tracking-[0.15em] text-slate-700">AGALAZ</span>
          <nav className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <Link href="/try-on" className="hover:text-slate-700 transition-colors">Try-on demo</Link>
            <Link href="/shopify" className="hover:text-slate-700 transition-colors">Shopify</Link>
            <Link href="/developers" className="hover:text-slate-700 transition-colors">Developers</Link>
            <Link href="/partners" className="hover:text-slate-700 transition-colors">Partners</Link>
            <Link href="/blog" className="hover:text-slate-700 transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-700 transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
