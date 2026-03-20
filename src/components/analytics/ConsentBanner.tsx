'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'

export function ConsentBanner() {
  const [visible, setVisible] = useState(true)
  const posthog = usePostHog()

  if (!visible) return null

  const handleAccept = () => {
    posthog?.opt_in_capturing()
    setVisible(false)
  }

  const handleDecline = () => {
    posthog?.opt_out_capturing()
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-200 border-t border-base-300 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm text-base-content/70 text-center sm:text-left leading-snug">
          We use analytics to understand how visitors use this site.{' '}
          <Link href="/privacy" className="underline hover:text-base-content transition-colors">Privacy</Link>.
        </p>
        <div className="flex gap-2 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="btn btn-ghost btn-xs sm:btn-sm"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="btn btn-primary btn-xs sm:btn-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
