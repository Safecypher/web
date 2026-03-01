'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Button } from '@/components/ui'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function DemoFormSection() {
  const posthog = usePostHog()
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [formStarted, setFormStarted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      phone: (formData.get('phone') as string) || undefined,
      challenge: (formData.get('challenge') as string) || undefined,
    }

    try {
      const res = await fetch('/api/submit/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        posthog?.capture('demo_request', {
          email: payload.email,
          company: payload.company,
          role: payload.role,
        })
        posthog?.identify(payload.email, {
          name: payload.name,
          company: payload.company,
        })
        setFormState('success')
      } else {
        setFormState('error')
        setErrorMessage('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setFormState('error')
      setErrorMessage('Could not reach the server. Check your connection and try again.')
    }
  }

  if (formState === 'success') {
    return (
      <section id="demo" className="bg-neutral bg-base-100 border-t border-base-300 py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-4">Thanks &mdash; we&apos;ll be in touch.</h2>
          <p className="text-base-content/60 text-lg">
            Expect a reply within one business day.
          </p>
          <p className="text-base-content/40 text-sm mt-4">
            While you wait &mdash;{' '}
            <Link href="/portal/calculator" className="text-accent underline">
              estimate your fraud prevention savings
            </Link>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="demo" className="bg-neutral bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">Request a Demo</h2>
          <p className="text-base-content/60 mt-3">
            See SafeCypher eliminating CNP fraud in your environment. No commitment required.
          </p>
        </div>

        <form name="demo-request" onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="form-name" value="demo-request" />

          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Full Name *"
              name="name"
              type="text"
              placeholder="Jane Smith"
              required
              fullWidth
              onKeyDown={() => {
                if (!formStarted) {
                  setFormStarted(true)
                  posthog?.capture('form_start', { form: 'demo_request' })
                }
              }}
            />
            <Input
              label="Role *"
              name="role"
              type="text"
              placeholder="Head of Fraud"
              required
              fullWidth
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Company *"
              name="company"
              type="text"
              placeholder="Acme Bank"
              required
              fullWidth
            />
            <Input
              label="Work Email *"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
              fullWidth
            />
          </div>

          <Input
            label="Phone (optional)"
            name="phone"
            type="tel"
            placeholder="+44 7700 000000"
            fullWidth
          />

          <Textarea
            label={"What's your biggest fraud challenge right now? (optional)"}
            name="challenge"
            placeholder="e.g. Rising CNP chargebacks, agentic commerce risk, credential stuffing..."
            rows={4}
            fullWidth
          />

          {formState === 'error' && (
            <div className="alert alert-error text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={formState === 'submitting'}
          >
            Request Demo
          </Button>
        </form>

      </div>
    </section>
  )
}
