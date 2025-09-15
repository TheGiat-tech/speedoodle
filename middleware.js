import { NextResponse } from 'next/server'; // Vercel Edge API (works in plain projects too)

export const config = { matcher: ['/((?!_next|.*\\..*).*)'] };

export default function middleware(req) {
  const url = req.nextUrl.clone();
  const qLang = url.searchParams.get('lang');
  const cookieLang = req.cookies.get('lang')?.value;
  const country = req.geo?.country || '';

  // Manual override via ?lang
  if (qLang === 'he' || qLang === 'en') {
    if (qLang === 'he' && !url.pathname.startsWith('/he/')) {
      url.pathname = url.pathname === '/' ? '/he/' : '/he' + url.pathname;
    }
    if (qLang === 'en' && url.pathname.startsWith('/he/')) {
      url.pathname = url.pathname.replace(/^\/he/, '') || '/';
    }
    url.searchParams.delete('lang');
    const res = NextResponse.redirect(url);
    res.cookies.set('lang', qLang, { path: '/', maxAge: 60*60*24*180 });
    return res;
  }

  const lang = cookieLang || (country === 'IL' ? 'he' : 'en');
  const pathIsHe = url.pathname.startsWith('/he/');

  if (lang === 'he' && !pathIsHe) {
    url.pathname = url.pathname === '/' ? '/he/' : '/he' + url.pathname;
    return NextResponse.rewrite(url);
  }

  if (lang === 'en' && pathIsHe) {
    url.pathname = url.pathname.replace(/^\/he/, '') || '/';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
