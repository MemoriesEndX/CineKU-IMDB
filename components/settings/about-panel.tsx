import { SectionCard } from "./section-card";

export function AboutPanel() {
  return (
    <div className="space-y-4">
      <SectionCard title="About">
        
        {/* APP INFO */}
        <div className="rounded-2xl bg-white/[0.02] p-4">
          <p className="text-xl font-semibold text-[var(--foreground)]">CineKU</p>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">Version 2.0.0</p>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 rounded-2xl bg-white/[0.02] p-4 text-sm leading-6 text-[var(--muted-foreground)]">
          CineKU is a modern entertainment discovery platform designed to help users explore 
          movies, TV shows, and anime through a clean and intuitive interface. 
          It focuses on fast navigation, a glassmorphism-based UI, and a smooth user experience 
          for browsing content.
        </div>

        {/* FEATURES / STATS */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/[0.04] px-6 py-5 text-center">
            <div className="text-4xl font-semibold tracking-tight text-[var(--foreground)]">
              30+
            </div>
            <div className="mt-1 text-sm text-[var(--muted-foreground)]">
              UI Components
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] px-6 py-5 text-center">
            <div className="text-4xl font-semibold tracking-tight text-[var(--foreground)]">
              ∞
            </div>
            <div className="mt-1 text-sm text-[var(--muted-foreground)]">
              Discoverable Content
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm leading-6 text-yellow-300">
          <p className="font-medium text-yellow-200 mb-2">
            ⚠️ Disclaimer
          </p>

          <p>
            All content, including movie titles, ratings, posters, images, descriptions, 
            and related media displayed on CineKU are sourced from publicly available 
            third-party APIs based on the IMDb database.
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Movie and TV show information</li>
            <li>Ratings and reviews</li>
            <li>Poster and media imagery</li>
            <li>Cast and crew details</li>
            <li>Plot summaries and descriptions</li>
          </ul>

          <p className="mt-3">
            CineKU does not own, host, or store any video content. This platform is 
            intended solely for content discovery and informational purposes. 
            All rights belong to their respective owners.
          </p>
        </div>

      </SectionCard>
    </div>
  );
}
