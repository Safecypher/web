export function CompanyHeroSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-6">
          About SafeCypher
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-base-content leading-tight mb-6">
          Built to eliminate fraud.{' '}
          <span className="font-serif italic font-normal text-primary">
            Not manage it.
          </span>
        </h1>
        <p className="text-xl text-base-content/60 max-w-2xl leading-relaxed">
          SafeCypher was founded on a single conviction: card-not-present fraud is a solvable
          problem. We build the technology that eliminates it — permanently, not probabilistically.
        </p>
      </div>
    </section>
  )
}
