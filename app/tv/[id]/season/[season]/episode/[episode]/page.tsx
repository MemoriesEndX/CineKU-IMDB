import { getTVShowDetails, getTVEpisodeDetails } from "@/lib/utils";
import EpisodePlayer from "./EpisodePlayer";
import { Card, Chip, Button } from "@nextui-org/react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaCalendar,
} from "react-icons/fa6";

export default async function EpisodePage({
  params,
}: {
  params: { id: string; season: string; episode: string };
}) {
  const tvShow = await getTVShowDetails(params.id);
  const episode = await getTVEpisodeDetails(
    params.id,
    params.season,
    params.episode
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[var(--background)] to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href={`/tv/${params.id}/season/${params.season}`}
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Season {params.season}
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
                <Chip
                  variant="flat"
                  classNames={{
                    base: "bg-[var(--card)]",
                    content: "text-[var(--foreground)] font-medium",
                  }}
                >
                  S{params.season} E{params.episode}
                </Chip>
                {episode.runtime && (
                  <Chip
                    startContent={<FaClock className="text-[var(--muted-foreground)]" />}
                    variant="flat"
                    classNames={{
                      base: "bg-[var(--card)]",
                      content: "text-[var(--foreground)]",
                    }}
                  >
                    {episode.runtime} min
                  </Chip>
                )}
                {episode.air_date && (
                  <Chip
                    startContent={<FaCalendar className="text-[var(--muted-foreground)]" />}
                    variant="flat"
                    classNames={{
                      base: "bg-[var(--card)]",
                      content: "text-[var(--foreground)]",
                    }}
                  >
                    {episode.air_date}
                  </Chip>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--primary)] mb-2">
                {tvShow.name}
              </h2>
            </div>

            {episode.overview && (
              <Card className="bg-[var(--card)] p-4 border border-[var(--border)]">
                <p className="text-[var(--foreground)]">{episode.overview}</p>
              </Card>
            )}
          </div>

          <Card className="bg-[var(--card)] border border-[var(--border)]">
            <EpisodePlayer tvShow={tvShow} episode={episode} />
          </Card>

          <div className="flex justify-between items-center py-6">
            {Number.parseInt(params.episode) > 1 && (
              <Link
                href={`/tv/${params.id}/season/${params.season}/episode/${
                  Number.parseInt(params.episode) - 1
                }`}
              >
                <Button
                  variant="flat"
                  startContent={<FaArrowLeft />}
                  className="bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]"
                >
                  Previous Episode
                </Button>
              </Link>
            )}
            <Link
              href={`/tv/${params.id}/season/${params.season}/episode/${
                Number.parseInt(params.episode) + 1
              }`}
              className="ml-auto"
            >
              <Button
                variant="flat"
                endContent={<FaArrowRight />}
                className="bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]"
              >
                Next Episode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
