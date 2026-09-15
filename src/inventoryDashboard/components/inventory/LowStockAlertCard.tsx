import React from "react";
import type { StockAlertRow, StockAlertStatus } from "../../types/inventory.types";

interface LowStockAlertCardProps {
  title: string;
  rows: StockAlertRow[];
}

const STATUS_STYLES: Record<StockAlertStatus, string> = {
  "Partially Paid": "border border-red-400 text-red-500",
  "Expiring 2 Days": "border border-amber-400 text-amber-500",
};

export function LowStockAlertCard({ title, rows }: LowStockAlertCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-[#1E5631]">{title}</h3>
      <div className="divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between py-3.5">
            <span className="font-medium text-gray-800">{row.label}</span>
            <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[row.status]}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
