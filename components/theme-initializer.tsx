"use client";

import { useEffect } from "react";
import { getStoredTheme, getStoredPrefs, applyTheme, applyPreferences } from "@/app/settings/theme-utils";

/**
 * This component initializes theme and preferences from localStorage
 * on app startup, before any other rendering happens.
 * Prevents flash of unstyled content and hydration mismatches.
 */
export function ThemeInitializer() {
  useEffect(() => {
    // Apply stored theme
    const theme = getStoredTheme();
    applyTheme(theme);

    // Apply stored preferences
    const prefs = getStoredPrefs();
    applyPreferences(prefs);
  }, []);

  return null;
}
