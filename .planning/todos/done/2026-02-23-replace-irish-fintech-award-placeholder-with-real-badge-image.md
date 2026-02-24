---
created: 2026-02-23T09:57:24.598Z
title: Replace Irish Fintech Award placeholder with real badge image
area: ui
files:
  - src/components/marketing/home/ProofSection.tsx:85-100
  - src/components/marketing/dsc/DscProofSection.tsx:79-94
  - src/components/marketing/Footer.tsx:43
---

## Problem

Three components use an inline SVG star-badge placeholder labelled "Irish Fintech Award" (created in Phase 02-03 when no asset was available). The real badge image is now available:

**Source file:** `/Users/markwright/Downloads/FinTech-Awards-252.png`

The badge is the Irish Fintech Awards 2025 logo — horizontal lockup with a gold/teal hexagon icon, navy "FINTECH AWARDS 2025" text, and "Brought to you by GRID Finance and Business Post" tagline.

## Solution

1. Copy `FinTech-Awards-252.png` to `public/badges/fintech-awards-2025.png`
2. Replace the inline SVG placeholder in `ProofSection.tsx`, `DscProofSection.tsx`, and `Footer.tsx` with `<Image>` (next/image) pointing to `/badges/fintech-awards-2025.png`
3. Use appropriate `width`/`height` props and `alt="Irish Fintech Awards 2025"`. The badge has a white background so it should sit inside a white or lightly bordered container on the dark site background, or use `mix-blend-multiply` / CSS background if needed.
4. Check all three usage contexts for sizing consistency.
