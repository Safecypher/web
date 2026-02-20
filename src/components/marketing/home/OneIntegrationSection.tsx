import Link from "next/link"

export function OneIntegrationSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column — copy */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
              Integrate once. Unlock everything.
            </h2>
            <p className="text-base-content/70 mt-4 leading-relaxed">
              SafeCypher connects via a single REST API. One integration unlocks
              dynamic security codes for card-not-present, Safe Verify for call
              centre authentication, and every product in the platform.
            </p>
            <p className="text-sm text-base-content/50 mt-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              Already integrated with TSYS for card issuer networks.
            </p>
            <Link href="/platform" className="btn btn-outline btn-accent mt-8">
              See the architecture →
            </Link>
          </div>

          {/* Right column — architecture diagram placeholder */}
          <div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-8 flex flex-col items-center justify-center min-h-64">

              {/* Top node */}
              <div className="bg-base-300 rounded px-3 py-2 text-xs font-mono text-base-content/60">
                Your Card Issuer System
              </div>

              {/* Arrow down */}
              <div className="border-l-2 border-accent h-8 my-1" />

              {/* Middle node */}
              <div className="bg-accent/20 border border-accent/30 rounded px-3 py-2 text-xs font-mono text-accent font-bold">
                SafeCypher API
              </div>

              {/* Arrow down */}
              <div className="border-l-2 border-accent h-8 my-1" />

              {/* Bottom row of product nodes */}
              <div className="flex gap-2">
                <div className="bg-base-300 rounded px-2 py-1 text-xs font-mono text-base-content/60">
                  DSC
                </div>
                <div className="bg-base-300 rounded px-2 py-1 text-xs font-mono text-base-content/60">
                  Safe Verify
                </div>
                <div className="bg-base-300 rounded px-2 py-1 text-xs font-mono text-base-content/60">
                  Analytics
                </div>
              </div>

            </div>
            <p className="text-xs text-base-content/40 mt-4 text-center">
              Architecture diagram — full detail on the Platform page
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
