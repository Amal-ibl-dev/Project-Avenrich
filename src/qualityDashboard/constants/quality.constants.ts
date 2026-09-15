import { LayoutGrid, ClipboardList, PackageSearch, Droplet } from "lucide-react";
import type { SidebarConfig } from "../types/dashboard.types";
import type {
  AttributePassRate,
  CheckReportSlice,
  QualityTrendPoint,
  RecentQualityCheckRow,
  RejectedItem,
} from "../types/quality.types";
import type { RawMaterialAllocation } from "../types/blend.types";

export const QUALITY_SIDEBAR: SidebarConfig = {
  menuLabel: "Menu",
  items: [
    { label: "Quality Dashboard", icon: LayoutGrid, path: "/quality" },
    { label: "Quality List", icon: ClipboardList, path: "/quality/list" },
    { label: "Incoming Material", icon: PackageSearch, path: "/quality/incoming-material" },
    { label: "Blend Quality", icon: Droplet, path: "/quality/blend-quality" },
  ],
};

export const QUALITY_MANAGER_USER = {
  name: "Amith Rathnayake",
  role: "Quality Manager",
  email: "amithr99@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amith&backgroundColor=f7c6c7",
};

export const QUALITY_HERO_STATS = {
  totalQualityCheck: 214,
  approvalRate: 89,
  rejectedChecks: 23,
  pendingReviews: 6,
};

export const QUALITY_TREND: QualityTrendPoint[] = [
  { day: "Mon", approved: 14, rejected: 9 },
  { day: "Tue", approved: 20, rejected: 12 },
  { day: "Wed", approved: 24, rejected: 11 },
  { day: "Thu", approved: 22, rejected: 13 },
  { day: "Fri", approved: 16, rejected: 20 },
  { day: "Sat", approved: 14, rejected: 15 },
  { day: "Sun", approved: 15, rejected: 13 },
];

export const BLEND_ATTRIBUTE_PASS_RATE: AttributePassRate[] = [
  { id: "taste", label: "Taste", percent: 92, color: "#123A20" },
  { id: "aroma", label: "Aroma", percent: 64, color: "#4ADE9C" },
  { id: "consistency", label: "Consistency", percent: 78, color: "#1E5631" },
];

export const CHECK_REPORT_TYPE: CheckReportSlice[] = [
  { id: "blend-quality", label: "Blend Quality", percent: 58, colorStart: "#1E5631", colorEnd: "#4ADE9C" },
  { id: "incoming-material", label: "Incoming Material", percent: 24, colorStart: "#E8C547", colorEnd: "#C9A227" },
];
export const CHECK_REPORT_TYPE_CENTER = "58%";

export const QUALITY_STOCK_VALUE: RawMaterialAllocation[] = [
  { id: "tea-stock-1", label: "Tea Stock", percent: 92 },
  { id: "finished-goods", label: "Finished Goods", percent: 58 },
  { id: "tea-stock-2", label: "Tea Stock", percent: 72 },
  { id: "wip-bend", label: "WIP / Bend", percent: 34 },
  { id: "flavor-herb", label: "Flavor & Herb", percent: 84 },
];

export const REJECTED_ITEMS: RejectedItem[] = [
  {
    id: "qa-0117",
    qaCode: "QA-0117",
    title: "Green Tea-Lot GT 0142",
    description: "Incoming Material- Moisture above threshold",
  },
  {
    id: "qa-0119",
    qaCode: "QA-0119",
    title: "Early Gray Blend- Batch 09",
    description: "Blend quality- Consistency below standard",
  },
  {
    id: "qa-0112",
    qaCode: "QA-0112",
    title: "Packing Material- Master Carton",
    description: "Incoming Material- Damaged condition on receipt",
  },
];

export const RECENT_QUALITY_CHECKS: RecentQualityCheckRow[] = [
  { id: "rqc-1", qaId: "OrO001", reportType: "Blend Quality", decision: "Approved", reviewDate: "04th May 2026", remark: "Smooth taste, pleasant aroma, balanced texture" },
  { id: "rqc-2", qaId: "OrO001", reportType: "Incoming Material", decision: "Approved", reviewDate: "04th May 2026", remark: "Grade and Appearance within specs" },
  { id: "rqc-3", qaId: "OrO001", reportType: "Blend Quality", decision: "Approved", reviewDate: "04th May 2026", remark: "Consistency below standard, needs improvement" },
  { id: "rqc-4", qaId: "OrO001", reportType: "Incoming Material", decision: "Rejected", reviewDate: "04th May 2026", remark: "Smooth taste, pleasant aroma, balanced texture" },
  { id: "rqc-5", qaId: "OrO001", reportType: "Blend Quality", decision: "Approved", reviewDate: "04th May 2026", remark: "Moisture and condition acceptable" },
  { id: "rqc-6", qaId: "OrO001", reportType: "Incoming Material", decision: "Approved", reviewDate: "04th May 2026", remark: "Strong tea flavor, fresh aroma no major issues" },
];
