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
      {/* Card body */}
      <div className="relative rounded-2xl bg-base-300 p-6 shadow-2xl border border-base-content/10">
        {/* Chip */}
        <div className="mb-6 h-8 w-12 rounded bg-warning/80" />
        {/* Card number */}
        <p className="mb-4 font-mono text-sm tracking-widest text-base-content/60">
          4539 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 7821
        </p>
        {/* Expiry */}
        <p className="mb-6 font-mono text-xs text-base-content/40">
          EXPIRES 12/28
        </p>
        {/* CVV row */}
        <div className="flex items-end justify-between">
          <span className="text-xs uppercase tracking-wider text-base-content/40">CVV</span>
          <div className="flex gap-1" role="status" aria-label="Security code updating">
            {cvv.map((digit, i) => (
              <div key={i} className="relative h-8 w-6 overflow-hidden rounded text-center">
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
    </div>
  )
}
