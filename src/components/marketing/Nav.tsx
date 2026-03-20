import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/SafeCypher-logo.svg"
            alt="SafeCypher"
            width={160}
            height={62}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Centre nav links */}
        <div className="hidden items-center gap-1 md:flex">
          <Link href="/platform" className="btn btn-ghost text-base font-medium">Platform Overview</Link>
          <Link href="/dynamic-security-codes" className="btn btn-ghost text-base font-medium">Dynamic CVV</Link>
          <Link href="/safe-verify" className="btn btn-ghost text-base font-medium">Safe Verify</Link>
          <Link href="/company" className="btn btn-ghost text-base font-medium">Company</Link>
        </div>

        {/* Right side: Portal icon + CTA */}
        <div className="flex items-center gap-3">
          {/* Portal link 
          <Link href="/portal" className="btn btn-ghost text-base font-medium">
            Sign in
          </Link>*/}

          {/* Request Demo CTA */}
          <Link href="/contact">
            <Button variant="primary" size="md">
              Request Demo
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
