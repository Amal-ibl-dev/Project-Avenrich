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

/** One row of the Blend List page's table. */
export interface BlendListRow {
  id: string;
  blendId: string;
  productName: string;
  blendName: string;
  quantityKg: number;
  allocationKg: number;
}

export type BlendMaterialStatus = "ACTIVE" | "COMPLETED" | "PENDING";

/** One row of the material breakdown table inside the blend detail view. */
export interface BlendMaterialRow {
  id: string;
  materialName: string;
  allocatedQuantity: number;
  units: number;
  idIssued: boolean;
}

/** Everything shown in the "view blend" detail modal (the "Ceylon Black Tea" card). */
export interface BlendDetail {
  id: string;
  productName: string;
  blendName: string;
  quantityKg: number;
  createdAt: string;
  status: BlendMaterialStatus;
  materials: BlendMaterialRow[];
}
