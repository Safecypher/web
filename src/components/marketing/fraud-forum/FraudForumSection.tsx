type PastEvent = {
  id: string
  title: string
  meta: string
  youtubeId: string
}

const PAST_EVENTS: PastEvent[] = [
  {
    id: 'london-april-2026',
    title: 'The Fraud Forum — London, April 2026',
    meta: 'Thursday 23 April 2026 · The Treehouse Hotel, London',
    youtubeId: 'CjvTVMMwTug',
  },
]

export function FraudForumSection() {
  return (
    <section className="bg-base-100 py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
          The Fraud Forum
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
          Events &amp; Recordings
        </h1>
        <p className="text-base-content/60 text-lg mb-16">
          Watch recordings from past Fraud Forum events. Each session brings together senior fraud
          and payments leaders to share insights and challenges from across the industry.
        </p>

        {PAST_EVENTS.map((event) => (
          <div key={event.id} className="bg-base-200 rounded-2xl overflow-hidden mb-12">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${event.youtubeId}`}
                title={event.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="px-6 py-5">
              <p className="text-xl font-bold text-base-content mb-1">{event.title}</p>
              <p className="text-base-content/60 text-sm">{event.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
