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
      { source: '/privacidad', destination: '/privacy', statusCode: 301 },
      { source: '/terminos', destination: '/terms', statusCode: 301 },
      { source: '/probador-virtual', destination: '/virtual-try-on', statusCode: 301 },

      // ─── Localized landing migration: English slugs → native-language slugs ───
      // 5 langs × 10 categories = 50 entries. New URLs match lib/i18n/landingSlugs.ts.
      // 301 so any external links / GSC indexed paths transfer ranking signals.
      // ES
      { source: '/es/virtual-tattoo-simulator', destination: '/es/simulador-tatuaje', statusCode: 301 },
      { source: '/es/realistic-swimwear-try-on', destination: '/es/probador-bikini', statusCode: 301 },
      { source: '/es/virtual-earring-try-on', destination: '/es/probador-pendientes', statusCode: 301 },
      { source: '/es/virtual-wedding-dress-try-on', destination: '/es/probador-vestido-novia', statusCode: 301 },
      { source: '/es/virtual-nail-try-on', destination: '/es/probador-unas', statusCode: 301 },
      { source: '/es/virtual-glasses-try-on', destination: '/es/probador-gafas', statusCode: 301 },
      { source: '/es/virtual-jewelry-try-on', destination: '/es/probador-joyas', statusCode: 301 },
      { source: '/es/virtual-mens-suit-try-on', destination: '/es/probador-traje-hombre', statusCode: 301 },
      { source: '/es/virtual-pet-clothing-try-on', destination: '/es/probador-ropa-mascotas', statusCode: 301 },
      { source: '/es/virtual-baby-clothing-try-on', destination: '/es/probador-ropa-bebe', statusCode: 301 },
      // FR
      { source: '/fr/virtual-tattoo-simulator', destination: '/fr/simulateur-tatouage', statusCode: 301 },
      { source: '/fr/realistic-swimwear-try-on', destination: '/fr/essayage-bikini', statusCode: 301 },
      { source: '/fr/virtual-earring-try-on', destination: '/fr/essayage-boucles-oreilles', statusCode: 301 },
      { source: '/fr/virtual-wedding-dress-try-on', destination: '/fr/essayage-robe-mariee', statusCode: 301 },
      { source: '/fr/virtual-nail-try-on', destination: '/fr/simulateur-vernis-ongles', statusCode: 301 },
      { source: '/fr/virtual-glasses-try-on', destination: '/fr/essayage-lunettes', statusCode: 301 },
      { source: '/fr/virtual-jewelry-try-on', destination: '/fr/essayage-bijoux', statusCode: 301 },
      { source: '/fr/virtual-mens-suit-try-on', destination: '/fr/essayage-costume-homme', statusCode: 301 },
      { source: '/fr/virtual-pet-clothing-try-on', destination: '/fr/essayage-vetements-animal', statusCode: 301 },
      { source: '/fr/virtual-baby-clothing-try-on', destination: '/fr/essayage-vetements-bebe', statusCode: 301 },
      // PT
      { source: '/pt/virtual-tattoo-simulator', destination: '/pt/simulador-tatuagem', statusCode: 301 },
      { source: '/pt/realistic-swimwear-try-on', destination: '/pt/provador-biquini', statusCode: 301 },
      { source: '/pt/virtual-earring-try-on', destination: '/pt/provador-brincos', statusCode: 301 },
      { source: '/pt/virtual-wedding-dress-try-on', destination: '/pt/provador-vestido-noiva', statusCode: 301 },
      { source: '/pt/virtual-nail-try-on', destination: '/pt/simulador-unhas', statusCode: 301 },
      { source: '/pt/virtual-glasses-try-on', destination: '/pt/provador-oculos', statusCode: 301 },
      { source: '/pt/virtual-jewelry-try-on', destination: '/pt/provador-joias', statusCode: 301 },
      { source: '/pt/virtual-mens-suit-try-on', destination: '/pt/provador-fato-homem', statusCode: 301 },
      { source: '/pt/virtual-pet-clothing-try-on', destination: '/pt/provador-roupa-animal', statusCode: 301 },
      { source: '/pt/virtual-baby-clothing-try-on', destination: '/pt/provador-roupa-bebe', statusCode: 301 },
      // DE
      { source: '/de/virtual-tattoo-simulator', destination: '/de/tattoo-simulator', statusCode: 301 },
      { source: '/de/realistic-swimwear-try-on', destination: '/de/bikini-anprobieren', statusCode: 301 },
      { source: '/de/virtual-earring-try-on', destination: '/de/ohrringe-anprobieren', statusCode: 301 },
      { source: '/de/virtual-wedding-dress-try-on', destination: '/de/brautkleid-anprobieren', statusCode: 301 },
      { source: '/de/virtual-nail-try-on', destination: '/de/naegel-simulator', statusCode: 301 },
      { source: '/de/virtual-glasses-try-on', destination: '/de/brille-anprobieren', statusCode: 301 },
      { source: '/de/virtual-jewelry-try-on', destination: '/de/schmuck-anprobieren', statusCode: 301 },
      { source: '/de/virtual-mens-suit-try-on', destination: '/de/herrenanzug-anprobieren', statusCode: 301 },
      { source: '/de/virtual-pet-clothing-try-on', destination: '/de/haustierkleidung-anprobieren', statusCode: 301 },
      { source: '/de/virtual-baby-clothing-try-on', destination: '/de/babykleidung-anprobieren', statusCode: 301 },
      // IT
      { source: '/it/virtual-tattoo-simulator', destination: '/it/simulatore-tatuaggi', statusCode: 301 },
      { source: '/it/realistic-swimwear-try-on', destination: '/it/prova-bikini', statusCode: 301 },
      { source: '/it/virtual-earring-try-on', destination: '/it/prova-orecchini', statusCode: 301 },
      { source: '/it/virtual-wedding-dress-try-on', destination: '/it/prova-abito-sposa', statusCode: 301 },
      { source: '/it/virtual-nail-try-on', destination: '/it/simulatore-unghie', statusCode: 301 },
      { source: '/it/virtual-glasses-try-on', destination: '/it/prova-occhiali', statusCode: 301 },
      { source: '/it/virtual-jewelry-try-on', destination: '/it/prova-gioielli', statusCode: 301 },
      { source: '/it/virtual-mens-suit-try-on', destination: '/it/prova-abito-uomo', statusCode: 301 },
      { source: '/it/virtual-pet-clothing-try-on', destination: '/it/prova-vestiti-animali', statusCode: 301 },
      { source: '/it/virtual-baby-clothing-try-on', destination: '/it/prova-vestiti-neonato', statusCode: 301 },
      // Costume + hairstyle (added later)
      { source: '/es/virtual-costume-try-on', destination: '/es/probador-disfraces', statusCode: 301 },
      { source: '/fr/virtual-costume-try-on', destination: '/fr/essayage-deguisements', statusCode: 301 },
      { source: '/pt/virtual-costume-try-on', destination: '/pt/provador-fatos-carnaval', statusCode: 301 },
      { source: '/de/virtual-costume-try-on', destination: '/de/kostueme-anprobieren', statusCode: 301 },
      { source: '/it/virtual-costume-try-on', destination: '/it/prova-costumi', statusCode: 301 },
      { source: '/es/virtual-hairstyle-try-on', destination: '/es/probador-peinados', statusCode: 301 },
      { source: '/fr/virtual-hairstyle-try-on', destination: '/fr/essayage-coiffures', statusCode: 301 },
      { source: '/pt/virtual-hairstyle-try-on', destination: '/pt/provador-penteados', statusCode: 301 },
      { source: '/de/virtual-hairstyle-try-on', destination: '/de/frisuren-anprobieren', statusCode: 301 },
      { source: '/it/virtual-hairstyle-try-on', destination: '/it/prova-acconciature', statusCode: 301 },
      // Cosplay
      { source: '/es/virtual-cosplay-try-on', destination: '/es/probador-cosplay', statusCode: 301 },
      { source: '/fr/virtual-cosplay-try-on', destination: '/fr/essayage-cosplay', statusCode: 301 },
      { source: '/pt/virtual-cosplay-try-on', destination: '/pt/provador-cosplay', statusCode: 301 },
      { source: '/de/virtual-cosplay-try-on', destination: '/de/cosplay-anprobieren', statusCode: 301 },
      { source: '/it/virtual-cosplay-try-on', destination: '/it/prova-cosplay', statusCode: 301 },

      // www → non-www (explicit 301 so GSC/legacy crawlers don't flag
      // the host normalization as a soft redirect — Next.js's `permanent: true`
      // emits 308, which is functionally equivalent but less universally
      // recognised by older SEO validators).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.agalaz.com' }],
        destination: 'https://agalaz.com/:path*',
        statusCode: 301,
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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://datafa.st https://*.datafa.st https://js.stripe.com https://bat.bing.net https://*.clarity.ms https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co https://datafa.st https://*.datafa.st https://api.stripe.com https://bat.bing.net https://*.bing.com https://*.clarity.ms https://www.facebook.com https://connect.facebook.net; font-src 'self'; frame-src 'self' https://checkout.stripe.com https://js.stripe.com https://www.facebook.com; frame-ancestors 'self' https://*.myshopify.com https://admin.shopify.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
