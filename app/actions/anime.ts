"use server";

// Genre mappings for TMDB
const ANIME_GENRE_IDS: Record<string, number> = {
  All: 16, // Animation (anime) - primary filter
  Action: 28,
  Adventure: 12,
  Comedy: 35,
  Fantasy: 14,
  "Sci-Fi": 878,
};

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

export async function getAnimesByGenreAndPage(
  genre: string = "All",
  page: number = 1
): Promise<AnimeResponse> {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  // Always filter by anime genre (16) for consistent results
  // Genre parameter is kept for future enhancement (client-side filtering or API updates)
  const url = `https://api.themoviedb.org/3/discover/tv?with_genres=16&sort_by=popularity.desc&page=${page}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data.status_message || res.status);
      throw new Error(`Failed to fetch anime: ${data.status_message || res.status}`);
    }

    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1,
      totalResults: data.total_results || 0,
    };
  } catch (error) {
    console.error("Anime fetch error:", error instanceof Error ? error.message : error);
    throw error;
  }
}
