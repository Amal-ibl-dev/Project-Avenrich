import React from "react";
import { COLORS } from "../../../../../shared/theme/theme.constants";
import { formatCurrencyWhole } from "../../../../../shared/utils/format.utils";
import type { MonthlyFlow } from "../../../types/dashboard.types";

interface ChartTooltipProps {
  data: MonthlyFlow;
  /** Left offset (px) within the chart's positioning container. */
  leftPx: number;
}

export function ChartTooltip({ data, leftPx }: ChartTooltipProps) {
  return (
    <div
      role="tooltip"
      className="absolute top-0 z-10 w-[220px] rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm shadow-lg transition-all duration-200 ease-out"
      style={{ left: leftPx, transform: "translateX(-50%)" }}
    >
      <div className="mb-1.5 font-semibold text-gray-800">{data.month}</div>

      <div className="flex items-center justify-between gap-3 text-gray-700">
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: COLORS.emerald }}
          />
          Incoming
        </span>
        <span className="font-semibold text-gray-900">
          {formatCurrencyWhole(data.incomingAmount)}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between gap-3 text-gray-700">
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: COLORS.crimson }}
          />
          Expenses
        </span>
        <span className="font-semibold" style={{ color: COLORS.crimson }}>
          {formatCurrencyWhole(data.expensesAmount)}
        </span>
      </div>
    </div>
  );
}
