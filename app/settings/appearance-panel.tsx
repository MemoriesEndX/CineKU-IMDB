"use client";

import { useEffect, useState } from "react";
import { SectionCard } from "@/components/section-card";
import { ThemeCard } from "./theme-card";
import { ToggleRow } from "./toggle-row";
import { THEMES, type ThemeName } from "./theme-config";
import {
  applyPreferences,
  applyTheme,
  getStoredPrefs,
  getStoredTheme,
  type InterfacePreferences,
} from "./theme-utils";

export function AppearancePanel() {
  const [theme, setTheme] = useState<ThemeName>("midnight");
  const [prefs, setPrefs] = useState<InterfacePreferences>({
    blur: true,
    compactSidebar: false,
    animations: true,
  });

  useEffect(() => {
    const savedTheme = getStoredTheme();
    const savedPrefs = getStoredPrefs();

    setTheme(savedTheme);
    setPrefs(savedPrefs);

    applyTheme(savedTheme);
    applyPreferences(savedPrefs);
  }, []);

  const handleThemeChange = (nextTheme: ThemeName) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const togglePref = (key: keyof InterfacePreferences) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    applyPreferences(next);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Theme">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
          {THEMES.map((item) => (
            <ThemeCard
              key={item.id}
              label={item.label}
              description={item.description}
              previewClass={item.previewClass}
              selected={theme === item.id}
              onClick={() => handleThemeChange(item.id)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Interface">
        <div className="space-y-4">
          <ToggleRow
            label="Enable blur effects"
            checked={prefs.blur}
            onChange={() => togglePref("blur")}
          />
          <ToggleRow
            label="Use compact sidebar"
            checked={prefs.compactSidebar}
            onChange={() => togglePref("compactSidebar")}
          />
          <ToggleRow
            label="Animate transitions"
            checked={prefs.animations}
            onChange={() => togglePref("animations")}
          />
        </div>
      </SectionCard>
    </div>
  );
}