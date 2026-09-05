import {
  LayoutGrid,
  ShoppingBag,
  Link2,
  Wallet,
  Leaf,
  ClipboardList,
  ShieldCheck,
  ListOrdered,
  FileBarChart,
  BarChart3,
  Users,
} from "lucide-react";
import type { SidebarConfig } from "../types/dashboard.types";

/**
 * Top-level department switcher shown on the Financial (and other
 * top-level) dashboards — one entry per department, plus "Dashboard" itself.
 * Every item's `path` maps 1:1 to a route registered in App.tsx.
 */
export const FINANCIAL_SIDEBAR: SidebarConfig = {
  menuLabel: "Menu",
  items: [
    { label: "Dashboard", icon: LayoutGrid, path: "/financial" },
    { label: "Sales Department", icon: ShoppingBag, path: "/sales" },
    { label: "Supply Chain Department", icon: Link2, path: "/supply-chain" },
    { label: "Financial Department", icon: Wallet, path: "/financial" },
    { label: "Tea Department", icon: Leaf, path: "/tea" },
    { label: "Inventory Department", icon: ClipboardList, path: "/inventory" },
    { label: "Quality Department", icon: ShieldCheck, path: "/quality" },
  ],
};

/**
 * Sub-navigation shown once you're inside the Sales Department —
 * its own dashboard, lists, and reports.
 */
export const SALES_SIDEBAR: SidebarConfig = {
  menuLabel: "Menu",
  items: [
    { label: "Sales Dashboard", icon: LayoutGrid, path: "/sales" },
    { label: "Sales Order List", icon: ListOrdered, path: "/sales/orders" },
    { label: "Sales Order Report", icon: FileBarChart, path: "/sales/orders/report" },
    { label: "Overall Sale Report", icon: BarChart3, path: "/sales/report" },
    { label: "Customer List", icon: Users, path: "/sales/customers" },
  ],
};
