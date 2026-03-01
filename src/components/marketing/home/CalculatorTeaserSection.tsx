'use client'

import { useState } from 'react'

export function CalculatorTeaserSection() {
  const [portfolioSize, setPortfolioSize] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!portfolioSize) return
    const innerCallbackUrl = `/portal/calculator?portfolioSize=${encodeURIComponent(portfolioSize)}`
    window.location.href = `/portal/login?callbackUrl=${encodeURIComponent(innerCallbackUrl)}`
  }

  return (
    <section className="bg-base-200 border-t border-base-300 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">ROI Calculator</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
          See exactly what CNP fraud is costing your portfolio
        </h2>
        <p className="text-base-content/60 text-lg mb-10">
          Enter your card account volume for an instant savings estimate.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input
            type="number"
            min="1"
            placeholder="Total card accounts (e.g. 5,000,000)"
            value={portfolioSize}
            onChange={(e) => setPortfolioSize(e.target.value)}
            className="input input-bordered input-lg w-full sm:w-80"
            aria-label="Total card accounts"
          />
          <button type="submit" className="btn btn-primary btn-lg whitespace-nowrap">
            Calculate my savings &rarr;
          </button>
        </form>
        <p className="text-base-content/40 text-sm mt-6">
          No signup required to see your estimate.
        </p>
      </div>
    </section>
  )
}
