export function SvFlowDiagram() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">{'// Outbound Call Flow'}</p>
        <h2 className="text-2xl font-bold text-base-content mb-2">How the verification moment works</h2>
        <p className="text-base-content/50 text-sm mb-10">Production diagram — coming soon. Structure below represents the live flow.</p>

        <div className="flex flex-col sm:flex-row items-center gap-4 overflow-x-auto pb-4">

          {/* Box 1 — Bank Agent */}
          <div className="flex-shrink-0 w-40 rounded-xl border-2 border-primary/40 bg-base-100 p-4 text-center">
            <div className="text-xs font-mono text-primary mb-1">01</div>
            <div className="text-sm font-semibold text-base-content">Bank Agent</div>
            <div className="text-xs text-base-content/40 mt-1">Initiates call</div>
          </div>

          {/* Connector */}
          <div className="hidden sm:flex items-center text-primary/40">
            <div className="w-8 h-px bg-primary/30" />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="sm:hidden text-primary/40 text-xl">&#x2193;</div>

          {/* Box 2 — Safe Verify API */}
          <div className="flex-shrink-0 w-44 rounded-xl border-2 border-accent/60 bg-base-100 p-4 text-center">
            <div className="text-xs font-mono text-accent mb-1">02</div>
            <div className="text-sm font-semibold text-base-content">Safe Verify API</div>
            <div className="text-xs text-base-content/40 mt-1">Sends push notification</div>
          </div>

          {/* Connector */}
          <div className="hidden sm:flex items-center text-primary/40">
            <div className="w-8 h-px bg-primary/30" />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="sm:hidden text-primary/40 text-xl">&#x2193;</div>

          {/* Box 3 — Customer App */}
          <div className="flex-shrink-0 w-40 rounded-xl border-2 border-primary/40 bg-base-100 p-4 text-center">
            <div className="text-xs font-mono text-primary mb-1">03</div>
            <div className="text-sm font-semibold text-base-content">Customer App</div>
            <div className="text-xs text-base-content/40 mt-1">3-layer biometric auth</div>
          </div>

          {/* Connector */}
          <div className="hidden sm:flex items-center text-primary/40">
            <div className="w-8 h-px bg-primary/30" />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="sm:hidden text-primary/40 text-xl">&#x2193;</div>

          {/* Box 4 — Mutual Verification */}
          <div className="flex-shrink-0 w-44 rounded-xl border-2 border-success/60 bg-base-100 p-4 text-center">
            <div className="text-xs font-mono text-success mb-1">04</div>
            <div className="text-sm font-semibold text-base-content">Mutual Verification</div>
            <div className="text-xs text-base-content/40 mt-1">Agent + customer confirmed</div>
          </div>

          {/* Connector */}
          <div className="hidden sm:flex items-center text-primary/40">
            <div className="w-8 h-px bg-primary/30" />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="sm:hidden text-primary/40 text-xl">&#x2193;</div>

          {/* Box 5 — Serve Customer */}
          <div className="flex-shrink-0 w-44 rounded-xl border-2 border-success/60 bg-success/5 p-4 text-center">
            <div className="text-xs font-mono text-success mb-1">05</div>
            <div className="text-sm font-semibold text-base-content">Serve Customer</div>
            <div className="text-xs text-base-content/40 mt-1">No security questions</div>
          </div>

        </div>

        <p className="text-xs text-base-content/30 mt-6 text-center tracking-widest uppercase">
          Placeholder — production SVG to replace in a future update
        </p>
      </div>
    </section>
  )
}
