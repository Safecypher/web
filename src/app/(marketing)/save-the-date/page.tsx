import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SaveTheDateSection } from '@/components/marketing/save-the-date/SaveTheDateSection'

export const metadata: Metadata = {
  title: 'Save the Date — The Fraud Forum | SafeCypher',
  description: 'Register your interest in The Fraud Forum events in London and Canada. Be first to receive event details, agenda and confirmed speakers.',
}

export default function SaveTheDatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base-100" />}>
      <SaveTheDateSection />
    </Suspense>
  )
}
