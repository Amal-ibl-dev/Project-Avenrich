import { LayoutGrid, Droplet, Component, FileBarChart2 } from "lucide-react";
import type { SidebarConfig } from "../types/dashboard.types";
import type {
  BlendPerWeekPoint,
  BlendStat,
  BlendVolumeBar,
  DonutSlice,
  MaterialPendingIssue,
  RawMaterialAllocation,
  RecentBlendRow,
} from "../types/blend.types";

export const BLEND_SIDEBAR: SidebarConfig = {
  menuLabel: "Menu",
  items: [
    { label: "Blend Dashboard", icon: LayoutGrid, path: "/blend" },
    { label: "Blend List", icon: Droplet, path: "/blend/list" },
    { label: "Production Order List", icon: Component, path: "/blend/production-orders" },
    { label: "Report", icon: FileBarChart2, path: "/blend/report" },
  ],
};

export const BLEND_MATERIAL_MANAGER_USER = {
  name: "Tharushi Perera",
  role: "Material Manager",
  email: "tharushi13@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tharushi&backgroundColor=f0d9b5",
};

export const BLEND_STATS: BlendStat[] = [
  { id: "active-blend", label: "Active Blend", value: "47", tone: "green" },
  { id: "total-blend-qty", label: "Total blend qty (kg)", value: "1,840", tone: "green" },
  { id: "material-pending-issue", label: "Material Pending Issue", value: "11", tone: "amber" },
  { id: "awaiting-quality-review", label: "Awaiting quality review", value: "6", tone: "green" },
];

export const BLEND_STATUS_SLICES: DonutSlice[] = [
  { id: "pending", label: "Pending", percent: 17, color: "#4ADE9C" },
  { id: "blended-in-progress", label: "Blended In progress", percent: 28, color: "#C9A227" },
  { id: "blended", label: "Blended", percent: 38, color: "#123A20" },
  { id: "covered", label: "Covered", percent: 17, color: "#1E5631" },
];
export const BLEND_STATUS_CENTER = "38%";

export const MATERIAL_ALLOCATION_SLICES: DonutSlice[] = [
  { id: "issue", label: "Issue", percent: 76, color: "#2ECC9A" },
  { id: "pending-issue", label: "Pending Issue", percent: 24, color: "#E8B923" },
];
export const MATERIAL_ALLOCATION_CENTER = "76%";

export const BLEND_VOLUME: BlendVolumeBar[] = [
  { id: "ceylon-black", label: "Ceylon Black Tea", value: 88, color: "#123A20" },
  { id: "ceylon-gold", label: "Ceylon Gold blend", value: 58, color: "#1E5631" },
  { id: "early-gray", label: "Early Gray Blend", value: 94, color: "#123A20" },
  { id: "jasmine-green", label: "Jasmine Green Blend", value: 48, color: "#4ADE9C" },
  { id: "white-tea", label: "White Tea Blend", value: 82, color: "#1E5631" },
];

export const MATERIAL_PENDING_ISSUES: MaterialPendingIssue[] = [
  { id: "black-tea-leaves", label: "Black  Tea Leaves", pendingLabel: "15 KG Pending" },
  { id: "collect-this-month", label: "Collect this Month", pendingLabel: "1000 Pcs Pending" },
  { id: "settled-this-month", label: "Settled This Month", pendingLabel: "20 KG Pending" },
];

export const TOP_RAW_MATERIAL: RawMaterialAllocation[] = [
  { id: "black-tea-leaves", label: "Black Tea Leaves", percent: 88 },
  { id: "liquid-flavor", label: "Liquid Flavor", percent: 70 },
  { id: "herbal-mix", label: "Herbal Mix", percent: 76 },
  { id: "jasmine-flavor", label: "Jasmine Flavor", percent: 42 },
  { id: "honey-granules", label: "Honey Granules", percent: 20 },
];

export const BLEND_PER_WEEK: BlendPerWeekPoint[] = [
  { week: "week 01", count: 22 },
  { week: "week 02", count: 12 },
  { week: "week 03", count: 20 },
  { week: "week 04", count: 24 },
  { week: "week 05", count: 10 },
  { week: "week 06", count: 18 },
  { week: "week 07", count: 26 },
];

export const RECENT_BLENDS: RecentBlendRow[] = [
  { id: "rb-1", blendId: "BL-0001", productName: "Ceylon Black Tea", blendName: "Ceylon Gold Blend", quantityKg: 25, state: "Blended", expiredDate: "11th May 2026" },
  { id: "rb-2", blendId: "BL-0001", productName: "Ceylon Black Tea", blendName: "Ceylon Gold Blend", quantityKg: 25, state: "Blend in Progress", expiredDate: "11th May 2026" },
  { id: "rb-3", blendId: "BL-0001", productName: "Ceylon Black Tea", blendName: "Ceylon Gold Blend", quantityKg: 25, state: "Pending", expiredDate: "11th May 2026" },
  { id: "rb-4", blendId: "BL-0001", productName: "Ceylon Black Tea", blendName: "Ceylon Gold Blend", quantityKg: 25, state: "Blended", expiredDate: "11th May 2026" },
  { id: "rb-5", blendId: "BL-0001", productName: "Ceylon Black Tea", blendName: "Ceylon Gold Blend", quantityKg: 25, state: "Blended", expiredDate: "11th May 2026" },
];
