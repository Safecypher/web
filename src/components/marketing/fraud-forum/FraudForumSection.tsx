type UpcomingEvent = {
  id: string
  title: string
  date: string
  time: string
  location: string
  address: string
  attendance: string
}

type PastEvent = {
  id: string
  title: string
  meta: string
  youtubeId: string
}

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'toronto-may-2026',
    title: 'The Fraud Forum — Toronto, May 2026',
    date: 'Thursday 14 May 2026',
    time: '1:00pm – 9:00pm',
    location: 'One King West Hotel',
    address: '1 King St W, Toronto',
    attendance: 'Limited to 25 senior fraud, risk and security leaders from financial institutions.',
  },
]

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

        {UPCOMING_EVENTS.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-base-content mb-8">Upcoming</h2>
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="bg-base-200 rounded-2xl px-8 py-8 mb-6">
                <p className="text-xl font-bold text-base-content mb-6">{event.title}</p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  <div>
                    <dt className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-1">Date</dt>
                    <dd className="text-base-content">{event.date}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-1">Time</dt>
                    <dd className="text-base-content">{event.time}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-1">Location</dt>
                    <dd className="text-base-content">
                      {event.location}
                      <br />
                      <span className="text-base-content/60 text-sm">{event.address}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-1">Attendance</dt>
                    <dd className="text-base-content/80 text-sm">{event.attendance}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold text-base-content mb-8">Past Events</h2>
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
