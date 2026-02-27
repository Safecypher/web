'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export function PortalSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setUserEmail(data.user.email)
      }
    })
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/portal/login')
  }

  const navLinks = [
    {
      href: '/portal/calculator',
      label: 'Calculator',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="10" y2="10" />
          <line x1="12" y1="10" x2="14" y2="10" />
          <line x1="16" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="10" y2="14" />
          <line x1="12" y1="14" x2="14" y2="14" />
          <line x1="16" y1="14" x2="16" y2="14" />
          <line x1="8" y1="18" x2="10" y2="18" />
          <line x1="12" y1="18" x2="14" y2="18" />
          <line x1="16" y1="18" x2="16" y2="18" />
        </svg>
      ),
    },
    {
      href: '/portal/demo',
      label: 'Agentic Demo',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="w-64 bg-base-200 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-base-300">
        <Link href="/portal" className="font-bold text-lg tracking-tight text-base-content">
          SafeCypher
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary rounded-lg'
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-300 rounded-lg'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* User + sign out */}
      <div className="px-4 py-4 border-t border-base-300 space-y-2">
        {userEmail && (
          <p className="text-xs text-base-content/50 truncate px-1">{userEmail}</p>
        )}
        <button
          onClick={handleSignOut}
          className="btn btn-ghost btn-sm w-full justify-start text-base-content/70 hover:text-base-content"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
