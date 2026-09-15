import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { DonutSlice } from "../../../types/blend.types";

interface DonutWithLegendProps {
  slices: DonutSlice[];
  centerLabel: string;
  size?: number;
}

/**
 * Donut chart with the legend on the left (dot, label, bold percent stacked
 * per row) and a bold percentage in the donut's center hole. Reused by both
 * "Blend Status" (4 slices) and "Material Allocation" (2 slices).
 */
export function DonutWithLegend({ slices, centerLabel, size = 160 }: DonutWithLegendProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-3">
        {slices.map((slice) => (
          <div key={slice.id} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ background: slice.color }}
            />
            <div>
              <div className="text-gray-700">{slice.label}</div>
              <div className="font-semibold text-gray-900">{slice.percent}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="percent"
              nameKey="label"
              innerRadius={size * 0.32}
              outerRadius={size * 0.46}
              paddingAngle={4}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {slices.map((slice) => (
                <Cell key={slice.id} fill={slice.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{centerLabel}</span>
        </div>
      </div>
    </div>
  );
}
