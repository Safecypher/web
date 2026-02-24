import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  Products: [
    { label: 'Platform Overview', href: '/platform' },
    { label: 'Dynamic Security Codes', href: '/dynamic-security-codes' },
    { label: 'Safe Verify', href: '/safe-verify' },
  ],
  Company: [
    { label: 'About Us', href: '/company' },
    { label: 'Contact', href: '/contact' },
    { label: 'Resources', href: '/resources' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      {/* Proof bar */}
      <div className="border-b border-base-300 bg-base-300/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          {/* An Post proof stat */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-base-content">
              An Post:{' '}
              <span className="text-primary">800,000+ transactions.</span>
            </p>
            <p className="text-base-content/60">Zero CNP fraud.</p>
          </div>

          {/* Award badge */}
          <Image
            src="/badges/fintech-awards-2025.png"
            alt="Irish Fintech Awards 2025"
            width={160}
            height={53}
          />
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-base-content">
              Safe<span className="text-primary">Cypher</span>
            </Link>
            <p className="mt-3 text-sm text-base-content/60">
              Eliminate card-not-present fraud. Not reduce. Eliminate.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content/40">
                {category}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-base-content/60 hover:text-base-content transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-base-300 pt-6">
          <p className="text-center text-xs text-base-content/40">
            © {new Date().getFullYear()} SafeCypher Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
