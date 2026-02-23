import type { Metadata } from 'next'
import { Outfit, Playfair_Display } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { Providers } from '@/app/providers'
import { PostHogPageView } from '@/components/analytics/PostHogPageView'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SafeCypher — Eliminate Card-Not-Present Fraud',
  description: 'Dynamic security codes that eliminate CNP fraud for card issuers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="safecypher-dark" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Providers>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
          <ConsentBanner />
        </Providers>
      </body>
    </html>
  )
}
