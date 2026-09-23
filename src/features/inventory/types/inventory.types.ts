/** One point in the In Stock vs Out Stock area chart. */
export interface StockFlowPoint {
  day: string;
  inStock: number;
  outStock: number;
}

/** One category in the Tea Stock by Type dual bar chart. */
export interface TeaStockPoint {
  categoryLabel: string;
  auction: number;
  privateSales: number;
}

/** A slice of the Stock Split by category donut. */
export interface StockSplitSlice {
  id: string;
  label: string;
  percent: number;
  color: string;
  /** When true, rendered with a diagonal hatch pattern instead of a solid fill. */
  hatched?: boolean;
}

/** One row in the Stock Value by sub-category horizontal bar list. */
export interface StockValueRow {
  id: string;
  label: string;
  /** 0–100, relative bar length — no numeric value is shown, only the bar. */
  percent: number;
}

export type StockAlertStatus = "Partially Paid" | "Expiring 2 Days";

export interface StockAlertRow {
  id: string;
  label: string;
  status: StockAlertStatus;
}

export type StockRegisterStatus = "Completed" | "Low Stock" | "In Progress";

export interface StockRegisterRow {
  id: string;
  orderCode: string;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  status: StockRegisterStatus;
  date: string;
}
