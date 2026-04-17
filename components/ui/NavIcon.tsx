"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavIconVariant = "sidebar" | "bottom";

interface NavIconProps {
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  label: string;
  variant?: NavIconVariant;
  className?: string;
  showIndicator?: boolean;
}

export function NavIcon({
  icon: Icon,
  active = false,
  onClick,
  label,
  variant = "sidebar",
  className,
  showIndicator = true,
}: NavIconProps) {
  const isBottom = variant === "bottom";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "group relative flex items-center justify-center",
        "outline-none transition-all duration-300 ease-out",
        "focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-0",
        isBottom
          ? ["h-14 w-14 rounded-2xl", "active:scale-95"]
          : ["h-12 w-12 rounded-2xl", "hover:scale-105 active:scale-95"],
        className
      )}
    >
      {!isBottom && active && showIndicator && (
        <span className="absolute -left-2 h-7 w-1 rounded-full bg-gradient-to-b from-fuchsia-500 via-violet-500 to-cyan-400 opacity-80 shadow-[0_0_8px_rgba(168,85,247,0.55)]" />
      )}

      <span
        className={cn(
          "absolute inset-0 rounded-[inherit] transition-all duration-300",
          "border backdrop-blur-xl",
          active
            ? [
                "border-foreground/20",
                "bg-foreground/10",
                "shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]",
              ]
            : [
                "border-foreground/8",
                "bg-foreground/5",
                "shadow-[0_6px_18px_rgba(0,0,0,0.18)]",
                "group-hover:bg-foreground/8",
                "group-hover:border-foreground/15",
              ]
        )}
      />

      <span
        className={cn(
          "absolute inset-[1px] rounded-[inherit] transition-opacity duration-300",
          active
            ? "opacity-100 bg-gradient-to-br from-fuchsia-500/18 via-violet-500/8 to-cyan-400/18"
            : "opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/8 to-transparent"
        )}
      />

      <span
        className={cn(
          "relative z-10 flex items-center justify-center transition-all duration-300",
          active ? "text-foreground scale-100" : "text-muted-foreground group-hover:text-foreground/70"
        )}
      >
        <Icon
          className={cn(
            isBottom ? "h-5 w-5" : "h-[18px] w-[18px]",
            "transition-all duration-300",
            active && "drop-shadow-[0_0_10px_rgba(255,255,255,0.22)]"
          )}
        />
      </span>

      {isBottom && active && (
        <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
      )}
    </button>
  );
}