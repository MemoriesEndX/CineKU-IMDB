"use client";

import { cn } from "@/lib/utils";

type ThemeCardProps = {
  label: string;
  description: string;
  previewClass: string;
  selected: boolean;
  onClick: () => void;
};

export function ThemeCard({
  label,
  description,
  previewClass,
  selected,
  onClick,
}: ThemeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-[var(--ring)] bg-[var(--card)] shadow-[0_0_0_1px_var(--ring)]"
          : "border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)]"
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="text-lg">🔋</span>
        {selected && (
          <span className="rounded-full bg-[var(--foreground)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--foreground)]">
            Active
          </span>
        )}
      </div>

      <div className={cn("mb-4 h-16 rounded-xl shadow-sm", previewClass)} />

      <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
      <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
        {description}
      </p>
    </button>
  );
}