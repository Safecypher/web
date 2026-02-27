import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // CRITICAL: use getUser() not getSession() — getSession reads cookie without
  // server-side revalidation and can be spoofed.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname, search } = request.nextUrl

  // Auth endpoints are always allowed through — they are the login flow itself.
  const isAuthRoute =
    pathname === '/portal/login' ||
    pathname.startsWith('/portal/auth/')

  // All other /portal/* routes require an authenticated user.
  if (!isAuthRoute && pathname.startsWith('/portal/') && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/portal/login'
    loginUrl.search = ''
    loginUrl.searchParams.set(
      'callbackUrl',
      pathname + search
    )
    return NextResponse.redirect(loginUrl)
  }

  // IMPORTANT: always return supabaseResponse (not a new NextResponse.next()).
  // Returning a different response drops the cookie mutations that Supabase needs
  // to keep the session alive.
  return supabaseResponse
}
