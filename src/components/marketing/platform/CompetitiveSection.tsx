const competitors = [
  {
    approach: 'Tokenisation',
    covers: 'Replaces the PAN with a token bound to a specific merchant or device',
    gap: 'Token is static for the session — re-usable if intercepted before completion',
    isSafeCypher: false,
  },
  {
    approach: '3D Secure (3DS)',
    covers: 'Adds a cardholder authentication challenge at checkout',
    gap: 'Authentication relies on static credentials — friction introduced, credential value unchanged',
    isSafeCypher: false,
  },
  {
    approach: 'Behavioural Analytics',
    covers: 'Flags anomalous transaction patterns using ML scoring',
    gap: 'Detects fraud probability after credential theft — does not make credentials worthless',
    isSafeCypher: false,
  },
  {
    approach: 'SafeCypher',
    covers: "Issues a new, time-limited credential per transaction via the cardholder\u2019s banking app",
    gap: 'Eliminates CNP fraud — stolen credentials expire before they can be used',
    isSafeCypher: true,
  },
]

export function CompetitiveSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            The Honest Comparison
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            Existing tools reduce fraud. SafeCypher eliminates it.
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            Tokenisation, 3DS, and behavioural analytics are all legitimate tools — and none of them make stolen credentials worthless. SafeCypher does.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-300 text-base-content/60 text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Approach</th>
                <th className="py-4 px-6">What it covers</th>
                <th className="py-4 px-6">What the gap is</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((row) => (
                <tr
                  key={row.approach}
                  className={row.isSafeCypher ? 'bg-primary/10' : ''}
                >
                  <td className="py-4 px-6 font-semibold text-base-content whitespace-nowrap">
                    {row.approach}
                    {row.isSafeCypher && (
                      <span className="ml-2 badge badge-primary badge-sm">You are here</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-base-content/70 text-sm">{row.covers}</td>
                  <td className={`py-4 px-6 text-sm font-medium ${row.isSafeCypher ? 'text-primary font-semibold' : 'text-base-content/60'}`}>
                    {row.gap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}
