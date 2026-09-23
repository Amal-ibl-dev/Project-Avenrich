"use client";

import React from "react";
import { Mail, Plus } from "lucide-react";
import { Sidebar } from "../../../shared/components/layout/Sidebar";
import { TopNav } from "../../../shared/components/layout/TopNav";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import {
  HeroStatsCard,
  StockFlowCard,
  TeaStockCard,
  StockSplitCard,
  StockValueCard,
  LowStockAlertCard,
  StockRegisterTable,
} from "../components/index";
import {
  INVENTORY_HERO_STATS,
  INVENTORY_MANAGER_USER,
  INVENTORY_SIDEBAR,
  LOW_STOCK_ALERTS,
  STOCK_FLOW,
  STOCK_REGISTER,
  STOCK_SPLIT,
  STOCK_VALUE_BY_SUBCATEGORY,
  TEA_STOCK,
} from "../constants/inventory.constants";

/**
 * "Scroll with parent": only the content column below the header has
 * overflow-y-auto. No card (including StockRegisterTable) has its own
 * nested scroll area — everything grows to natural height and the page
 * scrolls as one piece.
 *
 * PageHeader's `action` prop only supports a single button, and this page
 * needs two (E-mail + New Inventory), so the two buttons are rendered
 * directly here instead of extending the shared component's API for a
 * one-off case.
 */
export default function InventoryDashboardPage() {
  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={INVENTORY_SIDEBAR.menuLabel} items={INVENTORY_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={INVENTORY_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex items-center justify-between">
            <PageHeader title="Inventory Department" />
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-full bg-[#1E5631] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#164124]">
                <Mail size={16} />
                E-mail
              </button>
              <button className="flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50">
                <Plus size={16} />
                New Inventory
              </button>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <HeroStatsCard
                totalStockValue={INVENTORY_HERO_STATS.totalStockValue}
                activeLowStocks={INVENTORY_HERO_STATS.activeLowStocks}
                inProgressOrders={INVENTORY_HERO_STATS.inProgressOrders}
              />
            </div>
            <StockSplitCard title="Stock Split by category" slices={STOCK_SPLIT} />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <StockFlowCard title="Inventory  Transactions In Stock In Vs Out Stock" data={STOCK_FLOW} />
            </div>
            <StockValueCard title="Stock Value by sub-category" rows={STOCK_VALUE_BY_SUBCATEGORY} />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TeaStockCard title="Tea Stock by Type (KG)" data={TEA_STOCK} />
            </div>
            <LowStockAlertCard title="Low Stock & Expiry Alert" rows={LOW_STOCK_ALERTS} />
          </div>

          <StockRegisterTable title="Stock Register" rows={STOCK_REGISTER} />
        </div>
      </main>
    </div>
  );
}
