import React from "react";
import type { StockValueRow } from "../types/inventory.types";

interface StockValueCardProps {
  title: string;
  rows: StockValueRow[];
}

/** Solid dark-green bars of varying length, label to the left, no numeric value shown. */
export function StockValueCard({ title, rows }: StockValueCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-bold text-gray-900">{title}</h3>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-4">
            <span className="w-28 flex-shrink-0 text-sm text-gray-500">{row.label}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#1E5631]"
                style={{ width: `${row.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
