import { HeroSection } from '@/components/marketing/home/HeroSection'
import { UrgencySection } from '@/components/marketing/home/UrgencySection'
import { AudiencesSection } from '@/components/marketing/home/AudiencesSection'
import { OneIntegrationSection } from '@/components/marketing/home/OneIntegrationSection'
import { ProofSection } from '@/components/marketing/home/ProofSection'
import { HumanCostSection } from '@/components/marketing/home/HumanCostSection'
import { DemoFormSection } from '@/components/marketing/home/DemoFormSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UrgencySection />
      <AudiencesSection />
      <OneIntegrationSection />
      <ProofSection />
      <HumanCostSection />
      <DemoFormSection />
    </>
  )
}
