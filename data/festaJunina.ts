/**
 * Static content for /pt/look-festa-junina. Lives in /data so that BOTH the
 * client landing component AND the server-side layout (JSON-LD) can import
 * from a server-safe module. Importing the same data from a 'use client'
 * file into a server-component layout caused a runtime "server-side
 * exception" on first deploy — this file is the canonical source.
 */

export interface JuninoLook {
  name: string;
  pieces: string;
  when: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const FESTA_JUNINA_LOOKS: JuninoLook[] = [
  {
    name: 'Caipira clássico (mulher)',
    pieces:
      'Vestido xadrez ou de chita · trança lateral com fitas · sardas pintadas · botas marrons ou alpargatas · chapéu de palha',
    when: 'Quadrilha, arraial tradicional, escola dos filhos, festa em sítio',
  },
  {
    name: 'Caipira clássico (homem)',
    pieces:
      'Camisa xadrez (manga longa amarrada) · calça jeans com remendos coloridos · chapéu de palha · suspensórios · barba pintada com lápis',
    when: 'Quadrilha tradicional, festa de igreja, ambiente rural',
  },
  {
    name: 'Festa junina chique',
    pieces:
      'Vestido de chita longo bem cortado · cinto fino · botas de couro · cabelo solto com flor · maquiagem natural com sardinhas finas',
    when: 'Festa junina de prédio, cervejaria temática, pre-wedding rural',
  },
  {
    name: 'Festa junina elegante para casamento',
    pieces:
      'Vestido midi de chita ou linho cru · sapatilha rasteira · cabelo preso baixo com fita · adereços minimalistas (anel, brincos pequenos)',
    when: 'Casamento temático no campo, festa de noivado junina, arraial em clube',
  },
  {
    name: 'Look junino moderno (street style)',
    pieces:
      'Camisa xadrez aberta sobre top · short jeans desfiado · botas estilo coturno · maquiagem com glitter dourado · acessórios de palha',
    when: 'Festa junina universitária, arraial gay, evento corporativo descontraído',
  },
  {
    name: 'Look para criança',
    pieces:
      'Vestidinho de chita curto com babado · trançinhas com fitas · sapatilha · sardas grandes pintadas · brincos de plástico coloridos',
    when: 'Festa da escola, arraial do bairro, foto com a família',
  },
  {
    name: 'Festa junina premium (Insta-ready)',
    pieces:
      'Vestido designer com inspiração caipira · maquiagem profissional sem dentinho preto · cabelo finalizado · acessórios artesanais',
    when: 'Conteúdo de criadora de Instagram, evento de marca, festa de blogueira',
  },
];

export const FESTA_JUNINA_FAQ: FaqEntry[] = [
  {
    q: 'O que é o look festa junina?',
    a: 'Look festa junina é o estilo de roupa típico das festas de São João, Santo Antônio e São Pedro celebradas no mês de junho no Brasil. O look tradicional inclui vestidos de chita ou xadrez para mulheres, camisas xadrez e calças remendadas para homens, chapéus de palha, sardas pintadas no rosto, dentinho preto e tranças com fitas coloridas. Com o tempo apareceram versões modernas, chique e até de alta costura.',
  },
  {
    q: 'Como montar um look festa junina chique?',
    a: 'Para um look junino mais elegante, troque o vestido de chita curto e armado por um vestido midi ou longo de chita ou linho com corte mais ajustado. Use cinto fino para marcar a cintura. Substitua a sardinha exagerada por sardas finas e naturais. Cabelo solto com uma flor ou trança baixa. Botas de couro liso em vez de alpargatas. Maquiagem natural com batom rosado.',
  },
  {
    q: 'Que cor de roupa usar na festa junina?',
    a: 'As cores tradicionais são vermelho, amarelo, azul e branco — em estampas xadrez ou de chita. Tons terrosos (marrom, caramelo, mostarda) também são usados em looks mais modernos. Para festa junina chique, considere paleta neutra com poá ou chita discreta. Evite tons muito escuros ou metalizados como azul-marinho ou prata, que destoam do espírito caipira.',
  },
  {
    q: 'O que vestir em festa junina de empresa?',
    a: 'Empresas costumam ter dress code mais leve. Vai funcionar: camisa xadrez (homens) ou blusa xadrez com calça jeans (mulheres) + chapéu de palha pequeno. Para mulheres, vestido midi de chita com sapatilha é elegante e não destoa em foto. Adicione um adereço pequeno (lenço, brinco em formato de espiga) sem exagerar nas sardas pintadas.',
  },
  {
    q: 'Como combinar maquiagem para festa junina?',
    a: 'Maquiagem clássica: base leve, blush rosado pronunciado nas maçãs, sardas pintadas com lápis marrom (3-5 pontinhos por bochecha — não exagere), batom vermelho ou rosado, cílios marcados. Para versão chique, pule o dentinho preto e mantenha as sardas naturais. Para criadora de conteúdo, glitter dourado nos olhos elege o look para Instagram.',
  },
  {
    q: 'Posso usar vestido de chita em casamento de festa junina?',
    a: 'Sim — é cada vez mais comum. Pré-wedding e casamentos temáticos juninos no campo aceitam (e pedem) vestido de chita. Para convidada, opte por modelo midi ou longo bem cortado, em chita de qualidade ou linho cru. Para noiva: vestido de chita personalizado por costureira é tendência forte para casamentos no interior em junho. Acessorize com flores naturais e véu curto se quiser.',
  },
  {
    q: 'Como ver como o look festa junina fica em mim antes de comprar?',
    a: 'O Agalaz permite testar qualquer roupa virtualmente em sua foto real. Suba uma foto sua e a foto do vestido, camisa xadrez ou look completo que você quer experimentar — a IA mostra como fica em VOCÊ em 30 segundos. Primeiro render grátis, sem cartão. Útil para evitar comprar uma chita que parece linda na arara mas não combina com seu corpo ou tom de pele.',
  },
];
