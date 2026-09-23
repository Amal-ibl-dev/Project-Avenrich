import React from "react";
import { ChevronDown } from "lucide-react";
import { formatCurrency, formatCurrencyCompact } from "../../../shared/utils/format.utils";
import type { IncomeSegment } from "../types/dashboard.types";

interface IncomeOverviewProps {
  total: number;
  segments: IncomeSegment[];
}

export function IncomeOverview({ total, segments }: IncomeOverviewProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Income Overview</h3>
        <button className="flex items-center gap-1 rounded-full bg-[#EAF6EE] px-3 py-1.5 text-xs font-medium text-[#1E5631]">
          Category
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="mb-4 text-3xl font-bold text-gray-900">{formatCurrency(total)}</div>

      <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
        {segments.map((segment) => (
          <div
            key={segment.id}
            style={{ width: `${segment.percent}%`, background: segment.color }}
            className="h-full"
          />
        ))}
      </div>

      <div className="flex justify-between">
        {segments.map((segment) => (
          <div key={segment.id}>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: segment.color }}
              />
              {segment.label}
            </div>
            <div className="mt-1 font-semibold text-gray-900">
              {formatCurrencyCompact(segment.amount)}
            </div>
            <div className="text-xs text-gray-400">{segment.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
