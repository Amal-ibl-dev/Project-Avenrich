import React from "react";
import { DualBarChart } from "../charts/DualBarChart";
import type { WastagePoint } from "../../types/supply-chain.types";

interface WastageCardProps {
  title: string;
  data: WastagePoint[];
}

export function WastageCard({ title, data }: WastageCardProps) {
  const chartData = data.map((d) => ({
    label: d.categoryLabel,
    valueA: d.expected,
    valueB: d.actual,
  }));

  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <DualBarChart
        data={chartData}
        colorA="#2ECC9A"
        colorB="#6EE7C4"
        legendA="Expected"
        legendB="Actual"
      />
    </div>
  );
}
