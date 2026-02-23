import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  const body = (await request.json()) as {
    name: string
    email: string
    company: string
    role: string
    phone?: string
    challenge?: string
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  // 1. Forward to Netlify form endpoint
  const netlifyBody = new URLSearchParams({
    'form-name': 'demo-request',
    name: body.name,
    email: body.email,
    company: body.company,
    role: body.role,
    phone: body.phone ?? '',
    challenge: body.challenge ?? '',
  })

  const netlifyRes = await fetch(`${siteUrl}/__forms.html`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: netlifyBody.toString(),
  })
  // Netlify form endpoint returns 200 on success in production.
  // In dev it returns non-200 (no Netlify runtime) — that is acceptable.

  // 2. Fire Attio event (server-to-server, secret never leaves server)
  const attioRes = await fetch(`${siteUrl}/api/attio/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-token': process.env.INTERNAL_API_SECRET ?? '',
    },
    body: JSON.stringify({
      event: 'demo_request',
      email: body.email,
      name: body.name,
      company: body.company,
      role: body.role,
      message: body.challenge ?? '',
    }),
  })

  if (!attioRes.ok && process.env.NODE_ENV !== 'development') {
    console.error('[submit/demo-request] Attio call failed', attioRes.status)
  }

  return Response.json({
    ok: netlifyRes.ok || process.env.NODE_ENV === 'development',
  })
}
