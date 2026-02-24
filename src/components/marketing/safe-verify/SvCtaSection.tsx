import Link from 'next/link'

export function SvCtaSection() {
  return (
    <section className="bg-primary py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-primary-content/60 font-semibold mb-4">
          Start with Safe Verify
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-content">
          The fastest entry point for issuers.
        </h2>
        <p className="text-primary-content/70 mt-4 max-w-xl mx-auto text-lg">
          Works independently of Dynamic Security Code and processor integrations.
          Start verifying identity today.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/contact" className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0">
            Request a demonstration →
          </Link>
        </div>
      </div>
    </section>
  )
}
