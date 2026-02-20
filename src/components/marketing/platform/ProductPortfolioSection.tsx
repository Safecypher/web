import Link from 'next/link'

const products = [
  {
    name: 'Dynamic Security Codes',
    audience: 'Transactions',
    description: "Time-limited CVV in the cardholder\u2019s banking app eliminates CNP fraud at the credential layer.",
    effort: 'Core integration',
    href: '/dynamic-security-codes',
  },
  {
    name: 'Safe Verify',
    audience: 'People',
    description: 'Dynamic phone-channel authentication for call centres — eliminates vishing and OTP intercept.',
    effort: 'Incremental — 1 endpoint',
    href: '/safe-verify',
  },
  {
    name: 'SafeAgent',
    audience: 'Agents',
    description: 'Authenticates AI agents initiating card transactions — the emerging agentic commerce attack surface.',
    effort: 'Incremental — 1 endpoint',
    href: null,
  },
  {
    name: 'SafePay (dCVV V2)',
    audience: 'Commerce',
    description: 'Dynamic CVV for e-commerce checkout — an upgraded credential layer for card-present equivalent assurance.',
    effort: 'Incremental — 1 endpoint',
    href: null,
  },
  {
    name: 'E-Wallet Onboarding',
    audience: 'Onboarding',
    description: 'Secure digital wallet provisioning — dynamic credential handshake at the point of card digitisation.',
    effort: 'Incremental — 1 endpoint',
    href: null,
  },
  {
    name: 'Card Issuance Protection',
    audience: 'Issuance',
    description: 'Protects credentials at the point of card issuance — closing the window between print and activation.',
    effort: 'Incremental — 1 endpoint',
    href: null,
  },
  {
    name: 'OTP Replacement',
    audience: 'Authentication',
    description: 'Replaces SMS OTP with dynamic in-app codes — eliminates SIM-swap and SS7 interception vectors.',
    effort: 'Incremental — 1 endpoint',
    href: null,
  },
]

export function ProductPortfolioSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            The Full Portfolio
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            One integration. Seven products.
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            Every additional product activates from the same processor-level integration — no new infrastructure, no new contracts.
          </p>
        </div>

        {/* Product table */}
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-300 text-base-content/60 text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Audience</th>
                <th className="py-4 px-6">What it does</th>
                <th className="py-4 px-6">Integration effort</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.name}>
                  <td className="py-4 px-6 font-semibold text-base-content whitespace-nowrap">
                    {product.href ? (
                      <Link href={product.href} className="text-accent hover:underline">
                        {product.name}
                      </Link>
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="badge badge-outline badge-sm text-base-content/60">
                      {product.audience}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-base-content/70 text-sm">
                    {product.description}
                  </td>
                  <td className="py-4 px-6 text-base-content/50 text-sm font-mono">
                    {product.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}
