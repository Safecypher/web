import Link from 'next/link'

type StatusVariant = 'live' | 'launching' | 'mvp' | 'available' | 'development'

const statusConfig: Record<StatusVariant, { label: string; classes: string }> = {
  live:        { label: 'Live in production', classes: 'bg-success/15 text-success' },
  launching:   { label: 'Launching now',      classes: 'bg-info/15 text-info' },
  mvp:         { label: 'MVP: 8–12 weeks',    classes: 'bg-warning/15 text-warning' },
  available:   { label: 'Available now',      classes: 'bg-base-content/10 text-base-content/60' },
  development: { label: 'In development',     classes: 'bg-base-content/10 text-base-content/60' },
}

const products = [
  {
    capability: 'Dynamic Security Code',
    audience: 'Transactions',
    description: 'Eliminates CNP fraud by replacing static CVV with a single-use, time-sensitive code.',
    status: 'live' as StatusVariant,
    href: '/dynamic-security-codes',
  },
  {
    capability: 'Safe Verify',
    audience: 'People',
    description: 'Replaces KBA and OTPs in call centres and branches with cryptographic identity verification.',
    status: 'launching' as StatusVariant,
    href: '/safe-verify',
  },
  {
    capability: 'Safe Agent',
    audience: 'Agents',
    description: 'AI agent identification and human-in-the-loop approval for autonomous card transactions.',
    status: 'mvp' as StatusVariant,
    href: null,
  },
  {
    capability: 'E-Wallet + New Card',
    audience: 'Transactions',
    description: 'Secures wallet onboarding and new card activation with dynamic credential handshake.',
    status: 'available' as StatusVariant,
    href: null,
  },
  {
    capability: 'Secure Card Delivery',
    audience: 'Transactions',
    description: 'Protects card details during digital delivery — closes the window between issue and activation.',
    status: 'available' as StatusVariant,
    href: null,
  },
  {
    capability: 'Safe Pay',
    audience: 'Transactions',
    description: 'Auto-populates payment details like Apple Pay, on your rails.',
    status: 'development' as StatusVariant,
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
            The Full Platform
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            One integration. One API. The entire platform.
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            Every capability activates from the same processor-level API connection — no new infrastructure, no new contracts.
          </p>
        </div>

        {/* Product table */}
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-300 text-base-content/60 text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Capability</th>
                <th className="py-4 px-6">Audience</th>
                <th className="py-4 px-6">What it solves</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const { label, classes } = statusConfig[product.status]
                return (
                  <tr key={product.capability}>
                    <td className="py-4 px-6 font-semibold text-base-content whitespace-nowrap">
                      {product.href ? (
                        <Link href={product.href} className="text-accent hover:underline">
                          {product.capability}
                        </Link>
                      ) : (
                        product.capability
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
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${classes}`}>
                        {label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}
