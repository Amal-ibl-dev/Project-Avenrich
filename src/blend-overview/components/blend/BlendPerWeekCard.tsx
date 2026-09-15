import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { BlendPerWeekPoint } from "../../types/blend.types";

interface BlendPerWeekCardProps {
  title: string;
  data: BlendPerWeekPoint[];
}

const INDIGO = "#6C4AB6";

export function BlendPerWeekCard({ title, data }: BlendPerWeekCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="blendPerWeekFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={INDIGO} stopOpacity={0.35} />
                <stop offset="100%" stopColor={INDIGO} stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              interval={1}
              tickFormatter={(value: string) => value.replace("week 0", "Week ")}
            />
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
              dataKey="count"
              stroke={INDIGO}
              strokeWidth={2}
              fill="url(#blendPerWeekFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
