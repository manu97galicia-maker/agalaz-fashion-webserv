import Link from 'next/link';
import TriptychDemo from '@/components/TriptychDemo';
import { Sparkles, Check, ArrowLeft, Heart, Camera, Shield, Clock, Star, Eye } from 'lucide-react';

const FAQ = [
  {
    q: 'كيف يعمل التجربة الافتراضية للحجاب والعباءة؟',
    a: 'حمّلي صورة واضحة لوجهك وكتفيك، وصورة للحجاب أو العباءة أو النقاب أو البرقع الذي تريدين تجربته. الذكاء الاصطناعي يضع القطعة على وجهك خلال 30 ثانية — مع الحفاظ على ملامحك ولون بشرتك والإضاءة الأصلية — لترين بالضبط كيف يبدو اللون والتصميم على وجهك قبل الشراء.',
  },
  {
    q: 'ما الذي يمكنني تجربته من الأزياء المحتشمة؟',
    a: 'الحجاب (شيفون، جيرسيه، ساتان، رياضي، فوري)، الطرحات، الخمار، العباءة، الجلباب، النقاب، البرقع، فساتين الصلاة، الفساتين المحتشمة، البوركيني، القفطان. من أي علامة تجارية: مودانيسا، Aab، Haute Hijab، إيناية، أو متجر محلي — أي صورة منتج واضحة تعمل.',
  },
  {
    q: 'هل ستحافظ على ملامحي ولون بشرتي؟',
    a: 'نعم. الذكاء الاصطناعي يحترم شكل وجهك وملامحك ولون بشرتك ولون عينيك. الصورة الناتجة تظهر القطعة عليكِ أنتِ — وليس على عارضة أزياء جاهزة. مفيدة جدًا لاختيار الألوان التي تليق بك تحديدًا.',
  },
  {
    q: 'هل يمكنني رؤية نفس الحجاب بألوان وأقمشة مختلفة؟',
    a: 'نعم. بعد الصورة الأولى، اطلبي من الذكاء الاصطناعي عبر المحادثة: "أريني هذا باللون الوردي"، "حوّليه إلى شيفون"، "اربطيه بطريقة التربان". يُعاد التصميم دون فقدان وجهك أو وضعيتك.',
  },
  {
    q: 'هل يحترم الذكاء الاصطناعي الخصوصية والتحفظ؟',
    a: 'نعم تمامًا. لا نُعدّل وجهك أبدًا، ولا نُغيّر جسمك، ولا نولّد شخصًا مختلفًا. أنتِ ترفعين الصورة، وأنتِ تقرّرين ما يُعرض، وتستطيعين الحذف متى شئتِ. الصور تُعالَج لحظيًا ولا تُخزَّن أبدًا على خوادمنا.',
  },
  {
    q: 'كم سعر الخدمة؟',
    a: 'أول تجربتين مجانيتان، بدون بطاقة ائتمانية. بعدها: باقة Starter بـ 4.99 دولار (10 صور بـ 0.50 دولار للصورة) أو Style Pro بـ 9.99 دولار (25 صورة بـ 0.40 دولار للصورة، توفير 20%). دفعة واحدة فقط، بدون اشتراك.',
  },
  {
    q: 'هل تحتاج تطبيقًا للتنزيل؟',
    a: 'لا. تعمل في أي متصفح على الجوّال أو الكمبيوتر. التجربة الأولى مجانية بدون حساب.',
  },
];

const TRIPTYCH_LABELS_AR = {
  title: 'شاهدي كيف يعمل',
  subtitle: 'مثال حقيقي: نفس الشخص، قبل وبعد.',
  before: 'صورتك',
  item: 'القطعة',
  after: 'النتيجة',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-[family-name:var(--font-cairo)]">
      {/* Nav first — brand + primary CTA above the fold. */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>Agalaz</Link>
          <div className="flex items-center gap-4">
            <Link href="/virtual-veil-try-on" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">English</Link>
            <Link
              href="/try-on?category=clothing"
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-700 transition-colors"
            >
              جرّبي الآن
            </Link>
          </div>
        </div>
      </nav>

      {/* Triptych transformation — the visual hook right after the brand bar. */}
      <TriptychDemo slug="virtual-veil-try-on" labels={TRIPTYCH_LABELS_AR} />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-800 text-[11px] font-bold rounded-full mb-6">
            الأزياء المحتشمة بالذكاء الاصطناعي
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            تجربة افتراضية
            <br />
            <span className="italic text-slate-400">للحجاب والعباءة.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            الحجاب، العباءة، النقاب، البرقع، الفساتين المحتشمة — شاهدي كيف يبدو أي قطعة على{' '}
            <strong className="text-slate-900 font-bold">وجهك الحقيقي</strong> قبل الشراء. لا تطلبي 3 ألوان للتأكد فقط.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/try-on?category=clothing"
              className="inline-flex flex-row-reverse items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-sm hover:bg-rose-700 transition-colors"
            >
              <ArrowLeft size={14} />
              جرّبي حجابًا مجانًا
              <Sparkles size={16} />
            </Link>
            <span className="text-slate-400 text-xs font-bold">بدون تنزيل · بدون بطاقة · 30 ثانية</span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300">
          <div className="flex items-center gap-2"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">يحبها متسوّقات الأزياء المحتشمة</span></div>
          <div className="flex items-center gap-2"><Shield size={14} /><span className="text-xs font-bold">صورك لا تُحفظ أبدًا</span></div>
          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-xs font-bold">تجربة في 30 ثانية</span></div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold text-rose-700">لماذا التجربة المسبقة؟</span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
              العارضات في الصور تكذب. وجهك لا يكذب.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'لون بشرتك الحقيقي', body: 'لون البشرة والإضاءة يحدّان كل شيء — الحجاب الذي يلمع على عارضة قد يبدو باهتًا عليكِ. شاهديه على وجهك قبل القرار.' },
              { icon: Heart, title: 'العيد، رمضان، الأعراس', body: 'خطّطي للعباءة أو القفطان أو فستان الصلاة قبل المناسبة — لا بعد وصول الطلب متأخرًا.' },
              { icon: Camera, title: 'جلسات تصوير', body: 'شاهدي كيف ستظهرين في الصورة العائلية، الخطوبة، الحناء، التخرّج — بإطلالة محتشمة تحبّينها.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100">
                <div className="w-10 h-10 bg-rose-50 flex items-center justify-center mb-5"><Icon size={18} className="text-rose-700" /></div>
                <h3 className="font-serif text-xl font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-rose-700">3 خطوات</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            صورتك ← الحجاب ← عليكِ.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'حمّلي صورتك', body: 'الوجه والكتفان بإضاءة جيدة. صورة جوّال تكفي — لا حاجة لاستوديو.' },
            { n: '02', title: 'أضيفي صورة الحجاب أو العباءة', body: 'أي صورة منتج — مودانيسا، Aab، Etsy، Pinterest، أو لقطة من إنستغرام.' },
            { n: '03', title: 'النتيجة في 30 ثانية', body: 'الذكاء الاصطناعي يضع القطعة على وجهك مع الحفاظ على ملامحك ولون بشرتك والإضاءة.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="font-serif italic text-5xl text-rose-200 font-black mb-4">{n}</div>
              <h3 className="font-serif text-lg font-bold text-slate-900 tracking-tight mb-3">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">كل قطعة محتشمة قبل الشحن.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['الحجاب (شيفون، جيرسيه، ساتان)', 'مربع، فوري، رياضي، مغناطيسي، تحتي'],
              ['العباءات والجلابيب', 'مفتوحة، فراشة، كيمونو، مطرّزة، مطعّمة'],
              ['النقاب والبرقع', 'تغطية كاملة أو نصفية، نقاب فراشة، ربط خلفي'],
              ['ملابس الصلاة', 'قطعة واحدة، قطعتان، تيلكونغ، مكنة'],
              ['العيد والأعراس', 'قفاطين، فساتين مطعّمة، ملابس الحناء'],
              ['ملابس السباحة المحتشمة', 'بوركيني، قطع كاملة، تونيك مع ليغنغ'],
              ['ملابس العمل المحتشمة', 'بليزر محتشم، تنانير طويلة، قمصان'],
              ['البوتيك والعمل اليدوي', 'قطع Etsy المخصّصة، علامات محتشمة مستقلة'],
            ].map(([title, body], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" /></div>
                <div>
                  <span className="text-white font-bold text-sm">{title}</span>
                  <span className="text-white/60 font-light text-sm"> — {body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-rose-700">أسئلة متكرّرة</span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-3">
            كل ما تسأل عنه متسوّقات الأزياء المحتشمة.
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <details key={i} className="group bg-slate-50 border border-slate-100 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-slate-100 transition-colors list-none">
                <span className="font-serif text-base font-bold text-slate-900 tracking-tight">{item.q}</span>
                <span className="text-slate-400 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-5 pb-5 text-slate-500 text-sm font-light leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-rose-50 py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-6">
            جميل في الصورة.
            <br />
            <span className="italic text-rose-600">أجمل عليكِ أنتِ.</span>
          </h2>
          <p className="text-slate-500 text-base font-light mb-10 max-w-md mx-auto">
            صورة. حجاب. 30 ثانية. اللون والقماش الذي يليقان بكِ فعلاً.
          </p>
          <Link
            href="/try-on?category=clothing"
            className="inline-flex flex-row-reverse items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold text-sm hover:bg-rose-700 transition-colors"
          >
            <ArrowLeft size={14} />
            جرّبي حجابًا مجانًا
            <Sparkles size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/virtual-veil-try-on" className="hover:text-slate-600 transition-colors font-light">English</Link>
            <Link href="/" className="hover:text-slate-600 transition-colors font-light">الرئيسية</Link>
            <Link href="/try-on" className="hover:text-slate-600 transition-colors font-light">جرّبي الآن</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors font-light">الخصوصية</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
