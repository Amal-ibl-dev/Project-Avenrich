import React from "react";
import type { BlendStat, BlendStatTone } from "../../types/blend.types";

const TONE_STYLES: Record<BlendStatTone, { bg: string; label: string; value: string }> = {
  green: { bg: "#E6F3EA", label: "text-[#1E5631]", value: "text-gray-900" },
  amber: { bg: "#F7EFDD", label: "text-[#B8860B]", value: "text-gray-900" },
};

interface StatCardProps {
  stat: BlendStat;
}

export function StatCard({ stat }: StatCardProps) {
  const styles = TONE_STYLES[stat.tone];

  return (
    <div className="min-w-0 flex-1 rounded-3xl p-6 text-center" style={{ background: styles.bg }}>
      <div className={`mb-2 text-sm font-medium ${styles.label}`}>{stat.label}</div>
      <div className={`text-4xl font-bold ${styles.value}`}>{stat.value}</div>
    </div>
  );
}
