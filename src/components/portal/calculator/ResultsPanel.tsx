'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CalculatorOutputs, CalculatorInputs } from '@/lib/calculator/types'

interface ResultsPanelProps {
  outputs: CalculatorOutputs
  inputs: CalculatorInputs
  currencySymbol: string
}

function ExpandableSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-base-300 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-base-content/80 hover:bg-base-200 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 bg-base-200/40 space-y-2 text-sm text-base-content/80">
          {children}
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-base-content/60">{label}</span>
      <span className="font-mono font-medium">{value}</span>
    </div>
  )
}

export function ResultsPanel({ outputs, inputs, currencySymbol }: ResultsPanelProps) {
  const fmt = (v: number) => `${currencySymbol}${Math.round(v).toLocaleString('en')}`

  const contactHref = `/contact?from=calculator&yr1=${Math.round(outputs.totalYr1Savings)}&breakeven=${outputs.breakevenDays?.toFixed(0) ?? ''}&da=${inputs.debitAccounts}&ca=${inputs.creditAccounts}`

  return (
    <div className="space-y-4">
      {/* Headline metrics */}
      <div className="card bg-base-200 p-5">
        <div className="space-y-1">
          <p className="text-sm font-medium text-base-content/60 uppercase tracking-wide">Year 1 Net Savings</p>
          <p className="text-4xl font-bold text-primary">{fmt(outputs.totalYr1Savings)}</p>

          {/* Without halo comparison */}
          <p className="text-xs text-base-content/50">
            Without halo effect:{' '}
            <span className="font-mono">{fmt(outputs.totalYr1SavingsDirectOnly)}</span>
          </p>
          <p className="text-xs text-base-content/40 italic">
            Fraudsters migrate away from issuers with strong security reputations. This bonus compounds over time.
          </p>
        </div>

        <div className="divider my-3" />

        <div>
          <p className="text-sm font-medium text-base-content/60 uppercase tracking-wide">Breakeven</p>
          <p className="text-2xl font-bold text-base-content">
            {outputs.breakevenDays != null ? `${outputs.breakevenDays.toFixed(0)} days` : '—'}
          </p>
        </div>
      </div>

      {/* Expandable sections */}
      <div className="space-y-2">
        <ExpandableSection title="Fraud Savings">
          <Row label="Year 1 gross savings" value={fmt(outputs.grossFraudSavingsYr1Combined)} />
          <Row label="Year 1 SafeCypher fees" value={`-${fmt(outputs.txFeesYr1Combined)}`} />
          <Row label="Year 1 net fraud savings" value={fmt(outputs.netFraudSavingsYr1Combined)} />
          <div className="divider my-1" />
          <Row label="Ongoing gross savings" value={fmt(outputs.grossFraudSavingsOngoingCombined)} />
          <Row label="Ongoing SafeCypher fees" value={`-${fmt(outputs.txFeesOngoingCombined)}`} />
          <Row label="Ongoing net fraud savings" value={fmt(outputs.netFraudSavingsOngoingCombined)} />
        </ExpandableSection>

        <ExpandableSection title="Interchange Uplift (additional, not in headline)">
          <p className="text-xs text-base-content/50 mb-2">
            Shown separately — increased transaction activity from SafeCypher adopters boosts interchange revenue.
          </p>
          <Row label="Year 1 interchange uplift" value={fmt(outputs.interchangeUpliftYr1Combined)} />
          <Row label="Ongoing interchange uplift" value={fmt(outputs.interchangeUpliftOngoingCombined)} />
        </ExpandableSection>

        <ExpandableSection title="Halo Effect Bonus">
          <p className="text-xs text-base-content/50 mb-2">
            Avg Year 1 halo factor: {((outputs.avgYr1HaloFactor - 1) * 100).toFixed(1)}% above direct savings
          </p>
          <Row label="Year 1 halo bonus" value={fmt(outputs.yr1HaloBonusCombined)} />
          <Row label="Ongoing halo bonus" value={fmt(outputs.ongoingHaloBonusCombined)} />
        </ExpandableSection>

        <ExpandableSection title="Implementation Cost">
          <p className="text-xs text-base-content/50 mb-2">One-time and first-year costs</p>
          <Row label="TSYS setup (one-time)" value={fmt(inputs.oneTimeTsysCost)} />
          <Row label="Annual TSYS platform fee" value={fmt(inputs.annualTsysFee)} />
          <Row label="Mobile app development" value={fmt(inputs.mobileDevCost)} />
          <div className="divider my-1" />
          <Row label="Total implementation cost" value={fmt(outputs.totalImplCost)} />
        </ExpandableSection>
      </div>

      {/* Contact CTA */}
      <Link
        href={contactHref}
        className="btn btn-primary w-full mt-6"
      >
        Talk to us about your results
      </Link>
    </div>
  )
}
