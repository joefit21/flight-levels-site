import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Flight Levels products including ATC Clearance Trainer and Checkride Prep AI.',
}

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: August 28, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="mb-3">We collect the following types of information when you use Flight Levels products:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><strong>Account information:</strong> email address and password when you create an account</li>
            <li><strong>Usage data:</strong> practice session activity, scenario types, and feature usage to improve the Service</li>
            <li><strong>Payment information:</strong> processed by Stripe or Apple — we do not store payment card details</li>
            <li><strong>Voice input:</strong> audio submitted for transcription is processed and not retained after the session</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Provide and maintain the Service</li>
            <li>Process your subscription payments</li>
            <li>Send transactional emails related to your account</li>
            <li>Improve the quality and accuracy of AI training content</li>
            <li>Respond to support requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Third-Party Services</h2>
          <p>We use the following third-party services to operate the Service:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mt-3">
            <li><strong>Supabase</strong> — authentication and database</li>
            <li><strong>Stripe</strong> — payment processing for web subscriptions</li>
            <li><strong>Apple App Store / RevenueCat</strong> — payment processing for iOS subscriptions</li>
            <li><strong>Anthropic</strong> — AI language model powering the training tools</li>
            <li><strong>OpenAI Whisper</strong> — voice transcription</li>
          </ul>
          <p className="mt-3">Each of these services has its own privacy policy governing how they handle data.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
          <p>We do not sell your personal information. We share data only with the third-party service providers listed above, and only as necessary to operate the Service.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
          <p>We retain your account information for as long as your account is active. You may request deletion of your account and associated data by contacting us at <a href="mailto:joe@flight-levels.com" className="text-blue-600 hover:underline">joe@flight-levels.com</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Children's Privacy</h2>
          <p>The Service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify users of material changes via email or in-app notice. Continued use of the Service after changes are posted constitutes acceptance of the updated policy.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p>Questions about this Privacy Policy may be directed to <a href="mailto:joe@flight-levels.com" className="text-blue-600 hover:underline">joe@flight-levels.com</a>.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
