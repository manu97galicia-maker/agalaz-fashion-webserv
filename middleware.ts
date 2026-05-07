import { NextRequest, NextResponse } from 'next/server';

const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ',
]);
const FRENCH_COUNTRIES = new Set(['FR', 'BE', 'LU', 'MC', 'CI', 'SN', 'ML', 'BF', 'CM', 'MG', 'TN', 'DZ', 'MA']);
const PORTUGUESE_COUNTRIES = new Set(['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL']);
const GERMAN_COUNTRIES = new Set(['DE', 'AT', 'CH', 'LI']);
const ITALIAN_COUNTRIES = new Set(['IT', 'SM', 'VA']);

// Landing pages that have localized versions
const LOCALIZED_LANDINGS = [
  '/virtual-tattoo-simulator',
  '/realistic-swimwear-try-on',
  '/virtual-earring-try-on',
];

function detectLocaleFromCountry(country: string): 'en' | 'es' | 'fr' | 'pt' | 'de' | 'it' {
  if (SPANISH_COUNTRIES.has(country)) return 'es';
  if (FRENCH_COUNTRIES.has(country)) return 'fr';
  if (PORTUGUESE_COUNTRIES.has(country)) return 'pt';
  if (GERMAN_COUNTRIES.has(country)) return 'de';
  if (ITALIAN_COUNTRIES.has(country)) return 'it';
  return 'en';
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get('host') || '';

  // Canonical host: in production, redirect any non-agalaz.com host (the
  // agalaz-fashion-webserv.vercel.app production alias, www.agalaz.com, etc.)
  // to the canonical domain so duplicate-content versions don't get indexed.
  // Scoped to VERCEL_ENV=production so PR preview deploys remain accessible.
  if (process.env.VERCEL_ENV === 'production' && host !== 'agalaz.com') {
    return NextResponse.redirect(`https://agalaz.com${pathname}${search}`, 308);
  }

  // Lowercase canonical: Next.js routes are all lowercase, so /Try-On is a 404
  // today. 308 to the lowercased pathname so external links with casual capital
  // letters still land on the right page.
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(pathname);
  if (!hasExtension && pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  const country = request.headers.get('x-vercel-ip-country') || '';
  const locale = detectLocaleFromCountry(country);

  // If user hits a root landing URL (e.g. /virtual-tattoo-simulator) and their
  // IP country maps to fr/pt/de/it, redirect to the localized version.
  // This ONLY fires on first visit — we set a cookie to skip on subsequent requests.
  const alreadyRouted = request.cookies.get('agalaz-lang-routed')?.value;
  if (!alreadyRouted && LOCALIZED_LANDINGS.includes(pathname)) {
    if (locale === 'fr' || locale === 'pt' || locale === 'de' || locale === 'it') {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${pathname}`;
      const redirect = NextResponse.redirect(url);
      redirect.cookies.set('agalaz-lang-routed', '1', {
        path: '/',
        maxAge: 365 * 24 * 60 * 60,
        sameSite: 'lax',
      });
      return redirect;
    }
  }

  // Detect URL-prefix locale so the root layout can render the correct
  // <html lang="..."> attribute. Reads the first path segment and matches
  // against our supported locales; falls back to 'en' for everything else.
  // Forwarded as a request header so server components / layouts can read it
  // via `headers().get('x-url-locale')`.
  const URL_LOCALES = new Set(['es', 'fr', 'pt', 'de', 'it', 'ar', 'hi', 'ko', 'ja', 'zh']);
  const firstSegment = pathname.split('/')[1] || '';
  const urlLocale = URL_LOCALES.has(firstSegment) ? firstSegment : 'en';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url-locale', urlLocale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set('agalaz-lang-routed', '1', {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'lax',
  });

  const existingLang = request.cookies.get('agalaz-lang')?.value;
  if (existingLang === 'es' || existingLang === 'en') {
    return response;
  }

  // For the Language Provider cookie, we only use en/es (fallback to en for non-ES speakers)
  const providerLocale = locale === 'es' ? 'es' : 'en';
  response.cookies.set('agalaz-lang', providerLocale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
