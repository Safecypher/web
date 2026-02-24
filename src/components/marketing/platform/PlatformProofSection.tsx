import Image from 'next/image'
import Link from 'next/link'

export function PlatformProofSection() {
  return (
    <section className="bg-neutral border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            Proven in Production
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-content">
            Real results at scale.
          </h2>
          <p className="text-neutral-content/60 mt-4 max-w-2xl mx-auto">
            Not a pilot. Not a proof of concept. A live deployment protecting hundreds of thousands of real transactions across An Post&apos;s entire card-not-present portfolio.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — stat blocks */}
          <div className="space-y-8">
            <div>
              <p className="text-5xl font-bold text-primary">800,000+</p>
              <p className="text-neutral-content/70 text-base mt-1">
                card-not-present transactions processed
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary">18 months</p>
              <p className="text-neutral-content/70 text-base mt-1">
                of live production operation
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-accent">Zero</p>
              <p className="text-neutral-content/70 text-base mt-1">
                CNP fraud incidents across the entire portfolio
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary">50%</p>
              <p className="text-neutral-content/70 text-base mt-1">
                increase in card usage
              </p>
            </div>

            <Link href="/contact" className="btn btn-outline btn-primary mt-8">
              Request a demonstration &rarr;
            </Link>
          </div>

          {/* Right — proof card */}
          <div className="card bg-base-100 rounded-xl p-8 shadow-lg">

            {/* An Post logo area */}
            <div>
              <span className="font-bold text-2xl" style={{ color: '#006229' }}>
                An Post Money
              </span>
              <p className="text-neutral-content/50 text-sm mt-1">
                Ireland&apos;s national postal service — Live production since 2024
              </p>
            </div>

            <hr className="border-base-300 my-6" />

            {/* Quote block */}
            <blockquote className="text-neutral-content/80 text-base italic leading-relaxed">
              &ldquo;SafeCypher&apos;s Dynamic Security Codes gave us complete confidence in our card-not-present transactions. Zero fraud incidents across a live production portfolio — not a test, not a pilot.&rdquo;
              <cite className="text-neutral-content/50 text-sm not-italic mt-3 block">
                — An Post Financial Services
              </cite>
            </blockquote>

            <p className="text-neutral-content/60 text-sm mt-4 leading-relaxed">
              Cardholders who trust their card use it more. An Post Money saw
              50% higher card usage and the interchange revenue that comes with
              it. This stops being a fraud line item. It becomes a growth lever.
            </p>

            {/* Irish Fintech Award badge */}
            <div className="mt-6">
              <Image
                src="/badges/fintech-awards-2025.png"
                alt="Irish Fintech Awards 2025"
                width={180}
                height={60}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
