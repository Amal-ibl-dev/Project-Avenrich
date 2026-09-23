"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../../../shared/components/layout/Sidebar";
import { TopNav } from "../../../shared/components/layout/TopNav";
import { StatusBadge } from "../../../shared/components/ui/StatusBadge";
import { Pagination } from "../../../shared/components/ui/Pagination";
import { AddSalesOrderModal } from "../components/orders/AddSalesOrderModal";
import { SALES_SIDEBAR } from "../../../shared/constants/navigation.constants";
import { SALES_MANAGER_USER, SALES_ORDER_ROWS } from "../constants/sales.constants";
import type { SalesOrderRowStatus } from "../types/sales.types";

const STATUS_VARIANT: Record<SalesOrderRowStatus, "approved" | "pending" | "rejected"> = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
};

const PAGE_SIZE = 10;

export default function SalesOrderListPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [addOrderOpen, setAddOrderOpen] = useState(false);

  const pageCount = Math.max(1, Math.ceil(SALES_ORDER_ROWS.length / PAGE_SIZE));
  const rows = SALES_ORDER_ROWS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={SALES_SIDEBAR.menuLabel} items={SALES_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={SALES_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                aria-label="Go back"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Sales order list</h1>
            </div>

            <button
              onClick={() => setAddOrderOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#1E5631] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#164124]"
            >
              <Plus size={16} />
              Add Sales Order
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-[#1E5631] to-[#123A20] text-white">
                  <th className="px-6 py-4 font-medium">Sales Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Order Date</th>
                  <th className="px-6 py-4 font-medium">Delivery Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 font-medium text-gray-800">{row.orderNumber}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.customerAvatarUrl}
                          alt={row.customerName}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{row.customerName}</div>
                          <div className="text-xs text-gray-400">{row.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.orderDate}</td>
                    <td className="px-6 py-4 text-gray-600">{row.deliveryDate}</td>
                    <td className="px-6 py-4">
                      <StatusBadge label={row.status} variant={STATUS_VARIANT[row.status]} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => router.push(`/sales/orders/report?orderId=${row.id}`)}
                        aria-label="View order"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
      </main>

      <AddSalesOrderModal open={addOrderOpen} onClose={() => setAddOrderOpen(false)} />
    </div>
  );
}
