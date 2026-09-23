"use client";

import React from "react";
import { Sidebar } from "../../../../shared/components/layout/Sidebar";
import { TopNav } from "../../../../shared/components/layout/TopNav";
import { PageHeader } from "../../../../shared/components/layout/PageHeader";
import { FilterButton } from "./FilterButton"
import {
  SUPPLY_CHAIN_MANAGER_USER,
  SUPPLY_CHAIN_SIDEBAR,
} from "../../constants/supply-chain.constants"

interface ListPageShellProps {
  title: string;
  /** Header buttons, e.g. Add Supplier + Export Pdf. */
  actions?: React.ReactNode;
  /** Shows the Filter pill beside the header actions. */
  showFilter?: boolean;
  onFilterClick?: () => void;
  activeFilterCount?: number;
  children: React.ReactNode;
}

/**
 * Same shell as SupplyChainDashboard — flush sidebar, shared TopNav, plain
 * #F4F5F7 background — with a title row that carries the page's own actions.
 * All five list pages render through this so the chrome is defined once.
 */
export function ListPageShell({
  title,
  actions,
  showFilter = false,
  onFilterClick,
  activeFilterCount = 0,
  children,
}: ListPageShellProps) {
  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={SUPPLY_CHAIN_SIDEBAR.menuLabel} items={SUPPLY_CHAIN_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={SUPPLY_CHAIN_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <PageHeader title={title} />
            <div className="flex flex-wrap items-center gap-3">
              {showFilter ? (
                <FilterButton onClick={onFilterClick} activeCount={activeFilterCount} />
              ) : null}
              {actions}
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
