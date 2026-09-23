"use client";

import React from "react";
import { Sidebar } from "../../../shared/components/layout/Sidebar"
import { TopNav } from "../../../shared/components/layout/TopNav";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { PeriodDropdown } from "../../../shared/components/ui/PeriodDropdown"
import {
  StatCard,
  TotalsBar,
  AgingCard,
  CashFlowCard,
  NetCashFlowCard,
} from "../components/overview/index";
import {
  CASH_FLOW_WEEKS,
  FINANCE_MANAGER_USER,
  FINANCIAL_OVERVIEW_SIDEBAR,
  FINANCIAL_STATS,
  NET_CASH_FLOW,
  PAYABLE_AGING,
  RECEIVABLE_AGING,
  TOTALS_BAR,
} from "../constants/financial-overview.constants";

/**
 * Same shell as FinancialDashboard / SalesDashboard / SupplyChainDashboard:
 * flush white sidebar, #F4F5F7 page background, standard flex layout.
 */
export default function FinancialOverviewPage() {
  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar
        menuLabel={FINANCIAL_OVERVIEW_SIDEBAR.menuLabel}
        items={FINANCIAL_OVERVIEW_SIDEBAR.items}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={FINANCE_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex items-center justify-between">
            <PageHeader title="Finacial Overview" />
            <PeriodDropdown label="The Quarter" />
          </div>

          <div className="mb-5 flex flex-col gap-4 lg:flex-row">
            {FINANCIAL_STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          <div className="mb-5">
            <TotalsBar items={TOTALS_BAR} />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <AgingCard title="Receivable aging" rows={RECEIVABLE_AGING} />
              <AgingCard title="Payable aging" rows={PAYABLE_AGING} />
            </div>

            <div className="flex flex-col gap-5">
              <CashFlowCard title="Cash Inflow  vs Outflow" weeks={CASH_FLOW_WEEKS} />
              <NetCashFlowCard rows={NET_CASH_FLOW} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
