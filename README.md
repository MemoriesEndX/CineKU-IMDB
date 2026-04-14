# MoviKu

MoviKu is a movie website project that uses the **TMDB API** to fetch **movie metadata** such as movie lists, movie details, credits, reviews, videos, and watch providers.

This project **does not use TMDB as a full-movie streaming source**.  
Movie data is fetched from **TMDB**, while the video playback on the movie page comes from **third-party streaming providers via iframe**, along with **YouTube embeds** for trailers and videos available from TMDB.

---

## Project Architecture

MoviKu is planned to be separated into **2 different websites**:

### 1. MoviKu TMDB
This website focuses on:
- displaying movie lists
- trending movies
- top rated movies
- upcoming movies
- movie details
- cast / credits
- reviews
- trailers / videos from TMDB
- watch providers

Main data source:
- **TMDB API**

TMDB authentication:
- uses **API Read Access Token**
- through this header:

```ts
Authorization: Bearer ${process.env.TMDB_ACCESS_TOKEN}
````

### 2. MoviKu Player

This website focuses on:

* player pages
* video playback
* iframe-based video sources from third-party providers
* separating metadata from the player system

Notes:

* this website **does not fetch full movies from TMDB**
* TMDB is only used for metadata
* video sources come from third-party embed / iframe providers

---

## Code Audit Result

### Summary

The audit was completed without changing any code.
It was found that this project uses **TMDB for metadata**, while the **main video player does not stream directly from TMDB**.

### Authentication Methods Used

#### 1. TMDB Authentication

The project uses:

```ts
Authorization: Bearer ${process.env.TMDB_ACCESS_TOKEN}
```

This means the project uses:

* **TMDB API Read Access Token**
* **not** `TMDB_API_KEY` as a query parameter

#### 2. Internal Application Authentication

The project also uses internal authentication with:

* **next-auth**
* **Google OAuth**
* server session using `getServerSession()`

This is used for certain features such as protected watchlist endpoints.

---

## Video Sources Used

There are **2 video paths** on the movie page:

### 1. Video metadata from TMDB

The movie detail page fetches additional data such as:

* videos
* credits
* reviews
* watch/providers

Example:

```ts
append_to_response=videos,credits,reviews,"watch/providers"
```

This is used for:

* displaying trailers
* displaying clips/video metadata from TMDB
* displaying watch provider information

### 2. Main video player

The main video playback is rendered through:

```tsx
<iframe src={source} ... />
```

The video source is taken from a list of third-party streaming providers through a function such as `getMoviePlayers()`.

So:

* **TMDB videos** = metadata / trailers
* **YouTube embed** = trailers/videos from TMDB
* **third-party iframe providers** = main movie player

---

## Key Findings

### TMDB is used for:

* trending movies
* top rated movies
* upcoming movies
* movie details
* credits
* reviews
* videos
* watch providers

### The main video player uses:

* iframe sources from third-party providers such as:

  * vidlink
  * embed.su
  * multiembed
  * vidsrc
  * 2embed
  * and other providers listed in the player file

### YouTube is used for:

* trailers / videos from TMDB

### Local files

There is a local file mechanism for certain paths, but it is **not the main movie player path**.

---

## Page Flow

### Home Page

The home page fetches movie data from TMDB using a Bearer token.

Functions:

* trending movies
* top rated movies
* upcoming movies

### Movie Card

When a user clicks a movie card, the user is redirected to:

```txt
/movie/{id}
```

### Movie Detail Page

This page fetches:

* movie details
* videos
* credits
* reviews
* watch providers

Then it renders:

* detailed movie information
* TMDB / YouTube trailers
* iframe-based movie player

### Movie Player

The movie player gets a list of sources from third-party providers and renders the selected source inside an iframe.

---

## Important Files

### Metadata / TMDB

* `page.tsx`
* `app/movie/[id]/page.tsx`
* `movie-details.tsx`

### Player

* `app/movie/[id]/MoviePlayer.tsx`
* `players.ts`

### Auth

* `app/api/auth/[...nextauth]/route.ts`
* route files related to session / watchlist

### Environment

* `.env.local`

---

## Environment Variables

Use a `.env.local` file in the project root:

```env
TMDB_ACCESS_TOKEN=YOUR_TMDB_READ_ACCESS_TOKEN
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
NEXTAUTH_URL=http://localhost:3000
```

Notes:

* `TMDB_ACCESS_TOKEN` uses the **API Read Access Token**
* not `TMDB_API_KEY`

---

## Audit Conclusion

The final conclusion of this audit is:

* **metadata comes from TMDB**
* **trailers/videos come from TMDB and are embedded through YouTube**
* **the main movie player comes from third-party streaming providers through iframe**
* the project uses **TMDB_ACCESS_TOKEN** with the **Bearer token** method
* the project also uses **NextAuth + Google OAuth** for internal authentication

---

## Plan to Split Into 2 Websites

### Website 1 — MoviKu TMDB

Focus:

* movie catalog
* search
* movie details
* trailers
* cast
* reviews
* watch providers
* main project branding

### Website 2 — MoviKu Player

Focus:

* separate player pages
* video sources from selected providers
* iframe player
* watching experience separated from the metadata website

Purpose of this separation:

* cleaner project structure
* metadata and player logic are separated
* easier maintenance
* easier future development

---

## Notes

This project uses TMDB as the source of movie metadata.
TMDB is **not** the main full-movie streaming source in this project.

If this project is developed further, it is recommended to:

* keep TMDB usage aligned with attribution requirements
* store environment variables securely
* never expose tokens publicly
* separate the metadata website and the player website with a clear structure

---

