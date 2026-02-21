export function CompanyMissionSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-6">
          Our Mission
        </p>

        {/* Pull quote */}
        <blockquote className="border-l-4 border-primary pl-8 my-10">
          <p className="text-3xl lg:text-4xl font-bold text-base-content leading-tight">
            Zero fraud.{' '}
            <span className="font-serif italic font-normal text-primary">
              Not reduced. Eliminated.
            </span>
          </p>
        </blockquote>

        {/* Mission body */}
        <div className="text-base-content/70 text-base leading-relaxed space-y-6 my-8 max-w-3xl">
          <p>
            Every payment fraud solution on the market sets out to reduce fraud — to push the
            number lower, to improve the ratio, to optimise the loss. We built SafeCypher because
            we believed that framing was wrong. Reduction is not the goal. Elimination is.
          </p>
          <p>
            The card-not-present fraud problem is not a probability problem. It is a data problem.
            The static CVV that sits on every card in every wallet is the vulnerability. Dynamic,
            time-rotating credentials that are worthless the moment they are intercepted change
            the equation entirely — there is nothing to steal because what was stolen is already
            expired.
          </p>
          <p>
            In 2025, SafeCypher was recognised as the{' '}
            <strong className="text-base-content font-semibold">
              Winner, Best Financial Crime Prevention Initiative — Irish Fintech Awards 2025.
            </strong>{' '}
            It was validation of a thesis we had held for years: eliminating fraud is not only
            possible, it is the only standard worth building to.
          </p>
        </div>
      </div>
    </section>
  )
}
