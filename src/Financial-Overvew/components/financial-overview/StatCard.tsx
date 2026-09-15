import React from "react";
import type { FinancialStat, StatTone } from "../../types/financial-overview.types";

const TONE_STYLES: Record<StatTone, { bg: string; label: string; value: string; iconBg: string; iconColor: string }> = {
  amber: { bg: "#F7EFDD", label: "text-[#B8860B]", value: "text-gray-900", iconBg: "#F2C94C", iconColor: "#7A5C00" },
  green: { bg: "#E6F3EA", label: "text-[#1E5631]", value: "text-gray-900", iconBg: "#DCFCE7", iconColor: "#16A34A" },
  red: { bg: "#F7E4E4", label: "text-[#C0392B]", value: "text-gray-900", iconBg: "#FEE2E2", iconColor: "#DC2626" },
  blue: { bg: "#E7EEFB", label: "text-[#3B5FCC]", value: "text-gray-900", iconBg: "#DBEAFE", iconColor: "#2563EB" },
};

interface StatCardProps {
  stat: FinancialStat;
}

export function StatCard({ stat }: StatCardProps) {
  const styles = TONE_STYLES[stat.tone];

  return (
    <div className="flex min-w-0 flex-1 items-start gap-4 rounded-3xl p-5" style={{ background: styles.bg }}>
      <div
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: styles.iconBg }}
      >
        <stat.icon size={20} style={{ color: styles.iconColor }} />
      </div>
      <div className="min-w-0">
        <div className={`mb-1 truncate text-sm font-medium ${styles.label}`}>{stat.label}</div>
        <div className={`text-xl font-bold ${styles.value}`}>{stat.value}</div>
        <div className="mt-0.5 truncate text-xs text-gray-500">{stat.subtitle}</div>
      </div>
    </div>
  );
}
