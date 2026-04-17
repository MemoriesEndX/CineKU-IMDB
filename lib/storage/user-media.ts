/**
 * Unified localStorage system for managing user's watchlist and favorites
 * Works with movies, TV shows, and anime
 * 
 * Storage structure:
 * {email}_cineku_media = { watchlist: {...}, favorites: {...} }
 * 
 * Each section has: { movies: [], tv: [], anime: [] }
 */

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  posterPath?: string;
  poster_path?: string;
  rating?: number;
  vote_average?: number;
  year?: number;
  overview?: string;
  releaseDate?: string;
  release_date?: string;
  mediaType: 'movie' | 'tv' | 'anime';
}

export interface UserMediaData {
  watchlist: {
    movies: MediaItem[];
    tv: MediaItem[];
    anime: MediaItem[];
  };
  favorites: {
    movies: MediaItem[];
    tv: MediaItem[];
    anime: MediaItem[];
  };
}

/**
 * Get the storage key for a user
 */
function getStorageKey(email: string | undefined): string {
  if (!email) return '';
  return `${email}_cineku_media`;
}

/**
 * Initialize default media data structure
 */
function createDefaultMediaData(): UserMediaData {
  return {
    watchlist: { movies: [], tv: [], anime: [] },
    favorites: { movies: [], tv: [], anime: [] },
  };
}

/**
 * Get all user's saved media data from localStorage
 */
export function getUserMediaData(email: string | undefined): UserMediaData {
  if (!email) return createDefaultMediaData();

  const key = getStorageKey(email);
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return createDefaultMediaData();

    const parsed = JSON.parse(stored);
    
    // Ensure structure is complete
    return {
      watchlist: {
        movies: parsed.watchlist?.movies || [],
        tv: parsed.watchlist?.tv || [],
        anime: parsed.watchlist?.anime || [],
      },
      favorites: {
        movies: parsed.favorites?.movies || [],
        tv: parsed.favorites?.tv || [],
        anime: parsed.favorites?.anime || [],
      },
    };
  } catch (error) {
    console.error('Failed to parse user media data:', error);
    return createDefaultMediaData();
  }
}

/**
 * Save user's media data to localStorage
 */
function saveUserMediaData(email: string | undefined, data: UserMediaData): void {
  if (!email) return;

  const key = getStorageKey(email);
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user media data:', error);
  }
}

/**
 * Normalize a media item for storage
 */
function normalizeMediaItem(item: MediaItem): MediaItem {
  return {
    id: item.id,
    title: item.title || item.name,
    name: item.name || item.title,
    posterPath: item.posterPath || item.poster_path,
    poster_path: item.poster_path || item.posterPath,
    rating: item.rating ?? item.vote_average,
    vote_average: item.vote_average ?? item.rating,
    year: item.year,
    overview: item.overview,
    releaseDate: item.releaseDate || item.release_date,
    release_date: item.release_date || item.releaseDate,
    mediaType: item.mediaType,
  };
}

/**
 * Check if an item is in watchlist
 */
export function isInWatchlist(
  email: string | undefined,
  itemId: number,
  mediaType: 'movie' | 'tv' | 'anime'
): boolean {
  const data = getUserMediaData(email);
  const list = data.watchlist[mediaType as keyof typeof data.watchlist] || [];
  return list.some((item: MediaItem) => item.id === itemId);
}

/**
 * Check if an item is in favorites
 */
export function isInFavorites(
  email: string | undefined,
  itemId: number,
  mediaType: 'movie' | 'tv' | 'anime'
): boolean {
  const data = getUserMediaData(email);
  const list = data.favorites[mediaType as keyof typeof data.favorites] || [];
  return list.some((item: MediaItem) => item.id === itemId);
}

/**
 * Add item to watchlist (or remove if already present)
 * Returns the updated list and whether it was added or removed
 */
export function toggleWatchlistItem(
  email: string | undefined,
  item: MediaItem
): { added: boolean; list: MediaItem[] } {
  if (!email || !item.mediaType) {
    return { added: false, list: [] };
  }

  const data = getUserMediaData(email);
  const mediaType = item.mediaType;
  const list = data.watchlist[mediaType as keyof typeof data.watchlist] || [];

  const existingIndex = list.findIndex((i: MediaItem) => i.id === item.id);

  if (existingIndex >= 0) {
    // Remove from watchlist
    list.splice(existingIndex, 1);
    data.watchlist[mediaType as keyof typeof data.watchlist] = list;
    saveUserMediaData(email, data);
    return { added: false, list };
  } else {
    // Add to watchlist
    const normalizedItem = normalizeMediaItem(item);
    list.push(normalizedItem);
    data.watchlist[mediaType as keyof typeof data.watchlist] = list;
    saveUserMediaData(email, data);
    return { added: true, list };
  }
}

/**
 * Add item to favorites (or remove if already present)
 * Returns the updated list and whether it was added or removed
 */
export function toggleFavoritesItem(
  email: string | undefined,
  item: MediaItem
): { added: boolean; list: MediaItem[] } {
  if (!email || !item.mediaType) {
    return { added: false, list: [] };
  }

  const data = getUserMediaData(email);
  const mediaType = item.mediaType;
  const list = data.favorites[mediaType as keyof typeof data.favorites] || [];

  const existingIndex = list.findIndex((i: MediaItem) => i.id === item.id);

  if (existingIndex >= 0) {
    // Remove from favorites
    list.splice(existingIndex, 1);
    data.favorites[mediaType as keyof typeof data.favorites] = list;
    saveUserMediaData(email, data);
    return { added: false, list };
  } else {
    // Add to favorites
    const normalizedItem = normalizeMediaItem(item);
    list.push(normalizedItem);
    data.favorites[mediaType as keyof typeof data.favorites] = list;
    saveUserMediaData(email, data);
    return { added: true, list };
  }
}

/**
 * Get watchlist items for a specific media type
 */
export function getWatchlistItems(
  email: string | undefined,
  mediaType: 'movie' | 'tv' | 'anime'
): MediaItem[] {
  const data = getUserMediaData(email);
  return data.watchlist[mediaType as keyof typeof data.watchlist] || [];
}

/**
 * Get favorites items for a specific media type
 */
export function getFavoritesItems(
  email: string | undefined,
  mediaType: 'movie' | 'tv' | 'anime'
): MediaItem[] {
  const data = getUserMediaData(email);
  return data.favorites[mediaType as keyof typeof data.favorites] || [];
}

/**
 * Get all watchlist items across all media types
 */
export function getAllWatchlistItems(email: string | undefined): MediaItem[] {
  const data = getUserMediaData(email);
  return [
    ...data.watchlist.movies,
    ...data.watchlist.tv,
    ...data.watchlist.anime,
  ];
}

/**
 * Get all favorites items across all media types
 */
export function getAllFavoritesItems(email: string | undefined): MediaItem[] {
  const data = getUserMediaData(email);
  return [
    ...data.favorites.movies,
    ...data.favorites.tv,
    ...data.favorites.anime,
  ];
}

/**
 * Get watchlist count for a specific media type
 */
export function getWatchlistCount(
  email: string | undefined,
  mediaType?: 'movie' | 'tv' | 'anime'
): number {
  const data = getUserMediaData(email);
  if (mediaType) {
    return (data.watchlist[mediaType as keyof typeof data.watchlist] || []).length;
  }
  return (
    data.watchlist.movies.length +
    data.watchlist.tv.length +
    data.watchlist.anime.length
  );
}

/**
 * Get favorites count for a specific media type
 */
export function getFavoritesCount(
  email: string | undefined,
  mediaType?: 'movie' | 'tv' | 'anime'
): number {
  const data = getUserMediaData(email);
  if (mediaType) {
    return (data.favorites[mediaType as keyof typeof data.favorites] || []).length;
  }
  return (
    data.favorites.movies.length +
    data.favorites.tv.length +
    data.favorites.anime.length
  );
}

/**
 * Clear all user data (use with caution)
 */
export function clearAllUserData(email: string | undefined): void {
  if (!email) return;
  const key = getStorageKey(email);
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
}
