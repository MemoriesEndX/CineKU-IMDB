export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[var(--background)] to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="h-10 w-32 bg-[var(--card)]/50 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <div>
              <div className="h-8 w-64 bg-[var(--card)]/50 rounded animate-pulse mb-2" />
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 w-24 bg-[var(--card)]/50 rounded animate-pulse" />
                <div className="h-6 w-28 bg-[var(--card)]/50 rounded animate-pulse" />
                <div className="h-6 w-32 bg-[var(--card)]/50 rounded animate-pulse" />
              </div>
              <div className="h-6 w-48 bg-[var(--card)]/50 rounded animate-pulse mb-2" />
            </div>

            <div className="bg-[var(--card)] p-4 border border-[var(--border)] rounded-lg h-24 animate-pulse" />
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg aspect-video animate-pulse" />

          <div className="flex justify-between items-center py-6 gap-4">
            <div className="h-10 w-32 bg-[var(--card)]/50 rounded animate-pulse" />
            <div className="h-10 w-32 bg-[var(--card)]/50 rounded animate-pulse ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
