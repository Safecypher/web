---
created: 2026-02-24T09:03:00.000Z
title: Fix Fintech badge SVG placeholder in PlatformProofSection
area: ui
files:
  - src/components/marketing/platform/PlatformProofSection.tsx
---

## Problem

PlatformProofSection.tsx still uses the SVG star placeholder for the Irish Fintech Award badge. This was missed when the other three components (ProofSection.tsx, DscProofSection.tsx, Footer.tsx) were updated. The real badge image is already in public/badges/fintech-awards-2025.png.

## Solution

Apply the same fix done for the other proof sections:
1. Add `import Image from 'next/image'` at the top
2. Replace the entire badge block (div with rounded icon + SVG star + text labels) with:

```tsx
{/* Irish Fintech Award badge */}
<div className="mt-6">
  <Image
    src="/badges/fintech-awards-2025.png"
    alt="Irish Fintech Awards 2025"
    width={180}
    height={60}
  />
</div>
```

Reference: src/components/marketing/home/ProofSection.tsx for the completed implementation.
