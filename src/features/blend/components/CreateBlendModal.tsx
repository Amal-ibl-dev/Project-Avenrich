"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Trash2, Plus, Check } from "lucide-react";
import { Modal } from "../../../shared/components/ui/Modal";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
import { BLEND_NAME_OPTIONS } from "../constants/blend.constants";

interface AllocationEntry {
  id: string;
  materialName: string;
  allocatedQuantity: string;
  units: string;
}

export interface CreateBlendPayload {
  productName: string;
  blendName: string;
  quantity: string;
  allocations: AllocationEntry[];
}

interface CreateBlendModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreateBlendPayload) => void;
}

let allocationSeq = 0;
function newAllocation(): AllocationEntry {
  allocationSeq += 1;
  return { id: `alloc-${allocationSeq}`, materialName: "", allocatedQuantity: "", units: "" };
}

/**
 * "Add Blend Order" form. Blend allocation is a small one-card-at-a-time
 * carousel (dots + arrows) rather than a long stacked list, matching the
 * Create Blend design — each raw material gets edited or removed in place,
 * and "+ Add Raw Material" appends + jumps to a new blank card.
 */
export function CreateBlendModal({ open, onClose, onCreate }: CreateBlendModalProps) {
  const [productName, setProductName] = useState("");
  const [blendName, setBlendName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [allocations, setAllocations] = useState<AllocationEntry[]>([
    { id: "alloc-seed", materialName: "Herbal Tea", allocatedQuantity: "1000", units: "150" },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [productNameError, setProductNameError] = useState<string | undefined>();

  if (!open) return null;

  const active = allocations[activeIndex];

  function updateActiveAllocation(patch: Partial<AllocationEntry>) {
    setAllocations((prev) =>
      prev.map((entry, index) => (index === activeIndex ? { ...entry, ...patch } : entry))
    );
  }

  function handleAddRawMaterial() {
    setAllocations((prev) => [...prev, newAllocation()]);
    setActiveIndex(allocations.length); // jump to the newly-appended card
    setEditingId(null);
  }

  function handleRemoveActive() {
    if (allocations.length === 1) return; // always keep at least one card
    setAllocations((prev) => prev.filter((_, index) => index !== activeIndex));
    setActiveIndex((prev) => Math.max(0, prev - 1));
    setEditingId(null);
  }

  function handleReset() {
    setProductName("");
    setBlendName("");
    setQuantity("");
    setAllocations([newAllocation()]);
    setActiveIndex(0);
    setEditingId(null);
    setProductNameError(undefined);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!productName.trim()) {
      setProductNameError("Product name is required");
      return;
    }
    onCreate({ productName, blendName, quantity, allocations });
    handleReset();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        handleReset();
        onClose();
      }}
      maxWidthClassName="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 pr-2">
        <h2 className="text-3xl font-bold text-gray-900">Create Blend</h2>

        <Input
          label="Product name*"
          id="blend-product-name"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(event) => {
            setProductName(event.target.value);
            if (productNameError) setProductNameError(undefined);
          }}
          error={productNameError}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="blend-name-select" className="text-sm font-medium text-gray-700">
              Select Blend Name
            </label>
            <select
              id="blend-name-select"
              value={blendName}
              onChange={(event) => setBlendName(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
            >
              <option value="">Select Blend Name</option>
              {BLEND_NAME_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Quantity"
            id="blend-quantity"
            placeholder="Enter Quantity"
            type="number"
            min={0}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-gray-700">Blend Allocation</span>

          <div className="rounded-2xl bg-white p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="text-xs text-gray-500">Material Name</div>
                {editingId === active.id ? (
                  <input
                    autoFocus
                    value={active.materialName}
                    onChange={(event) => updateActiveAllocation({ materialName: event.target.value })}
                    className="mt-1 w-full border-b border-gray-300 pb-1 text-lg font-bold text-gray-900 outline-none focus:border-[#2D5A27]"
                  />
                ) : (
                  <div className="truncate text-lg font-bold text-gray-900">
                    {active.materialName || "Untitled material"}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pl-3">
                <button
                  type="button"
                  aria-label={editingId === active.id ? "Save material" : "Edit material"}
                  onClick={() => setEditingId(editingId === active.id ? null : active.id)}
                  className="text-gray-500 transition-colors hover:text-gray-800"
                >
                  {editingId === active.id ? <Check size={18} /> : <Pencil size={18} />}
                </button>
                <button
                  type="button"
                  aria-label="Remove material"
                  onClick={handleRemoveActive}
                  disabled={allocations.length === 1}
                  className="text-gray-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs text-gray-500">Allocated Quantity</div>
                {editingId === active.id ? (
                  <input
                    value={active.allocatedQuantity}
                    onChange={(event) =>
                      updateActiveAllocation({ allocatedQuantity: event.target.value })
                    }
                    inputMode="decimal"
                    className="mt-1 w-full border-b border-gray-300 pb-1 text-base font-bold text-gray-900 outline-none focus:border-[#2D5A27]"
                  />
                ) : (
                  <div className="text-base font-bold text-gray-900">
                    {active.allocatedQuantity || "—"}
                  </div>
                )}
              </div>
              <div>
                <div className="text-xs text-gray-500">Units</div>
                {editingId === active.id ? (
                  <input
                    value={active.units}
                    onChange={(event) => updateActiveAllocation({ units: event.target.value })}
                    inputMode="decimal"
                    className="mt-1 w-full border-b border-gray-300 pb-1 text-base font-bold text-gray-900 outline-none focus:border-[#2D5A27]"
                  />
                ) : (
                  <div className="text-base font-bold text-gray-900">{active.units || "—"}</div>
                )}
              </div>
            </div>
          </div>

          {allocations.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous material"
                onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeIndex === 0}
                className="text-gray-500 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1.5">
                {allocations.map((entry, index) => (
                  <span
                    key={entry.id}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex ? "w-6 bg-[#1E5631]" : "w-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next material"
                onClick={() => setActiveIndex((prev) => Math.min(allocations.length - 1, prev + 1))}
                disabled={activeIndex === allocations.length - 1}
                className="text-gray-500 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddRawMaterial}
          className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Plus size={16} />
          Add Raw Material
        </button>

        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
}
