/**
 * Round-16 — High-volume KD-0 landings identified 2026-05-17.
 *
 * Each cluster verified via DataForSEO:
 *   /prom-dress             550K/mo + 10 variants, KD 0-4, $1.72 CPC (US)
 *   /wedding-guest-dress    301K/mo × 10 variants, KD 0, $1.08 CPC (US)
 *   /pt/vestido-festa       201K/mo + variants, KD 0, $0.17 CPC (BR)
 *   /fr/robe-invitee-mariage 60.5K/mo × 9 variants, KD 0, $0.44 CPC (FR)
 *   /pt/vestido-de-formatura 49.5K/mo, KD 0, $0.09 CPC (BR)
 *   /it/vestito-cerimonia   ~50K/mo, KD 0 (IT)
 *
 * All use LongtailLandingTemplate. Theme uses wedding-guest or wedding-dress
 * presets that already exist (no new Gemini images needed).
 */

import type { LongtailContent } from '@/components/landing/LongtailLandingTemplate';

/* ─────────────────── /prom-dress (EN, US-targeted) ──────────────────────── */
export const promDressEN: LongtailContent = {
  lang: 'en',
  category: 'clothing',
  theme: 'wedding-guest',
  productLabel: 'Prom dress you want to try',
  yourPhotoLabel: 'Your full-body photo',
  yourPhotoHint: 'Full body, simple background, good light',
  productHint: 'Prom dress photo (Lulus, Macy\'s, Pinterest…)',
  accent: 'hair',

  badge: 'Prom 2026 · AI Try-On',
  h1Top: 'Prom dresses 2026',
  h1Italic: 'try any gown on your real body before you buy.',
  hero:
    'See yourself in any prom dress with AI in 30 seconds. Upload your photo + the dress (Lulus, ASOS, Macy\'s, JJ\'s House, Bloomingdale\'s, Pinterest). Skip the 4-mall trip and decide from your room. Free, no signup.',
  ctaPrimary: 'Try prom dress on me',
  ctaCaption: '✓ Free · ✓ No signup · ✓ 30 sec',

  whatTitle: 'Why most prom dress shopping ends in regret',
  whatBody:
    'Prom season hits a brutal funnel: you save 30+ Pinterest pics, drive to 4 malls, try on 12 dresses in the same hour, fluorescent dressing-room lighting flattens every silhouette, and you end up overwhelmed. The dress you wear on the night is rarely the one that flattered you most — it\'s just the one your friend group settled on. Agalaz fixes this: see the actual fit on YOUR body, in your bedroom lighting, before driving anywhere.',
  howKnowTitle: 'How to use it before prom shopping',
  howKnowBullets: [
    'Upload one clear full-body photo of yourself (frontal, daylight)',
    'Screenshot dresses you like (Lulus, ASOS, Macy\'s, Pinterest, anywhere)',
    'AI applies each dress on your body in 30 seconds',
    'Compare 5-10 dresses side by side from your phone',
    'Walk into the store with a shortlist — try on 3, not 13',
  ],

  recommendedBadge: 'Prom 2026 silhouettes that work',
  recommendedTitle: 'The 8 prom dress styles that flatter most body types',
  recommended: [
    { name: 'Mermaid / fit-and-flare', why: 'Hugs through the hip, flares at the knee. Best for hourglass and pear shapes. Lulus and Sherri Hill nail this cut.' },
    { name: 'A-line floor-length', why: 'Universal flatterer. Narrow waist, gradual flare. Works for every body type. Safest pick if you\'re unsure.' },
    { name: 'Ball gown / princess', why: 'Full skirt drama. Works on petite frames especially. Bridgerton-coded.' },
    { name: 'Two-piece set', why: 'Crop top + maxi skirt. Modern, lets you breathe, photogenic. Trending hard 2026.' },
    { name: 'Spaghetti-strap satin slip', why: 'Minimalist 90s slip dress. Lulus + Princess Polly\'s favorite. Best for tall lean frames.' },
    { name: 'Off-shoulder corset', why: 'Cinches waist, lifts bust, dramatic shoulders. Great for hourglass.' },
    { name: 'High-low hemline', why: 'Short front, long back. Lets you dance without tripping. Underrated 2026 comeback.' },
    { name: 'Sequin column dress', why: 'Full sparkle. Photographs like a million bucks. Best on straight or athletic frames.' },
  ],

  avoidBadge: 'Prom shopping mistakes',
  avoidTitle: 'What NOT to do for prom dress shopping',
  avoid: [
    { name: 'Buying the dress your friend has', why: 'Same dress on different body types = different result. AI try-on prevents the "wait, this looks different on me" panic.' },
    { name: 'Ordering 3 sizes to "try at home"', why: 'Tax + restocking + return labels = $30-80 lost per dress. Try virtually first.' },
    { name: 'Skipping the under-bra check', why: 'Many prom dresses need specific bra cups (strapless, low-back). AI shows where straps would show.' },
    { name: 'Picking dress before shoes', why: 'Heel height changes the dress hemline. Decide shoes first, then dress length.' },
  ],

  midCtaTitle: 'Before driving to the mall',
  midCtaBody:
    'You don\'t need to try on 12 dresses in fluorescent dressing rooms. Pick 30 from Pinterest, AI tries them on you, shortlist 3, then go try those in person. Cuts shopping from 6 hours to 90 minutes.',
  midCtaButton: 'Try a prom dress now',

  faqTitle: 'Prom dress AI try-on — FAQ',
  faq: [
    { q: 'Does it work with any prom dress photo?', a: 'Yes. Screenshot from Lulus, ASOS, Macy\'s, JJ\'s House, Sherri Hill, Camille La Vie, Pinterest, Instagram — anywhere. Works best with the dress shown frontally on a model or flat lay.' },
    { q: 'Will it show me the dress in my actual size?', a: 'AI matches the proportional drape to your body. For exact size verification still cross-reference with the brand\'s measurement chart — Lulus and ASOS publish accurate ones.' },
    { q: 'Can it show me different colors of the same dress?', a: 'Yes. After the first render, ask the AI to "make it emerald" or "show in blush". It re-renders in seconds.' },
    { q: 'Is the photo private?', a: 'Yes. Photos are processed only to generate your render — never shared, never sold, never used to train models. Removed from memory immediately.' },
    { q: 'How much does it cost?', a: 'First render is free, no signup, no card. After that, packs from $4.99 (5 renders) or $9.99 (15 renders). One-time, no subscription.' },
    { q: 'Do I need to download an app?', a: 'No. Runs in any browser on phone or laptop. The first try-on is free with no account.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Virtual try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on',
};

/* ─────────────────── /wedding-guest-dress (EN, US) ──────────────────────── */
export const weddingGuestDressEN: LongtailContent = {
  lang: 'en',
  category: 'clothing',
  theme: 'wedding-guest',
  productLabel: 'Wedding guest dress',
  yourPhotoLabel: 'Your full-body photo',
  yourPhotoHint: 'Full body, neutral background, good light',
  productHint: 'Photo of the dress (Lulus, Anthropologie, Pinterest…)',
  accent: 'hair',

  badge: 'Wedding Guest 2026 · AI Try-On',
  h1Top: 'Wedding guest dresses',
  h1Italic: 'try any dress on your real body in 30 seconds.',
  hero:
    'See any wedding guest dress on yourself before the RSVP deadline. Upload your photo + the dress (Lulus, ASOS, Anthropologie, Revolve, Zara, Pinterest). AI applies it in 30 seconds. Free, no signup, no app.',
  ctaPrimary: 'Try wedding guest dress',
  ctaCaption: '✓ Free · ✓ No signup · ✓ 30 sec',

  whatTitle: 'The wedding-guest dress problem nobody talks about',
  whatBody:
    'Average US wedding-guest spend on a dress in 2026: $180. Average return rate: 38%. The reason: you don\'t know how it looks on YOU until it arrives — and by then, the wedding is in 3 days. Agalaz removes the guesswork. Upload your photo, pick the dress, see the result in your living room.',
  howKnowTitle: 'The wedding guest dress code cheat sheet',
  howKnowBullets: [
    'Black-tie: floor-length, dark colors, formal fabrics',
    'Cocktail: knee-length or midi, satin, silk, structured',
    'Beach / destination: lightweight, midi, soft colors',
    'Garden / daytime: floral midi, pastels, less formal fabrics',
    'NEVER wear: white, cream, anything that might compete with the bride',
  ],

  recommendedBadge: 'Wedding guest cuts that always work',
  recommendedTitle: 'The 8 wedding-guest dress styles for any season',
  recommended: [
    { name: 'Satin midi (emerald, navy, burgundy)', why: 'The 2026 default. Photographs gorgeous, never competes with the bride. Cowl neck or thin straps work best.' },
    { name: 'Floral midi for daytime/garden', why: 'Pastel florals on chiffon. Perfect for spring/summer weddings. Reformation and Anthropologie nail this.' },
    { name: 'Black tuxedo dress for black-tie', why: 'Sharp, never wrong, won\'t be seen as "trying too hard". Pair with simple gold jewelry.' },
    { name: 'Jumpsuit (silk wide-leg)', why: 'Underrated. Modern, comfortable, photographs better than half the dresses in the room.' },
    { name: 'Tea-length lace', why: 'Vintage-coded. Distinct from the standard maxi crowd. Best in soft blush, sage, or champagne.' },
    { name: 'Off-shoulder cocktail (knee-length)', why: 'Versatile. Works for cocktail dress codes. Easy to dance in.' },
    { name: 'Sequin column dress', why: 'For evening / black-tie. Sparkle = celebration energy. Photogenic under any lighting.' },
    { name: 'Strapless A-line midi', why: 'Universal cut, suits most body types. Great when you don\'t know the venue/dress code yet.' },
  ],

  avoidBadge: 'Wedding guest no-no\'s',
  avoidTitle: 'Wedding guest dress mistakes to avoid',
  avoid: [
    { name: 'Anything white, cream, ivory, champagne', why: 'Even subtle off-white reads as bridal in photos. Veto everything in that family unless the bride explicitly approved.' },
    { name: 'A dress similar to the bridesmaids\'', why: 'Look at the bridesmaid color palette in the wedding invite or registry. Don\'t match it.' },
    { name: 'See-through fabrics without lining', why: 'Light hits differently in venue spotlights. AI try-on shows you whether the lining is adequate.' },
    { name: 'Too short for the venue', why: 'Church weddings = knee-length minimum. AI try-on shows the actual hemline on your height.' },
  ],

  midCtaTitle: '90% of wedding-guest stress is the dress',
  midCtaBody:
    'You\'re going to a wedding in 6 weeks. You have 4 dresses saved on Pinterest. Order them all → return 3 → $40 wasted. Or: AI try-on each one in 30 seconds, pick the right one, order one.',
  midCtaButton: 'Try a wedding guest dress',

  faqTitle: 'Wedding guest dress AI try-on — FAQ',
  faq: [
    { q: 'Does it work with any wedding guest dress photo?', a: 'Yes. Screenshot from Lulus, ASOS, Anthropologie, Revolve, Reformation, BHLDN, Pinterest, Instagram — anywhere. Best with dress shown on a model or flat lay.' },
    { q: 'Can I check if the dress is white enough to look bridal?', a: 'Yes. AI renders the exact color. If it looks too close to ivory/cream/champagne, you\'ll see immediately. Useful to avoid the "is this too white?" panic.' },
    { q: 'Can it show me different lengths (midi vs maxi)?', a: 'Yes. Ask the AI to "show this knee-length" or "make it floor-length". Re-renders in seconds.' },
    { q: 'What about petite vs tall sizing?', a: 'AI matches the drape proportionally to your body. Tall users see longer effective hemlines; petite users see shorter. Honest reflection of fit.' },
    { q: 'How much does it cost?', a: 'First render is free, no signup. Packs from $4.99 (5 renders) or $9.99 (15 renders). One-time, no subscription.' },
    { q: 'Is the photo private?', a: 'Yes. Zero retention. Photos processed in memory and deleted immediately.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Virtual try-on',
  privacyLabel: 'Privacy',
  tryOnHref: '/try-on',
};

/* ─────────────────── /pt/vestido-festa (BR) ──────────────────────── */
export const vestidoFestaPT: LongtailContent = {
  lang: 'pt',
  category: 'clothing',
  theme: 'wedding-guest',
  productLabel: 'Vestido de festa que quer testar',
  yourPhotoLabel: 'Sua foto de corpo inteiro',
  yourPhotoHint: 'Corpo inteiro, fundo simples, boa luz',
  productHint: 'Foto do vestido (Renner, Shein, AMARO, Pinterest…)',
  accent: 'hair',

  badge: 'Vestido de Festa 2026 · IA',
  h1Top: 'Vestido de festa 2026',
  h1Italic: 'teste qualquer vestido no seu corpo antes de comprar.',
  hero:
    'Veja qualquer vestido de festa no seu corpo real com IA em 30 segundos. Suba sua foto + a captura do vestido (Renner, Shein, AMARO, Riachuelo, Animale, Pinterest). Decida sem trocar de tamanho 3 vezes. Grátis, sem cadastro.',
  ctaPrimary: 'Testar vestido de festa',
  ctaCaption: '✓ Grátis · ✓ Sem cadastro · ✓ 30 seg',

  whatTitle: 'Por que o vestido de festa é o gasto mais arriscado de 2026',
  whatBody:
    'Vestido de festa médio no Brasil custa R$ 250-800. Taxa de devolução em e-commerce de moda festa: 35%. O motivo: o caimento muda com a altura, a cor com a luz do venue, e o tamanho do site nunca casa com o seu corpo real. Agalaz resolve isso: você vê o vestido aplicado no SEU corpo, com sua luz natural, em 30 segundos.',
  howKnowTitle: 'Quais ocasiões cobre esta página',
  howKnowBullets: [
    'Vestidos para festa de casamento (madrinha + convidada)',
    'Vestido de formatura',
    'Festa de 15 anos / debutante',
    'Festa de empresa / réveillon',
    'Aniversário formal / jantar especial',
    'Daminhas e cerimoniais',
  ],

  recommendedBadge: 'Cortes que mais funcionam',
  recommendedTitle: 'Os 8 cortes de vestido de festa que mais valorizam',
  recommended: [
    { name: 'Vestido midi cetim', why: 'O default 2026. Fotografa lindo, neutro para qualquer evento. Verde esmeralda, vinho, azul marinho dominam.' },
    { name: 'Vestido longo princesa', why: 'Saia ampla, cintura marcada. Funciona em corpo ampulheta e peras. Casamento à noite.' },
    { name: 'Vestido sereia', why: 'Marca bem a silhueta. Para corpos com curva definida. Cerimônia formal.' },
    { name: 'Vestido tomara-que-caia', why: 'Decote reto, ombros descobertos. Versátil. Funciona em quase todo corpo.' },
    { name: 'Vestido com fenda lateral', why: 'Moderno, photogenic, deixa dançar. Cuidado com a altura da fenda — IA mostra exato.' },
    { name: 'Vestido com manga bufante', why: 'Tendência 2026. Boa para braços largos. Dramático no Instagram.' },
    { name: 'Conjunto cropped + saia longa', why: 'Duas peças. Moderno, deixa respirar, fotogênico.' },
    { name: 'Vestido de paetês cintilante', why: 'Brilho total. Para festa formal noturna. Fotografa como um milhão.' },
  ],

  avoidBadge: 'Erros típicos',
  avoidTitle: 'Erros comuns ao escolher vestido de festa',
  avoid: [
    { name: 'Pedir 3 tamanhos para "experimentar"', why: 'Frete + devolução + retorno = R$ 50-150 perdidos. Teste virtual primeiro.' },
    { name: 'Branco/creme em casamento de noivos', why: 'Mesmo "off-white" lê como nupcial nas fotos. A IA mostra a cor exata.' },
    { name: 'Vestido curto demais para o venue', why: 'Igreja exige no joelho. IA mostra a altura real do hemline no seu corpo.' },
    { name: 'Tecido transparente sem forro adequado', why: 'A luz do venue revela tudo. Teste com IA antes do RSVP.' },
  ],

  midCtaTitle: 'Antes de pedir 3 tamanhos pra devolver 2',
  midCtaBody:
    'A devolução grátis te custa tempo, não dinheiro. Mas 1 render virtual em 30 seg e você pede só o tamanho certo. Sem ansiedade no carrinho.',
  midCtaButton: 'Testar vestido agora',

  faqTitle: 'Vestido de festa virtual — Perguntas frequentes',
  faq: [
    { q: 'Funciona com vestido de qualquer site brasileiro?', a: 'Sim. Renner, Shein, AMARO, Animale, Lez a Lez, Riachuelo, Marisa, Pinterest, Instagram. Funciona melhor com foto do vestido em modelo de frente sobre fundo neutro.' },
    { q: 'Posso ver o vestido em cores diferentes?', a: 'Sim. Depois do primeiro render, peça "mostrar em verde esmeralda" ou "tom rosa antigo". Re-renderiza em segundos.' },
    { q: 'Vou ver o caimento real para o meu corpo?', a: 'Sim. A IA adapta a queda do tecido às suas proporções. Não é um overlay plano — é render fotorrealista.' },
    { q: 'A foto fica privada?', a: 'Sim. Zero retenção: a foto é processada em memória e apagada imediatamente. Nunca compartilhada, nunca vendida, nunca usada para treinar modelos.' },
    { q: 'Quanto custa?', a: 'Primeiro render é grátis, sem cadastro. Depois: pack Basic $4,99 (5 renders) ou Pro $9,99 (15 renders). Pagamento único, sem assinatura.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador virtual',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/virtual-try-on',
};

/* ─────────────────── /fr/robe-invitee-mariage (FR) ──────────────────────── */
export const robeInviteeMariageFR: LongtailContent = {
  lang: 'fr',
  category: 'clothing',
  theme: 'wedding-guest',
  productLabel: 'Robe d\'invitée à un mariage',
  yourPhotoLabel: 'Votre photo en pied',
  yourPhotoHint: 'Corps entier, fond neutre, bonne lumière',
  productHint: 'Photo de la robe (Sézane, Galeries Lafayette, Pinterest…)',
  accent: 'hair',

  badge: 'Mariage 2026 · Essayage IA',
  h1Top: 'Robe invitée mariage 2026',
  h1Italic: 'essayez n\'importe quelle robe sur votre corps avant d\'acheter.',
  hero:
    'Voyez n\'importe quelle robe d\'invitée de mariage sur votre vrai corps avec l\'IA en 30 secondes. Téléchargez votre photo + la robe (Sézane, Sandro, Maje, Galeries Lafayette, Zara, Pinterest). Décidez avant d\'aller en magasin. Gratuit, sans inscription.',
  ctaPrimary: 'Essayer une robe d\'invitée',
  ctaCaption: '✓ Gratuit · ✓ Sans inscription · ✓ 30 sec',

  whatTitle: 'Pourquoi la robe d\'invitée stresse autant',
  whatBody:
    'Budget moyen robe invitée mariage en France 2026 : 150-300 €. Taux de retour en ligne : 35 %. Le problème : la coupe varie avec votre morphologie, la couleur change selon la lumière du lieu, et la taille du site ne correspond jamais à votre vrai corps. Agalaz résout ça : vous voyez la robe appliquée sur VOTRE corps, dans votre lumière naturelle, en 30 secondes.',
  howKnowTitle: 'Le code vestimentaire de l\'invitée de mariage',
  howKnowBullets: [
    'Cérémonie classique : robe midi ou longue, couleurs sobres',
    'Cocktail : midi ou cocktail, satin, soie, structurée',
    'Mariage à la plage : tissus légers, couleurs douces',
    'Vin d\'honneur en journée : florale, pastels',
    'JAMAIS porter : blanc, crème, ivoire, champagne (réservé à la mariée)',
  ],

  recommendedBadge: 'Coupes qui flattent le plus',
  recommendedTitle: 'Les 8 coupes de robe invitée qui marchent toujours',
  recommended: [
    { name: 'Robe satinée midi (émeraude, marine, bordeaux)', why: 'Le défaut chic 2026. Photographie magnifique, ne fait jamais concurrence à la mariée. Encolure cowl ou bretelles fines.' },
    { name: 'Robe florale midi pour journée/jardin', why: 'Florale pastel sur mousseline. Parfait printemps/été. Sézane et Sandro la maîtrisent.' },
    { name: 'Robe noire smoking pour mariage en soirée', why: 'Chic, jamais raté, ne crie pas "j\'ai essayé". À porter avec bijoux dorés simples.' },
    { name: 'Combinaison (soie large)', why: 'Sous-estimé. Moderne, confortable, photographie mieux que la moitié des robes.' },
    { name: 'Robe longueur tea (mi-mollet) en dentelle', why: 'Vintage. Se distingue de la masse midi. Plus belle en blush, sauge ou champagne.' },
    { name: 'Robe cocktail dénudée épaules', why: 'Versatile. Cocktail compatible. Facile pour danser.' },
    { name: 'Robe à sequins (jupe colonne)', why: 'Pour mariage soir. Brillance = énergie festive. Photogénique sous tout éclairage.' },
    { name: 'Robe A-line midi sans bretelles', why: 'Coupe universelle, convient à la plupart des silhouettes.' },
  ],

  avoidBadge: 'À éviter',
  avoidTitle: 'Erreurs à ne pas faire en robe d\'invitée',
  avoid: [
    { name: 'Tout ce qui est blanc, crème, ivoire, champagne', why: 'Même un off-white lit comme bridal en photo. Bannir cette famille sauf accord exprès de la mariée.' },
    { name: 'Une robe similaire aux demoiselles d\'honneur', why: 'Vérifiez la palette de couleurs sur le faire-part. N\'imitez pas.' },
    { name: 'Tissu transparent sans doublure adéquate', why: 'L\'éclairage du lieu révèle tout. L\'essayage IA montre si la doublure suffit.' },
    { name: 'Robe trop courte pour le lieu', why: 'Église = genou minimum. L\'essayage IA montre la longueur réelle sur votre taille.' },
  ],

  midCtaTitle: 'Avant de commander 3 tailles à retourner',
  midCtaBody:
    'Le retour gratuit Sézane est pratique. Mais ça vous coûte du temps. Un rendu virtuel en 30s = vous commandez la bonne taille du premier coup.',
  midCtaButton: 'Essayer une robe maintenant',

  faqTitle: 'Robe invitée mariage essayage virtuel — FAQ',
  faq: [
    { q: 'Ça marche avec n\'importe quelle robe en ligne ?', a: 'Oui. Sézane, Sandro, Maje, Ba&sh, Galeries Lafayette, Printemps, Zara, Pinterest, Instagram. Mieux avec la robe portée par un mannequin de face sur fond neutre.' },
    { q: 'Puis-je voir la robe dans une autre couleur ?', a: 'Oui. Après le premier rendu, demandez "montre en émeraude" ou "version blush". Re-rendu en secondes.' },
    { q: 'Mes photos sont-elles privées ?', a: 'Oui. Zéro rétention. Photos traitées en mémoire et supprimées immédiatement. Jamais partagées, vendues ou utilisées pour entraîner des modèles.' },
    { q: 'Combien ça coûte ?', a: 'Premier rendu gratuit, sans inscription. Ensuite : pack Basic 4,99 $ (5 rendus) ou Pro 9,99 $ (15 rendus). Paiement unique, pas d\'abonnement.' },
    { q: 'Faut-il télécharger une appli ?', a: 'Non. Marche dans n\'importe quel navigateur, mobile ou ordinateur.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Essayage virtuel',
  privacyLabel: 'Confidentialité',
  tryOnHref: '/fr/virtual-try-on',
};

/* ─────────────────── /pt/vestido-de-formatura (BR) ──────────────────────── */
export const vestidoFormaturaPT: LongtailContent = {
  lang: 'pt',
  category: 'clothing',
  theme: 'wedding-guest',
  productLabel: 'Vestido de formatura',
  yourPhotoLabel: 'Sua foto de corpo inteiro',
  yourPhotoHint: 'Corpo inteiro, fundo simples, boa luz',
  productHint: 'Foto do vestido (Renner, Animale, Pinterest…)',
  accent: 'hair',

  badge: 'Formatura 2026 · IA',
  h1Top: 'Vestido de formatura 2026',
  h1Italic: 'teste qualquer vestido no seu corpo antes da formatura.',
  hero:
    'Veja qualquer vestido de formatura no seu corpo com IA em 30 segundos. Suba sua foto + a captura do vestido (Renner, Animale, AMARO, Pinterest, Instagram). Decida o seu vestido sem provar 12 em 3 lojas. Grátis, sem cadastro.',
  ctaPrimary: 'Testar vestido de formatura',
  ctaCaption: '✓ Grátis · ✓ Sem cadastro · ✓ 30 seg',

  whatTitle: 'A formatura mais importante da sua vida — não estrague o vestido',
  whatBody:
    'Vestido de formatura no Brasil: R$ 400-2000+. Para um evento único de 3 horas. Não dá pra errar. Mas a maioria das formandas decide com 1 hora de provador estressada, sob luz fluorescente. Agalaz muda isso: você testa 15 vestidos no seu sofá, com sua luz natural, antes de pisar numa loja.',
  howKnowTitle: 'Como escolher seu vestido de formatura',
  howKnowBullets: [
    'Suba uma foto sua de corpo inteiro (frente, luz natural)',
    'Salve 10-15 vestidos no Pinterest / Instagram',
    'A IA aplica cada um no seu corpo em 30 segundos',
    'Compare lado a lado no celular',
    'Vá à loja com 3 finalistas, não com 15',
  ],

  recommendedBadge: 'Tendências formatura 2026',
  recommendedTitle: 'Os 8 vestidos de formatura que mais valorizam',
  recommended: [
    { name: 'Sereia cintilante (com paetês)', why: 'Marca toda a silhueta + brilho. Para corpos com curvas. Fotografa lindo no flash.' },
    { name: 'Vestido princesa com brilho', why: 'Saia ampla + corpete brilhante. Drama total. Funciona em corpos pera.' },
    { name: 'Tomara-que-caia com fenda', why: 'Decote reto + perna à mostra. Moderno, dança bem.' },
    { name: 'Long dress de cetim minimalista', why: 'Sem brilho, só caimento. 2026 vibe minimalista. Verde esmeralda, vinho, dourado.' },
    { name: 'Vestido com bordados nas costas', why: 'Frente clean, costas dramáticas. Photogenic em todo lado.' },
    { name: 'Top + saia bicolor', why: 'Dois tons (rosa antigo + branco, azul + prata). Moderno, fotogênico.' },
    { name: 'Vestido godê com manga bufante', why: 'Voltou em 2026. Romântico, drama no detalhe.' },
    { name: 'Vestido cape (capa nas costas)', why: 'Casamento entre minimalismo + drama. Capa nas costas em chiffon.' },
  ],

  avoidBadge: 'Erros típicos',
  avoidTitle: 'Erros para evitar com vestido de formatura',
  avoid: [
    { name: 'Comprar igual o de uma amiga', why: 'O mesmo vestido em corpos diferentes = resultados diferentes. IA evita o "espera, no meu não tá ficando assim".' },
    { name: 'Pedir 3 tamanhos para "experimentar"', why: 'Frete + devolução = R$ 50-150 perdidos. Teste virtual primeiro.' },
    { name: 'Não verificar o sapato antes', why: 'A altura do salto muda a barra do vestido. Defina sapato primeiro.' },
    { name: 'Esquecer a sutiã específica', why: 'Vestidos sem alça precisam sutiã sem alça. IA mostra onde as alças apareceriam.' },
  ],

  midCtaTitle: 'Antes de pisar na loja com sua mãe',
  midCtaBody:
    'Você não precisa de 6 horas em provador. Salve 15 vestidos no Pinterest, a IA aplica em você, sai com 3 finalistas, vai à loja, prova só essas 3.',
  midCtaButton: 'Testar vestido agora',

  faqTitle: 'Vestido de formatura IA — Perguntas frequentes',
  faq: [
    { q: 'Funciona com vestido de qualquer site brasileiro?', a: 'Sim. Renner, Animale, AMARO, Lez a Lez, Galeria do Rock, lojinhas Instagram, Pinterest — qualquer foto serve.' },
    { q: 'Vai mostrar o caimento real no meu corpo?', a: 'Sim. A IA adapta a queda do tecido à sua altura e silhueta. Não é overlay plano — é render fotorrealista.' },
    { q: 'Posso ver em cores diferentes?', a: 'Sim. Depois do primeiro render, peça "mostrar em verde escuro" ou "tom dourado". Re-renderiza em segundos.' },
    { q: 'A foto fica privada?', a: 'Sim. Zero retenção: foto processada em memória e apagada imediatamente. Nunca compartilhada, nunca vendida, nunca usada para treinar.' },
    { q: 'Quanto custa?', a: 'Primeiro render é grátis, sem cadastro. Depois: pack Basic $4,99 (5 renders) ou Pro $9,99 (15 renders). Pagamento único.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Provador virtual',
  privacyLabel: 'Privacidade',
  tryOnHref: '/pt/virtual-try-on',
};

/* ─────────────────── /it/vestito-cerimonia (IT) ──────────────────────── */
export const vestitoCerimoniaIT: LongtailContent = {
  lang: 'it',
  category: 'clothing',
  theme: 'wedding-guest',
  productLabel: 'Vestito da cerimonia',
  yourPhotoLabel: 'La tua foto corpo intero',
  yourPhotoHint: 'Corpo intero, sfondo neutro, buona luce',
  productHint: 'Foto del vestito (Zara, Mango, Pinterest…)',
  accent: 'hair',

  badge: 'Cerimonia 2026 · IA',
  h1Top: 'Vestito da cerimonia 2026',
  h1Italic: 'prova qualsiasi vestito sul tuo corpo prima di comprare.',
  hero:
    'Vedi qualsiasi vestito da cerimonia sul tuo corpo reale con IA in 30 secondi. Carica la tua foto + il vestito (Zara, Mango, Maliparmi, Twin-Set, Pinterest). Decidi senza prendere 3 taglie diverse. Gratis, senza registrazione.',
  ctaPrimary: 'Provare vestito da cerimonia',
  ctaCaption: '✓ Gratis · ✓ Senza registrazione · ✓ 30 sec',

  whatTitle: 'Perché il vestito da cerimonia stressa così tanto',
  whatBody:
    'Budget medio vestito cerimonia in Italia 2026: 150-400 €. Tasso di reso online: 35 %. Il problema: la vestibilità cambia con l\'altezza, il colore con la luce del luogo, e la taglia del sito non corrisponde mai al tuo corpo reale. Agalaz risolve questo: vedi il vestito applicato sul TUO corpo, nella tua luce naturale, in 30 secondi.',
  howKnowTitle: 'Per quali occasioni serve questa pagina',
  howKnowBullets: [
    'Vestiti per matrimonio (invitata + damigella)',
    'Vestiti per battesimo / comunione (mamma/madrina)',
    'Vestiti per cresima',
    'Vestiti per anniversario formale',
    'Vestiti per cerimonie eleganti generiche',
  ],

  recommendedBadge: 'Tagli che funzionano sempre',
  recommendedTitle: 'Gli 8 tagli di vestito cerimonia che valorizzano di più',
  recommended: [
    { name: 'Vestito midi in raso (smeraldo, blu, bordeaux)', why: 'Lo standard chic 2026. Fotografa stupendamente, neutro per qualsiasi cerimonia.' },
    { name: 'Vestito lungo principessa', why: 'Gonna ampia, vita marcata. Funziona su forme a clessidra e pera. Per cerimonie serali.' },
    { name: 'Vestito sirena', why: 'Marca bene la silhouette. Per chi ha curve definite. Cerimonia formale.' },
    { name: 'Vestito tubino bustier', why: 'Senza spalline, scollo dritto. Versatile per la maggior parte dei corpi.' },
    { name: 'Vestito floreale midi per battesimo/comunione', why: 'Floreale pastello su chiffon. Perfetto per cerimonie diurne primaverili.' },
    { name: 'Tuta in seta gamba larga', why: 'Sottovalutato. Moderno, confortevole, fotografa meglio di metà dei vestiti.' },
    { name: 'Vestito con paillettes per la sera', why: 'Brillantezza totale. Per cerimonia formale serale. Fotografa come un milione.' },
    { name: 'Vestito A-line midi senza spalline', why: 'Taglio universale, si adatta alla maggior parte delle silhouette.' },
  ],

  avoidBadge: 'Errori da evitare',
  avoidTitle: 'Errori comuni nella scelta del vestito cerimonia',
  avoid: [
    { name: 'Tutto ciò che è bianco, crema, avorio, champagne', why: 'Anche off-white sembra nuziale nelle foto. Vietare questa famiglia salvo accordo della sposa.' },
    { name: 'Vestito simile alle damigelle', why: 'Controlla la palette colori dell\'invito. Non sovrapporti.' },
    { name: 'Tessuto trasparente senza fodera adeguata', why: 'La luce della location rivela tutto. Prova IA mostra se la fodera basta.' },
    { name: 'Vestito troppo corto per il luogo', why: 'Chiesa = ginocchio minimo. Prova IA mostra la lunghezza reale sulla tua altezza.' },
  ],

  midCtaTitle: 'Prima di ordinare 3 taglie e restituirne 2',
  midCtaBody:
    'Il reso gratuito è comodo ma ti costa tempo. Un rendering virtuale in 30s = ordini solo la taglia giusta al primo colpo.',
  midCtaButton: 'Provare vestito ora',

  faqTitle: 'Vestito cerimonia prova virtuale — FAQ',
  faq: [
    { q: 'Funziona con qualsiasi vestito online?', a: 'Sì. Zara, Mango, Maliparmi, Twin-Set, OVS, Yoox, Zalando, Pinterest, Instagram. Funziona meglio con il vestito su modello frontale su sfondo neutro.' },
    { q: 'Posso vederlo in colori diversi?', a: 'Sì. Dopo il primo render, chiedi "mostrami in smeraldo" o "versione blush". Re-rendering in secondi.' },
    { q: 'Le mie foto sono private?', a: 'Sì. Zero ritenzione: foto elaborata in memoria e cancellata immediatamente. Mai condivisa, venduta o usata per addestrare modelli.' },
    { q: 'Quanto costa?', a: 'Primo render gratuito, senza registrazione. Poi: pack Basic $4,99 (5 render) o Pro $9,99 (15 render). Pagamento unico, niente abbonamento.' },
    { q: 'Serve scaricare un\'app?', a: 'No. Funziona in qualsiasi browser, mobile o desktop.' },
  ],

  blogLabel: 'Blog',
  tryOnLabel: 'Prova virtuale',
  privacyLabel: 'Privacy',
  tryOnHref: '/it/virtual-try-on',
};
