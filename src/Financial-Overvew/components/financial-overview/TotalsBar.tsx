import React from "react";
import type { TotalsBarItem } from "../../types/financial-overview.types";

interface TotalsBarProps {
  items: TotalsBarItem[];
}

export function TotalsBar({ items }: TotalsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-3xl bg-gradient-to-r from-[#1E5631] to-[#123A20] px-8 py-5 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.id}>
          <div className="mb-1 text-sm text-white/60">{item.label}</div>
          <div className="text-lg font-bold text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
