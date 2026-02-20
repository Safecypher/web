import type { Metadata } from 'next'
import { DscHeroSection } from '@/components/marketing/dsc/DscHeroSection'
import { DscSolutionSection } from '@/components/marketing/dsc/DscSolutionSection'
import { HowItWorksSection } from '@/components/marketing/dsc/HowItWorksSection'
import { DscProofSection } from '@/components/marketing/dsc/DscProofSection'
import { ForIssuersSection } from '@/components/marketing/dsc/ForIssuersSection'
import { DscCtaSection } from '@/components/marketing/dsc/DscCtaSection'

export const metadata: Metadata = {
  title: 'Dynamic Security Codes — SafeCypher',
  description:
    "Time-limited CVV codes delivered through your cardholder's banking app. Stolen credentials expire before they can be used.",
}

export default function DscPage() {
  return (
    <>
      <DscHeroSection />
      <DscSolutionSection />
      <HowItWorksSection />
      <DscProofSection />
      <ForIssuersSection />
      <DscCtaSection />
    </>
  )
}
