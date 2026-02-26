export function PlatformHeroSection() {
  return (
    <section className="bg-base-100 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          The Root Cause
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-base-content leading-tight mb-8">
          Static credentials are the problem. Every tool that doesn&apos;t fix that is managing
          symptoms.
        </h1>
        <p className="text-base-content/70 text-lg leading-relaxed mb-6">
          Every card-not-present transaction relies on a credential that never changes — the
          16-digit PAN, the expiry date, the CVV printed on the back of the card. Once stolen,
          those credentials work forever. Not until the card expires. Not until the next cycle.
          Forever.
        </p>
        <p className="text-base-content/70 text-lg leading-relaxed mb-6">
          Fraudsters don&apos;t need the physical card. They need the numbers. CNP fraud is not a
          verification failure — it is a credential design failure. Static credentials cannot be
          secured. They can only be monitored, flagged, and occasionally intercepted.
        </p>
        <p className="text-base-content/70 text-lg leading-relaxed">
          SafeCypher&apos;s position is simple: the only fix is a credential that expires before it
          can be re-used. Dynamic, time-sensitive, single-use. Everything else — tokenisation, 3DS,
          behavioural scoring — is valuable, and insufficient.
        </p>
      </div>
    </section>
  )
}
