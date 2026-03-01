---
phase: 07-add-value-calculators-to-the-portal
plan: "02"
subsystem: calculator-engine
tags: [tdd, pure-function, formula-engine, typescript]
dependency_graph:
  requires: []
  provides: [calculator-types, calculator-defaults, calculator-engine]
  affects: [07-03-calculator-ui, 07-04-calculator-advanced]
tech_stack:
  added: [vitest@4.0.18]
  patterns: [pure-function, tdd-red-green-refactor]
key_files:
  created:
    - src/lib/calculator/types.ts
    - src/lib/calculator/defaults.ts
    - src/lib/calculator/engine.ts
    - src/lib/calculator/engine.test.ts
  modified:
    - package.json
decisions:
  - "vitest added as dev dependency with npm test script — no test framework existed"
  - "Pre-existing lint errors in privacy.tsx and terms.tsx logged to deferred-items.md, not fixed (out of scope)"
  - "Engine is pure TypeScript with zero React/Next.js imports — testable in isolation"
metrics:
  duration: 15
  completed: 2026-02-27
---

# Phase 07 Plan 02: Calculator Formula Engine Summary

Pure TypeScript formula engine with TDD — 14 tests all passing against spreadsheet-verified values including $3,866,043.47 Year 1 savings and 23.85-day breakeven at USD defaults.

## What Was Built

A pure TypeScript calculator formula engine (`src/lib/calculator/`) implementing all 10 formula steps extracted from the Safecypher DSC Value Calculator spreadsheet. The engine is provably correct — every output value is verified against spreadsheet computed values extracted via Python analysis.

### Files Created

| File | Purpose |
|------|---------|
| `src/lib/calculator/types.ts` | `CalculatorInputs` and `CalculatorOutputs` TypeScript interfaces — 30 input fields, 50+ output fields |
| `src/lib/calculator/defaults.ts` | `USD_DEFAULTS`, `PORTFOLIO_SPLIT_RATIO`, `REGION_CURRENCY` exports |
| `src/lib/calculator/engine.ts` | Pure `calculate(inputs)` function — 10-step formula sequence, no React/Next.js imports |
| `src/lib/calculator/engine.test.ts` | 14 Vitest unit tests covering all verified spreadsheet values |

### Files Modified

| File | Change |
|------|--------|
| `package.json` | Added `vitest@4.0.18` dev dependency and `"test": "vitest run"` script |

## TDD Execution

### RED Phase (Commit: 53e7942)
- Created `types.ts`, `defaults.ts`, `engine.test.ts` with 14 tests
- Ran `npm test` — confirmed all 14 tests FAIL (module not found for engine.ts)
- Vitest installed as dev dependency

### GREEN Phase (Commit: 4217ee5)
- Created `engine.ts` implementing all 10 formula steps
- Ran `npm test` — all 14 tests PASS immediately
- Key verified outputs at USD defaults:
  - `totalYr1Savings`: $3,866,043.47 (cell G97)
  - `breakevenDays`: 23.85 days (cell G65)
  - `txFeesYr1Combined`: $2,356,062.50 (fee on cvvRequired base, not CNP)
  - `interchangeUpliftYr1Combined`: $1,120,030.00 (separate, not in totalYr1Savings)
  - `yr1HaloBonusCombined`: $269,723.96 (cell G92)
  - Sensitivity row 25%: $3,596,319.51; row 90%: $12,946,750.23

### REFACTOR Phase
- Calculator files: zero lint errors (`npx eslint src/lib/calculator/` — clean)
- Build: `npm run build` passes cleanly — TypeScript compiles without errors
- Tests: `npm test` — 14/14 passing

## Key Formula Decisions

### Fee Base: cvvRequired NOT total CNP transactions
The most critical implementation point: the SafeCypher fee applies to CVV-required transactions (E50 in the spreadsheet), not total CNP transactions (C15/D15).

```
txFeesYr1_D = cvvRequired_D * year1AdoptionRate * feePerTx
            = 165,060,000 * 0.25 * 0.05 = $2,063,250  [CORRECT]

// Wrong (would use total CNP):
// 330,120,000 * 0.25 * 0.05 = $4,126,500  [2x ERROR]
```

### Interchange Is Separate From totalYr1Savings
`totalYr1Savings = netFraudSavingsYr1Combined + yr1HaloBonusCombined`

Interchange uplift ($1,120,030) is shown as a separate dashboard metric. It is NOT added into the Year 1 savings total. This matches cells G97 (net savings) vs G76 (interchange) in the spreadsheet.

### Halo Effect Zero in Direct Only Mode
When `calculationMode === 'Direct Only'`, `yr1HaloBonusCombined` and `ongoingHaloBonusCombined` are both zero. Tests verify this.

## Deviations from Plan

### Deviation 1: Vitest installation (Rule 3 — blocking)
- **Found during:** Step 0 (pre-RED)
- **Issue:** `vitest` not in package.json; `npm test` script missing
- **Fix:** `npm install -D vitest` + added `"test": "vitest run"` to scripts
- **Files modified:** `package.json`, `package-lock.json`
- **Commit:** 53e7942

### Pre-existing lint errors (logged, not fixed — out of scope)
- `src/app/(marketing)/privacy/page.tsx` — 10 unescaped entity errors
- `src/app/(marketing)/terms/page.tsx` — 5 unescaped entity errors
- These are pre-existing, not caused by Plan 07-02 changes
- Logged to `.planning/phases/07-add-value-calculators-to-the-portal/deferred-items.md`

## Self-Check: PASSED

All created files verified present:
- FOUND: `src/lib/calculator/types.ts`
- FOUND: `src/lib/calculator/defaults.ts`
- FOUND: `src/lib/calculator/engine.ts`
- FOUND: `src/lib/calculator/engine.test.ts`

All commits verified:
- FOUND: `53e7942` — test(07-02): add failing tests for calculator formula engine
- FOUND: `4217ee5` — feat(07-02): implement calculator formula engine — all tests pass
