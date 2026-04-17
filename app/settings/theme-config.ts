export type ThemeName = "midnight" | "ocean" | "crimson" | "lite";

export const THEMES: {
  id: ThemeName;
  label: string;
  description: string;
  previewClass: string;
}[] = [
  {
    id: "midnight",
    label: "Midnight",
    description: "Deep dark theme with soft neutral contrast",
    previewClass: "bg-gradient-to-br from-zinc-900 to-zinc-700",
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Cool blue tones for a calm cinematic interface",
    previewClass: "bg-gradient-to-br from-sky-900 to-blue-500",
  },
  {
    id: "crimson",
    label: "Crimson",
    description: "Bold red accents with a dramatic look",
    previewClass: "bg-gradient-to-br from-rose-950 to-red-600",
  },
  {
    id: "lite",
    label: "Lite",
    description: "Ultra-lightweight theme for maximum battery saving and performance",
    previewClass: "bg-[#dbe8f7]",
  },
];