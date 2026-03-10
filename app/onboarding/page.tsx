'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles, ArrowRight, Shirt, Palette, Zap, Crown, Heart,
  Sun, Star, Camera, Eye, Ruler, RotateCcw, ShoppingCart,
  Smartphone, Scan, Image, Wand2, CheckCircle, Store, Mail,
  ChevronDown,
} from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';

interface QuestionOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  type: 'single' | 'multi';
  options: QuestionOption[];
}

const useQuestions = (): Question[] => {
  const { lang } = useLang();
  const en = lang === 'en';

  return [
    {
      id: 1,
      title: en ? 'Ever bought something that didn\'t fit?' : '¿Alguna vez compraste algo que no te quedaba?',
      subtitle: en ? 'We\'ve all been there' : 'A todos nos ha pasado',
      type: 'single',
      options: [
        { id: 'always', label: en ? 'All the time — I hate returns' : 'Siempre — odio las devoluciones', icon: <RotateCcw size={24} />, gradient: 'from-red-500 to-orange-600' },
        { id: 'sometimes', label: en ? 'Sometimes — colors look different IRL' : 'A veces — los colores se ven distinto IRL', icon: <Palette size={24} />, gradient: 'from-amber-500 to-orange-600' },
        { id: 'size', label: en ? 'Yes — sizes are never right online' : 'Sí — las tallas nunca aciertan online', icon: <Ruler size={24} />, gradient: 'from-indigo-500 to-violet-600' },
        { id: 'rarely', label: en ? 'Rarely — but I want to be sure' : 'Poco — pero quiero estar seguro/a', icon: <CheckCircle size={24} />, gradient: 'from-emerald-500 to-teal-600' },
      ],
    },
    {
      id: 2,
      title: en ? 'What would you preview with AI?' : '¿Qué previsualizarías con IA?',
      subtitle: en ? 'Pick your main use case' : 'Elige tu caso de uso principal',
      type: 'single',
      options: [
        { id: 'color', label: en ? 'Check if a color suits me' : 'Ver si un color me queda bien', icon: <Palette size={24} />, gradient: 'from-violet-500 to-fuchsia-600' },
        { id: 'fit', label: en ? 'See how a garment fits my body' : 'Ver cómo me queda una prenda', icon: <Scan size={24} />, gradient: 'from-indigo-500 to-blue-600' },
        { id: 'compare', label: en ? 'Compare outfits before buying' : 'Comparar outfits antes de comprar', icon: <Image size={24} />, gradient: 'from-emerald-500 to-teal-600' },
        { id: 'style', label: en ? 'Try new styles risk-free' : 'Probar estilos nuevos sin riesgo', icon: <Wand2 size={24} />, gradient: 'from-amber-500 to-orange-600' },
      ],
    },
    {
      id: 3,
      title: en ? 'How it works' : 'Cómo funciona',
      subtitle: en ? '3 photos → 1 AI render in seconds' : '3 fotos → 1 render IA en segundos',
      type: 'single',
      options: [
        { id: 'face', label: en ? '1. Snap your face' : '1. Foto de tu cara', icon: <Camera size={24} />, gradient: 'from-pink-500 to-rose-600' },
        { id: 'body', label: en ? '2. Full body photo' : '2. Foto de cuerpo entero', icon: <Smartphone size={24} />, gradient: 'from-indigo-500 to-violet-600' },
        { id: 'garment', label: en ? '3. Pick a garment' : '3. Elige una prenda', icon: <Shirt size={24} />, gradient: 'from-emerald-500 to-teal-600' },
        { id: 'render', label: en ? '→ See it on you instantly' : '→ Míralo en ti al instante', icon: <Zap size={24} />, gradient: 'from-amber-500 to-yellow-600' },
      ],
    },
    {
      id: 4,
      title: en ? 'Where do you usually shop?' : '¿Dónde sueles comprar?',
      subtitle: en ? 'Preview works with any brand' : 'La vista previa funciona con cualquier marca',
      type: 'multi',
      options: [
        { id: 'zara', label: 'Zara / H&M / Mango', icon: <ShoppingCart size={24} />, gradient: 'from-slate-500 to-slate-700' },
        { id: 'nike', label: 'Nike / Adidas / Puma', icon: <Zap size={24} />, gradient: 'from-blue-500 to-indigo-600' },
        { id: 'luxury', label: en ? 'Gucci / LV / Balenciaga' : 'Gucci / LV / Balenciaga', icon: <Crown size={24} />, gradient: 'from-amber-500 to-yellow-600' },
        { id: 'online', label: 'SHEIN / ASOS / Amazon', icon: <Smartphone size={24} />, gradient: 'from-violet-500 to-purple-600' },
        { id: 'thrift', label: en ? 'Thrift / Vintage' : 'Segunda mano / Vintage', icon: <Heart size={24} />, gradient: 'from-emerald-500 to-teal-600' },
      ],
    },
    {
      id: 5,
      title: en ? 'What garments will you try on?' : '¿Qué prendas vas a probar?',
      subtitle: en ? 'Select all that apply' : 'Selecciona todas las que apliquen',
      type: 'multi',
      options: [
        { id: 'tshirts', label: en ? 'T-shirts & Tops' : 'Camisetas y Tops', icon: <Shirt size={24} />, gradient: 'from-indigo-500 to-violet-600' },
        { id: 'jackets', label: en ? 'Jackets & Coats' : 'Chaquetas y Abrigos', icon: <Shirt size={24} />, gradient: 'from-slate-500 to-slate-700' },
        { id: 'hoodies', label: 'Hoodies / Sweaters', icon: <Shirt size={24} />, gradient: 'from-blue-500 to-cyan-600' },
        { id: 'shirts', label: en ? 'Dress Shirts' : 'Camisas', icon: <Shirt size={24} />, gradient: 'from-emerald-500 to-green-600' },
        { id: 'sportswear', label: en ? 'Sportswear / Jerseys' : 'Ropa deportiva', icon: <Zap size={24} />, gradient: 'from-orange-500 to-red-600' },
      ],
    },
    {
      id: 6,
      title: en ? 'What matters most to you?' : '¿Qué es lo que más te importa?',
      subtitle: en ? 'When previewing an outfit' : 'Al previsualizar un outfit',
      type: 'single',
      options: [
        { id: 'color_match', label: en ? 'Does this color match my skin?' : '¿Este color combina con mi piel?', icon: <Eye size={24} />, gradient: 'from-pink-500 to-rose-600' },
        { id: 'fit_shape', label: en ? 'Does this fit my body shape?' : '¿Me queda bien con mi cuerpo?', icon: <Ruler size={24} />, gradient: 'from-indigo-500 to-violet-600' },
        { id: 'overall_look', label: en ? 'How does the full outfit look?' : '¿Cómo se ve el outfit completo?', icon: <Star size={24} />, gradient: 'from-amber-500 to-yellow-600' },
        { id: 'before_buy', label: en ? 'Will I regret buying this?' : '¿Me arrepentiré de comprarlo?', icon: <ShoppingCart size={24} />, gradient: 'from-emerald-500 to-teal-600' },
      ],
    },
    {
      id: 7,
      title: en ? 'AI preserves your real body' : 'La IA preserva tu cuerpo real',
      subtitle: en ? 'No filters, no distortion — just the garment changes' : 'Sin filtros, sin distorsión — solo cambia la prenda',
      type: 'single',
      options: [
        { id: 'love', label: en ? 'Love it — I want to see the real me' : 'Me encanta — quiero verme de verdad', icon: <Heart size={24} />, gradient: 'from-pink-500 to-rose-600' },
        { id: 'important', label: en ? 'That\'s exactly what I need' : 'Eso es exactamente lo que necesito', icon: <CheckCircle size={24} />, gradient: 'from-indigo-500 to-violet-600' },
        { id: 'curious', label: en ? 'Sounds impressive — show me' : 'Suena impresionante — muéstramelo', icon: <Sparkles size={24} />, gradient: 'from-amber-500 to-yellow-600' },
        { id: 'skeptical', label: en ? 'I\'ll believe it when I see it' : 'Lo creeré cuando lo vea', icon: <Eye size={24} />, gradient: 'from-slate-500 to-slate-600' },
      ],
    },
    {
      id: 8,
      title: en ? 'How many returns do you make?' : '¿Cuántas devoluciones haces?',
      subtitle: en ? 'Agalaz users reduce returns by 80%' : 'Los usuarios de Agalaz reducen devoluciones un 80%',
      type: 'single',
      options: [
        { id: 'many', label: en ? '3+ per month — it\'s exhausting' : '3+ al mes — es agotador', icon: <RotateCcw size={24} />, gradient: 'from-red-500 to-orange-600' },
        { id: 'some', label: en ? '1-2 per month' : '1-2 al mes', icon: <RotateCcw size={24} />, gradient: 'from-amber-500 to-orange-600' },
        { id: 'few', label: en ? 'Occasionally' : 'De vez en cuando', icon: <RotateCcw size={24} />, gradient: 'from-blue-500 to-indigo-600' },
        { id: 'avoid', label: en ? 'I avoid online shopping because of it' : 'Evito comprar online por eso', icon: <ShoppingCart size={24} />, gradient: 'from-violet-500 to-purple-600' },
      ],
    },
    {
      id: 9,
      title: en ? 'Ready to try it on?' : '¿Listo/a para probártelo?',
      subtitle: en ? 'Your first 10 renders are free' : 'Tus primeros 10 renders son gratis',
      type: 'single',
      options: [
        { id: 'ready', label: en ? 'Yes! Let\'s go' : '¡Sí! Vamos', icon: <Zap size={24} />, gradient: 'from-indigo-500 to-violet-600' },
        { id: 'excited', label: en ? 'I already have a garment in mind' : 'Ya tengo una prenda en mente', icon: <Shirt size={24} />, gradient: 'from-emerald-500 to-teal-600' },
        { id: 'explore', label: en ? 'I want to explore first' : 'Quiero explorar primero', icon: <Sun size={24} />, gradient: 'from-amber-500 to-yellow-600' },
        { id: 'curious', label: en ? 'Show me what AI can do' : 'Muéstrame lo que puede hacer la IA', icon: <Sparkles size={24} />, gradient: 'from-pink-500 to-rose-600' },
      ],
    },
    {
      id: 10,
      title: '',
      subtitle: '',
      type: 'single',
      options: [],
    },
  ];
};

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();
  const { lang } = useLang();
  const en = lang === 'en';
  const questions = useQuestions();
  const question = questions[step];
  const totalSteps = questions.length;
  const progress = ((step + 1) / (totalSteps - 1)) * 100;

  const handleSelect = (optionId: string) => {
    if (isAnimating) return;

    const current = answers[question.id] || [];

    if (question.type === 'multi') {
      if (current.includes(optionId)) {
        setAnswers({ ...answers, [question.id]: current.filter(id => id !== optionId) });
      } else if (current.length < 3) {
        setAnswers({ ...answers, [question.id]: [...current, optionId] });
      }
    } else {
      setAnswers({ ...answers, [question.id]: [optionId] });
      setTimeout(() => goNext(), 350);
    }
  };

  const goNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (step < totalSteps - 2) {
      setTimeout(() => {
        setStep(s => s + 1);
        setIsAnimating(false);
      }, 250);
    } else {
      setTimeout(() => {
        setStep(totalSteps - 1);
        setShowSummary(true);
        setIsAnimating(false);
      }, 250);
    }
  };

  const goBack = () => {
    if (step > 0 && !isAnimating) {
      setIsAnimating(true);
      setShowSummary(false);
      setTimeout(() => {
        setStep(s => s - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const isSelected = (optionId: string) => (answers[question.id] || []).includes(optionId);
  const hasAnswer = (answers[question.id] || []).length > 0;

  // ──── SUMMARY SCREEN (Step 10) ────
  if (showSummary) {
    return (
      <main className="min-h-screen bg-black flex flex-col relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 animate-fade-in-up">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl scale-150 animate-pulse-soft" />
            <div className="relative w-28 h-28 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-float">
              <Sparkles size={48} className="text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-white text-center tracking-tight leading-tight">
            {en ? 'Preview Before' : 'Previsualiza Antes'}
            <br />
            <span className="text-gradient italic">{en ? 'You Buy.' : 'de Comprar.'}</span>
          </h1>

          <p className="text-white/35 text-center mt-4 max-w-xs text-[15px] leading-relaxed">
            {en
              ? 'See how any garment looks on your real body. No more wrong sizes, no more surprise colors.'
              : 'Ve cómo te queda cualquier prenda en tu cuerpo real. Sin tallas equivocadas, sin colores sorpresa.'}
          </p>

        </div>

        {/* B2B Section */}
        <div className="px-6 mb-6 max-w-sm mx-auto w-full relative z-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <div className="glass rounded-3xl p-5 border border-indigo-500/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shrink-0">
                <Store size={20} className="text-white" />
              </div>
              <h3 className="text-sm font-black text-white tracking-tight leading-tight">
                {en ? 'Own an online store?' : '¿Tienes una tienda online?'}
              </h3>
            </div>
            <p className="text-[12px] text-white/35 font-medium leading-relaxed mb-4">
              {en
                ? 'We help brands reduce returns by up to 80% with AI virtual try-on. Get a detailed quote for your store.'
                : 'Ayudamos a marcas a reducir devoluciones hasta un 80% con prueba virtual IA. Solicita un presupuesto detallado.'}
            </p>
            <a
              href="mailto:infoagalaz@gmail.com?subject=Agalaz%20for%20Business"
              className="w-full py-3 glass rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors press-scale"
            >
              <Mail size={14} className="text-indigo-400" />
              <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">
                {en ? 'Contact Us' : 'Contáctanos'}
              </span>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-6 mb-8 max-w-sm mx-auto w-full relative z-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
          <h3 className="text-sm font-black text-white tracking-tight mb-4 text-center">
            {en ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </h3>
          <div className="space-y-2">
            {(en ? [
              { q: 'How does the virtual try-on work?', a: 'Upload a photo of your face, a full-body photo, and optionally a garment image. Our AI maps your identity onto your body while preserving your real features, background, and lower clothing.' },
              { q: 'Is my data safe?', a: 'Yes. We don\'t store your photos on our servers. Images are processed in real-time and discarded after rendering. Your privacy is our priority.' },
              { q: 'How many free renders do I get?', a: 'You get 1 free render to try the technology. Pro subscribers get 7 credits per week that reset automatically.' },
              { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. Go to your profile and tap "Manage Subscription" to cancel, change plans, or update your payment method. No questions asked.' },
              { q: 'What kind of clothes can I try on?', a: 'T-shirts, hoodies, jackets, dress shirts, sportswear, and more. The AI works best with upper-body garments and preserves your pants, shoes, and background.' },
              { q: 'How do referral credits work?', a: 'Share your unique referral link from your profile. When a friend subscribes, you earn bonus credits — 3 for weekly plans, 20 for yearly plans.' },
            ] : [
              { q: '¿Cómo funciona la prueba virtual?', a: 'Sube una foto de tu cara, una de cuerpo entero y opcionalmente una prenda. Nuestra IA mapea tu identidad sobre tu cuerpo real preservando tus rasgos, fondo y ropa inferior.' },
              { q: '¿Mis datos están seguros?', a: 'Sí. No almacenamos tus fotos en nuestros servidores. Las imágenes se procesan en tiempo real y se descartan después del render. Tu privacidad es nuestra prioridad.' },
              { q: '¿Cuántos renders gratuitos tengo?', a: 'Tienes 1 render gratuito para probar la tecnología. Los suscriptores Pro obtienen 7 créditos por semana que se recargan automáticamente.' },
              { q: '¿Puedo cancelar mi suscripción en cualquier momento?', a: 'Por supuesto. Ve a tu perfil y toca "Gestionar suscripción" para cancelar, cambiar de plan o actualizar tu método de pago. Sin preguntas.' },
              { q: '¿Qué tipo de ropa puedo probar?', a: 'Camisetas, hoodies, chaquetas, camisas, ropa deportiva y más. La IA funciona mejor con prendas de la parte superior y preserva pantalones, zapatos y fondo.' },
              { q: '¿Cómo funcionan los créditos de referido?', a: 'Comparte tu link único desde tu perfil. Cuando un amigo se suscribe, ganas créditos extra — 3 por plan semanal, 20 por plan anual.' },
            ]).map((faq, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full glass rounded-2xl p-4 text-left transition-all press-scale"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-bold text-white/70 flex-1">{faq.q}</span>
                  <ChevronDown
                    size={14}
                    className={`text-white/30 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </div>
                {openFaq === i && (
                  <p className="text-[11px] text-white/30 font-medium leading-relaxed mt-3 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-10 max-w-sm mx-auto w-full relative z-10">
          <button
            onClick={() => router.push('/paywall')}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl flex items-center justify-center gap-3 press-scale shadow-xl shadow-indigo-500/25 animate-glow"
          >
            <Zap size={18} className="fill-white" />
            <span className="font-black uppercase tracking-widest text-xs">
              {en ? 'Continue' : 'Continuar'}
            </span>
          </button>
        </div>
      </main>
    );
  }

  // ──── QUESTION SCREENS (1–9) ────
  return (
    <main className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        {step > 0 ? (
          <button onClick={goBack} className="text-white/40 text-lg font-bold press-scale p-1">
            ←
          </button>
        ) : (
          <LanguageToggle />
        )}
        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
          {step + 1} / {totalSteps - 1}
        </span>
        <button
          onClick={() => router.push('/paywall')}
          className="text-white/20 text-[11px] font-bold tracking-widest uppercase hover:text-white/40 transition-colors press-scale"
        >
          {en ? 'Skip' : 'Saltar'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-6">
        <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 flex flex-col">
        <div key={step} className={`flex-1 flex flex-col ${isAnimating ? 'opacity-0 transition-opacity duration-200' : 'animate-fade-in-up'}`}>
          <div className="mb-7">
            <h1 className="text-[1.7rem] font-black text-white tracking-tight leading-tight">
              {question.title}
            </h1>
            <p className="text-white/30 text-sm font-medium mt-2">{question.subtitle}</p>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto hide-scrollbar pb-4">
            {question.options.map((option, i) => {
              const selected = isSelected(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 press-scale opacity-0 animate-fade-in ${
                    selected
                      ? 'bg-gradient-to-r ' + option.gradient + ' shadow-lg ring-1 ring-white/20'
                      : 'glass hover:bg-white/[0.06]'
                  }`}
                  style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'forwards' }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    selected ? 'bg-white/20' : 'bg-gradient-to-br ' + option.gradient
                  }`}>
                    <div className="text-white">{option.icon}</div>
                  </div>
                  <span className={`text-[15px] font-bold text-left flex-1 ${
                    selected ? 'text-white' : 'text-white/60'
                  }`}>
                    {option.label}
                  </span>
                  {selected && (
                    <div className="w-6 h-6 bg-white/25 rounded-full flex items-center justify-center animate-fade-in-scale">
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue (multi-select only) */}
        {question.type === 'multi' && (
          <div className="py-5">
            <button
              onClick={goNext}
              disabled={!hasAnswer}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all press-scale ${
                hasAnswer
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/20'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <span className={`font-black uppercase tracking-widest text-xs ${hasAnswer ? 'text-white' : 'text-white/20'}`}>
                {en ? 'Continue' : 'Continuar'}
              </span>
              <ArrowRight size={16} className={hasAnswer ? 'text-white' : 'text-white/20'} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
