import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions — SafeCypher',
  description: 'Terms and conditions for use of the SafeCypher website.',
}

export default function TermsPage() {
  return (
    <main className="bg-base-100">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-base-content">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-base-content/50">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-base-content/80">

          <section>
            <h2 className="text-xl font-semibold text-base-content">1. Acceptance of terms</h2>
            <p className="mt-3 leading-relaxed">
              By accessing or using the SafeCypher website at safecypher.com (the "Site"), you agree
              to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">2. About SafeCypher</h2>
            <p className="mt-3 leading-relaxed">
              SafeCypher Ltd is a financial technology company providing card-not-present fraud
              elimination solutions. The Site is a marketing and information resource; it does not
              constitute an offer to provide services.
            </p>
            <p className="mt-3 leading-relaxed">
              Company registration number: 14233172. VAT registration: GB419939941.
              Registered correspondence address: Safecypher Ltd, PO Box 353, Leeds, LS16 0HN.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">3. Use of the Site</h2>
            <p className="mt-3 leading-relaxed">
              You may use the Site for lawful purposes only. You must not:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 leading-relaxed">
              <li>Use the Site in any way that breaches applicable laws or regulations.</li>
              <li>Attempt to gain unauthorised access to any part of the Site or its infrastructure.</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material.</li>
              <li>Scrape, copy, or reproduce Site content without our prior written consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">4. Intellectual property</h2>
            <p className="mt-3 leading-relaxed">
              All content on this Site — including text, graphics, logos, and software — is the
              property of SafeCypher Ltd or its licensors and is protected by applicable intellectual
              property laws. Nothing on this Site grants you a licence to use SafeCypher's intellectual
              property except as expressly stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">5. Disclaimers</h2>
            <p className="mt-3 leading-relaxed">
              The Site is provided on an "as is" basis. SafeCypher makes no warranties, express or
              implied, regarding the accuracy, completeness, or fitness for a particular purpose of
              any content on the Site. We reserve the right to modify or withdraw the Site at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">6. Limitation of liability</h2>
            <p className="mt-3 leading-relaxed">
              To the fullest extent permitted by law, SafeCypher Ltd shall not be liable for any
              indirect, incidental, or consequential losses arising from your use of the Site.
            </p>
            <p className="mt-3 leading-relaxed text-base-content/50 italic text-sm">
              [Full liability cap and carve-outs to be reviewed by legal counsel.]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">7. Third-party links</h2>
            <p className="mt-3 leading-relaxed">
              The Site may contain links to third-party websites. These links are provided for
              convenience only. SafeCypher has no control over the content of those sites and
              accepts no responsibility for them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">8. Governing law</h2>
            <p className="mt-3 leading-relaxed">
              These Terms &amp; Conditions are governed by the laws of Ireland. Any disputes shall be
              subject to the exclusive jurisdiction of the Irish courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">9. Changes to these terms</h2>
            <p className="mt-3 leading-relaxed">
              We may revise these terms at any time. Continued use of the Site after changes are
              posted constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-base-content">10. Contact</h2>
            <p className="mt-3 leading-relaxed">
              Questions about these terms? Contact Mr Richard Pickard at{' '}
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
