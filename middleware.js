import { NextResponse } from 'next/server'; // Vercel Edge API (works in plain projects too)

export const config = { matcher: ['/((?!_next|.*\\..*).*)'] };

export default function middleware(req) {
  const url = req.nextUrl.clone();
  const qLang = url.searchParams.get('lang');
  const cookieLang = req.cookies.get('lang')?.value;
  const country = req.geo?.country || '';

  // If user explicitly set ?lang=, persist and honor it
  if (qLang === 'he' || qLang === 'en') {
    const res = NextResponse.next();
    res.cookies.set('lang', qLang, { path: '/', maxAge: 60*60*24*180 });
    return res;
  }

  // If cookie exists, honor it
  if (cookieLang === 'he' || cookieLang === 'en') {
    return NextResponse.next();
  }

  // No cookie: geo-based default (Israel -> Hebrew)
  if (country === 'IL') {
    // rewrite root or any path to /he/...
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/he/';
    } else {
      url.pathname = '/he' + url.pathname;
    }
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
