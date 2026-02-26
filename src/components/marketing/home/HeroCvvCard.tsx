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
      className="relative w-full max-w-[38rem] select-none"
      aria-hidden="true"
    >
      {/* Teal glow layer */}
      <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 bg-accent" />
      {/* Card body — back of card, original styling */}
      <div
        className="hero-credit-card relative overflow-hidden rounded-[1.25rem] border border-white/10 p-10"
        style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          aspectRatio: '1.586 / 1',
        }}
      >
        {/* Magnetic stripe */}
        <div
          className="absolute left-0 right-0 top-10 h-16 bg-black/80"
          aria-hidden
        />
        {/* Signature area + CVV */}
        <div className="absolute left-10 right-10 top-36 flex items-center gap-5">
          <div
            className="hero-signature-panel flex flex-1 items-center rounded px-3 py-0"
            style={{
              height: '3.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 4px,
                rgba(0,0,0,0.03) 4px,
                rgba(0,0,0,0.03) 5px
              )`,
            }}
          >
            <span
              className="text-sm text-[#4b5563]"
              style={{
                fontFamily: "'Brush Script MT', cursive",
                transform: 'rotate(-2deg)',
              }}
            >
              Authorized Signature
            </span>
          </div>
          <div
            className="flex h-[3.25rem] w-[5.25rem] items-center justify-center rounded-lg"
            style={{
              border: '2px solid rgba(59, 130, 246, 0.5)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            }}
            role="status"
            aria-label="Security code updating"
          >
            <div className="flex gap-[3px]">
              {cvv.map((digit, i) => (
                <div key={i} className="relative h-8 w-5 overflow-hidden text-center">
                  <div
                    className="absolute flex flex-col transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    style={{
                      transform: `translateY(-${digit * 10}%)`,
                      transitionDelay: flipping ? `${i * FLIP_STAGGER_MS}ms` : '0ms',
                    }}
                  >
                    {DIGITS.map((d) => (
                      <span
                        key={d}
                        className="flex h-8 w-5 items-center justify-center font-mono text-xl font-bold tracking-wider"
                        style={{ color: 'var(--brand-blue)' }}
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
        {/* Footer: chip + labels */}
        <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between text-[0.75rem] uppercase tracking-widest text-gray-500">
          <div className="flex flex-col gap-1.5">
            <div
              className="flex h-11 w-16 items-center justify-center rounded"
              style={{
                background: 'linear-gradient(to right, rgba(250, 204, 21, 0.5), rgba(202, 138, 4, 0.5))',
              }}
            >
              <div
                className="h-7 w-11 rounded"
                style={{
                  background: 'linear-gradient(to right, rgba(250, 204, 21, 0.3), rgba(202, 138, 4, 0.3))',
                }}
              />
            </div>
            <span>Electronic Use Only</span>
          </div>
          <span className="font-mono">SafeCypher Ltd.</span>
        </div>
      </div>
    </div>
  )
}
