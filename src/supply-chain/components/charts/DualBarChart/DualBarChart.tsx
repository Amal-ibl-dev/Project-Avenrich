import React from "react";

export interface DualBarCategory {
  label: string;
  /** 0–100 normalized bar heights. */
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
                  height: Math.max((category.valueA / 100) * maxHeightPx, 16),
                  background: `linear-gradient(180deg, ${colorA} 0%, ${colorA}CC 100%)`,
                }}
              />
              <div
                className="rounded-full"
                style={{
                  width: barWidthPx,
                  height: Math.max((category.valueB / 100) * maxHeightPx, 16),
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
