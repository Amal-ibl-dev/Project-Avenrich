import React from "react";
import { COLORS } from "../../constants/theme.constants";
import { formatCurrency, formatSignedPercent } from "../../utils/format.utils";
import type { MetricItem } from "../../types/dashboard.types";

interface MetricsCardProps {
  metrics: MetricItem[];
}

export function MetricsCard({ metrics }: MetricsCardProps) {
  return (
    <div
      className="flex w-full flex-shrink-0 flex-col justify-between rounded-3xl p-7 lg:w-[320px]"
      style={{
        background: `linear-gradient(180deg, ${COLORS.forestGreen} 0%, ${COLORS.forestGreenDark} 100%)`,
      }}
    >
      {metrics.map((metric, index) => (
        <div key={metric.id} className={index !== 0 ? "mt-6" : ""}>
          <div className="mb-1 text-sm font-medium" style={{ color: COLORS.gold }}>
            {metric.label}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[26px] font-bold text-white">
              {formatCurrency(metric.value)}
            </span>
            <span
              className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium"
              style={{ color: COLORS.emerald }}
            >
              {formatSignedPercent(metric.deltaPercent)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
