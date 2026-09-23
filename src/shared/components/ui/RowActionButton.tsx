import React from "react";
import { ArrowUpRight } from "lucide-react";

interface RowActionButtonProps {
  /** Announced to screen readers, e.g. "Open supplier SU-0001". */
  label: string;
  onClick?: () => void;
}

/** Circular outline button at the end of every table row — opens the record. */
export function RowActionButton({ label, onClick }: RowActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-[#1E5631] hover:bg-[#EAF6EE] hover:text-[#1E5631] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5631] focus-visible:ring-offset-2"
    >
      <ArrowUpRight size={16} strokeWidth={2.25} />
    </button>
  );
}
