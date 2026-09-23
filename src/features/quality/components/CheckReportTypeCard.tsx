import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { CheckReportSlice } from "../types/quality.types";

interface CheckReportTypeCardProps {
  title: string;
  slices: CheckReportSlice[];
  centerLabel: string;
}

/**
 * The two real slices rarely sum to 100 (58% + 24% = 82% here), so a third,
 * unlabeled "remainder" slice pads the ring to 100% using the page
 * background color — this reproduces the visual gap in the ring rather
 * than stretching the two real slices to fill the whole circle.
 */
export function CheckReportTypeCard({ title, slices, centerLabel }: CheckReportTypeCardProps) {
  const accountedFor = slices.reduce((sum, s) => sum + s.percent, 0);
  const remainder = Math.max(100 - accountedFor, 0);

  const pieData = [
    ...slices.map((s) => ({ id: s.id, percent: s.percent })),
    ...(remainder > 0 ? [{ id: "__remainder", percent: remainder }] : []),
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-bold text-gray-900">{title}</h3>

      <div className="flex items-center gap-6">
        <div className="relative h-40 w-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {slices.map((slice) => (
                  <linearGradient key={slice.id} id={`gradient-${slice.id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={slice.colorStart} />
                    <stop offset="100%" stopColor={slice.colorEnd} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={pieData}
                dataKey="percent"
                nameKey="id"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={3}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={entry.id === "__remainder" ? "#F4F5F7" : `url(#gradient-${entry.id})`}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{centerLabel}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {slices.map((slice) => (
            <div key={slice.id} className="flex items-start gap-2.5">
              <span
                className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: `linear-gradient(135deg, ${slice.colorStart}, ${slice.colorEnd})` }}
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
