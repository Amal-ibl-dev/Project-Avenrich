// import React from "react";
// import { Leaf } from "lucide-react";
// import { GENERAL_NAV_ITEMS } from "../../constants/dashboard.constants";
// import type { NavItem } from "../../types/dashboard.types";
// import { COLORS } from "../../constants/theme.constants";

// interface SidebarProps {
//   /** Label shown above the module's nav items, e.g. "Menu". */
//   menuLabel?: string;
//   /** This department/module's nav items, in order. */
//   items: NavItem[];
//   /** `label` of the currently active item — matched against `items[].label`. */
//   activeLabel: string;
//   onNavigate?: (item: NavItem) => void;
// }

// /**
//  * Left sidebar navigation. Deliberately data-driven (`items` + `activeLabel`)
//  * rather than hardcoded, so every department page (Financial, Sales, Tea, ...)
//  * reuses the same component with its own menu config.
//  */
// export function Sidebar({ menuLabel = "Menu", items, activeLabel, onNavigate }: SidebarProps) {
//   return (
//     <aside className="hidden w-72 h-[928px] mt-[24px] mb-6 rounded-4xl flex-shrink-0 flex-col justify-between bg-[#F0F0F0] px-5 py-6 md:flex">
//       <div>
//         <div className="mb-8 px-1">
//           <div className="flex items-center gap-1 text-xl font-bold text-[#1E5631]">
//             <Leaf size={20} className="text-[#2ECC71]" />
//             Avenrich
//           </div>
//           <div className="-mt-1 ml-6 text-[10px] tracking-wide text-gray-400">
//             Life&apos;s Best Beverage
//           </div>
//         </div>

//         <div className="mb-2 px-2 text-xs font-medium text-black">{menuLabel}</div>
//         <nav className="mb-6 space-y-1">
//           {items.map((item) => {
//             const isActive = item.label === activeLabel;
//             return (
//               <button
//                 key={item.label}
//                 onClick={() => onNavigate?.(item)}
//                 className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
//                   isActive
//                     ? "bg-[#EAF6EE] font-medium text-[#1E5631]"
//                     : "text-gray-500 hover:bg-gray-50"
//                 }`}
//                 aria-current={isActive ? "page" : undefined}
//               >
//                 <item.icon size={18} />
//                 <span className="truncate">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       <div>
//         <div className="mb-2 px-2 text-xs font-medium text-gray-400">General</div>
//         <nav className="space-y-1">
//           {GENERAL_NAV_ITEMS.map((item) => (
//             <button
//               key={item.label}
//               className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-50"
//             >
//               <item.icon size={18} />
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { GENERAL_NAV_ITEMS } from "../../constants/dashboard.constants";
import type { NavItem } from "../../types/dashboard.types";

interface SidebarProps {
  menuLabel?: string;
  items: NavItem[];
}

/**
 * Left sidebar navigation for the Next.js App Router version of the app.
 *
 * Must be a Client Component ("use client") because `usePathname()` reads
 * browser navigation state. Active-state styling is derived by comparing
 * each item's `path` to the current URL — no `activeLabel` prop needed,
 * so it stays correct on back/forward nav or a bookmarked link.
 */
export function Sidebar({ menuLabel = "Menu", items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col justify-between bg-white px-5 py-6 md:flex">
      <div>
        <div className="mb-8 px-1">
          <div className="flex items-center gap-1 text-xl font-bold text-[#1E5631]">
            <Leaf size={20} className="text-[#2ECC71]" />
            Avenrich
          </div>
          <div className="-mt-1 ml-6 text-[10px] tracking-wide text-gray-400">
            Life&apos;s Best Beverage
          </div>
        </div>

        <div className="mb-2 px-2 text-xs font-medium text-gray-400">{menuLabel}</div>
        <nav className="mb-6 space-y-1">
          {items.map((item) => {
            // Exact match for top-level dashboards, prefix match for nested routes.
            const isActive =
              item.path === "/financial" || item.path === "/sales"
                ? pathname === item.path
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-[#EAF6EE] font-medium text-[#1E5631]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <item.icon size={18} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
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
