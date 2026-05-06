/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async redirects() {
    return [
      // Spanish URL aliases (legacy)
      { source: '/privacidad', destination: '/privacy', permanent: true },
      { source: '/terminos', destination: '/terms', permanent: true },
      { source: '/probador-virtual', destination: '/virtual-try-on', permanent: true },

      // ─── Localized landing migration: English slugs → native-language slugs ───
      // 5 langs × 10 categories = 50 entries. New URLs match lib/i18n/landingSlugs.ts.
      // 301 so any external links / GSC indexed paths transfer ranking signals.
      // ES
      { source: '/es/virtual-tattoo-simulator', destination: '/es/simulador-tatuaje', permanent: true },
      { source: '/es/realistic-swimwear-try-on', destination: '/es/probador-bikini', permanent: true },
      { source: '/es/virtual-earring-try-on', destination: '/es/probador-pendientes', permanent: true },
      { source: '/es/virtual-wedding-dress-try-on', destination: '/es/probador-vestido-novia', permanent: true },
      { source: '/es/virtual-nail-try-on', destination: '/es/probador-unas', permanent: true },
      { source: '/es/virtual-glasses-try-on', destination: '/es/probador-gafas', permanent: true },
      { source: '/es/virtual-jewelry-try-on', destination: '/es/probador-joyas', permanent: true },
      { source: '/es/virtual-mens-suit-try-on', destination: '/es/probador-traje-hombre', permanent: true },
      { source: '/es/virtual-pet-clothing-try-on', destination: '/es/probador-ropa-mascotas', permanent: true },
      { source: '/es/virtual-baby-clothing-try-on', destination: '/es/probador-ropa-bebe', permanent: true },
      // FR
      { source: '/fr/virtual-tattoo-simulator', destination: '/fr/simulateur-tatouage', permanent: true },
      { source: '/fr/realistic-swimwear-try-on', destination: '/fr/essayage-bikini', permanent: true },
      { source: '/fr/virtual-earring-try-on', destination: '/fr/essayage-boucles-oreilles', permanent: true },
      { source: '/fr/virtual-wedding-dress-try-on', destination: '/fr/essayage-robe-mariee', permanent: true },
      { source: '/fr/virtual-nail-try-on', destination: '/fr/simulateur-vernis-ongles', permanent: true },
      { source: '/fr/virtual-glasses-try-on', destination: '/fr/essayage-lunettes', permanent: true },
      { source: '/fr/virtual-jewelry-try-on', destination: '/fr/essayage-bijoux', permanent: true },
      { source: '/fr/virtual-mens-suit-try-on', destination: '/fr/essayage-costume-homme', permanent: true },
      { source: '/fr/virtual-pet-clothing-try-on', destination: '/fr/essayage-vetements-animal', permanent: true },
      { source: '/fr/virtual-baby-clothing-try-on', destination: '/fr/essayage-vetements-bebe', permanent: true },
      // PT
      { source: '/pt/virtual-tattoo-simulator', destination: '/pt/simulador-tatuagem', permanent: true },
      { source: '/pt/realistic-swimwear-try-on', destination: '/pt/provador-biquini', permanent: true },
      { source: '/pt/virtual-earring-try-on', destination: '/pt/provador-brincos', permanent: true },
      { source: '/pt/virtual-wedding-dress-try-on', destination: '/pt/provador-vestido-noiva', permanent: true },
      { source: '/pt/virtual-nail-try-on', destination: '/pt/simulador-unhas', permanent: true },
      { source: '/pt/virtual-glasses-try-on', destination: '/pt/provador-oculos', permanent: true },
      { source: '/pt/virtual-jewelry-try-on', destination: '/pt/provador-joias', permanent: true },
      { source: '/pt/virtual-mens-suit-try-on', destination: '/pt/provador-fato-homem', permanent: true },
      { source: '/pt/virtual-pet-clothing-try-on', destination: '/pt/provador-roupa-animal', permanent: true },
      { source: '/pt/virtual-baby-clothing-try-on', destination: '/pt/provador-roupa-bebe', permanent: true },
      // DE
      { source: '/de/virtual-tattoo-simulator', destination: '/de/tattoo-simulator', permanent: true },
      { source: '/de/realistic-swimwear-try-on', destination: '/de/bikini-anprobieren', permanent: true },
      { source: '/de/virtual-earring-try-on', destination: '/de/ohrringe-anprobieren', permanent: true },
      { source: '/de/virtual-wedding-dress-try-on', destination: '/de/brautkleid-anprobieren', permanent: true },
      { source: '/de/virtual-nail-try-on', destination: '/de/naegel-simulator', permanent: true },
      { source: '/de/virtual-glasses-try-on', destination: '/de/brille-anprobieren', permanent: true },
      { source: '/de/virtual-jewelry-try-on', destination: '/de/schmuck-anprobieren', permanent: true },
      { source: '/de/virtual-mens-suit-try-on', destination: '/de/herrenanzug-anprobieren', permanent: true },
      { source: '/de/virtual-pet-clothing-try-on', destination: '/de/haustierkleidung-anprobieren', permanent: true },
      { source: '/de/virtual-baby-clothing-try-on', destination: '/de/babykleidung-anprobieren', permanent: true },
      // IT
      { source: '/it/virtual-tattoo-simulator', destination: '/it/simulatore-tatuaggi', permanent: true },
      { source: '/it/realistic-swimwear-try-on', destination: '/it/prova-bikini', permanent: true },
      { source: '/it/virtual-earring-try-on', destination: '/it/prova-orecchini', permanent: true },
      { source: '/it/virtual-wedding-dress-try-on', destination: '/it/prova-abito-sposa', permanent: true },
      { source: '/it/virtual-nail-try-on', destination: '/it/simulatore-unghie', permanent: true },
      { source: '/it/virtual-glasses-try-on', destination: '/it/prova-occhiali', permanent: true },
      { source: '/it/virtual-jewelry-try-on', destination: '/it/prova-gioielli', permanent: true },
      { source: '/it/virtual-mens-suit-try-on', destination: '/it/prova-abito-uomo', permanent: true },
      { source: '/it/virtual-pet-clothing-try-on', destination: '/it/prova-vestiti-animali', permanent: true },
      { source: '/it/virtual-baby-clothing-try-on', destination: '/it/prova-vestiti-neonato', permanent: true },
      // Costume + hairstyle (added later)
      { source: '/es/virtual-costume-try-on', destination: '/es/probador-disfraces', permanent: true },
      { source: '/fr/virtual-costume-try-on', destination: '/fr/essayage-deguisements', permanent: true },
      { source: '/pt/virtual-costume-try-on', destination: '/pt/provador-fatos-carnaval', permanent: true },
      { source: '/de/virtual-costume-try-on', destination: '/de/kostueme-anprobieren', permanent: true },
      { source: '/it/virtual-costume-try-on', destination: '/it/prova-costumi', permanent: true },
      { source: '/es/virtual-hairstyle-try-on', destination: '/es/probador-peinados', permanent: true },
      { source: '/fr/virtual-hairstyle-try-on', destination: '/fr/essayage-coiffures', permanent: true },
      { source: '/pt/virtual-hairstyle-try-on', destination: '/pt/provador-penteados', permanent: true },
      { source: '/de/virtual-hairstyle-try-on', destination: '/de/frisuren-anprobieren', permanent: true },
      { source: '/it/virtual-hairstyle-try-on', destination: '/it/prova-acconciature', permanent: true },
      // Cosplay
      { source: '/es/virtual-cosplay-try-on', destination: '/es/probador-cosplay', permanent: true },
      { source: '/fr/virtual-cosplay-try-on', destination: '/fr/essayage-cosplay', permanent: true },
      { source: '/pt/virtual-cosplay-try-on', destination: '/pt/provador-cosplay', permanent: true },
      { source: '/de/virtual-cosplay-try-on', destination: '/de/cosplay-anprobieren', permanent: true },
      { source: '/it/virtual-cosplay-try-on', destination: '/it/prova-cosplay', permanent: true },

      // www → non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.agalaz.com' }],
        destination: 'https://agalaz.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // /embed page: allow iframing from any partner domain
      {
        source: '/embed',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://datafa.st https://*.datafa.st; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co https://datafa.st https://*.datafa.st; font-src 'self'; frame-ancestors *;",
          },
        ],
      },
      // widget.js: allow loading from any domain
      {
        source: '/widget.js',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      // All other pages: strict CSP
      {
        source: '/((?!embed).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://datafa.st https://*.datafa.st https://js.stripe.com https://bat.bing.net https://*.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co https://datafa.st https://*.datafa.st https://api.stripe.com https://bat.bing.net https://*.bing.com https://*.clarity.ms; font-src 'self'; frame-src 'self' https://checkout.stripe.com https://js.stripe.com; frame-ancestors 'self' https://*.myshopify.com https://admin.shopify.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
