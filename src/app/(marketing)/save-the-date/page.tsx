import type { Metadata } from 'next'
import { SaveTheDateSection } from '@/components/marketing/save-the-date/SaveTheDateSection'

export const metadata: Metadata = {
  title: 'Save the Date — HG2 Payments Innovation Summit | SafeCypher',
  description: 'Register your interest in the HG2 Payments Innovation Summit. Be first to receive event details, agenda and confirmed speakers.',
}

export default function SaveTheDatePage() {
  return <SaveTheDateSection />
}
