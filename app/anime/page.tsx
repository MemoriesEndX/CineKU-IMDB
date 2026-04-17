"use client";

import { useState, useEffect } from "react";
import { getAnimesByGenreAndPage } from "@/app/actions/anime";
import AnimeCard from "@/components/anime-card";

const GENRES = ["All", "Action", "Adventure", "Comedy", "Fantasy", "Sci-Fi"];
const MAX_PAGES = 10;

interface AnimeResult {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average?: number;
  first_air_date?: string;
  overview?: string;
}

interface AnimeResponse {
  results: Array<{
    id: number;
    name?: string;
    title?: string;
    poster_path?: string | null;
    backdrop_path?: string;
    overview?: string;
    vote_average?: number;
    first_air_date?: string;
  }>;
  totalPages: number;
  currentPage: number;
  totalResults: number;
}

export default function AnimePage() {
  const [genre, setGenre] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [animes, setAnimes] = useState<AnimeResult[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: AnimeResponse = await getAnimesByGenreAndPage(genre, page);
        
        // Transform data to ensure all required fields are present
        const transformedAnimes: AnimeResult[] = data.results
          .filter((item) => item.name || item.title)
          .map((item) => ({
            id: item.id,
            name: item.name || item.title || "Unknown",
            poster_path: item.poster_path || null,
            vote_average: item.vote_average,
            first_air_date: item.first_air_date,
            overview: item.overview,
          }));
        
        setAnimes(transformedAnimes);
        setTotalPages(Math.min(data.totalPages, MAX_PAGES));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(`Failed to load anime: ${errorMessage}`);
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [genre, page]);

  const handleGenreChange = (selectedGenre: string) => {
    // Genre buttons are visual placeholders
    // All anime are fetched regardless of genre selection
    // Full genre filtering would require more complex API integration
    // or client-side filtering based on anime metadata
    setGenre(selectedGenre);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayPages = Array.from({ length: Math.min(totalPages, MAX_PAGES) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div>
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] inline-block">
            Anime
          </h1>
        </div>

        {/* Genre Filter */}
        <div className="flex justify-center mb-8 gap-2 overflow-x-auto pb-2 px-4">
          {GENRES.map((genreOption) => (
            <button
              key={genreOption}
              onClick={() => handleGenreChange(genreOption)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                genre === genreOption
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--card)]/50 text-[var(--muted-foreground)] hover:bg-[var(--card-hover)]/50"
              }`}
            >
              {genreOption}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-lg bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 mb-4">
              <svg
                className="w-10 h-10 text-[var(--destructive)] mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg text-[var(--muted-foreground)]">{error}</p>
          </div>
        )}

        {/* Anime Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
              {animes.length > 0 ? (
                animes.map((anime) => <AnimeCard key={anime.id} anime={anime} />)
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="inline-block p-6 rounded-full bg-[var(--card)]/50 mb-4">
                    <svg
                      className="w-10 h-10 text-[var(--muted-foreground)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl text-[var(--muted-foreground)]">No anime found.</p>
                  <p className="text-[var(--muted-foreground)]/70 mt-2">
                    Try again later or check your connection.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {animes.length > 0 && totalPages > 1 && (
              <div className="mt-12 mb-8 flex justify-center gap-2">
                {page > 1 && (
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    className="px-3 py-2 rounded-lg bg-[var(--card)]/50 text-[var(--muted-foreground)] hover:bg-[var(--card-hover)]/50 transition-colors"
                  >
                    ← Prev
                  </button>
                )}

                <div className="flex gap-1 flex-wrap justify-center">
                  {displayPages.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        page === pageNum
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                          : "bg-[var(--card)]/50 text-[var(--muted-foreground)] hover:bg-[var(--card-hover)]/50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {page < totalPages && (
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className="px-3 py-2 rounded-lg bg-[var(--card)]/50 text-[var(--muted-foreground)] hover:bg-[var(--card-hover)]/50 transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
