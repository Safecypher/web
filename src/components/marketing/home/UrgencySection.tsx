import Link from "next/link"

export function UrgencySection() {
  return (
    <section className="bg-neutral border-t border-base-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left column — the argument */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              The Threat Is Growing
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-content leading-tight">
              Card-not-present fraud is accelerating. Agentic commerce is about
              to make it catastrophic.
            </h2>
            <p className="text-neutral-content/70 mt-6 text-base leading-relaxed">
              CNP fraud costs card issuers billions annually. With no physical
              card present, static CVV credentials are the only line of defence
              — and fraudsters know it.
            </p>
            <p className="text-neutral-content/70 mt-4 text-base leading-relaxed">
              AI agents can now initiate thousands of card-not-present
              transactions autonomously. Each transaction uses the same static
              credentials. One breach exposes every future purchase.
            </p>
            <p className="text-neutral-content/70 mt-4 text-base leading-relaxed">
              The root cause is not fraud detection. It is static credentials.
              SafeCypher eliminates the root cause.
            </p>
          </div>

          {/* Right column — stats + CTAs */}
          <div>
            <div className="card bg-base-100 p-6 rounded-xl mb-6">
              <div className="pb-6">
                <p className="text-5xl font-bold text-primary">£8.4bn</p>
                <p className="text-base-content/70 mt-2 text-sm">
                  annual CNP fraud losses globally (2024)
                </p>
              </div>
              <div className="border-t border-base-300 pt-6">
                <p className="text-5xl font-bold text-error">340%</p>
                <p className="text-base-content/70 mt-2 text-sm">
                  increase in AI-driven fraud attempts year-on-year
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="#demo" className="btn btn-primary">
                Request Demo
              </Link>
              <Link href="/portal/calculator" className="btn btn-ghost">
                See the value for your portfolio →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
