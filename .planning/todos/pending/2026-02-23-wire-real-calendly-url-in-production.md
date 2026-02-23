---
created: 2026-02-23T09:57:24.598Z
title: Wire real Calendly URL in production
area: ui
files:
  - src/components/marketing/contact/ContactCalendlyButton.tsx:12
---

## Problem

`ContactCalendlyButton.tsx` line 12 has a `CALENDLY_URL` constant set to a placeholder (`// TODO: replace with real Calendly booking URL`). The Calendly popup will not open until this is replaced with the actual booking link. Flagged by the Phase 06 verifier as a pre-existing Phase 05 issue — not a regression, but a required content substitution before launch.

## Solution

Replace the `CALENDLY_URL` constant in `src/components/marketing/contact/ContactCalendlyButton.tsx` with the real Calendly booking URL (e.g. `https://calendly.com/safecypher/demo`). The value should come from the SafeCypher Calendly workspace. Optionally move to an env var (`NEXT_PUBLIC_CALENDLY_URL`) if it needs to differ between staging and production.
