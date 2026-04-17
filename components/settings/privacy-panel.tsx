import { SectionCard } from "./section-card";

export function PrivacyPanel() {
  const faqs = [
    {
      question: "🎬 What is CineKU?",
      answer:
        "CineKU is a movie and TV discovery platform powered by the IMDb API. It helps users explore films, series, and anime with rich metadata such as ratings, release dates, and descriptions.",
    },
    {
      question: "❓ What do we actually do?",
      answer:
        "We provide an interface to browse and discover movies and TV shows. CineKU does not host or store any video content — we only display publicly available information from external APIs.",
    },
    {
      question: "📊 Where does the data come from?",
      answer:
        "All movie, TV show, and anime data displayed on CineKU is sourced from the IMDb database via third-party APIs.",
    },
    {
      question: "⚠️ Can I watch or download movies here?",
      answer:
        "No. CineKU does not provide streaming or downloading services. We are strictly an information and discovery platform.",
    },
    {
      question: "🔒 Is CineKU safe to use?",
      answer:
        "Yes. CineKU does not host harmful content or require sensitive user data. It simply fetches and displays data from trusted external sources.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/[0.03] p-5 border border-white/5">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          About CineKU
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          CineKU is a modern movie discovery platform designed to help users explore
          films, TV shows, and anime in a clean and user-friendly interface.
          Our goal is to provide a fast and enjoyable way to browse entertainment
          content without unnecessary clutter.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
          >
            <summary className="cursor-pointer list-none text-sm text-[var(--foreground)] flex justify-between items-center">
              {item.question}
              <span className="transition group-open:rotate-90">›</span>
            </summary>
            <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      {/* DISCLAIMER */}
      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
        <p className="text-xs text-yellow-300 leading-relaxed">
          ⚠️ Disclaimer: All content, including movie titles, images, ratings,
          and descriptions displayed on this website is 100% sourced from the
          IMDb database via third-party APIs. CineKU does not own, host, or modify
          any of this data. All rights belong to their respective owners.
        </p>
      </div>
    </div>
  );
}
