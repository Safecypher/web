import type { Metadata } from 'next'
import { PlatformHeroSection } from '@/components/marketing/platform/PlatformHeroSection'
import { ApproachSection } from '@/components/marketing/platform/ApproachSection'
import { ArchitectureDiagram } from '@/components/marketing/platform/ArchitectureDiagram'
import { ProductPortfolioSection } from '@/components/marketing/platform/ProductPortfolioSection'
import { CompetitiveSection } from '@/components/marketing/platform/CompetitiveSection'
import { PlatformProofSection } from '@/components/marketing/platform/PlatformProofSection'
import { PlatformCtaSection } from '@/components/marketing/platform/PlatformCtaSection'
import { QuoteSection } from '@/components/marketing/shared/QuoteSection'

export const metadata: Metadata = {
  title: 'Platform Overview — SafeCypher',
  description:
    'One API integration. Seven fraud-prevention products. Built on dynamic credentials that make stolen card data worthless.',
}

export default function PlatformPage() {
  return (
    <>
      <PlatformHeroSection />
      <ApproachSection />
      <ArchitectureDiagram />
      <ProductPortfolioSection />
      <CompetitiveSection />
      <PlatformProofSection />
      <QuoteSection />
      <PlatformCtaSection />
    </>
  )
}
