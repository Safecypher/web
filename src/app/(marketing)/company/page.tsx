import type { Metadata } from 'next'
import { CompanyHeroSection } from '@/components/marketing/company/CompanyHeroSection'
import { CompanyMissionSection } from '@/components/marketing/company/CompanyMissionSection'
import { CompanyBeliefsSection } from '@/components/marketing/company/CompanyBeliefsSection'
import { CompanyHumanCostSection } from '@/components/marketing/company/CompanyHumanCostSection'
import { CompanyTeamSection } from '@/components/marketing/company/CompanyTeamSection'
import { CompanyCtaSection } from '@/components/marketing/company/CompanyCtaSection'

export const metadata: Metadata = {
  title: 'Company — SafeCypher',
  description:
    'We built SafeCypher to eliminate card-not-present fraud — not manage it. Our mission, beliefs, and team.',
}

export default function CompanyPage() {
  return (
    <>
      <CompanyHeroSection />
      <CompanyMissionSection />
      <CompanyBeliefsSection />
      <CompanyHumanCostSection />
      <CompanyTeamSection />
      <CompanyCtaSection />
    </>
  )
}
