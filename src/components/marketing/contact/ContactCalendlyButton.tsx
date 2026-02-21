'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void }
  }
}

// TODO: replace with real Calendly booking URL
const CALENDLY_URL = 'https://calendly.com/safecypher/30min'

export function ContactCalendlyButton() {
  useEffect(() => {
    if (document.querySelector('script[src*="assets.calendly.com"]')) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL })}
      className="btn btn-outline btn-lg w-full"
    >
      Book a time
    </button>
  )
}
