import React from "react";
import { ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { ProductionSlice } from "../../types/dashboard.types";

interface ProductionOrderProps {
  slices: ProductionSlice[];
  centerLabel: string;
}

export function ProductionOrder({ slices, centerLabel }: ProductionOrderProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Production Order</h3>
        <button className="flex items-center gap-1 rounded-full bg-[#EAF6EE] px-3 py-1.5 text-xs font-medium text-[#1E5631]">
          Transaction
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative h-32 w-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="label"
                innerRadius={42}
                outerRadius={62}
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
            <span className="text-xl font-bold text-gray-900">{centerLabel}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {slices.map((slice) => (
            <div key={slice.id} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: slice.color }}
              />
              <span className="text-gray-600">{slice.label}</span>
              <span className="font-semibold text-gray-900">{slice.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
