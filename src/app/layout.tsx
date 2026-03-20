import type { Metadata } from 'next'
import { Poppins, EB_Garamond } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { Providers } from '@/app/providers'
import { PostHogPageView } from '@/components/analytics/PostHogPageView'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { ChunkErrorHandler } from '@/components/ChunkErrorHandler'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
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
    <html lang="en" data-theme="safecypher-light" className={`${poppins.variable} ${ebGaramond.variable}`}>
      <body className="antialiased font-sans">
        <Providers>
          <ChunkErrorHandler />
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
