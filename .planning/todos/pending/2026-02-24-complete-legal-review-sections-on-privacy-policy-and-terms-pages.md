---
created: 2026-02-24T17:57:28.791Z
title: Complete legal review sections on privacy policy and terms pages
area: ui
files:
  - src/app/(marketing)/privacy/page.tsx
  - src/app/(marketing)/terms/page.tsx
---

## Problem

Both legal pages were created and company details filled in, but two sections still contain
italic placeholder notes awaiting input from legal counsel:

1. **Privacy Policy — Section 5 (Data retention):** Retention periods for contact form data,
   analytics data, and technical logs have not been defined. Currently shows:
   "[Retention periods to be defined.]"

2. **Terms & Conditions — Section 6 (Limitation of liability):** The liability cap amount and
   any carve-outs (e.g. death/personal injury, fraud) have not been reviewed. Currently shows:
   "[Full liability cap and carve-outs to be reviewed by legal counsel.]"

## Solution

Obtain reviewed copy from SafeCypher's legal advisor for both sections, then replace the
placeholder italic paragraphs in each file with the final text.

- Privacy: replace the `<p className="mt-3 leading-relaxed text-base-content/50 italic text-sm">` in section 5
- Terms: replace the equivalent placeholder in section 6
