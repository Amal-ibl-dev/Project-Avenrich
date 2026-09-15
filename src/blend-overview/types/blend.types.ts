/** Tint used by the four headline stat cards. */
export type BlendStatTone = "green" | "amber";

export interface BlendStat {
  id: string;
  label: string;
  value: string;
  tone: BlendStatTone;
}

/** A slice used by both the Blend Status and Material Allocation donuts. */
export interface DonutSlice {
  id: string;
  label: string;
  percent: number;
  color: string;
}

/** One bar in the Blend Volume Product chart — each bar has its own color. */
export interface BlendVolumeBar {
  id: string;
  label: string;
  /** 0–100 normalized bar height. */
  value: number;
  color: string;
}

export interface MaterialPendingIssue {
  id: string;
  label: string;
  pendingLabel: string;
}

/** One row in the Top Raw Material Allocated horizontal bar list. */
export interface RawMaterialAllocation {
  id: string;
  label: string;
  percent: number;
}

/** One point in the Blend Created Per Week area chart. */
export interface BlendPerWeekPoint {
  week: string;
  count: number;
}

export type BlendState = "Blended" | "Blend in Progress" | "Pending";

export interface RecentBlendRow {
  id: string;
  blendId: string;
  productName: string;
  blendName: string;
  quantityKg: number;
  state: BlendState;
  expiredDate: string;
}
