"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { MediaItem } from "@/lib/storage/user-media";
import { Film, Tv, Sparkles } from "lucide-react";

interface MediaItemCardProps {
  item: MediaItem;
  onRemove?: (itemId: number, mediaType: string) => void;
}

const getMediaTypeIcon = (type: string): React.ReactNode => {
  switch (type) {
    case "movie":
      return <Film className="h-4 w-4" />;
    case "tv":
      return <Tv className="h-4 w-4" />;
    case "anime":
      return <Sparkles className="h-4 w-4" />;
    default:
      return <Film className="h-4 w-4" />;
  }
};

const getMediaTypeLabel = (type: string): string => {
  switch (type) {
    case "movie":
      return "Movie";
    case "tv":
      return "TV Show";
    case "anime":
      return "Anime";
    default:
      return "Media";
  }
};

export const MediaItemCard: React.FC<MediaItemCardProps> = ({
  item,
  onRemove,
}) => {
  const title = item.title || item.name || "Unknown Title";
  const posterPath = item.posterPath || item.poster_path;
  const rating = item.rating || item.vote_average;
  const year = item.year;
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/placeholder.svg?height=300&width=200";

  return (
    <Card className="overflow-hidden border-[var(--border)] hover:shadow-lg transition-all duration-300 bg-[var(--card)] group cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden bg-[var(--card)]/50">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = "/placeholder.svg?height=300&width=200";
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-[var(--background)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Type Badge - Top Left */}
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 bg-[var(--primary)]/90 text-[var(--primary-foreground)] border-none flex items-center gap-1"
        >
          {getMediaTypeIcon(item.mediaType)}
          <span className="text-xs font-semibold">
            {getMediaTypeLabel(item.mediaType)}
          </span>
        </Badge>

        {/* Rating Badge - Top Right */}
        {rating !== undefined && (
          <Badge
            variant="outline"
            className="absolute top-2 right-2 bg-[var(--card)]/90 border-[var(--border)] text-[var(--foreground)]"
          >
            <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
          </Badge>
        )}
      </div>

      {/* Info Section */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm text-[var(--foreground)] line-clamp-2 hover:text-[var(--primary)] transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          {year && <span>{year}</span>}
          {!year && <span>&nbsp;</span>}
        </div>
      </div>
    </Card>
  );
};
