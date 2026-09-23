"use client";

import React, { useMemo, useState } from "react";
import { Plus, Printer } from "lucide-react";
import { ListPageShell } from "../../../shared/components/layout/ListPageShell";
import { ActionButton } from "../../../shared/components/ui/ActionButton";
import { RowActionButton } from "../../../shared/components/ui/RowActionButton";
import { Pagination } from "../../../shared/components/ui/Pagination";
import { BlendDetailModal } from "../components/BlendDetailModal";
import { CreateBlendModal, type CreateBlendPayload } from "../components/CreateBlendModal";
import {
  BLEND_DETAILS,
  BLEND_LIST,
  BLEND_LIST_ROWS_PER_PAGE,
  BLEND_MATERIAL_MANAGER_USER,
  BLEND_SIDEBAR,
} from "../constants/blend.constants";
import type { BlendDetail, BlendListRow } from "../types/blend.types";

const COLUMNS = ["Blend ID", "Product Name", "Select Brand Name", "Quantity (Kd)", "Blend Alocation(Kg)"];

export default function BlendListPage() {
  const [rows, setRows] = useState<BlendListRow[]>(BLEND_LIST);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [detailBlend, setDetailBlend] = useState<BlendDetail | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const pageCount = Math.max(1, Math.ceil(rows.length / BLEND_LIST_ROWS_PER_PAGE));
  const pageRows = useMemo(() => {
    const start = (page - 1) * BLEND_LIST_ROWS_PER_PAGE;
    return rows.slice(start, start + BLEND_LIST_ROWS_PER_PAGE);
  }, [rows, page]);

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((row) => selected.has(row.id));

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllOnPage() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        pageRows.forEach((row) => next.delete(row.id));
      } else {
        pageRows.forEach((row) => next.add(row.id));
      }
      return next;
    });
  }

  function handleViewRow(row: BlendListRow) {
    // Mock data only has one fleshed-out detail record (Ceylon Black Tea /
    // BL-0001); every row in BLEND_LIST currently shares that blendId, so
    // this always resolves. A real backend would fetch by row.id instead.
    setDetailBlend(BLEND_DETAILS[row.blendId] ?? null);
  }

  function handleCreateBlend(payload: CreateBlendPayload) {
    const nextId = `bl-row-${rows.length + 1}`;
    const allocationTotal = payload.allocations.reduce(
      (sum, entry) => sum + (Number(entry.allocatedQuantity) || 0),
      0
    );
    setRows((prev) => [
      {
        id: nextId,
        blendId: "BL-0001",
        productName: payload.productName,
        blendName: payload.blendName || "—",
        quantityKg: Number(payload.quantity) || 0,
        allocationKg: allocationTotal,
      },
      ...prev,
    ]);
    setPage(1);
  }

  return (
    <>
      <ListPageShell
        sidebar={BLEND_SIDEBAR}
        user={BLEND_MATERIAL_MANAGER_USER}
        title="Blend List"
        actions={
          <>
            <ActionButton label="Add Blend Order" icon={Plus} variant="outline" onClick={() => setCreateOpen(true)} />
            <ActionButton label="Export Pdf" icon={Printer} variant="solid" onClick={() => window.print()} />
          </>
        }
      >
        <div className="overflow-x-auto rounded-3xl bg-white p-2 shadow-sm">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="w-12 rounded-l-xl bg-gradient-to-r from-[#1E5631] to-[#123A20] px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all rows on this page"
                    checked={allOnPageSelected}
                    onChange={toggleAllOnPage}
                    className="h-4 w-4 rounded border-white/40 accent-white"
                  />
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="bg-gradient-to-r from-[#1E5631] to-[#123A20] px-4 py-3 text-left font-medium text-white"
                  >
                    {col}
                  </th>
                ))}
                <th className="w-14 rounded-r-xl bg-gradient-to-r from-[#1E5631] to-[#123A20] px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      aria-label={`Select ${row.blendId}`}
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="h-4 w-4 rounded border-gray-300 accent-[#1E5631]"
                    />
                  </td>
                  <td className="px-4 py-4 text-gray-700">{row.blendId}</td>
                  <td className="px-4 py-4 text-gray-700">{row.productName}</td>
                  <td className="px-4 py-4 text-gray-700">{row.blendName}</td>
                  <td className="px-4 py-4 text-gray-700">{row.quantityKg}</td>
                  <td className="px-4 py-4 text-gray-700">{row.allocationKg}</td>
                  <td className="px-4 py-4">
                    <RowActionButton label={`Open blend ${row.blendId}`} onClick={() => handleViewRow(row)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </ListPageShell>

      <BlendDetailModal open={detailBlend !== null} onClose={() => setDetailBlend(null)} detail={detailBlend} />
      <CreateBlendModal open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreateBlend} />
    </>
  );
}
