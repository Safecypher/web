import type { Metadata } from 'next'
import Link from 'next/link'
import { DemoPageTracker } from './DemoPageTracker'

export const metadata: Metadata = {
  title: 'Agentic Commerce Demo | SafeCypher Portal',
}

export default function DemoPage() {
  return (
    <div className="p-6 lg:p-8">
      <DemoPageTracker />
      <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-6">
        {/* Left column: iframe */}
        <div>
          <iframe
            src="/demos/boa/bofa-agentic-banking-mockup.html"
            width="100%"
            className="w-full h-[600px] border border-base-300 rounded-lg"
            title="Agentic Commerce Demo"
          />
        </div>

        {/* Right column: context panel */}
        <div className="mt-6 lg:mt-0">
          <div className="card bg-base-200 border border-base-300 p-6">
            <h1 className="text-xl font-bold text-base-content mb-3">Agentic Commerce Demo</h1>
            <p className="text-base-content/70 text-sm leading-relaxed mb-4">
              Watch an AI agent complete a purchase on behalf of a card holder &mdash; protected by
              SafeCypher Dynamic Security Codes. The CVV code in the agent&apos;s session is
              time-limited and expires after this single transaction.
            </p>
            <p className="text-base-content/50 text-xs leading-relaxed mb-5">
              This demonstrates the emerging agentic commerce threat surface and SafeCypher&apos;s
              protection against it.
            </p>
            <Link
              href="/dynamic-security-codes"
              className="text-accent text-sm font-medium hover:underline"
            >
              Learn about Dynamic Security Codes &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
