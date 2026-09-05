import React from "react";
import type { SupplierPerformanceEntry } from "../../types/supply-chain.types";

interface SupplierPerformanceCardProps {
  title: string;
  entries: SupplierPerformanceEntry[];
}

const ON_TIME_COLOR = "#123A20";
const LATE_COLOR = "#5EEAD4";

/**
 * Each row is a single rounded-full track split into an on-time segment
 * (dark green) and a late segment (mint), both rounded on their outer edge —
 * reads as one bar with a colored "cap" rather than two separate bars.
 */
export function SupplierPerformanceCard({ title, entries }: SupplierPerformanceCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-gray-900">{title}</h3>

      <div className="space-y-5">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center gap-4">
            <span className="w-28 flex-shrink-0 text-sm text-gray-500">{entry.supplierName}</span>
            <div className="flex h-3.5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                style={{ width: `${entry.onTimePercent}%`, background: ON_TIME_COLOR }}
                className="h-full"
              />
              <div
                style={{ width: `${entry.latePercent}%`, background: LATE_COLOR }}
                className="h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
