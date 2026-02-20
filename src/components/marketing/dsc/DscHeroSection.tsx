export function DscHeroSection() {
  return (
    <section className="bg-base-100 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Product badge */}
        <span className="badge badge-primary badge-outline mb-4 text-xs">
          Flagship Product
        </span>

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          Dynamic Security Codes
        </p>

        {/* Headline */}
        <h1 className="text-4xl lg:text-5xl font-bold text-base-content leading-tight">
          The CVV on your card never changes. That&rsquo;s the problem.
        </h1>

        {/* Sub-headline */}
        <p className="text-xl text-base-content/60 mt-4 leading-relaxed max-w-3xl">
          Every card-not-present fraud attack exploits the same vulnerability: static credentials
          printed on a physical card that remain valid forever, regardless of how many times
          they&rsquo;re stolen.
        </p>

        {/* Three-paragraph argument */}
        <div className="mt-10 space-y-6 max-w-3xl">
          <p className="text-base-content/70 leading-relaxed">
            The 3-digit CVV on the back of your card was designed in the 1990s as a basic
            verification mechanism. It has not fundamentally changed since. Once a fraudster
            captures it — through phishing, data breach, or skimming — they have everything
            they need to make card-not-present purchases indefinitely.
          </p>
          <p className="text-base-content/70 leading-relaxed">
            This is not a verification problem. It is a credential design problem. No amount
            of anomaly detection, transaction monitoring, or 3DS friction changes the fact
            that a stolen static CVV is a valid credential that works until the card expires.
          </p>
          <p className="text-base-content font-medium leading-relaxed">
            Dynamic Security Codes eliminate the attack surface. A new, time-limited code is
            generated for each transaction. The moment a fraudster captures it, it is already
            invalid.
          </p>
        </div>

      </div>
    </section>
  )
}
