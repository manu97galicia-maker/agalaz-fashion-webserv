'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Shield, Zap, Globe, Code2 } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 150,
    setup: 250,
    renders: 200,
    extra: '0,75',
    features: ['200 renders/mes', 'Widget personalizable', 'Soporte por email', 'Dashboard de uso'],
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 499,
    setup: 499,
    renders: 1000,
    extra: '0,50',
    features: ['1.000 renders/mes', 'Widget personalizable', 'Soporte prioritario', 'Dashboard + analytics', 'Dominios ilimitados', 'Onboarding call'],
    popular: true,
  },
];

export default function PartnersPage() {
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [formData, setFormData] = useState({ email: '', store_name: '', store_url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/partners/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan: selectedPlan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        setResult(data);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  }

  async function handleCheckout() {
    if (!result) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/partners/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: result.partner.plan,
          partnerId: result.partner.id,
          email: formData.email,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to start checkout');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setIsCheckingOut(false);
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl tracking-[0.15em] text-slate-900 font-black">
            AGALAZ
          </a>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
            Partners
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {!result ? (
          <>
            {/* Hero */}
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                <Sparkles size={14} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  Virtual Try-On API
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Add AI Try-On to<br />
                <span className="italic text-slate-400">your store</span>
              </h1>
              <p className="text-slate-500 text-sm font-light max-w-md mx-auto">
                Let your customers try on clothes virtually. 2 lines of code. Works on any platform.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: <Code2 size={20} />, title: '2 Lines of Code', desc: 'Paste our script + a div. That\'s it. Shopify, WooCommerce, or custom.' },
                { icon: <Shield size={20} />, title: 'Secure by Default', desc: 'Domain allowlisting, hashed API keys, rate limits. Zero data retention.' },
                { icon: <Zap size={20} />, title: '~10s Results', desc: 'AI generates photorealistic try-on images. Reduce returns, boost conversion.' },
              ].map((f, i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-3">
                  <div className="text-indigo-600">{f.icon}</div>
                  <h3 className="font-black text-slate-900 text-sm">{f.title}</h3>
                  <p className="text-slate-400 text-xs font-light">{f.desc}</p>
                </div>
              ))}
            </div>

            {!showForm ? (
              <>
                {/* Pricing cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedPlan === plan.id
                          ? 'border-indigo-600 shadow-lg shadow-indigo-100'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                          Popular
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                          <div className="flex items-baseline gap-1 mt-2">
                            <span className="font-serif text-4xl font-black text-slate-900">{plan.price}</span>
                            <span className="text-slate-400 text-sm font-bold">&euro;/mes</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">
                            + {plan.setup}&euro; setup fee (one-time)
                          </p>
                          <p className="text-[10px] text-slate-300 mt-0.5">
                            Extra: {plan.extra}&euro;/render adicional
                          </p>
                        </div>

                        <ul className="space-y-2">
                          {plan.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                              <Check size={14} className="text-emerald-500 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className={`w-full py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all ${
                          selectedPlan === plan.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {selectedPlan === plan.id ? 'Selected' : 'Select'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors inline-flex items-center gap-2"
                  >
                    Continue with {PLANS.find(p => p.id === selectedPlan)?.name}
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-[10px] text-slate-300 mt-3 font-bold">
                    10 free trial renders included. No credit card required.
                  </p>
                </div>
              </>
            ) : (
              /* Registration Form */
              <div className="max-w-md mx-auto">
                <div className="border border-slate-200 rounded-2xl p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                        {PLANS.find(p => p.id === selectedPlan)?.name} — {PLANS.find(p => p.id === selectedPlan)?.price}&euro;/mes
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-black text-slate-900">Create your account</h2>
                    <p className="text-slate-400 text-xs font-light">10 free trial renders included. We&apos;ll contact you for billing setup.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
                        placeholder="you@store.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Name</label>
                      <input
                        type="text"
                        required
                        value={formData.store_name}
                        onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                        className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
                        placeholder="My Fashion Store"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store URL</label>
                      <input
                        type="text"
                        required
                        value={formData.store_url}
                        onChange={(e) => setFormData({ ...formData, store_url: e.target.value })}
                        className="w-full mt-1.5 px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
                        placeholder="https://mystore.com"
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-600">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Creating...' : 'Get API Key'}
                      <ArrowRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-full text-center text-[10px] font-bold text-slate-300 hover:text-slate-500 transition-colors"
                    >
                      Back to plans
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Success — Show API key and integration instructions */
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900">You&apos;re in!</h1>
              <p className="text-slate-400 text-sm font-light">
                Your partner account for <span className="font-bold text-slate-600">{result.partner.store_name}</span> is ready.
              </p>
            </div>

            {/* API Key — shown once */}
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-amber-600" />
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                  Your API Key — save it now
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg text-sm font-mono text-slate-900 border border-amber-200 break-all">
                  {result.api_key}
                </code>
                <button
                  onClick={() => copyToClipboard(result.api_key, 'key')}
                  className="p-3 bg-white border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors shrink-0"
                >
                  {copied === 'key' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} className="text-amber-600" />}
                </button>
              </div>
              <p className="text-[11px] text-amber-600 font-bold">
                This key is shown only once. If you lose it, you&apos;ll need to create a new one.
              </p>
            </div>

            {/* Integration instructions */}
            <div className="space-y-4">
              <h2 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Globe size={16} className="text-indigo-600" />
                Integration (2 steps)
              </h2>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Step 1 — Paste in {'<head>'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.integration.script_tag, 'script')}
                      className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                    >
                      {copied === 'script' ? <Check size={12} /> : <Copy size={12} />}
                      {copied === 'script' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                    {result.integration.script_tag}
                  </code>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Step 2 — Place on product page
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.integration.with_garment, 'div')}
                      className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1"
                    >
                      {copied === 'div' ? <Check size={12} /> : <Copy size={12} />}
                      {copied === 'div' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <code className="block text-xs font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 break-all">
                    {result.integration.with_garment}
                  </code>
                  <p className="text-[10px] text-slate-400">
                    Replace <code className="text-indigo-600">YOUR_PRODUCT_IMAGE_URL</code> with the product image URL.
                    In Shopify: <code className="text-indigo-600">{'{{ product.featured_image | img_url }}'}</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Plan activation */}
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                    {result.partner.plan === 'growth' ? 'Growth' : 'Starter'} Plan
                  </span>
                  <p className="text-sm font-bold text-indigo-900 mt-1">
                    10 free trial renders included
                  </p>
                </div>
                <Zap size={24} className="text-indigo-300" />
              </div>
              <div className="h-px bg-indigo-200" />
              <div>
                <p className="text-xs text-indigo-700 font-light mb-3">
                  Activate your plan to unlock {result.partner.plan === 'growth' ? '1,000' : '200'} renders/month + automatic monthly recharge.
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCheckingOut ? 'Redirecting to payment...' : `Activate — ${result.partner.plan === 'growth' ? '€499' : '€150'}/mo + setup fee`}
                  <ArrowRight size={14} />
                </button>
                <p className="text-[10px] text-indigo-400 mt-2 text-center">
                  You can test with 10 free renders first. Activate when ready.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
