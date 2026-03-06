'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function TermsPage() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  return (
    <main className="min-h-screen bg-white py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-10 transition-colors">
          <ArrowLeft size={16} />
          <span>{isEs ? 'Volver' : 'Back'}</span>
        </Link>

        <h1 className="font-serif text-4xl font-black text-slate-900 mb-8">
          {isEs ? 'Terminos de Servicio' : 'Terms of Service'}
        </h1>

        <div className="prose prose-slate prose-sm max-w-none space-y-6 text-slate-600 font-light leading-relaxed">
          <p className="text-slate-400 text-xs">{isEs ? 'Ultima actualizacion: Marzo 2026' : 'Last updated: March 2026'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '1. Aceptacion de los Terminos' : '1. Acceptance of Terms'}</h2>
          <p>{isEs
            ? 'Al acceder y utilizar Agalaz, aceptas estos terminos de servicio. Si no estas de acuerdo, no utilices el servicio.'
            : 'By accessing and using Agalaz, you agree to these terms of service. If you do not agree, do not use the service.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '2. Descripcion del Servicio' : '2. Service Description'}</h2>
          <p>{isEs
            ? 'Agalaz es un probador virtual de ropa con inteligencia artificial que permite a los usuarios ver como les quedarian diferentes prendas antes de comprarlas.'
            : 'Agalaz is an AI-powered virtual clothing try-on service that allows users to see how different garments would look on them before purchasing.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '3. Cuentas y Suscripciones' : '3. Accounts & Subscriptions'}</h2>
          <p>{isEs
            ? 'Puedes crear una cuenta gratuita con Google. Las suscripciones Pro se facturan de forma recurrente (semanal o anual) y pueden cancelarse en cualquier momento. No se realizan reembolsos por periodos parciales.'
            : 'You can create a free account with Google. Pro subscriptions are billed on a recurring basis (weekly or yearly) and can be canceled at any time. No refunds are issued for partial periods.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '4. Uso Aceptable' : '4. Acceptable Use'}</h2>
          <p>{isEs
            ? 'No debes utilizar el servicio para generar contenido ilegal, ofensivo o que infrinja derechos de terceros. Nos reservamos el derecho de suspender cuentas que violen estos terminos.'
            : 'You must not use the service to generate illegal, offensive, or third-party rights-infringing content. We reserve the right to suspend accounts that violate these terms.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '5. Propiedad Intelectual' : '5. Intellectual Property'}</h2>
          <p>{isEs
            ? 'Las imagenes generadas son para tu uso personal. Agalaz retiene los derechos sobre la tecnologia y el servicio.'
            : 'Generated images are for your personal use. Agalaz retains rights to the technology and service.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '6. Limitacion de Responsabilidad' : '6. Limitation of Liability'}</h2>
          <p>{isEs
            ? 'Agalaz se proporciona "tal cual". No garantizamos resultados especificos ni la disponibilidad ininterrumpida del servicio.'
            : 'Agalaz is provided "as is." We do not guarantee specific results or uninterrupted availability of the service.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '7. Contacto' : '7. Contact'}</h2>
          <p>{isEs
            ? 'Para consultas sobre estos terminos, contactanos en:'
            : 'For inquiries about these terms, contact us at:'} <a href="mailto:infoagalaz@gmail.com" className="text-indigo-600 hover:underline">infoagalaz@gmail.com</a></p>
        </div>
      </div>
    </main>
  );
}
