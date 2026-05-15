/**
 * Round-8 — Top 4 highest-volume new landings from the ghost-keyword audit.
 *
 *  PT-BR unhas decoradas:    368K/mo, KD 0
 *  PT-BR corte cabelo fem:   246K/mo, KD 0
 *  PT-BR vestido de noiva:   165K/mo, KD 5
 *  FR robe de mariée:        110K/mo, KD 0
 *
 * Combined: ~900K/mo capturable. All 4 use the existing LongtailLandingTemplate.
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

/* ─────────────────── /pt/unhas-decoradas ─────────────────────────────────
 * 368K/mo head + cluster (em gel 201K + simples 90K+ variantes). KD 0.
 */
export const unhasDecoradasPT: LongtailContent = {
  lang: 'pt',
  category: 'nail',
  productLabel: 'As unhas que você quer testar',
  yourPhotoLabel: 'A foto da sua mão',
  yourPhotoHint: 'Mão aberta, dedos visíveis, boa luz',
  productHint: 'Referência (Pinterest, Instagram, salão…)',
  accent: 'nail',
  triptychSlug: 'virtual-nail-try-on',

  badge: 'Unhas Decoradas 2026 · IA',
  h1Top: 'Unhas decoradas 2026',
  h1Italic: 'teste qualquer design na sua mão em 30 seg.',
  hero:
    'Suba a foto da sua mão + a referência do design (Pinterest, Insta, foto do salão) e a IA aplica em 30 segundos. Grátis, sem cadastro, sem download.',
  ctaPrimary: 'Testar unhas decoradas',
  ctaCaption: '✓ Grátis · ✓ Sem cadastro · ✓ 30 seg',

  whatTitle: 'Por que unhas decoradas dominam o Brasil em 2026',
  whatBody:
    'O Brasil é o segundo maior mercado mundial de nail art (depois dos EUA). Em 2026 as unhas decoradas em gel são as mais procuradas porque duram 3-4 semanas com a decoração intacta, ao contrário do esmalte normal que descasca em 5-7 dias. Os designs mais virais no TikTok BR: francesinha colorida, glazed donut, unhas bicolores, baby boomer (degradê), unhas pretas decoradas, e flores 3D minimalistas.',
  howKnowTitle: 'Como decidir o design antes da manicure',
  howKnowBullets: [
    'Suba uma foto clara da sua mão (palma ou costas)',
    'Suba a referência do design (Pinterest, Instagram, foto do salão)',
    'A IA aplica o design exato em 30 segundos',
    'Compare 3-4 alternativas lado a lado',
    'Chegue na manicure com a decisão pronta — sem dúvidas',
  ],

  recommendedBadge: 'Designs mais pedidos 2026',
  recommendedTitle: 'Unhas decoradas que vais ver em todos os salões',
  recommended: [
    { name: 'Unhas decoradas em gel (a mais durável)', why: 'Decoração selada sob top coat de gel UV — dura 3-4 semanas sem descascar. A escolha rentável para quem faz manicure mensal.' },
    { name: 'Unhas decoradas simples (minimalismo)', why: 'Esmalte sólido + 1-2 detalhes pequenos (linha dourada, ponto, mini flor). Elegantes, fáceis, duram mais que designs cheios.' },
    { name: 'Francesinha colorida (coral, lilás, menta)', why: 'A francesinha clássica mas com a ponta em cor pastel saturada baixa em vez de branco. Tendência forte em 2026.' },
    { name: 'Glazed donut nacarado', why: 'Efeito cromado perlado em base nude ou rosa pálido. Hailey Bieber viralizou, ainda forte 2026.' },
    { name: 'Unhas baby boomer (degradê suave)', why: 'Transição nude → branco sem linha visível. Look editorial/casamento. Dura bem em gel.' },
    { name: 'Unhas decoradas com flores 3D', why: 'Microflores em relevo aplicadas com acrílico + selo de gel. 1-2 unhas por mão, resto liso.' },
    { name: 'Unhas pretas decoradas (matte ou brilho)', why: 'Preto com 1 unha de destaque dourada ou prateada. Edgy mas usável no dia a dia.' },
    { name: 'Unhas decoradas bicolores', why: 'Duas cores complementares (1 unha cada). Atrevido mas dentro do bom gosto.' },
  ],

  avoidBadge: 'Erros típicos',
  avoidTitle: 'Erros comuns com unhas decoradas',
  avoid: [
    { name: 'Decorar as 10 unhas com nail art elaborado', why: 'Confunde visualmente e cansa em 3 dias. Regra: 1-2 unhas decoradas por mão, o resto sólido.' },
    { name: 'Glitter sem top coat de gel', why: 'O glitter solto sem selo descasca em 24-48h. Pede sempre selo de gel sobre o glitter.' },
    { name: 'Stickers de baixa qualidade', why: 'Stickers baratos despregam-se na primeira semana. Investe em stickers + selo gel ou desiste deles.' },
  ],

  midCtaTitle: 'Antes de gastar R$80-150 na sessão',
  midCtaBody:
    'Ver um design no Pinterest é uma coisa. Ver na SUA mão real (tom de pele, formato de unha, comprimento) é outra. Decida com a IA: primeiro render grátis, sem cadastro, sem cartão.',
  midCtaButton: 'Testar unhas decoradas',

  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Quais são as unhas decoradas mais populares no Brasil em 2026?',
      a: 'Francesinha colorida, glazed donut nacarado, baby boomer (degradê) e unhas em gel decoradas com detalhes dourados são as 4 mais pedidas nos salões do Brasil. Coquette com lacinhos rosa continua forte no público jovem.',
    },
    {
      q: 'Unhas decoradas em gel duram quanto tempo?',
      a: '3-4 semanas com a decoração intacta SE selada com top coat de gel. Sem o selo, a decoração descasca em 1 semana. Sempre peça selo de gel sobre nail art.',
    },
    {
      q: 'Funciona em unhas curtas?',
      a: 'Sim — micro-french, glazed donut, milky white, francesinha colorida funcionam perfeitamente em unhas curtas. Só evite nail art muito elaborado em unhas com menos de 8mm.',
    },
    {
      q: 'Quanto custa unhas decoradas no Brasil?',
      a: 'Esmalte normal decorado: R$30-60. Gelish/semipermanente decorado: R$80-150. Gel construído com nail art elaborado: R$150-300. Preços médios SP/RJ.',
    },
    {
      q: 'A IA respeita o brilho gel ou efeito glazed do design?',
      a: 'Sim. A IA preserva acabamentos (matte, gel brilhante, cromado, glazed, perlado). Suba a referência com o acabamento desejado e você verá reproduzido na sua mão.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador unhas',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/simulador-unhas',
};

/* ─────────────────── /pt/corte-de-cabelo-feminino ────────────────────────
 * 246K/mo head + cluster (curtíssimo 201K + médio/longo variantes). KD 0.
 */
export const corteCabeloFemininoPT: LongtailContent = {
  lang: 'pt',
  category: 'hairstyle',
  productLabel: 'Referência de corte',
  accent: 'hair',

  badge: 'Corte de Cabelo Feminino · IA',
  h1Top: 'Corte de cabelo feminino 2026',
  h1Italic: 'curto, médio, longo com provador IA.',
  hero:
    'Corte de cabelo feminino 2026: curtíssimo, curto, médio, longo, com franja, em camadas, chanel, long bob, wolf cut. Carrega a tua foto, escolhe a referência e a IA aplica o corte exato no teu rosto em 30 segundos antes do salão.',
  ctaPrimary: 'Testar corte',
  ctaCaption: 'Grátis · Sem download · 30 seg',

  whatTitle: 'Os 8 cortes que vão dominar 2026',
  whatBody:
    'Em 2026 vemos o regresso do curtíssimo (estilo Audrey Tautou anos 2000), a consolidação do wolf cut em versão suave (asiático), o long bob com franja a tendina como corte mais versátil, e o corte curto em camadas com franja lateral para rostos redondos. A franja "francesinha" (curtain bangs) é o detalhe mais pedido em 2026.',
  howKnowTitle: 'Antes do salão',
  howKnowBullets: [
    'Carrega uma foto clara do teu rosto (de frente ou 3/4)',
    'Carrega a referência do corte (Pinterest, Instagram, foto da revista)',
    'A IA aplica o corte exato no teu rosto em 30 segundos',
    'Compara 3-4 cortes lado a lado: chanel vs wolf vs longo',
    'Chega ao cabeleireiro com a decisão tomada',
  ],

  recommendedBadge: 'Tendências 2026',
  recommendedTitle: 'Cortes de cabelo feminino mais pedidos',
  recommended: [
    { name: 'Corte de cabelo curtíssimo (pixie cut)', why: 'O regresso. Audrey Tautou, Florence Pugh, Emma Watson — todas voltaram ao curtíssimo. Funciona em rostos com traços marcados.' },
    { name: 'Wolf cut feminino', why: 'Híbrido entre shag e mullet. Camadas no topo + comprimento nas pontas. Versátil para qualquer formato de rosto.' },
    { name: 'Long bob (lob) com franja a tendina', why: 'O corte mais versátil de 2026. Termina na clavícula + franjinha aberta. Combina com tudo, funciona em qualquer cabelo.' },
    { name: 'Chanel curto', why: 'O chanel clássico até ao queixo. Elegante, atemporal, funciona em cabelo liso e ondulado.' },
    { name: 'Corte médio em camadas', why: 'Médio (ombros) com camadas voluminosas. A escolha "segura" — funciona em 90% das mulheres sem riscos.' },
    { name: 'Cabelo longo com camadas internas', why: 'Comprimento mantido mas com camadas internas que dão movimento. Para quem não quer cortar mas precisa de volume.' },
    { name: 'Corte de cabelo curto com franja lateral', why: 'Especial para rosto redondo — a franja lateral em diagonal afina visualmente.' },
    { name: 'Curtain bangs (franjinha a tendina)', why: 'NÃO é um corte — é um detalhe adicionável a QUALQUER comprimento. Emoldura o rosto, fácil de manter.' },
  ],

  avoidBadge: 'Cuidado com',
  avoidTitle: 'Erros comuns ao escolher corte',
  avoid: [
    { name: 'Cortar curtíssimo sem pensar no formato do rosto', why: 'O pixie cut não funciona em todos os rostos. Para rosto redondo: precisa de volume no topo. Para rosto quadrado: linhas mais suaves.' },
    { name: 'Franja completa em cabelo crespo sem alisamento', why: 'A franja completa em cabelo cacheado requer manutenção diária. Melhor: franja a tendina (curtain bangs) que aceita textura.' },
    { name: 'Wolf cut sem comprometimento de styling', why: 'O wolf cut requer secagem com texturização diária. Sem styling, parece cabelo precisando de corte.' },
  ],

  midCtaTitle: 'Testa o corte ANTES de cortar',
  midCtaBody:
    'Um corte errado leva 6-12 meses a crescer. A IA mostra-te EXATAMENTE como o corte ficará no teu rosto real (tom de pele, formato, raiz). Decide com dados. Primeiro render grátis.',
  midCtaButton: 'Testar corte no meu rosto',

  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Qual o melhor corte de cabelo feminino para rosto redondo?',
      a: 'Long bob com franja a tendina ou corte médio em camadas. Ambos alongam visualmente o rosto. Evita chanel reto no queixo (acentua a redondeza).',
    },
    {
      q: 'Corte de cabelo curto feminino fica bem em todas as idades?',
      a: 'Sim, com adaptação. Aos 20-30 anos: pixie cut moderno com franja. Aos 40+: chanel curto ou pixie suave que mantém movimento. Em qualquer idade, evita o corte muito redondo (efeito "capacete").',
    },
    {
      q: 'Corte médio com camadas é difícil de manter?',
      a: 'Não — é dos cortes mais fáceis. Lavar, secar com difusor (se tiveres cabelo ondulado) ou escovar com round brush (se for liso). 5-10 min de manutenção diária.',
    },
    {
      q: 'Wolf cut feminino funciona em cabelo liso e fino?',
      a: 'Funciona MAS requer styling diário com mousse e secagem com textura. Se preferes wash-and-go, opta por long bob em camadas que precisa menos esforço.',
    },
    {
      q: 'A IA mostra o corte com a minha cor de cabelo real?',
      a: 'Sim. A IA preserva a tua cor de cabelo atual, tom de pele, formato do rosto e raiz. Apenas o corte muda. Carrega a foto + referência e vê o resultado em 30 seg.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador cortes',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/provador-penteados',
};

/* ─────────────────── /pt/vestido-de-noiva ────────────────────────────────
 * 165K/mo head + cluster (civil 27K × 2). KD 5.
 */
export const vestidoDeNoivaPT: LongtailContent = {
  lang: 'pt',
  category: 'clothing',
  productLabel: 'Referência vestido noiva',
  accent: 'hair',

  badge: 'Vestido de Noiva · IA',
  h1Top: 'Vestido de noiva 2026',
  h1Italic: 'civil, sereia, princesa com provador IA.',
  hero:
    'Vestido de noiva 2026: civil, sereia, princesa, decote V, costas abertas, longo, midi, simples ou bordado. Carrega a tua foto e prova qualquer vestido com IA antes de marcar a prova na loja. 30 segundos, grátis, sem cartão.',
  ctaPrimary: 'Provar vestido noiva',
  ctaCaption: 'Grátis · Sem download · 30 seg',

  whatTitle: 'O que considerar antes de marcar prova de vestido de noiva',
  whatBody:
    'Marcar prova de vestido sem ter pensado no estilo é desperdiçar 3-4 horas em loja. As decisões prévias: civil ou cerimônia religiosa, longo ou midi, princesa (saia volumosa) vs sereia (justo) vs corte A, decote (V, coração, ombro a ombro, decote nas costas), e orçamento (R$3K-30K em vestido nupcial BR). A IA acelera esta decisão — testa 5-10 estilos na tua foto antes do showroom.',
  howKnowTitle: 'Antes do showroom de noivas',
  howKnowBullets: [
    'Carrega a tua foto de corpo inteiro',
    'Carrega a referência do vestido (Pinterest, Instagram, catálogo da loja)',
    'A IA aplica o vestido no teu corpo em 30 segundos',
    'Compara 5-10 estilos: civil, sereia, princesa, simples',
    'Chega à prova sabendo EXATAMENTE o estilo certo — pouparás horas',
  ],

  recommendedBadge: 'Estilos 2026',
  recommendedTitle: 'Vestidos de noiva mais pedidos',
  recommended: [
    { name: 'Vestido de noiva civil', why: 'Curto ou midi, leve, sem véu, ideal para casamento cartório. Tendência forte em 2026 — casais que preferem celebrações íntimas.' },
    { name: 'Vestido de noiva sereia', why: 'Justo até aos joelhos + cauda alargada. Realça curvas. Funciona em silhuetas ampulheta e pêra.' },
    { name: 'Vestido de noiva princesa', why: 'Saia ampla, corpete justo. O sonho clássico. Para casamentos de igreja ou eventos grandes.' },
    { name: 'Vestido com decote V profundo', why: 'Estiliza, alarga o pescoço, sofisticado. Combina com colar fino ou nenhum.' },
    { name: 'Vestido com costas abertas', why: 'Frente discreta + costas que arrasam nas fotos de saída da cerimônia. Cinematográfico.' },
    { name: 'Vestido de noiva simples (minimalista)', why: 'Tecido nobre + corte limpo + zero bordados. Modernidade pura. Para noivas que dispensam excessos.' },
    { name: 'Vestido bordado com pedrarias', why: 'Para noivas que querem brilho. Mais caro, mais elaborado, mais "WOW factor" nas fotos.' },
    { name: 'Vestido de noiva longo + capa removível', why: 'Tendência 2026: cerimônia com capa, festa sem capa. Dois looks num só vestido.' },
  ],

  avoidBadge: 'Erros típicos',
  avoidTitle: 'Erros caros ao escolher vestido',
  avoid: [
    { name: 'Marcar prova sem ter ideia de estilo', why: 'Desperdiças 3-4h experimentando 20 vestidos aleatórios. Filtra antes a estilos prévios com IA.' },
    { name: 'Ignorar a estação do casamento', why: 'Vestido pesado bordado + casamento ao ar livre em janeiro BR (40°C) = desidratação garantida. Tecido leve para verão.' },
    { name: 'Comprar online sem prova nem ajustes', why: 'Vestidos de noiva precisam ajuste de cintura, ombros, comprimento. Mesmo "pronto" precisa modificações.' },
  ],

  midCtaTitle: 'Filtra 5-10 estilos ANTES da prova na loja',
  midCtaBody:
    'A prova de vestidos é exaustiva. Em vez de experimentar 20 vestidos aleatórios na loja, testa 5-10 com IA antes — chega à prova sabendo o estilo. Primeiro render grátis.',
  midCtaButton: 'Provar vestido na minha foto',

  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Vestido de noiva civil — quais estilos funcionam?',
      a: 'Para civil: vestido midi (até joelho ou panturrilha), tecido leve (crepe, georgette), corte A ou ombro-a-ombro. Evita cauda longa e véu — desproporcionais para cartório.',
    },
    {
      q: 'Vestido de noiva sereia funciona em corpo curvy?',
      a: 'Sim — é dos cortes mais favorecedores para curvy. O corte sereia abraça as curvas. Importante: corpete bem estruturado para sustentar.',
    },
    {
      q: 'Vestido de noiva princesa em casamento intimista?',
      a: 'Pode parecer dramático demais para evento pequeno (<30 convidados). Se queres volume, opta por corte A (versão "princesa light") em vez do princesa puro.',
    },
    {
      q: 'Quanto custa vestido de noiva no Brasil em 2026?',
      a: 'Aluguel: R$1.500-5.000. Pronto-a-vestir loja média: R$3.000-10.000. Sob medida atelier: R$8.000-30.000. Designer renomado: R$25.000+.',
    },
    {
      q: 'A IA mostra como cai o vestido no meu corpo real?',
      a: 'Sim. A IA respeita as tuas proporções (altura, ombros, cintura, anca) e mostra como cai o vestido na TUA silhueta — não numa modelo de showroom. Útil para evitar surpresas na prova.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador vestido',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/provador-vestido-noiva',
};

/* ─────────────────── /fr/robe-de-mariee ──────────────────────────────────
 * 110K/mo head + cluster (bohémienne 14.8K × 2 + autres). KD 0.
 */
export const robeDeMarieeFR: LongtailContent = {
  lang: 'fr',
  category: 'clothing',
  productLabel: 'Référence robe mariée',
  accent: 'hair',

  badge: 'Robe de Mariée · IA',
  h1Top: 'Robe de mariée 2026',
  h1Italic: 'bohème, sirène, princesse avec essayage IA.',
  hero:
    "Robe de mariée 2026 : bohémienne, sirène, princesse, décolleté V, dos nu, longue, courte, simple ou brodée. Téléchargez votre photo et essayez n'importe quelle robe avec IA avant le showroom. 30 secondes, gratuit, sans carte.",
  ctaPrimary: 'Essayer robe mariée',
  ctaCaption: 'Gratuit · Sans téléchargement · 30 sec',

  whatTitle: 'Avant de réserver l\'essayage en boutique',
  whatBody:
    "Aller en boutique sans avoir filtré le style à l'avance = 3-4h gaspillées en essayant 20 robes au hasard. Les décisions préalables : cérémonie civile vs religieuse, longue vs courte, sirène (moulante) vs princesse (volume) vs coupe A, décolleté (V, cœur, bardot, dos nu), et budget (entre 800€ et 15.000€+ en France). L'IA accélère cette présélection — testez 5-10 styles sur votre photo avant le rendez-vous.",
  howKnowTitle: 'Avant le showroom de mariées',
  howKnowBullets: [
    'Téléchargez votre photo en pied',
    'Téléchargez la référence de la robe (Pinterest, Instagram, catalogue créateur)',
    "L'IA applique la robe sur votre corps en 30 secondes",
    'Comparez 5-10 styles : bohème, sirène, princesse, simple',
    'Arrivez en boutique avec le style choisi — vous économiserez des heures',
  ],

  recommendedBadge: 'Styles 2026',
  recommendedTitle: 'Robes de mariée les plus demandées',
  recommended: [
    { name: 'Robe de mariée bohémienne / bohème', why: 'Tendance forte 2026 : dentelle, manches longues fluides, ceinture haute, peu structurée. Pour mariages champêtres, plages, vignobles.' },
    { name: 'Robe de mariée sirène', why: 'Moulante jusqu\'aux genoux + traîne évasée. Sublime les courbes. Idéale pour silhouettes en sablier ou poire.' },
    { name: 'Robe de mariée princesse', why: 'Jupe ample, bustier ajusté. Le rêve classique. Pour mariages religieux ou grands événements.' },
    { name: 'Robe avec décolleté V profond', why: 'Allonge le cou, sophistiquée, à la fois classique et moderne. Combinez avec collier fin ou sans bijou.' },
    { name: 'Robe avec dos nu', why: 'Devant discret + dos vertigineux qui crève l\'écran à la sortie de l\'église. Look cinématographique.' },
    { name: 'Robe de mariée simple / minimaliste', why: 'Tissu noble + coupe épurée + zéro broderie. La modernité pure. Pour mariées sans excès.' },
    { name: 'Robe brodée avec pierres / sequins', why: 'Pour les mariées qui veulent briller. Plus chère, plus élaborée, effet WOW garanti sur les photos.' },
    { name: 'Robe courte (mariage civil ou cocktail)', why: 'Mi-cuisse ou midi, tissu léger, sans voile. Tendance pour mairie et cérémonies intimistes.' },
  ],

  avoidBadge: 'Évitez',
  avoidTitle: 'Erreurs coûteuses lors du choix de robe',
  avoid: [
    { name: 'Réserver l\'essayage sans avoir filtré un style', why: 'Vous gaspillerez 3-4h à essayer 20 robes au hasard. Pré-filtrez les styles avec IA.' },
    { name: 'Ignorer la saison du mariage', why: 'Robe lourde brodée + mariage en juillet en Provence (35°C) = déshydratation. Tissus légers pour l\'été, plus structurés pour l\'hiver.' },
    { name: 'Acheter en ligne sans essayer ni retouche', why: 'Les robes de mariée demandent presque toujours des retouches (taille, épaules, longueur). Même "prêt-à-porter" nécessite des modifications.' },
  ],

  midCtaTitle: 'Filtrez 5-10 styles AVANT le showroom',
  midCtaBody:
    "L'essayage en boutique est épuisant. Au lieu de tester 20 robes au hasard sur place, testez 5-10 avec IA d'abord — arrivez chez le créateur avec le style choisi. Premier rendu gratuit.",
  midCtaButton: 'Essayer robe sur ma photo',

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Robe de mariée bohémienne — quelle morphologie ?',
      a: 'La robe bohémienne convient à toutes les morphologies grâce à sa coupe peu structurée. Particulièrement flatteuse sur silhouette en sablier ou en H. Pour silhouette ronde, choisissez la version avec ceinture haute.',
    },
    {
      q: 'Robe de mariée sirène fonctionne-t-elle sur corps curvy ?',
      a: 'Oui — c\'est l\'une des coupes les plus flatteuses pour curvy. Elle épouse les courbes. Important : bustier bien structuré pour le soutien.',
    },
    {
      q: 'Robe de mariée princesse pour mariage intimiste ?',
      a: 'Peut paraître trop dramatique pour un petit événement (<30 invités). Si vous voulez du volume, optez pour coupe A (version "princesse light") plutôt que princesse pure.',
    },
    {
      q: 'Combien coûte une robe de mariée en France en 2026 ?',
      a: 'Location : 400-1.500€. Prêt-à-porter boutique moyenne : 800-3.000€. Sur mesure créateur : 2.500-15.000€. Designer renommé : 10.000€+.',
    },
    {
      q: "L'IA montre-t-elle comment tombe la robe sur mon corps réel ?",
      a: "Oui. L'IA respecte vos proportions (taille, épaules, hanches) et montre comment la robe tombe sur VOTRE silhouette — pas sur un mannequin de showroom. Utile pour éviter les surprises lors de l'essayage en boutique.",
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Essayage robe',
  privacyLabel: 'Confidentialité',
  tryOnHref: '/fr/essayage-robe-mariee',
};
