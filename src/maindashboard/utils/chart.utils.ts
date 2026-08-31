/**
 * Converts a 0–100 normalized magnitude into a pixel height for one half
 * (top or bottom) of the capsule bar chart.
 */
export function normalizedToPx(value: number, maxHalfHeightPx: number, maxValue = 100): number {
  const clamped = Math.max(0, Math.min(value, maxValue));
  return (clamped / maxValue) * maxHalfHeightPx;
}

/**
 * Clamps a tooltip's horizontal offset so it never renders outside the
 * bounds of its container, given the container width and tooltip width.
 */
export function clampTooltipOffset(
  desiredLeftPx: number,
  tooltipWidthPx: number,
  containerWidthPx: number,
  edgePaddingPx = 8
): number {
  const halfTooltip = tooltipWidthPx / 2;
  const min = halfTooltip + edgePaddingPx;
  const max = containerWidthPx - halfTooltip - edgePaddingPx;
  return Math.min(Math.max(desiredLeftPx, min), max);
}
