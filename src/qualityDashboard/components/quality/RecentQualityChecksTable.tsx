import React from "react";
import { SectionHeaderLink } from "../../../inventoryDashboard/components/common/SectionHeaderLink";
import type { QualityDecision, RecentQualityCheckRow } from "../../types/quality.types";

interface RecentQualityChecksTableProps {
  title: string;
  rows: RecentQualityCheckRow[];
  onSeeAll?: () => void;
}

const DECISION_STYLES: Record<QualityDecision, string> = {
  Approved: "border border-emerald-400 text-emerald-600 bg-emerald-50",
  Rejected: "border border-red-400 text-red-500 bg-red-50",
};

const COLUMNS = ["QA ID", "Report Type", "Decision", "Review Date", "Remark"];

/**
 * No internal scroll container — grows with its row count, and the page's
 * single overflow-y-auto scrolls it (matching "scroll with parent").
 */
export function RecentQualityChecksTable({ title, rows, onSeeAll }: RecentQualityChecksTableProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <SectionHeaderLink title={title} onSeeAll={onSeeAll} />

      <div className="overflow-x-auto rounded-2xl bg-gray-50">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  className={`bg-gradient-to-r from-[#1E5631] to-[#123A20] px-4 py-3 text-left font-medium text-white ${
                    i === 0 ? "rounded-l-full pl-6" : ""
                  } ${i === COLUMNS.length - 1 ? "rounded-r-full pr-6" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 bg-white last:border-0">
                <td className="px-4 py-4 pl-6 text-gray-700">{row.qaId}</td>
                <td className="px-4 py-4 text-gray-700">{row.reportType}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${DECISION_STYLES[row.decision]}`}>
                    {row.decision}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-700">{row.reviewDate}</td>
                <td className="px-4 py-4 pr-6 text-gray-700">{row.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
