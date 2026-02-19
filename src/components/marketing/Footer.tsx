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

          {/* Award badge placeholder */}
          <div className="flex items-center gap-2 rounded-lg border border-base-content/20 px-4 py-2">
            <div className="h-10 w-10 rounded bg-base-content/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-base-content">Irish Fintech Award</p>
              <p className="text-xs text-base-content/60">[PLACEHOLDER — badge image pending]</p>
            </div>
          </div>
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
