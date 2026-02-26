---
created: 2026-02-24T17:58:36.728Z
title: Upload screenshots for the Dynamic CVV route and amend the order of steps
area: ui
files:
  - src/components/marketing/dsc/HowItWorksSection.tsx
  - src/app/(marketing)/dynamic-security-codes/page.tsx
---

## Problem

The Dynamic CVV page (`/dynamic-security-codes`) needs two updates:

1. **Screenshots** — real product screenshots should be uploaded and wired into the page
   (likely the How It Works or hero section). Placeholder visuals or missing images need
   to be replaced with actual assets.

2. **Step order** — the order of steps in the How It Works section needs to be amended
   to better reflect the actual flow. The correct order has not yet been specified.

## Solution

1. Receive screenshot assets from SafeCypher team and place them in `/public/` (or a
   subdirectory e.g. `/public/screenshots/dsc/`).
2. Update `HowItWorksSection.tsx` (or whichever component renders the steps/screenshots)
   to reference the new image paths via `next/image`.
3. Reorder the steps array/JSX to reflect the correct sequence — confirm the desired
   order with the SafeCypher team before implementing.
