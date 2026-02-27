// src/lib/calculator/engine.ts — pure function, no React
import type { CalculatorInputs, CalculatorOutputs } from './types'

export function calculate(inputs: CalculatorInputs): CalculatorOutputs {
  // Step 1: CVV-required transactions
  // Cell formulas: E50=C15*C35, F50=D15*D35, G50=E50+F50
  const cvvRequired_D = inputs.debitCNPTransactions * inputs.debitCvvPct
  const cvvRequired_C = inputs.creditCNPTransactions * inputs.creditCvvPct

  // Step 2: Annual fraud cases
  // Cell formulas: E51=E50*C36, F51=F50*D36
  const fraudCases_D = cvvRequired_D * inputs.debitFraudRate
  const fraudCases_C = cvvRequired_C * inputs.creditFraudRate

  // Step 3: Loss per case
  // Cell formulas: E52=C37*C38, F52=D37*D38
  // E54=IF(C39="Multiplier",E52*C40,C41), F54=IF(D39="Multiplier",F52*D40,D41)
  const issuerLossPerCase_D = inputs.debitLossPerCase * inputs.issuerPct
  const issuerLossPerCase_C = inputs.creditLossPerCase * inputs.issuerPct

  const instCostPerCase_D = inputs.institutionalCostMethod === 'Multiplier'
    ? issuerLossPerCase_D * inputs.institutionalCostMultiplier
    : inputs.debitFixedCostPerCase
  const instCostPerCase_C = inputs.institutionalCostMethod === 'Multiplier'
    ? issuerLossPerCase_C * inputs.institutionalCostMultiplier
    : inputs.creditFixedCostPerCase

  // Step 4: Total annual fraud cost to issuer
  // Cell formulas: E56=(E51*E52)+(E51*E54), F56=(F51*F52)+(F51*F54), G56=E56+F56
  const totalFraudCost_D = (fraudCases_D * issuerLossPerCase_D) + (fraudCases_D * instCostPerCase_D)
  const totalFraudCost_C = (fraudCases_C * issuerLossPerCase_C) + (fraudCases_C * instCostPerCase_C)
  const totalFraudCost_combined = totalFraudCost_D + totalFraudCost_C

  // Step 5: Implementation cost
  // Cell formula: C28=C25+C26+C27
  const totalImplCost = inputs.oneTimeTsysCost + inputs.annualTsysFee + inputs.mobileDevCost

  // Step 6: Year 1 savings
  // CRITICAL: fee uses cvvRequired base (E50), NOT total CNP base (C15/D15)
  // Cell formulas: E60=E56*C22, E61=E50*C22*C42 (E50=cvvRequired_D), E62=E60-E61
  const grossSavingsYr1_D = totalFraudCost_D * inputs.year1AdoptionRate
  const grossSavingsYr1_C = totalFraudCost_C * inputs.year1AdoptionRate
  const txFeesYr1_D = cvvRequired_D * inputs.year1AdoptionRate * inputs.feePerTx
  const txFeesYr1_C = cvvRequired_C * inputs.year1AdoptionRate * inputs.feePerTx
  const netSavingsYr1_D = grossSavingsYr1_D - txFeesYr1_D
  const netSavingsYr1_C = grossSavingsYr1_C - txFeesYr1_C
  const netSavingsYr1 = netSavingsYr1_D + netSavingsYr1_C
  const monthlySavingsYr1 = netSavingsYr1 / 12
  // Cell formula: G65=IFERROR(((C25+C26+C27)/G63)*(365/12),"—")
  const breakevenDays = monthlySavingsYr1 > 0
    ? (totalImplCost / monthlySavingsYr1) * (365 / 12)
    : null

  // Step 7: Ongoing savings (Year 2+)
  // Cell formulas: E69=E56*D22, E70=E50*D22*C42, E71=E69-E70
  const grossSavingsOngoing_D = totalFraudCost_D * inputs.ongoingAdoptionRate
  const grossSavingsOngoing_C = totalFraudCost_C * inputs.ongoingAdoptionRate
  const txFeesOngoing_D = cvvRequired_D * inputs.ongoingAdoptionRate * inputs.feePerTx
  const txFeesOngoing_C = cvvRequired_C * inputs.ongoingAdoptionRate * inputs.feePerTx
  const netSavingsOngoing_D = grossSavingsOngoing_D - txFeesOngoing_D
  const netSavingsOngoing_C = grossSavingsOngoing_C - txFeesOngoing_C
  const netSavingsOngoing = netSavingsOngoing_D + netSavingsOngoing_C
  const monthlySavingsOngoing = netSavingsOngoing / 12

  // Step 8: Interchange uplift (constants embedded in formula per spreadsheet)
  // Debit: E76=IF(C14=0,0,(C14*C44*C16*C22*0.0005)+(C14*C44*C22*0.21))
  // Credit: F76=IF(D14=0,0,(D14*D44*D16*C22*0.0234)+(D14*D44*C22*0.1))
  const interchangeYr1_D = inputs.debitAccounts === 0 ? 0
    : (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.debitAvgTxValue * inputs.year1AdoptionRate * 0.0005)
    + (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.year1AdoptionRate * 0.21)
  const interchangeYr1_C = inputs.creditAccounts === 0 ? 0
    : (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.creditAvgTxValue * inputs.year1AdoptionRate * 0.0234)
    + (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.year1AdoptionRate * 0.10)
  const interchangeOngoing_D = inputs.debitAccounts === 0 ? 0
    : (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.debitAvgTxValue * inputs.ongoingAdoptionRate * 0.0005)
    + (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.ongoingAdoptionRate * 0.21)
  const interchangeOngoing_C = inputs.creditAccounts === 0 ? 0
    : (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.creditAvgTxValue * inputs.ongoingAdoptionRate * 0.0234)
    + (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.ongoingAdoptionRate * 0.10)

  // Step 9: Halo effect
  // Cell formula: C89=IF(C86>=12, 1+(C85*(6/12)), 1+(C85*((C86/2)/12)))
  // "Ramps from 1.0x to 1.15x over 12 months" — average of first 12 months = 1.075
  const avgYr1HaloFactor = inputs.monthsToPeak >= 12
    ? 1 + (inputs.peakHaloMultiplier * (6 / 12))
    : 1 + (inputs.peakHaloMultiplier * ((inputs.monthsToPeak / 2) / 12))
  const isHalo = inputs.calculationMode === 'Direct + Halo Effect'
  // Cell formulas: E92=IF(C84="Direct Only",0,E62*(C89-1)), F92=IF(C84="Direct Only",0,F62*(C89-1))
  const yr1HaloBonus_D = isHalo ? netSavingsYr1_D * (avgYr1HaloFactor - 1) : 0
  const yr1HaloBonus_C = isHalo ? netSavingsYr1_C * (avgYr1HaloFactor - 1) : 0
  // Cell formulas: E93=IF(C84="Direct Only",0,E71*C85), F93=IF(C84="Direct Only",0,F71*C85)
  const ongoingHaloBonus_D = isHalo ? netSavingsOngoing_D * inputs.peakHaloMultiplier : 0
  const ongoingHaloBonus_C = isHalo ? netSavingsOngoing_C * inputs.peakHaloMultiplier : 0

  // Step 10: Sensitivity table (simplified formula using combined cvvRequired)
  // Cell formula: C104=(G56*B104)-((E50+F50)*B104*D42)
  // Note: interchange and halo are NOT included — this is the "direct savings only" sensitivity
  const sensitivityRates = [0.25, 0.50, 0.75, 0.90]
  const sensitivityRows = sensitivityRates.map(rate => {
    const savings = (totalFraudCost_combined * rate) - ((cvvRequired_D + cvvRequired_C) * rate * inputs.feePerTx)
    const breakeven = savings > 0 ? (totalImplCost / (savings / 12)) * (365 / 12) : null
    return {
      adoptionRate: rate,
      annualSavings: savings,
      breakevenDays: breakeven,
      isCurrentRate: rate === inputs.year1AdoptionRate,
    }
  })

  // Step 10: Total savings summary
  // Cell formulas: E97=E62+E92, F97=F62+F92, G97=E97+F97
  // Cell formulas: E98=E71+E93, F98=F71+F93, G98=E98+F98
  // IMPORTANT: Interchange (G76/G77) is NOT added into G97/G98 — shown separately in dashboard
  return {
    cvvRequiredTxDebit: cvvRequired_D,
    cvvRequiredTxCredit: cvvRequired_C,
    cvvRequiredTxCombined: cvvRequired_D + cvvRequired_C,
    annualFraudCasesDebit: fraudCases_D,
    annualFraudCasesCredit: fraudCases_C,
    issuerLossPerCaseDebit: issuerLossPerCase_D,
    issuerLossPerCaseCredit: issuerLossPerCase_C,
    institutionalCostPerCaseDebit: instCostPerCase_D,
    institutionalCostPerCaseCredit: instCostPerCase_C,
    currentAnnualFraudCostDebit: totalFraudCost_D,
    currentAnnualFraudCostCredit: totalFraudCost_C,
    currentAnnualFraudCostCombined: totalFraudCost_combined,
    totalImplCost,
    grossFraudSavingsYr1Debit: grossSavingsYr1_D,
    grossFraudSavingsYr1Credit: grossSavingsYr1_C,
    grossFraudSavingsYr1Combined: grossSavingsYr1_D + grossSavingsYr1_C,
    txFeesYr1Debit: txFeesYr1_D,
    txFeesYr1Credit: txFeesYr1_C,
    txFeesYr1Combined: txFeesYr1_D + txFeesYr1_C,
    netFraudSavingsYr1Debit: netSavingsYr1_D,
    netFraudSavingsYr1Credit: netSavingsYr1_C,
    netFraudSavingsYr1Combined: netSavingsYr1,
    monthlySavingsYr1,
    breakevenDays,
    grossFraudSavingsOngoingDebit: grossSavingsOngoing_D,
    grossFraudSavingsOngoingCredit: grossSavingsOngoing_C,
    grossFraudSavingsOngoingCombined: grossSavingsOngoing_D + grossSavingsOngoing_C,
    txFeesOngoingDebit: txFeesOngoing_D,
    txFeesOngoingCredit: txFeesOngoing_C,
    txFeesOngoingCombined: txFeesOngoing_D + txFeesOngoing_C,
    netFraudSavingsOngoingDebit: netSavingsOngoing_D,
    netFraudSavingsOngoingCredit: netSavingsOngoing_C,
    netFraudSavingsOngoingCombined: netSavingsOngoing,
    monthlySavingsOngoing,
    interchangeUpliftYr1Debit: interchangeYr1_D,
    interchangeUpliftYr1Credit: interchangeYr1_C,
    interchangeUpliftYr1Combined: interchangeYr1_D + interchangeYr1_C,
    interchangeUpliftOngoingDebit: interchangeOngoing_D,
    interchangeUpliftOngoingCredit: interchangeOngoing_C,
    interchangeUpliftOngoingCombined: interchangeOngoing_D + interchangeOngoing_C,
    avgYr1HaloFactor,
    yr1HaloBonusDebit: yr1HaloBonus_D,
    yr1HaloBonusCredit: yr1HaloBonus_C,
    yr1HaloBonusCombined: yr1HaloBonus_D + yr1HaloBonus_C,
    ongoingHaloBonusDebit: ongoingHaloBonus_D,
    ongoingHaloBonusCredit: ongoingHaloBonus_C,
    ongoingHaloBonusCombined: ongoingHaloBonus_D + ongoingHaloBonus_C,
    totalYr1Savings: netSavingsYr1 + yr1HaloBonus_D + yr1HaloBonus_C,
    totalOngoingSavings: netSavingsOngoing + ongoingHaloBonus_D + ongoingHaloBonus_C,
    totalYr1SavingsDirectOnly: netSavingsYr1,
    totalOngoingSavingsDirectOnly: netSavingsOngoing,
    sensitivityRows,
  }
}
