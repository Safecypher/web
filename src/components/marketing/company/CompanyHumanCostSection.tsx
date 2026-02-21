import Link from 'next/link'

export function CompanyHumanCostSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-widest text-error font-semibold mb-6">
          The Human Cost
        </p>

        {/* H2 */}
        <h2 className="text-3xl lg:text-5xl font-bold text-base-content leading-tight mb-8">
          This is why we exist.
        </h2>

        {/* Body intro */}
        <div className="text-base-content/70 text-base leading-relaxed space-y-4 my-8">
          <p>
            The fraud industry publishes statistics. We publish them too — because numbers
            communicate scale. But the scale is not the problem. The problem is that behind every
            data point is a person who trusted a system and was let down by it.
          </p>
        </div>

        {/* First pull stat */}
        <div className="border-l-4 border-error pl-8 my-10">
          <p className="text-4xl font-bold text-base-content">£1.2 billion</p>
          <p className="text-base-content/70 mt-2 text-lg leading-relaxed">
            lost to card-not-present fraud in the UK alone in 2023 — nearly half of all
            payment fraud losses. Behind that number: millions of individual acts of theft against
            ordinary people.
          </p>
        </div>

        {/* Body - human dimension */}
        <div className="text-base-content/70 text-base leading-relaxed space-y-4 my-8">
          <p>
            Elderly cardholders are disproportionately targeted. Research consistently shows that
            older victims face greater psychological impact — lasting anxiety, withdrawal from
            online services, and a loss of financial independence they never recover. For many,
            the money is secondary to the violation of trust.
          </p>
          <p>
            Families lose savings set aside for school fees, for home deposits, for medical
            treatment. Small business owners face chargebacks that arrive months later — after
            goods have been shipped, after cash flow has been committed elsewhere. The fraud
            ecosystem is designed to extract value before victims even know they have been
            targeted.
          </p>
          <p>
            These are not edge cases. They are the default outcome of a payments infrastructure
            built on static credentials that have not changed in fifty years.
          </p>
        </div>

        {/* Second pull stat */}
        <div className="border-l-4 border-error pl-8 my-10">
          <p className="text-4xl font-bold text-base-content">60%</p>
          <p className="text-base-content/70 mt-2 text-lg leading-relaxed">
            of CNP fraud victims report significant emotional distress following the incident —
            beyond the financial loss, the psychological damage is long-lasting and frequently
            underreported
          </p>
        </div>

        {/* Closing paragraph */}
        <p className="text-base-content/60 text-base leading-relaxed mt-8 italic">
          We built SafeCypher because we believe the people responsible for infrastructure that
          touches millions of cardholders have an obligation to eliminate fraud — not to optimise
          it, not to manage it, not to absorb it as a cost of doing business.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="btn btn-primary">
            Talk to us
          </Link>
        </div>

      </div>
    </section>
  )
}
