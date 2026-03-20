import { NextRequest } from 'next/server'

type AttioEventBody = {
  event: string
  email?: string
  name?: string
  company?: string
  role?: string
  message?: string
  [key: string]: unknown
}

export async function POST(request: NextRequest): Promise<Response> {
  // 403 guard — reject direct browser calls
  const internalToken = request.headers.get('x-internal-token')
  if (!internalToken || internalToken !== process.env.INTERNAL_API_SECRET) {
    return new Response('Forbidden', { status: 403 })
  }

  const body = (await request.json()) as AttioEventBody

  const attioEnabled = process.env.ATTIO_ENABLED === 'true'
  const attioApiKey = process.env.ATTIO_API_KEY

  // Dev stub mode
  if (!attioEnabled || !attioApiKey) {
    if (attioEnabled && !attioApiKey) {
      console.error('[Attio] ATTIO_ENABLED=true but ATTIO_API_KEY is missing')
    }
    console.log('[Attio stub]', body)
    return Response.json({ stub: true, event: body.event, email: body.email })
  }

  // Production mode
  try {
    if (body.name && body.email) {
      // Step 1 — Upsert Attio person using email as matching key
      const nameParts = body.name.split(' ')
      const firstName = nameParts[0] ?? body.name
      const lastName = nameParts.slice(1).join(' ') || ''

      const personRes = await fetch(
        'https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${attioApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              values: {
                email_addresses: [{ email_address: body.email }],
                name: [{ first_name: firstName, last_name: lastName }],
              },
            },
          }),
        }
      )

      if (!personRes.ok) {
        console.error('[Attio] Person upsert failed', personRes.status)
        return Response.json({ ok: false }, { status: 502 })
      }

      const personData = (await personRes.json()) as {
        data: { id: { record_id: string } }
      }
      const personRecordId = personData.data.id.record_id

      // Step 2 — Create event note linked to person
      const noteRes = await fetch('https://api.attio.com/v2/notes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${attioApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            format: 'plaintext',
            parent_object: 'people',
            parent_record_id: personRecordId,
            title: body.event,
            content: `Event: ${body.event}\nName: ${body.name}\nCompany: ${body.company ?? ''}\nRole: ${body.role ?? ''}\nMessage: ${body.message ?? ''}`,
          },
        }),
      })

      if (!noteRes.ok) {
        console.error('[Attio] Note creation failed', noteRes.status)
        // Silent prod failure — do not re-throw
      }

      // Step 3 — Add to event list for event_interest submissions
      if (body.event === 'event_interest') {
        const listRes = await fetch(
          'https://api.attio.com/v2/lists/6785d423-5356-4829-a392-e9efa2eb240e/entries',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${attioApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: {
                record_id: personRecordId,
              },
            }),
          }
        )

        if (!listRes.ok) {
          const detail = await listRes.text()
          console.error('[Attio] List entry failed', listRes.status, detail)
          // Silent failure — person was upserted, list is best-effort
        }
      }

      return Response.json({ ok: true, personRecordId })
    } else if (body.email) {
      // Event with email but no name (e.g. calculator_run from a known session)
      // Create a note only — no person upsert without a name to match on
      const noteRes = await fetch('https://api.attio.com/v2/notes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${attioApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            format: 'plaintext',
            parent_object: 'people',
            title: body.event,
            content: JSON.stringify(body, null, 2),
          },
        }),
      })

      if (!noteRes.ok) {
        console.error('[Attio] Note creation failed (no-name event)', noteRes.status)
      }

      return Response.json({ ok: true })
    } else {
      // Anonymous event (no name, no email) — log only, nothing to attach to Attio
      console.log('[Attio] Anonymous event received, no record created', body.event)
      return Response.json({ ok: true })
    }
  } catch (err) {
    console.error('[Attio] Unexpected error', err)
    return Response.json({ ok: false }, { status: 500 })
  }
}
