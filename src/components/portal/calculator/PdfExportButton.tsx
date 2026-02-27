'use client'

import { useState } from 'react'
import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculator/types'

interface PdfExportButtonProps {
  inputs: CalculatorInputs
  outputs: CalculatorOutputs
  currencySymbol: string
}

export function PdfExportButton({ inputs, outputs, currencySymbol }: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      // Dynamic import — avoids window access at module scope (Pitfall 5 from RESEARCH.md)
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const fmt = (v: number) => `${currencySymbol}${Math.round(v).toLocaleString('en')}`
      const pct = (v: number) => `${(v * 100).toFixed(2)}%`

      let y = 20

      // Header
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('SafeCypher Value Calculator Report', 20, y)
      y += 8

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(120, 120, 120)
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, y)
      doc.text(`Region: ${inputs.region}  |  Mode: ${inputs.calculationMode}`, 80, y)
      y += 12

      // Divider
      doc.setDrawColor(200, 200, 200)
      doc.line(20, y, 190, y)
      y += 8

      // Headline metrics
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(59, 130, 246)
      doc.text('Headline Results', 20, y)
      y += 7

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(30, 30, 30)
      doc.text(`Year 1 Net Savings:     ${fmt(outputs.totalYr1Savings)}`, 20, y)
      y += 6
      doc.text(`  Without halo effect:  ${fmt(outputs.totalYr1SavingsDirectOnly)}`, 20, y)
      y += 6
      doc.text(`Breakeven:              ${outputs.breakevenDays != null ? `${outputs.breakevenDays.toFixed(0)} days` : 'N/A'}`, 20, y)
      y += 6
      doc.text(`Ongoing Annual Savings: ${fmt(outputs.totalOngoingSavings)}`, 20, y)
      y += 6
      doc.text(`Interchange Uplift Yr1: ${fmt(outputs.interchangeUpliftYr1Combined)}  (additional, not in headline)`, 20, y)
      y += 10

      // Divider
      doc.setDrawColor(200, 200, 200)
      doc.line(20, y, 190, y)
      y += 8

      // Input summary
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(59, 130, 246)
      doc.text('Your Inputs', 20, y)
      y += 7

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(30, 30, 30)

      const inputLines: [string, string][] = [
        ['Debit card accounts', inputs.debitAccounts.toLocaleString('en')],
        ['Credit card accounts', inputs.creditAccounts.toLocaleString('en')],
        ['Year 1 adoption rate', pct(inputs.year1AdoptionRate)],
        ['Ongoing adoption rate', pct(inputs.ongoingAdoptionRate)],
        ['Debit fraud rate', pct(inputs.debitFraudRate)],
        ['Credit fraud rate', pct(inputs.creditFraudRate)],
      ]

      for (const [label, value] of inputLines) {
        doc.text(`${label}:`, 25, y)
        doc.text(value, 115, y)
        y += 5
      }
      y += 5

      // Implementation cost
      doc.setDrawColor(200, 200, 200)
      doc.line(20, y, 190, y)
      y += 8

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(59, 130, 246)
      doc.text('Implementation Cost', 20, y)
      y += 7

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(30, 30, 30)
      doc.text('Note: One-time and first-year costs', 20, y)
      y += 5
      doc.text(`TSYS one-time setup:`, 25, y)
      doc.text(fmt(inputs.oneTimeTsysCost), 115, y)
      y += 5
      doc.text(`Annual TSYS platform fee:`, 25, y)
      doc.text(fmt(inputs.annualTsysFee), 115, y)
      y += 5
      doc.text(`Mobile app development:`, 25, y)
      doc.text(fmt(inputs.mobileDevCost), 115, y)
      y += 5
      doc.setFont('helvetica', 'bold')
      doc.text(`Total implementation cost:`, 25, y)
      doc.text(fmt(outputs.totalImplCost), 115, y)
      y += 10

      // Footer
      doc.setDrawColor(200, 200, 200)
      doc.line(20, y, 190, y)
      y += 6
      doc.setFontSize(8)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(150, 150, 150)
      doc.text(
        'This report is based on the inputs you provided. Contact SafeCypher at safecypher.com/contact for a detailed analysis.',
        20,
        y,
        { maxWidth: 170 }
      )

      doc.save('safecypher-value-report.pdf')
    } catch (err) {
      console.error('[PDF] Download failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className="btn btn-outline btn-sm"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? 'Generating...' : 'Download report'}
    </button>
  )
}
