import { type Metadata } from 'next'
import { CalculatorPage } from '@/components/portal/calculator/CalculatorPage'

export const metadata: Metadata = {
  title: 'Value Calculator | SafeCypher Portal',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CalculatorRoutePage({ searchParams }: PageProps) {
  const params = await searchParams
  const portfolioSize = typeof params.portfolioSize === 'string' ? params.portfolioSize : undefined
  return portfolioSize
    ? <CalculatorPage portfolioSize={portfolioSize} />
    : <CalculatorPage />
}
