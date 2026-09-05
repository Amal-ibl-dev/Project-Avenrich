import React from "react";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import type { SalesReportEntry } from "../../types/sales.types";

interface SalesReportCardProps {
  title: string;
  entries: SalesReportEntry[];
  onViewAll?: () => void;
}

const STATUS_VARIANT = {
  APPROVED: "approved",
  PENDING: "pending",
} as const;

export function SalesReportCard({ title, entries, onViewAll }: SalesReportCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button
          onClick={onViewAll}
          aria-label={`View all ${title.toLowerCase()}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
        >
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img
                src={entry.avatarUrl}
                alt={entry.companyName}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">{entry.companyName}</div>
                <div className="text-sm text-gray-400">{entry.code}</div>
              </div>
            </div>
            <StatusBadge label={entry.status} variant={STATUS_VARIANT[entry.status]} />
          </div>
        ))}
      </div>
    </div>
  );
}
