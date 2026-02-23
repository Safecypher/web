'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Button } from '@/components/ui'
import { ContactCalendlyButton } from './ContactCalendlyButton'

type Source = 'product' | 'calculator' | 'default'
type FormState = 'idle' | 'submitting' | 'success' | 'error'

const COPY: Record<Source, { heading: string; buttonText: string }> = {
  product:    { heading: 'Request a demo',                buttonText: 'Request a demo' },
  calculator: { heading: 'Talk to us about your results', buttonText: 'Talk to us about your results' },
  default:    { heading: 'Request a demo',                buttonText: 'Request a demo' },
}

function isValidSource(value: string | null): value is Source {
  return value === 'product' || value === 'calculator'
}

export function ContactFormSection() {
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Read sessionStorage once on mount for cross-navigation persistence.
  const [storedSource] = useState<Source>(() => {
    if (typeof window === 'undefined') return 'default'
    const stored = sessionStorage.getItem('contactSource')
    return isValidSource(stored) ? stored : 'default'
  })

  // Prefer URL param (reactive), fall back to stored value — plain variable, no state.
  const urlParam = searchParams.get('from')
  const source: Source = isValidSource(urlParam) ? urlParam : storedSource

  // Persist URL param to sessionStorage when present (external side-effect only, no setState).
  useEffect(() => {
    if (isValidSource(urlParam)) {
      sessionStorage.setItem('contactSource', urlParam)
    }
  }, [urlParam])

  const { heading, buttonText } = COPY[source]

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
      message: (formData.get('message') as string) || undefined,
    }

    try {
      const res = await fetch('/api/submit/contact-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        posthog?.capture('contact_request', {
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
      <section className="bg-neutral bg-base-100 border-t border-base-300 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-base-content mb-4">Thanks &mdash; we&apos;ll be in touch.</h1>
          <p className="text-base-content/60 text-lg">
            Expect a reply within one business day.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-neutral bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-base-content">{heading}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">
          {/* Form — left column, primary action */}
          <form name="contact-request" onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="form-name" value="contact-request" />

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Full Name *"
                name="name"
                type="text"
                placeholder="Jane Smith"
                required
                fullWidth
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

            <Textarea
              label="Message (optional)"
              name="message"
              placeholder="Tell us a bit about what you're working on..."
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
              {buttonText}
            </Button>
          </form>

          {/* Calendly column — stacks below form on mobile, right on desktop */}
          <div className="lg:w-64 flex flex-col items-center text-center gap-4 lg:pt-16">
            <p className="text-sm text-base-content/50">Prefer to book directly?</p>
            <ContactCalendlyButton />
            <p className="text-xs text-base-content/40">30-minute intro call</p>
          </div>
        </div>
      </div>
    </section>
  )
}
