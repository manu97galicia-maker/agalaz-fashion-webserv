'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const KNOWLEDGE_ES = `
Eres el asistente virtual de Agalaz, un probador virtual con IA. Responde SOLO en español, de forma breve y amigable (máximo 3 frases). Solo respondes sobre Agalaz y sus servicios.

FUNCIONALIDADES:
- Probador virtual con IA: sube tu foto y cualquier prenda/accesorio, nuestra IA genera una imagen fotorrealista de ti con esa prenda
- Categorías soportadas: ropa (camisetas, vestidos, pantalones, chaquetas, abrigos, faldas, sudaderas), gafas (de sol, graduadas, deportivas), joyería (collares, pendientes, pulseras, anillos, relojes), sombreros (gorras, gorros, diademas), zapatos (zapatillas, tacones, botas, sandalias), bolsos, tatuajes, uñas/manicura
- Chat IA post-render: después de generar tu imagen puedes pedir cambios por chat (otra talla, otro color, otro estilo)
- Descargar y compartir renders

PLANES Y PRECIOS (usuarios finales):
- 2 renders gratis al registrarte (sin tarjeta)
- Plan Semanal: 4,99€/semana — 14 renders por semana
- Plan Anual: 59,99€/año — 14 renders por semana — INCLUYE 1 día de prueba gratis con 2 renders (solo plan anual)
- Cancela cuando quieras, sin compromiso

PARTNERS (para ecommerce/tiendas online):
- Integra el probador virtual en tu tienda en 2 líneas de código
- Funciona en Shopify, WooCommerce, PrestaShop, Magento o cualquier plataforma
- Prueba gratis: 5 renders sin tarjeta, sin coste de instalación
- Plan Starter: 150€/mes (200 renders)
- Plan Growth: 499€/mes (1000 renders)
- Reduce devoluciones hasta un 40%, aumenta conversión un 25%
- Más info en /partners

CONTACTO: infoagalaz@gmail.com

Si preguntan algo que no sabes o no es sobre Agalaz, di que contacten a infoagalaz@gmail.com.
`;

const KNOWLEDGE_EN = `
You are Agalaz's virtual assistant, an AI virtual try-on platform. Reply ONLY in English, briefly and friendly (max 3 sentences). Only answer about Agalaz and its services.

FEATURES:
- AI virtual try-on: upload your photo and any garment/accessory, our AI generates a photorealistic image of you wearing it
- Supported categories: clothing (shirts, dresses, pants, jackets, coats, skirts, sweaters, hoodies), glasses (sunglasses, prescription, sports), jewelry (necklaces, earrings, bracelets, rings, watches), headwear (hats, caps, beanies, headbands), shoes (sneakers, heels, boots, sandals), bags, tattoos, nail art
- Post-render AI chat: after generating your image you can ask for changes (different size, color, style)
- Download and share renders

PLANS & PRICING (end users):
- 2 free renders on signup (no card needed)
- Weekly Plan: $4.99/week — 14 renders per week
- Yearly Plan: $59.99/year — 14 renders per week — INCLUDES 1 day free trial with 2 renders (yearly only)
- Cancel anytime, no commitment

PARTNERS (for ecommerce/online stores):
- Integrate virtual try-on in your store with 2 lines of code
- Works on Shopify, WooCommerce, PrestaShop, Magento or any platform
- Free trial: 5 renders, no credit card, no setup fee
- Starter Plan: €150/mo (200 renders)
- Growth Plan: €499/mo (1000 renders)
- Reduce returns by up to 40%, boost conversion by 25%
- More info at /partners

CONTACT: infoagalaz@gmail.com

If they ask something you don't know or it's not about Agalaz, tell them to contact infoagalaz@gmail.com.
`;

function getBotReply(userMsg: string, lang: string): string {
  const msg = userMsg.toLowerCase().trim();
  const es = lang === 'es';

  // Greetings
  if (/^(hola|hey|hi|hello|buenas|buenos|qué tal|que tal)/.test(msg)) {
    return es
      ? '¡Hola! 👋 Soy el asistente de Agalaz. Puedo ayudarte con info sobre nuestro probador virtual, planes, partners o cualquier duda. ¿Qué necesitas?'
      : 'Hi! 👋 I\'m the Agalaz assistant. I can help with info about our virtual try-on, plans, partners or any questions. What do you need?';
  }

  // Pricing / plans
  if (/precio|plan|cost|cuánto|cuanto|pricing|suscri|subscri|pagar|pay/.test(msg)) {
    return es
      ? '💰 Tienes 2 renders gratis al registrarte. Luego: Plan Semanal 4,99€/semana o Plan Anual 59,99€/año (con 1 día de prueba gratis + 2 renders). Ambos incluyen 14 renders/semana. Cancela cuando quieras.'
      : '💰 You get 2 free renders on signup. Then: Weekly $4.99/week or Yearly $59.99/year (includes 1 day free trial + 2 renders). Both include 14 renders/week. Cancel anytime.';
  }

  // Free trial
  if (/gratis|free|trial|prueba/.test(msg)) {
    return es
      ? '🎁 Tienes 2 renders totalmente gratis al registrarte (sin tarjeta). Si eliges el plan anual, además incluye 1 día de prueba gratis con 2 renders extra. ¡Pruébalo sin compromiso!'
      : '🎁 You get 2 completely free renders on signup (no card needed). The yearly plan also includes a 1-day free trial with 2 extra renders. Try it risk-free!';
  }

  // Partners / ecommerce
  if (/partner|ecommerce|tienda|store|shopify|woocommerce|integr|widget|api|b2b/.test(msg)) {
    return es
      ? '🏪 Si tienes un ecommerce, puedes integrar nuestro probador virtual en 2 líneas de código. Prueba gratis con 5 renders, sin coste de instalación. Planes desde 150€/mes. Funciona en Shopify, WooCommerce y cualquier plataforma. Más info en /partners.'
      : '🏪 If you have an ecommerce, you can integrate our virtual try-on with 2 lines of code. Free trial with 5 renders, no setup fee. Plans from €150/mo. Works on Shopify, WooCommerce and any platform. More at /partners.';
  }

  // How it works
  if (/cómo funciona|como funciona|how.*work|qué hace|que hace|what.*do/.test(msg)) {
    return es
      ? '✨ Es muy fácil: 1) Sube tu foto (selfie o cuerpo entero) 2) Sube la prenda o accesorio que quieras probar 3) Nuestra IA genera una imagen fotorrealista de ti con esa prenda en menos de 60 segundos.'
      : '✨ It\'s simple: 1) Upload your photo (selfie or full body) 2) Upload the garment or accessory you want to try 3) Our AI generates a photorealistic image of you wearing it in under 60 seconds.';
  }

  // Categories / what can I try
  if (/qué puedo|que puedo|catego|ropa|gafas|joya|zapato|bolso|tatua|uña|what.*try|cloth|glass|jewel|shoe|bag|tattoo|nail/.test(msg)) {
    return es
      ? '👗 Puedes probar: ropa (camisetas, vestidos, pantalones, chaquetas...), gafas, joyería, sombreros, zapatos, bolsos, tatuajes y diseños de uñas. ¡Cualquier prenda o accesorio!'
      : '👗 You can try: clothing (shirts, dresses, pants, jackets...), glasses, jewelry, headwear, shoes, bags, tattoos and nail designs. Any garment or accessory!';
  }

  // Contact
  if (/contacto|contact|email|correo|ayuda|help|soporte|support/.test(msg)) {
    return es
      ? '📧 Puedes contactarnos en infoagalaz@gmail.com. ¡Estaremos encantados de ayudarte!'
      : '📧 You can reach us at infoagalaz@gmail.com. We\'d love to help!';
  }

  // Returns / devoluciones
  if (/devoluci|return|reducir|reduce/.test(msg)) {
    return es
      ? '📉 Agalaz ayuda a reducir devoluciones hasta un 40%. Tus clientes ven cómo les queda la ropa antes de comprar, así que compran con más confianza. Si tienes tienda online, mira /partners.'
      : '📉 Agalaz helps reduce returns by up to 40%. Your customers see how clothes look on them before buying, so they shop with more confidence. If you have a store, check /partners.';
  }

  // Cancel
  if (/cancel|baja/.test(msg)) {
    return es
      ? '✅ Puedes cancelar tu suscripción en cualquier momento desde tu perfil (icono de tu foto arriba a la izquierda → Gestionar suscripción). Sin permanencia ni penalización.'
      : '✅ You can cancel anytime from your profile (tap your photo icon top left → Manage Subscription). No lock-in, no penalties.';
  }

  // Privacy / photos
  if (/privacidad|privacy|foto|photo|datos|data|segur|secur/.test(msg)) {
    return es
      ? '🔒 Tus fotos se procesan en tiempo real y NO se almacenan en nuestros servidores. Tu privacidad es nuestra prioridad.'
      : '🔒 Your photos are processed in real time and NOT stored on our servers. Your privacy is our priority.';
  }

  // Default
  return es
    ? '🤔 No estoy seguro de cómo ayudarte con eso. Puedo responder sobre: funcionalidades, planes y precios, prueba gratis, partners para ecommerce, o contacto. ¿Sobre qué quieres saber?'
    : '🤔 I\'m not sure how to help with that. I can answer about: features, plans & pricing, free trial, partners for ecommerce, or contact. What would you like to know?';
}

const QUICK_CHIPS = {
  es: ['¿Cómo funciona?', '¿Es gratis?', 'Partners', 'Contacto'],
  en: ['How does it work?', 'Is it free?', 'Partners', 'Contact'],
};

export function ChatBot() {
  const { lang } = useLang();
  const es = lang === 'es';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'bot',
        text: es
          ? '¡Hola! 👋 Soy el asistente de Agalaz. Pregúntame sobre nuestro probador virtual, planes, partners o lo que necesites.'
          : 'Hi! 👋 I\'m the Agalaz assistant. Ask me about our virtual try-on, plans, partners or anything you need.',
      }]);
    }
  }, [open, es]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    const botMsg: Message = { role: 'bot', text: getBotReply(text, lang) };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-all hover:scale-105 animate-fade-in"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-black text-sm">Agalaz</h3>
                <p className="text-white/50 text-[10px] font-bold">{es ? 'Asistente virtual' : 'Virtual assistant'}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X size={18} className="text-white/60" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-700 rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick chips after first bot message */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {QUICK_CHIPS[lang === 'es' ? 'es' : 'en'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full hover:bg-indigo-100 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={es ? 'Escribe tu pregunta...' : 'Type your question...'}
                className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-30"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
