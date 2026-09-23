import React from "react";
import { StatusBadge } from "../../../shared/components/ui/StatusBadge";
import type { MaterialPendingIssue } from "../types/blend.types";

interface MaterialPendingIssuesCardProps {
  title: string;
  issues: MaterialPendingIssue[];
}

export function MaterialPendingIssuesCard({ title, issues }: MaterialPendingIssuesCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <div className="divide-y divide-gray-100">
        {issues.map((issue) => (
          <div key={issue.id} className="flex items-center justify-between py-3.5">
            <span className="text-gray-700">{issue.label}</span>
            <StatusBadge label={issue.pendingLabel} variant="pending" />
          </div>
        ))}
      </div>
    </div>
  );
}
