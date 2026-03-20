import Link from 'next/link'

export function DscSolutionSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          The Solution
        </p>

        {/* Headline */}
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
          A CVV that expires. Every time.
        </h2>

        {/* Body */}
        <p className="text-base-content/70 leading-relaxed mt-4 text-lg max-w-3xl">
          SafeCypher generates a fresh 3-digit Dynamic Security Code for every card-not-present
          transaction. The code appears in the cardholder&rsquo;s banking app — the one they already
          use every day. It is valid for a single use, and expires in minutes. Stolen credentials
          become worthless the moment they leave the fraudster&rsquo;s hands.
        </p>

        {/* Four highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">

          {/* Card 1 — Single-use */}
          <div className="card bg-base-100 rounded-xl p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Clock icon */}
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 className="text-base font-bold text-base-content">Single-use</h3>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              One code. One transaction. Used once, it&rsquo;s gone.
            </p>
          </div>

          {/* Card 2 — App-native */}
          <div className="card bg-base-100 rounded-xl p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Smartphone icon */}
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <h3 className="text-base font-bold text-base-content">App-native</h3>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              Delivered in the cardholder&rsquo;s existing banking app. No new device. No SMS to
              intercept.
            </p>
          </div>

          {/* Card 3 — No card reissuance */}
          <div className="card bg-base-100 rounded-xl p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Shield icon */}
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h3 className="text-base font-bold text-base-content">No card reissuance</h3>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              Works with the existing card in the cardholder&rsquo;s wallet. No plastic replacement
              cycle.
            </p>
          </div>

          {/* Card 4 — Invisible to genuine customers */}
          <div className="card bg-base-100 rounded-xl p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-accent mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Check/tick icon */}
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3 className="text-base font-bold text-base-content">Invisible to genuine customers</h3>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              Three extra taps to activate. Then business as usual — but fraud-free.
            </p>
          </div>

        </div>

        {/* Cross-link to platform */}
        <p className="text-base-content/50 text-sm mt-10">
          Part of the SafeCypher platform —{' '}
          <Link href="/platform" className="text-accent hover:underline">
            see how one API unlocks seven products
          </Link>
          .
        </p>

      </div>
    </section>
  )
}
