import type { CalculatorOutputs } from '@/lib/calculator/types'

interface SensitivityTableProps {
  rows: CalculatorOutputs['sensitivityRows']
  currencySymbol: string
}

export function SensitivityTable({ rows, currencySymbol }: SensitivityTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            <th className="text-base-content/60 font-medium">Adoption Rate</th>
            <th className="text-base-content/60 font-medium text-right">Annual Savings</th>
            <th className="text-base-content/60 font-medium text-right">Breakeven</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isMandatory = row.adoptionRate === 0.90
            return (
              <tr
                key={row.adoptionRate}
                className={
                  row.isCurrentRate
                    ? 'bg-primary/5 font-medium'
                    : ''
                }
              >
                <td>
                  <div className="flex items-center gap-2">
                    <span>{(row.adoptionRate * 100).toFixed(0)}%</span>
                    {isMandatory && (
                      <span className="badge badge-primary badge-sm">Mandatory adoption</span>
                    )}
                    {row.isCurrentRate && !isMandatory && (
                      <span className="text-xs text-primary">&#9668; current</span>
                    )}
                    {row.isCurrentRate && isMandatory && (
                      <span className="text-xs text-primary">&#9668; current</span>
                    )}
                  </div>
                </td>
                <td className="text-right font-mono">
                  {currencySymbol}{Math.round(row.annualSavings).toLocaleString('en')}
                </td>
                <td className="text-right font-mono">
                  {row.breakevenDays != null ? `${row.breakevenDays.toFixed(1)} days` : '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
