/**
 * Single source of truth for the Avenrich brand palette.
 * Import these instead of hard-coding hex values in components,
 * so a rebrand only ever touches this file.
 */
export const COLORS = {
  background: "#F4F5F7",
  surface: "#FFFFFF",

  forestGreenDark: "#123A20",
  forestGreen: "#1E5631",
  forestGreenLight: "#EAF6EE",
  emerald: "#2ECC71",

  crimsonDark: "#5C1010",
  crimson: "#990000",
  crimsonSoft: "#C0392B",

  gold: "#E4C87A",

  indigo: "#6C4AB6",
  skyBlue: "#5B8DEF",
  insightBg: "#F1F6FF",

  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",

  hatchLine: "#E2E5E0",
  hatchBorder: "#CFD3CD",
  divider: "#E5E7EB",
} as const;

export const RADIUS = {
  card: "1.5rem", // rounded-3xl
  pill: "9999px",
} as const;

export const SHADOW = {
  card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)",
} as const;
