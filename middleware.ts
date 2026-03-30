import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
  domains: [
    {
      domain: 'www.snowmanager.com',
      defaultLocale: 'en',
      locales: ['en'],
    },
    {
      domain: 'www.snowmanager.dk',
      defaultLocale: 'da',
      locales: ['da'],
    },
    {
      domain: 'www.snowmanager.se',
      defaultLocale: 'se',
      locales: ['se'],
    },
  ],
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';

  // On .dk domain, rewrite /presentation to /presentation/da
  if (pathname === '/presentation' && host.includes('snowmanager.dk')) {
    const url = request.nextUrl.clone();
    url.pathname = '/presentation/da';
    return NextResponse.rewrite(url);
  }

  // On .se domain, rewrite /presentation to /presentation/se
  if (pathname === '/presentation' && host.includes('snowmanager.se')) {
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
