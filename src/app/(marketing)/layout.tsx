import { Nav } from '@/components/marketing/Nav'
import { Footer } from '@/components/marketing/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main className="min-h-screen pb-20 sm:pb-24">{children}</main>
      <Footer />
    </>
  )
}
