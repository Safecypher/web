import Image from 'next/image'

type TeamMember = {
  name: string
  title: string
  bio: string
  photo?: string
}

const team: TeamMember[] = [
  {
    name: 'Mark Phillips',
    title: 'CEO',
    bio: 'Fintech entrepreneur with a decade building fraud prevention infrastructure for card issuers.',
    photo: '/team/mark-phillips.png',
  },
  {
    name: 'Andy Perry',
    title: 'CTPO',
    bio: 'Andy brings deep technical and commercial expertise from senior leadership roles at Global Payments and TSYS, where he led infrastructure and business services operations spanning global processor and issuer networks. As CTPO, he applies that hands-on understanding of the payments technology landscape to architect the solutions that make card-not-present fraud obsolete.',
    photo: '/team/andy-perry.png',
  },
  {
    name: 'Ben Jordan',
    title: 'Head of Product & Innovation',
    bio: 'Ben brings extensive experience from senior leadership roles in payments services and fraud prevention, including work at the forefront of tackling card fraud with Europol. As Head of Product & Innovation, he channels that front-line expertise into the product strategy that makes card-not-present fraud a solved problem.',
    photo: '/team/ben-jordan.png',
  },
  {
    name: 'Jeff Slawsky',
    title: 'MD - US Operations',
    bio: 'Placeholder bio — one sentence about engineering background.',
    photo: '/team/jeff-slawsky.jpeg',
  },
  {
    name: 'Missi Smith',
    title: 'Chief Customer Officer',
    bio: 'Placeholder bio — one sentence about sales background.',
    photo: '/team/missi-smith.jpeg',
  },
  {
    name: 'Bruce Bacon',
    title: 'Chief US Market Strategist',
    bio: 'Placeholder bio — one sentence about operations background.',
  },
  {
    name: 'Richard Pickard',
    title: 'Project Management & Administration Manager',
    bio: 'Placeholder bio — one sentence about operations background.',
  },
]

function PersonSilhouette() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="80" height="80" rx="40" fill="currentColor" className="text-base-300" />
      <circle cx="40" cy="30" r="14" fill="currentColor" className="text-base-content/20" />
      <path
        d="M12 72c0-15.464 12.536-28 28-28s28 12.536 28 28"
        fill="currentColor"
        className="text-base-content/20"
      />
    </svg>
  )
}

export function CompanyTeamSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          The Team
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-12">
          The people behind{' '}
          <span className="font-serif italic font-normal text-primary">the mission.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name + member.title} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-base-200">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PersonSilhouette />
                )}
              </div>
              <h3 className="font-semibold text-base-content">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.title}</p>
              <p className="text-sm text-base-content/60 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
