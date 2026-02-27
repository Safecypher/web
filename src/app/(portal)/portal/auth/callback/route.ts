import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const callbackUrl = searchParams.get('callbackUrl') ?? '/portal/calculator'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Route Handler context — errors here are non-fatal
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to the originally requested URL after successful auth
      return NextResponse.redirect(new URL(callbackUrl, origin))
    }

    console.error('[Auth callback] exchangeCodeForSession failed:', error.message)
  }

  // On error or missing code, redirect to login with the callbackUrl preserved
  const loginUrl = new URL('/portal/login', origin)
  loginUrl.searchParams.set('callbackUrl', callbackUrl)
  return NextResponse.redirect(loginUrl)
}
