import React from "react";
import { Lightbulb } from "lucide-react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "../../../shared/theme/theme.constants";
import type { CashFlowPoint } from "../types/dashboard.types";

interface CashInflowOutflowProps {
  data: CashFlowPoint[];
  insightMonth: string;
  saveByMonth: string;
}

export function CashInflowOutflow({ data, insightMonth, saveByMonth }: CashInflowOutflowProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-800">Cash Inflow &amp; Outflow</h3>

      <div className="mb-2 flex items-center gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.emerald }} />
          Cash Inflow
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.indigo }} />
          Cash Outflow
        </span>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}>
            <XAxis dataKey="month" hide />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="inflow"
              stroke={COLORS.emerald}
              strokeWidth={2}
              dot={{ r: 3, fill: "#fff", stroke: COLORS.emerald, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="outflow"
              stroke={COLORS.indigo}
              strokeWidth={2}
              dot={{ r: 3, fill: "#fff", stroke: COLORS.indigo, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="mt-3 flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs leading-relaxed text-gray-600"
        style={{ background: COLORS.insightBg }}
      >
        <Lightbulb size={16} className="mt-0.5 flex-shrink-0" style={{ color: COLORS.skyBlue }} />
        <span>
          Expecting{" "}
          <span className="font-medium" style={{ color: COLORS.skyBlue }}>
            deficit in {insightMonth}
          </span>
          . Consider saving more in {saveByMonth}
        </span>
      </div>
    </div>
  );
}
