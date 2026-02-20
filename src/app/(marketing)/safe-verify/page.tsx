import type { Metadata } from 'next'
import { SvHeroSection } from '@/components/marketing/safe-verify/SvHeroSection'
import { SvUseCaseTabs } from '@/components/marketing/safe-verify/SvUseCaseTabs'
import { SvFlowDiagram } from '@/components/marketing/safe-verify/SvFlowDiagram'
import { SvNuclearKeySection } from '@/components/marketing/safe-verify/SvNuclearKeySection'
import { SvBenefitsSection } from '@/components/marketing/safe-verify/SvBenefitsSection'
import { SvIntegrationSection } from '@/components/marketing/safe-verify/SvIntegrationSection'
import { SvCtaSection } from '@/components/marketing/safe-verify/SvCtaSection'

export const metadata: Metadata = {
  title: 'Safe Verify — SafeCypher',
  description:
    'Safe Verify transforms your banking app into a secure verification channel. Eliminate vishing and bidirectionally verify every call.',
}

export default function SafeVerifyPage() {
  return (
    <>
      <SvHeroSection />
      <SvUseCaseTabs />
      <SvFlowDiagram />
      <SvNuclearKeySection />
      <SvBenefitsSection />
      <SvIntegrationSection />
      <SvCtaSection />
    </>
  )
}
