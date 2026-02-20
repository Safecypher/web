import Link from 'next/link'

export function PageCtaSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
          Ready to eliminate CNP fraud?
        </h2>
        <p className="text-base-content/60 mt-4 max-w-xl mx-auto">
          See the financial impact for your portfolio, or talk to the team directly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/portal/calculator" className="btn btn-outline btn-accent btn-lg">
            See the value for your portfolio
          </Link>
          <Link href="/#demo" className="btn btn-primary btn-lg">
            Request a demo
          </Link>
        </div>
      </div>
    </section>
  )
}
