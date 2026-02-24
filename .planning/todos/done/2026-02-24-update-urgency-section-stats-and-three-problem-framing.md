---
created: 2026-02-24T09:00:00.000Z
title: Update UrgencySection stats and three-problem framing
area: ui
files:
  - src/components/marketing/home/UrgencySection.tsx
---

## Problem

UrgencySection currently uses outdated/incorrect stats: £8.4bn global (should be $12B+ US), 340% AI fraud increase (should be 450% per Visa 2025 report). It also only shows two stats and doesn't reflect the three-problem framing from the issuer briefing.

## Solution

Replace existing stat card with three stats from the PDF:
- $12B+ — annual CNP fraud losses (US)
- 80% — of card details on the dark web
- 450% — increase in AI agent threats (Visa, 2025)

Update the body copy left column to use the transaction/people/agent three-problem framing from the PDF:
- "This is the transaction problem." (static CVVs)
- "This is the people problem." (KBA/OTP interception)
- "This is the agent problem." (AI autonomous purchases)
- Closing: "Three audiences. Three control failures. One root cause: static credentials that anyone can copy and reuse."

Source: SafeCypher Issuer Briefing PDF, page 1.
