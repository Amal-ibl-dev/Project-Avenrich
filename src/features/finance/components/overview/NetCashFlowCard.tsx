import React from "react";
import type { NetCashFlowRow } from "../../types/financial-overview.types";

interface NetCashFlowCardProps {
  rows: NetCashFlowRow[];
}

export function NetCashFlowCard({ rows }: NetCashFlowCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between py-3">
            <span className={row.emphasis === "green" ? "font-semibold text-[#1E5631]" : "text-gray-600"}>
              {row.label}
            </span>
            <span className={row.emphasis === "green" ? "text-lg font-bold text-[#1E5631]" : "font-semibold text-gray-900"}>
              {row.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
