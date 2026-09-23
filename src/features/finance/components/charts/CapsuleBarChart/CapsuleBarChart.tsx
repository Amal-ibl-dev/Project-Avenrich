import React, { useLayoutEffect, useRef, useState } from "react";
import { CapsuleBar } from "./CapsuleBar";
import { ChartTooltip } from "./ChartTooltip";
import { useActiveMonth } from "../../../hooks/useActiveMonth";
import { clampTooltipOffset } from "../../../utils/chart.utils";
import { COLORS } from "../../../../../shared/theme/theme.constants";
import type { MonthlyFlow } from "../../../types/dashboard.types";

interface CapsuleBarChartProps {
  data: MonthlyFlow[];
  defaultActiveMonth?: string;
  /** Width of each bar, in px. */
  barWidthPx?: number;
  /** Gap between bars, in px. */
  gapPx?: number;
  /** Max height of a single half (top or bottom), in px. */
  maxHalfHeightPx?: number;
  tooltipWidthPx?: number;
}

/**
 * Dual-direction "capsule" bar chart: each month renders as a pair of
 * pill-shaped bars — incoming above the centerline, expenses below —
 * with the hovered/active month highlighted and a tooltip showing its
 * exact figures.
 */
export function CapsuleBarChart({
  data,
  defaultActiveMonth,
  barWidthPx = 34,
  gapPx = 14,
  maxHalfHeightPx = 110,
  tooltipWidthPx = 220,
}: CapsuleBarChartProps) {
  const { activeMonth, activeData, activeIndex, setActiveMonth } = useActiveMonth(
    data,
    defaultActiveMonth
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const desiredLeft = activeIndex * (barWidthPx + gapPx) + barWidthPx / 2;
  const tooltipLeft = containerWidth
    ? clampTooltipOffset(desiredLeft, tooltipWidthPx, containerWidth)
    : desiredLeft;

  return (
    <div ref={containerRef} className="relative w-full">
      <ChartTooltip data={activeData} leftPx={tooltipLeft} />

      <div
        className="flex items-end justify-center"
        style={{ gap: gapPx, paddingTop: 96 }}
        role="group"
        aria-label="Monthly incoming vs. expenses"
      >
        {data.map((month) => {
          const isActive = month.month === activeMonth;
          return (
            <button
              key={month.month}
              type="button"
              onMouseEnter={() => setActiveMonth(month.month)}
              onFocus={() => setActiveMonth(month.month)}
              className="group flex flex-col items-center bg-transparent"
              style={{ width: barWidthPx }}
              aria-pressed={isActive}
              aria-label={`${month.month}: incoming and expenses`}
            >
              <div className="flex w-full flex-col justify-end" style={{ height: maxHalfHeightPx }}>
                <CapsuleBar
                  variant="incoming"
                  value={month.incoming}
                  maxHalfHeightPx={maxHalfHeightPx}
                  isActive={isActive}
                />
              </div>

              <div className="h-px w-full" style={{ background: COLORS.divider }} />

              <div className="flex w-full flex-col" style={{ height: maxHalfHeightPx }}>
                <CapsuleBar
                  variant="expenses"
                  value={month.expenses}
                  maxHalfHeightPx={maxHalfHeightPx}
                  isActive={isActive}
                />
              </div>

              <span className="mt-3 text-xs text-gray-500">{month.month}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
