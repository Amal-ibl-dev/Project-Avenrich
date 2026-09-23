import type {
  CustomerCollaborationEntry,
  CustomerRow,
  CustomerType,
  EmailItem,
  OverallReportSection,
  SalesOrderDetail,
  SalesOrderItem,
  SalesOrderRow,
  SalesReportEntry,
} from "../types/sales.types";

export const SALES_ORDER_ITEMS: SalesOrderItem[] = [
  { id: "so-1", name: "Sales order item name", qty: 3241, status: "Pending" },
  { id: "so-2", name: "Sales order item name", qty: 3241, status: "Completed" },
  { id: "so-3", name: "Sales order item name", qty: 3241, status: "Pending" },
];

export const SALES_REPORT_ENTRIES: SalesReportEntry[] = [
  {
    id: "sr-1",
    companyName: "Dissanayake Export (Pvt) Ltd",
    code: "CU-2026-0184",
    status: "APPROVED",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dissanayake&backgroundColor=e0d4f7",
  },
  {
    id: "sr-2",
    companyName: "Finlays Export (Pvt) Ltd",
    code: "CU-2026-7188",
    status: "PENDING",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Finlays&backgroundColor=f7d4d4",
  },
  {
    id: "sr-3",
    companyName: "Flavor Export (Pvt) Ltd",
    code: "CU-2026-0133",
    status: "APPROVED",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Flavor&backgroundColor=d4f7e0",
  },
];

export const CUSTOMER_COLLABORATIONS: CustomerCollaborationEntry[] = [
  {
    id: "cc-1",
    name: "Maheshika Silva",
    address: "No: 132/B, Munasinghe rd , Malabe",
    tag: "Export",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maheshika&backgroundColor=d4f7d4",
  },
  {
    id: "cc-2",
    name: "Navindu Gamlath",
    address: "No: 32, Silva rd, Nugegoda",
    tag: "Contract Packing",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Navindu&backgroundColor=f7e8d4",
  },
  {
    id: "cc-3",
    name: "Sathsara Sithum",
    address: "No: 32, Silva rd, Nugegoda",
    tag: "Contract Packing",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sathsara&backgroundColor=d4e8f7",
  },
  {
    id: "cc-4",
    name: "Udula kumara",
    address: "No: 32, Silva rd, Nugegoda",
    tag: "Export",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Udula&backgroundColor=d4f0f7",
  },
];

export const SALES_EMAILS: EmailItem[] = [
  {
    id: "em-1",
    sender: "Google",
    subject: "New privacy setting for Services",
    date: "14 Jun",
    unread: true,
    starred: true,
    avatarUrl: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
  },
  {
    id: "em-2",
    sender: "Google",
    subject: "New privacy setting for Services",
    date: "14 Jun",
    unread: true,
    starred: true,
    avatarUrl: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
  },
  {
    id: "em-3",
    sender: "Google",
    subject: "New privacy setting for Services",
    date: "14 Jun",
    unread: true,
    starred: true,
    avatarUrl: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
  },
  {
    id: "em-4",
    sender: "Google",
    subject: "New privacy setting for Services",
    date: "14 Jun",
    unread: true,
    starred: true,
    avatarUrl: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
  },
];

export const SALES_MANAGER_USER = {
  name: "Kalpani Dileka",
  role: "Sales Manager",
  email: "kalpani123@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Kalpani&backgroundColor=e0d4f7",
};

const DISSANAYAKE_AVATAR =
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Dissanayake&backgroundColor=e0d4f7";

/** Demo rows for the Sales Order List page (app/sales/orders). */
export const SALES_ORDER_ROWS: SalesOrderRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: `so-row-${i + 1}`,
  orderNumber: "OrO001",
  customerName: "Dissanayake",
  customerPhone: "078 8200 320",
  customerAvatarUrl: DISSANAYAKE_AVATAR,
  orderDate: "06/20/2026",
  deliveryDate: "06/20/2026",
  status: (["APPROVED", "APPROVED", "APPROVED", "PENDING", "APPROVED", "APPROVED", "PENDING", "REJECTED", "APPROVED", "APPROVED"] as const)[i],
}));

/** Demo single-order detail for the Sales Order Report page (app/sales/orders/report). */
export const SALES_ORDER_DETAIL: SalesOrderDetail = {
  orderId: "SO-2026-0184",
  orderDate: "02 June 2026",
  expectedDelivery: "16 June 2026",
  actualDelivery: "15 June 2026",
  customerName: "Dissanayaka Exports (Pvt) Ltd",
  customerType: "Export",
  contactPerson: "Mr. K. Dissanayaka",
  address: "45 Galle Road, Colombo 06, Sri Lanka",
  customerAvatarUrl: DISSANAYAKE_AVATAR,
  items: [
    { id: "li-1", product: "Ceylon Black Tea-Premium Grade", quantity: 1200, unit: "KG", unitPrice: 85 },
    { id: "li-2", product: "Ceylon Black Tea-Premium Grade", quantity: 1200, unit: "KG", unitPrice: 85 },
    { id: "li-3", product: "Ceylon Black Tea-Premium Grade", quantity: 1200, unit: "KG", unitPrice: 85 },
  ],
};

/** Collapsible sections on the Overall Sales Report page (app/sales/report). */
export const OVERALL_REPORT_SECTIONS: OverallReportSection[] = [
  { id: "ov-1", number: 1, title: "Sales Overview", description: "Total orders, Total revenue and order status mix" },
  { id: "ov-2", number: 2, title: "Sales Order Flow", description: "Order pipeline movement and weekly volume" },
  { id: "ov-3", number: 3, title: "Revenue Summary", description: "Total Revenue, Average order value and revenue product" },
  { id: "ov-4", number: 4, title: "Product Performance", description: "Total Revenue, Average order value and revenue product" },
  { id: "ov-5", number: 5, title: "Customer Type Breakdown", description: "Export vs. Contract Packing - aggregate volume & revenue only" },
  { id: "ov-6", number: 6, title: "Delivery Performance", description: "Ontime vs. Delay Delivery and average Lead time" },
  { id: "ov-7", number: 7, title: "Stock Alerts Summary", description: "Low-stock and reorder-point flags across warehouses" },
];

/** Demo rows for the Customer List page (app/sales/customers). */
const CUSTOMER_NAMES = [
  "S.Alponsu",
  "Dissanayake",
  "Dissanayake",
  "Dissanayake",
  "Dissanayake",
  "Dissanayake",
  "Dissanayake",
  "Dissanayake",
  "Dissanayake",
  "Dissanayake",
];
const CUSTOMER_PHONES = [
  "078 8200 320",
  "0712882888",
  "0712882888",
  "0712882888",
  "0712882888",
  "078 8200 320",
  "078 8200 320",
  "0712882888",
  "078 8200 320",
  "078 8200 320",
];
const CUSTOMER_TYPES: CustomerType[] = [
  "Contract Packing",
  "Export",
  "Export",
  "Export",
  "Export",
  "Contract Packing",
  "Contract Packing",
  "Export",
  "Contract Packing",
  "Contract Packing",
];

export const CUSTOMER_ROWS: CustomerRow[] = CUSTOMER_NAMES.map((name, i) => ({
  id: `cu-row-${i + 1}`,
  customerCode: "CU-0001",
  name,
  phone: CUSTOMER_PHONES[i],
  email: "greenleaf@gmail.com",
  address: "45 Main Street, Col ....",
  customerType: CUSTOMER_TYPES[i],
  avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=Customer${i}&backgroundColor=${
    i % 2 === 0 ? "e0d4f7" : "d4e8f7"
  }`,
}));
