import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ContactFormSection } from '@/components/marketing/contact/ContactFormSection'

export const metadata: Metadata = {
  title: 'Contact — SafeCypher',
  description: 'Request a demo, talk to us about your results, or book time directly.',
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base-100" />}>
      <ContactFormSection />
    </Suspense>
  )
}
