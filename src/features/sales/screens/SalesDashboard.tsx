"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../../../shared/components/layout/Sidebar";
import { TopNav } from "../../../shared/components/layout/TopNav";
import { PageHeader } from "../../../shared/components/layout/PageHeader";
import {
  SalesOrderCard,
  SalesReportCard,
  CustomerCollaborationCard,
  EmailCard,
} from "../components/index";
import { AddSalesOrderModal } from "../components/orders/AddSalesOrderModal";
import { SALES_SIDEBAR } from "../../../shared/constants/navigation.constants";
import {
  CUSTOMER_COLLABORATIONS,
  SALES_EMAILS,
  SALES_MANAGER_USER,
  SALES_ORDER_ITEMS,
  SALES_REPORT_ENTRIES,
} from "../constants/sales.constants";

export default function SalesDashboard() {
  const router = useRouter();
  const [addOrderOpen, setAddOrderOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={SALES_SIDEBAR.menuLabel} items={SALES_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={SALES_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <PageHeader
            title="Sales Department"
            action={{
              label: "Create Sales Order",
              icon: Plus,
              onClick: () => setAddOrderOpen(true),
            }}
          />

          <div className="mb-5 flex flex-col gap-5 lg:flex-row">
            <SalesOrderCard
              title="Sales Order"
              items={SALES_ORDER_ITEMS}
              onViewAll={() => router.push("/sales/orders")}
            />
            <SalesReportCard
              title="Sales Report"
              entries={SALES_REPORT_ENTRIES}
              onViewAll={() => router.push("/sales/report")}
            />
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <CustomerCollaborationCard
              title="Customer Collaboration"
              customers={CUSTOMER_COLLABORATIONS}
              onAddCustomer={() => router.push("/sales/customers")}
            />
            <EmailCard title="Email" emails={SALES_EMAILS} />
          </div>
        </div>
      </main>

      <AddSalesOrderModal open={addOrderOpen} onClose={() => setAddOrderOpen(false)} />
    </div>
  );
}
