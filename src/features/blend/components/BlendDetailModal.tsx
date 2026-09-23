"use client";

import React, { useState } from "react";
import { Layers, Scale, CalendarDays, CircleDot, Printer } from "lucide-react";
import { Modal } from "../../../shared/components/ui/Modal";
import { StatusBadge } from "../../../shared/components/ui/StatusBadge";
import { Pagination } from "../../../shared/components/ui/Pagination";
import { BLEND_DETAIL_MATERIALS_PER_PAGE } from "../constants/blend.constants";
import type { BlendDetail } from "../types/blend.types";

interface BlendDetailModalProps {
  open: boolean;
  onClose: () => void;
  detail: BlendDetail | null;
}

const MATERIAL_COLUMNS = ["Material name", "Allocated Quantity", "Units", "Id Issued"];

/** Small pill-bordered stat used for Blend Name / Quantity / Created at / Status. */
function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        <Icon size={16} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="text-lg font-bold text-gray-900">{children}</div>
    </div>
  );
}

/**
 * "View blend" modal opened from a Blend List row (the arrow button). Shows
 * the blend's headline info plus its full material allocation breakdown,
 * paginated the same way every other list in the app is.
 */
export function BlendDetailModal({ open, onClose, detail }: BlendDetailModalProps) {
  const [page, setPage] = useState(1);

  if (!detail) return null;

  const pageCount = Math.max(1, Math.ceil(detail.materials.length / BLEND_DETAIL_MATERIALS_PER_PAGE));
  const start = (page - 1) * BLEND_DETAIL_MATERIALS_PER_PAGE;
  const pageRows = detail.materials.slice(start, start + BLEND_DETAIL_MATERIALS_PER_PAGE);

  return (
    <Modal open={open} onClose={onClose} maxWidthClassName="max-w-3xl">
      <div className="mb-6 flex items-start justify-between pr-8">
        <h2 className="text-3xl font-bold text-gray-900">{detail.productName}</h2>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full bg-[#1E5631] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#164124]"
        >
          <Printer size={16} />
          Export Pdf
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <InfoCard icon={Layers} label="Blend Name">
          {detail.blendName}
        </InfoCard>
        <InfoCard icon={Scale} label="Quantity">
          {detail.quantityKg} kg
        </InfoCard>
        <InfoCard icon={CalendarDays} label="Created at">
          {detail.createdAt}
        </InfoCard>
        <InfoCard icon={CircleDot} label="Status">
          <StatusBadge label={detail.status} variant="completed" />
        </InfoCard>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {MATERIAL_COLUMNS.map((col, i) => (
                <th
                  key={col}
                  className={`bg-gradient-to-r from-[#1E5631] to-[#123A20] px-4 py-3 text-left font-medium text-white ${
                    i === 0 ? "rounded-l-xl" : ""
                  } ${i === MATERIAL_COLUMNS.length - 1 ? "rounded-r-xl" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 bg-white last:border-0">
                <td className="px-4 py-3.5 font-medium text-[#123A20]">{row.materialName}</td>
                <td className="px-4 py-3.5 text-gray-700">{row.allocatedQuantity}</td>
                <td className="px-4 py-3.5 text-gray-700">{row.units}</td>
                <td className="px-4 py-3.5 text-gray-700">{row.idIssued ? "YES" : "NO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </Modal>
  );
}
