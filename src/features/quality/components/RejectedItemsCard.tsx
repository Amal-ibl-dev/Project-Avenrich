import React from "react";
import type { RejectedItem } from "../types/quality.types";

interface RejectedItemsCardProps {
  title: string;
  items: RejectedItem[];
}

export function RejectedItemsCard({ title, items }: RejectedItemsCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 whitespace-nowrap rounded-full border border-emerald-400 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
              {item.qaCode}
            </span>
            <div className="min-w-0">
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
