"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Modal } from "../../../../shared/components/ui/Modal";
import { Button } from "../../../../shared/components/ui/Button";
import type { WipEntry } from "../../types/inventory.types";

interface WipEntryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (entry: { quantityOfProcess: string; startDate: string }) => void;
  /** Present when editing an existing entry (pre-fills the form). */
  initialEntry?: WipEntry | null;
}

/**
 * Small modal-on-a-modal for adding or editing one Work in Progress
 * carousel card inside StockApplicationModal.
 */
export function WipEntryModal({ open, onClose, onSave, initialEntry }: WipEntryModalProps) {
  const [quantityOfProcess, setQuantityOfProcess] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    if (open) {
      setQuantityOfProcess(initialEntry?.quantityOfProcess ?? "");
      setStartDate(initialEntry?.startDate ?? "");
    }
  }, [open, initialEntry]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSave({ quantityOfProcess, startDate });
  }

  return (
    <Modal open={open} onClose={onClose} maxWidthClassName="max-w-sm" zIndex={60}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 pr-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="qty-of-process-input" className="text-sm font-medium text-gray-700">
            Quantity on process
          </label>
          <input
            id="qty-of-process-input"
            value={quantityOfProcess}
            onChange={(event) => setQuantityOfProcess(event.target.value)}
            inputMode="decimal"
            placeholder="Enter quantity Of Process"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-colors focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="wip-start-date-input" className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="flex items-center rounded-xl border border-gray-200 bg-white pr-3 focus-within:border-[#2D5A27] focus-within:ring-2 focus-within:ring-[#2D5A27]/20">
            <input
              id="wip-start-date-input"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full bg-transparent px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none"
            />
            <Calendar size={16} className="text-gray-400" />
          </div>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
}
