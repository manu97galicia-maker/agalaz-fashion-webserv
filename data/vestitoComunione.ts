/**
 * Static content for /it/vestito-comunione (Italian first communion).
 * Lives in /data so client component + server-side layout share the source.
 */

export interface VestitoComunione {
  name: string;
  pieces: string;
  occasion: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const VESTITI_COMUNIONE: VestitoComunione[] = [
  {
    name: 'Vestito comunione bambina · classico bianco',
    pieces:
      'Abito lungo bianco in cotone o pizzo · maniche corte o a sbuffo · cintura in raso annodata · velo di tulle leggero · scarpe ballerine bianche o sandaletti · collanina d\'oro o piccolo crocifisso',
    occasion: 'Cerimonia tradizionale in chiesa, foto di rito, comunione classica',
  },
  {
    name: 'Vestito comunione bambina · moderno corto',
    pieces:
      'Abito al ginocchio in tulle o organza bianca · cintura colorata o fiori applicati · ballerine traforate · cerchietto con fiori freschi · calze bianche al ginocchio',
    occasion: 'Comunione moderna, parrocchie più giovani, festa in giardino',
  },
  {
    name: 'Vestito comunione bambina · elegante con bolero',
    pieces:
      'Abito lungo in pizzo bianco · bolero in lana o cotone se la chiesa è fresca · scarpe vernici · acconciatura con corona di fiori · piccola pochette per i fazzoletti',
    occasion: 'Cerimonie più formali, fotografo professionale, pranzo a ristorante',
  },
  {
    name: 'Vestito comunione bambina · a sirena per bambine alte',
    pieces:
      'Abito vita alta con gonna principessa · pizzo macramè sul corpetto · velo lungo coordinato · scarpe basse con piccolo tacco da bambina · diadema sottile',
    occasion: 'Bambine alte o slanciate che possono portare modelli più adulti',
  },
  {
    name: 'Vestito comunione bambino · classico marinaretto',
    pieces:
      'Pantalone bianco al ginocchio · giacca bianca con dettagli blu navy stile marinaro · camicia bianca · cravattino o farfallino · calze bianche e mocassini · capelli pettinati di lato',
    occasion: 'Comunione classica del bambino, tradizione italiana',
  },
  {
    name: 'Vestito comunione bambino · moderno con gilet',
    pieces:
      'Pantalone bianco lungo · camicia bianca con colletto morbido · gilet bianco coordinato · papillon o cravatta sottile · scarpe stringate bianche · capelli con un ciuffo davanti',
    occasion: 'Comunione moderna, foto contemporanee, bambini che non amano la giacca',
  },
  {
    name: 'Tenuta invitata mamma o madrina',
    pieces:
      'Tailleur pantalone in tessuto leggero color tortora o azzurro polvere · scarpe décolleté basse · borsa a tracolla strutturata · cappellino piccolo opzionale per la chiesa · trucco naturale',
    occasion: 'Mamma o madrina, foto di famiglia, ruolo di rilievo',
  },
];

export const VESTITO_COMUNIONE_FAQ: FaqEntry[] = [
  {
    q: 'Come scegliere il vestito da comunione per la bambina?',
    a: "Il vestito da comunione tradizionale è bianco, lungo o al ginocchio, in tessuto leggero (cotone, pizzo, organza, tulle). Considera la stagione (Maggio-Giugno = leggero), l'altezza della bambina (modello a vita alta per le slanciate, principessa per le piccole), e la formalità della parrocchia. Il velo è classico ma non obbligatorio; molte famiglie scelgono cerchietto floreale.",
  },
  {
    q: 'Quanto costa un vestito da comunione bambina?',
    a: "I prezzi vanno da circa 80€ per modelli pronti in catene di abbigliamento (Zara Kids, Mango Kids, OVS, Original Marines), 150-300€ per atelier specializzati e boutique, fino a 500-800€ per abiti su misura. La media italiana è 180-250€ per un abito di buona qualità che la bambina indossa una sola volta.",
  },
  {
    q: 'Cosa indossa la mamma il giorno della comunione?',
    a: "La mamma di solito sceglie un tailleur pantalone o una vestito midi in tessuto leggero, in colori chiari (tortora, azzurro polvere, beige, rosa pastello). Evita il bianco (riservato alla bambina) e il nero totale (associato ai funerali). Scarpe décolleté basse, borsa strutturata, cappellino se la chiesa lo richiede. Trucco naturale.",
  },
  {
    q: 'Posso provare il vestito da comunione online prima di acquistarlo?',
    a: "Sì — Agalaz ti permette di caricare una foto di tua figlia e l'immagine del vestito, e l'IA mostra come le sta in 30 secondi. Primo render gratuito, senza carta. Utile per evitare di comprare un abito che sembra perfetto sull'ometto del negozio ma non valorizza la bambina o ne accentua difetti.",
  },
  {
    q: 'Vestito comunione bambina con o senza maniche?',
    a: "Dipende dalla data: comunione di Maggio (più fresca) → maniche corte o lunghe leggere; Giugno (caldo) → maniche corte o smanicato con bolero in chiesa. Le chiese più tradizionali richiedono spalle coperte, quindi un bolero o coprispalle in pizzo bianco è una soluzione versatile.",
  },
  {
    q: "Cosa indossa il bambino per la comunione?",
    a: "Il bambino italiano per tradizione indossa un completo bianco: pantalone al ginocchio o lungo, camicia bianca, gilet o giacca bianca con dettagli blu navy. Cravattino o papillon. Scarpe bianche o moccasini neri lucidi. Capelli pettinati. Modelli moderni eliminano la giacca e mantengono solo gilet + camicia con manica corta.",
  },
  {
    q: "Dove comprare il vestito da comunione bambina?",
    a: "Catene per economici: Zara Kids, Mango Kids, OVS, Original Marines (80-150€). Boutique specializzate: Mariella Burani, Monnalisa, Il Gufo, Maria Lucia (200-500€). Atelier su misura: prezzi variabili, ma garantiscono vestibilità perfetta. Online: Yoox, Amazon, AliExpress per opzioni economiche con resi facili.",
  },
];
