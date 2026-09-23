import React from "react";
import type { CashFlowWeek } from "../../types/financial-overview.types";

interface CashFlowCardProps {
  title: string;
  weeks: CashFlowWeek[];
  maxHeightPx?: number;
}

const INFLOW_COLOR = "#123A20";
const OUTFLOW_COLOR = "#5FE0B8";

/** Single rounded-pill bar per week, colored by whether that week was net inflow or outflow. */
export function CashFlowCard({ title, weeks, maxHeightPx = 180 }: CashFlowCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: INFLOW_COLOR }} />
            Inflow
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: OUTFLOW_COLOR }} />
            Outflow
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4" style={{ height: maxHeightPx }}>
        {weeks.map((week) => {
          const color = week.type === "inflow" ? INFLOW_COLOR : OUTFLOW_COLOR;
          return (
            <div key={week.weekLabel} className="flex flex-1 flex-col items-center">
              <div
                className="w-full max-w-[56px] rounded-full"
                style={{
                  height: Math.max((week.value / 100) * maxHeightPx, 24),
                  background: `linear-gradient(180deg, ${color} 0%, ${color}DD 100%)`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between gap-4">
        {weeks.map((week) => (
          <span key={week.weekLabel} className="flex-1 text-center text-xs text-gray-500">
            {week.weekLabel}
          </span>
        ))}
      </div>
    </div>
  );
}
