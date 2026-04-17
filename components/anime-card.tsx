"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isInWatchlist,
  toggleWatchlistItem,
  isInFavorites,
  toggleFavoritesItem,
} from "@/lib/storage/user-media";

interface AnimeCardProps {
  anime: {
    id: number;
    name: string;
    poster_path: string | null;
    vote_average?: number;
    first_air_date?: string;
    overview?: string;
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const year = anime.first_air_date
    ? new Date(anime.first_air_date).getFullYear()
    : null;

  const rating = anime.vote_average
    ? Math.round((anime.vote_average / 2) * 10) / 10
    : null;

  useEffect(() => {
    if (session?.user?.email) {
      setIsBookmarked(isInWatchlist(session.user.email, anime.id, "anime"));
      setIsFavorited(isInFavorites(session.user.email, anime.id, "anime"));
    }
  }, [session?.user?.email, anime.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.email) return;

    const { added } = toggleWatchlistItem(session.user.email, {
      id: anime.id,
      name: anime.name,
      poster_path: anime.poster_path,
      vote_average: anime.vote_average,
      first_air_date: anime.first_air_date,
      overview: anime.overview,
      mediaType: "anime",
    });

    setIsBookmarked(added);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.email) return;

    const { added } = toggleFavoritesItem(session.user.email, {
      id: anime.id,
      name: anime.name,
      poster_path: anime.poster_path,
      vote_average: anime.vote_average,
      first_air_date: anime.first_air_date,
      overview: anime.overview,
      mediaType: "anime",
    });

    setIsFavorited(added);
  };

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="block transform transition-all duration-300 hover:scale-105 h-full"
    >
      <div className="relative group rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,0,130,0.3)] hover:shadow-[0_0_25px_rgba(255,0,130,0.7)] h-full flex flex-col bg-[var(--card)]/60 backdrop-blur-sm">
        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 right-2 z-30 bg-[var(--background)]/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[var(--foreground)]">{rating}</span>
          </div>
        )}

        {/* Bookmark and Favorite Buttons on Hover */}
        <div className="absolute top-2 left-2 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        <div className="relative aspect-[2/3] overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-pink-500 rounded-t-lg z-20"></div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--primary)]/90 z-10"></div>

          <Image
            src={
              anime.poster_path
                ? `https://image.tmdb.org/t/p/w500${anime.poster_path}`
                : "/placeholder.jpg"
            }
            alt={anime.name}
            width={300}
            height={450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {year && (
            <div className="absolute bottom-3 left-3 z-20 bg-[var(--primary)] backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-[var(--primary-foreground)]">
              {year}
            </div>
          )}
        </div>

        <div className="p-3 flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="font-bold text-[var(--foreground)] leading-tight line-clamp-2">
              {anime.name}
            </h3>
            <div className="h-0.5 w-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mt-1 group-hover:w-full transition-all duration-300"></div>
          </div>

          {anime.overview && (
            <p className="text-xs text-[var(--muted-foreground)] line-clamp-3 mb-2 flex-grow">
              {anime.overview}
            </p>
          )}

          <div className="flex justify-between items-center mt-auto">
            <div className="flex gap-1 flex-wrap">
              <span className="inline-block px-1.5 py-0.5 bg-[var(--primary)]/20 border border-[var(--primary)]/40 rounded-sm text-[10px] text-[var(--primary)]">
                Anime
              </span>
              <span className="inline-block px-1.5 py-0.5 bg-[var(--accent)]/20 border border-[var(--accent)]/40 rounded-sm text-[10px] text-[var(--accent)]">
                TV
              </span>
            </div>

            <div className="group-hover:translate-x-0 translate-x-2 transition-transform duration-300 opacity-0 group-hover:opacity-100">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-[var(--primary-foreground)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
          <div className="absolute transform rotate-45 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] text-xs font-bold py-1 left-[-35px] top-[9px] w-[100px] text-center">
            NEW
          </div>
        </div>
      </div>
    </Link>
  );
}
