import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuth = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isOnboarding = request.nextUrl.pathname.startsWith('/onboarding')

  // If user is authenticated and tries to access auth pages, redirect to admin
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // If user is not authenticated and tries to access admin pages, redirect to sign in
  if (isAdminPage && !isAuth) {
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${request.nextUrl.pathname}`, request.url)
    )
  }

  // If user is not authenticated and tries to access onboarding, redirect to sign up
  if (isOnboarding && !isAuth) {
    return NextResponse.redirect(new URL('/auth/signup', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*', '/onboarding/:path*'],
}
