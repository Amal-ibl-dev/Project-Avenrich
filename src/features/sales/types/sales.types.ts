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

/** Row shown in the Sales Order List table. */
export type SalesOrderRowStatus = "APPROVED" | "PENDING" | "REJECTED";

export interface SalesOrderRow {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAvatarUrl: string;
  orderDate: string;
  deliveryDate: string;
  status: SalesOrderRowStatus;
}

/** One product line inside a sales order (used by both the Add Sales Order
 *  form's "Order Item" carousel and the Sales Order Report's items table). */
export interface SalesOrderLineItem {
  id: string;
  product: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

/** Full single-order detail shown on the Sales Order Report page. */
export interface SalesOrderDetail {
  orderId: string;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery: string;
  customerName: string;
  customerType: string;
  contactPerson: string;
  address: string;
  customerAvatarUrl: string;
  items: SalesOrderLineItem[];
}

/** A collapsible section on the Overall Sales Report page. */
export interface OverallReportSection {
  id: string;
  number: number;
  title: string;
  description: string;
}

/** Row shown in the Customer List table. */
export type CustomerType = "Export" | "Contract Packing";

export interface CustomerRow {
  id: string;
  customerCode: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  customerType: CustomerType;
  avatarUrl: string;
}
