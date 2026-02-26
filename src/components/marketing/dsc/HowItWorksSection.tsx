const steps = [
  {
    number: 1,
    heading: 'Accounts list',
    description:
      'The cardholder opens their mobile banking app and sees their accounts — the starting point for every journey.',
  },
  {
    number: 2,
    heading: 'Account detail',
    description:
      'They select their card account to view the full detail view, where card management options are surfaced.',
  },
  {
    number: 3,
    heading: 'Manage card',
    description:
      'The card management screen gives access to security and protection settings — including Dynamic CVV.',
  },
  {
    number: 4,
    heading: 'Fraud explanation',
    description:
      'The app clearly explains what CNP fraud is and why Dynamic CVV eliminates it — transparency that builds trust.',
  },
  {
    number: 5,
    heading: 'How it works',
    description:
      'A simple explanation shows how a fresh code is generated for each transaction, making intercepted data worthless.',
  },
  {
    number: 6,
    heading: 'dCVV location',
    description:
      'The cardholder is shown exactly where to find their dynamic CVV in the app — no confusion, no friction.',
  },
  {
    number: 7,
    heading: 'dCVV on',
    description:
      'A single toggle activates Dynamic CVV. Protection is live immediately — no branch visit, no card replacement.',
  },
  {
    number: 8,
    heading: 'Show dCVV',
    description:
      'The current dynamic code is displayed in-app, ready to use at checkout. Used once, it expires immediately.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            The Cardholder Experience
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            How it works
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            Eight screens. Full protection. No friction for genuine cardholders.
          </p>
        </div>

        {/* Step cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card bg-base-200 rounded-xl overflow-hidden border border-base-300"
            >
              {/* Screenshot placeholder area */}
              {/* TODO: Replace with <Image src={`/screenshots/dsc/step-${step.number}-*.png`} ...> once screenshots are placed in public/screenshots/dsc/ */}
              <div className="relative bg-base-300 aspect-[9/16] overflow-hidden rounded-t-xl flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-xs font-mono text-base-content/30 uppercase tracking-wider">
                    Step {step.number}
                  </p>
                  <p className="text-xs text-base-content/20 mt-1">App screenshot</p>
                </div>
              </div>

              {/* Copy */}
              <div className="p-5">
                <span className="text-xs font-bold text-accent uppercase tracking-widest">
                  Step {step.number}
                </span>
                <h3 className="text-base font-semibold text-base-content mt-1">
                  {step.heading}
                </h3>
                <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
