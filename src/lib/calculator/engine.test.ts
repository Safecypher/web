import { describe, it, expect } from 'vitest'
import { calculate } from './engine'
import { USD_DEFAULTS } from './defaults'

const DEFAULT_INPUTS = { ...USD_DEFAULTS, region: 'USD' as const }

describe('calculate — USD defaults', () => {

  it('returns cvvRequiredTxDebit = 165,060,000 (debitCNP * debitCvvPct)', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.cvvRequiredTxDebit).toBeCloseTo(165_060_000, 0)
  })

  it('computes txFeesYr1Combined = $2,356,062.50 — fee uses cvvRequired base NOT total CNP', () => {
    const r = calculate(DEFAULT_INPUTS)
    // CRITICAL: cvvRequired_D (165M) * 0.25 * 0.05 = $2,063,250
    // Using total CNP_D (330M) * 0.25 * 0.05 = $4,126,500 — WRONG (2x error)
    expect(r.txFeesYr1Combined).toBeCloseTo(2_356_062.50, 0)
  })

  it('computes netFraudSavingsYr1Combined = $3,596,319.51 [verified cell G62]', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.netFraudSavingsYr1Combined).toBeCloseTo(3_596_319.51, 0)
  })

  it('computes breakevenDays = 23.85 days [verified cell G65]', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.breakevenDays).not.toBeNull()
    expect(r.breakevenDays!).toBeCloseTo(23.85, 1)
  })

  it('computes totalYr1Savings = $3,866,043.47 [verified cell G97] — interchange NOT included', () => {
    const r = calculate(DEFAULT_INPUTS)
    // totalYr1Savings = netFraudSavingsYr1 + yr1HaloBonus (no interchange)
    // $3,596,319.51 + $269,723.96 = $3,866,043.47
    expect(r.totalYr1Savings).toBeCloseTo(3_866_043.47, 0)
  })

  it('computes interchangeUpliftYr1Combined = $1,120,030 [cell G76] — separate from totalYr1Savings', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.interchangeUpliftYr1Combined).toBeCloseTo(1_120_030.00, 0)
    // Verify interchange is NOT baked into totalYr1Savings
    expect(r.totalYr1Savings).toBeCloseTo(
      r.netFraudSavingsYr1Combined + r.yr1HaloBonusCombined,
      0
    )
  })

  it('computes yr1HaloBonusCombined = $269,723.96 [cell G92]', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.yr1HaloBonusCombined).toBeCloseTo(269_723.96, 0)
  })

  it('computes avgYr1HaloFactor = 1.075 when monthsToPeak >= 12', () => {
    const r = calculate({ ...DEFAULT_INPUTS, monthsToPeak: 12, peakHaloMultiplier: 0.15 })
    expect(r.avgYr1HaloFactor).toBeCloseTo(1.075, 5)
  })

  it('halo bonuses are zero when calculationMode is Direct Only', () => {
    const r = calculate({ ...DEFAULT_INPUTS, calculationMode: 'Direct Only' })
    expect(r.yr1HaloBonusCombined).toBe(0)
    expect(r.ongoingHaloBonusCombined).toBe(0)
  })

  it('produces exactly 4 sensitivity rows at [0.25, 0.50, 0.75, 0.90]', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.sensitivityRows).toHaveLength(4)
    expect(r.sensitivityRows[0]?.adoptionRate).toBe(0.25)
    expect(r.sensitivityRows[1]?.adoptionRate).toBe(0.50)
    expect(r.sensitivityRows[2]?.adoptionRate).toBe(0.75)
    expect(r.sensitivityRows[3]?.adoptionRate).toBe(0.90)
  })

  it('sensitivity row at 25% matches verified annualSavings = $3,596,319.51', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.sensitivityRows[0]!.annualSavings).toBeCloseTo(3_596_319.51, 0)
    expect(r.sensitivityRows[0]!.breakevenDays).toBeCloseTo(23.85, 1)
  })

  it('sensitivity row at 90% matches verified annualSavings = $12,946,750.23', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.sensitivityRows[3]!.annualSavings).toBeCloseTo(12_946_750.23, 0)
    expect(r.sensitivityRows[3]!.breakevenDays).toBeCloseTo(6.63, 1)
  })

  it('marks the 25% sensitivity row as isCurrentRate (matches year1AdoptionRate default)', () => {
    const r = calculate(DEFAULT_INPUTS)
    expect(r.sensitivityRows[0]!.isCurrentRate).toBe(true)
    expect(r.sensitivityRows[1]!.isCurrentRate).toBe(false)
  })

  it('is a pure function — same inputs always produce identical outputs', () => {
    const r1 = calculate(DEFAULT_INPUTS)
    const r2 = calculate(DEFAULT_INPUTS)
    expect(r1.totalYr1Savings).toBe(r2.totalYr1Savings)
    expect(r1.breakevenDays).toBe(r2.breakevenDays)
  })

})
