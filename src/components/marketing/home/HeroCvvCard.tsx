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
    <div className="relative mx-auto w-80 select-none" aria-hidden="true">
      {/* Teal glow layer */}
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-accent" />
      {/* Card body — back of card */}
      <div className="relative rounded-2xl bg-base-300 shadow-2xl border border-base-content/10 overflow-hidden">
        {/* Top gap before magnetic stripe */}
        <div className="h-8" />
        {/* Magnetic stripe — full width dark bar */}
        <div className="h-11 bg-base-content/85 w-full" />
        {/* Card interior */}
        <div className="px-5 pt-4 pb-5">
          {/* Signature strip + CVV box row */}
          <div className="flex items-stretch gap-3 mb-5">
            {/* Signature strip */}
            <div className="flex-1 rounded bg-base-content/10 border border-base-content/15 flex items-center px-3 py-2 min-h-[2.75rem]">
              <span className="font-serif italic text-xs text-base-content/30 tracking-wide">
                Authorised Signature
              </span>
            </div>
            {/* CVV box */}
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] uppercase tracking-wider text-base-content/40">CVV</span>
              <div
                className="flex gap-0.5 rounded bg-base-content/10 border border-base-content/15 px-2 py-1"
                role="status"
                aria-label="Security code updating"
              >
                {cvv.map((digit, i) => (
                  <div key={i} className="relative h-7 w-5 overflow-hidden text-center">
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
                          className="flex h-7 w-5 items-center justify-center font-mono text-base font-bold text-accent"
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
            <span className="text-[10px] uppercase tracking-widest text-base-content/30">
              Electronic Use Only
            </span>
            <span className="font-mono text-[10px] tracking-wider text-base-content/30">
              SAFECYPHER LTD.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
