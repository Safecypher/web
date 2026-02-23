'use client'

import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'

export function SvHeroSection() {
  const posthog = usePostHog()

  return (
    <>
      <section className="bg-base-100 py-24 lg:py-32 overflow-hidden relative">
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left column — hero text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">Safe Verify</p>

            <h1 className="text-4xl lg:text-6xl font-bold text-base-content leading-tight tracking-tight">
              Phishing calls erode{' '}
              <span className="font-serif italic font-normal text-primary">customer trust.</span>
            </h1>

            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-px bg-primary flex-shrink-0" />
              <p className="font-serif italic text-primary text-xl lg:text-2xl">Restore it instantly.</p>
            </div>

            <p className="text-base-content/60 text-lg leading-relaxed mt-4 max-w-xl">
              Safe Verify transforms your banking app into a secure verification channel. When your bank
              calls a customer, they know it&rsquo;s really you — confirmed in-app with biometric
              authentication. No more security questions. No more doubt.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/#demo"
                className="btn btn-primary btn-lg"
                onClick={() => posthog?.capture('cta_click', { source: 'product-page' })}
              >
                Request Demo
              </Link>
              <a href="#use-cases" className="btn btn-ghost btn-lg border border-base-content/20">See How It Works</a>
            </div>
          </div>

          {/* Right column — phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="sv-phone-mockup w-[300px] rounded-[36px] p-2"
              style={{
                background: '#111',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              <div className="rounded-[28px] overflow-hidden" style={{ background: '#0a0a0a' }}>

                {/* Status bar */}
                <div className="flex justify-between px-6 pt-4 pb-2 text-[13px] font-semibold text-white">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M13 2L4.5 13.5H11L10 22L20 10H13L13 2Z"/>
                    </svg>
                    5G
                  </span>
                </div>

                {/* Notch */}
                <div className="w-[120px] h-7 rounded-b-2xl mx-auto -mt-2" style={{ background: '#111' }} />

                {/* Notification card */}
                <div className="sv-notif-card mx-4 my-3 p-4 bg-white/5 border border-primary/30 rounded-2xl">

                  {/* Notif header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-content" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M2 10h20v2H2zm2 4h2v4H4zm4 0h2v4H8zm4 0h2v4h-2zm4 0h2v4h-2zM12 2L2 8h20L12 2zm0 2.5L18.5 8h-13L12 4.5z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-white">Safe Bank is calling</div>
                      <div className="text-[12px] text-white/50">Verify this call in your app</div>
                    </div>
                  </div>

                  {/* Verify box */}
                  <div className="bg-primary/10 rounded-xl p-5 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                    <div className="text-[16px] font-bold text-white">Ben Jordan</div>
                    <div className="text-[13px] text-white/50 mb-4">Safe Bank &middot; Account Services</div>
                    <span className="inline-flex items-center gap-1.5 bg-success/15 text-success px-3 py-1.5 rounded-full text-[12px] font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Verified Caller
                    </span>
                  </div>
                </div>

                {/* Face ID action button */}
                <div className="mx-4 mb-4 p-4 bg-primary rounded-2xl flex items-center justify-center gap-2 font-semibold text-[15px] text-primary-content">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  Confirm with Face ID
                </div>

                {/* Secured footer */}
                <div className="pb-3 flex items-center justify-center gap-1.5 text-[12px] text-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  Secured by SafeCypher
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-base-200 border-t border-base-300 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif italic text-3xl lg:text-5xl text-primary mb-2">Bidirectional trust.</p>
          <p className="text-2xl font-bold text-base-content tracking-tight mb-1">Inbound &amp; outbound. Verified both ways.</p>
          <p className="text-xs uppercase tracking-widest font-semibold text-base-content/40 mb-10">Eliminating vishing fraud at the source</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-extrabold text-base-content tracking-tight">3&ndash;5<span className="text-2xl text-primary"> min</span></div>
              <p className="text-sm text-base-content/50 mt-2">Saved per call by eliminating security questions</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-base-content tracking-tight">Zero<span className="text-2xl text-primary"> data</span></div>
              <p className="text-sm text-base-content/50 mt-2">No PII stored. Semi-stateless architecture. GDPR compliant by design.</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-base-content tracking-tight">3<span className="text-2xl text-primary"> layers</span></div>
              <p className="text-sm text-base-content/50 mt-2">Of security in a single frictionless interaction</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
