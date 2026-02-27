'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/portal/calculator'

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (resendCountdown <= 0) return
    const timer = setInterval(() => {
      setResendCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCountdown])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const supabase = createClient()
    const redirectTo = `${window.location.origin}/portal/auth/callback?callbackUrl=${encodeURIComponent(callbackUrl)}`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    })

    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
    } else {
      setStatus('sent')
      setResendCountdown(60)
    }
  }

  async function handleResend() {
    if (resendCountdown > 0 || resending) return
    setResending(true)

    const supabase = createClient()
    const redirectTo = `${window.location.origin}/portal/auth/callback?callbackUrl=${encodeURIComponent(callbackUrl)}`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    })

    setResending(false)

    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
    } else {
      setStatus('sent')
      setResendCountdown(60)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body gap-6">
          {/* Logo / wordmark */}
          <div className="text-center">
            <span className="text-2xl font-bold tracking-tight font-sans">
              <span className="text-primary">Safe</span>
              <span className="text-base-content">Cypher</span>
            </span>
            <p className="text-base-content/60 text-sm mt-1">Portal</p>
          </div>

          {status === 'sent' ? (
            <div className="text-center space-y-4">
              <div className="text-4xl">&#9993;</div>
              <h2 className="text-lg font-semibold">Check your email</h2>
              <p className="text-base-content/70 text-sm">
                We sent a magic link to <strong>{email}</strong>. Click it to
                sign in — the link expires in 60 minutes.
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCountdown > 0 || resending}
                className="btn btn-ghost btn-sm"
              >
                {resendCountdown > 0
                  ? `Resend in ${resendCountdown}s`
                  : resending
                    ? 'Sending...'
                    : 'Resend link'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-center mb-1">
                  Sign in to your portal
                </h2>
                <p className="text-base-content/60 text-sm text-center">
                  Enter your email and we&apos;ll send a magic link.
                </p>
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email address</legend>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input input-bordered w-full"
                />
              </fieldset>

              {status === 'error' && (
                <p className="text-error text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary w-full"
              >
                {status === 'sending' ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  'Send magic link'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-base-100" />}>
      <LoginForm />
    </Suspense>
  )
}
