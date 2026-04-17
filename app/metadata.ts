
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cineku.my.id"),

  title: {
    default: "CineKU - Stream Movies & TV Shows",
    template: "%s | CineKU",
  },

  description:
    "CineKU adalah platform streaming film dan TV show dengan database lengkap berbasis IMDb, TMDB, dan sumber terpercaya lainnya. Temukan, jelajahi, dan tonton film favoritmu dengan mudah.",

  keywords: [
    "CineKU",
    "streaming film",
    "nonton film online",
    "TV shows",
    "IMDb movies",
    "film terbaru",
    "movie database",
    "streaming indonesia",
    "film gratis",
  ],

  authors: [{ name: "CineKU Team", url: "https://www.cineku.my.id" }],
  creator: "CineKU",
  publisher: "CineKU",

  generator: "v0.dev",

  applicationName: "CineKU",
  referrer: "origin-when-cross-origin",

  icons: {
    icon: "/movie.png",
    shortcut: "/movie.png",
    apple: "/movie.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://www.cineku.my.id",
  },

  openGraph: {
    title: "CineKU - Stream Movies & TV Shows",
    description:
      "Platform streaming film dengan database IMDb & TMDB. Temukan film terbaik, rating, review, dan tonton langsung di CineKU.",
    url: "https://www.cineku.my.id",
    siteName: "CineKU",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CineKU Streaming Platform",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CineKU - Stream Movies & TV Shows",
    description:
      "Streaming film & TV show dengan data IMDb dan TMDB. Jelajahi ribuan film hanya di CineKU.",
    images: ["/og-image.jpg"],
    creator: "@cineku",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "entertainment",
};