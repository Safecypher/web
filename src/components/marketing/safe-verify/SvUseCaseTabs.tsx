'use client'

import { useState } from 'react'

type TabKey = 'outbound' | 'inbound' | 'bidirectional' | 'branch'

interface FlowStep {
  stepLabel: string
  title: string
  description: string
  iconBg: string
  icon: React.ReactNode
}

const PhoneIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const QuestionCircleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const RepeatIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const ChatIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const LightningIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ArrowsExchangeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
)

const BuildingIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
)

const CardIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)

const FingerprintIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
  </svg>
)

const outboundSteps: FlowStep[] = [
  {
    stepLabel: 'Step 01',
    title: 'Bank initiates outbound call',
    description: 'The agent calls the customer. Safe Verify simultaneously sends a push notification / deep link to the customer\u2019s banking app.',
    iconBg: 'bg-primary/10',
    icon: <PhoneIcon />,
  },
  {
    stepLabel: 'Step 02',
    title: 'Customer opens app & verifies identity',
    description: 'Customer opens the banking app via the notification and authenticates using three layers: phone unlock, app login, and biometric (Face ID / fingerprint).',
    iconBg: 'bg-success/10',
    icon: <BellIcon />,
  },
  {
    stepLabel: 'Step 03',
    title: 'Bank agent verified in-app',
    description: 'The app displays the agent\u2019s name and department \u2014 a display that can only be triggered by a call originating from the bank. Customer sees proof it\u2019s legitimate.',
    iconBg: 'bg-warning/10',
    icon: <ShieldCheckIcon />,
  },
  {
    stepLabel: 'Step 04',
    title: 'Active question validation',
    description: 'The agent sends verification questions to the app. The customer selects the correct answer on-screen \u2014 cementing bidirectional trust without speaking sensitive details aloud.',
    iconBg: 'bg-primary/10',
    icon: <QuestionCircleIcon />,
  },
  {
    stepLabel: 'Step 05',
    title: 'Authenticated conversation begins',
    description: 'Both parties are verified. The agent can serve the customer immediately \u2014 no repetitive questions, no wasted time, no opportunity for social engineering.',
    iconBg: 'bg-success/10',
    icon: <CheckCircleIcon />,
  },
  {
    stepLabel: 'Fallback',
    title: 'Graceful fallback',
    description: 'If the customer is unavailable or verification fails, a message is left to contact the bank directly. Security is never compromised.',
    iconBg: 'bg-error/10',
    icon: <RepeatIcon />,
  },
]

const inboundSteps: FlowStep[] = [
  {
    stepLabel: 'Step 01',
    title: 'Customer calls the bank',
    description: 'The customer dials the bank\u2019s contact centre. Safe Verify detects the incoming call and instantly pushes a verification prompt to the customer\u2019s banking app.',
    iconBg: 'bg-primary/10',
    icon: <PhoneIcon />,
  },
  {
    stepLabel: 'Step 02',
    title: 'Customer authenticates in-app',
    description: 'Before the agent answers, the customer completes three-layer authentication in the app: phone unlock, app login, and biometric confirmation.',
    iconBg: 'bg-success/10',
    icon: <LockIcon />,
  },
  {
    stepLabel: 'Step 03',
    title: 'Agent receives verified status',
    description: 'The agent\u2019s screen displays a \u201cCustomer Verified\u201d status before the conversation begins. No security questions required.',
    iconBg: 'bg-warning/10',
    icon: <ShieldCheckIcon />,
  },
  {
    stepLabel: 'Step 04',
    title: 'Conversation starts immediately',
    description: 'With identity confirmed, the agent addresses the customer\u2019s query directly. Reduced handle time. No friction for genuine callers.',
    iconBg: 'bg-success/10',
    icon: <ChatIcon />,
  },
  {
    stepLabel: 'Fallback',
    title: 'Graceful fallback',
    description: 'If the customer cannot complete in-app verification, the agent falls back to standard KBA \u2014 ensuring no call is ever abandoned due to the verification layer.',
    iconBg: 'bg-error/10',
    icon: <RepeatIcon />,
  },
]

const bidirectionalSteps: FlowStep[] = [
  {
    stepLabel: 'Step 01',
    title: 'Either party initiates',
    description: 'Whether the bank calls the customer or vice versa, Safe Verify activates simultaneously \u2014 one protocol handles both directions.',
    iconBg: 'bg-primary/10',
    icon: <ArrowsExchangeIcon />,
  },
  {
    stepLabel: 'Step 02',
    title: 'Customer verifies themselves',
    description: 'The customer authenticates via the banking app using phone unlock, app login, and biometric \u2014 proving their identity to the bank.',
    iconBg: 'bg-success/10',
    icon: <FingerprintIcon />,
  },
  {
    stepLabel: 'Step 03',
    title: 'Bank verifies itself to customer',
    description: 'The in-app display shows the agent\u2019s name and department, triggered only by a legitimate bank call. The customer sees proof \u2014 not just a caller ID that can be spoofed.',
    iconBg: 'bg-warning/10',
    icon: <ShieldCheckIcon />,
  },
  {
    stepLabel: 'Step 04',
    title: 'Mutual trust confirmed',
    description: 'Both parties are verified simultaneously. The conversation proceeds with full bidirectional trust \u2014 eliminating vishing and impersonation in a single frictionless moment.',
    iconBg: 'bg-success/10',
    icon: <CheckCircleIcon />,
  },
  {
    stepLabel: 'Step 05',
    title: 'Serve immediately',
    description: 'No repetitive questions. No security theatre. The agent can resolve the customer\u2019s issue from the first word of the conversation.',
    iconBg: 'bg-primary/10',
    icon: <LightningIcon />,
  },
]

const branchSteps: FlowStep[] = [
  {
    stepLabel: 'Step 01',
    title: 'Customer arrives at branch',
    description: 'The customer approaches a teller or relationship manager. The branch advisor initiates a Safe Verify session from their terminal.',
    iconBg: 'bg-primary/10',
    icon: <BuildingIcon />,
  },
  {
    stepLabel: 'Step 02',
    title: 'Push notification to banking app',
    description: 'A verification prompt is pushed to the customer\u2019s banking app. No printed form, no verbal question \u2014 the app does the heavy lifting.',
    iconBg: 'bg-success/10',
    icon: <BellIcon />,
  },
  {
    stepLabel: 'Step 03',
    title: 'Customer verifies in-app',
    description: 'The customer authenticates with three layers in the app. The branch advisor\u2019s terminal shows \u201cCustomer Verified\u201d within seconds.',
    iconBg: 'bg-warning/10',
    icon: <FingerprintIcon />,
  },
  {
    stepLabel: 'Step 04',
    title: 'Transaction proceeds',
    description: 'With identity confirmed to the same standard as a digital session, the branch interaction continues without manual ID checks or knowledge-based questions.',
    iconBg: 'bg-success/10',
    icon: <CheckCircleIcon />,
  },
  {
    stepLabel: 'Fallback',
    title: 'ID document fallback',
    description: 'If the customer\u2019s phone is unavailable, the advisor falls back to document ID \u2014 ensuring branch operations are never blocked by the verification layer.',
    iconBg: 'bg-error/10',
    icon: <CardIcon />,
  },
]

const tabData: Record<TabKey, FlowStep[]> = {
  outbound: outboundSteps,
  inbound: inboundSteps,
  bidirectional: bidirectionalSteps,
  branch: branchSteps,
}

const tabLabels: Record<TabKey, string> = {
  outbound: 'Outbound',
  inbound: 'Inbound',
  bidirectional: 'Bi-directional',
  branch: 'Branch',
}

function StepCard({ step }: { step: FlowStep }) {
  return (
    <div className="p-6 bg-base-200 rounded-2xl border border-base-300 hover:border-primary/40 transition-colors">
      <div className="text-xs font-mono text-primary mb-3">{step.stepLabel}</div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${step.iconBg}`}>
        {step.icon}
      </div>
      <h3 className="text-base font-semibold text-base-content mb-2">{step.title}</h3>
      <p className="text-sm text-base-content/60 leading-relaxed">{step.description}</p>
    </div>
  )
}

export function SvUseCaseTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('outbound')

  const steps = tabData[activeTab]

  return (
    <section id="use-cases" className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">// How It Works</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
          Outbound call <span className="font-serif italic font-normal">verification flow</span>
        </h2>
        <div className="w-16 h-0.5 bg-base-content/20 mt-6 mb-10" />

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-base-300 mb-10">
          {(['outbound', 'inbound', 'bidirectional', 'branch'] as const).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  'px-5 py-3 text-sm font-semibold transition-colors',
                  isActive
                    ? 'text-primary border-b-2 border-primary -mb-px'
                    : 'text-base-content/40 border-b-2 border-transparent -mb-px hover:text-base-content/70',
                ].join(' ')}
              >
                {tabLabels[tab]}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step) => (
            <StepCard key={step.stepLabel} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
