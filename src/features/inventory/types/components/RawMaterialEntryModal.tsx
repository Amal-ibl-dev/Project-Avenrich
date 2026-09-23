"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../../../../shared/components/ui/Modal";
import { Button } from "../../../../shared/components/ui/Button";
import { TEA_TYPE_OPTIONS } from "../../constants/inventory.constants";
import type { RawMaterialEntry } from "../../types/inventory.types";

interface RawMaterialEntryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (entry: { teaType: string; unitPrice: string }) => void;
  /** Present when editing an existing entry (pre-fills the form). */
  initialEntry?: RawMaterialEntry | null;
}

/**
 * Small modal-on-a-modal for adding or editing one Raw Material carousel
 * card inside StockApplicationModal. Opens with a higher z-index so it
 * layers over the Stock Application modal instead of replacing it.
 */
export function RawMaterialEntryModal({
  open,
  onClose,
  onSave,
  initialEntry,
}: RawMaterialEntryModalProps) {
  const [teaType, setTeaType] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  useEffect(() => {
    if (open) {
      setTeaType(initialEntry?.teaType ?? "");
      setUnitPrice(initialEntry?.unitPrice ?? "");
    }
  }, [open, initialEntry]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSave({ teaType, unitPrice });
  }

  return (
    <Modal open={open} onClose={onClose} maxWidthClassName="max-w-sm" zIndex={60}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 pr-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="tea-type-select" className="text-sm font-medium text-gray-700">
            Tea Type
          </label>
          <select
            id="tea-type-select"
            value={teaType}
            onChange={(event) => setTeaType(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
          >
            <option value="">Tea Type</option>
            {TEA_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="unit-price-input" className="text-sm font-medium text-gray-700">
            Unit Price
          </label>
          <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 focus-within:border-[#2D5A27] focus-within:ring-2 focus-within:ring-[#2D5A27]/20">
            <span className="text-gray-400">$</span>
            <input
              id="unit-price-input"
              value={unitPrice}
              onChange={(event) => setUnitPrice(event.target.value)}
              inputMode="decimal"
              placeholder="0.00"
              className="w-full bg-transparent py-3 pl-2 text-sm text-gray-700 outline-none"
            />
          </div>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
}
