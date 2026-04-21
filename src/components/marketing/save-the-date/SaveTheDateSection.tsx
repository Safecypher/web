'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input, Button } from '@/components/ui'

const EVENTS = [
  {
    id: 'UK',
    label: 'London, UK',
    description: 'The Fraud Forum — London 2026',
    details: {
      date: 'Thursday 23 April 2026',
      time: '1:00 PM – 9:00 PM (lunch through dinner)',
      venue: 'The Treehouse Hotel',
      address: '14-15 Langham Pl, London W1B 2QS',
    },
  },
  {
    id: 'UK2',
    label: 'London, UK (June)',
    description: 'The Fraud Forum — London June 2026',
    details: {
      date: 'Tuesday 16 June 2026',
      time: '1:00 PM – 9:00 PM (lunch through dinner)',
      venue: 'The Treehouse Hotel',
      address: '14-15 Langham Pl, London W1B 2QS',
    },
  },
  { id: 'CA', label: 'Toronto, Canada', description: 'The Fraud Forum — Canada 2026', details: null },
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

        {/* Event details */}
        {EVENTS.find(ev => ev.id === selectedEvent)?.details && (() => {
          const d = EVENTS.find(ev => ev.id === selectedEvent)!.details!
          return (
            <div className="bg-base-200 rounded-2xl px-6 py-5 mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span className="text-base-content font-medium">{d.date}</span>
              </div>
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className="text-base-content">{d.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <span className="text-base-content font-medium">{d.venue}</span>
                  <br />
                  <span className="text-base-content/60 text-sm">{d.address}</span>
                </div>
              </div>
            </div>
          )
        })()}

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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
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
