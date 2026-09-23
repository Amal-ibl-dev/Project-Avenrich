import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { StockSplitSlice } from "../types/inventory.types";

interface StockSplitCardProps {
  title: string;
  slices: StockSplitSlice[];
}

/**
 * Donut chart whose legend sits to the right of the ring (label bold,
 * percent below in gray) rather than the center-label style used
 * elsewhere. Any slice with `hatched: true` fills with a diagonal-line SVG
 * pattern instead of a solid color, matching "Working Progress" in the
 * reference design.
 */
export function StockSplitCard({ title, slices }: StockSplitCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-bold text-gray-900">{title}</h3>

      <div className="flex items-center gap-6">
        <div className="relative h-40 w-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <pattern
                  id="stockSplitHatch"
                  patternUnits="userSpaceOnUse"
                  width="6"
                  height="6"
                  patternTransform="rotate(45)"
                >
                  <rect width="6" height="6" fill="#123A20" />
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeWidth="2.5" />
                </pattern>
              </defs>
              <Pie
                data={slices}
                dataKey="percent"
                nameKey="label"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={3}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {slices.map((slice) => (
                  <Cell key={slice.id} fill={slice.hatched ? "url(#stockSplitHatch)" : slice.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4">
          {slices.map((slice) => (
            <div key={slice.id} className="flex items-start gap-2.5">
              <span
                className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{
                  background: slice.hatched
                    ? "repeating-linear-gradient(45deg, #123A20 0px, #123A20 2px, #fff 2px, #fff 4px)"
                    : slice.color,
                }}
              />
              <div>
                <div className="text-sm font-semibold text-gray-900">{slice.label}</div>
                <div className="text-sm text-gray-500">{slice.percent}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
