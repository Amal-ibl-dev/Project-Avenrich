import type {
  CustomerCollaborationEntry,
  EmailItem,
  SalesOrderItem,
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
