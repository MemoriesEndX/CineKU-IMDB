"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Compass,
  Film,
  HelpCircle,
  Home,
  Library,
  Settings,
  Tv,
  Tv2Icon,
} from "lucide-react";
import { NavIcon } from "./ui/NavIcon";
import { SupportDialog } from "./support-dialog";
import { cn } from "@/lib/utils";

type RouteItem = {
  label: string;
  href: string;
  icon: typeof Home;
  match?: (pathname: string) => boolean;
};

const routes: RouteItem[] = [
  {
    label: "Home",
    icon: Home,
    href: "/",
    match: (pathname) => pathname === "/",
  },
  {
    label: "Discover",
    icon: Compass,
    href: "/discover",
    match: (pathname) => pathname === "/discover" || pathname.startsWith("/discover/"),
  },
  {
    label: "Movies",
    icon: Film,
    href: "/movies",
    match: (pathname) => pathname === "/movies" || pathname.startsWith("/movie/"),
  },
  {
    label: "TV Shows",
    icon: Tv,
    href: "/tv",
    match: (pathname) => pathname === "/tv" || pathname.startsWith("/tv/"),
  },
  {
    label: "Anime",
    icon: Tv2Icon,
    href: "/anime",
    match: (pathname) => pathname === "/anime" || pathname.startsWith("/anime/"),
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    match: (pathname) => pathname === "/settings",
  },
];

const mobileRoutes = routes;

function isRouteActive(pathname: string, route: RouteItem) {
  return route.match ? route.match(pathname) : pathname === route.href;
}

interface DesktopSidebarProps {
  pathname: string;
  greetingText: string;
  onNavigate: (href: string) => void;
  onSupportClick: () => void;
}

interface BottomActionsProps {
  pathname: string;
  greetingText: string;
  onNavigate: (href: string) => void;
  onSupportClick: () => void;
}

function BottomActions({
  pathname,
  greetingText,
  onNavigate,
  onSupportClick,
}: BottomActionsProps) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-1.5 border-t border-border/30 pt-1.5">
      <NavIcon
        icon={Library}
        label="Library"
        variant="sidebar"
        active={pathname === "/library"}
        onClick={() => onNavigate("/library")}
      />
      <NavIcon
        icon={HelpCircle}
        label="Support"
        variant="sidebar"
        active={false}
        showIndicator={false}
        onClick={onSupportClick}
      />
      <p className="mt-1 px-1.5 text-center text-[8px] leading-3 text-muted-foreground lg:text-[8.5px]">
        {greetingText}
      </p>
    </div>
  );
}

function DesktopSidebar({
  pathname,
  greetingText,
  onNavigate,
  onSupportClick,
}: DesktopSidebarProps) {
  return (
    <aside 
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden w-[72px] flex-col overflow-hidden rounded-[2.5rem] border border-border bg-card/50 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 md:flex lg:left-6 data-[sidebar=compact]:w-16 data-[sidebar=compact]:p-1"
      data-sidebar="default"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent rounded-[2.5rem]" />

      <button
        type="button"
        onClick={() => onNavigate("/")}
        aria-label="Go to home"
        className="relative z-10 mb-1 flex h-10 w-10 items-center justify-center self-center overflow-hidden rounded-2xl border border-border/50 bg-card transition-transform duration-300 hover:scale-105 hover:bg-card-hover"
      >
        <img
          src={`/movie.png`}
          alt="CineKU Logo"
          className="h-6 w-6 object-contain"
        />
      </button>

      <nav className="relative z-10 flex flex-col items-center gap-1.5 py-2">
        {routes.map((route) => (
          <NavIcon
            key={route.href}
            icon={route.icon}
            label={route.label}
            variant="sidebar"
            active={isRouteActive(pathname, route)}
            onClick={() => onNavigate(route.href)}
          />
        ))}
      </nav>

      <BottomActions
        pathname={pathname}
        greetingText={greetingText}
        onNavigate={onNavigate}
        onSupportClick={onSupportClick}
      />
    </aside>
  );
}

interface MobileBottomNavProps {
  pathname: string;
  onNavigate: (href: string) => void;
}

function MobileBottomNav({ pathname, onNavigate }: MobileBottomNavProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto w-fit px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <nav className={cn("pointer-events-auto flex items-center gap-1 rounded-full border border-border/50", "bg-card/50 px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] shadow-black/40 backdrop-blur-2xl transition-all duration-300") }>
          {mobileRoutes.map((route) => (
            <NavIcon
              key={route.href}
              icon={route.icon}
              label={route.label}
              variant="bottom"
              active={isRouteActive(pathname, route)}
              onClick={() => onNavigate(route.href)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { data: session } = useSession();
  const [showSupport, setShowSupport] = useState(false);

  const greetingText = useMemo(() => {
    const firstName = session?.user?.name?.split(" ")[0];
    return firstName ? `Hi, ${firstName}!` : "Need Help?";
  }, [session?.user?.name]);

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <DesktopSidebar
        pathname={pathname}
        greetingText={greetingText}
        onNavigate={handleNavigate}
        onSupportClick={() => setShowSupport(true)}
      />

      <MobileBottomNav pathname={pathname} onNavigate={handleNavigate} />

      <SupportDialog open={showSupport} onOpenChange={setShowSupport} user={session?.user} />
    </>
  );
}
