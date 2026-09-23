import React from "react";
import { STATUS_TONE_STYLES } from "../../constants/list-theme.constants";
import type { StatusTone } from "../../types/supply-chain.types";

interface StatusPillProps {
  label: string;
  tone: StatusTone;
  /** Renders the label in caps, as the order statuses do in the design. */
  uppercase?: boolean;
  /** Fixed width keeps a column of pills aligned even with varied labels. */
  fullWidth?: boolean;
}

/**
 * Rounded outline pill for a status or category value. The tone carries the
 * colour, never the label — so a page can re-map "Partial" to a different
 * tone without touching this component.
 */
export function StatusPill({ label, tone, uppercase = false, fullWidth = true }: StatusPillProps) {
  const styles = STATUS_TONE_STYLES[tone];

  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full border px-4 py-1 text-xs font-semibold leading-5",
        uppercase ? "uppercase tracking-wide" : "",
        fullWidth ? "w-full max-w-[140px]" : "",
      ].join(" ")}
      style={{ background: styles.bg, borderColor: styles.border, color: styles.text }}
    >
      {label}
    </span>
  );
}
