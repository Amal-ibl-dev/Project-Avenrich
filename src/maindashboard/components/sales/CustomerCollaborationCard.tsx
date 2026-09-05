import React from "react";
import { Plus } from "lucide-react";
import type { CustomerCollaborationEntry } from "../../types/sales.types";

interface CustomerCollaborationCardProps {
  title: string;
  customers: CustomerCollaborationEntry[];
  onAddCustomer?: () => void;
}

/** Maps a free-text relationship tag to a border/text color. Extend as new tags appear. */
const TAG_COLOR_MAP: Record<string, string> = {
  Export: "border-fuchsia-400 text-fuchsia-500",
  "Contract Packing": "border-blue-400 text-blue-500",
};
const DEFAULT_TAG_COLOR = "border-gray-300 text-gray-500";

export function CustomerCollaborationCard({
  title,
  customers,
  onAddCustomer,
}: CustomerCollaborationCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button
          onClick={onAddCustomer}
          className="flex items-center gap-1.5 rounded-full border border-[#1E5631] px-4 py-2 text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#EAF6EE]"
        >
          <Plus size={16} />
          Add Customer
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {customers.map((customer) => (
          <div key={customer.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img
                src={customer.avatarUrl}
                alt={customer.name}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">{customer.name}</div>
                <div className="text-sm text-gray-400">{customer.address}</div>
              </div>
            </div>
            <span
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${
                TAG_COLOR_MAP[customer.tag] ?? DEFAULT_TAG_COLOR
              }`}
            >
              {customer.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
