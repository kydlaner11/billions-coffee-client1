    import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  // Mendeteksi protokol (terutama jika di-host di Vercel/Nginx)
  const protocol = request.headers.get('x-forwarded-proto') || url.protocol;

  const isWww = hostname.startsWith('www.');
  const isHttp = protocol.startsWith('http:');

  // Jika URL menggunakan 'www' atau 'http', lakukan redirect 301
  if (isWww || isHttp) {
    const cleanHostname = hostname.replace(/^www\./, '');
    const redirectUrl = `https://${cleanHostname}${url.pathname}${url.search}`;
    
    // 301 menandakan "Moved Permanently" untuk SEO
    return NextResponse.redirect(redirectUrl, 301); 
  }

  return NextResponse.next();
}

// Opsional: hindari middleware berjalan di aset statis/gambar
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};