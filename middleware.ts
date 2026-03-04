import { NextRequest, NextResponse } from 'next/server';

const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ',
]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const existingLang = request.cookies.get('agalaz-lang')?.value;
  if (existingLang === 'es' || existingLang === 'en') {
    return response;
  }

  const country = request.headers.get('x-vercel-ip-country') || '';
  const locale = SPANISH_COUNTRIES.has(country) ? 'es' : 'en';

  response.cookies.set('agalaz-lang', locale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
