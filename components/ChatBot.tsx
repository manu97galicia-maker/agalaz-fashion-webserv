'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useLang } from '@/components/LanguageProvider';

interface Message {
  role: 'user' | 'bot';
  text: string;
}


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
      ? '💰 Plan Semanal: 4,99€/semana (14 renders). Plan Anual: 59,99€/año (14 renders/semana + 1 día de prueba gratis con 2 renders, introduces tarjeta pero no se cobra hasta pasadas 24h). Cancela cuando quieras.'
      : '💰 Weekly: $4.99/week (14 renders). Yearly: $59.99/year (14 renders/week + 1 day free trial with 2 renders, card required but not charged for 24h). Cancel anytime.';
  }

  // Free trial
  if (/gratis|free|trial|prueba/.test(msg)) {
    return es
      ? '🎁 Con el plan anual tienes 1 día de prueba gratis con 2 renders. Introduces tu tarjeta pero NO se te cobra nada el primer día. Si no cancelas en 24h, se activa el plan anual (59,99€/año) automáticamente.'
      : '🎁 The yearly plan includes a 1-day free trial with 2 renders. You enter your card but are NOT charged on day one. If you don\'t cancel within 24h, the yearly plan ($59.99/year) activates automatically.';
  }

  // Partners / ecommerce
  if (/partner|ecommerce|tienda|store|shopify|woocommerce|integr|widget|api|b2b/.test(msg)) {
    return es
      ? '🏪 Si tienes un ecommerce, puedes integrar nuestro probador virtual en 2 líneas de código. Prueba gratis con 5 renders, sin coste de instalación. Planes desde 150€/mes. Funciona en Shopify, WooCommerce y cualquier plataforma. Más info en /partners.'
      : '🏪 If you have an ecommerce, you can integrate our virtual try-on with 2 lines of code. Free trial with 5 renders, no setup fee. Plans from €150/mo. Works on Shopify, WooCommerce and any platform. More at /partners.';
  }

  // How it works
  if (/^c[oó]mo$|cómo funciona|como funciona|how.*work|qué hace|que hace|what.*do/.test(msg)) {
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

  // Installation / how to install / widget / code
  if (/instala|install|widget|código|codigo|code|script|integra|línea|linea|line|implementa|setup|configurar|configur/.test(msg)) {
    return es
      ? '🔧 Instalar Agalaz en tu tienda es muy fácil — solo 2 pasos:\n\n1️⃣ Copia este script en el <head> de tu web:\n<script src="https://agalaz.com/widget.js" data-api-key="TU_API_KEY"></script>\n\n2️⃣ Añade este div en la página de producto:\n<div id="agalaz-tryon"></div>\n\nEl widget detecta automáticamente las imágenes del producto. Funciona en Shopify, WooCommerce, PrestaShop y cualquier plataforma. Regístrate en /partners para obtener tu API key gratis.'
      : '🔧 Installing Agalaz on your store is easy — just 2 steps:\n\n1️⃣ Add this script to your <head>:\n<script src="https://agalaz.com/widget.js" data-api-key="YOUR_API_KEY"></script>\n\n2️⃣ Place this div on your product page:\n<div id="agalaz-tryon"></div>\n\nThe widget auto-detects product images. Works on Shopify, WooCommerce, PrestaShop and any platform. Sign up at /partners to get your free API key.';
  }

  // Shopify specific
  if (/shopify/.test(msg)) {
    return es
      ? '🛍️ Para Shopify: ve a Tienda Online → Temas → Editar código → theme.liquid. Pega el script de Agalaz antes de </head>. Luego en la plantilla de producto (product.liquid o main-product.liquid) añade <div id="agalaz-tryon"></div> donde quieras el botón. ¡Listo! Más detalles en /partners.'
      : '🛍️ For Shopify: go to Online Store → Themes → Edit Code → theme.liquid. Paste the Agalaz script before </head>. Then in your product template (product.liquid or main-product.liquid) add <div id="agalaz-tryon"></div> where you want the button. Done! More details at /partners.';
  }

  // WooCommerce specific
  if (/woocommerce|wordpress/.test(msg)) {
    return es
      ? '🔌 Para WooCommerce: ve a Apariencia → Editor de temas → header.php. Pega el script antes de </head>. Luego en la plantilla de producto individual (single-product.php o via hooks) añade el div. También puedes usar un plugin de "Insert Headers and Footers". Más en /partners.'
      : '🔌 For WooCommerce: go to Appearance → Theme Editor → header.php. Paste the script before </head>. Then add the div to your product template. You can also use an "Insert Headers and Footers" plugin. More at /partners.';
  }

  // API key
  if (/api.?key|clave|llave/.test(msg)) {
    return es
      ? '🔑 Para obtener tu API key: ve a /partners, introduce la URL de tu tienda y haz login con Google. Recibirás tu API key al instante + 5 renders gratis para probar. Sin tarjeta de crédito.'
      : '🔑 To get your API key: go to /partners, enter your store URL and sign in with Google. You\'ll get your API key instantly + 5 free renders to test. No credit card needed.';
  }

  // Render time / speed
  if (/tarda|cuánto tarda|cuanto tarda|tiempo|speed|fast|rápido|rapido|slow|lento|second|segundo/.test(msg)) {
    return es
      ? '⚡ Cada render tarda entre 10 y 60 segundos dependiendo de la complejidad. La mayoría se completan en menos de 30 segundos.'
      : '⚡ Each render takes 10-60 seconds depending on complexity. Most complete in under 30 seconds.';
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
