"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { PageHeader } from "./PageHeader";
import type { CurrentUser, SidebarConfig } from "../../types/navigation.types";

interface ListPageShellProps {
  sidebar: SidebarConfig;
  user: CurrentUser;
  title: string;
  /** Header buttons, e.g. Add Blend Order + Export Pdf. */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Flush sidebar, shared TopNav, plain background, title row with room for
 * one or more header actions. Originally written just for the supply-chain
 * list pages (which is why it briefly lived under features/supply-chain/);
 * promoted here once a second feature (blend) needed the same shell —
 * see docs/architecture.md §4/§5 on moving something to shared/ the moment
 * a second feature needs it.
 */
export function ListPageShell({ sidebar, user, title, actions, children }: ListPageShellProps) {
  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={sidebar.menuLabel} items={sidebar.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={user} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <PageHeader title={title} />
            <div className="flex flex-wrap items-center gap-3">{actions}</div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
