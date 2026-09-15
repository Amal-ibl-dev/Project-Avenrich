import React from "react";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import type { SalesOrderItem } from "../../types/sales.types";

interface SalesOrderCardProps {
  title: string;
  items: SalesOrderItem[];
  onViewAll?: () => void;
}

const STATUS_VARIANT = {
  Pending: "pending",
  Completed: "completed",
} as const;

export function SalesOrderCard({ title, items, onViewAll }: SalesOrderCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-gradient-to-b from-[#1E5631] to-[#123A20] p-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button
          onClick={onViewAll}
          aria-label={`View all ${title.toLowerCase()}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
        >
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="divide-y divide-white/10">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4">
            <div>
              <div className="font-semibold text-white">{item.name}</div>
              <div className="text-sm text-white/50">{item.qty.toLocaleString()} qty</div>
            </div>
            <StatusBadge label={item.status} variant={STATUS_VARIANT[item.status]} tone="solid" />
          </div>
        ))}
      </div>
    </div>
  );
}
