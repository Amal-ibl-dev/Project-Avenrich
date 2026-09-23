import type { StatusTone } from "../types/supply-chain.types";

/**
 * Palette for the five list pages. Kept in one place so the table header,
 * pills and buttons can be re-tinted from a single file if the brand green
 * ever shifts — no page or component hardcodes these values.
 */
export const LIST_THEME = {
  /** Dark green bar behind the table column headers. */
  tableHeaderBg: "#186340",
  tableHeaderText: "#FFFFFF",
  /** Hairline between body rows. */
  rowDivider: "#F0F1F3",
  /** Solid brand button (Export Pdf, Add Product, Create GRN). */
  primaryBg: "#14532D",
  primaryText: "#FFFFFF",
  /** Outline button (Add Supplier, Add Purchase Order, Filter). */
  outlineBorder: "#1E5631",
  outlineText: "#1E5631",
  outlineHoverBg: "#EAF6EE",
} as const;

/** Pill colours per tone: soft tinted fill, matching border and text. */
export const STATUS_TONE_STYLES: Record<
  StatusTone,
  { bg: string; border: string; text: string }
> = {
  green: { bg: "#EDF8F1", border: "#1E7A45", text: "#1E7A45" },
  blue: { bg: "#EDF3FE", border: "#2F6BD6", text: "#2F6BD6" },
  amber: { bg: "#FEF9E8", border: "#D9A400", text: "#B98A00" },
  magenta: { bg: "#FBEEFB", border: "#B8399E", text: "#B8399E" },
  red: { bg: "#FDEDED", border: "#D64545", text: "#D64545" },
  indigo: { bg: "#FFFFFF", border: "#2B2F8F", text: "#2B2F8F" },
  neutral: { bg: "#F4F5F7", border: "#C7CAD1", text: "#5B6270" },
};
