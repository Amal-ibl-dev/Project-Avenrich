import { LayoutGrid, List, Package, Archive, TrendingUp, Warehouse } from "lucide-react";
import type { SidebarConfig } from "../../../shared/types/navigation.types"
import type {
  InventoryItemRow,
  StockAlertRow,
  StockFlowPoint,
  StockRegisterRow,
  StockSplitSlice,
  StockValueRow,
  TeaStockPoint,
} from "../types/inventory.types";

export const INVENTORY_SIDEBAR: SidebarConfig = {
  menuLabel: "Menu",
  items: [
    { label: "Inventory Dashboard", icon: LayoutGrid, path: "/inventory" },
    { label: "Inventory List", icon: List, path: "/inventory/list" },
    { label: "Raw Materials", icon: Package, path: "/inventory/raw-materials" },
    { label: "Finished Goods", icon: Archive, path: "/inventory/finished-goods" },
    { label: "Working Progress", icon: TrendingUp, path: "/inventory/working-progress" },
    { label: "Warehouse Overview", icon: Warehouse, path: "/inventory/warehouse" },
  ],
};

export const INVENTORY_MANAGER_USER = {
  name: "Amal Thennakoon",
  role: "Inventory Manager",
  email: "Amal123@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Anjana&backgroundColor=d0d9f7",
};

export const INVENTORY_HERO_STATS = {
  totalStockValue: "$1.28M",
  activeLowStocks: 9,
  inProgressOrders: 8,
};

export const STOCK_FLOW: StockFlowPoint[] = [
  { day: "Mon", inStock: 8, outStock: 4 },
  { day: "Tue", inStock: 14, outStock: 13 },
  { day: "Wed", inStock: 13, outStock: 12 },
  { day: "Thu", inStock: 16, outStock: 18 },
  { day: "Fri", inStock: 18, outStock: 19 },
  { day: "Sat", inStock: 16, outStock: 15 },
  { day: "Sun", inStock: 12, outStock: 10 },
];

export const TEA_STOCK: TeaStockPoint[] = [
  { categoryLabel: "", auction: 2600, privateSales: 1600 },
  { categoryLabel: "", auction: 1400, privateSales: 1700 },
  { categoryLabel: "", auction: 1100, privateSales: 1500 },
];

export const STOCK_SPLIT: StockSplitSlice[] = [
  { id: "raw-material", label: "Raw Material", percent: 46, color: "#123A20" },
  { id: "finished-good", label: "Finished Good", percent: 24, color: "#2ECC71" },
  { id: "working-progress", label: "Working Progress", percent: 24, color: "#123A20", hatched: true },
];

export const STOCK_VALUE_BY_SUBCATEGORY: StockValueRow[] = [
  { id: "tea-stock-1", label: "Tea Stock", percent: 92 },
  { id: "finished-goods", label: "Finished Goods", percent: 58 },
  { id: "tea-stock-2", label: "Tea Stock", percent: 72 },
  { id: "wip-bend", label: "WIP / Bend", percent: 34 },
  { id: "flavor-herb", label: "Flavor & Herb", percent: 84 },
];

export const LOW_STOCK_ALERTS: StockAlertRow[] = [
  { id: "liquid-flavor", label: "Liquid Flavor - Batch22", status: "Partially Paid" },
  { id: "master-carton", label: "Master Carton", status: "Partially Paid" },
  { id: "green-tea", label: "Green Tea", status: "Expiring 2 Days" },
  { id: "herbal-tea", label: "Herbal Tea", status: "Partially Paid" },
];

export const STOCK_REGISTER: StockRegisterRow[] = [
  { id: "sr-1", orderCode: "OrO001", productName: "Ceylon Black Tea", category: "Raw Material", quantity: 18400, unit: "KG", status: "Completed", date: "11th May 2026" },
  { id: "sr-2", orderCode: "OrO001", productName: "Ceylon Black Tea", category: "Raw Material", quantity: 18400, unit: "KG", status: "Low Stock", date: "11th May 2026" },
  { id: "sr-3", orderCode: "OrO001", productName: "Flavor Herbal Tea", category: "Raw Material", quantity: 18400, unit: "KG", status: "Completed", date: "11th May 2026" },
  { id: "sr-4", orderCode: "OrO001", productName: "Jasmine Green Tea", category: "Raw Material", quantity: 18400, unit: "KG", status: "In Progress", date: "11th May 2026" },
  { id: "sr-5", orderCode: "OrO001", productName: "Jasmine Green Tea", category: "Raw Material", quantity: 18400, unit: "KG", status: "In Progress", date: "11th May 2026" },
  { id: "sr-6", orderCode: "OrO001", productName: "Jasmine Green Tea", category: "Raw Material", quantity: 18400, unit: "KG", status: "In Progress", date: "11th May 2026" },
];

// ---- Inventory List page ---------------------------------------------------

export const INVENTORY_LIST_STATS = {
  dailyTurnoverUnits: "842 Units",
  dailyTurnoverChange: "+12% from yesterday",
  lowStockAlertSkus: "18 SKUs",
  expiringItems: "04 Items",
};

export const INVENTORY_ITEMS: InventoryItemRow[] = [
  { id: "inv-1", stockCode: "SK-1120", productName: "Black Tea Leaves", category: "Raw Material", zoneBin: "North-B Bin- 422", quantityLabel: "140 KG", unitsLabel: "56 Units", state: "IN_STOCK", expiredDate: "12th June 2026" },
  { id: "inv-2", stockCode: "SK-1120", productName: "Herbal Tea", category: "Raw Material", zoneBin: "North-B Bin- 422", quantityLabel: "140 KG", unitsLabel: "56 Units", state: "LOW_STOCK", expiredDate: "12th June 2026" },
  { id: "inv-3", stockCode: "SK-1120", productName: "Black Tea Leaves", category: "Raw Material", zoneBin: "North-B Bin- 422", quantityLabel: "140 KG", unitsLabel: "56 Units", state: "IN_STOCK", expiredDate: "12th June 2026" },
  { id: "inv-4", stockCode: "SK-1120", productName: "Black Tea Leaves", category: "Raw Material", zoneBin: "North-B Bin- 422", quantityLabel: "140 KG", unitsLabel: "56 Units", state: "OUT_STOCK", expiredDate: "12th June 2026" },
  { id: "inv-5", stockCode: "SK-1121", productName: "White Tea Blend", category: "Finished Goods", zoneBin: "North-A Bin- 118", quantityLabel: "80 KG", unitsLabel: "32 Units", state: "IN_STOCK", expiredDate: "02nd Aug 2026" },
  { id: "inv-6", stockCode: "SK-1122", productName: "Ceylon Gold Blend", category: "Work in Progress", zoneBin: "South-C Bin- 09", quantityLabel: "60 KG", unitsLabel: "24 Units", state: "LOW_STOCK", expiredDate: "18th Jul 2026" },
];

export const INVENTORY_ZONE_OPTIONS = ["North-A", "North-B", "South-C", "West-D"];
export const INVENTORY_CATEGORY_OPTIONS: string[] = ["Finished Goods", "Raw Material", "Work in Progress"];
export const INVENTORY_STATE_OPTIONS = ["In Stock", "Low Stock", "Out Stock"];

// ---- Stock Application modal ------------------------------------------------

export const CERTIFICATION_OPTIONS = ["Organic", "Fair Trade", "Rainforest Alliance", "ISO 22000"];
export const TEA_TYPE_OPTIONS = ["Herbal Tea", "Black Tea", "Green Tea", "White Tea", "Jasmine Tea"];
export const RAW_MATERIAL_STOCK_OPTIONS = ["Black Tea Leaves", "Herbal Tea", "Liquid Flavor", "Honey Granules"];
export const WIP_STOCK_OPTIONS = ["Ceylon Gold Blend", "Early Gray Blend", "Jasmine Green Blend"];
