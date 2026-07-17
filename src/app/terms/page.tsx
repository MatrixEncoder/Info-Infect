import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Info-Infect",
  description: "Info-Infect terms of service — usage rules, disclaimers, and limitations.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0a0a0a] text-white py-24 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase mb-6">
            Legal
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black">Terms of Service</h1>
          <p className="text-gray-400 mt-3">Last updated: July 17, 2026</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[700px] mx-auto space-y-10">
          <div>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using Info-Infect (info-infect.com), you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use the site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
            <p className="text-gray-600 leading-relaxed">
              Info-Infect is a cybersecurity news aggregation platform that collects and organizes
              publicly available RSS feeds from third-party security news sources. We provide a
              unified interface for browsing and discovering cybersecurity intelligence. We do not
              create, edit, or endorse any of the content we aggregate.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">3. Acceptable Use</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to use Info-Infect for lawful purposes only. You may not: attempt to gain
              unauthorized access to any part of the service; use automated scripts to scrape or
              overload our infrastructure; redistribute our aggregated feed without attribution; or
              use the service to facilitate any illegal activity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">4. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              The Info-Infect interface, design, and code are proprietary. Article content belongs
              to its original publishers. We display aggregated content under fair use with proper
              attribution and source links. If you are a publisher and want content removed, contact
              us and we will comply promptly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed">
              Info-Infect is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
              the accuracy, completeness, or timeliness of any aggregated content. Cybersecurity
              information changes rapidly — always verify critical intelligence with original
              sources before making security decisions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Info-Infect and its operators shall not be liable for any damages arising from your
              use of the service, including but not limited to direct, indirect, incidental,
              consequential, or punitive damages. This includes any decisions made based on
              information displayed on the site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">7. Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify or discontinue the service at any time without notice.
              We may also update these terms from time to time. Continued use after changes
              constitutes acceptance of the modified terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">8. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about these terms? Contact us at{" "}
              <a href="mailto:legal@info-infect.com" className="text-red-600 font-semibold hover:underline">
                legal@info-infect.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
