"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../../../shared/components/layout/Sidebar";
import { TopNav } from "../../../shared/components/layout/TopNav";
import { SALES_SIDEBAR } from "../../../shared/constants/navigation.constants";
import { SALES_MANAGER_USER, SALES_ORDER_DETAIL } from "../constants/sales.constants";
import { formatCurrencyWhole } from "../../../shared/utils/format.utils";

export default function SalesOrderReportPage() {
  const router = useRouter();
  // Demo data stands in for a real per-order fetch keyed off ?orderId=...
  const order = SALES_ORDER_DETAIL;

  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={SALES_SIDEBAR.menuLabel} items={SALES_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={SALES_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#1E5631] to-[#123A20] p-8 text-white">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                aria-label="Go back"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Sales Order Report</h1>
                <div className="mt-1 text-sm text-white/60">Single Order Details</div>
                <div className="text-sm font-semibold text-white/90">Order {order.orderId}</div>
              </div>
            </div>
          </div>

          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1E5631] text-xs font-bold text-white">
              1
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Order & Customer Information</h2>
              <p className="text-sm text-gray-400">
                Core identifiers for this order and the customer who placed it
              </p>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">Order Information</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-400">Order ID</dt>
                  <dd className="font-semibold text-gray-900">{order.orderId}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Order Date</dt>
                  <dd className="font-semibold text-gray-900">{order.orderDate}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Expected Delivery</dt>
                  <dd className="font-semibold text-gray-900">{order.expectedDelivery}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Actual Delivery</dt>
                  <dd className="font-semibold text-gray-900">{order.actualDelivery}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">Customer Information</h3>
              <div className="flex gap-4">
                <img
                  src={order.customerAvatarUrl}
                  alt={order.customerName}
                  className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                />
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-400">Customer Name</dt>
                    <dd className="font-semibold text-gray-900">{order.customerName}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Customer Type</dt>
                    <dd className="font-semibold text-gray-900">{order.customerType}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Contact Person</dt>
                    <dd className="font-semibold text-gray-900">{order.contactPerson}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Address</dt>
                    <dd className="font-semibold text-gray-900">{order.address}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1E5631] text-xs font-bold text-white">
              2
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
              <p className="text-sm text-gray-400">Product line items included in this order</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-[#1E5631] to-[#123A20] text-white">
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Quantity</th>
                  <th className="px-6 py-4 font-medium">Unit</th>
                  <th className="px-6 py-4 font-medium">Unit Price</th>
                  <th className="px-6 py-4 font-medium">Item Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-gray-800">{item.product}</td>
                    <td className="px-6 py-4 text-gray-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-gray-600">{item.unit}</td>
                    <td className="px-6 py-4 text-gray-600">${item.unitPrice}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {formatCurrencyWhole(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
