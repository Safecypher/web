import Link from 'next/link'

export function DscProofSection() {
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

            <Link
              href="/proof/an-post"
              className="btn btn-outline btn-primary mt-8"
            >
              Read the An Post case study &rarr;
            </Link>
          </div>

          {/* Right — proof card */}
          <div className="card bg-base-100 rounded-xl p-8 shadow-lg">

            {/* An Post logo area */}
            <div>
              <span
                className="font-bold text-2xl"
                style={{ color: '#006229' }}
              >
                An Post
              </span>
              <p className="text-neutral-content/50 text-sm mt-1">
                Ireland&apos;s national postal service — card issuer and operator
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

            {/* Irish Fintech Award badge */}
            <div className="flex items-center gap-3 mt-6 p-3 bg-base-200 rounded-lg border border-base-300">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-warning"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-content">
                  Irish Fintech Award
                </p>
                <p className="text-xs text-neutral-content/50">
                  Fraud Prevention Category
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
