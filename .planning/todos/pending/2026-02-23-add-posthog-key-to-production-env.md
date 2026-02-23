---
created: 2026-02-23T09:57:24.598Z
title: Add PostHog key to production env
area: ui
files:
  - src/app/providers.tsx
  - netlify.toml
---

## Problem

`NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are not set in the Netlify environment. Without them, PostHog initialises in no-op mode — the consent banner still appears but no events are captured. The env var stubs are documented in `netlify.toml` but the actual values need to be added in the Netlify Dashboard.

## Solution

In Netlify Dashboard → Site → Environment variables, add:
- `NEXT_PUBLIC_POSTHOG_KEY` — PostHog project API key (PostHog Dashboard → Project Settings → Project API key)
- `NEXT_PUBLIC_POSTHOG_HOST` — e.g. `https://app.posthog.com` (or EU endpoint if using EU cloud)

Set in both production and preview contexts so analytics work on staging branches too.
