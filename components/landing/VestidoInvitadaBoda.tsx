'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Heart } from 'lucide-react';
import TryOnDemoBlock from '@/components/landing/TryOnDemoBlock';
import InternalLandingLinks from '@/components/landing/InternalLandingLinks';
import { VESTIDOS_INVITADA as VESTIDOS, VESTIDO_INVITADA_FAQ as FAQ } from '@/data/vestidoInvitadaBoda';

export default function VestidoInvitadaBoda() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white" lang="es">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black" style={{ fontVariantLigatures: 'none' }}>
            Agalaz
          </Link>
          <Link
            href="/try-on?category=clothing"
            className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-rose-400 transition-colors"
          >
            Probar gratis
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Heart size={10} className="inline mr-1.5 -mt-0.5" />
            Boda · Invitada 2026
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-slate-900 tracking-tight leading-[0.95] mb-6">
            Vestido Invitada Boda
            <br />
            <span className="italic text-slate-400">Pruébalo en Ti.</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            8 vestidos de invitada para boda — primavera pastel, verano floral, otoño en colores joya, invierno con terciopelo, etiqueta, playa, casual, traje hombre. <strong className="text-slate-900 font-semibold">Mira cómo te queda</strong> antes de comprar en Zara, Mango, Massimo Dutti, Asos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#try-it"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
            >
              <Sparkles size={16} />
              Probar un vestido
              <ArrowRight size={14} />
            </Link>
            <span className="text-slate-500 text-xs font-bold">Gratis · Sin app · 30 seg</span>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-rose-700 mb-3">Guía rápida</div>
          <p className="text-slate-900 font-bold text-base md:text-lg leading-relaxed mb-2">
            <span className="italic">3 reglas estrictas</span>: nunca blanco/crema/champán (color novia), nunca rojo total en bodas católicas, nunca negro total en boda de día informal. Adapta a la temporada.
          </p>
          <p className="text-slate-700 text-sm">
            Gasto medio invitada española: 80-250€. Usa Agalaz para probar el vestido antes de pagar.
          </p>
        </div>
      </section>

      {/* Wedding-guest-specific presets so visitors only need to upload
          their photo (Gemini-generated, 2026-05-16). */}
      <TryOnDemoBlock
        category="clothing"
        lang="es"
        productLabel="Vestido de invitada"
        presets={[
          { src: '/images/presets/es-vestido-invitada-boda-satin-emerald-midi.png', label: 'Satén esmeralda midi', alt: 'Vestido invitada boda satén verde esmeralda midi — probador IA Agalaz' },
          { src: '/images/presets/es-vestido-invitada-boda-lilac-tulle-floral-long.png', label: 'Lila tul floral', alt: 'Vestido invitada boda largo lila en tul con bordados florales — probador IA Agalaz' },
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
            8 vestidos
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Vestidos invitada por temporada y código
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {VESTIDOS.map((v, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-rose-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl font-black text-slate-900 mb-2">{v.name}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-slate-900">Piezas: </span>
                    {v.pieces}
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Cuándo usar</p>
                  <p className="text-slate-600 text-xs mt-1">{v.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="invierno" className="max-w-3xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
          Octubre · Marzo
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Vestido invitada boda invierno: telas, abrigo y largo correcto
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          En bodas de invierno (octubre a marzo en España) el código sube de formalidad por defecto. La regla mental: si la ceremonia es por la tarde o noche, el vestido <strong>baja por debajo de la rodilla</strong>; si es a mediodía con cóctel después, midi sigue funcionando.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Telas que funcionan:</strong> terciopelo (joya por excelencia — verde botella, burdeos, azul noche), crepé pesado, mikado, lana fría con forro de seda, jacquard. Evita gasa fina o lino: cantan a primavera y dan frío óptico aunque la sala esté a 22°C.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Colores 2026:</strong> burdeos, verde botella, azul medianoche, chocolate, granate. Los pasteles invitada-primavera se ven fuera de temporada en pleno invierno — incluso si la boda es en interior climatizado, las fotos contarán &ldquo;abril&rdquo;.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>Encima del vestido:</strong> capa de paño (más elegante que el abrigo), chal de cashmere o estola de piel sintética. Nunca abrigo plumífero ni parka en fotos — guárdalo en el guardarropa.
        </p>
        <Link href="/try-on?category=clothing" className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700">
          Probar terciopelo burdeos en mi foto <ArrowRight size={14} />
        </Link>
      </section>

      <section id="largo" className="max-w-3xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
          Etiqueta · Noche
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Vestido invitada boda largo: cuándo es obligatorio y cuándo opcional
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          El vestido largo es <strong>obligatorio cuando la invitación dice &ldquo;etiqueta&rdquo;, &ldquo;black tie&rdquo;, o &ldquo;ceremonia de noche&rdquo;</strong>. Es opcional (y suma) en bodas de tarde-noche en finca, palacio o hacienda. Es excesivo en boda civil de mediodía o en boda casual de playa.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Largos válidos:</strong> hasta el tobillo (ankle length), hasta el suelo (floor length) y vestido con cola corta. La cola larga es solo para la novia — incluso en madrinas se evita.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Telas para largo:</strong> satén stretch (cae como agua sobre el cuerpo, es la elección zara/mango 2026), crepé doble, georgette con forro, terciopelo en invierno. Evita gasas finas baratas: hacen pliegues poco favorecedores y se transparentan con flash.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Cortes que más favorecen:</strong> sirena suave para cuerpo recto, evasé desde la cintura para cadera ancha, corte imperio para tripa o embarazo, columna con escote en V para alturas medias.
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Complementos:</strong> sandalia de tacón medio o alto (joya o nude), clutch rígido, pendientes largos si el escote es alto, pendientes botón si el escote es palabra de honor.
        </p>
      </section>

      <section id="barato" className="max-w-3xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
          Menos de 50€
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Vestido invitada boda barato: dónde comprar bajo 50€ sin parecer barato
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          El secreto de un vestido barato que no canta a barato: <strong>tejido con caída</strong> (satén, crepé) en lugar de poliéster brillante, <strong>color saturado pero no fluor</strong>, y un complemento bueno (zapato + bolso) que suba el conjunto.
        </p>
        <ul className="space-y-2 text-slate-700 leading-relaxed mb-4">
          <li><strong>Shein</strong> (15-30€): busca &ldquo;wedding guest dress satin&rdquo;. Filtra por valoración 4.5+ y &gt;1.000 reseñas. Pide 1-2 tallas porque el sizing es asiático.</li>
          <li><strong>Primark</strong> (20-40€): colección invitada de temporada en tiendas grandes (Gran Vía Madrid, Maquinista BCN). Calidad sorprendente en crepé estructurado.</li>
          <li><strong>Zara TRF outlet</strong> (25-45€): vestidos satinados color joya en rebajas de mediados de temporada.</li>
          <li><strong>Mango outlet online</strong> (30-50€): fondos de armario invitada con descuentos del 50-70% si esperas a julio o enero.</li>
          <li><strong>Segunda mano premium</strong>: Vinted, Vestiaire, Micolet. Vestidos de Apparentia, Cherubina o Sfera por 30-60€ originalmente 180-300€.</li>
          <li><strong>Alquiler</strong>: Dresseos, La Más Mona, Vestido Único. Desde 35€/4 días. Útil si tienes 3 bodas el mismo verano.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Trucos para subir el conjunto:</strong> tinta el vestido si llega con color apagado, planchado profesional 5€, sandalia de piel de Sézane outlet o Marypaz 25€, bolso pequeño en color metalizado.
        </p>
        <Link href="/try-on?category=clothing" className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700">
          Probar 3 vestidos Shein antes de pedirlos <ArrowRight size={14} />
        </Link>
      </section>

      <section id="dia-vs-noche" className="max-w-3xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
          Día vs Noche
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Vestido invitada boda de día vs de noche: la diferencia que importa
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          La hora de la ceremonia define todo: color, largo, tela y joyería. La regla rápida: <strong>antes de las 18:00 = día</strong>, después = noche. Si la ceremonia es a las 18:30 (la franja gris española), guíate por el código del banquete que viene después.
        </p>
        <div className="rounded-2xl border-2 border-slate-100 overflow-hidden mb-4">
          <div className="grid grid-cols-3 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-700">
            <div className="p-3 border-r border-slate-200">Detalle</div>
            <div className="p-3 border-r border-slate-200">Día (ceremonia &lt; 18h)</div>
            <div className="p-3">Noche (ceremonia ≥ 19h)</div>
          </div>
          <div className="grid grid-cols-3 text-xs md:text-sm text-slate-700 border-t border-slate-200">
            <div className="p-3 border-r border-slate-200 font-bold text-slate-900">Largo</div>
            <div className="p-3 border-r border-slate-200">Midi, hasta la rodilla, mono largo</div>
            <div className="p-3">Largo o midi largo</div>
          </div>
          <div className="grid grid-cols-3 text-xs md:text-sm text-slate-700 border-t border-slate-200">
            <div className="p-3 border-r border-slate-200 font-bold text-slate-900">Color</div>
            <div className="p-3 border-r border-slate-200">Pasteles, estampados, colores vivos</div>
            <div className="p-3">Colores joya, oscuros, metalizados</div>
          </div>
          <div className="grid grid-cols-3 text-xs md:text-sm text-slate-700 border-t border-slate-200">
            <div className="p-3 border-r border-slate-200 font-bold text-slate-900">Tela</div>
            <div className="p-3 border-r border-slate-200">Gasa, lino mezcla, popelín, organza</div>
            <div className="p-3">Satén, crepé, terciopelo, mikado</div>
          </div>
          <div className="grid grid-cols-3 text-xs md:text-sm text-slate-700 border-t border-slate-200">
            <div className="p-3 border-r border-slate-200 font-bold text-slate-900">Joyería</div>
            <div className="p-3 border-r border-slate-200">Discreta, perla, dorado mate</div>
            <div className="p-3">Pendiente largo, brillo, pedrería</div>
          </div>
          <div className="grid grid-cols-3 text-xs md:text-sm text-slate-700 border-t border-slate-200">
            <div className="p-3 border-r border-slate-200 font-bold text-slate-900">Zapato</div>
            <div className="p-3 border-r border-slate-200">Sandalia plana o tacón medio</div>
            <div className="p-3">Tacón alto, joya, metalizado</div>
          </div>
          <div className="grid grid-cols-3 text-xs md:text-sm text-slate-700 border-t border-slate-200">
            <div className="p-3 border-r border-slate-200 font-bold text-slate-900">Tocado</div>
            <div className="p-3 border-r border-slate-200">Pamela, diadema, flor pequeña</div>
            <div className="p-3">Sin tocado o pasador joya</div>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed">
          Si la boda es de día con cena después (lo más común en España rural), planifica un cambio sutil: cambia pendientes pequeños por largos, sustituye la pamela por un pasador y mete tacón más alto en el bolso.
        </p>
      </section>

      <section id="primavera" className="max-w-3xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <span className="inline-block px-3 py-1 bg-pink-50 text-pink-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
          Abril · Junio
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Vestido invitada boda primavera: pasteles, florales y el truco del color
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          La temporada reina de bodas en España: abril, mayo y junio concentran el 45% de enlaces civiles y religiosos. El código manda: <strong>colores claros, telas ligeras, tocado opcional pero suma</strong>.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Colores 2026 que están vendiendo:</strong> rosa empolvado, lavanda, verde menta, azul cielo, mantequilla, coral suave. Evita pasteles que viren a blanco/crema: en fotos la cámara los lee como color novia.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Telas:</strong> gasa con cuerpo, popelín de algodón, lino mezcla, organza. El truco contra el calor de mayo en el sur: forro de viscosa (no poliéster), corte evasé con espacio entre tela y muslo.
        </p>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Estampados aprobados:</strong> floral pequeño tono sobre tono, lunares grandes en fondo claro, ramillete tipo Liberty. Evita estampados maxi tropicales o leopardo (lectura playera o cóctel, no boda).
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Tocado:</strong> diadema fina con flor, pamela pequeña (no de playa), tocado horizontal de plumas. Tocado opcional si la boda es civil o de jardín. En boda religiosa tradicional sigue siendo una elección segura.
        </p>
      </section>

      <section id="madrina" className="max-w-3xl mx-auto px-6 md:px-12 py-12 border-t border-slate-100">
        <span className="inline-block px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
          Madrina vs Invitada
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Vestido madrina vs invitada: las 5 diferencias que casi todas confunden
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          La madrina (madre de la novia o del novio, o mujer principal del padrino) no viste igual que una invitada normal. Estas son las diferencias que distinguen un vestido de madrina bien resuelto:
        </p>
        <ol className="space-y-3 text-slate-700 leading-relaxed mb-4 list-decimal pl-5">
          <li><strong>Formalidad un escalón más arriba.</strong> Si la invitada va midi, la madrina va largo. Si la invitada va de cóctel, la madrina va de etiqueta.</li>
          <li><strong>Color coordinado, no idéntico.</strong> Las dos madrinas (de la novia y del novio) deben coordinar familia de color sin ir vestidas iguales. Lo habitual: una en color joya frío (verde, azul), otra en cálido (burdeos, terracota).</li>
          <li><strong>Tocado obligatorio en boda religiosa.</strong> La invitada puede ir sin tocado; la madrina no. Tocado horizontal, pamela mediana o pasador joya según el largo del vestido.</li>
          <li><strong>Joyería visible.</strong> Pendientes largos o medianos, gargantilla discreta, anillo de cóctel. La madrina lleva una pieza fuerte (la que se ve en las fotos del altar).</li>
          <li><strong>Zapato cerrado o sandalia de salón.</strong> No sandalia de pala fina ni cuña. El zapato sale en muchas fotos formales.</li>
        </ol>
        <p className="text-slate-700 leading-relaxed mb-3">
          <strong>Marcas españolas especializadas en madrina:</strong> Apparentia, Cherubina, Matilde Cano, Vicky Martín Berrocal, Pronovias línea madrina, Carla Ruiz. Rango de precio 250-900€. Alquiler desde 80€/4 días.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>El error más común:</strong> elegir un vestido en tono empolvado o champán muy claro. En la foto del altar, junto a la novia, la madrina lee también como novia. Mantén el contraste: si la novia va blanco roto, tú vas burdeos, verde botella o azul medianoche.
        </p>
        <Link href="/try-on?category=clothing" className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700">
          Probar vestido madrina antes del salón <ArrowRight size={14} />
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <Heart size={32} className="text-rose-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Pruébatelo antes de la boda
        </h2>
        <p className="text-slate-700 max-w-xl mx-auto mb-8">
          Los vestidos quedan diferentes en el modelo de Zara que en tu cuerpo. Sube tu foto + la del vestido y la IA te lo enseña en 30 segundos. Primer render gratis.
        </p>
        <Link
          href="/try-on?category=clothing"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-rose-500 transition-colors rounded-full"
        >
          <Sparkles size={16} />
          Probar vestido en mí
          <ArrowRight size={14} />
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-slate-100">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-10 text-center">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm md:text-base pr-4">{item.q}</span>
                <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-slate-700 text-sm md:text-base leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <InternalLandingLinks lang="es" />

      <footer className="border-t border-slate-200 py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-sm tracking-[0.15em] text-slate-400 font-black">AGALAZ</Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/es/probador-vestido-novia" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Vestido novia</Link>
            <Link href="/privacy" className="text-slate-400 text-xs hover:text-slate-600 transition-colors">Privacidad</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
