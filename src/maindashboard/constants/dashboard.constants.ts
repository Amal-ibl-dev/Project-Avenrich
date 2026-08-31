import {
  ShoppingBag,
  Link2,
  Wallet,
  Leaf,
  ClipboardList,
  ShieldCheck,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { COLORS } from "./theme.constants";
import type {
  CashFlowPoint,
  DashboardTab,
  IncomeSegment,
  MetricItem,
  MonthlyFlow,
  NavItem,
  ProductionSlice,
} from "../types/dashboard.types";

export const DEPARTMENT_NAV_ITEMS: NavItem[] = [
  { label: "Sales Department", icon: ShoppingBag },
  { label: "Supply Chain Department", icon: Link2 },
  { label: "Financial Department", icon: Wallet },
  { label: "Tea Department", icon: Leaf },
  { label: "Inventory Department", icon: ClipboardList },
  { label: "Quality Department", icon: ShieldCheck },
];

export const GENERAL_NAV_ITEMS: NavItem[] = [
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: HelpCircle },
  { label: "Log Out", icon: LogOut },
];

export const DASHBOARD_TABS: DashboardTab[] = [
  "Financial",
  "Sales",
  "Supply Chain",
  "Inventory",
  "Tea",
  "Quality",
];

export const METRICS: MetricItem[] = [
  { id: "income", label: "Total Income", value: 384780.67, deltaPercent: 8.7 },
  { id: "expenses", label: "Total Expenses", value: 386330.11, deltaPercent: 1.7 },
  { id: "revenue", label: "Total Revenue", value: 386330.11, deltaPercent: 2.3 },
];

/**
 * Monthly incoming/expenses flow.
 * `incoming` / `expenses` are pre-normalized (0–100) bar heights;
 * the `*Amount` fields carry the real currency values for the tooltip.
 */
export const MONTHLY_FLOW: MonthlyFlow[] = [
  { month: "Jan", incoming: 55, expenses: 40, incomingAmount: 322450, expensesAmount: 251300 },
  { month: "Feb", incoming: 42, expenses: 28, incomingAmount: 268100, expensesAmount: 176900 },
  { month: "Mar", incoming: 58, expenses: 45, incomingAmount: 340600, expensesAmount: 289750 },
  { month: "Apr", incoming: 30, expenses: 62, incomingAmount: 198200, expensesAmount: 384500 },
  { month: "May", incoming: 96, expenses: 88, incomingAmount: 560870, expensesAmount: 660290 },
  { month: "Jun", incoming: 60, expenses: 46, incomingAmount: 352000, expensesAmount: 296400 },
  { month: "Jul", incoming: 57, expenses: 44, incomingAmount: 336700, expensesAmount: 282100 },
  { month: "Aug", incoming: 62, expenses: 58, incomingAmount: 368900, expensesAmount: 372600 },
  { month: "Sep", incoming: 59, expenses: 47, incomingAmount: 347500, expensesAmount: 301800 },
  { month: "Oct", incoming: 63, expenses: 49, incomingAmount: 372300, expensesAmount: 312900 },
];

export const DEFAULT_ACTIVE_MONTH = "May";

export const INCOME_SEGMENTS: IncomeSegment[] = [
  { id: "salary", label: "Salary", amount: 142700, percent: 37, color: COLORS.forestGreen },
  { id: "business", label: "Business", amount: 168900, percent: 44, color: COLORS.forestGreenDark },
  { id: "investment", label: "Investment", amount: 78200, percent: 39, color: COLORS.emerald },
];

export const PRODUCTION_SLICES: ProductionSlice[] = [
  { id: "in-progress", label: "In Progress", value: 55, color: COLORS.forestGreen },
  { id: "completed", label: "Completed", value: 28, color: COLORS.emerald },
  { id: "pending", label: "Pending", value: 17, color: "#7FD6A6" },
];

export const CASH_FLOW: CashFlowPoint[] = [
  { month: "Jan", inflow: 40, outflow: 62 },
  { month: "Feb", inflow: 78, outflow: 30 },
  { month: "Mar", inflow: 44, outflow: 70 },
  { month: "Apr", inflow: 66, outflow: 46 },
  { month: "May", inflow: 50, outflow: 58 },
  { month: "Jun", inflow: 62, outflow: 66 },
  { month: "Jul", inflow: 58, outflow: 70 },
  { month: "Aug", inflow: 74, outflow: 78 },
  { month: "Sep", inflow: 68, outflow: 64 },
  { month: "Oct", inflow: 90, outflow: 72 },
];

export const CURRENT_USER = {
  name: "Lionel de Silva",
  role: "Admin",
  email: "lionelad@gmail.com",
  avatarUrl: "https://i.pravatar.cc/80?img=13",
};
