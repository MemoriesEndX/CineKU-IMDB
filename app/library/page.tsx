"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MovieCard } from "@/components/movie-card";
import { TVShowCard } from "@/components/card-tvshow";
import AnimeCard from "@/components/anime-card";
import { Button } from "@/components/ui/button";
import {
  getAllWatchlistItems,
  type MediaItem,
} from "@/lib/storage/user-media";

export default function LibraryPage() {
  const { data: session, status } = useSession();
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWatchlist = useCallback(() => {
    if (session?.user?.email) {
      const items = getAllWatchlistItems(session.user.email);
      setWatchlist(items);
      setIsLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin");
    }

    if (status === "authenticated" && session?.user?.email) {
      loadWatchlist();

      // Listen for storage changes (when items are added/removed in other tabs or components)
      const handleStorageChange = (e: StorageEvent) => {
        if (session.user?.email) {
          const key = `${session.user.email}_cineku_media`;
          if (e.key === key && e.newValue) {
            loadWatchlist();
          }
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [session, status, loadWatchlist]);

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Library</h1>
        <div className="flex items-center justify-center h-96">
          <p className="text-[var(--muted-foreground)]">
            Loading your watchlist...
          </p>
        </div>
      </div>
    );
  }

  // Group items by media type for organization
  const movies = watchlist.filter((item) => item.mediaType === "movie");
  const tvShows = watchlist.filter((item) => item.mediaType === "tv");
  const animeItems = watchlist.filter((item) => item.mediaType === "anime");

  const renderMediaCard = (item: MediaItem) => {
    const title = item.title || item.name || "Unknown Title";
    const posterPath = item.posterPath || item.poster_path || "";
    const rating = item.rating ?? item.vote_average ?? 0;
    const year = item.year ?? new Date().getFullYear();
    const overview = item.overview || "";

    switch (item.mediaType) {
      case "movie":
        return (
          <MovieCard
            key={`movie-${item.id}`}
            id={item.id}
            title={title}
            posterPath={posterPath}
            rating={rating}
            year={year}
            overview={overview}
          />
        );
      case "tv":
        return (
          <TVShowCard
            key={`tv-${item.id}`}
            id={item.id}
            title={title}
            posterPath={posterPath}
            rating={rating}
            year={year}
            overview={overview}
          />
        );
      case "anime":
        return (
          <AnimeCard
            key={`anime-${item.id}`}
            anime={{
              id: item.id,
              name: title,
              poster_path: posterPath,
              vote_average: rating,
              first_air_date: item.releaseDate || item.release_date,
              overview: overview,
            }}
          />
        );
      default:
        return null;
    }
  };

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Library</h1>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">
            Your watchlist is empty
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            Start adding movies, TV shows, or anime to keep track of what you
            want to watch.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/movies">Discover Movies</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tv">Discover TV Shows</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/anime">Discover Anime</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Library</h1>

      {/* Movies Section */}
      {movies.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">
            Movies ({movies.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((item) => renderMediaCard(item))}
          </div>
        </div>
      )}

      {/* TV Shows Section */}
      {tvShows.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">
            TV Shows ({tvShows.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tvShows.map((item) => renderMediaCard(item))}
          </div>
        </div>
      )}

      {/* Anime Section */}
      {animeItems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">
            Anime ({animeItems.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {animeItems.map((item) => renderMediaCard(item))}
          </div>
        </div>
      )}
    </div>
  );
}
