import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | CineKU",
  description: "CineKU Privacy Policy - How we handle your data",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="Your privacy is important to us. Please review our privacy practices."
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            1. Introduction
          </h2>
          <p>
            CineKU ("we" or "us" or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            2. Information Collection and Use
          </h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our service to you.
          </p>
          <div className="mt-3 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Types of Data Collected:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                <li>Usage data (pages visited, time spent, clicks)</li>
                <li>Device information (browser type, IP address)</li>
                <li>Cookies and tracking data</li>
                <li>Any data you voluntarily provide</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            3. Use of Data
          </h2>
          <p>
            CineKU uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-foreground/90">
            <li>To provide and maintain our website</li>
            <li>To notify you about changes to our website</li>
            <li>To allow you to participate in interactive features of our website when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis and feedback to improve our website</li>
            <li>To monitor the usage of our website</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            4. Security of Data
          </h2>
          <p>
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            5. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the bottom of this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            6. Third-Party Services
          </h2>
          <p>
            CineKU uses third-party services to provide its functionality, including the IMDb database API. These third parties may collect information as described in their own privacy policies. We encourage you to review the privacy policies of these services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            7. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the website. Your privacy and protection are our priorities.
          </p>
        </section>

        <section className="bg-white/5 border border-white/5 rounded-lg p-4 mt-6">
          <p className="text-xs text-foreground/60">
            <strong>Note:</strong> This Privacy Policy applies only to the CineKU website and services. When you access external links or third-party services, their own privacy policies apply. CineKU is not responsible for the privacy practices of external websites or services.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
