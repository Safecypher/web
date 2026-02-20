export function SvNuclearKeySection() {
  const cards = [
    {
      num: '01',
      title: 'Customer',
      titleItalic: 'identification',
      desc: 'Three layers of security achieved in a single, frictionless action through the banking app.',
      layers: [
        'Logs into phone (biometric)',
        'Logs into banking app',
        'Opens Safe Verify via deep link',
      ],
    },
    {
      num: '02',
      title: 'Agent',
      titleItalic: 'identification',
      desc: "The in-app display shows the agent\u2019s name and department \u2014 triggered only by a legitimate call originating from the bank. A spoof call cannot replicate it. The customer sees proof, not hope.",
      layers: null,
    },
    {
      num: '03',
      title: 'Cementing',
      titleItalic: 'the trust',
      desc: 'A final visible in-app interaction \u2014 the question/answer validation \u2014 confirms to the customer that they are engaging with their bank. Bidirectional trust, completed in one seamless moment.',
      layers: null,
    },
  ]

  return (
    <section className="bg-neutral border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          {'// The Nuclear Key Approach'}
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-content">
          Three key exchanges.{' '}
          <span className="font-serif italic font-normal">One seamless moment.</span>
        </h2>
        <div className="w-16 h-0.5 bg-neutral-content/20 mt-6 mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.num}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/8 to-transparent border border-primary/15 hover:border-primary/40 transition-colors"
            >
              <div className="text-6xl font-extrabold text-primary/15 leading-none mb-6 tracking-tight">
                {card.num}
              </div>
              <h3 className="text-lg font-semibold text-neutral-content mb-3">
                {card.title}{' '}
                <span className="font-serif italic font-normal">{card.titleItalic}</span>
              </h3>
              <p className="text-sm text-neutral-content/60 leading-relaxed mb-5">
                {card.desc}
              </p>
              {card.layers && (
                <ul className="space-y-2">
                  {card.layers.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-neutral-content/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
