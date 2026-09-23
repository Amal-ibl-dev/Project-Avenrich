"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { Modal } from "../../../../shared/components/ui/Modal";
import { AddOrderItemModal } from "./AddOrderItemModal";
import type { SalesOrderLineItem } from "../../types/sales.types";

interface AddSalesOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (order: {
    orderDate: string;
    deliveryDate: string;
    items: SalesOrderLineItem[];
  }) => void;
}

const DATE_INPUT =
  "w-full rounded-full bg-white py-3 pl-5 pr-4 text-sm text-gray-500 outline-none [color-scheme:light]";

let lineItemSeq = 0;

/**
 * "Sales Order" form (Add_Sales_Order.png) — opened from the "Create Sales
 * Order" / "+ Add Sales Order" buttons. This is the *parent* step: its
 * "+ Add Order Item" button opens AddOrderItemModal as a *child* modal
 * (higher zIndex) stacked on top of this one; saving there adds a card to
 * the Order Item carousel below.
 */
export function AddSalesOrderModal({ open, onClose, onSave }: AddSalesOrderModalProps) {
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [items, setItems] = useState<SalesOrderLineItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const resetAndClose = () => {
    setOrderDate("");
    setDeliveryDate("");
    setItems([]);
    setActiveIndex(0);
    onClose();
  };

  const handleAddItemClick = () => {
    setEditingIndex(null);
    setItemModalOpen(true);
  };

  const handleEditItemClick = () => {
    setEditingIndex(activeIndex);
    setItemModalOpen(true);
  };

  const handleDeleteItemClick = () => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== activeIndex);
      setActiveIndex((i) => Math.max(0, Math.min(i, next.length - 1)));
      return next;
    });
  };

  const handleItemSave = (value: Omit<SalesOrderLineItem, "id" | "product">) => {
    if (editingIndex !== null) {
      setItems((prev) =>
        prev.map((item, i) => (i === editingIndex ? { ...item, ...value } : item))
      );
    } else {
      lineItemSeq += 1;
      const newItem: SalesOrderLineItem = {
        id: `line-${lineItemSeq}`,
        product: "Order Item",
        ...value,
      };
      setItems((prev) => [...prev, newItem]);
      setActiveIndex(items.length); // jump the carousel to the newly added card
    }
  };

  const handleSave = () => {
    if (!orderDate || !deliveryDate || items.length === 0) return;
    onSave?.({ orderDate, deliveryDate, items });
    resetAndClose();
  };

  const activeItem = items[activeIndex];

  return (
    <>
      <Modal open={open} onClose={resetAndClose} maxWidthClassName="max-w-md" zIndex={50}>
        <div className="space-y-6 pt-1">
          <h2 className="text-2xl font-bold text-gray-900">Sales Order</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-gray-700">Sale Order Date*</label>
              <div className="relative">
                <input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  className={DATE_INPUT}
                />
                <Calendar
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-700">Sale Delivery Date*</label>
              <div className="relative">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className={DATE_INPUT}
                />
                <Calendar
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">Order Item*</label>

            {activeItem ? (
              <div className="rounded-2xl bg-white p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="grid flex-1 grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-400">Quantity</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {activeItem.quantity}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Units</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {activeItem.unit}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Unit Price</div>
                      <div className="text-lg font-semibold text-gray-900">
                        ${activeItem.unitPrice}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-2 text-gray-700">
                    <button
                      onClick={handleEditItemClick}
                      aria-label="Edit order item"
                      className="transition-colors hover:text-gray-900"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={handleDeleteItemClick}
                      aria-label="Delete order item"
                      className="transition-colors hover:text-rose-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="text-xs text-gray-400">Total Price</div>
                  <div className="text-xl font-bold text-gray-900">
                    ${(activeItem.quantity * activeItem.unitPrice).toLocaleString()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400">
                No order items yet — add one below.
              </div>
            )}

            {items.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  disabled={activeIndex === 0}
                  aria-label="Previous item"
                  className="text-gray-400 transition-colors hover:text-gray-700 disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1.5">
                  {items.map((item, i) => (
                    <span
                      key={item.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex ? "w-5 bg-[#1E5631]" : "w-1.5 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveIndex((i) => Math.min(items.length - 1, i + 1))}
                  disabled={activeIndex === items.length - 1}
                  aria-label="Next item"
                  className="text-gray-400 transition-colors hover:text-gray-700 disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleAddItemClick}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1E5631] py-3 text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#EAF6EE]"
          >
            <Plus size={16} />
            Add Order Item
          </button>

          <button
            onClick={handleSave}
            className="w-full rounded-full bg-gradient-to-b from-[#1E5631] to-[#123A20] py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Save
          </button>
        </div>
      </Modal>

      <AddOrderItemModal
        open={itemModalOpen}
        onClose={() => setItemModalOpen(false)}
        onSave={handleItemSave}
        initialValue={editingIndex !== null ? items[editingIndex] : null}
      />
    </>
  );
}
