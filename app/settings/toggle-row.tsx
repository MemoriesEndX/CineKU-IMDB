"use client";

import { cn } from "@/lib/utils";

type ToggleRowProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-2xl bg-[var(--card)] px-4 py-3 text-left transition hover:bg-[var(--card-hover)]"
    >
      <span className="text-sm text-[var(--foreground)]">{label}</span>

      <span
        className={cn(
          "relative h-6 w-11 rounded-full border transition",
          checked
            ? "border-[var(--accent)] bg-[var(--accent)]"
            : "border-[var(--muted-foreground)] bg-[var(--muted)]"
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-[var(--background)] shadow-sm transition",
            checked ? "left-6" : "left-1"
          )}
        />
      </span>
    </button>
  );
}