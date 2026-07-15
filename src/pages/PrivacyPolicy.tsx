import { motion } from 'framer-motion'
import { SEOHead } from '../components/seo/SEOHead'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Codex Privacy Policy — how we handle your data, code snippets, and privacy when using our AI-powered code explanation tool."
        path="/privacy-policy"
      />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div {...fadeIn}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm mb-12">Last updated: July 2026</p>
        </motion.div>

        <motion.div {...fadeIn} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} className="space-y-6 text-slate-300 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">1. Information We Collect</h2>
            <p>
              When you use Codex, we collect the code snippets you submit for analysis, the programming language you specify, and basic usage data such as request timestamps and token counts.
            </p>
            <p className="mt-2">
              We do not require an account. We do not collect your name, email address, or any personal identifiers unless you voluntarily provide them via the contact form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">2. How We Use Your Data</h2>
            <p>
              Code snippets are sent to our AI processing backend solely for the purpose of generating explanations. We do not store your code permanently, share it with third parties, or use it to train AI models.
            </p>
            <p className="mt-2">
              Aggregated, anonymized usage statistics may be collected to improve service performance and reliability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">3. Data Retention</h2>
            <p>
              Code snippets are processed in real time and are not retained after the explanation is delivered. Server logs may retain request metadata (timestamps, token counts) for up to 30 days for operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">4. Third-Party Services</h2>
            <p>
              Codex uses a third-party AI inference provider to process code explanations. Your code is transmitted to this provider solely for the purpose of generating your explanation and is not stored or logged by the provider beyond the duration of the request.
            </p>
            <p className="mt-2">
              We use Google Analytics to understand usage patterns. Google Analytics collects anonymized data such as page views and session duration. You can opt out via the Google Analytics opt-out browser add-on.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">5. Cookies</h2>
            <p>
              Codex uses minimal cookies required for rate limiting and analytics. We do not use tracking cookies or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">6. Your Rights</h2>
            <p>
              You have the right to request information about any data we may hold about you. Since we do not collect personal data or store code snippets, there is generally no data to request. If you have questions, contact us through the contact page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">8. Contact</h2>
            <p>
              If you have any questions about this privacy policy, please reach out through our contact page.
            </p>
          </section>
        </motion.div>
      </div>
    </>
  )
}