import Link from 'next/link'

export function SvIntegrationSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            {'// Integration'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            Drop-in.{' '}
            <span className="font-serif italic font-normal">Not rip-and-replace.</span>
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            Safe Verify integrates with your existing IVR and contact centre infrastructure.
            Compatible with Amazon Connect and major telephony platforms. No full auth stream required.
          </p>
        </div>

        {/* Seven feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {/* Card 1 — White-label SDK */}
          <div className="card bg-base-100 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">White-label SDK</h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Embed Safe Verify verification directly into your existing banking app under your brand. No new application for customers to install.
            </p>
          </div>

          {/* Card 2 — Amazon Connect */}
          <div className="card bg-base-100 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">Amazon Connect</h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Native integration with Amazon Connect. Safe Verify slots into your existing contact centre stack without a platform migration.
            </p>
          </div>

          {/* Card 3 — IVR Drop-in */}
          <div className="card bg-base-100 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">IVR Drop-in</h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Works with your existing IVR telephony infrastructure. Safe Verify activates as an overlay on your current call routing &mdash; no replacement required.
            </p>
          </div>

          {/* Card 4 — Tokenized Phone */}
          <div className="card bg-base-100 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">Tokenized Phone</h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Phone numbers are tokenized &mdash; no raw PII traverses the verification layer. Consistent with the semi-stateless architecture powering the whole SafeCypher platform.
            </p>
          </div>

          {/* Card 5 — GDPR by Design */}
          <div className="card bg-base-100 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">GDPR by Design</h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Zero data at rest. Verification calculations are on-the-fly. No personal data is stored or processed beyond the moment of authentication.
            </p>
          </div>

          {/* Card 6 — CCPA Ready */}
          <div className="card bg-base-100 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">CCPA Ready</h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Compliant with California Consumer Privacy Act requirements. No sale or retention of personal data &mdash; verification events leave no residue.
            </p>
          </div>

          {/* Card 7 — REST API */}
          <div className="card bg-base-100 rounded-xl p-6 border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <h3 className="text-base font-semibold text-base-content mt-3">REST API</h3>
            <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
              Standard JSON REST API documented via OpenAPI spec. Your engineering team integrates once &mdash; Safe Verify handles the telephony coordination.
            </p>
          </div>

        </div>

        {/* DSC cross-link */}
        <p className="text-base-content/40 text-sm mt-10">
          The semi-stateless, zero-storage architecture is shared across the SafeCypher platform &mdash;{' '}
          <Link href="/dynamic-security-codes" className="text-accent hover:underline">
            see how Dynamic Security Codes use the same approach to eliminate CNP fraud
          </Link>
          .
        </p>

      </div>
    </section>
  )
}
