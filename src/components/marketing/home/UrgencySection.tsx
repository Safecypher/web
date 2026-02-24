'use client'

import Link from "next/link"
import { usePostHog } from 'posthog-js/react'

export function UrgencySection() {
  const posthog = usePostHog()

  return (
    <section className="bg-neutral border-t border-base-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left column — the argument */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              The Threat Is Growing
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-content leading-tight">
              Card-not-present fraud is accelerating. Agentic commerce is about
              to make it catastrophic.
            </h2>
            <div className="mt-6 space-y-4 text-neutral-content/70 text-base leading-relaxed">
              <p>
                Card numbers, expiry dates, CVVs: the entire credential set is static.
                Once stolen, it stays stolen. A compromised number means unlimited fraud
                until the cardholder notices.{' '}
                <span className="text-neutral-content font-semibold">This is the transaction problem.</span>
              </p>
              <p>
                The same static credentials break identity verification: issuers verify
                cardholders through Knowledge-Based Authentication (KBA) and one-time
                passwords (OTPs) vulnerable to interception.{' '}
                <span className="text-neutral-content font-semibold">This is the people problem.</span>
              </p>
              <p>
                And now, AI agents initiate autonomous purchases where fraud tools cannot
                distinguish agent from human.{' '}
                <span className="text-neutral-content font-semibold">This is the agent problem.</span>
              </p>
              <p className="text-neutral-content font-semibold pt-2">
                Three audiences. Three control failures. One root cause: static credentials
                that anyone can copy and reuse.
              </p>
            </div>
          </div>

          {/* Right column — stats + CTAs */}
          <div>
            <div className="card bg-base-100 p-6 rounded-xl mb-6">
              <div className="pb-6">
                <p className="text-5xl font-bold text-primary">$12B+</p>
                <p className="text-base-content/70 mt-2 text-sm">
                  annual CNP fraud losses (US)
                </p>
              </div>
              <div className="border-t border-base-300 pt-6 pb-6">
                <p className="text-5xl font-bold text-primary">80%</p>
                <p className="text-base-content/70 mt-2 text-sm">
                  of card details already on the dark web
                </p>
              </div>
              <div className="border-t border-base-300 pt-6">
                <p className="text-5xl font-bold text-accent">450%</p>
                <p className="text-base-content/70 mt-2 text-sm">
                  increase in AI agent threats (Visa, 2025)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#demo"
                className="btn btn-primary"
                onClick={() => posthog?.capture('cta_click', { source: 'urgency' })}
              >
                Request Demo
              </Link>
              <Link
                href="/portal/calculator"
                className="btn btn-ghost"
                onClick={() => posthog?.capture('cta_click', { source: 'calculator' })}
              >
                See the value for your portfolio →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
