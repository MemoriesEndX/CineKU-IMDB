import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Link from "next/link";
import { IoWarning, IoShieldCheckmark, IoArrowBack } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Disclaimer | CineKU",
  description: "Important disclaimer regarding content sourcing and data ownership on CineKU.",
};

export default function DisclaimerPage() {
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
            <div className="text-4xl text-amber-400">
              <IoWarning />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Disclaimer</h1>
          </div>
          <p className="text-foreground/60 text-lg">
            Important information about content sourcing and data ownership
          </p>
        </div>

        {/* Primary Disclaimer Card */}
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6 backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-amber-400">
              100% IMDb Database Sourced
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              All content, metadata, ratings, posters, images, descriptions, and related information displayed on CineKU are <span className="font-semibold text-foreground">100% sourced from the IMDb database API</span> or services based on IMDb data. CineKU does not claim ownership of this data, and all rights belong to their respective owners.
            </p>
          </div>
        </div>

        {/* What We Don't Own */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">What CineKU Does Not Own</h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
            <p className="text-foreground/80 mb-4">
              The following content is sourced entirely from IMDb and is not owned or created by CineKU:
            </p>
            <ul className="space-y-3 list-inside list-disc text-foreground/80">
              <li>Movie, television, and anime titles and metadata</li>
              <li>Ratings, reviews, and user feedback</li>
              <li>Poster artwork and promotional images</li>
              <li>Cast and crew information</li>
              <li>Plot summaries and descriptions</li>
              <li>Release dates and production credits</li>
              <li>Genre classifications and keywords</li>
              <li>Runtime and episode information</li>
              <li>Any other IMDb-provided data</li>
            </ul>
          </div>
        </div>

        {/* Data Attribution */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Data Attribution & Rights</h2>
          <div className="rounded-xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-600/5 p-6 backdrop-blur-md">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">IMDb Attribution</h3>
                <p className="text-foreground/80 text-sm">
                  All data accessible through CineKU is attributed to IMDb (Internet Movie Database). IMDb retains all intellectual property rights to this data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">No Content Hosting</h3>
                <p className="text-foreground/80 text-sm">
                  CineKU is an entertainment discovery platform only. We do not host, stream, download, or distribute any video content, audio files, or copyrighted media.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Limited Use License</h3>
                <p className="text-foreground/80 text-sm">
                  Use of CineKU is limited to personal, non-commercial viewing of metadata and information. Republishing, scraping, or bulk extraction of IMDb data through CineKU is prohibited.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What CineKU Is */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">What CineKU Actually Is</h2>
          <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-600/5 p-6 backdrop-blur-md">
            <div className="space-y-3">
              <p className="text-foreground/80">
                CineKU is a <span className="font-semibold text-foreground">entertainment discovery platform</span> that helps users explore movies, TV shows, and anime. We provide:
              </p>
              <ul className="space-y-2 list-inside list-disc text-foreground/80">
                <li>A clean, modern interface for browsing entertainment metadata</li>
                <li>Search and discovery tools powered by IMDb data</li>
                <li>Easy access to information about entertainment properties</li>
                <li>No video hosting, streaming, or content distribution</li>
              </ul>
              <p className="text-foreground/80 pt-2">
                Think of CineKU as a gateway to IMDb information with a modern user interface. We are not a competitor to IMDb; we are a tool that helps users discover and learn about entertainment using IMDb's database.
              </p>
            </div>
          </div>
        </div>

        {/* Liability Disclaimer */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Limitation of Liability</h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md">
            <p className="text-foreground/80 text-sm">
              CineKU provides this service "as is" without any warranties or guarantees. We are not responsible for the accuracy, completeness, or reliability of IMDb data. While we strive to display information correctly, errors may occur. Users should verify critical information directly with original sources before relying on it for important decisions.
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
              <span className="text-white/10">•</span>
              <Link
                href="/about/dmca"
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                DMCA Policy
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
