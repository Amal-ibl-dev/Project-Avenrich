/**
 * Finance-only types. NavItem/SidebarConfig/CurrentUser used to live here
 * too, but every feature needs those (Sidebar/TopNav render any of them) so
 * they moved to shared/types/navigation.types.ts.
 */

/** One of the three headline figures shown on the dark green metrics card. */
export interface MetricItem {
  id: "income" | "expenses" | "revenue";
  label: string;
  value: number;
  deltaPercent: number;
}

/** One month's worth of incoming vs. expenses data for the capsule bar chart. */
export interface MonthlyFlow {
  month: string;
  /** 0–100 normalized magnitude, used purely for bar height. */
  incoming: number;
  expenses: number;
  /** Real currency figures shown in the tooltip. */
  incomingAmount: number;
  expensesAmount: number;
}

/** A category slice inside the "Income Overview" segmented bar. */
export interface IncomeSegment {
  id: string;
  label: string;
  amount: number;
  percent: number;
  color: string;
}

/** A slice of the "Production Order" donut chart. */
export interface ProductionSlice {
  id: string;
  label: string;
  value: number;
  color: string;
}

/** One month's cash inflow/outflow line-chart data point. */
export interface CashFlowPoint {
  month: string;
  inflow: number;
  outflow: number;
}

/** Which top-level department tab is active. */
export type DashboardTab =
  | "Financial"
  | "Sales"
  | "Supply Chain"
  | "Inventory"
  | "Tea"
  | "Quality";

/** Time-range filter shown in the dashboard header. */
export type DashboardPeriod = "Weekly" | "Month" | "Yearly";
