"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../../common/Modal";
import type { SalesOrderLineItem } from "../../../types/sales.types";

interface AddOrderItemModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<SalesOrderLineItem, "id" | "product">) => void;
  /** Pre-filled values when editing an existing line item. */
  initialValue?: Omit<SalesOrderLineItem, "id" | "product"> | null;
}

const PILL_INPUT =
  "w-full rounded-full bg-white py-3 px-5 text-sm text-gray-800 outline-none placeholder:text-gray-400";

/**
 * "Order Item" form (order_Item.png) — the child step of the
 * Add Sales Order flow. Renders above AddSalesOrderModal via a higher zIndex.
 */
export function AddOrderItemModal({ open, onClose, onSave, initialValue }: AddOrderItemModalProps) {
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [itemTotal, setItemTotal] = useState("");

  useEffect(() => {
    if (!open) return;
    setQuantity(initialValue ? String(initialValue.quantity) : "");
    setUnit(initialValue ? initialValue.unit : "");
    setUnitPrice(initialValue ? String(initialValue.unitPrice) : "");
    setItemTotal(
      initialValue ? String(initialValue.quantity * initialValue.unitPrice) : ""
    );
  }, [open, initialValue]);

  // Keep the total in sync whenever quantity or unit price change.
  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    const qty = Number(value) || 0;
    const price = Number(unitPrice) || 0;
    setItemTotal(qty && price ? String(qty * price) : itemTotal);
  };

  const handleUnitPriceChange = (value: string) => {
    setUnitPrice(value);
    const qty = Number(quantity) || 0;
    const price = Number(value) || 0;
    setItemTotal(qty && price ? String(qty * price) : itemTotal);
  };

  const handleSave = () => {
    const qty = Number(quantity);
    const price = Number(unitPrice);
    if (!qty || !unit.trim() || !price) return;

    onSave({ quantity: qty, unit: unit.trim(), unitPrice: price });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidthClassName="max-w-sm" zIndex={60}>
      <div className="space-y-5 pt-1">
        <div>
          <label className="mb-2 block text-sm text-gray-700">Quantity*</label>
          <input
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            placeholder="Enter Your Quantity Amount"
            className={PILL_INPUT}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-700">Unit*</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Enter No. of Unit"
            className={PILL_INPUT}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-700">Unit Price*</label>
          <div className="flex items-center gap-2 rounded-full bg-white pl-5 pr-2">
            <span className="text-sm text-gray-400">LKR</span>
            <input
              type="number"
              min={0}
              value={unitPrice}
              onChange={(e) => handleUnitPriceChange(e.target.value)}
              className="w-full rounded-full py-3 pr-3 text-sm text-gray-800 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-700">Item Total Price*</label>
          <div className="flex items-center gap-2 rounded-full bg-white pl-5 pr-2">
            <span className="text-sm text-gray-400">LKR</span>
            <input
              type="number"
              min={0}
              value={itemTotal}
              onChange={(e) => setItemTotal(e.target.value)}
              className="w-full rounded-full py-3 pr-3 text-sm text-gray-800 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-full bg-gradient-to-b from-[#1E5631] to-[#123A20] py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
