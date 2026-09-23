import React from "react";

interface QualityHeroStatsCardProps {
  totalQualityCheck: number;
  approvalRate: number;
  rejectedChecks: number;
  pendingReviews: number;
}

export function QualityHeroStatsCard({
  totalQualityCheck,
  approvalRate,
  rejectedChecks,
  pendingReviews,
}: QualityHeroStatsCardProps) {
  return (
    <div className="flex items-center divide-x divide-gray-200 rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex-1 px-2 text-center first:pl-0">
        <div className="mb-1 text-3xl font-bold text-[#1E5631]">{totalQualityCheck}</div>
        <div className="text-sm text-gray-500">Total Quality Check</div>
      </div>
      <div className="flex-1 px-2 text-center">
        <div className="mb-1 text-3xl font-bold text-[#1E5631]">{approvalRate}%</div>
        <div className="text-sm text-gray-500">Approval rate</div>
      </div>
      <div className="flex-1 px-2 text-center">
        <div className="mb-1 text-3xl font-bold text-[#C0392B]">{rejectedChecks}</div>
        <div className="text-sm text-gray-500">Rejected Checks</div>
      </div>
      <div className="flex-1 px-2 text-center last:pr-0">
        <div className="mb-1 text-3xl font-bold text-gray-900">
          {String(pendingReviews).padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-500">Pending Reviews</div>
      </div>
    </div>
  );
}
