const signals = [
  {
    org: 'McKinsey',
    headline: 'Dynamic CVV is future-state payments infrastructure',
    detail: 'Positioned alongside tokenisation in the layer that replaces legacy authorisation.',
    source: 'McKinsey, 2021',
  },
  {
    org: 'Visa',
    headline: 'Intelligent Commerce',
    detail: 'AI agent payment rails — enabling autonomous purchases across the Visa network.',
    source: 'Visa, 2025',
  },
  {
    org: 'Mastercard',
    headline: 'Agent Pay',
    detail: 'Autonomous purchase approval infrastructure for AI-initiated card transactions.',
    source: 'Mastercard, 2025',
  },
]

export function WhyNowSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — argument */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              Why Now
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-base-content leading-tight">
              The industry is converging. Issuers need a verification layer.
            </h2>
            <p className="text-base-content/60 mt-6 leading-relaxed">
              McKinsey identifies dynamic CVV as a component of future-state
              payments-as-a-service infrastructure, positioning it alongside
              tokenisation in the layer that replaces legacy authorisation. Visa
              launched Intelligent Commerce. Mastercard launched Agent Pay.
            </p>
            <p className="text-base-content/60 mt-4 leading-relaxed">
              But none solve the issuer&apos;s core problem:{' '}
              <strong className="text-base-content font-semibold">
                independent verification of cardholder intent.
              </strong>{' '}
              SafeCypher puts that control back in the issuer&apos;s hands.
            </p>
            <p className="text-base-content/40 text-sm mt-8 border-l-2 border-accent pl-4 italic">
              The networks are building rails for autonomous commerce. SafeCypher
              builds the verification layer that makes those rails safe for issuers.
            </p>
          </div>

          {/* Right — industry signal cards */}
          <div className="space-y-4">
            {signals.map((signal) => (
              <div
                key={signal.org}
                className="card bg-base-200 p-6 rounded-xl border border-base-300"
              >
                <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                  {signal.org}
                </p>
                <p className="font-semibold text-base-content">
                  {signal.headline}
                </p>
                <p className="text-base-content/60 text-sm mt-1 leading-relaxed">
                  {signal.detail}
                </p>
                <p className="text-base-content/30 text-xs mt-3">{signal.source}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
