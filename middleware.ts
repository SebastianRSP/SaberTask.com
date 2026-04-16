import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
  domains: [
    {
      domain: 'www.sabertask.com',
      defaultLocale: 'en',
      locales: ['en'],
    },
    {
      domain: 'www.sabertask.dk',
      defaultLocale: 'da',
      locales: ['da'],
    },
    {
      domain: 'www.sabertask.se',
      defaultLocale: 'se',
      locales: ['se'],
    },
  ],
});

const DEV_LOCALE_COOKIE = 'dev-locale';
const LOCALE_TO_DOMAIN: Record<string, string> = {
  en: 'www.sabertask.com',
  da: 'www.sabertask.dk',
  se: 'www.sabertask.se',
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';
  const isLocalDev = host.includes('localhost') || host.startsWith('127.0.0.1');

  // ── Dev-only locale override (only on localhost) ──
  if (isLocalDev) {
    const localeParam = request.nextUrl.searchParams.get('locale');
    if (localeParam && LOCALE_TO_DOMAIN[localeParam]) {
      const cleanUrl = request.nextUrl.clone();
      cleanUrl.searchParams.delete('locale');
      const response = NextResponse.redirect(cleanUrl);
      response.cookies.set(DEV_LOCALE_COOKIE, localeParam, { path: '/' });
      return response;
    }

    const cookieLocale = request.cookies.get(DEV_LOCALE_COOKIE)?.value;
    if (cookieLocale && LOCALE_TO_DOMAIN[cookieLocale]) {
      // Fake the host header so next-intl's domain matcher picks the right locale
      const headers = new Headers(request.headers);
      headers.set('host', LOCALE_TO_DOMAIN[cookieLocale]);
      headers.set('x-forwarded-host', LOCALE_TO_DOMAIN[cookieLocale]);
      const fakedRequest = new NextRequest(request.url, {
        headers,
        method: request.method,
      });
      return intlMiddleware(fakedRequest);
    }
  }

  // On .dk domain, rewrite /presentation to /presentation/da
  if (pathname === '/presentation' && host.includes('sabertask.dk')) {
    const url = request.nextUrl.clone();
    url.pathname = '/presentation/da';
    return NextResponse.rewrite(url);
  }

  // On .se domain, rewrite /presentation to /presentation/se
  if (pathname === '/presentation' && host.includes('sabertask.se')) {
    const url = request.nextUrl.clone();
    url.pathname = '/presentation/se';
    return NextResponse.rewrite(url);
  }

  // Skip intl middleware for excluded paths
  if (pathname.startsWith('/presentation') || pathname.startsWith('/invest')) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
