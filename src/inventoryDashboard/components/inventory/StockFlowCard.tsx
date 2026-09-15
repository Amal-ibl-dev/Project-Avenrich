import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { SectionHeaderLink } from "../common/SectionHeaderLink";
import type { StockFlowPoint } from "../../types/inventory.types";

interface StockFlowCardProps {
  title: string;
  data: StockFlowPoint[];
  onSeeAll?: () => void;
}

const IN_STOCK_COLOR = "#4F7DF3";
const OUT_STOCK_COLOR = "#C44FE0";

export function StockFlowCard({ title, data, onSeeAll }: StockFlowCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <SectionHeaderLink title={title} onSeeAll={onSeeAll} />

      <div className="mb-2 flex justify-end gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: IN_STOCK_COLOR }} />
          In Stock
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: OUT_STOCK_COLOR }} />
          Out Stock
        </span>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="inStockFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={IN_STOCK_COLOR} stopOpacity={0.35} />
                <stop offset="100%" stopColor={IN_STOCK_COLOR} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="outStockFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={OUT_STOCK_COLOR} stopOpacity={0.3} />
                <stop offset="100%" stopColor={OUT_STOCK_COLOR} stopOpacity={0.04} />
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
              dataKey="inStock"
              stroke={IN_STOCK_COLOR}
              strokeWidth={2}
              fill="url(#inStockFill)"
            />
            <Area
              type="monotone"
              dataKey="outStock"
              stroke={OUT_STOCK_COLOR}
              strokeWidth={2}
              fill="url(#outStockFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
