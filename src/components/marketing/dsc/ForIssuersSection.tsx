export function ForIssuersSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            For Issuers
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            Live in weeks. No disruption to your card programme.
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            SafeCypher integrates at the processor level — meaning a single integration serves every issuer on that processor&apos;s network. For an individual issuer, activation is incremental: one API endpoint, no card reissuance, no customer re-enrolment.
          </p>
        </div>

        {/* Four integration fact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 — Single API endpoint */}
          <div className="card bg-base-200 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">
              Single API endpoint
            </h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              One integration unlocks the full Dynamic Security Codes product. No additional infrastructure required.
            </p>
          </div>

          {/* Card 2 — No card reissuance */}
          <div className="card bg-base-200 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">
              No card reissuance
            </h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Dynamic codes work with the existing card in the cardholder&apos;s wallet. No plastic replacement cycle, no cardholder disruption.
            </p>
          </div>

          {/* Card 3 — Live in weeks */}
          <div className="card bg-base-200 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">
              Live in weeks
            </h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              From signed contract to production deployment — weeks, not quarters. SafeCypher&apos;s processor-level model removes integration complexity.
            </p>
          </div>

          {/* Card 4 — Major processor compatible */}
          <div className="card bg-base-200 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">
              Major processor compatible
            </h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Built to work with the processors already serving your card programme. TSYS compatibility confirmed.
            </p>
          </div>

        </div>

        {/* Technical detail row */}
        <div className="border border-base-300 rounded-xl p-6 mt-8 bg-base-200">
          <h3 className="text-base font-semibold text-base-content mb-4">
            What the integration looks like for your technical team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm text-base-content/70">
                REST API — standard JSON request/response, documented via OpenAPI spec
              </span>
            </div>

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm text-base-content/70">
                Processor-level implementation — your issuer team needs zero changes to existing card management systems
              </span>
            </div>

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm text-base-content/70">
                Banking app integration — your mobile team adds a single screen using SafeCypher&apos;s SDK
              </span>
            </div>

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm text-base-content/70">
                Sandbox environment available — test the full cardholder flow before go-live
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
