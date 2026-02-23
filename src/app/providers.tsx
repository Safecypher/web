'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return // No-op mode — no key, no init

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      capture_pageview: false,           // PostHogPageView handles this manually
      capture_pageleave: true,
      autocapture: true,
      opt_out_capturing_by_default: true,  // Requires explicit consent before capturing
      // Session-only consent: ConsentBanner uses useState (no localStorage), so banner reappears
      // on every page load. No opt_out_capturing_persistence_type needed — posthog-js v1.352+
      // only supports 'localStorage' | 'cookie' (not 'memory'), and the banner's React state
      // is the source of truth for session-only behaviour.
      // IMPORTANT: Do NOT set cookieless_mode alongside opt_out_capturing_by_default
      // — confirmed bug #2841 in posthog-js causes double-init issues
      session_recording: {
        maskAllInputs: true,
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') {
          ph.debug()
        }
      },
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
