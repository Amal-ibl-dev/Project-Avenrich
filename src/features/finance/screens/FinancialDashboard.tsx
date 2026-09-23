"use client";

import React, { useState } from "react";
import { Sidebar } from "../../../shared/components/layout/Sidebar";
import { TopNav } from "../../../shared/components/layout/TopNav";
import { DashboardTabs } from "../components/DashboardTabs";
import { DashboardHeader } from "../components/DashboardHeader";
import { MetricsCard } from "../components/MetricsCard";
import { CapsuleBarChart } from "../components/charts/CapsuleBarChart/index";
import { IncomeOverview } from "../components/IncomeOverview";
import { ProductionOrder } from "../components/ProductionOrder";
import { CashInflowOutflow } from "../components/CashInflowOutflow";
import {
  CASH_FLOW,
  DASHBOARD_TABS,
  DEFAULT_ACTIVE_MONTH,
  INCOME_SEGMENTS,
  METRICS,
  MONTHLY_FLOW,
  PRODUCTION_SLICES,
} from "../constants/dashboard.constants";
import { FINANCIAL_SIDEBAR } from "../../../shared/constants/navigation.constants";
import type { DashboardPeriod, DashboardTab } from "../types/dashboard.types";

const PERIODS: DashboardPeriod[] = ["Weekly", "Month", "Yearly"];
const INCOME_TOTAL = INCOME_SEGMENTS.reduce((sum, s) => sum + s.amount, 0);
const PRODUCTION_CENTER_LABEL = `${PRODUCTION_SLICES[0].value}%`;

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Financial");
  const [activePeriod, setActivePeriod] = useState<DashboardPeriod>("Month");

  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={FINANCIAL_SIDEBAR.menuLabel} items={FINANCIAL_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <DashboardHeader
            title="Financial Analytics"
            periods={PERIODS}
            activePeriod={activePeriod}
            onPeriodChange={setActivePeriod}
            year={2026}
          />

          <DashboardTabs tabs={DASHBOARD_TABS} activeTab={activeTab} onChange={setActiveTab} />

          <div className="mb-5 flex flex-col gap-5 lg:flex-row">
            <MetricsCard metrics={METRICS} />

            <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
              <CapsuleBarChart data={MONTHLY_FLOW} defaultActiveMonth={DEFAULT_ACTIVE_MONTH} />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <IncomeOverview total={INCOME_TOTAL} segments={INCOME_SEGMENTS} />
            <ProductionOrder slices={PRODUCTION_SLICES} centerLabel={PRODUCTION_CENTER_LABEL} />
            <CashInflowOutflow data={CASH_FLOW} insightMonth="Aug" saveByMonth="July" />
          </div>
        </div>
      </main>
    </div>
  );
}
