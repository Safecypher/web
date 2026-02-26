import Image from 'next/image'

const steps = [
  {
    number: 1,
    heading: 'Accounts list',
    image: '/screenshots/dsc/Accounts List.png',
    description:
      'The cardholder opens their mobile banking app and sees their accounts — the starting point for every journey.',
  },
  {
    number: 2,
    heading: 'Account detail',
    image: '/screenshots/dsc/Account Detail.png',
    description:
      'They select their card account to view the full detail view, where card management options are surfaced.',
  },
  {
    number: 3,
    heading: 'Manage card',
    image: '/screenshots/dsc/Manage Card - dCVV Off.png',
    description:
      'The card management screen gives access to security and protection settings — including Dynamic CVV.',
  },
  {
    number: 4,
    heading: 'Fraud explanation',
    image: '/screenshots/dsc/Fraud.png',
    description:
      'The app clearly explains what CNP fraud is and why Dynamic CVV eliminates it — transparency that builds trust.',
  },
  {
    number: 5,
    heading: 'How it works',
    image: '/screenshots/dsc/How It Works.png',
    description:
      'A simple explanation shows how a fresh code is generated for each transaction, making intercepted data worthless.',
  },
  {
    number: 6,
    heading: 'dCVV location',
    image: '/screenshots/dsc/CVV Location.png',
    description:
      'The cardholder is shown exactly where to find their dynamic CVV in the app — no confusion, no friction.',
  },
  {
    number: 7,
    heading: 'dCVV on',
    image: '/screenshots/dsc/Manage Card - dCVV On.png',
    description:
      'A single toggle activates Dynamic CVV. Protection is live immediately — no branch visit, no card replacement.',
  },
  {
    number: 8,
    heading: 'Show dCVV',
    image: '/screenshots/dsc/Manage Card - show dCVV.png',
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
              <div className="relative aspect-[402/874] overflow-hidden rounded-t-xl bg-base-300">
                <Image
                  src={step.image}
                  alt={step.heading}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
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
