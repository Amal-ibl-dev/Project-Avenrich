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

/* ------------------------------------------------------------------ *
 * List pages
 * ------------------------------------------------------------------ */

/**
 * Visual tone of a status / category pill. Kept separate from the domain
 * status strings so that the same palette can be reused by any list page:
 * a page maps its own statuses to a tone, the pill only knows about tones.
 */
export type StatusTone = "green" | "blue" | "amber" | "magenta" | "red" | "indigo" | "neutral";

/** A person shown inside a table cell (name + phone + avatar). */
export interface PersonRef {
  name: string;
  phone: string;
  avatarUrl: string;
}

/** Row of the Product List table. */
export interface Product {
  id: string;
  productId: string;
  name: string;
  description: string;
  /** Units per carton. */
  unitsPerCarton: number;
}

export type ProductionOrderStatus = "Pending" | "Approved" | "Completed";

/** Row of the Production Order List table. */
export interface ProductionOrder {
  id: string;
  orderId: string;
  productId: string;
  salesOrderId: string;
  /** Batch / quantity reference, e.g. "PRD_TEA_001". */
  qtyToProduce: string;
  customer: PersonRef;
  status: ProductionOrderStatus;
}

export type MaterialType = "Tea" | "Packing Material" | "Flavour and Herbs";

/** Row of the Supplier List table. */
export interface Supplier {
  id: string;
  supplierId: string;
  contact: PersonRef;
  email: string;
  phoneNumber: string;
  address: string;
  materialType: MaterialType;
}

export type PurchaseOrderStatus =
  | "Pending"
  | "Partial"
  | "Email Sent"
  | "Fulfilled"
  | "Confirmed"
  | "Cancel";

/** Row of the Purchase Order List table. */
export interface PurchaseOrder {
  id: string;
  orderId: string;
  productName: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  status: PurchaseOrderStatus;
}

/** How much of the linked PO a GRN covers. */
export type GrnReceiptStatus = "Full" | "Partial" | "Rejected";

/** Row of the GRN (Goods Received Note) List table. */
export interface Grn {
  id: string;
  grnId: string;
  supplierName: string;
  linkedPo: string;
  /** Pre-formatted for display, e.g. "12th Feb 2026". */
  receivingDate: string;
  receiptStatus: GrnReceiptStatus;
}
