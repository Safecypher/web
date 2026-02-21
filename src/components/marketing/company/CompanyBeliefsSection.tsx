const beliefs = [
  { num: '01', plain: "Don't reduce.", serif: 'Eliminate.' },
  { num: '02', plain: 'Dynamic data.', serif: 'Applied intelligence.' },
  { num: '03', plain: 'Nothing there.', serif: 'Nothing to steal.' },
  { num: '04', plain: 'Not probability, but', serif: 'certainty.' },
  { num: '05', plain: 'Easier for users.', serif: 'Impossible for fraudsters.' },
]

export function CompanyBeliefsSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          What We Believe
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-12">
          Five beliefs that shape{' '}
          <span className="font-serif italic font-normal text-primary">everything we build.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beliefs.map((b) => (
            <div key={b.num} className="bg-base-100 border border-base-300 rounded-2xl p-8">
              <p className="font-mono text-5xl font-bold text-primary/20 leading-none mb-6">
                {b.num}
              </p>
              <h3 className="text-xl font-semibold text-base-content">
                {b.plain}{' '}
                <span className="font-serif italic font-normal text-primary">{b.serif}</span>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
