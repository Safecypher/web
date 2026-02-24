---
created: 2026-02-24T17:58:36.000Z
title: Update the phone image in the Safe Verify page to look more like a real phone
area: ui
files:
  - src/components/marketing/safe-verify/SvHeroSection.tsx
---

## Problem

The Safe Verify hero section (`SvHeroSection.tsx`) renders a phone mockup using a CSS-styled
div with the class `sv-phone-mockup` and `rounded-[36px]` — it's a hand-rolled CSS construction,
not a realistic phone frame. It doesn't look convincing as a real device.

## Solution

Replace or augment the CSS mockup with something more realistic. Options to consider:

1. **SVG/image phone frame** — use a high-quality phone frame SVG or PNG (e.g. an iPhone-style
   outline) as a wrapper, with the existing screen content rendered inside it.
2. **Heroicons / Figma device frame** — source a device frame asset and overlay the screen UI.
3. **CSS-only improvement** — add notch, home indicator, side buttons, and a more detailed
   bezel using Tailwind to make the current approach look more polished without adding assets.

Confirm preferred approach before implementing. The existing screen content (OTP display,
bank name, icons) should be preserved inside whatever new frame is used.
