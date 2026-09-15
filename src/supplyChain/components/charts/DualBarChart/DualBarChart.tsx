import React, { useMemo } from "react";

export interface DualBarCategory {
  label: string;
  /** Raw values — any positive numbers, any scale (percent, KG, currency...). */
  valueA: number;
  valueB: number;
}

interface DualBarChartProps {
  data: DualBarCategory[];
  colorA: string;
  colorB: string;
  legendA: string;
  legendB: string;
  maxHeightPx?: number;
  barWidthPx?: number;
  gapWithinGroupPx?: number;
  gapBetweenGroupsPx?: number;
}

/**
 * Two rounded-pill bars per category, side by side, both rising from a
 * shared baseline. Used for "Ordered vs Received" and "Expected vs Actual"
 * style comparisons — anywhere two series need a simple grouped-bar view
 * without the split-half/tooltip behavior of CapsuleBarChart.
 *
 * Bar heights are auto-scaled to the largest value actually present in
 * `data` (not assumed to already be 0–100). This means the chart works
 * correctly whether the caller passes percentages, raw KG quantities,
 * currency amounts, or anything else — the tallest bar in the dataset
 * always fills `maxHeightPx`, and every other bar is proportional to it.
 * Passing a value larger than the previous "0–100" assumption used to blow
 * bars past their container; auto-scaling removes that failure mode.
 */
export function DualBarChart({
  data,
  colorA,
  colorB,
  legendA,
  legendB,
  maxHeightPx = 140,
  barWidthPx = 22,
  gapWithinGroupPx = 6,
  gapBetweenGroupsPx = 28,
}: DualBarChartProps) {
  const maxValue = useMemo(() => {
    const allValues = data.flatMap((d) => [d.valueA, d.valueB]);
    const max = Math.max(...allValues, 0);
    // Guard against an all-zero dataset dividing by zero.
    return max > 0 ? max : 1;
  }, [data]);

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center gap-5 text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: colorA }} />
          {legendA}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: colorB }} />
          {legendB}
        </span>
      </div>

      <div
        className="flex items-end justify-start"
        style={{ gap: gapBetweenGroupsPx }}
        role="group"
        aria-label={`${legendA} vs ${legendB} by category`}
      >
        {data.map((category) => (
          <div key={category.label} className="flex flex-col items-center">
            <div
              className="flex items-end"
              style={{ gap: gapWithinGroupPx, height: maxHeightPx }}
            >
              <div
                className="rounded-full"
                style={{
                  width: barWidthPx,
                  height: Math.max((category.valueA / maxValue) * maxHeightPx, 16),
                  background: `linear-gradient(180deg, ${colorA} 0%, ${colorA}CC 100%)`,
                }}
              />
              <div
                className="rounded-full"
                style={{
                  width: barWidthPx,
                  height: Math.max((category.valueB / maxValue) * maxHeightPx, 16),
                  background: `linear-gradient(180deg, ${colorB} 0%, ${colorB}CC 100%)`,
                }}
              />
            </div>
            <span className="mt-3 whitespace-nowrap text-center text-xs text-gray-500">
              {category.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
