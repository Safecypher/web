'use client'

import { useEffect, useState, useCallback } from 'react'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const CYCLE_MS = 3000
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
      className="relative w-full max-w-[18rem] sm:max-w-[24rem] lg:max-w-[38rem] select-none mx-auto"
      aria-hidden="true"
    >
      {/* Teal glow layer */}
      <div className="absolute -inset-2 sm:-inset-4 rounded-3xl blur-2xl opacity-30 bg-accent" />
      {/* Card body — back of card, original styling */}
      <div
        className="hero-credit-card relative overflow-hidden rounded-[1.125rem] sm:rounded-[1.25rem] border border-white/10 p-4 sm:p-8 lg:p-10"
        style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          aspectRatio: '1.586 / 1',
        }}
      >
        {/* Magnetic stripe — shorter on mobile to fit layout */}
        <div
          className="absolute left-0 right-0 top-4 h-8 sm:top-10 sm:h-16 bg-black/80"
          aria-hidden
        />
        {/* Signature area + CVV — tighter positioning on mobile, clear gap */}
        <div className="absolute left-4 right-4 sm:left-10 sm:right-10 top-14 sm:top-36 flex items-stretch gap-2 sm:gap-5 min-w-0">
          <div
            className="hero-signature-panel flex flex-1 min-w-0 items-center rounded px-2 sm:px-3 py-0 shrink"
            style={{
              height: '2.25rem',
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
              className="text-xs sm:text-sm text-[#4b5563] truncate"
              style={{
                fontFamily: "'Brush Script MT', cursive",
                transform: 'rotate(-2deg)',
              }}
            >
              Authorized Signature
            </span>
          </div>
          <div
            className="flex h-[2.25rem] w-[4rem] sm:h-[3.25rem] sm:w-[5.25rem] flex-shrink-0 items-center justify-center rounded-lg transition-shadow duration-500"
            style={{
              border: '2px solid rgba(0, 237, 230, 0.5)',
              backgroundColor: 'rgba(0, 237, 230, 0.1)',
              boxShadow: flipping
                ? '0 0 20px rgba(0, 237, 230, 0.6), inset 0 0 12px rgba(0, 237, 230, 0.2)'
                : '0 0 12px rgba(0, 237, 230, 0.3), inset 0 0 8px rgba(0, 237, 230, 0.1)',
            }}
            role="status"
            aria-label="Security code updating"
          >
            <div className="flex gap-[2px] sm:gap-[3px]">
              {cvv.map((digit, i) => (
                <div key={i} className="relative h-5 w-3.5 sm:h-8 sm:w-5 overflow-hidden text-center">
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
                        className="flex h-5 w-3.5 sm:h-8 sm:w-5 items-center justify-center font-mono text-sm sm:text-xl font-bold tracking-wider"
                        style={{
                          color: '#00ede6',
                          textShadow: flipping
                            ? '0 0 12px rgba(0, 237, 230, 0.9), 0 0 24px rgba(0, 237, 230, 0.5)'
                            : '0 0 8px rgba(0, 237, 230, 0.6), 0 0 16px rgba(0, 237, 230, 0.3)',
                        }}
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
        {/* Footer: chip + labels — scaled for mobile to avoid overlap */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-10 sm:left-10 sm:right-10 flex items-end justify-between gap-2 text-[0.625rem] sm:text-[0.75rem] uppercase tracking-widest text-gray-500">
          <div className="flex flex-col gap-0.5 sm:gap-1.5 min-w-0">
            <div
              className="flex h-7 w-10 sm:h-11 sm:w-16 items-center justify-center rounded"
              style={{
                background: 'linear-gradient(to right, rgba(250, 204, 21, 0.5), rgba(202, 138, 4, 0.5))',
              }}
            >
              <div
                className="h-4 w-7 sm:h-7 sm:w-11 rounded"
                style={{
                  background: 'linear-gradient(to right, rgba(250, 204, 21, 0.3), rgba(202, 138, 4, 0.3))',
                }}
              />
            </div>
            <span className="leading-tight">Electronic Use Only</span>
          </div>
          <span className="font-mono flex-shrink-0">SafeCypher Ltd.</span>
        </div>
      </div>
    </div>
  )
}
