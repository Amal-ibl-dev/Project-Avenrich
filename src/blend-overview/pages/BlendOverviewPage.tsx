"use client";

import React from "react";
import { Sidebar } from "../../maindashboard/components/layout/Sidebar"
import { TopNav } from "../../maindashboard/components/layout/TopNav";
import { PageHeader } from "../../maindashboard/components/layout/PageHeader";
import { PeriodDropdown } from "../../supply-chain/components/common/PeriodDropdown"
import { DonutWithLegend } from "../components/charts/DonutWithLegend";
import {
  StatCard,
  BlendVolumeCard,
  MaterialPendingIssuesCard,
  TopRawMaterialCard,
  BlendPerWeekCard,
  RecentBlendTable,
} from "../components/blend";
import {
  BLEND_MATERIAL_MANAGER_USER,
  BLEND_PER_WEEK,
  BLEND_SIDEBAR,
  BLEND_STATS,
  BLEND_STATUS_CENTER,
  BLEND_STATUS_SLICES,
  BLEND_VOLUME,
  MATERIAL_ALLOCATION_CENTER,
  MATERIAL_ALLOCATION_SLICES,
  MATERIAL_PENDING_ISSUES,
  RECENT_BLENDS,
  TOP_RAW_MATERIAL,
} from "../constants/blend.constants";

/**
 * Layout note ("scroll with parent"): only the outer content column
 * (`overflow-y-auto` below) scrolls. No individual card, table, or chart
 * has its own nested scroll container — the Recent Blend table and every
 * widget just grow to their natural height and the whole page scrolls
 * together, so momentum/scrollbar behavior is a single continuous scroll
 * rather than scrolling being "trapped" inside a card.
 */
export default function BlendOverviewPage() {
  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={BLEND_SIDEBAR.menuLabel} items={BLEND_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={BLEND_MATERIAL_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex items-center justify-between">
            <PageHeader title="Blend Overview" />
            <PeriodDropdown label="The Quarter" />
          </div>

          <div className="mb-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {BLEND_STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-lg font-bold text-gray-900">Blend Status</h3>
                <DonutWithLegend slices={BLEND_STATUS_SLICES} centerLabel={BLEND_STATUS_CENTER} />
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-lg font-bold text-gray-900">Material Allocation</h3>
                <DonutWithLegend
                  slices={MATERIAL_ALLOCATION_SLICES}
                  centerLabel={MATERIAL_ALLOCATION_CENTER}
                />
              </div>

              <TopRawMaterialCard title="Top Raw Material Allocated" rows={TOP_RAW_MATERIAL} />
            </div>

            <div className="flex flex-col gap-5">
              <BlendVolumeCard title="Blend Volume Product (KG)" bars={BLEND_VOLUME} />
              <MaterialPendingIssuesCard title="Material Pending Issues" issues={MATERIAL_PENDING_ISSUES} />
              <BlendPerWeekCard title="Blend Created Per week" data={BLEND_PER_WEEK} />
            </div>
          </div>

          <RecentBlendTable title="Recent Blend" rows={RECENT_BLENDS} />
        </div>
      </main>
    </div>
  );
}
