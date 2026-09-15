import React from "react";
import { SectionHeaderLink } from "../common/SectionHeaderLink";
import type { StockRegisterRow, StockRegisterStatus } from "../../types/inventory.types";

interface StockRegisterTableProps {
  title: string;
  rows: StockRegisterRow[];
  onSeeAll?: () => void;
}

const STATUS_STYLES: Record<StockRegisterStatus, string> = {
  Completed: "border border-emerald-400 text-emerald-600 bg-emerald-50",
  "Low Stock": "border border-red-400 text-red-500 bg-red-50",
  "In Progress": "border border-blue-400 text-blue-500 bg-blue-50",
};

const COLUMNS = ["Order ID", "Product Name", "Category", "Quantity", "Unit", "Status", "Date"];

/**
 * No internal scroll container here — grows with its row count and the
 * page's single overflow-y-auto scrolls it, matching "scroll with parent".
 */
export function StockRegisterTable({ title, rows, onSeeAll }: StockRegisterTableProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <SectionHeaderLink title={title} onSeeAll={onSeeAll} />

      <div className="overflow-x-auto rounded-2xl bg-gray-50">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col} className="px-4 py-3 text-left font-medium text-gray-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="rounded-l-2xl px-4 py-4 text-gray-700">{row.orderCode}</td>
                <td className="px-4 py-4 text-gray-700">{row.productName}</td>
                <td className="px-4 py-4 text-gray-700">{row.category}</td>
                <td className="px-4 py-4 text-gray-700">{row.quantity.toLocaleString()}</td>
                <td className="px-4 py-4 text-gray-700">{row.unit}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="rounded-r-2xl px-4 py-4 text-gray-700">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
