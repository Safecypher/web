'use client'

import { PopupWidget } from 'react-calendly'

// TODO: replace with real Calendly booking URL
const CALENDLY_URL = 'https://calendly.com/safecypher/30min'

export function ContactCalendlyButton() {
  return (
    <PopupWidget
      url={CALENDLY_URL}
      rootElement={
        typeof document !== 'undefined'
          ? (document.getElementById('__next') ?? document.body)
          : undefined as unknown as HTMLElement
      }
      text="Book a time"
      textColor="currentColor"
      color="transparent"
    />
  )
}
