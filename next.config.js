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
      // Spanish URL aliases
      { source: '/privacidad', destination: '/privacy', permanent: true },
      { source: '/terminos', destination: '/terms', permanent: true },
      { source: '/probador-virtual', destination: '/virtual-try-on', permanent: true },
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
