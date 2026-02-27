import type { CalculatorOutputs } from '@/lib/calculator/types'

interface SensitivityTableProps {
  rows: CalculatorOutputs['sensitivityRows']
  currencySymbol: string
}

// Full implementation in Task 3
export function SensitivityTable({ rows, currencySymbol }: SensitivityTableProps) {
  return (
    <div className="text-base-content/40 text-sm">
      Table loading...
      <span className="sr-only">{rows.length} {currencySymbol}</span>
    </div>
  )
}
