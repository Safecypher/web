function LightningIcon() {
  return (
    <svg
      className="w-6 h-6 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg
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
  )
}

function LockIcon() {
  return (
    <svg
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  )
}

function ArrowsExchangeIcon() {
  return (
    <svg
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
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  )
}

const benefits = [
  {
    Icon: LightningIcon,
    title: '3\u20135 minutes saved per call',
    desc: 'Eliminate repetitive security questions. Agents start serving customers immediately after bidirectional verification.',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'Vishing protection built in',
    desc: "Customers see verified caller identity in-app. Spoof calls that don\u2019t originate from the bank cannot trigger the verification display.",
  },
  {
    Icon: LockIcon,
    title: 'Zero data at rest',
    desc: 'Semi-stateless architecture with on-the-fly calculations. No PII stored. No database to breach. GDPR compliant by design.',
  },
  {
    Icon: ArrowsExchangeIcon,
    title: 'Bidirectional verification',
    desc: 'Works for both inbound and outbound calls. Customer verifies the bank, bank verifies the customer \u2014 simultaneously.',
  },
]

const metrics = [
  { label: 'Call handling time reduction', value: '3\u20135 min', valueClass: 'text-primary' },
  { label: 'PII stored', value: 'None', valueClass: 'text-success' },
  { label: 'Security layers', value: '3', valueClass: 'text-base-content' },
  { label: 'Integration time', value: 'Weeks', valueClass: 'text-warning' },
  {
    label: 'Traditional IDV integration',
    value: '6\u201312 months',
    valueClass: 'text-base-content/30 line-through',
  },
]

export function SvBenefitsSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          {'// Why Safe Verify'}
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
          Easier for customers.{' '}
          <span className="font-serif italic font-normal">Impossible for fraudsters.</span>
        </h2>
        <div className="w-16 h-0.5 bg-base-content/20 mt-6 mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column — four benefit items */}
          <div className="flex flex-col gap-10">
            {benefits.map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-base-content mb-1">{title}</h3>
                  <p className="text-sm text-base-content/60 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column — metrics panel */}
          <div className="relative rounded-2xl border border-base-300 bg-base-200 p-8 overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            {/* Five metric rows */}
            <div className="relative space-y-0 divide-y divide-base-300">
              {metrics.map(({ label, value, valueClass }) => (
                <div key={label} className="flex justify-between items-center py-5">
                  <span className="text-sm text-base-content/60">{label}</span>
                  <span className={`text-2xl font-bold ${valueClass}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
