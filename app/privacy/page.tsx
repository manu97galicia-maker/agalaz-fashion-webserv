'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const isEs = lang === 'es';

  return (
    <main className="min-h-screen bg-white py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-10 transition-colors">
          <ArrowLeft size={16} />
          <span>{isEs ? 'Volver' : 'Back'}</span>
        </Link>

        <h1 className="font-serif text-4xl font-black text-slate-900 mb-8">
          {isEs ? 'Politica de Privacidad' : 'Privacy Policy'}
        </h1>

        <div className="prose prose-slate prose-sm max-w-none space-y-6 text-slate-600 font-light leading-relaxed">
          <p className="text-slate-400 text-xs">{isEs ? 'Ultima actualizacion: Marzo 2026' : 'Last updated: March 2026'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '1. Informacion que Recopilamos' : '1. Information We Collect'}</h2>
          <p>{isEs
            ? 'Recopilamos la informacion que proporcionas al crear una cuenta (nombre, email, foto de perfil via Google). Tambien procesamos las fotos que subes para generar pruebas virtuales de ropa.'
            : 'We collect the information you provide when creating an account (name, email, profile photo via Google). We also process photos you upload to generate virtual try-on results.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '2. Uso de Tus Fotos' : '2. Use of Your Photos'}</h2>
          <p>{isEs
            ? 'Tus fotos se procesan unicamente para generar la imagen de prueba virtual. No almacenamos tus fotos de forma permanente ni las compartimos con terceros. Las imagenes se eliminan automaticamente despues del procesamiento.'
            : 'Your photos are processed solely to generate the virtual try-on image. We do not permanently store your photos or share them with third parties. Images are automatically deleted after processing.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '3. Pagos' : '3. Payments'}</h2>
          <p>{isEs
            ? 'Los pagos se procesan de forma segura a traves de Stripe. No almacenamos datos de tarjetas de credito en nuestros servidores.'
            : 'Payments are processed securely through Stripe. We do not store credit card data on our servers.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '4. Cookies' : '4. Cookies'}</h2>
          <p>{isEs
            ? 'Utilizamos cookies esenciales para la autenticacion y el funcionamiento del servicio. No utilizamos cookies de seguimiento publicitario.'
            : 'We use essential cookies for authentication and service functionality. We do not use advertising tracking cookies.'}</p>

          <h2 className="text-lg font-bold text-slate-800">{isEs ? '5. Contacto' : '5. Contact'}</h2>
          <p>{isEs
            ? 'Para cualquier consulta sobre privacidad, contactanos en:'
            : 'For any privacy inquiries, contact us at:'} <a href="mailto:infoagalaz@gmail.com" className="text-indigo-600 hover:underline">infoagalaz@gmail.com</a></p>
        </div>
      </div>
    </main>
  );
}
