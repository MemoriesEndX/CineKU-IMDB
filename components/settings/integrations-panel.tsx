import { SectionCard } from "./section-card";

export function IntegrationsPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {["Discord", "AniList", "MyAnimeList"].map((item) => (
        <SectionCard key={item} title={item}>
          <div className="rounded-2xl bg-white/[0.03] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Connect your {item} account</p>
            <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90">
              Connect
            </button>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
