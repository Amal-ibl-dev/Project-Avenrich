import React from "react";

export interface DualBarChartDatum {
  label: string;
  valueA: number;
  valueB: number;
}

interface DualBarChartProps {
  data: DualBarChartDatum[];
  colorA: string;
  colorB: string;
  legendA: string;
  legendB: string;
  maxHeightPx?: number;
  barWidthPx?: number;
  gapBetweenGroupsPx?: number;
}

/**
 * Two-series bar chart (e.g. Auction vs. Private Sales). This component was
 * referenced from `inventoryDashboard/components/inventory/TeaStockCard.tsx`
 * (as `../../../supplyChain/components/charts/DualBarChart/DualBarChart`) but
 * never actually existed anywhere in the original codebase — the import was
 * already broken before this rewrite. It's authored fresh here, in the
 * `shared/components/charts/` home its import path always implied, styled to
 * match `CapsuleBarChart`'s conventions (raw hex props, px-based sizing).
 */
export function DualBarChart({
  data,
  colorA,
  colorB,
  legendA,
  legendB,
  maxHeightPx = 200,
  barWidthPx = 32,
  gapBetweenGroupsPx = 48,
}: DualBarChartProps) {
  const max = Math.max(1, ...data.flatMap((d) => [d.valueA, d.valueB]));

  return (
    <div>
      <div
        className="flex items-end"
        style={{ height: maxHeightPx, gap: gapBetweenGroupsPx }}
      >
        {data.map((d, index) => (
          <div key={`${d.label}-${index}`} className="flex items-end" style={{ gap: 6 }}>
            <div
              title={`${legendA}: ${d.valueA}`}
              style={{
                width: barWidthPx,
                height: `${(d.valueA / max) * 100}%`,
                background: colorA,
                borderRadius: "6px 6px 0 0",
              }}
            />
            <div
              title={`${legendB}: ${d.valueB}`}
              style={{
                width: barWidthPx,
                height: `${(d.valueB / max) * 100}%`,
                background: colorB,
                borderRadius: "6px 6px 0 0",
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: colorA }} />
          {legendA}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: colorB }} />
          {legendB}
        </span>
      </div>
    </div>
  );
}
