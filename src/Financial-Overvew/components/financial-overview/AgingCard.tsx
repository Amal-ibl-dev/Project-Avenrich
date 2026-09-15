import React from "react";
import type { AgingRow } from "../../types/financial-overview.types";

interface AgingCardProps {
  title: string;
  rows: AgingRow[];
}

const EMPHASIS_COLOR: Record<NonNullable<AgingRow["emphasis"]>, string> = {
  green: "text-[#1E5631]",
  red: "text-[#C0392B]",
  none: "text-gray-900",
};

/** Label + right-aligned amount rows; the last "60+ Days" row is color-emphasized. */
export function AgingCard({ title, rows }: AgingCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <div className="divide-y divide-gray-100">
        {rows.map((row) => {
          const labelColor = row.emphasis && row.emphasis !== "none" ? EMPHASIS_COLOR[row.emphasis] : "text-gray-500";
          const amountColor = row.emphasis && row.emphasis !== "none" ? EMPHASIS_COLOR[row.emphasis] : "text-gray-900";
          return (
            <div key={row.id} className="flex items-center justify-between py-3.5">
              <span className={`text-sm ${labelColor}`}>{row.label}</span>
              <span className={`font-semibold ${amountColor}`}>{row.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
