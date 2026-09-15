import React from "react";
import { SectionHeaderLink } from "../../../inventoryDashboard/components/common/SectionHeaderLink";
import type { AttributePassRate } from "../../types/quality.types";

interface AttributePassRateCardProps {
  title: string;
  rows: AttributePassRate[];
  onSeeAll?: () => void;
}

export function AttributePassRateCard({ title, rows, onSeeAll }: AttributePassRateCardProps) {
  return (
    <div className="rounded-3xl bg-[#F4F5F7] p-6">
      <SectionHeaderLink title={title} onSeeAll={onSeeAll} />

      <div className="mb-6 flex justify-end gap-4 text-xs text-gray-600">
        {rows.map((row) => (
          <span key={row.id} className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: row.color }} />
            {row.label}
          </span>
        ))}
      </div>

      <div className="space-y-6">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-4">
            <span className="w-24 flex-shrink-0 text-sm text-gray-700">{row.label}</span>
            <div className="h-9 flex-1 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full"
                style={{ width: `${row.percent}%`, background: row.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between pl-24 text-xs text-gray-400">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
