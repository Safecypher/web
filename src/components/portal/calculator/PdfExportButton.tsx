'use client'

import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculator/types'

interface PdfExportButtonProps {
  inputs: CalculatorInputs
  outputs: CalculatorOutputs
  currencySymbol: string
}

// Full implementation in Task 3
export function PdfExportButton({ inputs, outputs, currencySymbol }: PdfExportButtonProps) {
  return (
    <button className="btn btn-outline btn-sm" disabled>
      Download report
      <span className="sr-only">{inputs.region} {outputs.totalYr1Savings} {currencySymbol}</span>
    </button>
  )
}
