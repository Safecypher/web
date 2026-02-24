---
created: 2026-02-24T09:02:00.000Z
title: Add 50% card usage stat and growth framing to all proof sections
area: ui
files:
  - src/components/marketing/home/ProofSection.tsx
  - src/components/marketing/dsc/DscProofSection.tsx
  - src/components/marketing/platform/PlatformProofSection.tsx
---

## Problem

All three proof sections show three stats: 800K+, 18 months, Zero fraud. The PDF adds a fourth key stat — 50% increase in card usage — which reframes the product from a cost/risk play to a growth lever. This is a significant commercial message and should be added. Attribution should also be updated from "An Post" to "An Post Money, Ireland — Live production since 2024".

## Solution

1. Add 50% stat to each proof section:
   - "50% — increase in card usage" (An Post Money)

2. Update attribution from "An Post" to "An Post Money, Ireland — Live production since 2024"

3. Add growth framing below the stats or quote in each card. From the PDF:
   "Cardholders who trust their card use it more. An Post Money saw 50% higher card usage and the interchange revenue that comes with it. This stops being a fraud line item. It becomes a growth lever."

Note: PlatformProofSection.tsx also still has the SVG star placeholder for the Fintech badge — replace with Image component matching ProofSection.tsx (see separate todo or combine here).

Source: SafeCypher Issuer Briefing PDF, page 1 "Proven in Production".
