import React from "react";
import { DualBarChart } from "../../../shared/components/charts/DualBarChart/DualBarChart"
import { SectionHeaderLink } from "../../../shared/components/ui/SectionHeaderLink";
import type { TeaStockPoint } from "../types/inventory.types";

interface TeaStockCardProps {
  title: string;
  data: TeaStockPoint[];
  onSeeAll?: () => void;
}

export function TeaStockCard({ title, data, onSeeAll }: TeaStockCardProps) {
  const chartData = data.map((d) => ({ label: d.categoryLabel, valueA: d.auction, valueB: d.privateSales }));

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <SectionHeaderLink title={title} onSeeAll={onSeeAll} />
      <DualBarChart
        data={chartData}
        colorA="#123A20"
        colorB="#2ECC71"
        legendA="Auction"
        legendB="Private Sales"
        maxHeightPx={220}
        barWidthPx={40}
        gapBetweenGroupsPx={60}
      />
    </div>
  );
}
