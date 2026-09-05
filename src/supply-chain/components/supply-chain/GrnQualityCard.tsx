import React from "react";
import { DualBarChart } from "../charts/DualBarChart";
import { COLORS } from "../../../maindashboard/constants/theme.constants"
import type { GrnQualityPoint } from "../../types/supply-chain.types";

interface GrnQualityCardProps {
  title: string;
  data: GrnQualityPoint[];
}

export function GrnQualityCard({ title, data }: GrnQualityCardProps) {
  const chartData = data.map((d) => ({ label: d.grnLabel, valueA: d.ordered, valueB: d.received }));

  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <DualBarChart
        data={chartData}
        colorA={COLORS.forestGreenDark}
        colorB="#5FBE72"
        legendA="Ordered"
        legendB="Received"
      />
    </div>
  );
}
