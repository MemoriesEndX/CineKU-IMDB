"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play, Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  isInWatchlist,
  toggleWatchlistItem,
  isInFavorites,
  toggleFavoritesItem,
} from "@/lib/storage/user-media";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number | null | undefined;
  year: number;
  overview?: string;
  genres?: string[];
  className?: string;
}

export function MovieCard({
  id,
  title,
  posterPath,
  rating,
  year,
  overview,
  genres = [],
  className,
}: MovieCardProps) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setIsBookmarked(isInWatchlist(session.user.email, id, "movie"));
      setIsFavorited(isInFavorites(session.user.email, id, "movie"));
    }
  }, [session?.user?.email, id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session?.user?.email) return;

    const { added } = toggleWatchlistItem(session.user.email, {
      id,
      title,
      posterPath,
      rating,
      year,
      overview,
      mediaType: "movie",
    });

    setIsBookmarked(added);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session?.user?.email) return;

    const { added } = toggleFavoritesItem(session.user.email, {
      id,
      title,
      posterPath,
      rating,
      year,
      overview,
      mediaType: "movie",
    });

    setIsFavorited(added);
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/movie/${id}`}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg bg-black/40 shadow-lg",
          className
        )}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex justify-between items-start gap-2">
              <Badge variant="secondary" className="w-fit">
                Movie
              </Badge>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={handleFavorite}
                  title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorited ? "fill-red-500 text-red-500" : "text-white"
                    )}
                  />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={handleBookmark}
                  title={isBookmarked ? "Remove from watchlist" : "Add to watchlist"}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      isBookmarked ? "fill-primary text-primary" : "text-white"
                    )}
                  />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white line-clamp-1">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>{year}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="mr-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {typeof rating === "number" && rating >= 0
                    ? rating.toFixed(1)
                    : "N/A"}
                </div>
              </div>
              {overview && (
                <p className="line-clamp-2 text-sm text-white/70">{overview}</p>
              )}
              <Button className="w-full gap-2" size="sm">
                <Play className="h-4 w-4" />
                Play Now
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
