import React from "react";
import type { RawMaterialAllocation } from "../../types/blend.types";

interface TopRawMaterialCardProps {
  title: string;
  rows: RawMaterialAllocation[];
}

export function TopRawMaterialCard({ title, rows }: TopRawMaterialCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-bold text-gray-900">{title}</h3>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-4">
            <span className="w-28 flex-shrink-0 text-sm text-gray-500">{row.label}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${row.percent}%`,
                  background: "linear-gradient(90deg, #123A20 0%, #4ADE9C 100%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
