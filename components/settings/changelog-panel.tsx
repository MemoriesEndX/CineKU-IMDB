import { SectionCard } from "./section-card";

export function ChangelogPanel() {
  return (
    <div className="space-y-4">
      {[
        {
          version: "v2.0.0",
          notes:
            "Major UI overhaul with modern glassmorphism design, redesigned sidebar layout, improved navigation experience, new About & Legal pages (Terms, Privacy, DMCA, Disclaimer), user dropdown enhancements, and overall performance and UX improvements.",
        },
        {
          version: "v1.5.0",
          notes:
            "Added anime section, improved TV show UI with filters, introduced watchlist/library system, and multiple UI refinements for content browsing.",
        },
        {
          version: "v1.2.0",
          notes:
            "Enhanced responsiveness, script updates, UI tweaks, and general improvements after development iterations and testing.",
        },
        {
          version: "v1.0.0",
          notes:
            "Initial release with core features including movie browsing, TV shows, basic UI layout, and integration with external movie database APIs.",
        },
      ].map((item) => (
        <SectionCard key={item.version}>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {item.version}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            {item.notes}
          </p>
        </SectionCard>
      ))}
    </div>
  );
}
