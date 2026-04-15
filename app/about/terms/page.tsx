import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms & Conditions | CineKU",
  description: "CineKU Terms & Conditions and usage agreements",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      description="Please read these terms carefully before using CineKU"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using CineKU, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            2. Use License
          </h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on CineKU for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-foreground/90">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to decompile or reverse engineering any software contained on CineKU</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            <li>Using automated scripts or bots to access the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            3. Disclaimer
          </h2>
          <p>
            The materials on CineKU are provided on an 'as is' basis. CineKU makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            4. Limitations
          </h2>
          <p>
            In no event shall CineKU or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CineKU.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            5. Accuracy of Materials
          </h2>
          <p>
            The materials appearing on CineKU could include technical, typographical, or photographic errors. CineKU does not warrant that any of the materials on its website are accurate, complete, or current. CineKU may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            6. Materials on Website
          </h2>
          <p>
            CineKU has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by CineKU of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            7. Modifications
          </h2>
          <p>
            CineKU may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            8. Governing Law
          </h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where CineKU is operated, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            9. IMDb Data Attribution
          </h2>
          <p>
            All movie, TV show, and entertainment data displayed on CineKU is sourced from the IMDb database API. CineKU does not claim ownership of this data. All rights belong to their respective owners. Users are required to comply with IMDb's terms of service when using IMDb-sourced data through CineKU.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            10. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us through the website.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
