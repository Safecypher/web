'use client'

import { useEffect, useState, useCallback } from 'react'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const CYCLE_MS = 4000
const FLIP_STAGGER_MS = 80

function randomDigit() {
  return Math.floor(Math.random() * 10)
}

function generateCvv(): [number, number, number] {
  return [randomDigit(), randomDigit(), randomDigit()]
}

export function HeroCvvCard() {
  const [cvv, setCvv] = useState<[number, number, number]>([4, 2, 7])
  const [flipping, setFlipping] = useState(false)

  const rotateCvv = useCallback(() => {
    setFlipping(true)
    setTimeout(() => {
      setCvv(generateCvv())
      setFlipping(false)
    }, 600)
  }, [])

  useEffect(() => {
    const id = setInterval(rotateCvv, CYCLE_MS)
    return () => clearInterval(id)
  }, [rotateCvv])

  return (
    <div
      className="relative w-full select-none"
      style={{ transform: 'rotate(-3deg)' }}
      aria-hidden="true"
    >
      {/* Teal glow layer */}
      <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 bg-accent" />
      {/* Card body — back of card */}
      <div className="relative rounded-2xl bg-base-300 shadow-2xl border border-base-content/10 overflow-hidden">
        {/* Top gap before magnetic stripe */}
        <div className="h-10" />
        {/* Magnetic stripe — full width dark bar */}
        <div className="h-14 bg-base-content/85 w-full" />
        {/* Card interior */}
        <div className="px-8 pt-5 pb-7">
          {/* Signature strip + CVV box row */}
          <div className="flex items-stretch gap-4 mb-6">
            {/* Signature strip */}
            <div className="flex-1 rounded-lg bg-base-content/10 border border-base-content/15 flex items-center px-4 py-3 min-h-[3.5rem]">
              <span className="font-serif italic text-sm text-base-content/30 tracking-wide">
                Authorised Signature
              </span>
            </div>
            {/* CVV box */}
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span className="text-xs uppercase tracking-wider text-base-content/40">CVV</span>
              <div
                className="flex gap-1 rounded-lg bg-base-content/10 border border-base-content/15 px-3 py-1.5"
                role="status"
                aria-label="Security code updating"
              >
                {cvv.map((digit, i) => (
                  <div key={i} className="relative h-8 w-6 overflow-hidden text-center">
                    <div
                      className="absolute flex flex-col transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateY(-${digit * 10}%)`,
                        transitionDelay: flipping ? `${i * FLIP_STAGGER_MS}ms` : '0ms',
                      }}
                    >
                      {DIGITS.map((d) => (
                        <span
                          key={d}
                          className="flex h-8 w-6 items-center justify-center font-mono text-lg font-bold text-accent"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom labels */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-base-content/30">
              Electronic Use Only
            </span>
            <span className="font-mono text-xs tracking-wider text-base-content/30">
              SAFECYPHER LTD.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
