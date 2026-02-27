'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface SavingsBarChartProps {
  yr1Total: number
  ongoingTotal: number
  currencySymbol: string
}

export function SavingsBarChart({ yr1Total, ongoingTotal, currencySymbol }: SavingsBarChartProps) {
  const data = [
    { name: 'Year 1 Savings', savings: yr1Total },
    { name: 'Ongoing Annual', savings: ongoingTotal },
  ]

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: 'currentColor' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) =>
            v >= 1_000_000
              ? `${currencySymbol}${(v / 1_000_000).toFixed(1)}M`
              : `${currencySymbol}${(v / 1_000).toFixed(0)}k`
          }
          tick={{ fontSize: 11, fill: 'currentColor' }}
          axisLine={false}
          tickLine={false}
          width={70}
        />
        <Tooltip
          formatter={(v: number | undefined) => [
            v != null ? `${currencySymbol}${Math.round(v).toLocaleString('en')}` : '—',
            'Net Savings',
          ]}
          contentStyle={{
            backgroundColor: 'hsl(var(--b2, 0 0% 10%))',
            border: '1px solid hsl(var(--b3, 0 0% 15%))',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
          }}
        />
        <Bar dataKey="savings" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
