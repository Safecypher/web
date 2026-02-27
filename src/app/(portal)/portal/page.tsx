import Link from 'next/link'
import { PortalLoginTracker } from './PortalLoginTracker'

export default function PortalPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <PortalLoginTracker />

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold mb-2">Welcome to SafeCypher Portal</h1>
          <p className="text-base-content/70 mb-6">
            Explore your ROI with our interactive value calculator, or view the agentic commerce demo to see SafeCypher in action.
          </p>
          <div className="card-actions gap-4 flex-col sm:flex-row">
            <Link href="/portal/calculator" className="btn btn-primary flex-1">
              Open Calculator
            </Link>
            <Link href="/portal/demo" className="btn btn-ghost flex-1">
              View Agentic Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
