"use client";

import { useEffect, useState } from "react";
import { SectionCard } from "./section-card";
import { applyTheme, applyPreferences, getStoredTheme, getStoredPrefs } from "@/app/settings/theme-utils";
import type { ThemeName } from "@/app/settings/theme-config";
import type { InterfacePreferences } from "@/app/settings/theme-utils";

export function AppearancePanel() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("midnight");
  const [prefs, setPrefs] = useState<InterfacePreferences>({
    blur: true,
    compactSidebar: false,
    animations: true,
  });
  const [mounted, setMounted] = useState(false);

  // Load stored values on mount
  useEffect(() => {
    setCurrentTheme(getStoredTheme());
    setPrefs(getStoredPrefs());
    setMounted(true);
  }, []);

  const handleThemeChange = (theme: ThemeName) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  const handlePreferenceChange = (key: keyof InterfacePreferences) => {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    applyPreferences(newPrefs);
  };

  // Don't render until hydrated
  if (!mounted) return null;

  const themes: { id: ThemeName; label: string; preview: string }[] = [
    {
      id: "midnight",
      label: "Midnight",
      preview: "bg-gradient-to-br from-zinc-900 to-zinc-700",
    },
    {
      id: "ocean",
      label: "Ocean",
      preview: "bg-gradient-to-br from-sky-900 to-blue-500",
    },
    {
      id: "crimson",
      label: "Crimson",
      preview: "bg-gradient-to-br from-rose-950 to-red-600",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Theme Selection */}
      <SectionCard title="Theme">
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`rounded-2xl p-4 text-left transition-all duration-200 ${
                currentTheme === theme.id
                  ? "border-2 border-[var(--primary)] bg-[var(--card-hover)]"
                  : "border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)]"
              }`}
            >
              <div className={`mb-3 h-16 rounded-xl ${theme.preview}`} />
              <p className="text-sm font-medium text-[var(--foreground)]">{theme.label}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Interface Preferences */}
      <SectionCard title="Interface">
        <div className="space-y-4">
          {/* Blur Effects Toggle */}
          <div className="flex items-center justify-between rounded-lg bg-[var(--card)] px-4 py-3 transition-colors hover:bg-[var(--card-hover)]">
            <span className="text-sm font-medium text-[var(--foreground)]">Enable blur effects</span>
            <button
              onClick={() => handlePreferenceChange("blur")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.blur ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.blur ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Compact Sidebar Toggle */}
          <div className="flex items-center justify-between rounded-lg bg-[var(--card)] px-4 py-3 transition-colors hover:bg-[var(--card-hover)]">
            <span className="text-sm font-medium text-[var(--foreground)]">Use compact sidebar</span>
            <button
              onClick={() => handlePreferenceChange("compactSidebar")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.compactSidebar ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.compactSidebar ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Animations Toggle */}
          <div className="flex items-center justify-between rounded-lg bg-[var(--card)] px-4 py-3 transition-colors hover:bg-[var(--card-hover)]">
            <span className="text-sm font-medium text-[var(--foreground)]">Animate transitions</span>
            <button
              onClick={() => handlePreferenceChange("animations")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.animations ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  prefs.animations ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
