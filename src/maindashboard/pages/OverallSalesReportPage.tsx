"use client";

import React, { useState } from "react";
import { ArrowLeft, Minus, Plus, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../components/layout/Sidebar";
import { TopNav } from "../components/layout/TopNav";
import { SALES_SIDEBAR } from "../constants/navigation.constants";
import { OVERALL_REPORT_SECTIONS, SALES_MANAGER_USER } from "../constants/sales.constants";

export default function OverallSalesReportPage() {
  const router = useRouter();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div
      className="flex min-h-screen bg-[#F4F5F7] text-gray-800"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Sidebar menuLabel={SALES_SIDEBAR.menuLabel} items={SALES_SIDEBAR.items} />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopNav user={SALES_MANAGER_USER} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mb-6 rounded-3xl bg-gradient-to-r from-[#1E5631] to-[#123A20] p-8 text-white">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                aria-label="Go back"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">OVERALL SALES REPORT</h1>
                <div className="mt-1 text-sm text-white/70">Sales Performance &amp; Order flow Sheet</div>
                <div className="text-sm text-white/70">Reporting period: AVC0121 2026 (April - June)</div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button className="flex items-center gap-2 rounded-full bg-[#1E5631] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#164124]">
              <Printer size={16} />
              Export Pdf
            </button>
          </div>

          <div className="rounded-3xl bg-white p-2 shadow-sm">
            {OVERALL_REPORT_SECTIONS.map((section, i) => {
              const isOpen = openSections.has(section.id);
              return (
                <div
                  key={section.id}
                  className={i !== OVERALL_REPORT_SECTIONS.length - 1 ? "border-b border-gray-100" : ""}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#1E5631] text-sm font-bold text-white">
                        {section.number}
                      </span>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{section.title}</div>
                        <div className="text-sm text-gray-400">{section.description}</div>
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500"
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pl-16 text-sm text-gray-500">
                      Section data will populate here once the reporting backend is connected.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
