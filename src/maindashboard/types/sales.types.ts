/** Status of a single sales order line item. */
export type SalesOrderStatus = "Pending" | "Completed";

export interface SalesOrderItem {
  id: string;
  name: string;
  qty: number;
  status: SalesOrderStatus;
}

/** Approval status of a customer's sales report entry. */
export type SalesReportStatus = "APPROVED" | "PENDING";

export interface SalesReportEntry {
  id: string;
  companyName: string;
  code: string;
  status: SalesReportStatus;
  avatarUrl: string;
}

/** Free-text relationship tag shown next to a customer (e.g. "Export"). */
export interface CustomerCollaborationEntry {
  id: string;
  name: string;
  address: string;
  tag: string;
  avatarUrl: string;
}

export interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  date: string;
  unread: boolean;
  starred: boolean;
  avatarUrl: string;
}
