import { getAnimeDetails, getTVEpisodeDetails } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const AnimeEpisodePlayer = dynamic(
  () => import("@/app/anime/[anime]/episodes/[seasonNumber]/[episodeNumber]/AnimeEpisodePlayer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-video bg-[var(--card)]/50 rounded-lg animate-pulse" />
    ),
  }
);

export default async function AnimeEpisodePage({
  params,
}: {
  params: {
    anime: string;
    seasonNumber: string;
    episodeNumber: string;
  };
}) {
  const anime = await getAnimeDetails(params.anime);
  if (!anime) {
    return notFound();
  }

  const episodeNum = Number.parseInt(params.episodeNumber, 10);
  const seasonNum = Number.parseInt(params.seasonNumber, 10);
  const animeId = Number.parseInt(params.anime, 10);

  if (Number.isNaN(episodeNum) || Number.isNaN(seasonNum) || Number.isNaN(animeId)) {
    return notFound();
  }

  const episode = await getTVEpisodeDetails(animeId, seasonNum, episodeNum);

  if (!episode) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[var(--background)] to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href={`/anime/${params.anime}/episodes/${params.seasonNumber}`}
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Season {params.seasonNumber}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                {episode.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-[var(--card)] text-[var(--foreground)] font-medium">
                  S{params.seasonNumber} E{params.episodeNumber}
                </Badge>
                {episode.runtime && (
                  <Badge
                    variant="outline"
                    className="border-[var(--border)] bg-[var(--card)]/50 flex items-center gap-1"
                  >
                    <Clock className="h-4 w-4" />
                    <span>{episode.runtime} min</span>
                  </Badge>
                )}
                {episode.air_date && (
                  <Badge
                    variant="outline"
                    className="border-[var(--border)] bg-[var(--card)]/50 flex items-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{episode.air_date}</span>
                  </Badge>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--primary)] mb-2">
                {anime.name}
              </h2>
            </div>

            {episode.overview && (
              <Card className="bg-[var(--card)] p-4 border border-[var(--border)]">
                <p className="text-[var(--foreground)]">{episode.overview}</p>
              </Card>
            )}
          </div>

          <Card className="bg-[var(--card)] border border-[var(--border)]">
            <AnimeEpisodePlayer anime={anime} episode={episode} />
          </Card>

          <div className="flex justify-between items-center py-6 gap-4">
            {Number.parseInt(params.episodeNumber) > 1 && (
              <Link
                href={`/anime/${params.anime}/episodes/${params.seasonNumber}/${
                  Number.parseInt(params.episodeNumber) - 1
                }`}
              >
                <Button
                  variant="outline"
                  className="border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--card)]/80"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Episode
                </Button>
              </Link>
            )}
            <Link
              href={`/anime/${params.anime}/episodes/${params.seasonNumber}/${
                Number.parseInt(params.episodeNumber) + 1
              }`}
              className="ml-auto"
            >
              <Button
                variant="outline"
                className="border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--card)]/80"
              >
                Next Episode
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
