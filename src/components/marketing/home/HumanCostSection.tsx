import Link from "next/link"

export function HumanCostSection() {
  return (
    <section
      id="human-cost"
      className="bg-base-100 border-t border-base-300 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-widest text-error font-semibold mb-6">
          The Human Cost
        </p>

        {/* H2 */}
        <h2 className="text-3xl lg:text-5xl font-bold text-base-content leading-tight mb-8">
          Behind every fraudulent transaction is a real person.
        </h2>

        {/* First pull stat */}
        <div className="border-l-4 border-error pl-8 my-10">
          <p className="text-4xl font-bold text-base-content">1 in 4</p>
          <p className="text-base-content/70 mt-2 text-lg leading-relaxed">
            cardholders have been a victim of payment fraud. Most never recover
            the full amount. Many never feel safe using their card online again.
          </p>
        </div>

        {/* Body paragraphs */}
        <div className="text-base-content/70 text-base leading-relaxed space-y-4 my-8">
          <p>
            Card-not-present fraud is not a line item on a quarterly loss
            report. It is a family discovering their savings are gone. It is an
            elderly customer who no longer trusts online shopping. It is a small
            business owner waiting for a chargeback that may never come.
          </p>
          <p>
            Every static CVV that sits on a card is a vulnerability waiting to
            be exploited. SafeCypher closes that vulnerability permanently — not
            for the bank&apos;s balance sheet, but for every person whose card
            is in their wallet.
          </p>
        </div>

        {/* Second pull stat */}
        <div className="border-l-4 border-error pl-8 my-10">
          <p className="text-4xl font-bold text-base-content">£360</p>
          <p className="text-base-content/70 mt-2 text-lg leading-relaxed">
            average loss per CNP fraud victim — often unrecoverable by the time
            it is reported
          </p>
        </div>

        {/* Closing paragraph */}
        <p className="text-base-content/60 text-base leading-relaxed mt-8 italic">
          We built SafeCypher because we believe fraud prevention is a human
          obligation, not just a business efficiency.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/company" className="btn btn-ghost">
            Our story →
          </Link>
          <Link href="#demo" className="btn btn-primary">
            Request Demo
          </Link>
        </div>

      </div>
    </section>
  )
}
