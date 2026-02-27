import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — SafeCypher',
  description: 'How SafeCypher collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-base-100">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-base-content">Privacy Policy</h1>
        <p className="mt-2 text-sm text-base-content/50">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-base-content/80">

          <section>
            <h2 className="text-xl font-semibold text-base-content">1. Who we are</h2>
            <p className="mt-3 leading-relaxed">
              SafeCypher Ltd (&ldquo;SafeCypher&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website at safecypher.com.
              We are a financial technology company providing card-not-present fraud elimination solutions
              to financial institutions and merchants.
            </p>
            <p className="mt-3 leading-relaxed">
              Company registration number: 14233172. VAT registration: GB419939941.
            </p>
            <p className="mt-3 leading-relaxed">
              Data controller: Mr Richard Pickard, Safecypher Ltd, PO Box 353, Leeds, LS16 0HN.
              Email:{' '}
              <a href="mailto:richard.pickard@safecypher.com" className="text-primary hover:underline">
                richard.pickard@safecypher.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">2. What data we collect</h2>
            <p className="mt-3 leading-relaxed">
              When you visit our website, we may collect:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Contact information</strong> — name, email address, and company name when you submit a demo request or contact form.</li>
              <li><strong>Usage data</strong> — anonymised analytics about how you navigate the site (pages visited, time on page, referral source). This is collected only with your consent via the cookie banner.</li>
              <li><strong>Technical data</strong> — IP address, browser type, and device information collected automatically for security and performance purposes.</li>
            </ul>
            <p className="mt-3 leading-relaxed text-base-content/50 italic text-sm">
              [Full data inventory to be completed.]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">3. How we use your data</h2>
            <p className="mt-3 leading-relaxed">
              We use the data we collect to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 leading-relaxed">
              <li>Respond to demo requests and enquiries.</li>
              <li>Improve the website and understand visitor behaviour (analytics, with consent only).</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              We do not sell personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">4. Analytics</h2>
            <p className="mt-3 leading-relaxed">
              We use PostHog for product analytics. If you accept analytics cookies, anonymised usage
              data is sent to PostHog. No personally identifiable information is included in these
              analytics events. You can withdraw consent at any time by clearing your cookies and
              declining when the banner re-appears.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">5. Data retention</h2>
            <p className="mt-3 leading-relaxed text-base-content/50 italic text-sm">
              [Retention periods to be defined.]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">6. Your rights</h2>
            <p className="mt-3 leading-relaxed">
              Under GDPR, you have the right to access, rectify, erase, or restrict processing of your
              personal data. To exercise any of these rights, contact us at{' '}
              <a href="mailto:richard.pickard@safecypher.com" className="text-primary hover:underline">
                richard.pickard@safecypher.com
              </a>{' '}
              or write to Safecypher Ltd, PO Box 353, Leeds, LS16 0HN.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">7. Cookies</h2>
            <p className="mt-3 leading-relaxed">
              We use strictly necessary cookies to operate the site, and optional analytics cookies
              (PostHog) only with your explicit consent. You can manage your preferences via the
              cookie banner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">8. Changes to this policy</h2>
            <p className="mt-3 leading-relaxed">
              We may update this policy from time to time. Material changes will be noted by updating
              the &ldquo;Last updated&rdquo; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">9. Contact</h2>
            <p className="mt-3 leading-relaxed">
              Questions about this policy? Contact Mr Richard Pickard at{' '}
              <a href="mailto:richard.pickard@safecypher.com" className="text-primary hover:underline">
                richard.pickard@safecypher.com
              </a>{' '}
              or write to Safecypher Ltd, PO Box 353, Leeds, LS16 0HN.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
