import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Shield,
  Zap,
  Terminal,
  Check,
  Lock,
} from 'lucide-react';

const FAQS = [
  {
    q: 'How do I get an API key?',
    a: 'Sign up on the Agalaz Partners page with Google, register your domain (or your test domain) and you receive an API key starting with agz_live_. Your key is scoped to the domain you registered, so it cannot be used from other origins.',
  },
  {
    q: 'What does the request body look like?',
    a: 'Send a JSON POST to /api/v1/tryon with at minimum userImage (base64). To apply a product, send clothingImage (base64) or garmentUrl (public HTTPS URL). Optional fields: currentSize, previewSize for fit modeling.',
  },
  {
    q: 'How long does a render take?',
    a: 'Average 10 seconds end-to-end. The endpoint has a 120-second timeout — even cold-start renders complete within the response window.',
  },
  {
    q: 'What are the image size limits?',
    a: 'Maximum 10 MB per image (base64-encoded). Minimum recommended resolution is 500×500 pixels — anything smaller is rejected with a 400 because the AI cannot reliably generate a believable result from low-resolution input.',
  },
  {
    q: 'Can I call it from the browser?',
    a: 'Yes. The endpoint sets CORS headers and handles OPTIONS preflight. Your API key is domain-scoped, so even if it leaks in browser code it can only be used from the domains you registered. For higher-security setups, proxy the call through your own backend.',
  },
  {
    q: 'Do you store the photos I send?',
    a: 'No. Both userImage and clothingImage are processed in memory and discarded immediately after the response is returned. Zero data retention. The only thing we log is the partner_id, request timestamp and credit deduction — never the image content.',
  },
  {
    q: 'How is rate limiting handled?',
    a: 'Each API key has a monthly render quota tied to your subscription plan (50 on the trial, 200 on Starter, 1,000 on Growth). When you hit the quota the endpoint returns 402 Payment Required with the renewal date. Upgrade or wait for the next billing cycle.',
  },
  {
    q: 'Is there an SDK?',
    a: 'Not yet — the API is intentionally tiny (one endpoint, one auth header, JSON in/out) so a thin SDK adds little value over fetch/requests. Most integrations are 20 lines of code in the host language. If you would like a published SDK in your stack, email infoagalaz@gmail.com and tell us which language.',
  },
];

const CURL_EXAMPLE = `curl https://agalaz.com/api/v1/tryon \\
  -X POST \\
  -H "Authorization: Bearer agz_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userImage": "<base64-encoded user photo>",
    "garmentUrl": "https://yourstore.com/img/red-dress.jpg"
  }'`;

const JS_EXAMPLE = `// Browser or Node 18+
const userImage = await fileToBase64(file); // your helper

const res = await fetch("https://agalaz.com/api/v1/tryon", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.AGALAZ_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userImage,
    garmentUrl: "https://yourstore.com/img/red-dress.jpg",
  }),
});

const data = await res.json();
// data.image is a data:image/png;base64,... string`;

const PYTHON_EXAMPLE = `import base64, requests

with open("user.jpg", "rb") as f:
    user_image = base64.b64encode(f.read()).decode()

r = requests.post(
    "https://agalaz.com/api/v1/tryon",
    headers={
        "Authorization": f"Bearer {AGALAZ_KEY}",
        "Content-Type": "application/json",
    },
    json={
        "userImage": user_image,
        "garmentUrl": "https://yourstore.com/img/red-dress.jpg",
    },
    timeout=120,
)

result = r.json()
# result["image"] is a data URL with the rendered try-on`;

export default function DevelopersPage() {
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
            Get API key
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
            <Terminal size={12} />
            For developers
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            Virtual Try-On API
            <br />
            <span className="italic font-normal text-indigo-500">one endpoint, ~10s renders.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            POST a user photo and a garment, get back a photorealistic AI try-on. Bearer-key auth,
            CORS-ready, domain-scoped keys. Build it into your store, marketplace, mobile app or POS.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/partners"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
            >
              <Sparkles size={14} />
              Get API key (free 7-day trial)
              <ArrowRight size={14} />
            </Link>
            <Link
              href="#quickstart"
              className="inline-flex items-center gap-3 px-8 py-4 border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-[0.2em] hover:border-slate-400 transition-colors"
            >
              See the code
            </Link>
          </div>
          <p className="text-[11px] text-slate-400 mt-6 font-light">
            50 calls included · No credit card · Cancel anytime
          </p>
        </div>
      </section>

      {/* Why API */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          Use the API when the widget <span className="italic text-indigo-500">isn&apos;t enough.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <Code2 size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-black text-base mb-2">Custom checkout flows</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Show the try-on inside your own modal, mini-cart or PDP variant — no iframe, no widget UI to
              skin. You own the markup.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <Terminal size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-black text-base mb-2">Native mobile apps</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Call the same endpoint from iOS, Android or React Native. JSON in, JSON out. The widget
              version is browser-only — the API is for everywhere else.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <Lock size={20} className="text-amber-600" />
            </div>
            <h3 className="font-black text-base mb-2">Marketplaces and B2B</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Per-seller API keys via your own dashboard. Front the API behind your authenticated routes —
              your sellers never see the Agalaz key.
            </p>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section id="quickstart" className="bg-slate-50 border-y border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
            Quick start in <span className="italic text-indigo-500">3 steps</span>
          </h2>

          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="font-black text-xl">Get an API key</h3>
              </div>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-3 ml-14">
                Sign up at{' '}
                <Link href="/partners" className="text-indigo-600 underline">
                  /partners
                </Link>
                . Register the domain you will call the API from. The dashboard shows your key —
                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-[11px] font-mono">
                  agz_live_...
                </code>
                — copy it once and store it as a server-side env var.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="font-black text-xl">Make your first call</h3>
              </div>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-4 ml-14">
                cURL (works from any shell):
              </p>
              <pre className="bg-slate-900 text-emerald-300 text-xs p-5 rounded-lg overflow-x-auto font-mono ml-14">
{CURL_EXAMPLE}
              </pre>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="font-black text-xl">Render the result</h3>
              </div>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-3 ml-14">
                The response body is JSON:{' '}
                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-[11px] font-mono">
                  {`{ image: "data:image/png;base64,..." }`}
                </code>
                . Drop the data URL into an{' '}
                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-[11px] font-mono">{'<img>'}</code>{' '}
                src or an Image component and you&apos;re done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoint reference */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-center">
          Endpoint reference
        </h2>
        <p className="text-sm text-slate-400 text-center font-light mb-12">
          One endpoint. One auth header. JSON in, JSON out.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded">
              POST
            </span>
            <code className="font-mono text-sm text-slate-900 font-bold">/api/v1/tryon</code>
          </div>
          <p className="text-xs text-slate-500 font-light mt-2">
            Generates a photorealistic try-on image of the user wearing the supplied garment.
          </p>
        </div>

        <h3 className="font-black text-lg mb-4">Headers</h3>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Header</th>
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="font-light">
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs">Authorization</td>
                <td className="py-3 pr-4 text-slate-600 text-xs">
                  Bearer agz_live_… (required)
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">Content-Type</td>
                <td className="py-3 pr-4 text-slate-600 text-xs">application/json</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-black text-lg mb-4">Body parameters</h3>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Field</th>
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Type</th>
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Required</th>
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="font-light">
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs">userImage</td>
                <td className="py-3 pr-4 text-xs">string</td>
                <td className="py-3 pr-4 text-xs">Yes</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Base64-encoded photo of the customer. Min ~500×500 px, max 10 MB.
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs">garmentUrl</td>
                <td className="py-3 pr-4 text-xs">string</td>
                <td className="py-3 pr-4 text-xs">One of</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Public HTTPS URL of the product image. Agalaz fetches it server-side.
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs">clothingImage</td>
                <td className="py-3 pr-4 text-xs">string</td>
                <td className="py-3 pr-4 text-xs">One of</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Base64-encoded product image (alternative to garmentUrl).
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs">currentSize</td>
                <td className="py-3 pr-4 text-xs">string</td>
                <td className="py-3 pr-4 text-xs">No</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Customer&apos;s usual size (XS / S / M / L / XL …) for fit modeling.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">previewSize</td>
                <td className="py-3 pr-4 text-xs">string</td>
                <td className="py-3 pr-4 text-xs">No</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Size to preview (overrides currentSize) — show the same garment one size up/down.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-black text-lg mb-4">JavaScript example</h3>
        <pre className="bg-slate-900 text-emerald-300 text-xs p-5 rounded-lg overflow-x-auto font-mono mb-10">
{JS_EXAMPLE}
        </pre>

        <h3 className="font-black text-lg mb-4">Python example</h3>
        <pre className="bg-slate-900 text-emerald-300 text-xs p-5 rounded-lg overflow-x-auto font-mono mb-10">
{PYTHON_EXAMPLE}
        </pre>

        <h3 className="font-black text-lg mb-4">Status codes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Code</th>
                <th className="py-2 pr-4 text-xs font-black text-slate-700 uppercase tracking-wider">Meaning</th>
              </tr>
            </thead>
            <tbody className="font-light">
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs text-emerald-700 font-bold">200</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Render OK. Response body: <code className="px-1 py-0.5 bg-slate-100 rounded font-mono">{'{ image: "data:image/png;base64,..." }'}</code>
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs text-amber-700 font-bold">400</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Bad request — missing userImage, image too small (under 500×500), or image too large (over 10 MB).
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs text-amber-700 font-bold">401</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Missing or invalid Bearer token, or call coming from a non-allowlisted domain.
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs text-rose-700 font-bold">402</td>
                <td className="py-3 pr-4 text-xs text-slate-600">Quota exhausted for the current billing period.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs text-rose-700 font-bold">5xx</td>
                <td className="py-3 pr-4 text-xs text-slate-600">
                  Upstream model failure or timeout (rare). Retry with exponential backoff.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Pricing per render
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Same plan covers both the API and the widget. Switch between integration styles without
            paying twice.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-black text-xl mb-2">Free trial</h3>
              <p className="text-3xl font-black mb-1">€0</p>
              <p className="text-xs text-slate-400 font-light mb-4">7 days · 50 calls</p>
            </div>
            <div className="bg-indigo-600 border border-indigo-400 rounded-2xl p-6 ring-2 ring-indigo-300">
              <h3 className="font-black text-xl mb-2">Starter</h3>
              <p className="text-3xl font-black mb-1">€150<span className="text-sm font-light">/mo</span></p>
              <p className="text-xs text-indigo-100 font-light mb-4">200 calls / month</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-black text-xl mb-2">Growth</h3>
              <p className="text-3xl font-black mb-1">€499<span className="text-sm font-light">/mo</span></p>
              <p className="text-xs text-slate-400 font-light mb-4">1,000 calls / month</p>
            </div>
          </div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 mt-12 px-8 py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-100 transition-colors"
          >
            <Code2 size={14} />
            Sign up and get my key
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-12 text-center">
          Developer FAQ
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

      {/* Final CTA */}
      <section className="bg-indigo-50">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Ready to build with the Agalaz API?
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-10">
            Grab a key, paste 20 lines of code, ship try-on into your product before lunch.
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
          >
            <Sparkles size={14} />
            Get my API key
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <span className="font-serif text-sm font-black tracking-[0.15em] text-slate-700">AGALAZ</span>
          <nav className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <Link href="/try-on" className="hover:text-slate-700 transition-colors">Try-on demo</Link>
            <Link href="/shopify" className="hover:text-slate-700 transition-colors">Shopify</Link>
            <Link href="/woocommerce" className="hover:text-slate-700 transition-colors">WooCommerce</Link>
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
