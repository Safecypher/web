import Link from 'next/link'

export function ArchitectureDiagram() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
            One Integration
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-base-content">
            One API. Seven products. Three audiences.
          </h2>
        </div>

        {/* Diagram — flex column, centered */}
        <div className="flex flex-col items-center">
          {/* Top node: Card Issuer / Processor */}
          <div className="bg-base-300 rounded-lg px-6 py-3 text-sm font-mono text-base-content/60 border border-base-300">
            Your Card Issuer / Processor
          </div>

          {/* Connector */}
          <div className="border-l-2 border-accent h-8 hidden sm:block" />

          {/* API node */}
          <div className="bg-accent/20 border-2 border-accent rounded-xl px-8 py-4 text-sm font-mono text-accent font-bold text-center mt-4 sm:mt-0">
            SafeCypher Core API
          </div>

          {/* Connector */}
          <div className="border-l-2 border-accent h-8 hidden sm:block" />

          {/* Primary tier */}
          <div className="mt-4 sm:mt-0 text-center">
            <p className="text-xs uppercase tracking-widest text-base-content/40 mb-3">
              Primary Products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-primary/10 border-2 border-primary rounded-xl px-6 py-4 text-sm font-semibold text-primary text-center min-w-[11rem]">
                Dynamic Security Codes
                <p className="text-xs font-normal text-primary/60 mt-1">Transactions</p>
                <Link
                  href="/dynamic-security-codes"
                  className="text-xs text-accent underline mt-2 block"
                >
                  Learn more →
                </Link>
              </div>
              <div className="bg-primary/10 border-2 border-primary rounded-xl px-6 py-4 text-sm font-semibold text-primary text-center min-w-[11rem]">
                Safe Verify
                <p className="text-xs font-normal text-primary/60 mt-1">People</p>
                <Link href="/safe-verify" className="text-xs text-accent underline mt-2 block">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="border-l-2 border-base-300 h-6 hidden sm:block" />

          {/* Secondary tier */}
          <div className="mt-4 sm:mt-0 text-center">
            <p className="text-xs uppercase tracking-widest text-base-content/40 mb-3">
              Additional Products
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-base-300 rounded-lg px-4 py-3 text-xs font-mono text-base-content/60 text-center border border-base-300 min-w-[9rem]">
                SafeAgent
                <p className="text-xs text-base-content/40 mt-1">Agents</p>
              </div>
              <div className="bg-base-300 rounded-lg px-4 py-3 text-xs font-mono text-base-content/60 text-center border border-base-300 min-w-[9rem]">
                SafePay (dCVV V2)
                <p className="text-xs text-base-content/40 mt-1">Commerce</p>
              </div>
              <div className="bg-base-300 rounded-lg px-4 py-3 text-xs font-mono text-base-content/60 text-center border border-base-300 min-w-[9rem]">
                E-Wallet Onboarding
                <p className="text-xs text-base-content/40 mt-1">Onboarding</p>
              </div>
              <div className="bg-base-300 rounded-lg px-4 py-3 text-xs font-mono text-base-content/60 text-center border border-base-300 min-w-[9rem]">
                Card Issuance Protection
                <p className="text-xs text-base-content/40 mt-1">Issuance</p>
              </div>
              <div className="bg-base-300 rounded-lg px-4 py-3 text-xs font-mono text-base-content/60 text-center border border-base-300 min-w-[9rem]">
                OTP Replacement
                <p className="text-xs text-base-content/40 mt-1">Authentication</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-base-content/30 text-center mt-8">
          Architecture diagram — integration detail available on request
        </p>
      </div>
    </section>
  )
}
