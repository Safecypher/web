'use client'

interface SavingsBarChartProps {
  yr1Total: number
  ongoingTotal: number
  currencySymbol: string
}

// Full implementation in Task 3
export function SavingsBarChart({ yr1Total, ongoingTotal, currencySymbol }: SavingsBarChartProps) {
  return (
    <div className="h-60 flex items-center justify-center text-base-content/40 text-sm">
      Chart loading...
      <span className="sr-only">{yr1Total} {ongoingTotal} {currencySymbol}</span>
    </div>
  )
}
