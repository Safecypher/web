import type { Metadata } from 'next'
import { FraudForumSection } from '@/components/marketing/fraud-forum/FraudForumSection'

export const metadata: Metadata = {
  title: 'Fraud Forum Events & Recordings | SafeCypher',
  description:
    'Watch recordings from past Fraud Forum events — bringing together senior fraud and payments leaders from across the industry.',
}

export default function FraudForumPage() {
  return <FraudForumSection />
}
