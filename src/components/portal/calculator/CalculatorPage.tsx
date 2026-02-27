'use client'

import { useQueryState, parseAsFloat, parseAsStringLiteral } from 'nuqs'
import { useMemo, useEffect, useRef, useState } from 'react'
import { calculate } from '@/lib/calculator/engine'
import { USD_DEFAULTS, PORTFOLIO_SPLIT_RATIO, REGION_CURRENCY } from '@/lib/calculator/defaults'
import type { CalculatorInputs } from '@/lib/calculator/types'
import { fireCalculatorRun } from '@/app/actions/attio'
import { createClient } from '@/lib/supabase/client'
import { InputSlider } from './InputSlider'
import { ResultsPanel } from './ResultsPanel'
import { SavingsBarChart } from './SavingsBarChart'
import { SensitivityTable } from './SensitivityTable'
import { PdfExportButton } from './PdfExportButton'

interface CalculatorPageProps {
  portfolioSize?: string
}

export function CalculatorPage({ portfolioSize }: CalculatorPageProps) {
  // -------------------------
  // URL state — all inputs
  // -------------------------
  const [debitAccounts, setDebitAccounts] = useQueryState(
    'da',
    parseAsFloat.withDefault(
      portfolioSize
        ? Math.round(parseFloat(portfolioSize) * PORTFOLIO_SPLIT_RATIO.debit)
        : USD_DEFAULTS.debitAccounts
    )
  )
  const [creditAccounts, setCreditAccounts] = useQueryState(
    'ca',
    parseAsFloat.withDefault(
      portfolioSize
        ? Math.round(parseFloat(portfolioSize) * PORTFOLIO_SPLIT_RATIO.credit)
        : USD_DEFAULTS.creditAccounts
    )
  )
  const [year1AdoptionRate, setYear1AdoptionRate] = useQueryState(
    'y1a',
    parseAsFloat.withDefault(USD_DEFAULTS.year1AdoptionRate)
  )
  const [ongoingAdoptionRate, setOngoingAdoptionRate] = useQueryState(
    'oa',
    parseAsFloat.withDefault(USD_DEFAULTS.ongoingAdoptionRate)
  )
  const [debitFraudRate, setDebitFraudRate] = useQueryState(
    'dfr',
    parseAsFloat.withDefault(USD_DEFAULTS.debitFraudRate)
  )
  const [creditFraudRate, setCreditFraudRate] = useQueryState(
    'cfr',
    parseAsFloat.withDefault(USD_DEFAULTS.creditFraudRate)
  )
  const [region, setRegion] = useQueryState(
    'region',
    parseAsStringLiteral(['USD', 'GBP', 'EUR'] as const).withDefault('USD')
  )
  const [calculationMode, setCalculationMode] = useQueryState(
    'mode',
    parseAsStringLiteral(['Direct Only', 'Direct + Halo Effect'] as const).withDefault(
      'Direct + Halo Effect'
    )
  )
  // Advanced mode params
  const [debitCNPTransactions, setDebitCNPTransactions] = useQueryState(
    'dcp',
    parseAsFloat.withDefault(USD_DEFAULTS.debitCNPTransactions)
  )
  const [creditCNPTransactions, setCreditCNPTransactions] = useQueryState(
    'ccp',
    parseAsFloat.withDefault(USD_DEFAULTS.creditCNPTransactions)
  )
  const [debitAvgTxValue, setDebitAvgTxValue] = useQueryState(
    'datv',
    parseAsFloat.withDefault(USD_DEFAULTS.debitAvgTxValue)
  )
  const [creditAvgTxValue, setCreditAvgTxValue] = useQueryState(
    'catv',
    parseAsFloat.withDefault(USD_DEFAULTS.creditAvgTxValue)
  )
  const [debitCvvPct, setDebitCvvPct] = useQueryState(
    'dcvv',
    parseAsFloat.withDefault(USD_DEFAULTS.debitCvvPct)
  )
  const [creditCvvPct, setCreditCvvPct] = useQueryState(
    'ccvv',
    parseAsFloat.withDefault(USD_DEFAULTS.creditCvvPct)
  )
  const [debitLossPerCase, setDebitLossPerCase] = useQueryState(
    'dlpc',
    parseAsFloat.withDefault(USD_DEFAULTS.debitLossPerCase)
  )
  const [creditLossPerCase, setCreditLossPerCase] = useQueryState(
    'clpc',
    parseAsFloat.withDefault(USD_DEFAULTS.creditLossPerCase)
  )
  const [issuerPct, setIssuerPct] = useQueryState(
    'ip',
    parseAsFloat.withDefault(USD_DEFAULTS.issuerPct)
  )
  const [institutionalCostMethod, setInstitutionalCostMethod] = useQueryState(
    'icm',
    parseAsStringLiteral(['Multiplier', 'Fixed Amount'] as const).withDefault(
      USD_DEFAULTS.institutionalCostMethod
    )
  )
  const [institutionalCostMultiplier, setInstitutionalCostMultiplier] = useQueryState(
    'icml',
    parseAsFloat.withDefault(USD_DEFAULTS.institutionalCostMultiplier)
  )
  const [debitFixedCostPerCase, setDebitFixedCostPerCase] = useQueryState(
    'dfcp',
    parseAsFloat.withDefault(USD_DEFAULTS.debitFixedCostPerCase)
  )
  const [creditFixedCostPerCase, setCreditFixedCostPerCase] = useQueryState(
    'cfcp',
    parseAsFloat.withDefault(USD_DEFAULTS.creditFixedCostPerCase)
  )
  const [feePerTx, setFeePerTx] = useQueryState(
    'fpt',
    parseAsFloat.withDefault(USD_DEFAULTS.feePerTx)
  )
  const [upliftPerAdopter, setUpliftPerAdopter] = useQueryState(
    'upa',
    parseAsFloat.withDefault(USD_DEFAULTS.upliftPerAdopter)
  )
  const [oneTimeTsysCost, setOneTimeTsysCost] = useQueryState(
    'tsys',
    parseAsFloat.withDefault(USD_DEFAULTS.oneTimeTsysCost)
  )
  const [annualTsysFee, setAnnualTsysFee] = useQueryState(
    'tsyf',
    parseAsFloat.withDefault(USD_DEFAULTS.annualTsysFee)
  )
  const [mobileDevCost, setMobileDevCost] = useQueryState(
    'mdc',
    parseAsFloat.withDefault(USD_DEFAULTS.mobileDevCost)
  )
  const [peakHaloMultiplier, setPeakHaloMultiplier] = useQueryState(
    'phm',
    parseAsFloat.withDefault(USD_DEFAULTS.peakHaloMultiplier)
  )
  const [monthsToPeak, setMonthsToPeak] = useQueryState(
    'mtp',
    parseAsFloat.withDefault(USD_DEFAULTS.monthsToPeak)
  )

  // -------------------------
  // Local state
  // -------------------------
  const [advancedMode, setAdvancedMode] = useState(false)
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined)
  const attioTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch user email on mount for Attio events
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user?.email) setUserEmail(data.user.email)
    })
  }, [])

  // Region auto-detect on first load (only if 'region' not already in URL)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hasRegionParam = new URLSearchParams(window.location.search).has('region')
    if (hasRegionParam) return
    const lang = navigator.language
    if (lang.startsWith('en-GB') || lang.startsWith('en-IE')) {
      setRegion('GBP')
    } else if (['fr', 'de', 'nl', 'es', 'it', 'pt'].some((l) => lang.startsWith(l))) {
      setRegion('EUR')
    }
    // else stay USD default
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // -------------------------
  // Build inputs object
  // -------------------------
  const inputs: CalculatorInputs = useMemo(
    () => ({
      debitAccounts,
      creditAccounts,
      year1AdoptionRate,
      ongoingAdoptionRate,
      debitFraudRate,
      creditFraudRate,
      debitCNPTransactions,
      creditCNPTransactions,
      debitAvgTxValue,
      creditAvgTxValue,
      debitCvvPct,
      creditCvvPct,
      debitLossPerCase,
      creditLossPerCase,
      issuerPct,
      institutionalCostMethod,
      institutionalCostMultiplier,
      debitFixedCostPerCase,
      creditFixedCostPerCase,
      feePerTx,
      upliftPerAdopter,
      oneTimeTsysCost,
      annualTsysFee,
      mobileDevCost,
      peakHaloMultiplier,
      monthsToPeak,
      calculationMode,
      region,
    }),
    [
      debitAccounts, creditAccounts, year1AdoptionRate, ongoingAdoptionRate,
      debitFraudRate, creditFraudRate, debitCNPTransactions, creditCNPTransactions,
      debitAvgTxValue, creditAvgTxValue, debitCvvPct, creditCvvPct,
      debitLossPerCase, creditLossPerCase, issuerPct, institutionalCostMethod,
      institutionalCostMultiplier, debitFixedCostPerCase, creditFixedCostPerCase,
      feePerTx, upliftPerAdopter, oneTimeTsysCost, annualTsysFee, mobileDevCost,
      peakHaloMultiplier, monthsToPeak, calculationMode, region,
    ]
  )

  // -------------------------
  // Calculate outputs
  // -------------------------
  const outputs = useMemo(() => calculate(inputs), [inputs])

  // -------------------------
  // Debounced Attio event
  // -------------------------
  useEffect(() => {
    if (attioTimerRef.current) clearTimeout(attioTimerRef.current)
    attioTimerRef.current = setTimeout(() => {
      fireCalculatorRun(inputs, outputs, userEmail)
    }, 500)
    return () => {
      if (attioTimerRef.current) clearTimeout(attioTimerRef.current)
    }
  }, [inputs, outputs, userEmail])

  const { symbol: currencySymbol } = REGION_CURRENCY[region]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Value Calculator</h1>
        <p className="text-base-content/60 text-sm mt-1">
          See your exact ROI from deploying SafeCypher Dynamic Security Codes
        </p>
      </div>

      {/* Two-column desktop layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
        {/* Left column: controls */}
        <div className="space-y-6">
          {/* Region + mode controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="text-xs font-medium text-base-content/60 mb-1 block uppercase tracking-wide">
                Region
              </label>
              <select
                className="select select-bordered select-sm"
                value={region}
                onChange={(e) => setRegion(e.target.value as 'USD' | 'GBP' | 'EUR')}
              >
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-base-content/60 mb-1 block uppercase tracking-wide">
                Calculation Mode
              </label>
              <select
                className="select select-bordered select-sm"
                value={calculationMode}
                onChange={(e) => setCalculationMode(e.target.value as 'Direct Only' | 'Direct + Halo Effect')}
              >
                <option value="Direct + Halo Effect">Direct + Halo Effect</option>
                <option value="Direct Only">Direct Only</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="label cursor-pointer gap-2">
                <span className="text-xs font-medium text-base-content/60 uppercase tracking-wide">
                  Advanced mode
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  checked={advancedMode}
                  onChange={(e) => setAdvancedMode(e.target.checked)}
                />
              </label>
            </div>
          </div>

          {/* Simple mode sliders */}
          <div className="card bg-base-200 p-5 space-y-5">
            <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
              Portfolio
            </h2>
            <InputSlider
              label="Debit card accounts"
              value={debitAccounts}
              min={100_000}
              max={50_000_000}
              step={100_000}
              format={(v) => v.toLocaleString('en')}
              onChange={setDebitAccounts}
            />
            <InputSlider
              label="Credit card accounts"
              value={creditAccounts}
              min={10_000}
              max={10_000_000}
              step={10_000}
              format={(v) => v.toLocaleString('en')}
              onChange={setCreditAccounts}
            />
          </div>

          <div className="card bg-base-200 p-5 space-y-5">
            <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
              Fraud &amp; Adoption
            </h2>
            <InputSlider
              label="Debit fraud rate"
              value={debitFraudRate}
              min={0.0001}
              max={0.01}
              step={0.0001}
              format={(v) => (v * 100).toFixed(3) + '%'}
              onChange={setDebitFraudRate}
              tooltip="Industry average: 0.046% debit (Kansas City Fed Reserve)"
            />
            <InputSlider
              label="Credit fraud rate"
              value={creditFraudRate}
              min={0.0001}
              max={0.02}
              step={0.0001}
              format={(v) => (v * 100).toFixed(3) + '%'}
              onChange={setCreditFraudRate}
              tooltip="Industry average: 0.174% credit (industry average)"
            />
            <InputSlider
              label="Year 1 adoption rate"
              value={year1AdoptionRate}
              min={0.01}
              max={1}
              step={0.01}
              format={(v) => Math.round(v * 100) + '%'}
              onChange={setYear1AdoptionRate}
              tooltip="Making SafeCypher mandatory can drive 90%+ adoption. Higher adoption = dramatically higher savings."
            />
            <InputSlider
              label="Ongoing adoption rate"
              value={ongoingAdoptionRate}
              min={0.01}
              max={1}
              step={0.01}
              format={(v) => Math.round(v * 100) + '%'}
              onChange={setOngoingAdoptionRate}
              tooltip="Recommended: 90% for mandatory deployment (Year 2+)"
            />
          </div>

          {/* Advanced mode — additional inputs */}
          {advancedMode && (
            <div className="space-y-4">
              <div className="card bg-base-200 p-5 space-y-5">
                <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
                  Transactions
                </h2>
                <InputSlider
                  label="Annual debit CNP transactions"
                  value={debitCNPTransactions}
                  min={1_000_000}
                  max={2_000_000_000}
                  step={1_000_000}
                  format={(v) => (v / 1_000_000).toFixed(1) + 'M'}
                  onChange={setDebitCNPTransactions}
                />
                <InputSlider
                  label="Annual credit CNP transactions"
                  value={creditCNPTransactions}
                  min={1_000_000}
                  max={1_000_000_000}
                  step={1_000_000}
                  format={(v) => (v / 1_000_000).toFixed(1) + 'M'}
                  onChange={setCreditCNPTransactions}
                />
                <InputSlider
                  label="Avg debit CNP tx value"
                  value={debitAvgTxValue}
                  min={1}
                  max={500}
                  step={0.01}
                  prefix={currencySymbol}
                  format={(v) => currencySymbol + v.toFixed(2)}
                  onChange={setDebitAvgTxValue}
                />
                <InputSlider
                  label="Avg credit CNP tx value"
                  value={creditAvgTxValue}
                  min={1}
                  max={1000}
                  step={0.01}
                  prefix={currencySymbol}
                  format={(v) => currencySymbol + v.toFixed(2)}
                  onChange={setCreditAvgTxValue}
                />
                <InputSlider
                  label="% debit CNP requiring CVV"
                  value={debitCvvPct}
                  min={0.01}
                  max={1}
                  step={0.01}
                  format={(v) => Math.round(v * 100) + '%'}
                  onChange={setDebitCvvPct}
                  tooltip="Pulse Network 2025: ~50% of debit CNP transactions require CVV"
                />
                <InputSlider
                  label="% credit CNP requiring CVV"
                  value={creditCvvPct}
                  min={0.01}
                  max={1}
                  step={0.01}
                  format={(v) => Math.round(v * 100) + '%'}
                  onChange={setCreditCvvPct}
                />
              </div>

              <div className="card bg-base-200 p-5 space-y-5">
                <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
                  Loss Parameters
                </h2>
                <InputSlider
                  label="Total debit loss per case"
                  value={debitLossPerCase}
                  min={10}
                  max={1000}
                  step={1}
                  prefix={currencySymbol}
                  format={(v) => currencySymbol + v.toFixed(0)}
                  onChange={setDebitLossPerCase}
                  tooltip="Federal Reserve Board data: avg $101 per debit fraud case"
                />
                <InputSlider
                  label="Total credit loss per case"
                  value={creditLossPerCase}
                  min={10}
                  max={3000}
                  step={1}
                  prefix={currencySymbol}
                  format={(v) => currencySymbol + v.toFixed(0)}
                  onChange={setCreditLossPerCase}
                  tooltip="Industry average: avg $303 per credit fraud case"
                />
                <InputSlider
                  label="Issuer share of fraud loss"
                  value={issuerPct}
                  min={0.01}
                  max={1}
                  step={0.01}
                  format={(v) => Math.round(v * 100) + '%'}
                  onChange={setIssuerPct}
                  tooltip="2024 Clearly Payments / FTC data: ~35% issuer share"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/80">
                    Institutional cost method
                  </label>
                  <div className="flex gap-3">
                    {(['Fixed Amount', 'Multiplier'] as const).map((m) => (
                      <label key={m} className="label cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="icm"
                          className="radio radio-primary radio-sm"
                          value={m}
                          checked={institutionalCostMethod === m}
                          onChange={() => setInstitutionalCostMethod(m)}
                        />
                        <span className="text-sm">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {institutionalCostMethod === 'Multiplier' ? (
                  <InputSlider
                    label="Institutional cost multiplier"
                    value={institutionalCostMultiplier}
                    min={1}
                    max={20}
                    step={0.25}
                    format={(v) => v.toFixed(2) + 'x'}
                    onChange={setInstitutionalCostMultiplier}
                    tooltip="LexisNexis True Cost of Fraud 2025: 5.75x multiplier"
                  />
                ) : (
                  <>
                    <InputSlider
                      label="Fixed debit cost per case"
                      value={debitFixedCostPerCase}
                      min={0}
                      max={1000}
                      step={1}
                      prefix={currencySymbol}
                      format={(v) => currencySymbol + v.toFixed(0)}
                      onChange={setDebitFixedCostPerCase}
                    />
                    <InputSlider
                      label="Fixed credit cost per case"
                      value={creditFixedCostPerCase}
                      min={0}
                      max={1000}
                      step={1}
                      prefix={currencySymbol}
                      format={(v) => currencySymbol + v.toFixed(0)}
                      onChange={setCreditFixedCostPerCase}
                    />
                  </>
                )}
              </div>

              <div className="card bg-base-200 p-5 space-y-5">
                <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
                  Revenue &amp; Fees
                </h2>
                <InputSlider
                  label="SafeCypher fee per CVV tx"
                  value={feePerTx}
                  min={0.001}
                  max={0.20}
                  step={0.001}
                  format={(v) => (v * 100).toFixed(1) + '%'}
                  onChange={setFeePerTx}
                  tooltip="Subject to commercial agreement. Default: 5% of CVV-required transactions."
                />
                <InputSlider
                  label="Uplift in transactions per adopter"
                  value={upliftPerAdopter}
                  min={0}
                  max={10}
                  step={0.1}
                  format={(v) => v.toFixed(1)}
                  onChange={setUpliftPerAdopter}
                  tooltip="An Post saw 50% uplift. Conservative default: 1 additional transaction per adopter."
                />
              </div>

              <div className="card bg-base-200 p-5 space-y-5">
                <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
                  Implementation Costs
                </h2>
                <InputSlider
                  label="TSYS one-time setup"
                  value={oneTimeTsysCost}
                  min={0}
                  max={500_000}
                  step={1_000}
                  prefix={currencySymbol}
                  format={(v) => currencySymbol + v.toLocaleString('en')}
                  onChange={setOneTimeTsysCost}
                />
                <InputSlider
                  label="Annual TSYS platform fee"
                  value={annualTsysFee}
                  min={0}
                  max={500_000}
                  step={1_000}
                  prefix={currencySymbol}
                  format={(v) => currencySymbol + v.toLocaleString('en')}
                  onChange={setAnnualTsysFee}
                />
                <InputSlider
                  label="Mobile app development"
                  value={mobileDevCost}
                  min={0}
                  max={500_000}
                  step={1_000}
                  prefix={currencySymbol}
                  format={(v) => currencySymbol + v.toLocaleString('en')}
                  onChange={setMobileDevCost}
                />
              </div>

              <div className="card bg-base-200 p-5 space-y-5">
                <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
                  Halo Effect Settings
                </h2>
                <InputSlider
                  label="Peak halo multiplier"
                  value={peakHaloMultiplier}
                  min={0}
                  max={0.5}
                  step={0.01}
                  format={(v) => (v * 100).toFixed(0) + '%'}
                  onChange={setPeakHaloMultiplier}
                  tooltip="Additional CNP fraud reduction once SafeCypher is fully established (15% default)"
                />
                <InputSlider
                  label="Months to peak effect"
                  value={monthsToPeak}
                  min={1}
                  max={36}
                  step={1}
                  unit=" mo"
                  format={(v) => v.toFixed(0) + ' mo'}
                  onChange={setMonthsToPeak}
                  tooltip="Time for criminal networks to recognise bank as 'safe' (12 months default)"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right column: results (sticky on desktop) */}
        <div className="lg:sticky lg:top-4 lg:self-start">
          <ResultsPanel outputs={outputs} inputs={inputs} currencySymbol={currencySymbol} />
        </div>
      </div>

      {/* Below: bar chart, sensitivity table, PDF export */}
      <div className="mt-8 space-y-6">
        <div className="card bg-base-200 p-5">
          <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide mb-4">
            Savings Comparison
          </h2>
          <SavingsBarChart
            yr1Total={outputs.totalYr1Savings}
            ongoingTotal={outputs.totalOngoingSavings}
            currencySymbol={currencySymbol}
          />
        </div>

        <div className="card bg-base-200 p-5">
          <h2 className="text-sm font-semibold text-base-content/80 uppercase tracking-wide mb-4">
            Adoption Sensitivity
          </h2>
          <SensitivityTable rows={outputs.sensitivityRows} currencySymbol={currencySymbol} />
        </div>

        <div className="flex justify-end">
          <PdfExportButton inputs={inputs} outputs={outputs} currencySymbol={currencySymbol} />
        </div>
      </div>
    </div>
  )
}
