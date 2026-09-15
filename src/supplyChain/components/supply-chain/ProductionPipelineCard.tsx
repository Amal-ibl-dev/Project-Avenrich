import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { ProductionPipelineSlice } from "../../types/supply-chain.types";

interface ProductionPipelineCardProps {
  title: string;
  slices: ProductionPipelineSlice[];
  centerLabel: string;
}

export function ProductionPipelineCard({ title, slices, centerLabel }: ProductionPipelineCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-gray-900">{title}</h3>

      <div className="flex items-center gap-8">
        <div className="relative h-40 w-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="label"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={3}
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
            <span className="text-2xl font-bold text-[#123A20]">{centerLabel}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {slices.map((slice) => (
            <div key={slice.id} className="flex items-start gap-2.5">
              <span
                className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: slice.color }}
              />
              <div>
                <div className="text-sm text-gray-500">{slice.label}</div>
                <div className="text-base font-bold text-gray-900">{slice.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
