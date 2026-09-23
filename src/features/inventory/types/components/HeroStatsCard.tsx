import React from "react";

interface HeroStatsCardProps {
  totalStockValue: string;
  activeLowStocks: number;
  inProgressOrders: number;
}

/** Single wide card divided into three sections by vertical dividers. */
export function HeroStatsCard({ totalStockValue, activeLowStocks, inProgressOrders }: HeroStatsCardProps) {
  return (
    <div className="flex items-center divide-x divide-gray-200 rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex-1 px-2 text-center first:pl-0">
        <div className="mb-1 text-3xl font-bold text-[#1E5631]">{totalStockValue}</div>
        <div className="text-sm text-gray-500">Total Stock Value</div>
      </div>
      <div className="flex-1 px-2 text-center">
        <div className="mb-1 text-3xl font-bold text-[#C0392B]">
          {String(activeLowStocks).padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-500">Active Low Stocks</div>
      </div>
      <div className="flex-1 px-2 text-center last:pr-0">
        <div className="mb-1 text-3xl font-bold text-gray-900">
          {String(inProgressOrders).padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-500">InProgress Orders</div>
      </div>
    </div>
  );
}
