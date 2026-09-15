/** One of the four top summary stat cards. */
export interface SupplyChainStat {
  id: string;
  label: string;
  value: number;
  /** "default" = light green card, "alert" = light red/pink card. */
  variant: "default" | "alert";
}

/** One GRN's ordered vs. received quantity, for the dual bar chart. */
export interface GrnQualityPoint {
  grnLabel: string;
  /** 0–100 normalized bar heights. */
  ordered: number;
  received: number;
}

/** One supplier's on-time vs. late delivery split, 0–100, summing to 100. */
export interface SupplierPerformanceEntry {
  id: string;
  supplierName: string;
  onTimePercent: number;
  latePercent: number;
}

/** A slice of the "Production Order Pipelines" donut. */
export interface ProductionPipelineSlice {
  id: string;
  label: string;
  value: number;
  color: string;
}

/** One material category's expected vs. actual wastage %, for the dual bar chart. */
export interface WastagePoint {
  categoryLabel: string;
  /** 0–100 normalized bar heights. */
  expected: number;
  actual: number;
}

/** Time-range filter shown in the Supply Chain header (e.g. "The Quarter"). */
export type SupplyChainPeriod = "The Week" | "The Month" | "The Quarter" | "The Year";
