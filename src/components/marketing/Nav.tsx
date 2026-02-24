'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'

const platformLinks = [
  { label: 'Platform Overview', href: '/platform', description: 'One integration. Seven products.' },
  { label: 'Dynamic Security Codes', href: '/dynamic-security-codes', description: 'Eliminate CNP fraud at source' },
  { label: 'Safe Verify', href: '/safe-verify', description: 'Phone channel authentication' },
]

export function Nav() {
  const [platformOpen, setPlatformOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-base-content">
            Safe<span className="text-primary">Cypher</span>
          </span>
        </Link>

        {/* Centre nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Platform dropdown */}
          <div className="relative">
            <button
              onClick={() => setPlatformOpen((prev) => !prev)}
              className="btn btn-ghost text-base font-medium gap-1"
              aria-expanded={platformOpen}
              aria-haspopup="true"
            >
              Platform
              <svg
                className={`h-4 w-4 transition-transform ${platformOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega-menu dropdown */}
            {platformOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-box bg-base-200 p-4 shadow-xl border border-base-300">
                <div className="space-y-1">
                  {platformLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setPlatformOpen(false)}
                      className="block rounded-lg px-3 py-2 hover:bg-base-300 transition-colors"
                    >
                      <p className="font-medium text-base-content">{link.label}</p>
                      <p className="text-sm text-base-content/60">{link.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/company" className="btn btn-ghost text-base font-medium">Company</Link>
        </div>

        {/* Right side: Portal icon + CTA */}
        <div className="flex items-center gap-3">
          {/* Portal link */}
          <Link href="/portal" className="btn btn-ghost text-base font-medium">
            Sign in
          </Link>

          {/* Request Demo CTA */}
          <Link href="/contact">
            <Button variant="primary" size="md">
              Request Demo
            </Button>
          </Link>
        </div>
      </nav>

      {/* Close mega-menu when clicking outside */}
      {platformOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setPlatformOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
