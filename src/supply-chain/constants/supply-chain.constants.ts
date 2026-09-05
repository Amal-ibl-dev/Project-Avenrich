import {
  LayoutGrid,
  Package,
  ClipboardList,
  Users,
  ListOrdered,
  FileCheck2,
} from "lucide-react";
import { COLORS } from "../../maindashboard/constants/theme.constants"
import type { SidebarConfig } from "../../maindashboard/types/dashboard.types"
import type {
  GrnQualityPoint,
  ProductionPipelineSlice,
  SupplierPerformanceEntry,
  SupplyChainStat,
  WastagePoint,
} from "../types/supply-chain.types";

export const SUPPLY_CHAIN_SIDEBAR: SidebarConfig = {
  menuLabel: "Menu",
  items: [
    { label: "Supply Chain", icon: LayoutGrid, path: "/supply-chain" },
    { label: "Product List", icon: Package, path: "/supply-chain/products" },
    { label: "Production Order List", icon: ClipboardList, path: "/supply-chain/production-orders" },
    { label: "Supplier List", icon: Users, path: "/supply-chain/suppliers" },
    { label: "Purchase Order List", icon: ListOrdered, path: "/supply-chain/purchase-orders" },
    { label: "GRN List", icon: FileCheck2, path: "/supply-chain/grn" },
  ],
};

export const SUPPLY_CHAIN_MANAGER_USER = {
  name: "Fathima Nadeeia",
  role: "Sales Manager",
  email: "fathima1717@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Fathima&backgroundColor=ffd5dc",
};

export const SUPPLY_CHAIN_STATS: SupplyChainStat[] = [
  { id: "active-suppliers", label: "Active Suppliers", value: 24, variant: "default" },
  { id: "open-po", label: "Open Purchase Orders", value: 17, variant: "default" },
  { id: "active-production", label: "Active Production", value: 31, variant: "default" },
  { id: "pending-alerts", label: "Pending Alerts", value: 9, variant: "alert" },
];

export const GRN_QUALITY: GrnQualityPoint[] = [
  { grnLabel: "GRN-241", ordered: 92, received: 58 },
  { grnLabel: "GRN-242", ordered: 78, received: 42 },
  { grnLabel: "GRN-243", ordered: 88, received: 66 },
  { grnLabel: "GRN-244", ordered: 70, received: 68 },
];

export const SUPPLIER_PERFORMANCE: SupplierPerformanceEntry[] = [
  { id: "sp-1", supplierName: "Ceylon Tea Grows", onTimePercent: 78, latePercent: 22 },
  { id: "sp-2", supplierName: "Greenline Estate", onTimePercent: 48, latePercent: 52 },
  { id: "sp-3", supplierName: "Herbal Source Ltd", onTimePercent: 62, latePercent: 38 },
  { id: "sp-4", supplierName: "Lanka Pack Co.", onTimePercent: 88, latePercent: 12 },
];

export const PRODUCTION_PIPELINE: ProductionPipelineSlice[] = [
  { id: "in-progress", label: "In progress", value: 55, color: COLORS.forestGreenDark },
  { id: "pending", label: "Pending", value: 17, color: "#4ADE9C" },
  { id: "completed", label: "Completed", value: 28, color: "#C9A227" },
];

export const WASTAGE: WastagePoint[] = [
  { categoryLabel: "Packing Material", expected: 96, actual: 62 },
  { categoryLabel: "Flavor & Herb", expected: 60, actual: 84 },
  { categoryLabel: "Black Tea Leaves", expected: 78, actual: 40 },
  { categoryLabel: "Week 04", expected: 88, actual: 82 },
];
