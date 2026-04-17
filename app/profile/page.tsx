"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Film,
  Popcorn,
  Sparkles,
  Edit,
  Save,
  X,
  LogOut,
  Plus,
  Search,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  getWatchlistCount,
  getFavoritesCount,
  getAllWatchlistItems,
  getAllFavoritesItems,
  type MediaItem,
} from "@/lib/storage/user-media";
import { MediaItemCard } from "@/components/media-item-card";

export default function MovieProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [userBio, setUserBio] = useState(
    "Passionate about discovering amazing movies and building the perfect watchlist."
  );
  const [coverUrl, setCoverUrl] = useState(
    "/placeholder.svg?height=400&width=1200"
  );
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [watchlistItems, setWatchlistItems] = useState<MediaItem[]>([]);
  const [favoritesItems, setFavoritesItems] = useState<MediaItem[]>([]);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const userName = session?.user?.name || "Movie Fan";
  const userImage = session?.user?.image;
  const userEmail = session?.user?.email;

  // Load saved data from localStorage when component mounts or email changes
  useEffect(() => {
    if (userEmail) {
      setWatchlistCount(getWatchlistCount(userEmail));
      setFavoritesCount(getFavoritesCount(userEmail));
      setWatchlistItems(getAllWatchlistItems(userEmail));
      setFavoritesItems(getAllFavoritesItems(userEmail));
    }
  }, [userEmail]);

  // Set up event listener for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      if (userEmail) {
        setWatchlistCount(getWatchlistCount(userEmail));
        setFavoritesCount(getFavoritesCount(userEmail));
        setWatchlistItems(getAllWatchlistItems(userEmail));
        setFavoritesItems(getAllFavoritesItems(userEmail));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [userEmail]);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExploreGenres = () => {
    router.push("/discover");
  };
  const handlePopMovies = () => {
    router.push("/movies");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Cover Section */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden group">
        <div className="absolute inset-0">
          <img
            src={coverUrl || "/placeholder.svg"}
            alt="Profile Cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay - ensures text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent"></div>
          {/* Secondary subtle overlay */}
          <div className="absolute inset-0 bg-[var(--background)]/10"></div>
        </div>

        {/* Camera Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-[var(--card)]/70 hover:bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] backdrop-blur-sm transition-all duration-300"
          onClick={() => coverInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
          <span className="sr-only">Change cover photo</span>
        </Button>
        <input
          type="file"
          ref={coverInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleCoverUpload}
        />
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 relative -mt-16 md:-mt-20 pb-8">
        {/* Profile Header Card */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
          {/* Avatar Section */}
          <div className="flex justify-center md:justify-start">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/50 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Avatar className="h-40 w-40 border-4 border-[var(--card)] shadow-2xl relative">
                <AvatarImage src={userImage || ""} alt={userName} />
                <AvatarFallback className="text-4xl md:text-5xl font-bold text-black">
                  {userName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* User Info Section */}
          <div className="flex flex-col justify-center w-full">
            {editMode ? (
              <div className="space-y-4 bg-[var(--card)]/40 rounded-xl p-6 border border-[var(--border)]/30 backdrop-blur-sm">
                <div>
                  <Label htmlFor="bio" className="text-[var(--foreground)] font-semibold mb-2 block">
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                    placeholder="Tell us about your movie taste..."
                    className="w-full h-32 px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button
                    onClick={() => setEditMode(false)}
                    size="sm"
                    className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)]"
                  >
                    <Save className="h-4 w-4 mr-2" /> Save Bio
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(false)}
                    size="sm"
                    className="border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--card)]"
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Name and Status */}
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-4xl md:text-5xl font-bold text-black">
                      {userName}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="bg-[var(--primary)]/15 text-[var(--primary)] border-[var(--primary)]/30 font-medium"
                    >
                      <Sparkles className="h-3 w-3 mr-1" /> Member
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-black text-base leading-relaxed max-w-2xl">
                    {userBio}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={() => setEditMode(true)}
                    variant="outline"
                    className="border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)]/70 text-[var(--foreground)] transition-all"
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit Bio
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[var(--destructive)]/50 bg-[var(--destructive)]/10 hover:bg-[var(--destructive)]/20 text-[var(--destructive)] transition-all"
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Sign Out
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[var(--card)] border-[var(--border)] text-[var(--foreground)]">
                      <DialogHeader>
                        <DialogTitle className="text-[var(--foreground)]">
                          Sign Out
                        </DialogTitle>
                      </DialogHeader>
                      <p className="text-[var(--muted-foreground)]">
                        Are you sure you want to sign out? You'll be able to sign back in anytime.
                      </p>
                      <div className="flex justify-end gap-2 mt-6">
                        <Button
                          variant="outline"
                          className="border-[var(--border)] hover:bg-[var(--card-hover)] text-[var(--foreground)]"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-[var(--destructive-foreground)]"
                          onClick={() => signOut()}
                        >
                          <LogOut className="h-4 w-4 mr-2" /> Sign Out
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="overflow-hidden border-[var(--border)] hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-[var(--card)] to-[var(--card)]/60">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-[var(--muted-foreground)] uppercase tracking-wide">
                    Movies Watched
                  </h3>
                  <p className="text-4xl font-bold mt-3 text-[var(--foreground)]">0</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2">
                    Begin your cinema adventure
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--primary)]/15">
                  <Film className="h-6 w-6 text-[var(--primary)]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-[var(--border)] hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-[var(--card)] to-[var(--card)]/60">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-[var(--muted-foreground)] uppercase tracking-wide">
                    Watchlist
                  </h3>
                  <p className="text-4xl font-bold mt-3 text-[var(--foreground)]">
                    {watchlistCount}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2">
                    {watchlistCount === 1
                      ? "item saved"
                      : "items saved"}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--primary)]/15">
                  <Plus className="h-6 w-6 text-[var(--primary)]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-[var(--border)] hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-[var(--card)] to-[var(--card)]/60">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-[var(--muted-foreground)] uppercase tracking-wide">
                    Favorites
                  </h3>
                  <p className="text-4xl font-bold mt-3 text-[var(--foreground)]">
                    {favoritesCount}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2">
                    {favoritesCount === 1
                      ? "item favorited"
                      : "items favorited"}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--primary)]/15">
                  <Sparkles className="h-6 w-6 text-[var(--primary)]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorite Genres Section */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Discover Your Taste
            </h2>
            <Zap className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <Card className="border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent pointer-events-none"></div>
            <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center text-center relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center mb-6 border border-[var(--primary)]/20">
                <Popcorn className="h-10 w-10 text-[var(--primary)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Let's Find Your Vibe
              </h3>
              <p className="text-[var(--muted-foreground)] max-w-2xl mb-6 leading-relaxed">
                Hey {userName?.split(" ")[0]}, explore genres and let us learn your unique movie taste. The more you watch, the better our recommendations!
              </p>
              <Button
                className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] font-semibold"
                size="lg"
                onClick={handleExploreGenres}
              >
                <Search className="h-5 w-5 mr-2" /> Explore Genres
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Collection Section - Watchlist & Favorites */}
        <div className="mt-12 mb-20">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Your Collection
            </h2>
            <Film className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <Tabs defaultValue="watchlist" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[var(--card)]/40 p-1 rounded-lg border border-[var(--border)]">
              <TabsTrigger
                value="watchlist"
                className="data-[state=active]:bg-[var(--card)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-md transition-all text-[var(--muted-foreground)]"
              >
                Watchlist ({watchlistCount})
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="data-[state=active]:bg-[var(--card)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow-md transition-all text-[var(--muted-foreground)]"
              >
                Favorites ({favoritesCount})
              </TabsTrigger>
            </TabsList>

            {/* Watchlist Tab */}
            <TabsContent value="watchlist" className="mt-6">
              {watchlistItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {watchlistItems.map((item: MediaItem) => (
                    <MediaItemCard key={`${item.mediaType}-${item.id}`} item={item} />
                  ))}
                </div>
              ) : (
                <Card className="border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent pointer-events-none"></div>
                  <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center text-center relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center mb-6 border border-[var(--primary)]/20">
                      <Plus className="h-12 w-12 text-[var(--primary)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                      Your Watchlist is Empty
                    </h3>
                    <p className="text-[var(--muted-foreground)] max-w-2xl mb-8 leading-relaxed">
                      Start building your watchlist by saving movies, TV shows, and anime you want to watch later. They'll appear here for easy access.
                    </p>
                    <Button
                      className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] font-semibold"
                      size="lg"
                      onClick={handleExploreGenres}
                    >
                      <Search className="h-5 w-5 mr-2" /> Explore & Add to Watchlist
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="mt-6">
              {favoritesItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {favoritesItems.map((item: MediaItem) => (
                    <MediaItemCard key={`${item.mediaType}-${item.id}`} item={item} />
                  ))}
                </div>
              ) : (
                <Card className="border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent pointer-events-none"></div>
                  <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center text-center relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center mb-6 border border-[var(--primary)]/20">
                      <Sparkles className="h-12 w-12 text-[var(--primary)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                      No Favorites Yet
                    </h3>
                    <p className="text-[var(--muted-foreground)] max-w-2xl mb-8 leading-relaxed">
                      Mark your favorite movies, TV shows, and anime to keep track of the ones you love most. Your favorites will be saved here.
                    </p>
                    <Button
                      className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] font-semibold"
                      size="lg"
                      onClick={handlePopMovies}
                    >
                      <Film className="h-5 w-5 mr-2" /> Browse & Add Favorites
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
