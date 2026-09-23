import React from "react";
import type { BlendState, RecentBlendRow } from "../types/blend.types";

interface RecentBlendTableProps {
  title: string;
  rows: RecentBlendRow[];
}

const STATE_STYLES: Record<BlendState, string> = {
  Blended: "border border-emerald-400 text-emerald-600 bg-emerald-50",
  "Blend in Progress": "border border-amber-400 text-amber-600 bg-amber-50",
  Pending: "border border-orange-400 text-orange-600 bg-orange-50",
};

const COLUMNS = ["Blend ID", "Product Name", "Blend Name", "Quantity (KG)", "State", "Expired Date"];

/**
 * Table intentionally has no internal scroll container — it grows with its
 * content and the page itself scrolls (see the single overflow-y-auto on
 * the page's content column), matching the "scroll with parent" behavior.
 */
export function RecentBlendTable({ title, rows }: RecentBlendTableProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  className={`bg-gradient-to-r from-[#1E5631] to-[#123A20] px-4 py-3 text-left font-medium text-white ${
                    i === 0 ? "rounded-l-xl" : ""
                  } ${i === COLUMNS.length - 1 ? "rounded-r-xl" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-4 text-gray-700">{row.blendId}</td>
                <td className="px-4 py-4 text-gray-700">{row.productName}</td>
                <td className="px-4 py-4 text-gray-700">{row.blendName}</td>
                <td className="px-4 py-4 text-gray-700">{row.quantityKg}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STATE_STYLES[row.state]}`}>
                    {row.state}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-700">{row.expiredDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
