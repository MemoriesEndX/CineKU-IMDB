import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Link from "next/link";
import { IoShield, IoArrowBack } from "react-icons/io5";

export const metadata: Metadata = {
  title: "DMCA Policy | CineKU",
  description: "DMCA compliance policy and copyright infringement reporting procedures for CineKU.",
};

export default function DMCAPage() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl space-y-8 px-4 py-8">
        {/* Header */}
        <div className="space-y-2">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <IoArrowBack className="text-lg" />
            Back to About
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="text-4xl text-red-400">
              <IoShield />
            </div>
            <h1 className="text-4xl font-bold text-foreground">DMCA Policy</h1>
          </div>
          <p className="text-foreground/60 text-lg">
            Copyright infringement reporting and DMCA compliance information
          </p>
        </div>

        {/* Introduction */}
        <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-600/5 p-6 backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-red-400">
              Digital Millennium Copyright Act (DMCA) Compliance
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              CineKU respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA). If you believe that your copyrighted content is being infringed upon through CineKU, please follow the procedures outlined in this policy.
            </p>
            <div className="bg-black/20 border border-white/5 rounded-lg p-4 mt-4">
              <p className="text-xs text-foreground/70">
                <span className="font-semibold text-foreground">Important:</span> CineKU does not host, distribute, or stream any video content. We display metadata and information from IMDb. If you have concerns about IMDb content, please contact IMDb directly.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Policy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Copyright Policy</h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="space-y-4">
              <p className="text-foreground/80">
                CineKU has adopted a zero-tolerance policy toward copyright infringement. Our platform policy requires:
              </p>
              <ul className="space-y-3 list-inside list-disc text-foreground/80">
                <li>No hosting of copyrighted video, audio, or media content</li>
                <li>No distribution or streaming of protected works</li>
                <li>Attribution and respect for all intellectual property rights</li>
                <li>Immediate response to valid DMCA takedown notices</li>
                <li>Removal of infringing content upon notification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reporting Infringement */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Reporting Copyright Infringement</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
              <h3 className="font-semibold text-foreground mb-3">DMCA Takedown Notice</h3>
              <p className="text-foreground/80 mb-4">
                If you believe that content on CineKU infringes your copyright, you may submit a DMCA notice. Please note that CineKU primarily displays IMDb metadata and information, not hosted media content.
              </p>
              <p className="text-foreground/80 text-sm">
                Send your DMCA notice to our designated agent:
              </p>
              <div className="mt-4 bg-black/30 border border-white/10 rounded-lg p-4 space-y-2 font-mono text-sm text-foreground">
                <p>Legal Department</p>
                <p>CineKU</p>
                <p>Email: legal@cineku.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Required Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Required Information in a DMCA Notice</h2>
          <div className="space-y-3">
            {[
              {
                title: "1. Your Identification",
                desc: "Your full name, address, telephone number, and email address.",
              },
              {
                title: "2. Copyrighted Work Description",
                desc: "A detailed description of the copyrighted work(s) you claim has been infringed, including title, registration number (if applicable), and date of creation.",
              },
              {
                title: "3. Infringing Material Location",
                desc: "Specific URL(s) or location on CineKU where the infringing material appears. Please be as specific as possible.",
              },
              {
                title: "4. Your Contact Information",
                desc: "Your name, address, telephone number, and email address.",
              },
              {
                title: "5. Statement of Good Faith",
                desc: "A statement confirming that you have a good faith belief that the use of the material is not authorized by you, your agent, or the law.",
              },
              {
                title: "6. Accuracy Statement",
                desc: "A statement that the information in your notice is accurate, made under penalty of perjury.",
              },
              {
                title: "7. Your Signature",
                desc: "Your physical or electronic signature.",
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Counter-Notification */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Counter-Notification Procedure</h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="space-y-4">
              <p className="text-foreground/80">
                If you believe that content you uploaded has been wrongly removed due to a DMCA notice, you may submit a counter-notification. The counter-notification must include:
              </p>
              <ul className="space-y-3 list-inside list-disc text-foreground/80">
                <li>Your physical or electronic signature</li>
                <li>The specific URL(s) of the removed content</li>
                <li>A statement under penalty of perjury that you believe the removal was a mistake</li>
                <li>Your name, address, telephone number, and email address</li>
                <li>A statement that you consent to jurisdiction of your local federal court</li>
              </ul>
              <p className="text-foreground/80 text-sm mt-4">
                Submit counter-notifications to: <span className="font-semibold">legal@cineku.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Response Policy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Response Policy</h2>
          <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-600/5 p-6 backdrop-blur-md">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Upon Receipt of a Valid DMCA Notice:</h3>
              <ul className="space-y-3 list-inside list-disc text-foreground/80">
                <li>We will investigate the claim within 48 hours</li>
                <li>If valid, we will immediately remove or disable access to the infringing material</li>
                <li>We will notify affected users of the removal</li>
                <li>We will preserve evidence as required by law</li>
              </ul>
              <h3 className="font-semibold text-foreground mt-4">Repeat Infringement:</h3>
              <p className="text-foreground/80">
                CineKU may, in its sole discretion and without notice, disable the accounts of users who repeatedly violate copyright laws or this DMCA policy.
              </p>
            </div>
          </div>
        </div>

        {/* IMDb-Specific Note */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Important Note About IMDb Content</h2>
          <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6 backdrop-blur-md">
            <p className="text-foreground/80">
              CineKU displays metadata and information sourced from IMDb. If you have concerns about specific content being displayed on IMDb itself (such as posters, images, or descriptions), please contact IMDb directly at their DMCA agent. CineKU simply displays IMDb's data and does not independently host or distribute copyrighted content.
            </p>
            <p className="text-foreground/80 text-sm mt-4">
              IMDb DMCA Contact: <span className="font-semibold">Copyright @ IMDb.com, Inc.</span>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Disclaimer</h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
            <p className="text-foreground/80 text-sm">
              This DMCA policy is provided for informational purposes and does not constitute legal advice. CineKU is not a legal entity that handles content distribution or hosting. We are a discovery platform that displays metadata. False DMCA claims may result in legal liability under 17 U.S.C. § 512(f). If you are uncertain whether your notice qualifies under DMCA, consult an attorney before submitting.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-white/5 pt-8">
          <div className="text-center space-y-4">
            <p className="text-foreground/60 text-sm">
              Related legal documents
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about/disclaimer"
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Disclaimer
              </Link>
              <span className="text-white/10">•</span>
              <Link
                href="/about/privacy"
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Privacy Policy
              </Link>
              <span className="text-white/10">•</span>
              <Link
                href="/about/terms"
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-xs text-foreground/40 pt-4">
          <p>Last updated: April 2026</p>
        </div>
      </div>
    </div>
  );
}
