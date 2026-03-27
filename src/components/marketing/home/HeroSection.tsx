'use client'

import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'
import { HeroCvvCard } from '@/components/marketing/home/HeroCvvCard'

export function HeroSection() {
  const posthog = usePostHog()

  return (
    <section className="bg-base-100 pt-12 sm:pt-16 lg:pt-24 xl:pt-32 pb-12 sm:pb-16 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          {/* Left column — headline, sub-headline, CTAs (first on mobile for readability) */}
          <div className="order-1 lg:order-none lg:pb-24 xl:pb-32">
            {/*<span className="badge badge-accent mb-6">
              Card-Not-Present Fraud Prevention
            </span>*/}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-base-content leading-tight">
            Eliminate card-not-present fraud.{' '}
            <br/>Not reduce. <br/><span className="font-serif italic">Eliminate.</span>
            </h1>
            <p className="text-lg text-base-content/70 mt-6 max-w-lg">
              SafeCypher replaces static CVV credentials with dynamic security codes
              that change every few seconds — making stolen card data worthless.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="#demo"
                className="btn btn-primary btn-lg"
                onClick={() => posthog?.capture('cta_click', { source: 'hero' })}
              >
                Request Demo
              </Link>
              <Link href="#audiences" className="btn btn-ghost btn-lg">
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right column — phone grows to section bottom on lg (flush with next section border) */}
          <div className="order-2 lg:order-last flex h-full min-h-0 justify-center overflow-visible py-4 sm:py-8 lg:justify-start lg:self-stretch lg:py-0 lg:pl-4">
            <div className="flex h-full min-h-0 w-full max-w-[19rem] flex-1 flex-col sm:max-w-[24rem] lg:max-w-[30rem] lg:ml-auto">
              <HeroCvvCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
