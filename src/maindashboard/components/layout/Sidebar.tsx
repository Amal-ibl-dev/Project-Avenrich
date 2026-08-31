import React from "react";
import { LayoutGrid, Leaf } from "lucide-react";
import { DEPARTMENT_NAV_ITEMS, GENERAL_NAV_ITEMS } from "../../constants/dashboard.constants";

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col justify-between bg-gray-100 px-5 py-6 md:flex">
      <div>
        <div className="mb-8 px-1">
          <div className="flex items-center gap-1 text-xl font-bold text-[#1E5631]">
            <Leaf size={20} className="text-[#2ECC71]" />
            Avenrich
          </div>
          <div className="-mt-1 ml-6 text-[10px] tracking-wide text-gray-100">
            Life&apos;s Best Beverage 
          </div>
        </div>

        <div className="mb-2 px-2 text-xs font-medium text-gray-500">Menu</div>
        <nav className="mb-6 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-xl bg-[#EAF6EE] px-3 py-2.5 text-1xl font-medium text-[#074a1d]">
            <LayoutGrid size={18} />
            Dashboard
          </button>
          {DEPARTMENT_NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-1xl text-gray-500 transition-colors hover:bg-gray-50"
            >
              <item.icon size={18} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="mb-2 px-2 text-xs font-medium text-gray-400">General</div>
        <nav className="space-y-1">
          {GENERAL_NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-50"
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
