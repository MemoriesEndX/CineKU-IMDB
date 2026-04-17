import { cn } from "@/lib/utils";

export function SettingsTabButton({
  active,
  label,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200",
        active
          ? "bg-foreground text-background shadow-[0_8px_24px_rgba(255,255,255,0.14)]"
          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
