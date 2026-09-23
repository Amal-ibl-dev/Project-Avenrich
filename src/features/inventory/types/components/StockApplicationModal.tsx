"use client";

import React, { useState } from "react";
import { Calendar, Hash, Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "../../../../shared/components/ui/Modal";
import { Button } from "../../../../shared/components/ui/Button";
import { Input } from "../../../../shared/components/ui/Input";
import { RawMaterialEntryModal } from "./RawMaterialEntryModal";
import { WipEntryModal } from "./WipEntryModal";
import {
  CERTIFICATION_OPTIONS,
  RAW_MATERIAL_STOCK_OPTIONS,
  WIP_STOCK_OPTIONS,
} from "../../constants/inventory.constants";
import type { RawMaterialEntry, StockCategory, WipEntry } from "../../types/inventory.types";

export interface StockApplicationPayload {
  stockName: string;
  expiredDate: string;
  lastUpdate: string;
  unit: string;
  period: string;
  certification: string;
  quantity: string;
  state: string;
  materialType: StockCategory;
  packageSize?: string;
  rawMaterialStock?: string;
  rawMaterialEntries?: RawMaterialEntry[];
  wipStock?: string;
  wipEntries?: WipEntry[];
}

interface StockApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (payload: StockApplicationPayload) => void;
  /** Which Material Type tab is active when the modal opens. */
  initialTab?: StockCategory;
}

const TABS: StockCategory[] = ["Finished Goods", "Raw Material", "Work in Progress"];

let rawSeq = 0;
function newRawEntry(teaType: string, unitPrice: string): RawMaterialEntry {
  rawSeq += 1;
  return { id: `raw-${rawSeq}`, teaType, unitPrice };
}

let wipSeq = 0;
function newWipEntry(quantityOfProcess: string, startDate: string): WipEntry {
  wipSeq += 1;
  return { id: `wip-${wipSeq}`, quantityOfProcess, startDate };
}

/** Label + a white pill field with an icon docked in its right edge. */
function TrailingIconField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center rounded-xl border border-gray-200 bg-white pr-3 focus-within:border-[#2D5A27] focus-within:ring-2 focus-within:ring-[#2D5A27]/20">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none"
        />
        <Icon size={16} className="text-gray-400" />
      </div>
    </div>
  );
}

/**
 * "New Inventory" / "Add New Item" form. The right-hand "Material Type"
 * panel is one bordered card with three tabs — Finished Goods is a single
 * package-size field, Raw Material and Work in Progress each carry a small
 * one-card-at-a-time carousel of entries (same interaction as the Blend
 * module's allocation carousel), each entry edited/added through its own
 * nested modal (RawMaterialEntryModal / WipEntryModal) rather than inline.
 */
export function StockApplicationModal({
  open,
  onClose,
  onSave,
  initialTab = "Finished Goods",
}: StockApplicationModalProps) {
  const [activeTab, setActiveTab] = useState<StockCategory>(initialTab);

  const [stockName, setStockName] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [unit, setUnit] = useState("");
  const [period, setPeriod] = useState("");
  const [certification, setCertification] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stockState, setStockState] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [packageSize, setPackageSize] = useState("");

  const [rawMaterialStock, setRawMaterialStock] = useState("");
  const [rawMaterialEntries, setRawMaterialEntries] = useState<RawMaterialEntry[]>([]);
  const [activeRawIndex, setActiveRawIndex] = useState(0);
  const [rawEntryModalOpen, setRawEntryModalOpen] = useState(false);
  const [editingRawEntry, setEditingRawEntry] = useState<RawMaterialEntry | null>(null);

  const [wipStock, setWipStock] = useState("");
  const [wipEntries, setWipEntries] = useState<WipEntry[]>([]);
  const [activeWipIndex, setActiveWipIndex] = useState(0);
  const [wipEntryModalOpen, setWipEntryModalOpen] = useState(false);
  const [editingWipEntry, setEditingWipEntry] = useState<WipEntry | null>(null);

  if (!open) return null;

  function resetForm() {
    setActiveTab(initialTab);
    setStockName("");
    setExpiredDate("");
    setLastUpdate("");
    setUnit("");
    setPeriod("");
    setCertification("");
    setQuantity("");
    setStockState("");
    setErrors({});
    setPackageSize("");
    setRawMaterialStock("");
    setRawMaterialEntries([]);
    setActiveRawIndex(0);
    setWipStock("");
    setWipEntries([]);
    setActiveWipIndex(0);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSaveRawEntry(entry: { teaType: string; unitPrice: string }) {
    if (editingRawEntry) {
      setRawMaterialEntries((prev) =>
        prev.map((item) => (item.id === editingRawEntry.id ? { ...item, ...entry } : item))
      );
    } else {
      setRawMaterialEntries((prev) => {
        const next = [...prev, newRawEntry(entry.teaType, entry.unitPrice)];
        setActiveRawIndex(next.length - 1);
        return next;
      });
    }
    setRawEntryModalOpen(false);
    setEditingRawEntry(null);
  }

  function handleRemoveActiveRawEntry() {
    setRawMaterialEntries((prev) => prev.filter((_, index) => index !== activeRawIndex));
    setActiveRawIndex((prev) => Math.max(0, prev - 1));
  }

  function handleSaveWipEntry(entry: { quantityOfProcess: string; startDate: string }) {
    if (editingWipEntry) {
      setWipEntries((prev) =>
        prev.map((item) => (item.id === editingWipEntry.id ? { ...item, ...entry } : item))
      );
    } else {
      setWipEntries((prev) => {
        const next = [...prev, newWipEntry(entry.quantityOfProcess, entry.startDate)];
        setActiveWipIndex(next.length - 1);
        return next;
      });
    }
    setWipEntryModalOpen(false);
    setEditingWipEntry(null);
  }

  function handleRemoveActiveWipEntry() {
    setWipEntries((prev) => prev.filter((_, index) => index !== activeWipIndex));
    setActiveWipIndex((prev) => Math.max(0, prev - 1));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!stockName.trim()) nextErrors.stockName = "Stock name is required";
    if (!expiredDate.trim()) nextErrors.expiredDate = "Expired date is required";
    if (!unit.trim()) nextErrors.unit = "Unit is required";
    if (!certification.trim()) nextErrors.certification = "Certification is required";
    if (!stockState.trim()) nextErrors.stockState = "State is required";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      stockName,
      expiredDate,
      lastUpdate,
      unit,
      period,
      certification,
      quantity,
      state: stockState,
      materialType: activeTab,
      packageSize: activeTab === "Finished Goods" ? packageSize : undefined,
      rawMaterialStock: activeTab === "Raw Material" ? rawMaterialStock : undefined,
      rawMaterialEntries: activeTab === "Raw Material" ? rawMaterialEntries : undefined,
      wipStock: activeTab === "Work in Progress" ? wipStock : undefined,
      wipEntries: activeTab === "Work in Progress" ? wipEntries : undefined,
    });
    handleClose();
  }

  const activeRaw = rawMaterialEntries[activeRawIndex];
  const activeWip = wipEntries[activeWipIndex];

  return (
    <>
      <Modal open={open} onClose={handleClose} maxWidthClassName="max-w-4xl">
        <form onSubmit={handleSubmit} className="pr-2">
          <h2 className="text-3xl font-bold text-gray-900">Stock Application</h2>
          <p className="mt-1 text-sm text-gray-500">
            Easily log new materials, assets, or production supplies into your inventory
          </p>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left column: common stock fields */}
            <div className="flex flex-col gap-5">
              <Input
                label="Stock Name*"
                id="stock-name"
                placeholder="Enter Stock Name"
                value={stockName}
                onChange={(event) => {
                  setStockName(event.target.value);
                  if (errors.stockName) setErrors((prev) => ({ ...prev, stockName: "" }));
                }}
                error={errors.stockName}
              />

              <div className="grid grid-cols-2 gap-4">
                <TrailingIconField
                  label="Expired Date*"
                  icon={Calendar}
                  value={expiredDate}
                  onChange={setExpiredDate}
                  placeholder="DD/MM/YYYY"
                />
                <TrailingIconField
                  label="Last Update"
                  icon={Calendar}
                  value={lastUpdate}
                  onChange={setLastUpdate}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              {errors.expiredDate && (
                <p className="-mt-3 text-xs font-medium text-red-500">{errors.expiredDate}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <TrailingIconField
                  label="Unit*"
                  icon={Hash}
                  value={unit}
                  onChange={setUnit}
                  placeholder="Enter No. Of Units"
                />
                <TrailingIconField
                  label="Period"
                  icon={Calendar}
                  value={period}
                  onChange={setPeriod}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              {errors.unit && <p className="-mt-3 text-xs font-medium text-red-500">{errors.unit}</p>}

              <div className="flex flex-col gap-2">
                <label htmlFor="certification-select" className="text-sm font-medium text-gray-700">
                  Certification*
                </label>
                <select
                  id="certification-select"
                  value={certification}
                  onChange={(event) => {
                    setCertification(event.target.value);
                    if (errors.certification) setErrors((prev) => ({ ...prev, certification: "" }));
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
                >
                  <option value="">Select the Cetification</option>
                  {CERTIFICATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.certification && (
                  <p className="text-xs font-medium text-red-500">{errors.certification}</p>
                )}
              </div>

              <Input
                label="Quantity"
                id="stock-quantity"
                placeholder="Enter Quantity"
                type="number"
                min={0}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="stock-state-select" className="text-sm font-medium text-gray-700">
                  State*
                </label>
                <select
                  id="stock-state-select"
                  value={stockState}
                  onChange={(event) => {
                    setStockState(event.target.value);
                    if (errors.stockState) setErrors((prev) => ({ ...prev, stockState: "" }));
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
                >
                  <option value="">Select Your State</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out Stock">Out Stock</option>
                </select>
                {errors.stockState && (
                  <p className="text-xs font-medium text-red-500">{errors.stockState}</p>
                )}
              </div>
            </div>

            {/* Right column: Material Type tabs */}
            <div>
              <span className="mb-2 block text-sm font-medium text-gray-700">Material Type</span>

              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="mb-4 flex items-center gap-5 border-b border-gray-100 pb-3">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`pb-1 text-sm transition-colors ${
                        activeTab === tab
                          ? "border-b-2 border-[#1E5631] font-semibold text-[#1E5631]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "Finished Goods" && (
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">Finished Goods</h4>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white pr-4">
                      <input
                        value={packageSize}
                        onChange={(event) => setPackageSize(event.target.value)}
                        placeholder="Enter Package Size"
                        className="w-full bg-transparent px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                      />
                      <span className="text-sm text-gray-400">KG</span>
                    </div>
                  </div>
                )}

                {activeTab === "Raw Material" && (
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">Raw Material</h4>
                    <select
                      value={rawMaterialStock}
                      onChange={(event) => setRawMaterialStock(event.target.value)}
                      className="mb-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
                    >
                      <option value="">Select Your Raw Material Stock</option>
                      {RAW_MATERIAL_STOCK_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {activeRaw && (
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500">Tea Type</div>
                            <div className="truncate text-lg font-bold text-gray-900">
                              {activeRaw.teaType || "Untitled"}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 pl-3">
                            <button
                              type="button"
                              aria-label="Edit raw material"
                              onClick={() => {
                                setEditingRawEntry(activeRaw);
                                setRawEntryModalOpen(true);
                              }}
                              className="text-gray-500 hover:text-gray-800"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Remove raw material"
                              onClick={handleRemoveActiveRawEntry}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">Unit Price</div>
                        <div className="text-base font-bold text-gray-900">
                          ${activeRaw.unitPrice || "0"}
                        </div>
                      </div>
                    )}

                    {rawMaterialEntries.length > 1 && (
                      <div className="mt-3 flex items-center justify-center gap-4">
                        <button
                          type="button"
                          aria-label="Previous raw material"
                          onClick={() => setActiveRawIndex((prev) => Math.max(0, prev - 1))}
                          disabled={activeRawIndex === 0}
                          className="text-gray-500 disabled:opacity-30"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <div className="flex items-center gap-1.5">
                          {rawMaterialEntries.map((entry, index) => (
                            <span
                              key={entry.id}
                              className={`h-1.5 rounded-full transition-all ${
                                index === activeRawIndex ? "w-6 bg-[#1E5631]" : "w-1.5 bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          aria-label="Next raw material"
                          onClick={() =>
                            setActiveRawIndex((prev) => Math.min(rawMaterialEntries.length - 1, prev + 1))
                          }
                          disabled={activeRawIndex === rawMaterialEntries.length - 1}
                          className="text-gray-500 disabled:opacity-30"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setEditingRawEntry(null);
                        setRawEntryModalOpen(true);
                      }}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Plus size={16} />
                      Add Raw Material
                    </button>
                  </div>
                )}

                {activeTab === "Work in Progress" && (
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">WIP Stock *</h4>
                    <select
                      value={wipStock}
                      onChange={(event) => setWipStock(event.target.value)}
                      className="mb-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20"
                    >
                      <option value="">Select WIP Stock</option>
                      {WIP_STOCK_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {activeWip && (
                      <div className="divide-y divide-gray-100 rounded-2xl bg-white shadow-sm">
                        <div className="flex items-start justify-between p-4">
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500">Quantity Of Process</div>
                            <div className="truncate text-lg font-bold text-gray-900">
                              {activeWip.quantityOfProcess || "0"}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 pl-3">
                            <button
                              type="button"
                              aria-label="Edit WIP entry"
                              onClick={() => {
                                setEditingWipEntry(activeWip);
                                setWipEntryModalOpen(true);
                              }}
                              className="text-gray-500 hover:text-gray-800"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Remove WIP entry"
                              onClick={handleRemoveActiveWipEntry}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-gray-500">Start Date</div>
                          <div className="text-base font-bold text-gray-900">
                            {activeWip.startDate || "—"}
                          </div>
                        </div>
                      </div>
                    )}

                    {wipEntries.length > 1 && (
                      <div className="mt-3 flex items-center justify-center gap-4">
                        <button
                          type="button"
                          aria-label="Previous WIP entry"
                          onClick={() => setActiveWipIndex((prev) => Math.max(0, prev - 1))}
                          disabled={activeWipIndex === 0}
                          className="text-gray-500 disabled:opacity-30"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <div className="flex items-center gap-1.5">
                          {wipEntries.map((entry, index) => (
                            <span
                              key={entry.id}
                              className={`h-1.5 rounded-full transition-all ${
                                index === activeWipIndex ? "w-6 bg-[#1E5631]" : "w-1.5 bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          aria-label="Next WIP entry"
                          onClick={() => setActiveWipIndex((prev) => Math.min(wipEntries.length - 1, prev + 1))}
                          disabled={activeWipIndex === wipEntries.length - 1}
                          className="text-gray-500 disabled:opacity-30"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setEditingWipEntry(null);
                        setWipEntryModalOpen(true);
                      }}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Plus size={16} />
                      Add WIP Entry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-8">
            Save
          </Button>
        </form>
      </Modal>

      <RawMaterialEntryModal
        open={rawEntryModalOpen}
        onClose={() => {
          setRawEntryModalOpen(false);
          setEditingRawEntry(null);
        }}
        onSave={handleSaveRawEntry}
        initialEntry={editingRawEntry}
      />

      <WipEntryModal
        open={wipEntryModalOpen}
        onClose={() => {
          setWipEntryModalOpen(false);
          setEditingWipEntry(null);
        }}
        onSave={handleSaveWipEntry}
        initialEntry={editingWipEntry}
      />
    </>
  );
}
