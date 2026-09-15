"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown, Plus, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../components/layout/Sidebar";
import { TopNav } from "../components/layout/TopNav";
import { Pagination } from "../components/common/Pagination";
import { AddContactPersonModal } from "../components/sales/customers/AddContactPersonModal";
import { SALES_SIDEBAR } from "../constants/navigation.constants";
import { CUSTOMER_ROWS, SALES_MANAGER_USER } from "../constants/sales.constants";
import type { CustomerType } from "../types/sales.types";

const TYPE_COLOR: Record<CustomerType, string> = {
  Export: "border-fuchsia-400 text-fuchsia-500",
  "Contract Packing": "border-blue-400 text-blue-500",
};

const PAGE_SIZE = 10;

export default function CustomerListPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);

  const pageCount = Math.max(1, Math.ceil(CUSTOMER_ROWS.length / PAGE_SIZE));
  const rows = CUSTOMER_ROWS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
              <h1 className="text-3xl font-bold text-gray-900">Customer List</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700">
                Regular
                <ChevronDown size={14} />
              </button>
              <button
                onClick={() => setAddCustomerOpen(true)}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
              >
                <Plus size={16} />
                Add Customer
              </button>
              <button className="flex items-center gap-2 rounded-full bg-[#1E5631] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#164124]">
                <Printer size={16} />
                Export Pdf
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-[#1E5631] to-[#123A20] text-white">
                  <th className="w-10 px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded" />
                  </th>
                  <th className="px-6 py-4 font-medium">Customer id</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Address</th>
                  <th className="px-6 py-4 font-medium">Customer Type</th>
                  <th className="w-12 px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4">
                      <input type="checkbox" className="h-4 w-4 rounded" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{row.customerCode}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.avatarUrl}
                          alt={row.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{row.name}</div>
                          <div className="text-xs text-gray-400">{row.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.email}</td>
                    <td className="px-6 py-4 text-gray-600">{row.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{row.address}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${TYPE_COLOR[row.customerType]}`}
                      >
                        {row.customerType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => router.push(`/sales/customers/${row.id}`)}
                        aria-label="View customer"
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

      <AddContactPersonModal open={addCustomerOpen} onClose={() => setAddCustomerOpen(false)} />
    </div>
  );
}
