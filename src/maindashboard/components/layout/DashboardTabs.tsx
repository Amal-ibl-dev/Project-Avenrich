
import React from "react";
import type { DashboardTab } from "../../types/dashboard.types";

interface DashboardTabsProps {
  tabs: DashboardTab[];
  activeTab: DashboardTab;
  onChange: (tab: DashboardTab) => void;
}

export function DashboardTabs({ tabs, activeTab, onChange }: DashboardTabsProps) {
  return (
    <div className="mb-6 mt-4 flex items-center gap-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`pb-3 text-sm transition-colors ${
              isActive
                ? "border-b-2 border-[#1E5631] font-semibold text-[#1E5631]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
