import React from "react";
import { ChevronDown } from "lucide-react";
import type { DashboardPeriod } from "../../types/dashboard.types";

interface DashboardHeaderProps {
  title: string;
  periods: DashboardPeriod[];
  activePeriod: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
  year: number;
}

export function DashboardHeader({
  title,
  periods,
  activePeriod,
  onPeriodChange,
  year,
}: DashboardHeaderProps) {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button className="flex items-center gap-1 font-medium text-gray-700">
          All Accounts <ChevronDown size={14} />
        </button>

        {periods.map((period) => (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className={period === activePeriod ? "font-medium text-gray-900" : ""}
          >
            {period}
          </button>
        ))}

        <button className="flex items-center gap-1 font-medium text-gray-700">
          {year} <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
