"use client";

import React from "react";
import { Sidebar } from "../../maindashboard/components/layout/Sidebar"
import { TopNav } from "../../maindashboard/components/layout/TopNav";
import { PageHeader } from "../../maindashboard/components/layout/PageHeader";
import { PeriodDropdown } from "../components/common/PeriodDropdown";
import {
  StatCard,
  GrnQualityCard,
  SupplierPerformanceCard,
  ProductionPipelineCard,
  WastageCard,
} from "../components/supply-chain";
import { SUPPLY_CHAIN_SIDEBAR } from "../constants/supply-chain.constants";
import {
  GRN_QUALITY,
  PRODUCTION_PIPELINE,
  SUPPLIER_PERFORMANCE,
  SUPPLY_CHAIN_MANAGER_USER,
  SUPPLY_CHAIN_STATS,
  WASTAGE,
} from "../constants/supply-chain.constants";

const PRODUCTION_CENTER_LABEL = `${PRODUCTION_PIPELINE[0].value}%`;

/**
 * Same shell as FinancialDashboard / SalesDashboard: flush white sidebar,
 * plain #F4F5F7 page background, standard flex layout with px-8 content
 * padding. No absolute positioning, no nested rounded wrappers — one
 * consistent shell reused across every department page.
 */
export default function SupplyChainDashboard() {
  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={SUPPLY_CHAIN_SIDEBAR.menuLabel} items={SUPPLY_CHAIN_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={SUPPLY_CHAIN_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex items-center justify-between">
            <PageHeader title="Supply Chain Dashboard" />
            <PeriodDropdown label="The Quarter" />
          </div>

          <div className="mb-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {SUPPLY_CHAIN_STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <GrnQualityCard title="Ordered vs Received quality (Recent GRNs)" data={GRN_QUALITY} />
            <SupplierPerformanceCard
              title="Suppler Performance - On time vs Late Delivery"
              entries={SUPPLIER_PERFORMANCE}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ProductionPipelineCard
              title="Production Order Piplines"
              slices={PRODUCTION_PIPELINE}
              centerLabel={PRODUCTION_CENTER_LABEL}
            />
            <WastageCard title="Bill of Material - expected vs actual wastage %" data={WASTAGE} />
          </div>
        </div>
      </main>
    </div>
  );
}
