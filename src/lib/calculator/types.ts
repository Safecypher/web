export interface CalculatorInputs {
  // Basic inputs (simple mode)
  debitAccounts: number
  creditAccounts: number
  year1AdoptionRate: number       // 0-1, default 0.25
  ongoingAdoptionRate: number     // 0-1, default 0.90
  debitFraudRate: number          // e.g. 0.00046 (0.046%)
  creditFraudRate: number         // e.g. 0.00174 (0.174%)
  // Advanced inputs
  debitCNPTransactions: number
  creditCNPTransactions: number
  debitAvgTxValue: number
  creditAvgTxValue: number
  debitCvvPct: number             // 0-1, default 0.50
  creditCvvPct: number            // 0-1, default 0.25
  debitLossPerCase: number        // default 101
  creditLossPerCase: number       // default 303
  issuerPct: number               // 0-1, default 0.35
  institutionalCostMethod: 'Multiplier' | 'Fixed Amount'
  institutionalCostMultiplier: number   // default 5.75
  debitFixedCostPerCase: number         // default 144
  creditFixedCostPerCase: number        // default 144
  feePerTx: number                // SafeCypher fee rate, default 0.05
  upliftPerAdopter: number        // default 1 (additional tx per adopter)
  oneTimeTsysCost: number         // default 30000
  annualTsysFee: number           // default 120000
  mobileDevCost: number           // default 85000
  peakHaloMultiplier: number      // default 0.15
  monthsToPeak: number            // default 12
  calculationMode: 'Direct Only' | 'Direct + Halo Effect'
  // Region (affects currency display only — no regional formula variants in spreadsheet)
  region: 'USD' | 'GBP' | 'EUR'
}

export interface CalculatorOutputs {
  // Intermediate fraud metrics
  cvvRequiredTxDebit: number
  cvvRequiredTxCredit: number
  cvvRequiredTxCombined: number
  annualFraudCasesDebit: number
  annualFraudCasesCredit: number
  issuerLossPerCaseDebit: number
  issuerLossPerCaseCredit: number
  institutionalCostPerCaseDebit: number
  institutionalCostPerCaseCredit: number
  currentAnnualFraudCostDebit: number
  currentAnnualFraudCostCredit: number
  currentAnnualFraudCostCombined: number   // "Current CNP fraud cost" headline
  // Implementation cost
  totalImplCost: number
  // Year 1 savings
  grossFraudSavingsYr1Debit: number
  grossFraudSavingsYr1Credit: number
  grossFraudSavingsYr1Combined: number
  txFeesYr1Debit: number
  txFeesYr1Credit: number
  txFeesYr1Combined: number
  netFraudSavingsYr1Debit: number
  netFraudSavingsYr1Credit: number
  netFraudSavingsYr1Combined: number
  monthlySavingsYr1: number
  breakevenDays: number | null             // null when savings = 0
  // Ongoing savings (Year 2+)
  grossFraudSavingsOngoingDebit: number
  grossFraudSavingsOngoingCredit: number
  grossFraudSavingsOngoingCombined: number
  txFeesOngoingDebit: number
  txFeesOngoingCredit: number
  txFeesOngoingCombined: number
  netFraudSavingsOngoingDebit: number
  netFraudSavingsOngoingCredit: number
  netFraudSavingsOngoingCombined: number
  monthlySavingsOngoing: number
  // Interchange uplift
  interchangeUpliftYr1Debit: number
  interchangeUpliftYr1Credit: number
  interchangeUpliftYr1Combined: number
  interchangeUpliftOngoingDebit: number
  interchangeUpliftOngoingCredit: number
  interchangeUpliftOngoingCombined: number
  // Halo effect
  avgYr1HaloFactor: number                 // e.g. 1.075 when monthsToPeak=12, peakMultiplier=0.15
  yr1HaloBonusDebit: number
  yr1HaloBonusCredit: number
  yr1HaloBonusCombined: number
  ongoingHaloBonusDebit: number
  ongoingHaloBonusCredit: number
  ongoingHaloBonusCombined: number
  // Summary totals (with halo)
  totalYr1Savings: number
  totalOngoingSavings: number
  // Summary totals (without halo, for "Direct Only" comparison)
  totalYr1SavingsDirectOnly: number
  totalOngoingSavingsDirectOnly: number
  // Sensitivity table rows [0.25, 0.50, 0.75, 0.90]
  sensitivityRows: Array<{
    adoptionRate: number
    annualSavings: number
    breakevenDays: number | null
    isCurrentRate: boolean
  }>
}
