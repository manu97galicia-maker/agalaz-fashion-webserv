'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shirt, Palette, Ruler, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const STEP_ICONS = [Shirt, Palette, Ruler];
const STEP_EMOJIS = ['👗', '🎨', '📏'];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const step = t.onboarding.steps[index];
  const Icon = STEP_ICONS[index];
  const isLast = index === 2;

  const handleAnswer = () => {
    setAnswered(true);
    setTimeout(() => {
      if (isLast) {
        router.push('/paywall');
      } else {
        setAnswered(false);
        setIndex((i) => i + 1);
      }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-10">
        {/* Progress dots */}
        <div className="flex gap-2 justify-center">
          {STEP_ICONS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-10 bg-indigo-600' : i < index ? 'w-6 bg-indigo-300' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div key={index} className="animate-fade-in text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center">
              <Icon size={36} className="text-indigo-600" />
            </div>
          </div>

          {/* Question */}
          <h1
            className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight"
          >
            {step.question}
          </h1>

          {/* Description */}
          <p className="text-slate-500 text-sm font-light max-w-xs mx-auto leading-relaxed">
            {step.desc}
          </p>

          {/* Answer button */}
          <button
            onClick={handleAnswer}
            disabled={answered}
            className={`w-full py-5 rounded-full flex items-center justify-center gap-3 transition-all cursor-pointer ${
              answered
                ? 'bg-emerald-500 scale-95'
                : 'bg-slate-900 hover:bg-indigo-600'
            }`}
          >
            {answered ? (
              <Check size={20} className="text-white" />
            ) : (
              <Sparkles size={16} className="text-white" />
            )}
            <span className="text-white font-black uppercase tracking-[0.2em] text-xs">
              {answered && isLast ? t.onboarding.letsGo : step.answer}
            </span>
          </button>
        </div>

        {/* Step counter */}
        <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          {index + 1} / 3
        </p>
      </div>
    </main>
  );
}
