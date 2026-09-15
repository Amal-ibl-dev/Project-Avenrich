"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClassName?: string;
  /** Raise this for a modal that opens on top of another modal (e.g. Add Order Item over Add Sales Order). */
  zIndex?: number;
}

/**
 * Centered overlay dialog ("topup box") used for every Add/Edit form in the app.
 * Two Modals can be mounted at once — pass a higher `zIndex` to the one that
 * should sit on top, so a "child" form (e.g. Add Order Item) layers over its
 * "parent" (e.g. Add Sales Order) instead of replacing it.
 */
export function Modal({
  open,
  onClose,
  children,
  maxWidthClassName = "max-w-md",
  zIndex = 50,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 px-4"
      style={{ zIndex }}
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidthClassName} rounded-3xl bg-[#EFEFEF] p-6 shadow-2xl`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-gray-700 transition-colors hover:text-gray-900"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
