import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  const body = (await request.json()) as {
    name: string
    email: string
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  // 1. Forward to Netlify form endpoint
  const netlifyBody = new URLSearchParams({
    'form-name': 'event-interest',
    name: body.name,
    email: body.email,
  })

  await fetch(`${siteUrl}/__forms.html`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: netlifyBody.toString(),
  })

  // 2. Fire Attio event (server-to-server, secret never leaves server)
  const attioRes = await fetch(`${siteUrl}/api/attio/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-token': process.env.INTERNAL_API_SECRET ?? '',
    },
    body: JSON.stringify({
      event: 'event_interest',
      email: body.email,
      name: body.name,
    }),
  })

  if (!attioRes.ok && process.env.NODE_ENV !== 'development') {
    console.error('[submit/event-interest] Attio call failed', attioRes.status)
  }

  return Response.json({ ok: true })
}
