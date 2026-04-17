# Quick Reference: Using the New Storage System

## For Component Developers

### Setup (in your client component)

```typescript
"use client";

import {
  isInWatchlist,
  toggleWatchlistItem,
  isInFavorites,
  toggleFavoritesItem,
  getWatchlistCount,
} from "@/lib/storage/user-media";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
```

### Check if Item is Saved

```typescript
const { data: session } = useSession();
const [isBookmarked, setIsBookmarked] = useState(false);

useEffect(() => {
  if (session?.user?.email) {
    setIsBookmarked(isInWatchlist(session.user.email, itemId, "movie"));
  }
}, [session?.user?.email, itemId]);
```

### Toggle Watchlist on Button Click

```typescript
const handleBookmark = (e: React.MouseEvent) => {
  e.preventDefault();
  
  if (!session?.user?.email) return;
  
  const { added } = toggleWatchlistItem(session.user.email, {
    id: 123,
    title: "Movie Title",
    posterPath: "/path/to/poster.jpg",
    rating: 8.5,
    year: 2024,
    overview: "...",
    mediaType: "movie" // or "tv" or "anime"
  });
  
  setIsBookmarked(added);
};
```

### Get Count for Display

```typescript
const watchlistCount = getWatchlistCount(userEmail);
const favoritesCount = getFavoritesCount(userEmail);
```

---

## Media Types

Use one of these for the `mediaType` field:

- `"movie"` - for movies
- `"tv"` - for TV shows
- `"anime"` - for anime

---

## Field Mapping

The system normalizes field names, so you can use any of these:

| Standard | Alias |
|----------|-------|
| `title` | `name` |
| `posterPath` | `poster_path` |
| `rating` | `vote_average` |
| `year` | - |
| `releaseDate` | `release_date` |
| `overview` | - |
| `mediaType` | ✅ *Required* |

---

## Example: Movie Card

```typescript
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
    id, title, posterPath, rating, year, overview,
    mediaType: "movie"
  });
  
  setIsBookmarked(added);
};

const handleFavorite = (e: React.MouseEvent) => {
  e.preventDefault();
  if (!session?.user?.email) return;
  
  const { added } = toggleFavoritesItem(session.user.email, {
    id, title, posterPath, rating, year, overview,
    mediaType: "movie"
  });
  
  setIsFavorited(added);
};
```

---

## Example: Anime Card

```typescript
const { data: session } = useSession();
const [isBookmarked, setIsBookmarked] = useState(false);

useEffect(() => {
  if (session?.user?.email) {
    setIsBookmarked(isInWatchlist(session.user.email, anime.id, "anime"));
  }
}, [session?.user?.email, anime.id]);

const handleBookmark = (e: React.MouseEvent) => {
  e.preventDefault();
  if (!session?.user?.email) return;
  
  const { added } = toggleWatchlistItem(session.user.email, {
    id: anime.id,
    name: anime.name,
    poster_path: anime.poster_path,
    vote_average: anime.vote_average,
    first_air_date: anime.first_air_date,
    overview: anime.overview,
    mediaType: "anime"
  });
  
  setIsBookmarked(added);
};
```

---

## localStorage Debug Tips

Open browser DevTools Console:

```javascript
// View user's data
const email = "user@example.com";
JSON.parse(localStorage.getItem(`${email}_cineku_media`))

// View only watchlist
JSON.parse(localStorage.getItem(`${email}_cineku_media`)).watchlist

// View only favorites
JSON.parse(localStorage.getItem(`${email}_cineku_media`)).favorites

// Clear all (use with caution!)
localStorage.removeItem(`${email}_cineku_media`)
```

---

## API Reference

All functions are in `lib/storage/user-media.ts`:

### Mutators (change data)
- `toggleWatchlistItem(email, item)` → `{ added: boolean, list: MediaItem[] }`
- `toggleFavoritesItem(email, item)` → `{ added: boolean, list: MediaItem[] }`

### Checkers (read boolean)
- `isInWatchlist(email, itemId, mediaType)` → `boolean`
- `isInFavorites(email, itemId, mediaType)` → `boolean`

### Getters (read lists)
- `getWatchlistItems(email, mediaType)` → `MediaItem[]`
- `getFavoritesItems(email, mediaType)` → `MediaItem[]`
- `getAllWatchlistItems(email)` → `MediaItem[]`
- `getAllFavoritesItems(email)` → `MediaItem[]`

### Counters
- `getWatchlistCount(email, mediaType?)` → `number`
- `getFavoritesCount(email, mediaType?)` → `number`

### Utilities
- `getUserMediaData(email)` → `UserMediaData`
- `clearAllUserData(email)` → `void`

---

## Common Patterns

### Check and Display Icon

```typescript
<Bookmark
  className={isBookmarked ? "fill-primary text-primary" : "text-white"}
/>
```

### Conditional Button Text

```typescript
<button>
  {isBookmarked ? "Remove from Watchlist" : "Add to Watchlist"}
</button>
```

### Real-time Profile Count

```typescript
const [watchlistCount, setWatchlistCount] = useState(0);

useEffect(() => {
  if (userEmail) {
    setWatchlistCount(getWatchlistCount(userEmail));
  }
}, [userEmail]);

// Listen for changes
useEffect(() => {
  const handleStorageChange = () => {
    if (userEmail) {
      setWatchlistCount(getWatchlistCount(userEmail));
    }
  };
  
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, [userEmail]);
```

---

## Important Notes

⚠️ **Scoped by Email**: All data is tied to `session.user.email`. Different users = different storage keys.

⚠️ **Client-Side Only**: This works only on the client. Server components cannot access.

⚠️ **localStorage Limit**: ~5-10MB per domain. Check browser console if hitting limits.

✅ **No API Needed**: Everything is client-side, no server calls required.

✅ **Type-Safe**: Full TypeScript support with `MediaItem` interface.

✅ **Consistent**: Same API works for movies, TV, and anime.
