import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Link from "next/link";
import { AboutCard, InfoStat } from "@/components/about-card";
import {
  IoInformationCircle,
  IoShieldCheckmark,
  IoDocumentText,
  IoShield,
  IoWarning,
} from "react-icons/io5";

export const metadata: Metadata = {
  title: "About | CineKU",
  description: "Learn about CineKU, a modern entertainment discovery platform powered by IMDb database API.",
};

export default function AboutPage() {
  const legalLinks = [
    {
      title: "Terms & Conditions",
      description: "Our terms of service and usage agreements",
      href: "/about/terms",
      icon: <IoDocumentText />,
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      title: "Privacy Policy",
      description: "How we handle and protect your data",
      href: "/about/privacy",
      icon: <IoShieldCheckmark />,
      color: "from-green-500/20 to-green-600/20",
    },
    {
      title: "Disclaimer",
      description: "IMDb API data sourcing and content policy",
      href: "/about/disclaimer",
      icon: <IoWarning />,
      color: "from-amber-500/20 to-amber-600/20",
    },
    {
      title: "DMCA Policy",
      description: "Copyright and takedown procedures",
      href: "/about/dmca",
      icon: <IoShield />,
      color: "from-red-500/20 to-red-600/20",
    },
  ];

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-4xl space-y-8 px-4 py-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="text-4xl text-primary">
              <IoInformationCircle />
            </div>
            <h1 className="text-4xl font-bold text-foreground">About CineKU</h1>
          </div>
          <p className="text-foreground/60">
            Discover, explore, and learn about entertainment
          </p>
        </div>

        {/* CineKU Intro Card */}
        <AboutCard
          title="CineKU"
          icon={<IoShield />}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
        >
          <div className="space-y-4">
            <p>
              CineKU is a modern entertainment discovery platform designed to help you explore, browse, and discover movies, TV shows, and anime. Built with a clean and intuitive interface, CineKU makes it easy to find the entertainment you love.
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Version 1.0.0 • Powered by IMDb Database API
            </p>
          </div>
        </AboutCard>

        {/* Info Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoStat label="Platform Type" value="Discovery Hub" />
          <InfoStat label="Content Database" value="IMDb API" />
          <InfoStat label="Supported Media" value="Movies, TV, Anime" />
        </div>

        {/* What CineKU Does */}
        <AboutCard
          title="What We Provide"
          icon={<IoDocumentText />}
        >
          <div className="space-y-3">
            <p>
              CineKU leverages the IMDb database API to provide you with:
            </p>
            <ul className="space-y-2 list-inside list-disc text-foreground/80">
              <li>Comprehensive movie, TV show, and anime metadata</li>
              <li>Detailed cast, crew, and ratings information</li>
              <li>Beautiful discovery interface for finding new entertainment</li>
              <li>Easy-to-use search and browsing functionality</li>
              <li>A clean, modern interface for entertainment exploration</li>
            </ul>
          </div>
        </AboutCard>

        {/* IMDb Data Disclaimer */}
        <AboutCard
          title="Data Attribution"
          icon={<IoWarning />}
          className="border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5"
        >
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-amber-400">
              All content on CineKU is 100% sourced from the IMDb database API.
            </p>
            <p>
              CineKU does not claim ownership of any content, metadata, ratings, posters, images, descriptions, or related information displayed on this platform. All data including but not limited to:
            </p>
            <ul className="space-y-1 list-inside list-disc text-foreground/80">
              <li>Movie and TV show information</li>
              <li>Ratings and reviews</li>
              <li>Poster art and media imagery</li>
              <li>Cast and crew details</li>
              <li>Plot summaries and descriptions</li>
            </ul>
            <p>
              are 100% provided through IMDb database API or services based on IMDb data. All rights, including intellectual property rights, belong to their respective owners. CineKU is an entertainment discovery platform only and does not redistribute or store content.
            </p>
          </div>
        </AboutCard>

        {/* Legal & Policies Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Legal & Policies
            </h2>
            <p className="text-foreground/60 text-sm">
              Important legal information and policies governing the use of CineKU
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="group h-full rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/10 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-white/5 p-3 text-xl text-primary group-hover:bg-white/10 transition-all duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {link.title}
                      </h3>
                      <p className="text-xs text-foreground/60 mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-8 text-center text-xs text-foreground/50">
          <p>© 2026 CineKU. All rights reserved.</p>
          <p className="mt-2">
            CineKU is an entertainment discovery platform powered by IMDb database API.
          </p>
        </div>
      </div>
    </div>
  );
}
