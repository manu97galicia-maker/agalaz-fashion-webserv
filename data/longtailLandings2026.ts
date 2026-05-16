/**
 * Content data for the 5 round-3 ultra-easy long-tail landings shipped
 * 2026-05-11. Each block targets a DataForSEO-verified cluster of low-KD
 * (≤3) localized queries where the SERP is dominated by Pinterest +
 * small national blogs — beatable by a young domain with good content.
 *
 * Lives in /data so server-side metadata (layout.tsx) and the client
 * landing component share one source of truth.
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

/* ───────────────────────── /fr/coupe-cheveux-visage-rond ────────────────────
 * Cluster: ~7,920/mo total. KD 0. SERP top 3: Pinterest, Camille Albane,
 * Franck Provost, L'Oréal Paris, Atol. Soft.
 */
export const coupeCheveuxVisageRond: LongtailContent = {
  lang: 'fr',
  category: 'hairstyle',
  productLabel: 'Référence coupe',
  accent: 'hair',
  theme: 'face-round-haircut',

  badge: 'Visage rond · Coiffure IA',
  h1Top: 'Coupe de cheveux pour',
  h1Italic: 'visage rond.',
  hero:
    'Quelle coupe choisir quand on a un visage rond ? On a testé carrés plongeants, longues mèches, courtes avec ou sans frange, et coupes ultra courtes — visualisées sur votre vraie photo en 30 secondes avec l\'IA, sans monter chez le coiffeur.',
  ctaPrimary: 'Essayer une coupe',
  ctaCaption: 'Gratuit · Sans téléchargement · 30 sec',

  whatTitle: 'Qu\'est-ce qu\'un visage rond ?',
  whatBody:
    'Un visage rond a une largeur et une hauteur quasi égales, des pommettes pleines, un menton arrondi et une mâchoire douce. L\'objectif d\'une bonne coupe : allonger visuellement le visage et créer du volume sur le haut sans élargir les côtés.',
  howKnowTitle: 'Comment savoir si vous avez un visage rond',
  howKnowBullets: [
    'Largeur du front ≈ largeur des pommettes ≈ largeur de la mâchoire',
    'Menton arrondi, sans angles marqués',
    'Pommettes pleines, joues volumineuses',
    'Longueur du visage proche de la largeur (rapport 1:1)',
    'Mâchoire douce, sans coupure nette',
  ],

  recommendedBadge: 'Meilleures coupes',
  recommendedTitle: 'Coupes qui flattent un visage rond',
  recommended: [
    { name: 'Carré long plongeant', why: 'Plonge vers l\'avant, allonge le visage et l\'amincit en cachant partiellement les joues.' },
    { name: 'Long layers avec mèches encadrantes', why: 'Les longueurs verticales étirent visuellement. Les mèches latérales structurent les pommettes.' },
    { name: 'Coupe courte avec volume sur le dessus', why: 'Pixie cut ou crop volumisé : ajoute de la hauteur, casse l\'effet rondeur.' },
    { name: 'Frange rideau (curtain bangs)', why: 'Encadre les yeux, brise la rondeur des joues sans alourdir comme une frange droite.' },
    { name: 'Bob asymétrique', why: 'Une longueur plus marquée d\'un côté casse la symétrie et redessine l\'ovale.' },
    { name: 'Coupe ultra courte (femme cheveux gris inclus)', why: 'Très flatteur si le port de tête est dégagé. Met en valeur les os du visage et donne du caractère.' },
    { name: 'Coiffure avec frange latérale', why: 'Une mèche en diagonale brise la rondeur du front sans réduire la largeur.' },
    { name: 'Lob (long bob) au menton', why: 'Tombant juste sous le menton, il étire visuellement la zone basse du visage.' },
  ],

  avoidBadge: 'À éviter',
  avoidTitle: 'Coupes qui ne flattent pas un visage rond',
  avoid: [
    { name: 'Carré au menton très droit', why: 'Coupe horizontale qui souligne la largeur des joues au lieu de l\'allonger.' },
    { name: 'Frange droite épaisse', why: 'Raccourcit visuellement le front et rend le visage encore plus rond.' },
    { name: 'Coupe courte plaquée sans volume', why: 'Sans volume sur le dessus, le visage paraît tassé.' },
    { name: 'Coupe au carré aux longueurs identiques', why: 'Aucun mouvement vertical → effet ballon.' },
  ],

  midCtaTitle: 'Essayez la coupe sur votre photo d\'abord',
  midCtaBody:
    'Lire un article sur les coupes, c\'est une chose. Voir le carré plongeant ou la frange rideau sur VOTRE vrai visage — votre teint, votre structure, votre racine — c\'est ce qui décide. Premier essai gratuit, sans inscription.',
  midCtaButton: 'Essayer une coupe sur ma photo',

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Quelle coupe de cheveux courte pour un visage rond ?',
      a: 'Pixie cut volumisé, crop avec hauteur sur le dessus, ou coupe ultra courte avec mèches latérales. La règle : du volume vers le haut, pas sur les côtés.',
    },
    {
      q: 'Quelle coupe avec des lunettes et un visage rond ?',
      a: 'Long layers ou carré plongeant fonctionnent très bien avec des lunettes — l\'IA vous permet de tester monture + coupe ensemble. Évitez la frange droite épaisse qui s\'ajoute aux montures et alourdit le haut.',
    },
    {
      q: 'Peut-on porter une frange avec un visage rond ?',
      a: 'Oui — frange rideau, frange latérale ou effilée. Évitez la frange droite épaisse qui horizontalise le front.',
    },
    {
      q: 'Le carré court va-t-il sur un visage rond ?',
      a: 'Oui si c\'est un carré plongeant ou asymétrique. Évitez le carré aux longueurs strictement égales qui souligne la rondeur.',
    },
    {
      q: 'L\'essayage IA respecte-t-il mon vrai visage ?',
      a: 'Oui. L\'IA préserve la couleur de vos yeux, la forme de votre menton, votre teint et votre expression. Elle ne change que la coupe.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Essayage virtuel',
  privacyLabel: 'Confidentialité',
  tryOnHref: '/fr/try-on?category=hairstyle',
};

/* ───────────────────────── /pt/corte-cabelo-rosto-redondo ───────────────────
 * Cluster: ~3,600/mo total. KD 0. SERP top 3: Pinterest, blogs BR
 * (allthingshair, taaora-style), TikTok. Soft.
 */
export const corteCabeloRostoRedondo: LongtailContent = {
  lang: 'pt',
  category: 'hairstyle',
  productLabel: 'Referência de corte',
  accent: 'hair',
  theme: 'face-round-haircut',

  badge: 'Rosto redondo · Cabelo IA',
  h1Top: 'Corte de cabelo para',
  h1Italic: 'rosto redondo.',
  hero:
    'Qual corte funciona quando o rosto é redondo? Testamos chanel longo, cortes médios em camadas, franja lateral e cortes assimétricos — tudo visualizado na sua foto real em 30 segundos com IA, antes de ir ao salão.',
  ctaPrimary: 'Experimentar corte',
  ctaCaption: 'Grátis · Sem download · 30 seg',

  whatTitle: 'O que é um rosto redondo?',
  whatBody:
    'Um rosto redondo tem largura e altura quase iguais, maçãs cheias, queixo arredondado e mandíbula suave. O objetivo de um bom corte: alongar visualmente o rosto e criar volume no topo sem alargar os lados.',
  howKnowTitle: 'Como saber se você tem rosto redondo',
  howKnowBullets: [
    'Largura da testa ≈ largura das maçãs ≈ largura da mandíbula',
    'Queixo arredondado, sem ângulos marcados',
    'Maçãs cheias, bochechas volumosas',
    'Comprimento do rosto próximo à largura (proporção 1:1)',
    'Mandíbula suave, sem corte nítido',
  ],

  recommendedBadge: 'Melhores cortes',
  recommendedTitle: 'Cortes que valorizam rosto redondo',
  recommended: [
    { name: 'Chanel longo (long bob)', why: 'Termina abaixo do queixo, alonga a parte inferior do rosto e cria movimento vertical.' },
    { name: 'Médio com camadas verticais', why: 'Camadas longas a partir das maçãs criam linhas que alongam o rosto.' },
    { name: 'Corte com franja lateral', why: 'Cria diagonal no rosto, quebrando a redondeza sem encurtar a testa.' },
    { name: 'Pixie volumoso no topo', why: 'Curto mas com altura — ganha estatura visual, contrasta com a redondeza.' },
    { name: 'Médio assimétrico', why: 'Comprimentos diferentes nos dois lados criam pontos de fuga visuais.' },
    { name: 'Curtain bangs (franja cortina)', why: 'Emoldura os olhos e suaviza as maçãs sem horizontalizar a testa.' },
    { name: 'Long layers até abaixo dos ombros', why: 'O comprimento alonga, as camadas tiram o efeito "bola" mantendo movimento.' },
    { name: 'Corte médio para rosto redondo com mechas iluminadas', why: 'Mechas claras nas laterais externas afinam visualmente; raiz mais escura adiciona contraste.' },
  ],

  avoidBadge: 'Evite',
  avoidTitle: 'Cortes que NÃO valorizam rosto redondo',
  avoid: [
    { name: 'Chanel curto no queixo, reto', why: 'Linha horizontal exatamente no ponto mais largo — destaca a redondeza.' },
    { name: 'Franja reta espessa', why: 'Encurta a testa visualmente e arredonda ainda mais o rosto.' },
    { name: 'Corte ultra liso colado nas laterais', why: 'Sem volume no topo, o rosto parece achatado e "embolado".' },
    { name: 'Comprimento sólido sem camadas', why: 'Sem movimento vertical → efeito balão.' },
  ],

  midCtaTitle: 'Teste o corte na sua foto antes do salão',
  midCtaBody:
    'Ler sobre cortes é uma coisa. Ver o chanel longo ou a franja lateral no SEU rosto real — tom de pele, estrutura óssea, linha do cabelo — é o que decide. Primeiro teste grátis, sem cadastro.',
  midCtaButton: 'Testar corte na minha foto',

  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Qual o melhor corte de cabelo para rosto redondo?',
      a: 'Chanel longo (long bob) e cortes médios em camadas com franja lateral são os mais versáteis. Ambos alongam o rosto sem cortar volume.',
    },
    {
      q: 'Corte de cabelo médio para rosto redondo, qual escolher?',
      a: 'Médio até abaixo dos ombros com camadas verticais e franja lateral. Evite cortes sólidos sem camadas — eles arredondam mais.',
    },
    {
      q: 'Posso usar franja com rosto redondo?',
      a: 'Sim — franja lateral, curtain bangs ou desfiada. Evite a franja reta cheia que horizontaliza a testa.',
    },
    {
      q: 'Corte de cabelo para rosto redondo com papada, o que funciona?',
      a: 'Long layers que passem abaixo do queixo + raiz com volume no topo. O objetivo: ponto focal acima do rosto, comprimento que mascara a papada.',
    },
    {
      q: 'A IA respeita meu rosto real no teste?',
      a: 'Sim. A IA preserva sua cor de olhos, formato do queixo, tom de pele e expressão. Apenas o corte muda.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/try-on?category=hairstyle',
};

/* ───────────────────────── /pt/unhas-curtas-ideias ──────────────────────────
 * Cluster: ~2,160/mo total. KD 0. SERP top 3: Pinterest × 3. Pure visual SERP
 * — perfect for virtual try-on.
 */
export const unhasCurtasIdeias: LongtailContent = {
  lang: 'pt',
  category: 'nail',
  productLabel: 'Referência da unha',
  accent: 'nail',
  theme: 'coquette-nails',

  badge: 'Unhas curtas · IA',
  h1Top: 'Ideias de unhas',
  h1Italic: 'curtas decoradas.',
  hero:
    'Inspiração de unhas curtas — simples, decoradas ou minimalistas — testadas na sua própria mão em 30 segundos com IA antes de marcar a manicure. Francesinha, esmalte cromado, nail art coquette, glazed donut: você vê tudo na sua mão real.',
  ctaPrimary: 'Experimentar unhas',
  ctaCaption: 'Grátis · Sem download · 30 seg',

  whatTitle: 'Por que unhas curtas funcionam tão bem',
  whatBody:
    'Unhas curtas são práticas, duram mais sem quebrar, e em 2026 voltaram a dominar tendências (clean girl, coquette, glazed). Pequenas em tamanho mas com infinitas possibilidades de design — desde simples nude até nail art completa.',
  howKnowTitle: 'Antes de marcar a manicure',
  howKnowBullets: [
    'Tire uma foto clara da sua mão real',
    'Faça upload de uma referência (Pinterest, Instagram, design da manicure)',
    'A IA aplica o design exato na sua mão em 30 segundos',
    'Veja se o tom combina com sua pele antes de pagar pela sessão',
    'Compare 3-4 designs lado a lado — sem custos extras',
  ],

  recommendedBadge: 'Designs em alta 2026',
  recommendedTitle: 'Ideias de unhas curtas para experimentar',
  recommended: [
    { name: 'Francesinha clássica curta', why: 'Ponta branca discreta sobre base nude. Atemporal e elegante em qualquer comprimento.' },
    { name: 'Glazed donut nails', why: 'Acabamento perolado, brilho cromado suave. Hailey Bieber fez explodir — funciona perfeito em formato curto.' },
    { name: 'Milky white nails', why: 'Branco leitoso translúcido. Clean girl puro, combina com qualquer roupa.' },
    { name: 'Coquette nails com laço rosa', why: 'Base rosa pálido + mini laço ou pérola. Romantic core, super em alta.' },
    { name: 'Unhas nude com glitter discreto', why: 'Base nude rosado + uma única unha com glitter suave. Sofisticado sem exagero.' },
    { name: 'Decoradas estilo flores minimalistas', why: 'Pequenas flores brancas ou cromadas em uma ou duas unhas. Atual e delicado.' },
    { name: 'French tip colorido', why: 'Mesma técnica da francesinha mas com cores: lilás, verde água, cobre. Variação moderna.' },
    { name: 'Unhas pretas curtas matte', why: 'Black sem brilho, formato amendoa curto. Estilo edgy mas elegante para o dia a dia.' },
  ],

  avoidBadge: 'Cuidado com',
  avoidTitle: 'Erros comuns em unhas curtas',
  avoid: [
    { name: 'Esmalte escuro em mãos pequenas', why: 'Preto e roxo escuro tendem a encurtar visualmente. Prefira tons nude ou opte por formato amendoa.' },
    { name: 'Decoração pesada em todas as unhas', why: 'Em unhas curtas, decoração demais polui. Regra: 1-2 unhas decoradas, resto liso.' },
    { name: 'Formato muito quadrado em mãos pequenas', why: 'Quadrado total faz a unha parecer ainda menor. Amendoa curta ou oval alonga visualmente.' },
  ],

  midCtaTitle: 'Teste o design na sua mão antes do salão',
  midCtaBody:
    'Ver uma foto de Pinterest é uma coisa. Ver o design na SUA mão real — sua pele, suas unhas — é outra. Marca uma manicure já sabendo qual design fica perfeito. Grátis, sem cadastro.',
  midCtaButton: 'Testar nas minhas unhas',

  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Quais ideias de unhas simples curtas estão em alta?',
      a: 'Milky white, glazed donut, francesinha clássica e nude com glitter discreto. Todas funcionam sem manutenção complicada.',
    },
    {
      q: 'Posso fazer unha decorada em unhas curtas?',
      a: 'Sim — a regra é decorar só 1 ou 2 unhas e manter o resto liso. Flores minimalistas, laços coquette ou glitter discreto são ideais.',
    },
    {
      q: 'A IA mostra o design na minha mão real?',
      a: 'Sim. Você faz upload da sua mão + uma referência (foto do Pinterest ou Instagram), e em 30 segundos a IA aplica o design exatamente nas suas unhas, mantendo sua pele e ângulo.',
    },
    {
      q: 'Qual formato de unha curta combina com mãos pequenas?',
      a: 'Amendoa curta ou oval. Elas alongam visualmente os dedos sem precisar de unha comprida.',
    },
    {
      q: 'Quanto custa testar?',
      a: 'Grátis o primeiro render. Sem cartão, sem cadastro obrigatório.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/try-on?category=nail',
};

/* ───────────────────────── /it/unghie-corte-semplici ────────────────────────
 * Cluster: ~3,600/mo total. KD 0. SERP top 3: Pinterest, Gamax, Vogue.it,
 * passionebeauty. Mixed — Vogue medium-hard, rest soft.
 */
export const unghieCorteSemplici: LongtailContent = {
  lang: 'it',
  category: 'nail',
  productLabel: 'Riferimento unghie',
  accent: 'nail',
  theme: 'coquette-nails',

  badge: 'Unghie corte · IA',
  h1Top: 'Unghie corte',
  h1Italic: 'semplici ma belle.',
  hero:
    'Idee di unghie corte semplici ed eleganti — francesina, milky white, glazed donut, unghie nude — provate sulla tua vera mano in 30 secondi con l\'IA prima di prenotare l\'estetista. Vedi se il design ti sta davvero, senza pagare.',
  ctaPrimary: 'Provare le unghie',
  ctaCaption: 'Gratis · Senza download · 30 sec',

  whatTitle: 'Perché le unghie corte sono di nuovo di tendenza',
  whatBody:
    'Le unghie corte sono pratiche, durano di più senza spezzarsi, e nel 2026 dominano le tendenze (clean girl, coquette, glazed). Forma piccola ma con infinite possibilità di design — dal semplice nude alla nail art completa.',
  howKnowTitle: 'Prima di prenotare l\'estetista',
  howKnowBullets: [
    'Scatta una foto chiara della tua mano',
    'Carica una referenza (Pinterest, Instagram, foto del salone)',
    'L\'IA applica il design esatto sulla tua mano in 30 secondi',
    'Vedi se la tonalità si abbina al tuo incarnato prima di pagare',
    'Confronta 3-4 design fianco a fianco — senza costi extra',
  ],

  recommendedBadge: 'Idee 2026',
  recommendedTitle: 'Forme e design di unghie corte da provare',
  recommended: [
    { name: 'Francese classica corta', why: 'Punta bianca sottile su base nude. Senza tempo, elegante a qualsiasi lunghezza.' },
    { name: 'Glazed donut nails', why: 'Effetto perlato, riflesso cromato delicato. Lanciate da Hailey Bieber, perfette in formato corto.' },
    { name: 'Milky white nails', why: 'Bianco latte traslucido. Clean girl puro, abbinabile a qualunque outfit.' },
    { name: 'Forma mandorla corta', why: 'Allunga visivamente le dita senza bisogno di unghie lunghe. Versatile per ogni design.' },
    { name: 'Coquette con fiocchetto rosa', why: 'Base rosa pallido + mini fiocco o perla. Romantic core in piena tendenza.' },
    { name: 'Unghie corte estate 2025', why: 'Tonalità coral, sorbet, milky pink. Saturazione bassa, look fresco e abbronzato.' },
    { name: 'Unghie corte autunno', why: 'Burgundy, ruggine, cioccolato. Su forma quadrata-ovale corta — sofisticato e caldo.' },
    { name: 'Decorate fiori minimal', why: 'Piccoli fiori bianchi o cromati su una o due unghie. Attuale, delicato, non eccessivo.' },
  ],

  avoidBadge: 'Evita',
  avoidTitle: 'Errori comuni sulle unghie corte',
  avoid: [
    { name: 'Smalto scuro su mani piccole', why: 'Nero e prugna tendono ad accorciare visivamente. Meglio nude o forma mandorla corta.' },
    { name: 'Decoro pesante su tutte le unghie', why: 'Su unghie corte troppo decoro confonde. Regola: 1-2 unghie decorate, le altre liscie.' },
    { name: 'Forma quadrata netta su dita corte', why: 'Il quadrato puro accorcia ulteriormente. Mandorla corta o ovale allungano.' },
  ],

  midCtaTitle: 'Prova il design sulla tua mano prima dell\'estetista',
  midCtaBody:
    'Vedere una foto Pinterest è una cosa. Vedere il design sulla TUA mano vera — la tua pelle, le tue unghie — è un\'altra. Prenoti già sapendo quale design ti sta. Gratis, senza registrazione.',
  midCtaButton: 'Provare sulle mie unghie',

  faqTitle: 'Domande frequenti',
  faq: [
    {
      q: 'Quali forme di unghie corte sono più di tendenza?',
      a: 'Mandorla corta e ovale dominano il 2026. Il quadrato classico funziona solo su dita lunghe.',
    },
    {
      q: 'Quali unghie corte semplici per ogni giorno?',
      a: 'Milky white, glazed donut, nude rosato e francesina classica. Tutte facili da mantenere e abbinabili a qualunque outfit.',
    },
    {
      q: 'Posso fare nail art su unghie corte?',
      a: 'Sì — la regola è decorare solo 1-2 unghie e lasciare le altre lisce. Fiori minimal, fiocchetti coquette o glitter sottile sono ideali.',
    },
    {
      q: 'L\'IA mostra il design sulla mia mano vera?',
      a: 'Sì. Carichi una foto della tua mano + una referenza (Pinterest o Instagram), e in 30 secondi l\'IA applica il design esatto sulle tue unghie, rispettando la tua pelle e l\'angolazione.',
    },
    {
      q: 'Quanto costa provare?',
      a: 'Gratis il primo render. Senza carta, senza registrazione obbligatoria.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Prova',
  privacyLabel: 'Privacy',
  tryOnHref: '/it/try-on?category=nail',
};

/* ───────────────────────── /it/taglio-capelli-viso-tondo ────────────────────
 * Cluster: ~1,440/mo total. KD 0. SERP: Pinterest, Harpers Bazaar, Vogue.it,
 * passionebeauty. Medium-soft (Vogue is hard, but Pinterest dominates).
 */
export const taglioCapelliVisoTondo: LongtailContent = {
  lang: 'it',
  category: 'hairstyle',
  productLabel: 'Riferimento taglio',
  accent: 'hair',
  theme: 'face-round-haircut',

  badge: 'Viso tondo · Capelli IA',
  h1Top: 'Taglio di capelli per',
  h1Italic: 'viso tondo.',
  hero:
    'Quale taglio sta bene su un viso tondo e paffuto? Abbiamo testato caschetti lunghi, layer scalati, pixie volumizzati e frange laterali — visualizzati sulla tua foto reale in 30 secondi con l\'IA, prima di sederti dal parrucchiere.',
  ctaPrimary: 'Provare un taglio',
  ctaCaption: 'Gratis · Senza download · 30 sec',

  whatTitle: 'Cos\'è un viso tondo?',
  whatBody:
    'Un viso tondo ha larghezza e altezza quasi uguali, zigomi pieni, mento arrotondato e mandibola morbida. L\'obiettivo di un buon taglio: allungare visivamente il viso e creare volume sulla parte alta senza allargare i lati.',
  howKnowTitle: 'Come capire se hai un viso tondo',
  howKnowBullets: [
    'Larghezza della fronte ≈ larghezza degli zigomi ≈ larghezza della mandibola',
    'Mento arrotondato, senza angoli marcati',
    'Zigomi pieni, guance voluminose',
    'Lunghezza del viso vicina alla larghezza (rapporto 1:1)',
    'Mandibola morbida, senza linee nette',
  ],

  recommendedBadge: 'Migliori tagli',
  recommendedTitle: 'Tagli che valorizzano il viso tondo',
  recommended: [
    { name: 'Long bob (lob) scalato', why: 'Termina sotto il mento, allunga la parte bassa del viso e crea movimento verticale.' },
    { name: 'Caschetto lungo asimmetrico', why: 'Lunghezze diverse ai due lati creano punti di fuga visivi e rompono la rotondità.' },
    { name: 'Layer lunghi con ciuffi laterali', why: 'Lunghezze verticali allungano. Ciuffi laterali strutturano gli zigomi.' },
    { name: 'Pixie volumizzato', why: 'Corto ma con altezza sul top — guadagna statura visiva, contrasta la rotondità.' },
    { name: 'Frangia a tendina (curtain bangs)', why: 'Incornicia gli occhi e ammorbidisce gli zigomi senza orizzontalizzare la fronte.' },
    { name: 'Taglio per viso tondo e paffuto', why: 'Layer lunghi che passano sotto il mento + radici con volume in alto. Punto focale sopra il viso.' },
    { name: 'Frangia laterale lunga', why: 'Diagonale che rompe la rotondità della fronte senza ridurne la larghezza.' },
    { name: 'Capelli mossi con messa in piega scalata', why: 'Movimento verticale + ciuffi che cadono in modo irregolare → effetto visivamente allungante.' },
  ],

  avoidBadge: 'Evita',
  avoidTitle: 'Tagli che NON valorizzano il viso tondo',
  avoid: [
    { name: 'Caschetto netto al mento', why: 'Linea orizzontale esattamente nel punto più largo — sottolinea la rotondità.' },
    { name: 'Frangia piena e dritta', why: 'Accorcia visivamente la fronte e arrotonda ancora di più il viso.' },
    { name: 'Capelli lisci appiccicati ai lati', why: 'Senza volume in alto il viso sembra schiacciato.' },
    { name: 'Lunghezza uguale senza scalatura', why: 'Senza movimento verticale → effetto palla.' },
  ],

  midCtaTitle: 'Prova il taglio sulla tua foto prima del salone',
  midCtaBody:
    'Leggere un articolo sui tagli è una cosa. Vedere il long bob o la frangia a tendina sul TUO viso vero — il tuo incarnato, la tua struttura, l\'attaccatura — è quello che decide. Prima prova gratis, senza registrazione.',
  midCtaButton: 'Provare il taglio sulla mia foto',

  faqTitle: 'Domande frequenti',
  faq: [
    {
      q: 'Qual è il taglio migliore per viso tondo?',
      a: 'Long bob (lob) scalato e layer lunghi con ciuffi laterali sono i più versatili. Entrambi allungano il viso senza togliere volume.',
    },
    {
      q: 'Taglio capelli per viso tondo e paffuto, cosa funziona?',
      a: 'Layer lunghi che passano sotto il mento + radici con volume in alto. Obiettivo: punto focale sopra il viso, lunghezza che maschera le guance piene.',
    },
    {
      q: 'Posso portare la frangia con un viso tondo?',
      a: 'Sì — frangia laterale, a tendina (curtain bangs) o sfilata. Evita la frangia piena e dritta che orizzontalizza la fronte.',
    },
    {
      q: 'Caschetto corto va bene su viso tondo?',
      a: 'Solo se asimmetrico o con lunghezze diverse ai lati. Evita il caschetto netto al mento.',
    },
    {
      q: 'L\'IA rispetta il mio viso reale nella prova?',
      a: 'Sì. L\'IA preserva il colore degli occhi, la forma del mento, l\'incarnato e l\'espressione. Cambia solo il taglio.',
    },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Prova',
  privacyLabel: 'Privacy',
  tryOnHref: '/it/try-on?category=hairstyle',
};
