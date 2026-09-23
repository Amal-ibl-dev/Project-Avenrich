"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  Download,
  Hourglass,
  Leaf,
  Plus,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { ListPageShell } from "../../../shared/components/layout/ListPageShell";
import { ActionButton } from "../../../shared/components/ui/ActionButton";
import { RowActionButton } from "../../../shared/components/ui/RowActionButton";
import { StatusBadge, type BadgeVariant } from "../../../shared/components/ui/StatusBadge";
import { StockApplicationModal, type StockApplicationPayload } from "../types/components/StockApplicationModal";
import {
  INVENTORY_CATEGORY_OPTIONS,
  INVENTORY_ITEMS,
  INVENTORY_LIST_STATS,
  INVENTORY_MANAGER_USER,
  INVENTORY_SIDEBAR,
  INVENTORY_STATE_OPTIONS,
  INVENTORY_ZONE_OPTIONS,
} from "../constants/inventory.constants";
import type { InventoryItemRow, InventoryItemState, StockCategory } from "../types/inventory.types";

const STATE_LABELS: Record<InventoryItemState, string> = {
  IN_STOCK: "IN STOCK",
  LOW_STOCK: "LOW STOCK",
  OUT_STOCK: "OUT STOCK",
};

const STATE_VARIANTS: Record<InventoryItemState, BadgeVariant> = {
  IN_STOCK: "completed",
  LOW_STOCK: "pending",
  OUT_STOCK: "rejected",
};

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  hint,
  hintColor,
}: {
  icon: React.ComponentType<{ size?: number }>;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  hint: string;
  hintColor: string;
}) {
  return (
    <div className="flex-1 rounded-3xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon size={18} />
        </div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="mt-3 text-2xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 text-xs font-medium" style={{ color: hintColor }}>
        {hint}
      </div>
    </div>
  );
}

export default function InventoryListPage() {
  const [rows] = useState<InventoryItemRow[]>(INVENTORY_ITEMS);
  const [activeTab, setActiveTab] = useState<StockCategory>("Raw Material");
  const [zone, setZone] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (row.category !== activeTab) return false;
      if (zone && row.zoneBin !== zone) return false;
      if (category && row.category !== category) return false;
      if (state && STATE_LABELS[row.state] !== state) return false;
      if (expiredDate && row.expiredDate !== expiredDate) return false;
      return true;
    });
  }, [rows, activeTab, zone, category, state, expiredDate]);

  function handleCreate(payload: StockApplicationPayload) {
    // Mock-only: a real backend would persist this and refresh the list.
    console.log("New inventory item", payload);
  }

  return (
    <>
      <ListPageShell
        sidebar={INVENTORY_SIDEBAR}
        user={INVENTORY_MANAGER_USER}
        title="Inventory Items"
        actions={
          <>
            <ActionButton label="Export CSV" icon={Download} variant="outline" onClick={() => window.print()} />
            <ActionButton label="Add New Item" icon={Plus} variant="solid" onClick={() => setCreateOpen(true)} />
          </>
        }
      >
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={TrendingUp}
            iconBg="#EAF6EE"
            iconColor="#1E5631"
            label="Daily Turnover"
            value={INVENTORY_LIST_STATS.dailyTurnoverUnits}
            hint={INVENTORY_LIST_STATS.dailyTurnoverChange}
            hintColor="#1E5631"
          />
          <StatCard
            icon={TriangleAlert}
            iconBg="#FDECEC"
            iconColor="#D64545"
            label="Low Stock Alert"
            value={INVENTORY_LIST_STATS.lowStockAlertSkus}
            hint="Requires re-order soon"
            hintColor="#6B7280"
          />
          <StatCard
            icon={Hourglass}
            iconBg="#FEF6E4"
            iconColor="#B98A00"
            label="EXPIRING (30D)"
            value={INVENTORY_LIST_STATS.expiringItems}
            hint="Review rotation policy"
            hintColor="#B98A00"
          />
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-6 border-b border-gray-100 pb-3">
            {(["Finished Goods", "Raw Material", "Work in Progress"] as StockCategory[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-1 text-sm transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-[#1E5631] font-semibold text-[#1E5631]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Zone</label>
              <select
                value={zone}
                onChange={(event) => setZone(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
              >
                <option value="">All Zones</option>
                {INVENTORY_ZONE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Category</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
              >
                <option value="">All Category</option>
                {INVENTORY_CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">State</label>
              <select
                value={state}
                onChange={(event) => setState(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
              >
                <option value="">All Statues</option>
                {INVENTORY_STATE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Expired Date</label>
              <div className="flex items-center rounded-xl border border-gray-200 bg-white pr-3">
                <input
                  value={expiredDate}
                  onChange={(event) => setExpiredDate(event.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                />
                <Calendar size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  {["Stock Name", "Product Name", "Zone/Bin", "Quantity", "Unit", "State", "Expired Date", "Action"].map(
                    (col, i, arr) => (
                      <th
                        key={col}
                        className={`bg-gradient-to-r from-[#1E5631] to-[#123A20] px-4 py-3 text-left font-medium text-white ${
                          i === 0 ? "rounded-l-xl" : ""
                        } ${i === arr.length - 1 ? "rounded-r-xl" : ""}`}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-4 font-medium text-gray-800">{row.stockCode}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF6EE] text-[#1E5631]">
                          <Leaf size={16} />
                        </span>
                        <div>
                          <div className="font-medium text-gray-800">{row.productName}</div>
                          <div className="text-xs text-gray-400">{row.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">{row.zoneBin}</td>
                    <td className="px-4 py-4 text-gray-700">{row.quantityLabel}</td>
                    <td className="px-4 py-4 text-gray-700">{row.unitsLabel}</td>
                    <td className="px-4 py-4">
                      <StatusBadge label={STATE_LABELS[row.state]} variant={STATE_VARIANTS[row.state]} />
                    </td>
                    <td className="px-4 py-4 text-gray-700">{row.expiredDate}</td>
                    <td className="px-4 py-4">
                      <RowActionButton label={`Open ${row.stockCode}`} />
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                      No items match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </ListPageShell>

      <StockApplicationModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
        initialTab={activeTab}
      />
    </>
  );
}
