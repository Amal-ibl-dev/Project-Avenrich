import {
  LayoutGrid,
  FileText,
  ClipboardList,
  Users,
  UserCheck,
  PieChart,
  Receipt,
  Wallet,
  TrendingDown,
  TrendingUp,
  Coins,
} from "lucide-react";
import type { SidebarConfig } from "../../../shared/types/navigation.types";
import type {
  AgingRow,
  CashFlowWeek,
  FinancialStat,
  NetCashFlowRow,
  TotalsBarItem,
} from "../types/financial-overview.types";

export const FINANCIAL_OVERVIEW_SIDEBAR: SidebarConfig = {
  menuLabel: "Menu",
  items: [
    { label: "Financial Dashboard", icon: LayoutGrid, path: "/financial/overview" },
    { label: "Customer Invoice List", icon: FileText, path: "/financial/overview/invoices" },
    { label: "Accounts Receivable", icon: ClipboardList, path: "/financial/overview/receivable" },
    { label: "Supplier Invoice List", icon: Users, path: "/financial/overview/supplier-invoices" },
    { label: "Account Payable", icon: UserCheck, path: "/financial/overview/payable" },
    { label: "Cost Breakdown", icon: PieChart, path: "/financial/overview/cost-breakdown" },
    { label: "Cost Revenue by order", icon: Receipt, path: "/financial/overview/cost-revenue" },
  ],
};

export const FINANCE_MANAGER_USER = {
  name: "Nadisha Silva",
  role: "Finacial Manager",
  email: "nadisha127@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Nadisha&backgroundColor=d4c7f0",
};

export const FINANCIAL_STATS: FinancialStat[] = [
  {
    id: "cash-position",
    label: "Cash Position",
    value: "$ 345,000",
    subtitle: "22th Jun 2026",
    tone: "amber",
    icon: Wallet,
  },
  {
    id: "owed-to-us",
    label: "Owed to Us (AR)",
    value: "$ 75,000",
    subtitle: "$312,000 Over Due",
    tone: "green",
    icon: TrendingDown,
  },
  {
    id: "we-owe",
    label: "We Owe (AP)",
    value: "$ 100,000",
    subtitle: "$214,500 Over Due",
    tone: "red",
    icon: TrendingUp,
  },
  {
    id: "net-working-capital",
    label: "Networking Capital",
    value: "$ 75,000",
    subtitle: "AR-AP, This Quater",
    tone: "blue",
    icon: Coins,
  },
];

export const TOTALS_BAR: TotalsBarItem[] = [
  { id: "total-invoiced", label: "Total Invoiced (Customers)", value: "$482,500" },
  { id: "total-billed", label: "Total billed (Suppliers)", value: "$314,780" },
  { id: "total-production-cost", label: "Total Production Cost", value: "03rd March 2026" },
  { id: "gross-margin", label: "Gross Margin", value: "11th Sep 2026" },
];

export const RECEIVABLE_AGING: AgingRow[] = [
  { id: "ar-current", label: "AR- Current", amount: "$640,600" },
  { id: "ar-1-30", label: "AR- 1 - 30 Days", amount: "$150,000" },
  { id: "ar-31-60", label: "AR- 31 - 60 Days", amount: "$107,080" },
  { id: "ar-60-plus", label: "AR- 60+ Days", amount: "$96,000", emphasis: "green" },
];

export const PAYABLE_AGING: AgingRow[] = [
  { id: "ap-current", label: "AR- Current", amount: "$640,600" },
  { id: "ap-1-30", label: "AR- 1 - 30 Days", amount: "$150,000" },
  { id: "ap-31-60", label: "AR- 31 - 60 Days", amount: "$107,080" },
  { id: "ap-60-plus", label: "AR- 60+ Days", amount: "$96,000", emphasis: "red" },
];

export const CASH_FLOW_WEEKS: CashFlowWeek[] = [
  { weekLabel: "Week 01", value: 82, type: "inflow" },
  { weekLabel: "Week 02", value: 64, type: "outflow" },
  { weekLabel: "Week 03", value: 92, type: "inflow" },
  { weekLabel: "Week 04", value: 52, type: "outflow" },
  { weekLabel: "Week 05", value: 74, type: "outflow" },
  { weekLabel: "Week 06", value: 88, type: "inflow" },
];

export const NET_CASH_FLOW: NetCashFlowRow[] = [
  { id: "net-6-week", label: "Net Cash Flow (6 week)", amount: "+$150,000", emphasis: "green" },
  { id: "collect-month", label: "Collect this Month", amount: "$107,080" },
  { id: "settled-month", label: "Settled This Month", amount: "$96,000" },
];
