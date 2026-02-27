'use server'

import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculator/types'

// ABSOLUTE URL REQUIRED: Server Actions run server-side where relative URLs have no implicit host.
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export async function fireCalculatorRun(
  inputs: CalculatorInputs,
  outputs: CalculatorOutputs,
  userEmail?: string
) {
  try {
    await fetch(`${BASE}/api/attio/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': process.env.INTERNAL_API_SECRET ?? '',
      },
      body: JSON.stringify({ event: 'calculator_run', email: userEmail, inputs, outputs }),
    })
  } catch (err) {
    console.error('[Attio] fireCalculatorRun failed', err)
  }
}

export async function firePortalLogin(email: string) {
  try {
    await fetch(`${BASE}/api/attio/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': process.env.INTERNAL_API_SECRET ?? '',
      },
      body: JSON.stringify({ event: 'portal_login', email }),
    })
  } catch (err) {
    console.error('[Attio] firePortalLogin failed', err)
  }
}

export async function fireMockupViewed(email?: string) {
  try {
    await fetch(`${BASE}/api/attio/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': process.env.INTERNAL_API_SECRET ?? '',
      },
      body: JSON.stringify({ event: 'mockup_viewed', email }),
    })
  } catch (err) {
    console.error('[Attio] fireMockupViewed failed', err)
  }
}
