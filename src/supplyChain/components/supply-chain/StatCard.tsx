import React from "react";
import type { SupplyChainStat } from "../../types/supply-chain.types";

interface StatCardProps {
  stat: SupplyChainStat;
}

const VARIANT_STYLES = {
  default: { bg: "#E6F3EA", label: "text-[#1E5631]", value: "text-[#123A20]" },
  alert: { bg: "#F7E2E2", label: "text-[#C0392B]", value: "text-[#990000]" },
} as const;

/** Light-tinted rounded card showing one headline number, used in the stat row. */
export function StatCard({ stat }: StatCardProps) {
  const styles = VARIANT_STYLES[stat.variant];

  return (
    <div className="min-w-0 flex-1 rounded-3xl p-6" style={{ background: styles.bg }}>
      <div className={`mb-2 text-sm font-medium ${styles.label}`}>{stat.label}</div>
      <div className={`text-4xl font-bold ${styles.value}`}>{stat.value}</div>
    </div>
  );
}
