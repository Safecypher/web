'use client'

import { useEffect, useState, useCallback } from 'react'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const CYCLE_MS = 3000
const FLIP_STAGGER_MS = 80

/** Charcoal aligned with brand token --sc-charcoal */
const INK = '#37373a'

function randomDigit() {
  return Math.floor(Math.random() * 10)
}

function generateCvv(): [number, number, number] {
  return [randomDigit(), randomDigit(), randomDigit()]
}

function StatusSignal() {
  return (
    <svg width={18} height={14} viewBox="0 0 18 14" fill="none" aria-hidden>
      {[3, 5, 7, 9].map((h, i) => (
        <rect
          key={i}
          x={2 + i * 4}
          y={11 - h}
          width={2.5}
          height={h}
          rx={0.5}
          className="fill-[#382aff]/75"
        />
      ))}
    </svg>
  )
}

function StatusBattery() {
  return (
    <svg width={26} height={12} viewBox="0 0 26 12" fill="none" aria-hidden>
      <rect x={0.5} y={2.5} width={20} height={7} rx={1.5} className="stroke-[#382aff]/75" strokeWidth={1} fill="none" />
      <rect x={2} y={4} width={15} height={4} rx={0.5} className="fill-[#382aff]/55" />
      <path d="M22 5v2c.8 0 1.5.45 1.5 1v0c0 .55-.7 1-1.5 1" className="stroke-[#382aff]/75" strokeWidth={1} fill="none" />
    </svg>
  )
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
      className="hero-phone-device relative flex w-full flex-col lg:h-full lg:min-h-0 lg:flex-1 select-none"
      aria-hidden="true"
    >
      <div className="flex flex-col lg:min-h-0 lg:flex-1">
        {/* Device shell — frosted glass, flat bottom (terminates at rule below) */}
        <div
          className="relative flex flex-col overflow-hidden rounded-t-[1.75rem] sm:rounded-t-[2rem] p-[0.4rem] sm:p-[0.55rem] pb-[0.35rem] sm:pb-[0.45rem] lg:min-h-0 lg:flex-1"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.52) 0%, rgba(236,232,255,0.38) 45%, rgba(220,214,252,0.32) 100%)',
            border: '1px solid rgba(255,255,255,0.75)',
            borderBottom: 'none',
            boxShadow: `
              0 0 0 1px rgba(56, 42, 255, 0.2),
              0 20px 40px -16px rgba(56, 42, 255, 0.14),
              inset 0 1px 0 0 rgba(255,255,255,0.92),
              inset 1px 0 0 0 rgba(255,255,255,0.58)`,
            backdropFilter: 'blur(22px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(22px) saturate(1.2)',
          }}
        >
          {/* Bezel specular (top-left glass shine) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-t-[inherit]"
            style={{
              background: `linear-gradient(
                125deg,
                rgba(255,255,255,0.55) 0%,
                rgba(255,255,255,0.12) Min(28%, 9rem),
                transparent Min(48%, 14rem)
              )`,
            }}
            aria-hidden
          />
          {/* Screen — grows on lg so bezel reaches section divider; card stays upper */}
          <div
            className="relative flex flex-col overflow-hidden rounded-t-[1.35rem] sm:rounded-t-[1.65rem] rounded-b-none px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 lg:min-h-0 lg:flex-1"
            style={{
              background:
                'linear-gradient(162deg, #ddd8ff 0%, #c8beff 28%, #b9aefc 54%, #a99bf5 78%, #9d90ef 100%)',
              border: '1px solid rgba(255,255,255,0.58)',
              borderBottom: 'none',
              boxShadow: `
                0 0 0 1px rgba(45, 38, 95, 0.08),
                inset 0 1px 0 0 rgba(255,255,255,0.65)`,
            }}
          >
            {/* Top-centre glass highlight — mimics light hitting curved glass */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[45%]"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.45) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            {/* Bottom edge depth fade */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#7b6ef0]/20 to-transparent"
              aria-hidden
            />

            {/* Status bar */}
            <div className="relative z-[1] mb-3 shrink-0 sm:mb-4 flex items-center justify-between px-0.5">
              <StatusSignal />
              <span
                className="text-[0.7rem] sm:text-xs font-semibold tabular-nums"
                style={{ color: '#382aff' }}
              >
                10:30
              </span>
              <StatusBattery />
            </div>

            {/* Pushes card lower on tall screens (share space with bottom frosted area) */}
            <div
              className="relative z-0 h-4 w-full shrink-0 sm:h-5 lg:h-auto lg:min-h-0 lg:flex-[1.35] lg:basis-0"
              aria-hidden
            />

            {/* Glass card — back view */}
            <div
              className="relative z-[1] mx-auto mt-2 w-[92%] shrink-0 overflow-hidden rounded-[0.875rem] sm:rounded-[1rem] sm:mt-3 p-3 sm:p-6 lg:p-7 shadow-xl"
              style={{
                aspectRatio: '1.586 / 1',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(235,230,255,0.58) 45%, rgba(222,215,255,0.62) 100%)',
                border: '1px solid rgba(255,255,255,0.82)',
                boxShadow:
                  '0 8px 32px rgba(56, 42, 255, 0.22), 0 1px 0 rgba(255,255,255,0.92) inset, 0 -1px 0 rgba(255,255,255,0.45) inset',
                backdropFilter: 'blur(18px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
                transform: 'perspective(800px) rotateY(-3deg) rotateX(2deg)',
              }}
            >
              {/* Edge highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/35" />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] rounded-b-[inherit] bg-gradient-to-t from-[#382aff]/18 via-[#382aff]/06 to-transparent"
                aria-hidden
              />

              <div
                className="absolute left-0 right-0 top-2 h-6 sm:top-3 sm:h-11"
                style={{ backgroundColor: INK }}
                aria-hidden
              />

              <div className="absolute left-2.5 right-2.5 top-9 sm:left-5 sm:right-5 sm:top-[3.25rem] flex min-w-0 items-stretch gap-0 overflow-hidden rounded-md bg-white shadow-sm">
                <div
                  className="flex min-h-[2rem] min-w-0 flex-1 items-center px-2 sm:min-h-[2.75rem] sm:px-3"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 4px,
                      rgba(0,0,0,0.025) 4px,
                      rgba(0,0,0,0.025) 5px
                    )`,
                  }}
                >
                  <span
                    className="truncate text-[0.65rem] sm:text-sm text-gray-500"
                    style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", transform: 'rotate(-2deg)' }}
                  >
                    Authorized Signature
                  </span>
                </div>
                <div
                  className="flex shrink-0 items-center justify-center border-l border-gray-200/90 px-2 sm:px-2.5"
                  role="status"
                  aria-label="Security code updating"
                  style={{
                    boxShadow: flipping ? 'inset 0 0 0 1px rgba(56,42,255,0.12)' : undefined,
                  }}
                >
                  <div className="flex gap-px sm:gap-0.5">
                    {cvv.map((digit, i) => (
                      <div
                        key={i}
                        className="relative h-5 w-3 sm:h-8 sm:w-[1.15rem] overflow-hidden text-center"
                      >
                        <div
                          className="absolute flex flex-col ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transition-transform duration-[600ms]"
                          style={{
                            transform: `translateY(-${digit * 10}%)`,
                            transitionDelay: flipping ? `${i * FLIP_STAGGER_MS}ms` : '0ms',
                          }}
                        >
                          {DIGITS.map((d) => (
                            <span
                              key={d}
                              className="flex h-5 w-3 items-center justify-center text-sm font-semibold tabular-nums tracking-tight sm:h-8 sm:w-[1.15rem] sm:text-xl"
                              style={{ color: INK }}
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

              <div className="absolute bottom-2 left-2.5 right-2.5 space-y-0.5 sm:bottom-3 sm:left-5 sm:right-5 sm:space-y-1">
                <p
                  className="text-center text-[0.35rem] font-medium uppercase leading-snug tracking-wide text-white/95 sm:text-[0.45rem] sm:tracking-wider [text-shadow:0_1px_2px_rgba(56,42,255,0.25)]"
                 >
                  Authorized signature — not valid unless signed • SafeCypher
                </p>
                <p
                  className="text-center text-[0.35rem] font-medium uppercase leading-snug tracking-wide text-white/90 sm:text-[0.45rem] sm:tracking-wider [text-shadow:0_1px_2px_rgba(56,42,255,0.2)]"
                 >
                  • Dynamic security code • Card-not-present protection • safecypher.com
                </p>
              </div>
            </div>

            {/* Extra frosted screen below card — lg:flex-1 pairs with top spacer */}
            <div
              className="relative z-0 mt-2 min-h-6 w-full shrink-0 lg:mt-3 lg:min-h-0 lg:flex-1 lg:basis-0"
              aria-hidden
            />
          </div>
        </div>
        {/* Hard termination — level with viewport (shell has no rotateY, so edge meets rule cleanly) */}
        <div
          className="relative z-10 h-px w-full shrink-0 bg-[#c1c1c1] opacity-90 shadow-[0_1px_0_rgba(255,255,255,0.7)]"
          aria-hidden
        />
      </div>
    </div>
  )
}
