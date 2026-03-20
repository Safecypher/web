export function QuoteSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <svg
          className="mx-auto mb-6 h-10 w-10 text-primary/30"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote className="text-xl lg:text-2xl font-medium text-base-content leading-relaxed font-serif italic">
          &ldquo;Invisible payments depend on invisible trust. Trust has to be built in, not bolted on.&rdquo;
        </blockquote>
        <cite className="not-italic mt-6 block">
          <span className="text-base-content font-semibold">Karen Webster</span>
          <span className="text-base-content/60">, CEO, PYMNTS &bull; PYMNTS.com, 2025</span>
        </cite>
      </div>
    </section>
  )
}
