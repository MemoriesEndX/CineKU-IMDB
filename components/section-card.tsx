import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border/50 bg-card/30 p-5 transition-colors duration-300", className)}>
      {title ? <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3> : null}
      {children}
    </div>
  );
}
