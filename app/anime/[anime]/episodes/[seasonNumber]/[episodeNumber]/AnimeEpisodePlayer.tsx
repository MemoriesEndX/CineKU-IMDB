"use client";
import { getTvShowPlayers } from "@/utils/players";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface AnimeEpisodePlayerProps {
  anime: {
    id: number;
    name: string;
    poster_path: string | null;
  };
  episode: {
    name: string;
    still_path?: string | null;
    season_number: number;
    episode_number: number;
  };
}

export default function AnimeEpisodePlayer({
  anime,
  episode,
}: AnimeEpisodePlayerProps) {
  // Reuse TV show players function for anime episodes
  // Anime episodes are stored in TMDB with the same TV show structure
  const players = getTvShowPlayers(
    anime.id,
    episode.season_number,
    episode.episode_number
  );

  const [selectedSource, setSelectedSource] = useState<string>(
    players?.[0]?.title || ""
  );
  const [playEpisode, setPlayEpisode] = useState<boolean>(false);

  useEffect(() => {
    console.log("Selected anime player source:", selectedSource);
  }, [selectedSource]);

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedSource(e.target.value);
  };

  const handlePlayClick = (): void => {
    setPlayEpisode(true);
  };

  return (
    <section id="anime-episode-player" className="w-full">
      {playEpisode ? (
        <div className="space-y-4 w-full">
          {players.map(
            ({ title, source }) =>
              selectedSource === title && (
                <div key={title} className="w-full">
                  <div className="relative w-full aspect-video bg-[var(--card)]/50 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={source}
                      allowFullScreen
                      title={`${anime.name} - ${episode.name}`}
                    />
                  </div>
                </div>
              )
          )}
          {players.length > 1 && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="source-select"
                className="text-sm font-medium text-[var(--foreground)]"
              >
                Select Player Source
              </label>
              <select
                id="source-select"
                value={selectedSource}
                onChange={handleSourceChange}
                className="w-full px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {players.map(({ title }) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ) : (
        <div
          className="group relative w-full aspect-video bg-[var(--card)] rounded-lg overflow-hidden cursor-pointer"
          onClick={handlePlayClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handlePlayClick();
            }
          }}
        >
          <Image
            alt={episode.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={
              episode.still_path
                ? `https://image.tmdb.org/t/p/w780${episode.still_path}`
                : anime.poster_path
                ? `https://image.tmdb.org/t/p/w780${anime.poster_path}`
                : "/placeholder.jpg"
            }
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-[var(--card)]/40 group-hover:bg-[var(--card)]/50 transition-colors" />
          <button
            type="button"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 scale-125 group-hover:scale-150 transition-transform duration-300 w-24 h-24 flex items-center justify-center rounded-full bg-[var(--primary)]/80 hover:bg-[var(--primary)] text-[var(--primary-foreground)]"
            onClick={handlePlayClick}
          >
            <Play className="h-10 w-10 fill-current" />
          </button>
        </div>
      )}
    </section>
  );
}
