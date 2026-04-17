import { SectionCard } from "./section-card";

export function VideoPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Playback">
        <div className="space-y-3">
          {["Autoplay next episode", "Remember playback position", "Skip intro automatically"].map((label) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-[var(--foreground)]">{label}</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Quality">
        <div className="grid grid-cols-2 gap-3">
          {["Auto", "1080p", "720p", "480p"].map((quality, i) => (
            <button
              key={quality}
              className={
                i === 0
                  ? "rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-sm text-[var(--foreground)] transition"
                  : "rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4 text-sm text-[var(--muted-foreground)] transition hover:bg-white/[0.05]"
              }
            >
              {quality}
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
