const steps = [
  {
    number: 1,
    heading: 'Open your banking app',
    description:
      "Navigate to your card account in your issuer's mobile banking app — the same app cardholders use every day.",
  },
  {
    number: 2,
    heading: 'Go to Manage card',
    description:
      'Find the card management section to access security and protection settings.',
  },
  {
    number: 3,
    heading: 'Enable Dynamic CVV',
    description:
      'Toggle on the "3-digit Dynamic CVV" to activate fraud protection for card-not-present transactions.',
  },
  {
    number: 4,
    heading: 'Understand the protection',
    description:
      'The app explains how dynamic codes eliminate CNP fraud — transparency builds cardholder trust.',
  },
  {
    number: 5,
    heading: 'New code every transaction',
    description:
      'A fresh security code is generated each time you shop online. Used once, it expires immediately.',
  },
  {
    number: 6,
    heading: 'Find your code in the app',
    description:
      'Your dynamic CVV is always visible in the app — ready for your next purchase, and worthless to anyone who intercepts it.',
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
            Six taps. Full protection. No friction for genuine cardholders.
          </p>
        </div>

        {/* Step cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
