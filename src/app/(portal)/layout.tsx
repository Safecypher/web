import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PortalSidebar } from '@/components/portal/PortalSidebar'
import { PortalLoginTracker } from '@/app/(portal)/portal/PortalLoginTracker'

// CRITICAL: NuqsAdapter goes HERE (portal layout) NOT in the root src/app/layout.tsx
// Adding it to root would affect the marketing site URL handling (Pitfall 3 from RESEARCH.md)
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NuqsAdapter>
      <PortalLoginTracker />
      <div className="flex min-h-screen bg-base-100">
        <PortalSidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </NuqsAdapter>
  )
}
