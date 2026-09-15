import type { LucideIcon } from "lucide-react";

/** Tint/color scheme for one of the four headline stat cards. */
export type StatTone = "amber" | "green" | "red" | "blue";

export interface FinancialStat {
  id: string;
  label: string;
  value: string;
  /** Small line under the value, e.g. a date or "over due" note. */
  subtitle: string;
  tone: StatTone;
  icon: LucideIcon;
}

/** One of the four columns in the dark green totals bar. */
export interface TotalsBarItem {
  id: string;
  label: string;
  value: string;
}

/** One row in the Receivable/Payable aging tables. */
export interface AgingRow {
  id: string;
  label: string;
  amount: string;
  /** Highlights the row's amount in a color (e.g. the 60+ days row). */
  emphasis?: "green" | "red" | "none";
}

/** One week's inflow/outflow bar in the Cash Inflow vs Outflow chart. */
export interface CashFlowWeek {
  weekLabel: string;
  /** 0–100 normalized bar height. */
  value: number;
  type: "inflow" | "outflow";
}

/** One row in the Net Cash Flow summary card below the chart. */
export interface NetCashFlowRow {
  id: string;
  label: string;
  amount: string;
  emphasis?: "green" | "none";
}
