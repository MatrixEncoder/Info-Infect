import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Info-Infect",
  description: "Info-Infect privacy policy — how we handle data, cookies, and your information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0a0a0a] text-white py-24 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase mb-6">
            Legal
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black">Privacy Policy</h1>
          <p className="text-gray-400 mt-3">Last updated: July 17, 2026</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[700px] mx-auto prose-custom space-y-10">
          <div>
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              Info-Infect is a news aggregation service. We do not require account creation to
              browse content. If you subscribe to our newsletter, we collect your email address
              solely for the purpose of delivering updates. We do not sell, share, or monetize
              subscriber data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">2. Cookies &amp; Tracking</h2>
            <p className="text-gray-600 leading-relaxed">
              We use minimal, essential cookies for site functionality (session state, theme
              preference). We do not use third-party analytics trackers, advertising pixels, or
              behavioral tracking tools. Our site runs clean — no Google Analytics, no Facebook
              Pixel, no surveillance scripts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">3. RSS Feed Content</h2>
            <p className="text-gray-600 leading-relaxed">
              All articles displayed on Info-Infect are sourced from publicly available RSS feeds.
              We link to original sources and credit original publishers. Content is aggregated for
              informational purposes under fair use. We do not host or claim ownership of any
              third-party content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement standard security measures to protect any data we hold. Subscriber
              email addresses are stored in encrypted databases with access controls. However, no
              method of transmission over the Internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">5. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed">
              Our articles link to external cybersecurity news sites. We are not responsible for
              the privacy practices of these external sites. We encourage you to review the privacy
              policies of any site you visit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You can unsubscribe from our newsletter at any time by contacting us. Upon request,
              we will delete your email address from our mailing list within 48 hours. You have
              the right to access, correct, or delete any personal data we hold about you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">7. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this
              page with an updated revision date. Continued use of the site after changes
              constitutes acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">8. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For privacy-related inquiries, contact us at{" "}
              <a href="mailto:privacy@info-infect.com" className="text-red-600 font-semibold hover:underline">
                privacy@info-infect.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
