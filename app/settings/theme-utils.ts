import type { ThemeName } from "./theme-config";

export type InterfacePreferences = {
  blur: boolean;
  compactSidebar: boolean;
  animations: boolean;
};

const THEME_KEY = "cineku-theme";
const PREFS_KEY = "cineku-interface-prefs";

export function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme === "lite" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, theme);
  
  // Trigger a custom event for any components listening to theme changes
  window.dispatchEvent(new CustomEvent("theme-changed", { detail: { theme } }));
}

export function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "midnight";
  return (localStorage.getItem(THEME_KEY) as ThemeName) || "midnight";
}

export function getStoredPrefs(): InterfacePreferences {
  if (typeof window === "undefined") {
    return { blur: true, compactSidebar: false, animations: true };
  }

  const raw = localStorage.getItem(PREFS_KEY);
  if (!raw) return { blur: true, compactSidebar: false, animations: true };

  try {
    return JSON.parse(raw);
  } catch {
    return { blur: true, compactSidebar: false, animations: true };
  }
}

export function applyPreferences(prefs: InterfacePreferences) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  root.setAttribute("data-blur", prefs.blur ? "on" : "off");
  root.setAttribute("data-sidebar", prefs.compactSidebar ? "compact" : "default");
  root.setAttribute("data-motion", prefs.animations ? "on" : "off");

  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  
  // Trigger a custom event for any components listening to preference changes
  window.dispatchEvent(new CustomEvent("prefs-changed", { detail: { prefs } }));
}