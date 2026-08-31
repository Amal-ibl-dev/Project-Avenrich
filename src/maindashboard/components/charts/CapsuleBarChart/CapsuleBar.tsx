import React from "react";
import { COLORS } from "../../../constants/theme.constants";
import { normalizedToPx } from "../../../utils/chart.utils";

export type CapsuleVariant = "incoming" | "expenses";

interface CapsuleBarProps {
  variant: CapsuleVariant;
  /** 0–100 normalized magnitude. */
  value: number;
  maxHalfHeightPx: number;
  isActive: boolean;
}

const VARIANT_STYLES: Record<
  CapsuleVariant,
  { activeGradient: string; capColor: string; roundTop: boolean }
> = {
  incoming: {
    activeGradient: `linear-gradient(180deg, ${COLORS.emerald} 0%, ${COLORS.forestGreen} 100%)`,
    capColor: COLORS.emerald,
    roundTop: true,
  },
  expenses: {
    activeGradient: `linear-gradient(180deg, ${COLORS.crimsonSoft} 0%, ${COLORS.crimsonDark} 100%)`,
    capColor: COLORS.crimsonSoft,
    roundTop: false,
  },
};

const HATCH_PATTERN = `repeating-linear-gradient(135deg, ${COLORS.hatchLine} 0px, ${COLORS.hatchLine} 2px, transparent 2px, transparent 6px)`;

/**
 * Renders one half-capsule (top = incoming, bottom = expenses) for a single
 * month. Inactive bars show a hatched fill with a small solid-color "cap" at
 * the outer tip; the active bar is fully filled with a color gradient.
 */
export function CapsuleBar({ variant, value, maxHalfHeightPx, isActive }: CapsuleBarProps) {
  const { activeGradient, capColor, roundTop } = VARIANT_STYLES[variant];
  const heightPx = Math.max(normalizedToPx(value, maxHalfHeightPx), 18);
  const capHeightPx = Math.min(14, heightPx * 0.3);

  const outerRadius = roundTop
    ? { borderTopLeftRadius: 999, borderTopRightRadius: 999 }
    : { borderBottomLeftRadius: 999, borderBottomRightRadius: 999 };

  const containerStyle: React.CSSProperties = {
    height: heightPx,
    ...outerRadius,
    position: "relative",
    overflow: "hidden",
    background: isActive ? activeGradient : HATCH_PATTERN,
    border: isActive ? "none" : `1px solid ${COLORS.hatchBorder}`,
    [roundTop ? "borderBottom" : "borderTop"]: "none",
    transition: "background 200ms ease, height 200ms ease",
  } as React.CSSProperties;

  return (
    <div className="w-full" style={containerStyle}>
      {!isActive && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            [roundTop ? "top" : "bottom"]: 0,
            height: capHeightPx,
            background: capColor,
            ...outerRadius,
          } as React.CSSProperties}
        />
      )}
    </div>
  );
}
