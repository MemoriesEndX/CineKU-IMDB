export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-t-[var(--primary)] border-r-[var(--accent)] border-b-[var(--secondary)] border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-[var(--primary)] border-b-[var(--accent)] border-l-[var(--secondary)] animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-4 border-t-[var(--secondary)] border-r-transparent border-b-[var(--primary)] border-l-[var(--accent)] animate-spin animation-delay-300"></div>
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] inline-block">
          Loading Anime...
        </h2>
      </div>
    </div>
  );
}
