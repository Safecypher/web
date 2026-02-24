import Link from "next/link"

export function AudiencesSection() {
  return (
    <section id="audiences" className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            Who SafeCypher Protects
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
            Eliminating fraud across every transaction type
          </h2>
          <p className="text-base-content/60">
            One integration. Three audiences. Zero compromise.
          </p>
        </div>

        {/* Three audience cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {/* Card 1 — Transactions */}
          <div className="card bg-base-200 p-8 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Credit card with checkmark */}
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
              <polyline points="9 15 11 17 15 13" />
            </svg>
            <p className="text-xl font-bold text-base-content mt-4">Transactions</p>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              Dynamic codes replace static CVVs. Every code is unique,
              single-use, and expires. Nothing static remains to steal.
            </p>
            <Link
              href="/platform"
              className="text-accent text-sm font-medium mt-4 block"
            >
              Learn about the platform →
            </Link>
          </div>

          {/* Card 2 — People */}
          <div className="card bg-base-200 p-8 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Person/user icon */}
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <p className="text-xl font-bold text-base-content mt-4">People</p>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              Cryptographic identity verification replaces KBA and OTPs. The
              device becomes the credential.
            </p>
            <Link
              href="/safe-verify"
              className="text-accent text-sm font-medium mt-4 block"
            >
              See how it works →
            </Link>
          </div>

          {/* Card 3 — Agents */}
          <div className="card bg-base-200 p-8 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Robot/AI agent icon — square head with antenna */}
              <rect x="4" y="8" width="16" height="12" rx="2" />
              <line x1="12" y1="2" x2="12" y2="8" />
              <circle cx="12" cy="2" r="1.5" />
              <circle cx="9" cy="13" r="1" fill="currentColor" />
              <circle cx="15" cy="13" r="1" fill="currentColor" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            <p className="text-xl font-bold text-base-content mt-4">Agents</p>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              Human-in-the-loop controls for AI commerce. Every autonomous
              transaction requires cardholder approval.
            </p>
            <Link
              href="/platform"
              className="text-accent text-sm font-medium mt-4 block"
            >
              Explore agentic commerce security →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
