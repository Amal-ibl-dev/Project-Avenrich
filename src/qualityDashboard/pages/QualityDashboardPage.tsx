"use client";

import React from "react";
import { Mail, Plus } from "lucide-react";
import { Sidebar } from "../../maindashboard/components/layout/Sidebar"
import { TopNav } from "../../maindashboard/components/layout/TopNav";
import { PageHeader } from "../../maindashboard/components/layout/PageHeader";
import { TopRawMaterialCard } from "../../blend-overview/components/blend"
import {
  QualityHeroStatsCard,
  QualityTrendCard,
  AttributePassRateCard,
  CheckReportTypeCard,
  RejectedItemsCard,
  RecentQualityChecksTable,
} from "../components/quality";
import {
  BLEND_ATTRIBUTE_PASS_RATE,
  CHECK_REPORT_TYPE,
  CHECK_REPORT_TYPE_CENTER,
  QUALITY_HERO_STATS,
  QUALITY_MANAGER_USER,
  QUALITY_SIDEBAR,
  QUALITY_STOCK_VALUE,
  QUALITY_TREND,
  RECENT_QUALITY_CHECKS,
  REJECTED_ITEMS,
} from "../constants/quality.constants";

/**
 * "Scroll with parent": only the content column has overflow-y-auto.
 * RecentQualityChecksTable has no internal scroll — it grows to its
 * natural height and the page carries it in one continuous scroll.
 *
 * "Stock Value by sub-category" reuses TopRawMaterialCard from the Blend
 * page as-is — its teal-to-dark-green gradient bars are exactly this
 * widget's visual style, so no new component was needed for it.
 */
export default function QualityDashboardPage() {
  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={QUALITY_SIDEBAR.menuLabel} items={QUALITY_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={QUALITY_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex items-center justify-between">
            <PageHeader title="Quality Dashboard" />
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-full bg-[#1E5631] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#164124]">
                <Mail size={16} />
                E-mail
              </button>
              <button className="flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50">
                <Plus size={16} />
                Create Quality Report
              </button>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <QualityHeroStatsCard
                totalQualityCheck={QUALITY_HERO_STATS.totalQualityCheck}
                approvalRate={QUALITY_HERO_STATS.approvalRate}
                rejectedChecks={QUALITY_HERO_STATS.rejectedChecks}
                pendingReviews={QUALITY_HERO_STATS.pendingReviews}
              />
            </div>
            <CheckReportTypeCard
              title="Check Report Type"
              slices={CHECK_REPORT_TYPE}
              centerLabel={CHECK_REPORT_TYPE_CENTER}
            />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <QualityTrendCard title="Quality Trend- Approved vs rejected checks per week" data={QUALITY_TREND} />
            </div>
            <TopRawMaterialCard title="Stock Value by sub-category" rows={QUALITY_STOCK_VALUE} />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AttributePassRateCard title="Blend Attribute pass rate" rows={BLEND_ATTRIBUTE_PASS_RATE} />
            </div>
            <RejectedItemsCard title="Rejected Items Requiring Action" items={REJECTED_ITEMS} />
          </div>

          <RecentQualityChecksTable title="Recent Quality Checks" rows={RECENT_QUALITY_CHECKS} />
        </div>
      </main>
    </div>
  );
}
