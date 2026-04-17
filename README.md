# 🎬 MoviKu

MoviKu is a modern movie web application that uses the **TMDB API** to fetch **movie metadata**, while actual video playback is handled through **third-party streaming providers via iframe embeds**.

> ⚠️ MoviKu does **NOT** stream movies directly from TMDB.
> TMDB is used strictly for **metadata and trailers only**.

---

## 🚀 Overview

MoviKu separates **content data (metadata)** from **video playback**, creating a clean and scalable architecture.

### ✅ Metadata (from TMDB)

* Movie lists (Trending, Top Rated, Upcoming)
* Movie details
* Cast / credits
* Reviews
* Trailers / videos
* Watch providers

### 🎥 Video Playback

* Delivered via **third-party iframe providers**
* Multiple sources available per movie
* YouTube embeds used for trailers

---

## 🧱 Project Architecture

MoviKu is designed to be split into **two independent systems**:

---

### 1. 🎞️ MoviKu TMDB (Metadata Website)

Focus:

* Movie browsing
* Search & discovery
* Movie details
* Cast / credits
* Reviews
* Trailers (YouTube)
* Watch providers

Data Source:

* **TMDB API**

Authentication:

```ts
Authorization: Bearer ${process.env.TMDB_ACCESS_TOKEN}
```

---

### 2. ▶️ MoviKu Player (Streaming Website)

Focus:

* Video playback pages
* Multi-source streaming
* Iframe-based players

Key Notes:

* ❌ Does NOT use TMDB for streaming
* ✅ Uses **external embed providers**
* 🎯 Fully separated from metadata logic

---

## 🎥 Video Source Architecture

### 1. TMDB Videos (Metadata Only)

Used for:

* trailers
* clips
* video previews

Rendered via:

* YouTube embeds

---

### 2. Main Movie Player

The main player uses:

```tsx
<iframe src={source} />
```

Source generated from:

```ts
getMoviePlayers()
getTvShowPlayers()
```

---

### 🌐 Third-Party Providers Used

MoviKu supports multiple streaming sources:

* VidLink
* VidSrc (xyz / to)
* Embed.su
* MultiEmbed
* 2Embed
* AutoEmbed
* SuperEmbed
* MoviesAPI
* NontonGo
* FilmKu

Example URL format:

```
https://vidsrc.xyz/embed/movie/{TMDB_ID}
https://vidlink.pro/movie/{TMDB_ID}
```

For TV:

```
https://vidsrc.xyz/embed/tv/{ID}/{SEASON}/{EPISODE}
```

---

## ⚠️ Important Notes About Video Playback

* MoviKu **does NOT host video files**
* All streaming is handled by **external providers**
* Playback reliability depends on third-party services
* Some sources may:

  * contain ads
  * be unstable
  * temporarily unavailable

---

## 🔐 Authentication

### TMDB API

Uses:

```env
TMDB_ACCESS_TOKEN=YOUR_TMDB_READ_ACCESS_TOKEN
```

---

### Internal Auth

* NextAuth
* Google OAuth
* Session-based authentication

Used for:

* user session
* watchlist
* protected routes

---

## 📄 Page Flow

### 🏠 Home Page

* Fetches:

  * Trending
  * Top Rated
  * Upcoming
* Source: TMDB

---

### 🎬 Movie Page (`/movie/{id}`)

Fetches:

* details
* credits
* reviews
* videos
* providers

Displays:

* movie info
* trailers (YouTube)
* streaming player (iframe)

---

### ▶️ Player Flow

```text
User selects movie
↓
MoviePlayer.tsx
↓
getMoviePlayers()
↓
List of external providers
↓
iframe renders selected source
↓
External site streams video
```

---

## 📁 Key Files

### Metadata / TMDB

* `app/page.tsx`
* `app/movie/[id]/page.tsx`
* `components/movie-details.tsx`

### Player System

* `app/movie/[id]/MoviePlayer.tsx`
* `utils/players.ts`

### Auth

* `app/api/auth/[...nextauth]/route.ts`

### Environment

* `.env.local`

---

## 🌱 Environment Variables

```env
TMDB_ACCESS_TOKEN=YOUR_TMDB_READ_ACCESS_TOKEN
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
NEXTAUTH_URL=http://localhost:3000
```

---

## 🧪 Code Audit Summary

| Category           | Source                    | Status     |
| ------------------ | ------------------------- | ---------- |
| Metadata           | TMDB API                  | ✅ Active   |
| Trailers           | TMDB + YouTube            | ✅ Active   |
| Streaming          | External iframe providers | ✅ Active   |
| Local video server | Express                   | ❌ Not used |
| Local files        | videos/ folder            | ❌ Not used |

---

## 🧠 Final Conclusion

* ✅ Metadata comes from **TMDB**
* ✅ Trailers come from **TMDB (YouTube embeds)**
* ✅ Main video playback uses **third-party iframe providers**
* ❌ No local streaming
* ❌ No TMDB full-movie streaming

---

## 🧭 Future Roadmap

Recommended improvements:

* ✅ Split into **2 independent apps**
* ✅ Add fallback system between providers
* ⚠️ Improve player stability
* ⚠️ Handle provider failures gracefully
* 🔐 Ensure API keys remain secure

---

## 📌 Disclaimer

MoviKu does **not host any video content**.

All video streams are embedded from third-party providers.
MoviKu only provides a **user interface and metadata powered by TMDB**.

