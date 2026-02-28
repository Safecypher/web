import type { CalculatorInputs } from './types'

// Spreadsheet defaults — USD region
// Source: 20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx
// All values verified against spreadsheet computed outputs in Python.
// GBP/EUR numeric defaults pending client confirmation — using USD values as placeholder
export const USD_DEFAULTS: Omit<CalculatorInputs, 'region'> = {
  debitAccounts: 5_000_000,
  creditAccounts: 907_000,
  debitCNPTransactions: 330_120_000,
  creditCNPTransactions: 93_700_000,
  debitAvgTxValue: 62.34,
  creditAvgTxValue: 150.00,
  year1AdoptionRate: 0.25,
  ongoingAdoptionRate: 0.90,
  debitCvvPct: 0.50,
  creditCvvPct: 0.25,
  debitFraudRate: 0.00046,
  creditFraudRate: 0.00174,
  debitLossPerCase: 101,
  creditLossPerCase: 303,
  issuerPct: 0.35,
  institutionalCostMethod: 'Fixed Amount' as const,
  institutionalCostMultiplier: 5.75,
  debitFixedCostPerCase: 144,
  creditFixedCostPerCase: 144,
  feePerTx: 0.05,
  upliftPerAdopter: 1,
  oneTimeTsysCost: 30_000,
  annualTsysFee: 120_000,
  mobileDevCost: 85_000,
  peakHaloMultiplier: 0.15,
  monthsToPeak: 12,
  calculationMode: 'Direct + Halo Effect' as const,
}

// Debit/credit split when only combined portfolio size is provided (homepage teaser)
// 70/30 split based on typical issuer portfolio composition
export const PORTFOLIO_SPLIT_RATIO = { debit: 0.70, credit: 0.30 }

// CNP transactions per card account — derived from spreadsheet defaults.
// Used in simple mode to scale debitCNPTransactions/creditCNPTransactions
// proportionally when the user changes account counts.
export const TX_PER_ACCOUNT = {
  debit: USD_DEFAULTS.debitCNPTransactions / USD_DEFAULTS.debitAccounts,   // ~66.0
  credit: USD_DEFAULTS.creditCNPTransactions / USD_DEFAULTS.creditAccounts, // ~103.2
}

export const REGION_CURRENCY: Record<'USD' | 'GBP' | 'EUR', { symbol: string; locale: string }> = {
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
  EUR: { symbol: '€', locale: 'de-DE' },
}
