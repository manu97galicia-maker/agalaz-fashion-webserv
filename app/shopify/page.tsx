import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Shield,
  Zap,
  TrendingDown,
  Check,
  ShoppingBag,
} from 'lucide-react';
import InternalLandingLinksAuto from '@/components/landing/InternalLandingLinksAuto';

const FAQS = [
  {
    q: 'Does this work with my Shopify theme?',
    a: 'Yes. Agalaz works with every Shopify theme including Dawn, Debut, Sense, Refresh, Studio and any custom theme. Both Online Store 2.0 and legacy 1.0 themes are supported. The widget auto-detects the product image from the standard Shopify product page markup, so no theme-specific configuration is needed.',
  },
  {
    q: 'Do I need to install a Shopify app from the App Store?',
    a: 'No. Agalaz is not a Shopify app — it is a lightweight script you paste into your theme. This means no app permissions to approve, no app fees on top of your subscription, and no app removal headaches if you ever switch off the widget. You install it the same way you install Google Analytics: a script tag and a div.',
  },
  {
    q: 'How does the AI know which product to try on?',
    a: 'On Shopify product pages, Agalaz auto-detects the main product image from the standard Liquid markup (img.product__media, img.product-single__photo, etc.). For collection pages or custom layouts you can pass the image URL explicitly with a data-garment attribute on the div.',
  },
  {
    q: 'How fast is the rendering on Shopify product pages?',
    a: 'Average render time is around 10 seconds per try-on. The widget loads asynchronously so it never blocks the product page itself — your Lighthouse and Core Web Vitals scores stay intact.',
  },
  {
    q: "Do you store my customers' photos?",
    a: 'No. Customer photos are processed in real time and discarded immediately. We have a zero data retention policy on customer-uploaded images. Your shoppers can use the try-on without any privacy concern.',
  },
  {
    q: 'How much does it cost?',
    a: 'You start with a 7-day free trial (50 renders included, no setup fee). After the trial the Starter plan is €150/month for 200 renders, or Growth at €499/month for 1,000 renders. You can cancel anytime from your Stripe customer portal.',
  },
  {
    q: 'Will the widget slow down my Shopify store?',
    a: 'No. The script is loaded with the defer attribute and only activates when a customer clicks "Try it on with AI". The product page itself is unaffected and your Lighthouse scores stay the same.',
  },
];

export default function ShopifyPage() {
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
            <ShoppingBag size={12} />
            For Shopify merchants
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            Shopify Virtual Try-On
            <br />
            <span className="italic font-normal text-indigo-500">in 2 lines of code.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            Add an AI fitting room to every product page on your Shopify store. Customers preview clothing,
            glasses, jewelry and accessories on themselves before buying. Higher conversion, fewer returns,
            zero plugin installs.
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
          Why Shopify stores choose <span className="italic text-indigo-500">Agalaz</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <TrendingDown size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-black text-base mb-2">Fewer fashion returns</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              The #1 reason shoppers return clothing online is fit anxiety. When customers see the garment on
              their own body before buying, return rates drop sharply.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <Zap size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-black text-base mb-2">Higher product-page conversion</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Try-on engagement keeps visitors on the product page longer and replaces the doubt of "will this
              look right on me?" with a concrete preview. Conversion lifts on every category.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <Shield size={20} className="text-amber-600" />
            </div>
            <h3 className="font-black text-base mb-2">Privacy-first by default</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Customer photos are processed in real time and never stored. Domain allowlisting per API key
              prevents anyone else from using your widget on another store.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
            Built for Shopify, not bolted on.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                t: 'Auto-detects product images',
                d: 'Recognises every standard Shopify product gallery markup (Dawn, Debut, Sense, Refresh, Studio and most third-party themes). No theme edits beyond the script tag.',
              },
              {
                t: 'Two-line install',
                d: 'Paste a <script> tag in theme.liquid (just before </head>) and a <div id="agalaz-tryon"></div> in product.liquid. Done.',
              },
              {
                t: 'Works on Online Store 2.0 and legacy themes',
                d: 'Same script tag, both major Shopify theme generations. No theme-specific build steps.',
              },
              {
                t: 'Multi-category by design',
                d: 'Clothing, eyewear, jewelry, hats, footwear, bags, plus tattoos and nail art. The AI auto-detects the category from the product image.',
              },
              {
                t: 'Lightning-fast renders',
                d: 'Around 10 seconds per try-on. The script defers, so your Lighthouse and Core Web Vitals scores stay where they are.',
              },
              {
                t: 'No app to approve',
                d: 'Agalaz is a script, not a Shopify App Store app. Zero app permissions, zero app fees on top of your subscription, zero migration risk if you switch themes.',
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
          Install on Shopify in <span className="italic text-indigo-500">3 minutes</span>
        </h2>
        <ol className="space-y-8">
          <li className="flex gap-5">
            <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <h3 className="font-black text-base mb-2">Sign up and grab your API key</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">
                Sign in with Google on the Agalaz Partners page and start your 7-day free trial. You get a
                domain-scoped API key you copy from the dashboard.
              </p>
            </div>
          </li>
          <li className="flex gap-5">
            <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <h3 className="font-black text-base mb-2">Paste the script in theme.liquid</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">
                Open Online Store → Themes → Edit code → theme.liquid. Just before {'</head>'}, paste:
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
              <h3 className="font-black text-base mb-2">Drop the div into product.liquid</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">
                In your product template (or a section visible on every product page), add:
              </p>
              <pre className="bg-slate-900 text-emerald-300 text-xs p-4 rounded-lg overflow-x-auto font-mono">
{`<div id="agalaz-tryon"></div>`}
              </pre>
              <p className="text-sm text-slate-500 font-light leading-relaxed mt-3">
                Save. Refresh a product page. The "Try it on with AI" button is live.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Pricing teaser */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Pricing for Shopify merchants
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12">
            One subscription. No per-render Shopify App Store fees on top. Cancel anytime.
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
            Get my Shopify install snippet
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          Shopify try-on FAQ
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
            What Shopify merchants say
          </h2>
          <p className="text-sm text-slate-400 text-center font-light mb-12 max-w-2xl mx-auto">
            Quotes from early-program merchants. Attribution anonymised at their request.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                q: 'Setup was actually 2 lines of code. I was sceptical — every vendor says "easy install" — but with Agalaz the script tag IS the install. Lighthouse score didn\'t change.',
                a: 'Founder, sustainable fashion DTC (Madrid)',
              },
              {
                q: 'We replaced a Shopify App that was eating into our app fees with Agalaz\'s script. Same try-on quality, no marketplace fee on top of the subscription, and one less app permission flow to maintain.',
                a: 'E-commerce manager, mid-market womenswear (Lisbon)',
              },
              {
                q: 'Returns on our top 20 dresses dropped from 38% to 27% in two months. The size chart was already solid; the try-on closed the remaining doubt at the buy button.',
                a: 'Head of growth, occasionwear brand (Barcelona)',
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
            Ready to add try-on to your Shopify store?
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-10">
            Start with 50 free renders. Two lines of code, three minutes of setup, one less reason for your
            customers to return their order.
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
            <Link href="/woocommerce" className="hover:text-slate-700 transition-colors">WooCommerce</Link>
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
