---
created: 2026-02-24T09:04:00.000Z
title: Align ProductPortfolioSection with PDF capability matrix and add Status column
area: ui
files:
  - src/components/marketing/platform/ProductPortfolioSection.tsx
---

## Problem

The platform page product table has 7 products with no status column, some outdated naming, and doesn't reflect the official capability matrix from the issuer briefing. The PDF presents a cleaner 6-row table with an Audience / Capability / What it solves / Status structure.

## Solution

Restructure the product data to match the PDF capability table:

| Audience     | Capability              | What it solves                                              | Status           |
|--------------|-------------------------|-------------------------------------------------------------|------------------|
| Transactions | Dynamic Security Code   | Eliminates CNP fraud by replacing static CVV                | Live in production |
| People       | Safe Verify             | Replaces KBA and OTPs in call centres and branches          | Launching now    |
| Agents       | Safe Agent              | AI agent identification and human-in-the-loop approval      | MVP: 8–12 weeks  |
| Transactions | E-Wallet + New Card     | Secures wallet onboarding and new card activation           | Available now    |
| Transactions | Secure Card Delivery    | Protects card details during digital delivery               | Available now    |
| Transactions | Safe Pay                | Auto-populates payment details like Apple Pay, on your rails | In development  |

Changes:
- Rename columns: Product → Capability, Integration effort → Status
- Replace integration effort text with status badges (coloured by status: live=green, launching=blue, mvp=yellow, available=grey, development=grey)
- Remove "OTP Replacement" as standalone row (it's part of Safe Verify)
- Rename "SafePay (dCVV V2)" → "Safe Pay", "E-Wallet Onboarding" → "E-Wallet + New Card", "Card Issuance Protection" → "Secure Card Delivery", "SafeAgent" → "Safe Agent"
- Update section header from "One integration. Seven products." to "One integration. One API. The entire platform."

Source: SafeCypher Issuer Briefing PDF, page 2.
