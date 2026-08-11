import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { generateNonce } from '@/lib/csp'

export async function middleware(request: NextRequest) {
  const nonce = generateNonce()
  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://generativelanguage.googleapis.com https://accounts.google.com https://oauth2.googleapis.com",
    "form-action 'self' https://accounts.google.com https://*.supabase.co",
    "frame-src 'self' https://accounts.google.com",
    "frame-ancestors 'self'",
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  const response = await updateSession(request, requestHeaders)
  response.headers.set('Content-Security-Policy', cspHeader)
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
