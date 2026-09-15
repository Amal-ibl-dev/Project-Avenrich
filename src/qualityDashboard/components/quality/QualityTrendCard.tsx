import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { SectionHeaderLink } from "../../../inventoryDashboard/components/common/SectionHeaderLink";
import type { QualityTrendPoint } from "../../types/quality.types";

interface QualityTrendCardProps {
  title: string;
  data: QualityTrendPoint[];
  onSeeAll?: () => void;
}

const APPROVED_COLOR = "#2ECC71";
const REJECTED_COLOR = "#E8C547";

export function QualityTrendCard({ title, data, onSeeAll }: QualityTrendCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <SectionHeaderLink title={title} onSeeAll={onSeeAll} />

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="approvedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={APPROVED_COLOR} stopOpacity={0.3} />
                <stop offset="100%" stopColor={APPROVED_COLOR} stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="rejectedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={REJECTED_COLOR} stopOpacity={0.3} />
                <stop offset="100%" stopColor={REJECTED_COLOR} stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 10, 20, 30]}
              domain={[0, 30]}
            />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="approved"
              stroke={APPROVED_COLOR}
              strokeWidth={2}
              fill="url(#approvedFill)"
            />
            <Area
              type="monotone"
              dataKey="rejected"
              stroke={REJECTED_COLOR}
              strokeWidth={2}
              fill="url(#rejectedFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
