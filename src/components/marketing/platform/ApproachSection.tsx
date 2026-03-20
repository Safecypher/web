import Link from 'next/link'

export function ApproachSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          The SafeCypher Approach
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content leading-tight mb-6">
          A credential that expires before it can be used.
        </h2>
        <p className="text-base-content/70 leading-relaxed mb-10">
          SafeCypher issues a new, time-limited security code for each transaction — delivered
          through the cardholder&apos;s existing banking app. No new card. No new device. No
          friction for genuine customers. And no usable credential for an attacker who intercepts
          it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Card 1: Time-limited */}
          <div className="card bg-base-100 rounded-xl p-6">
            <svg
              className="w-6 h-6 text-accent mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 className="font-semibold text-base-content mb-2">Time-limited</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              Codes expire. Stolen credentials are worthless by the time they&apos;re used.
            </p>
          </div>

          {/* Card 2: App-native */}
          <div className="card bg-base-100 rounded-xl p-6">
            <svg
              className="w-6 h-6 text-accent mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <h3 className="font-semibold text-base-content mb-2">App-native</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              Delivered through the cardholder&apos;s banking app. Zero new infrastructure for end
              users.
            </p>
          </div>

          {/* Card 3: One integration */}
          <div className="card bg-base-100 rounded-xl p-6">
            <svg
              className="w-6 h-6 text-accent mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <h3 className="font-semibold text-base-content mb-2">One integration</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              A single processor-level API unlocks the full product suite.
            </p>
            <Link
              href="/dynamic-security-codes"
              className="text-accent text-sm mt-2 block hover:underline"
            >
              See Dynamic Security Codes →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
