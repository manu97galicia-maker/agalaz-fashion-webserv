'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Globe, Shield, Zap, Copy, Check, Store, Smartphone } from 'lucide-react';
import { useState } from 'react';

const PLATFORMS = ['Shopify', 'WooCommerce', 'Custom HTML'] as const;

export default function PartnersDocsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [platform, setPlatform] = useState<typeof PLATFORMS[number]>('Shopify');

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  const CopyBtn = ({ text, label }: { text: string; label: string }) => (
    <button
      onClick={() => copy(text, label)}
      className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1 shrink-0"
    >
      {copied === label ? <Check size={12} /> : <Copy size={12} />}
      {copied === label ? 'Copied' : 'Copy'}
    </button>
  );

  const scriptTag = '<script src="https://agalaz.com/widget.js" data-api-key="YOUR_API_KEY"></script>';

  const platformInstructions = {
    'Shopify': {
      step1: `1. Go to Online Store → Themes → Edit code
2. Open layout/theme.liquid
3. Find the </head> tag
4. Paste the script BEFORE </head>:`,
      step2: `1. Open sections/main-product.liquid (or your product template)
2. Find where you want the "Try it on" button
3. Paste this where you want the button:`,
      divCode: `<div id="agalaz-tryon" data-garment="{{ product.featured_image | img_url: 'large' }}"></div>`,
      note: 'Shopify automatically fills {{ product.featured_image }} with the product image URL. No manual work needed per product.',
    },
    'WooCommerce': {
      step1: `1. Go to Appearance → Theme File Editor
2. Open header.php
3. Find the </head> tag
4. Paste the script BEFORE </head>:`,
      step2: `1. Open your theme's single-product template (usually content-single-product.php)
2. Add this where you want the button (usually after the Add to Cart button):`,
      divCode: `<div id="agalaz-tryon" data-garment="<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>"></div>`,
      note: 'WooCommerce\'s PHP function automatically pulls the product\'s featured image. Works on all products.',
    },
    'Custom HTML': {
      step1: `1. Open your HTML template or layout file
2. Find the </head> tag
3. Paste the script BEFORE </head>:`,
      step2: `1. Go to your product page template
2. Add this where you want the "Try it on" button:`,
      divCode: '<div id="agalaz-tryon" data-garment="https://yourstore.com/images/product.jpg"></div>',
      note: 'Replace the data-garment URL with your actual product image URL. Use your CMS template variables if available.',
    },
  };

  const current = platformInstructions[platform];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/partners" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={18} className="text-slate-400" />
            </Link>
            <a href="/" className="font-serif text-xl tracking-[0.15em] text-slate-900 font-black">
              AGALAZ
            </a>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
            Installation Guide
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16 space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Installation Guide
          </h1>
          <p className="text-slate-500 text-base font-light max-w-2xl">
            Add Agalaz Virtual Try-On to your store in under 5 minutes. No coding experience needed. Works on Shopify, WooCommerce, and any custom website.
          </p>
        </div>

        {/* Prerequisites */}
        <div className="mb-16 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-3">
          <h2 className="font-black text-indigo-900 text-sm flex items-center gap-2">
            <Shield size={16} className="text-indigo-600" />
            Before you start
          </h2>
          <ol className="space-y-2 text-sm text-indigo-800 font-light">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
              <span>Register at <Link href="/partners" className="font-bold text-indigo-600 underline">agalaz.com/partners</Link> to get your API key</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
              <span>Save your API key somewhere safe — it&apos;s only shown once</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
              <span>Have access to your store&apos;s theme editor or HTML files</span>
            </li>
          </ol>
        </div>

        {/* Platform selector */}
        <div className="mb-8">
          <h2 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2">
            <Store size={18} className="text-indigo-600" />
            Choose your platform
          </h2>
          <div className="flex gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  platform === p
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Step-by-step */}
        <div className="space-y-8 mb-16">
          {/* Step 1: Script */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black">1</span>
                <h3 className="font-black text-slate-900 text-sm">Add the Agalaz script</h3>
              </div>
              <Code2 size={18} className="text-slate-400" />
            </div>
            <div className="p-6 space-y-4">
              <pre className="text-xs text-slate-600 font-mono whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-lg">
                {current.step1}
              </pre>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Script tag</span>
                <CopyBtn text={scriptTag} label="script" />
              </div>
              <code className="block text-xs font-mono text-slate-900 bg-slate-50 p-4 rounded-lg border border-slate-200 break-all">
                {scriptTag}
              </code>
              <p className="text-[11px] text-amber-600 font-bold">
                Replace YOUR_API_KEY with your actual API key from the registration step.
              </p>
            </div>
          </div>

          {/* Step 2: Button div */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black">2</span>
                <h3 className="font-black text-slate-900 text-sm">Place the try-on button</h3>
              </div>
              <Smartphone size={18} className="text-slate-400" />
            </div>
            <div className="p-6 space-y-4">
              <pre className="text-xs text-slate-600 font-mono whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-lg">
                {current.step2}
              </pre>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{platform} code</span>
                <CopyBtn text={current.divCode} label="div" />
              </div>
              <code className="block text-xs font-mono text-slate-900 bg-slate-50 p-4 rounded-lg border border-slate-200 break-all">
                {current.divCode}
              </code>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-[11px] text-emerald-700 font-bold">
                  {current.note}
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Done */}
          <div className="border border-emerald-200 rounded-2xl overflow-hidden bg-emerald-50">
            <div className="px-6 py-4 flex items-center justify-between border-b border-emerald-200">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-black">3</span>
                <h3 className="font-black text-emerald-900 text-sm">That&apos;s it — you&apos;re live!</h3>
              </div>
              <Zap size={18} className="text-emerald-400" />
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm text-emerald-800 font-light">
                Visit your product page. You should see a <strong>&quot;Try it on with AI&quot;</strong> button. Click it to test the virtual try-on experience.
              </p>
              <p className="text-sm text-emerald-800 font-light">
                Your customers can now upload their photo, try on the product, and see how it looks on them — all without leaving your store.
              </p>
            </div>
          </div>
        </div>

        {/* How it works for the end user */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-black text-slate-900 tracking-tight mb-6">
            What your customers see
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Clicks the button', desc: '"Try it on with AI" appears on the product page, next to Add to Cart.' },
              { num: '2', title: 'Uploads 2 photos', desc: 'A selfie (face) and a full-body photo. Takes 30 seconds.' },
              { num: '3', title: 'AI generates the result', desc: 'In ~10 seconds, they see themselves wearing the product.' },
              { num: '4', title: 'Buys with confidence', desc: 'They know exactly how it looks on them. Fewer returns for you.' },
            ].map((step, i) => (
              <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black">{step.num}</span>
                <h4 className="font-black text-slate-900 text-xs">{step.title}</h4>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="mb-16 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h2 className="font-black text-slate-900 text-sm flex items-center gap-2">
            <Shield size={16} className="text-indigo-600" />
            Security & Privacy
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Zero data retention', desc: 'Customer photos are processed in real-time and never stored on our servers. No databases, no logs, no traces.' },
              { title: 'Domain allowlisting', desc: 'Your API key only works from your registered domains. Nobody can use your key from another site.' },
              { title: 'Encrypted API keys', desc: 'We store only a SHA-256 hash of your key. Even we cannot see your full API key after creation.' },
              { title: 'GDPR compliant', desc: 'No personal data is collected or stored. Photos exist only during the ~10 second processing window.' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-black text-slate-900 tracking-tight mb-6">
            API Reference (advanced)
          </h2>
          <p className="text-sm text-slate-500 font-light mb-6">
            For developers who want to build a custom integration instead of using the widget.
          </p>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">POST /api/v1/tryon</span>
              <CopyBtn text="POST https://agalaz.com/api/v1/tryon" label="endpoint" />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headers</span>
                <pre className="mt-2 text-xs font-mono text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">{`Authorization: Bearer agz_live_YOUR_KEY
Content-Type: application/json`}</pre>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Request body</span>
                <pre className="mt-2 text-xs font-mono text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">{`{
  "faceImage": "base64_encoded_face_photo",
  "bodyImage": "base64_encoded_body_photo",
  "clothingImage": "base64_encoded_garment_photo"  // optional
}`}</pre>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response</span>
                <pre className="mt-2 text-xs font-mono text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">{`{
  "success": true,
  "image": "data:image/png;base64,...",
  "credits_remaining": 199
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-black text-slate-900 tracking-tight mb-6">
            Common Questions
          </h2>
          <div className="space-y-3">
            {[
              { q: 'Does it work on mobile?', a: 'Yes. The widget is fully responsive. Your customers can try on products from their phone, tablet, or desktop.' },
              { q: 'Does it slow down my site?', a: 'No. The widget script is under 5KB and loads asynchronously. It only activates when the user clicks the button.' },
              { q: 'Can I customize the button design?', a: 'The button inherits a clean default style. Contact us for custom branding — colors, text, and positioning can all be adjusted.' },
              { q: 'What if I run out of renders?', a: 'The button will still appear, but try-ons will show a "credits exhausted" message. Contact us to upgrade or add extra renders at €0.50-0.63 each.' },
              { q: 'Can I test before paying?', a: 'Yes! Every new partner gets 10 free trial renders. No credit card required.' },
              { q: 'Does it work with all types of clothing?', a: 'It works best with tops (shirts, jackets, sweaters, dresses). The AI replaces the upper garment while preserving pants, shoes, and the background.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <span className="text-slate-300 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-10 bg-slate-900 rounded-2xl space-y-4">
          <h2 className="font-serif text-3xl font-black text-white tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-white/50 text-sm font-light">
            10 free renders. Set up in 5 minutes. No credit card required.
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-600 hover:text-white transition-colors rounded-xl"
          >
            Get Your API Key
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
