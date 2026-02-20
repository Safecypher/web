import Link from 'next/link'
import { HeroCvvCard } from '@/components/marketing/home/HeroCvvCard'

export function HeroSection() {
  return (
    <section className="bg-base-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column — headline, sub-headline, CTAs */}
          <div>
            <span className="badge badge-accent mb-6">
              Card-Not-Present Fraud Prevention
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-base-content leading-tight">
              Eliminate card-not-present fraud.{' '}
              <span className="font-serif italic">Not reduce. Eliminate.</span>
            </h1>
            <p className="text-lg text-base-content/70 mt-6 max-w-lg">
              SafeCypher replaces static CVV credentials with dynamic security codes
              that change every few seconds — making stolen card data worthless.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="#demo" className="btn btn-primary btn-lg">
                Request Demo
              </Link>
              <Link href="#audiences" className="btn btn-ghost btn-lg">
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right column — animated CVV card */}
          <div className="order-first lg:order-last overflow-visible py-8">
            <HeroCvvCard />
          </div>
        </div>
      </div>
    </section>
  )
}
