'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input, Button } from '@/components/ui'

const EVENTS = [
  { id: 'UK', label: 'London, UK', description: 'The Fraud Forum — London 2026' },
  { id: 'CA', label: 'Toronto, Canada', description: 'The Fraud Forum — Canada 2026' },
] as const

type EventId = typeof EVENTS[number]['id']
type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function SaveTheDateSection() {
  const searchParams = useSearchParams()
  const eParam = searchParams.get('e')?.toUpperCase()

  const [selectedEvent, setSelectedEvent] = useState<EventId>(
    () => EVENTS.find(ev => ev.id === eParam)?.id ?? 'UK'
  )
  const [formState, setFormState] = useState<FormState>('idle')
  const [submittedEvent, setSubmittedEvent] = useState<EventId>('UK')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      event: selectedEvent,
    }

    try {
      const res = await fetch('/api/submit/event-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSubmittedEvent(selectedEvent)
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <section className="bg-base-100 py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-4">You&apos;re on the list.</h2>
          <p className="text-base-content/60 text-lg">
            You&apos;re registered for the {EVENTS.find(ev => ev.id === submittedEvent)!.description}.
            We&apos;ll be in touch with event details as they&apos;re confirmed.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-base-100 py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Hero block */}
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
          Save the Date
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
          {EVENTS.find(ev => ev.id === selectedEvent)!.description}
        </h1>
        <p className="text-base-content/60 text-lg mb-10">
          Register your interest and be the first to receive event details, agenda and confirmed speakers.
        </p>

        {/* Event selector */}
        <div className="flex gap-3 mb-8">
          {EVENTS.map(ev => (
            <button
              key={ev.id}
              type="button"
              className={ev.id === selectedEvent ? 'btn btn-primary' : 'btn btn-outline'}
              onClick={() => setSelectedEvent(ev.id)}
            >
              {ev.label}
            </button>
          ))}
        </div>

        <div className="border-t border-base-300 mb-10" />

        {/* Form */}
        <form name="event-interest" onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name *"
            name="name"
            type="text"
            placeholder="Jane Smith"
            required
            fullWidth
          />
          <Input
            label="Email Address *"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            fullWidth
          />

          {formState === 'error' && (
            <div className="alert alert-error text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Something went wrong. Please try again.
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={formState === 'submitting'}
          >
            Register Interest
          </Button>
        </form>
      </div>
    </section>
  )
}
